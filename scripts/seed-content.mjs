/**
 * Loads every website content block (the data the site already shows) into
 * MongoDB so the super admin can edit it.
 *
 *   npm run seed:content            # insert missing blocks only
 *   npm run seed:content -- --force # overwrite blocks back to the original data
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

const seedPath = path.resolve('src/data/site-content.seed.json');
if (!fs.existsSync(seedPath)) {
  console.error('❌ src/data/site-content.seed.json missing. Run: npm run gen:content-seed');
  process.exit(1);
}

const blocks = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
const force = process.argv.includes('--force');

const SiteContentSchema = new mongoose.Schema(
  { key: { type: String, unique: true } },
  { strict: false, timestamps: true }
);
const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);

await mongoose.connect(MONGODB_URI, { family: 4 });
console.log('✅ MongoDB connected');

let created = 0;
let updated = 0;
let skipped = 0;

for (const b of blocks) {
  const existing = await SiteContent.findOne({ key: b.key });
  if (existing && !force) {
    skipped++;
    continue;
  }
  await SiteContent.findOneAndUpdate(
    { key: b.key },
    { ...b, isPublished: true, updatedBy: 'seed' },
    { upsert: true }
  );
  existing ? updated++ : created++;
}

console.log(`\n📦 Website content seeded`);
console.log(`   created: ${created}`);
console.log(`   overwritten: ${updated}`);
console.log(`   left untouched: ${skipped}`);
console.log(`\n   Edit it at /superadmin/site-content\n`);

await mongoose.disconnect();
process.exit(0);
