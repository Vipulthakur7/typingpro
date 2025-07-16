import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// In-memory storage for demo purposes
let sessions: any[] = [];
let settings = { theme: "dark", soundEnabled: 1, difficulty: "easy" };
let sessionId = 1;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Content-Type": "application/json",
};

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const path = event.path.replace("/.netlify/functions/api", "");
    const method = event.httpMethod;

    // Parse request body
    let body = {};
    if (event.body) {
      body = JSON.parse(event.body);
    }

    // Route handling
    if (path === "/sessions" && method === "POST") {
      const session = {
        ...body,
        id: sessionId++,
        createdAt: new Date(),
      };
      sessions.push(session);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(session),
      };
    }

    if (path === "/sessions" && method === "GET") {
      const limit = event.queryStringParameters?.limit ? 
        parseInt(event.queryStringParameters.limit) : 10;
      const recentSessions = sessions
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(recentSessions),
      };
    }

    if (path === "/stats" && method === "GET") {
      const stats = sessions.length > 0 ? {
        bestWpm: Math.max(...sessions.map(s => s.wpm)),
        bestAccuracy: Math.max(...sessions.map(s => s.accuracy)),
        totalSessions: sessions.length,
        totalTime: sessions.reduce((sum, s) => sum + s.timeSeconds, 0),
      } : {
        bestWpm: 0,
        bestAccuracy: 0,
        totalSessions: 0,
        totalTime: 0,
      };
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(stats),
      };
    }

    if (path === "/settings" && method === "GET") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(settings),
      };
    }

    if (path === "/settings" && method === "PATCH") {
      settings = { ...settings, ...body };
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(settings),
      };
    }

    // 404 for unmatched routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };

  } catch (error) {
    console.error("API Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};