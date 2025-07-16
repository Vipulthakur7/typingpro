import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Simple schema definitions for Netlify deployment
export const typingSessions = {
  id: "serial",
  wpm: "integer",
  accuracy: "real", 
  timeSeconds: "integer",
  difficulty: "text",
  textLength: "integer",
  errors: "integer",
  createdAt: "timestamp",
};

export const userSettings = {
  id: "serial",
  theme: "text",
  soundEnabled: "integer",
  difficulty: "text", 
  updatedAt: "timestamp",
};

// Zod schemas for validation
export const insertTypingSessionSchema = z.object({
  wpm: z.number(),
  accuracy: z.number(),
  timeSeconds: z.number(),
  difficulty: z.string(),
  textLength: z.number(),
  errors: z.number(),
});

export const insertUserSettingsSchema = z.object({
  theme: z.string().optional(),
  soundEnabled: z.number().optional(),
  difficulty: z.string().optional(),
});

export type InsertTypingSession = z.infer<typeof insertTypingSessionSchema>;
export type TypingSession = InsertTypingSession & {
  id: number;
  createdAt: Date;
};

export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type UserSettings = InsertUserSettings & {
  id: number;
  theme: string;
  soundEnabled: number;
  difficulty: string;
  updatedAt: Date;
};