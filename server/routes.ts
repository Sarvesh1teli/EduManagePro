import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import passport from "passport";
import { loginSchema } from "@shared/schema";

const IS_LOCAL = !process.env.REPL_ID;

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Local authentication login route
  if (IS_LOCAL) {
    app.post("/api/login", (req, res, next) => {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid credentials format" });
      }

      passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
          return res.status(500).json({ message: "Authentication error" });
        }
        if (!user) {
          return res.status(401).json({ message: info?.message || "Invalid email or password" });
        }
        
        req.login(user, (err) => {
          if (err) {
            return res.status(500).json({ message: "Login error" });
          }
          return res.json({ success: true });
        });
      })(req, res, next);
    });

    app.get("/api/logout", (req, res) => {
      req.logout(() => {
        res.json({ success: true });
      });
    });
  }

  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      if (process.env.DISABLE_AUTH === "true") {
        const mockUserId = "local-dev-user";
        let user = await storage.getUser(mockUserId);
        
        if (!user) {
          user = await storage.upsertUser({
            id: mockUserId,
            email: "dev@localhost",
            firstName: "Local",
            lastName: "Developer",
            role: "Admin",
          });
        }
        
        return res.json(user);
      }
      
      if (IS_LOCAL) {
        const userId = req.user.id;
        const user = await storage.getUser(userId);
        return res.json(user);
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/students", isAuthenticated, async (req, res) => {
    try {
      const students = await storage.getAllStudents();
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  app.post("/api/students", isAuthenticated, async (req, res) => {
    try {
      const student = await storage.createStudent(req.body);
      res.json(student);
    } catch (error) {
      console.error("Error creating student:", error);
      res.status(500).json({ message: "Failed to create student" });
    }
  });

  app.get("/api/staff", isAuthenticated, async (req, res) => {
    try {
      const staff = await storage.getAllStaff();
      res.json(staff);
    } catch (error) {
      console.error("Error fetching staff:", error);
      res.status(500).json({ message: "Failed to fetch staff" });
    }
  });

  app.get("/api/renewals", isAuthenticated, async (req, res) => {
    try {
      const renewals = await storage.getAllFeeRenewals();
      res.json(renewals);
    } catch (error) {
      console.error("Error fetching renewals:", error);
      res.status(500).json({ message: "Failed to fetch renewals" });
    }
  });

  app.post("/api/renewals", isAuthenticated, async (req, res) => {
    try {
      const renewal = await storage.createFeeRenewal(req.body);
      res.json(renewal);
    } catch (error) {
      console.error("Error creating renewal:", error);
      res.status(500).json({ message: "Failed to create renewal" });
    }
  });

  app.get("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const notifications = await storage.getAllNotifications();
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const notification = await storage.createNotification(req.body);
      res.json(notification);
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  app.get("/api/vendors", isAuthenticated, async (req, res) => {
    try {
      const vendors = await storage.getAllVendors();
      res.json(vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
