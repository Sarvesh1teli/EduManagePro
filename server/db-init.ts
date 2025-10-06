import { pool } from "./db";

export async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        payment_type VARCHAR(100) NOT NULL,
        payment_date DATE,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        payment_method VARCHAR(50),
        transaction_id VARCHAR(100)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        amount NUMERIC(10, 2) NOT NULL,
        expense_date DATE,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        vendor_id INTEGER,
        receipt_url VARCHAR(500)
      );
    `);

    console.log("✅ Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
