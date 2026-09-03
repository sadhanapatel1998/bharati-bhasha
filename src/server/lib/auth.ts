/**
 * Dependency-free HMAC-SHA256 JWT.
 * Uses Web Crypto so it runs in BOTH the Edge middleware and Node route handlers.
 */

export const SESSION_COOKIE = 'bbo_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type Role = 'superadmin' | 'admin' | 'school';

export interface SessionPayload {
  sub: string; // user id
  email: string;
  name: string;
  role: Role;
  schoolId?: string | null;
  permissions?: string[];
  iat: number;
  exp: number;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

function secret(): string {
  return process.env.AUTH_SECRET || process.env.JWT_SECRET || 'bbo-dev-secret-change-me-in-env';
}

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function key(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signSession(
  data: Omit<SessionPayload, 'iat' | 'exp'>,
  maxAgeSeconds = SESSION_MAX_AGE
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { ...data, iat: now, exp: now + maxAgeSeconds };

  const header = b64urlEncode(enc.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const body = b64urlEncode(enc.encode(JSON.stringify(payload)));
  const signingInput = `${header}.${body}`;

  const sig = await crypto.subtle.sign('HMAC', await key(), enc.encode(signingInput));
  return `${signingInput}.${b64urlEncode(new Uint8Array(sig))}`;
}

export async function verifySession(token?: string | null): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, sig] = parts;
  try {
    const ok = await crypto.subtle.verify(
      'HMAC',
      await key(),
      b64urlDecode(sig) as unknown as ArrayBuffer,
      enc.encode(`${header}.${body}`)
    );
    if (!ok) return null;

    const payload = JSON.parse(dec.decode(b64urlDecode(body))) as SessionPayload;
    if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_MAX_AGE,
};

/** Where a role lands after logging in. */
export function homeForRole(role: Role): string {
  return role === 'school' ? '/school/dashboard' : '/superadmin/dashboard';
}
