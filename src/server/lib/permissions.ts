/**
 * Fine-grained permissions for console users.
 * `superadmin` implicitly holds every permission; `admin` holds only what the
 * super admin ticked when creating the account.
 */
export const PERMISSIONS = [
  'schools.view',
  'schools.manage',
  'students.view',
  'students.manage',
  'results.view',
  'results.manage',
  'results.publish',
  'exams.view',
  'exams.manage',
  'content.view',
  'content.manage',
  'announcements.view',
  'announcements.manage',
  'enquiries.view',
  'enquiries.manage',
  'admins.view',
  'admins.manage',
  'audit.view',
  'settings.view',
  'settings.manage',
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/** Grouped for the checkbox UI. */
export const PERMISSION_GROUPS: { group: string; groupHi: string; items: Permission[] }[] = [
  { group: 'Schools', groupHi: 'विद्यालय', items: ['schools.view', 'schools.manage'] },
  { group: 'Students', groupHi: 'छात्र', items: ['students.view', 'students.manage'] },
  { group: 'Results', groupHi: 'परिणाम', items: ['results.view', 'results.manage', 'results.publish'] },
  { group: 'Exams', groupHi: 'परीक्षाएँ', items: ['exams.view', 'exams.manage'] },
  { group: 'Website content', groupHi: 'वेबसाइट सामग्री', items: ['content.view', 'content.manage'] },
  { group: 'Announcements', groupHi: 'घोषणाएँ', items: ['announcements.view', 'announcements.manage'] },
  { group: 'Enquiries', groupHi: 'पूछताछ', items: ['enquiries.view', 'enquiries.manage'] },
  { group: 'Admin users', groupHi: 'एडमिन उपयोगकर्ता', items: ['admins.view', 'admins.manage'] },
  { group: 'System', groupHi: 'प्रणाली', items: ['audit.view', 'settings.view', 'settings.manage'] },
];

/** Sensible default for a freshly created administrator. */
export const DEFAULT_ADMIN_PERMISSIONS: Permission[] = [
  'schools.view',
  'students.view',
  'results.view',
  'exams.view',
  'content.view',
  'announcements.view',
  'enquiries.view',
];

export const ALL_PERMISSIONS: Permission[] = [...PERMISSIONS];

export function hasPermission(
  role: string,
  granted: string[] | undefined,
  needed: Permission | Permission[]
): boolean {
  if (role === 'superadmin') return true;
  if (role !== 'admin') return false;
  const list = granted || [];
  const want = Array.isArray(needed) ? needed : [needed];
  // any-of: holding one of the listed permissions is enough
  return want.some((p) => list.includes(p));
}

/** A `manage` permission implies its matching `view` permission. */
export function normalizePermissions(input: string[] = []): Permission[] {
  const set = new Set<string>(input.filter((p) => (PERMISSIONS as readonly string[]).includes(p)));
  for (const p of Array.from(set)) {
    if (p.endsWith('.manage') || p.endsWith('.publish')) {
      set.add(p.replace(/\.(manage|publish)$/, '.view'));
    }
  }
  return Array.from(set) as Permission[];
}
