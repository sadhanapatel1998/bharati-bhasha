import { NextRequest } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { requirePermission, requireRole, json, fail, audit } from '@/server/lib/guard';

export const runtime = 'nodejs';

const EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
  'image/svg+xml': '.svg',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};
const ALLOWED = new Set(Object.keys(EXT));

const MAX_IMAGE_BYTES = 6 * 1024 * 1024; // 6 MB
const MAX_DOC_BYTES = 25 * 1024 * 1024; // 25 MB

/** allowed sub-folders under public/uploads */
const FOLDERS = new Set(['content', 'banner', 'gallery', 'schools', 'blog', 'papers', 'docs']);

function slug(name: string) {
  return name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'image';
}

/** POST multipart: file, folder? → { url: '/uploads/<folder>/<name>' } */
export async function POST(req: NextRequest) {
  // console users need a content/settings permission; a school may upload its
  // own logo into the schools folder
  let g = await requirePermission(req, ['content.manage', 'settings.manage']);
  if (g.response) {
    const school = await requireRole(req, ['school']);
    if (school.response) return g.response;
    g = { session: school.session };
  }
  const isSchoolUser = g.session.role === 'school';

  const form = await req.formData().catch(() => null);
  if (!form) return fail('Expected a multipart form upload', 400);

  const file = form.get('file');
  if (!(file instanceof File)) return fail('No file supplied', 400);
  if (!ALLOWED.has(file.type)) {
    return fail('Allowed file types: JPG, PNG, WEBP, GIF, AVIF, SVG, PDF, DOC, DOCX, XLS, XLSX', 415);
  }

  const isImage = file.type.startsWith('image/');
  const limit = isImage ? MAX_IMAGE_BYTES : MAX_DOC_BYTES;
  if (file.size > limit) {
    return fail(`File is larger than ${Math.round(limit / 1024 / 1024)} MB`, 413);
  }

  const folderInput = String(form.get('folder') || 'content');
  const folder = isSchoolUser ? 'schools' : FOLDERS.has(folderInput) ? folderInput : 'content';

  const dir = path.join(process.cwd(), 'public', 'uploads', folder);
  await fs.mkdir(dir, { recursive: true });

  const filename = `${slug(file.name)}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}${EXT[file.type]}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), buffer);

  const url = `/uploads/${folder}/${filename}`;
  await audit(g.session, 'upload', isImage ? 'Image' : 'File', url, { size: file.size, type: file.type });

  return json({ success: true, url, folder, filename, size: file.size, type: file.type }, 201);
}

/** GET ?folder=banner — lists previously uploaded images so they can be reused. */
export async function GET(req: NextRequest) {
  const g = await requirePermission(req, ['content.view', 'settings.view']);
  if (g.response) return g.response;

  const folderInput = req.nextUrl.searchParams.get('folder') || 'content';
  const folder = FOLDERS.has(folderInput) ? folderInput : 'content';
  const dir = path.join(process.cwd(), 'public', 'uploads', folder);

  try {
    const files = await fs.readdir(dir);
    const items = await Promise.all(
      files
        .filter((f) => !f.startsWith('.'))
        .map(async (f) => {
          const stat = await fs.stat(path.join(dir, f));
          return {
            url: `/uploads/${folder}/${f}`,
            filename: f,
            size: stat.size,
            mtime: stat.mtime,
            isImage: /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(f),
          };
        })
    );
    items.sort((a, b) => +new Date(b.mtime) - +new Date(a.mtime));
    return json({ success: true, items });
  } catch {
    return json({ success: true, items: [] });
  }
}

/** DELETE ?url=/uploads/banner/foo.png */
export async function DELETE(req: NextRequest) {
  const g = await requirePermission(req, ['content.manage', 'settings.manage']);
  if (g.response) return g.response;

  const url = req.nextUrl.searchParams.get('url') || '';
  const m = url.match(/^\/uploads\/([\w-]+)\/([\w.-]+)$/);
  if (!m || !FOLDERS.has(m[1])) return fail('Invalid file path', 400);

  const target = path.join(process.cwd(), 'public', 'uploads', m[1], m[2]);
  try {
    await fs.unlink(target);
  } catch {
    return fail('File not found', 404);
  }

  await audit(g.session, 'delete', 'Image', url);
  return json({ success: true, message: 'Image deleted' });
}
