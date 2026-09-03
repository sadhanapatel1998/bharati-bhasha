import { NextRequest } from 'next/server';
import { connectToDB } from '@/server/lib/db';
import { Enquiry } from '@/server/models/Enquiry';
import { json, fail } from '@/server/lib/guard';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const db = await connectToDB();
  if (!db) return fail('Database not configured', 503);

  const body = await req.json().catch(() => ({}));
  if (!body.name || !body.message) return fail('Name and message are required', 400);

  await Enquiry.create(body);
  return json({ success: true, message: 'Your enquiry has been received' }, 201);
}
