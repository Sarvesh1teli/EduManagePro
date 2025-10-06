import { storage } from "./storage";
import { hashPassword } from "./localAuth";

async function seedUser() {
  const email = "admin@test.com";
  const password = "admin123";
  
  const hashedPassword = await hashPassword(password);
  
  await storage.upsertUser({
    id: "test-admin-user",
    email,
    password: hashedPassword,
    firstName: "Admin",
    lastName: "User",
    role: "Admin",
  });
  
  console.log("✅ Test user created successfully!");
  console.log("Email:", email);
  console.log("Password:", password);
  process.exit(0);
}

seedUser().catch((error) => {
  console.error("Error seeding user:", error);
  process.exit(1);
});
