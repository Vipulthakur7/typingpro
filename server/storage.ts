import { typingSessions, userSettings, type TypingSession, type InsertTypingSession, type UserSettings, type InsertUserSettings } from "@shared/schema";

export interface IStorage {
  // Typing sessions
  createTypingSession(session: InsertTypingSession): Promise<TypingSession>;
  getRecentTypingSessions(limit?: number): Promise<TypingSession[]>;
  getBestStats(): Promise<{
    bestWpm: number;
    bestAccuracy: number;
    totalSessions: number;
    totalTime: number;
  }>;
  
  // User settings
  getUserSettings(): Promise<UserSettings | undefined>;
  updateUserSettings(settings: Partial<InsertUserSettings>): Promise<UserSettings>;
}

export class MemStorage implements IStorage {
  private sessions: Map<number, TypingSession>;
  private settings: UserSettings | undefined;
  private currentSessionId: number;
  private currentSettingsId: number;

  constructor() {
    this.sessions = new Map();
    this.currentSessionId = 1;
    this.currentSettingsId = 1;
    this.settings = undefined;
  }

  async createTypingSession(insertSession: InsertTypingSession): Promise<TypingSession> {
    const id = this.currentSessionId++;
    const session: TypingSession = {
      ...insertSession,
      id,
      createdAt: new Date(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async getRecentTypingSessions(limit: number = 10): Promise<TypingSession[]> {
    return Array.from(this.sessions.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getBestStats(): Promise<{
    bestWpm: number;
    bestAccuracy: number;
    totalSessions: number;
    totalTime: number;
  }> {
    const sessions = Array.from(this.sessions.values());
    
    if (sessions.length === 0) {
      return {
        bestWpm: 0,
        bestAccuracy: 0,
        totalSessions: 0,
        totalTime: 0,
      };
    }

    return {
      bestWpm: Math.max(...sessions.map(s => s.wpm)),
      bestAccuracy: Math.max(...sessions.map(s => s.accuracy)),
      totalSessions: sessions.length,
      totalTime: sessions.reduce((sum, s) => sum + s.timeSeconds, 0),
    };
  }

  async getUserSettings(): Promise<UserSettings | undefined> {
    return this.settings;
  }

  async updateUserSettings(newSettings: Partial<InsertUserSettings>): Promise<UserSettings> {
    if (!this.settings) {
      this.settings = {
        id: this.currentSettingsId++,
        theme: "dark",
        soundEnabled: 1,
        difficulty: "easy",
        updatedAt: new Date(),
        ...newSettings,
      };
    } else {
      this.settings = {
        ...this.settings,
        ...newSettings,
        updatedAt: new Date(),
      };
    }
    return this.settings;
  }
}

export const storage = new MemStorage();
