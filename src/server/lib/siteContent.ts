import 'server-only';
import { connectToDB } from './db';
import { SiteContent } from '../models/SiteContent';
import { contentFallback } from '../../data/contentRegistry';

/**
 * Server-side read of an editable website block, for RSC and route handlers.
 * Falls back to the original static content whenever the DB has nothing.
 */
export async function getSiteContent<T>(key: string, fallback?: T): Promise<T> {
  try {
    const db = await connectToDB();
    if (db) {
      const doc = await SiteContent.findOne({ key, isPublished: true }).lean();
      const data = (doc as { data?: unknown } | null)?.data;
      if (data !== undefined && data !== null) return data as T;
    }
  } catch {
    /* fall through to the static content */
  }
  return (fallback ?? contentFallback<T>(key)) as T;
}
