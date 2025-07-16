import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTypingSessionSchema, insertUserSettingsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Typing sessions
  app.post("/api/sessions", async (req, res) => {
    try {
      const sessionData = insertTypingSessionSchema.parse(req.body);
      const session = await storage.createTypingSession(sessionData);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  app.get("/api/sessions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const sessions = await storage.getRecentTypingSessions(limit);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getBestStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // User settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getUserSettings();
      res.json(settings || { theme: "dark", soundEnabled: 1, difficulty: "easy" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.patch("/api/settings", async (req, res) => {
    try {
      const settingsData = insertUserSettingsSchema.partial().parse(req.body);
      const settings = await storage.updateUserSettings(settingsData);
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: "Invalid settings data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
