import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  proxyFundAFarmContent,
  proxyPlatformFormSubmission,
} from "./client-site-content-proxy";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get(
    "/api/client-site-content/fund-a-farm/fund-a-farm-page",
    proxyFundAFarmContent,
  );
  app.post("/api/contact", (req, res) =>
    proxyPlatformFormSubmission(req, res, "/api/contact"),
  );
  app.post("/api/forms/newsletter-signup/submit", (req, res) =>
    proxyPlatformFormSubmission(req, res, "/api/forms/newsletter-signup/submit"),
  );
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
