import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  serial,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  password: varchar("password"), // For local auth only
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("Admin"), // Admin, Teacher, Accountant
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Login schema for local authentication
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

// Students table
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  rollNumber: varchar("roll_number").notNull().unique(),
  name: varchar("name").notNull(),
  email: varchar("email"),
  phone: varchar("phone"), // Added phone number field
  class: varchar("class").notNull(),
  section: varchar("section").notNull(),
  dateOfBirth: date("date_of_birth"),
  guardianName: varchar("guardian_name"),
  guardianPhone: varchar("guardian_phone"),
  address: text("address"),
  admissionDate: date("admission_date").notNull(),
  status: varchar("status").notNull().default("active"), // active, inactive, graduated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;

// Staff table
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  employeeId: varchar("employee_id").notNull().unique(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  department: varchar("department").notNull(),
  designation: varchar("designation").notNull(),
  dateOfJoining: date("date_of_joining").notNull(),
  salary: decimal("salary", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("active"), // active, on-leave, inactive
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type Staff = typeof staff.$inferSelect;

// Fee Renewals table
export const feeRenewals = pgTable("fee_renewals", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  academicYear: varchar("academic_year").notNull(), // e.g., "2024-2025"
  term: varchar("term").notNull(), // e.g., "Q1", "Q2", "Semester 1", "Annual"
  feeAmount: decimal("fee_amount", { precision: 10, scale: 2 }).notNull(),
  dueDate: date("due_date").notNull(),
  paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  status: varchar("status").notNull().default("pending"), // pending, paid, overdue, partial
  renewalDate: timestamp("renewal_date").defaultNow(),
  lastPaymentDate: timestamp("last_payment_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFeeRenewalSchema = createInsertSchema(feeRenewals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertFeeRenewal = z.infer<typeof insertFeeRenewalSchema>;
export type FeeRenewal = typeof feeRenewals.$inferSelect;

// Notifications table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  recipientType: varchar("recipient_type").notNull(), // student, staff, guardian
  recipientId: integer("recipient_id").notNull(),
  type: varchar("type").notNull(), // email, sms
  subject: varchar("subject"),
  message: text("message").notNull(),
  status: varchar("status").notNull().default("pending"), // pending, sent, failed
  sentAt: timestamp("sent_at"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

// Vendors table
export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  contactPerson: varchar("contact_person").notNull(),
  email: varchar("email"),
  phone: varchar("phone").notNull(),
  address: text("address"),
  status: varchar("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;
