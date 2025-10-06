import {
  users,
  students,
  staff,
  feeRenewals,
  notifications,
  vendors,
  payments,
  expenses,
  type User,
  type UpsertUser,
  type Student,
  type InsertStudent,
  type Staff,
  type InsertStaff,
  type FeeRenewal,
  type InsertFeeRenewal,
  type Notification,
  type InsertNotification,
  type Vendor,
  type InsertVendor,
  type Payment,
  type InsertPayment,
  type Expense,
  type InsertExpense,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getStudent(id: number): Promise<Student | undefined>;
  getAllStudents(): Promise<Student[]>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student>;
  deleteStudent(id: number): Promise<void>;
  
  getStaff(id: number): Promise<Staff | undefined>;
  getAllStaff(): Promise<Staff[]>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: number, staff: Partial<InsertStaff>): Promise<Staff>;
  deleteStaff(id: number): Promise<void>;
  
  getFeeRenewal(id: number): Promise<FeeRenewal | undefined>;
  getFeeRenewalsByStudent(studentId: number): Promise<FeeRenewal[]>;
  getAllFeeRenewals(): Promise<FeeRenewal[]>;
  createFeeRenewal(renewal: InsertFeeRenewal): Promise<FeeRenewal>;
  updateFeeRenewal(id: number, renewal: Partial<InsertFeeRenewal>): Promise<FeeRenewal>;
  
  getNotification(id: number): Promise<Notification | undefined>;
  getAllNotifications(): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  updateNotification(id: number, notification: Partial<InsertNotification>): Promise<Notification>;
  
  getVendor(id: number): Promise<Vendor | undefined>;
  getAllVendors(): Promise<Vendor[]>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: number, vendor: Partial<InsertVendor>): Promise<Vendor>;
  deleteVendor(id: number): Promise<void>;
  
  getPayment(id: number): Promise<Payment | undefined>;
  getAllPayments(): Promise<Payment[]>;
  getPaymentsByStudent(studentId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  
  getExpense(id: number): Promise<Expense | undefined>;
  getAllExpenses(): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getStudent(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    return await db.select().from(students);
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const [newStudent] = await db.insert(students).values(student).returning();
    return newStudent;
  }

  async updateStudent(id: number, studentData: Partial<InsertStudent>): Promise<Student> {
    const [updated] = await db
      .update(students)
      .set({ ...studentData, updatedAt: new Date() })
      .where(eq(students.id, id))
      .returning();
    return updated;
  }

  async deleteStudent(id: number): Promise<void> {
    await db.delete(students).where(eq(students.id, id));
  }

  async getStaff(id: number): Promise<Staff | undefined> {
    const [member] = await db.select().from(staff).where(eq(staff.id, id));
    return member;
  }

  async getAllStaff(): Promise<Staff[]> {
    return await db.select().from(staff);
  }

  async createStaff(staffData: InsertStaff): Promise<Staff> {
    const [newStaff] = await db.insert(staff).values(staffData).returning();
    return newStaff;
  }

  async updateStaff(id: number, staffData: Partial<InsertStaff>): Promise<Staff> {
    const [updated] = await db
      .update(staff)
      .set({ ...staffData, updatedAt: new Date() })
      .where(eq(staff.id, id))
      .returning();
    return updated;
  }

  async deleteStaff(id: number): Promise<void> {
    await db.delete(staff).where(eq(staff.id, id));
  }

  async getFeeRenewal(id: number): Promise<FeeRenewal | undefined> {
    const [renewal] = await db.select().from(feeRenewals).where(eq(feeRenewals.id, id));
    return renewal;
  }

  async getFeeRenewalsByStudent(studentId: number): Promise<FeeRenewal[]> {
    return await db.select().from(feeRenewals).where(eq(feeRenewals.studentId, studentId));
  }

  async getAllFeeRenewals(): Promise<FeeRenewal[]> {
    return await db.select().from(feeRenewals);
  }

  async createFeeRenewal(renewal: InsertFeeRenewal): Promise<FeeRenewal> {
    const [newRenewal] = await db.insert(feeRenewals).values(renewal).returning();
    return newRenewal;
  }

  async updateFeeRenewal(id: number, renewalData: Partial<InsertFeeRenewal>): Promise<FeeRenewal> {
    const [updated] = await db
      .update(feeRenewals)
      .set({ ...renewalData, updatedAt: new Date() })
      .where(eq(feeRenewals.id, id))
      .returning();
    return updated;
  }

  async getNotification(id: number): Promise<Notification | undefined> {
    const [notification] = await db.select().from(notifications).where(eq(notifications.id, id));
    return notification;
  }

  async getAllNotifications(): Promise<Notification[]> {
    return await db.select().from(notifications);
  }

  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const [notification] = await db.insert(notifications).values(notificationData).returning();
    return notification;
  }

  async updateNotification(id: number, notificationData: Partial<InsertNotification>): Promise<Notification> {
    const [updated] = await db
      .update(notifications)
      .set(notificationData)
      .where(eq(notifications.id, id))
      .returning();
    return updated;
  }

  async getVendor(id: number): Promise<Vendor | undefined> {
    const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
    return vendor;
  }

  async getAllVendors(): Promise<Vendor[]> {
    return await db.select().from(vendors);
  }

  async createVendor(vendorData: InsertVendor): Promise<Vendor> {
    const [vendor] = await db.insert(vendors).values(vendorData).returning();
    return vendor;
  }

  async updateVendor(id: number, vendorData: Partial<InsertVendor>): Promise<Vendor> {
    const [updated] = await db
      .update(vendors)
      .set({ ...vendorData, updatedAt: new Date() })
      .where(eq(vendors.id, id))
      .returning();
    return updated;
  }

  async deleteVendor(id: number): Promise<void> {
    await db.delete(vendors).where(eq(vendors.id, id));
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment;
  }

  async getAllPayments(): Promise<Payment[]> {
    return await db.select().from(payments);
  }

  async getPaymentsByStudent(studentId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.studentId, studentId));
  }

  async createPayment(paymentData: InsertPayment): Promise<Payment> {
    const [payment] = await db.insert(payments).values(paymentData).returning();
    return payment;
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    const [expense] = await db.select().from(expenses).where(eq(expenses.id, id));
    return expense;
  }

  async getAllExpenses(): Promise<Expense[]> {
    return await db.select().from(expenses);
  }

  async createExpense(expenseData: InsertExpense): Promise<Expense> {
    const [expense] = await db.insert(expenses).values(expenseData).returning();
    return expense;
  }
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private students = new Map<number, Student>();
  private staff = new Map<number, Staff>();
  private feeRenewals = new Map<number, FeeRenewal>();
  private notifications = new Map<number, Notification>();
  private vendors = new Map<number, Vendor>();
  private payments = new Map<number, Payment>();
  private expenses = new Map<number, Expense>();
  
  private studentIdCounter = 1;
  private staffIdCounter = 1;
  private renewalIdCounter = 1;
  private notificationIdCounter = 1;
  private vendorIdCounter = 1;
  private paymentIdCounter = 1;
  private expenseIdCounter = 1;

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const id = userData.id || `user_${Date.now()}`;
    const user: User = {
      ...userData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
    this.users.set(id, user);
    return user;
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async createStudent(studentData: InsertStudent): Promise<Student> {
    const id = this.studentIdCounter++;
    const student: Student = { ...studentData, id } as Student;
    this.students.set(id, student);
    return student;
  }

  async updateStudent(id: number, studentData: Partial<InsertStudent>): Promise<Student> {
    const existing = this.students.get(id);
    if (!existing) throw new Error(`Student ${id} not found`);
    const updated = { ...existing, ...studentData };
    this.students.set(id, updated);
    return updated;
  }

  async deleteStudent(id: number): Promise<void> {
    this.students.delete(id);
  }

  async getStaff(id: number): Promise<Staff | undefined> {
    return this.staff.get(id);
  }

  async getAllStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values());
  }

  async createStaff(staffData: InsertStaff): Promise<Staff> {
    const id = this.staffIdCounter++;
    const staff: Staff = { ...staffData, id } as Staff;
    this.staff.set(id, staff);
    return staff;
  }

  async updateStaff(id: number, staffData: Partial<InsertStaff>): Promise<Staff> {
    const existing = this.staff.get(id);
    if (!existing) throw new Error(`Staff ${id} not found`);
    const updated = { ...existing, ...staffData };
    this.staff.set(id, updated);
    return updated;
  }

  async deleteStaff(id: number): Promise<void> {
    this.staff.delete(id);
  }

  async getFeeRenewal(id: number): Promise<FeeRenewal | undefined> {
    return this.feeRenewals.get(id);
  }

  async getFeeRenewalsByStudent(studentId: number): Promise<FeeRenewal[]> {
    return Array.from(this.feeRenewals.values()).filter(r => r.studentId === studentId);
  }

  async getAllFeeRenewals(): Promise<FeeRenewal[]> {
    return Array.from(this.feeRenewals.values());
  }

  async createFeeRenewal(renewalData: InsertFeeRenewal): Promise<FeeRenewal> {
    const id = this.renewalIdCounter++;
    const renewal: FeeRenewal = { ...renewalData, id } as FeeRenewal;
    this.feeRenewals.set(id, renewal);
    return renewal;
  }

  async updateFeeRenewal(id: number, renewalData: Partial<InsertFeeRenewal>): Promise<FeeRenewal> {
    const existing = this.feeRenewals.get(id);
    if (!existing) throw new Error(`Fee renewal ${id} not found`);
    const updated = { ...existing, ...renewalData };
    this.feeRenewals.set(id, updated);
    return updated;
  }

  async getNotification(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const id = this.notificationIdCounter++;
    const notification: Notification = {
      ...notificationData,
      id,
      createdAt: new Date(),
    } as Notification;
    this.notifications.set(id, notification);
    return notification;
  }

  async updateNotification(id: number, notificationData: Partial<InsertNotification>): Promise<Notification> {
    const existing = this.notifications.get(id);
    if (!existing) throw new Error(`Notification ${id} not found`);
    const updated = { ...existing, ...notificationData };
    this.notifications.set(id, updated);
    return updated;
  }

  async getVendor(id: number): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }

  async getAllVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }

  async createVendor(vendorData: InsertVendor): Promise<Vendor> {
    const id = this.vendorIdCounter++;
    const vendor: Vendor = { ...vendorData, id } as Vendor;
    this.vendors.set(id, vendor);
    return vendor;
  }

  async updateVendor(id: number, vendorData: Partial<InsertVendor>): Promise<Vendor> {
    const existing = this.vendors.get(id);
    if (!existing) throw new Error(`Vendor ${id} not found`);
    const updated = { ...existing, ...vendorData };
    this.vendors.set(id, updated);
    return updated;
  }

  async deleteVendor(id: number): Promise<void> {
    this.vendors.delete(id);
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getAllPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }

  async getPaymentsByStudent(studentId: number): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(p => p.studentId === studentId);
  }

  async createPayment(paymentData: InsertPayment): Promise<Payment> {
    const id = this.paymentIdCounter++;
    const payment: Payment = {
      ...paymentData,
      id,
      createdAt: new Date(),
    } as Payment;
    this.payments.set(id, payment);
    return payment;
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }

  async getAllExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }

  async createExpense(expenseData: InsertExpense): Promise<Expense> {
    const id = this.expenseIdCounter++;
    const expense: Expense = {
      ...expenseData,
      id,
      createdAt: new Date(),
    } as Expense;
    this.expenses.set(id, expense);
    return expense;
  }
}

export const storage = new MemStorage();
