import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScenarioSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  // Save scenario
  app.post("/api/scenarios", async (req, res) => {
    try {
      const data = insertScenarioSchema.parse(req.body);
      const scenario = await storage.createScenario(data);
      res.json(scenario);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid scenario data" });
        return;
      }
      res.status(500).json({ message: "Failed to save scenario" });
    }
  });

  // Get scenarios
  app.get("/api/scenarios", async (_req, res) => {
    try {
      const scenarios = await storage.getScenarios();
      res.json(scenarios);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scenarios" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
