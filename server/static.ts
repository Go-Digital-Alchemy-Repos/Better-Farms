import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderSitePageMetadata } from "./site-metadata";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

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

  const indexHtml = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // Fall through to the client app while preserving route-specific crawler metadata.
  app.get("/{*path}", (req, res) => {
    res.type("html").send(renderSitePageMetadata(indexHtml, req.path));
  });

  app.use((_req, res) => {
    res.status(404).json({ message: "Not found" });
  });
}
