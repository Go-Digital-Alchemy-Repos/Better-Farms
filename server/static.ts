import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import {
  prerenderSeoRoutes,
  type SeoConfig,
} from "../client/src/lib/seo";

const publicRoutes = prerenderSeoRoutes.map(
  ({ path: routePath }: SeoConfig) => routePath,
);

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const routeHtml = new Map(
    publicRoutes.map((routePath) => {
      const filePath =
        routePath === "/"
          ? path.resolve(distPath, "index.html")
          : path.resolve(distPath, routePath.slice(1), "index.html");
      return [routePath, fs.readFileSync(filePath, "utf-8")] as const;
    }),
  );
  const notFoundHtml = fs.readFileSync(
    path.resolve(distPath, "404.html"),
    "utf-8",
  );
  const siteIndexable = routeHtml
    .get("/")
    ?.includes('name="site-indexable" content="true"');

  publicRoutes
    .filter((routePath) => routePath !== "/")
    .forEach((routePath) => {
      app.get(`${routePath}/`, (req, res) => {
        const queryIndex = req.originalUrl.indexOf("?");
        const query = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : "";
        res.redirect(301, `${routePath}${query}`);
      });
    });

  publicRoutes.forEach((routePath) => {
    app.get(routePath, (_req, res) => {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      if (!siteIndexable) {
        res.setHeader("X-Robots-Tag", "noindex, nofollow");
      }
      res.status(200).type("html").send(routeHtml.get(routePath));
    });
  });

  app.use(
    express.static(distPath, {
      dotfiles: "deny",
      index: false,
      maxAge: "1h",
      setHeaders: (res, filePath) => {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );

  app.get("/{*path}", (_req, res) => {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    res.status(404).type("html").send(notFoundHtml);
  });
}
