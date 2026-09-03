import { NextRequest } from 'next/server';
import { requirePermission, json, audit } from '@/server/lib/guard';
import { Setting, getSettings } from '@/server/models/Setting';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const g = await requirePermission(req, 'settings.view');
  if (g.response) return g.response;
  const settings = await getSettings();
  return json({ success: true, settings });
}

export async function PUT(req: NextRequest) {
  const g = await requirePermission(req, 'settings.manage');
  if (g.response) return g.response;

  const updates = await req.json().catch(() => ({}));
  delete updates._id;
  delete updates.key;

  const settings = await Setting.findOneAndUpdate({ key: 'global' }, updates, { new: true, upsert: true });
  await audit(g.session, 'update', 'Settings', 'global', updates);
  return json({ success: true, settings });
}
