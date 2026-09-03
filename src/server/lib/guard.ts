import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from './db';
import { SESSION_COOKIE, verifySession, SessionPayload, Role } from './auth';
import { AuditLog } from '../models/AuditLog';
import { Permission, hasPermission } from './permissions';

export type { SessionPayload };

export function json(data: unknown, status = 200) {
  return NextResponse.json(data as Record<string, unknown>, { status });
}

export function fail(message: string, status = 400, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: false, message, ...extra }, { status });
}

export async function getSession(req: NextRequest): Promise<SessionPayload | null> {
  const fromCookie = req.cookies.get(SESSION_COOKIE)?.value;
  const fromHeader = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return verifySession(fromCookie || fromHeader);
}

/**
 * Ensures DB is connected and the caller holds one of `roles`.
 * Returns either { session } or { response } — always check `response` first.
 */
export async function requireRole(
  req: NextRequest,
  roles: Role[]
): Promise<{ session: SessionPayload; response?: never } | { session?: never; response: NextResponse }> {
  const db = await connectToDB();
  if (!db) {
    return {
      response: fail('Database not configured. Set MONGODB_URI in .env.local', 503),
    };
  }

  const session = await getSession(req);
  if (!session) return { response: fail('Unauthorised — please sign in again', 401) };
  if (!roles.includes(session.role)) return { response: fail('Forbidden — insufficient permissions', 403) };

  return { session };
}

export const requireSuper = (req: NextRequest) => requireRole(req, ['superadmin', 'admin']);

/**
 * Console guard with a permission check on top of the role check.
 * `superadmin` always passes; `admin` needs at least one of `needed`.
 */
export async function requirePermission(
  req: NextRequest,
  needed: Permission | Permission[]
): Promise<{ session: SessionPayload; response?: never } | { session?: never; response: NextResponse }> {
  const g = await requireRole(req, ['superadmin', 'admin']);
  if (g.response) return g;
  if (!hasPermission(g.session.role, g.session.permissions, needed)) {
    return { response: fail('Forbidden — you do not have permission for this action', 403) };
  }
  return { session: g.session };
}
export const requireSchool = (req: NextRequest) => requireRole(req, ['school']);
export const requireAny = (req: NextRequest) => requireRole(req, ['superadmin', 'admin', 'school']);

/** Fire-and-forget audit entry. Never throws. */
export async function audit(
  session: SessionPayload,
  action: string,
  entity: string,
  entityLabel?: string,
  meta?: Record<string, unknown>
) {
  try {
    await AuditLog.create({
      actorId: session.sub,
      actorName: session.name,
      actorRole: session.role,
      action,
      entity,
      entityLabel,
      meta,
    });
  } catch {
    /* auditing must never break the request */
  }
}

/** Common list querystring parsing: ?page=1&limit=20&q=foo&status=active */
export function listParams(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(sp.get('limit') || '20', 10) || 20));
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    q: (sp.get('q') || '').trim(),
    status: (sp.get('status') || '').trim(),
    schoolId: (sp.get('schoolId') || '').trim(),
    subject: (sp.get('subject') || '').trim(),
    classLevel: (sp.get('classLevel') || '').trim(),
    examId: (sp.get('examId') || '').trim(),
    sort: sp.get('sort') || '-createdAt',
  };
}

export function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
