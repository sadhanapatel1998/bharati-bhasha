/**
 * Repairs the global settings document on an existing database.
 *
 *   npm run fix:settings            # turn public result lookup ON
 *   npm run fix:settings -- --off   # turn it back OFF
 *
 * Needed because changing a schema default only affects NEW documents — a
 * database seeded before the default changed keeps its old value.
 */
import mongoose from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';

for (const file of ['.env.local', '.env']) {
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = (m[2] || '').trim().replace(/^["']|["']$/g, '');
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI missing. Add it to .env.local');
  process.exit(1);
}

const on = !process.argv.includes('--off');

const Setting =
  mongoose.models.Setting ||
  mongoose.model('Setting', new mongoose.Schema({ key: { type: String, unique: true } }, { strict: false, timestamps: true }));

await mongoose.connect(MONGODB_URI, { family: 4 });

const before = await Setting.findOne({ key: 'global' }).lean();
const doc = await Setting.findOneAndUpdate(
  { key: 'global' },
  { key: 'global', resultsPublic: on, registrationOpen: before?.registrationOpen ?? true },
  { new: true, upsert: true }
);

console.log(`\n✅ resultsPublic: ${before?.resultsPublic} → ${doc.resultsPublic}`);
console.log(`   registrationOpen: ${doc.registrationOpen}`);
console.log(`\n   Public lookup: GET /api/public/result?rollNo=...\n`);

await mongoose.disconnect();
process.exit(0);
