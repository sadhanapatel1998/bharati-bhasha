/**
 * Bundles the TypeScript content registry and dumps every block's ORIGINAL
 * value into src/data/site-content.seed.json, which seed:content then loads
 * into MongoDB. Run this again whenever you change olympiadData.ts.
 *
 *   npm run gen:content-seed
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const tmp = path.join(os.tmpdir(), `bbo-content-${Date.now()}.mjs`);

await build({
  entryPoints: ['src/data/contentRegistry.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: tmp,
  logLevel: 'error',
});

const mod = await import(`file://${tmp}`);
const blocks = mod.CONTENT_BLOCKS.map((b) => ({
  key: b.key,
  label: b.label,
  labelHi: b.labelHi,
  group: b.group,
  shape: b.shape,
  titleField: b.titleField || null,
  data: b.fallback,
}));

const out = path.resolve('src/data/site-content.seed.json');
fs.writeFileSync(out, JSON.stringify(blocks, null, 2), 'utf8');
fs.rmSync(tmp, { force: true });

console.log(`✅ ${blocks.length} content blocks written to ${out}`);
