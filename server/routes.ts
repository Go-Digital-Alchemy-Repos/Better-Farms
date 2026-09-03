import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { proxyFundAFarmContent } from "./client-site-content-proxy";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get(
    "/api/client-site-content/fund-a-farm/fund-a-farm-page",
    proxyFundAFarmContent,
  );
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
