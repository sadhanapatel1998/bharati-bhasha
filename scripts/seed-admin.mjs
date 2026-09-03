/**
 * Seeds the first super admin, default settings and a demo exam.
 *   node scripts/seed-admin.mjs
 * Env: MONGODB_URI, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import path from 'node:path';

// tiny .env.local loader (no dotenv dependency)
for (const file of ['.env.local', '.env']) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = (m[2] || '').trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI missing. Add it to .env.local');
  process.exit(1);
}

const email = (process.env.SEED_ADMIN_EMAIL || 'admin@bharatibhasha.org').toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD || 'admin@123';
const name = process.env.SEED_ADMIN_NAME || 'National Administrator';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true },
    phone: String,
    passwordHash: String,
    role: { type: String, default: 'superadmin' },
    designation: String,
    avatar: String,
    schoolId: { type: mongoose.Types.ObjectId, default: null },
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
  },
  { timestamps: true }
);
const SettingSchema = new mongoose.Schema({ key: { type: String, unique: true } }, { strict: false, timestamps: true });
const ExamSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
const Exam = mongoose.models.Exam || mongoose.model('Exam', ExamSchema);

await mongoose.connect(MONGODB_URI, { family: 4 });
console.log('✅ MongoDB connected');

const existing = await User.findOne({ email });
if (existing) {
  existing.passwordHash = await bcrypt.hash(password, 10);
  existing.role = 'superadmin';
  existing.isActive = true;
  await existing.save();
  console.log(`♻️  Super admin password reset: ${email}`);
} else {
  await User.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'superadmin',
    designation: 'National Examination Control Room',
  });
  console.log(`✅ Super admin created: ${email}`);
}

if (!(await Setting.findOne({ key: 'global' }))) {
  await Setting.create({
    key: 'global',
    siteName: 'Bharati Bhasha Olympiad',
    siteNameHi: 'भारती भाषा ओलंपियाड',
    tagline: 'National Hindi & Sanskrit Olympiad',
    taglineHi: 'राष्ट्रीय हिन्दी एवं संस्कृत ओलंपियाड',
    contactEmail: email,
    contactPhone: '+91 00000 00000',
    currentSession: '2026',
    feePerStudent: 150,
    registrationOpen: true,
    resultsPublic: true,
  });
  console.log('✅ Default settings created');
}

if ((await Exam.countDocuments({})) === 0) {
  await Exam.create({
    name: 'BBO National Olympiad 2026 — Round 1',
    nameHi: 'बीबीओ राष्ट्रीय ओलंपियाड 2026 — चरण 1',
    session: '2026',
    level: 'school',
    subject: 'both',
    totalMarks: 100,
    durationMinutes: 60,
    status: 'upcoming',
  });
  console.log('✅ Demo exam created');
}

console.log(`\n🔑 Login → /login\n   email: ${email}\n   password: ${password}\n`);
await mongoose.disconnect();
process.exit(0);
