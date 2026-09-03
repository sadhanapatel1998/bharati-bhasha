'use client';

import { useEffect, useState } from 'react';
import { contentFallback } from '../data/contentRegistry';

/**
 * One shared request for the whole page.
 *
 * Note: we deliberately fetch EVERY published block rather than only the keys
 * the first component happened to ask for — otherwise a later component would
 * read a cache that never contained its key and silently fall back to the
 * static data (which is how an edited banner kept showing the old value).
 */
let cache: Record<string, unknown> | null = null;
let inflight: Promise<Record<string, unknown>> | null = null;

async function fetchAllContent(): Promise<Record<string, unknown>> {
  if (cache) return cache;
  if (!inflight) {
    inflight = fetch('/api/public/content', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { content: {} }))
      .then((d) => {
        cache = (d?.content as Record<string, unknown>) || {};
        return cache;
      })
      .catch(() => {
        cache = {};
        return cache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/** Lets the console drop the cache after saving, without a hard reload. */
export function invalidateSiteContent() {
  cache = null;
}

/**
 * Returns the super-admin-edited version of a website block, falling back to
 * the exact data the site already ships with. Nothing ever renders empty.
 */
export function useSiteContent<T>(key: string, staticFallback?: T): T {
  const fallback = (staticFallback ?? contentFallback<T>(key)) as T;
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    let alive = true;
    fetchAllContent().then((content) => {
      if (!alive) return;
      const fromDb = content?.[key];
      if (fromDb !== undefined && fromDb !== null) setValue(fromDb as T);
    });
    return () => {
      alive = false;
    };
  }, [key]);

  return value;
}

/** Same thing for several blocks at once. */
export function useSiteContentMap(keys: string[]): Record<string, unknown> {
  const [map, setMap] = useState<Record<string, unknown>>({});

  useEffect(() => {
    let alive = true;
    fetchAllContent().then((content) => {
      if (!alive) return;
      const picked: Record<string, unknown> = {};
      keys.forEach((k) => {
        if (content?.[k] !== undefined) picked[k] = content[k];
      });
      setMap(picked);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.join(',')]);

  return map;
}
