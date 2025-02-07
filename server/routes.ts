import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scenarioSchema } from "@shared/schema";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  // Get all saved scenarios
  app.get("/api/scenarios", async (_req, res) => {
    try {
      const scenarios = await storage.getAllScenarios();
      res.json(scenarios);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scenarios" });
    }
  });

  // Get a specific scenario
  app.get("/api/scenarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const scenario = await storage.getScenario(id);
      
      if (!scenario) {
        return res.status(404).json({ message: "Scenario not found" });
      }
      
      res.json(scenario);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scenario" });
    }
  });

  // Create a new scenario
  app.post("/api/scenarios", async (req, res) => {
    try {
      const scenario = scenarioSchema.parse(req.body);
      const created = await storage.createScenario(scenario);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid scenario data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create scenario" });
    }
  });

  // Update a scenario
  app.put("/api/scenarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const scenario = scenarioSchema.parse(req.body);
      const updated = await storage.updateScenario(id, scenario);
      
      if (!updated) {
        return res.status(404).json({ message: "Scenario not found" });
      }
      
      res.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid scenario data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update scenario" });
    }
  });

  // Delete a scenario
  app.delete("/api/scenarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteScenario(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Scenario not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete scenario" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
