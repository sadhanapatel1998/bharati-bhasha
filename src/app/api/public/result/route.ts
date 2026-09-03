import { NextRequest } from 'next/server';
import { connectToDB } from '@/server/lib/db';
import { Result } from '@/server/models/Result';
import { getSettings } from '@/server/models/Setting';
import { json, fail } from '@/server/lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/public/result?rollNo=BBO26-000012 */
export async function GET(req: NextRequest) {
  const db = await connectToDB();
  if (!db) return fail('Database not configured', 503);

  const rollNo = (req.nextUrl.searchParams.get('rollNo') || '').trim().toUpperCase();
  if (!rollNo) return fail('Roll number is required', 400);

  const settings = await getSettings();
  if (!settings.resultsPublic) {
    return fail('सार्वजनिक परिणाम अभी बंद हैं। (Super admin → Settings → Show results publicly)', 403);
  }

  const items = await Result.find({ rollNo, isPublished: true }).lean();
  if (!items.length) {
    // distinguish "no such student" from "result not published yet"
    const { Student } = await import('@/server/models/Student');
    const exists = await Student.exists({ rollNo });
    return fail(
      exists
        ? 'इस विद्यार्थी का परिणाम अभी प्रकाशित नहीं हुआ है।'
        : 'इस अनुक्रमांक का कोई विद्यार्थी नहीं मिला।',
      404
    );
  }

  return json({ success: true, items: items.map((r) => ({ ...r, _id: String(r._id) })) });
}
