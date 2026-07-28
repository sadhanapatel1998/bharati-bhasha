// One-time script to create/update the admin user in MongoDB.
// Run: npm run seed:admin
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import dns from "node:dns";

// Fixes "querySrv ECONNREFUSED" seen on networks/ISPs/Windows setups that
// block or mishandle the _mongodb._tcp.* SRV DNS lookup mongodb+srv:// needs.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;
const email = (process.env.SEED_ADMIN_EMAIL || "admin@bharatibhasha.org").toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD || "admin123";
const name = process.env.SEED_ADMIN_NAME || "Admin";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env — aborting.");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "प्रशासक" },
    designation: { type: String },
    avatar: { type: String },
    lastLogin: { type: String },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function run() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { family: 4 });
  console.log("✅ Connected");

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { email },
    {
      email,
      passwordHash,
      name,
      role: "मुख्य राष्ट्रीय प्रशासक",
      designation: "राष्ट्रीय निदेशक, परीक्षा मंडल",
    },
    { upsert: true, new: true }
  );

  console.log("✅ Admin user ready:", admin.email);
  console.log("   Login with: email =", email, "| password =", password);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
