/**
 * End-to-end smoke test. Start the app first, then run:
 *
 *   npm run dev
 *   npm run test:e2e                       # uses http://localhost:3000
 *   BASE=http://localhost:4000 npm run test:e2e
 *
 * It signs in as the seeded super admin, exercises content, schools,
 * students, results, ranks and the school portal, then deletes everything
 * it created. Requires `npm run seed:all` to have been run once.
 */
const BASE = process.env.BASE || 'https://bhartibhashaolympiad.com';
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@bharatibhasha.org';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'admin@123';
let cookie = '';
const results = [];

async function call(path, opts = {}) {
  const res = await fetch(BASE + path, {
    ...opts,
    headers: { ...(opts.body ? { 'Content-Type': 'application/json' } : {}), cookie, ...(opts.headers || {}) },
  });
  const setC = res.headers.get('set-cookie');
  if (setC) cookie = setC.split(';')[0];
  let body = null;
  try { body = await res.json(); } catch {}
  return { status: res.status, body };
}
const check = (name, ok, extra = '') => {
  results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`);
};

// 1 super admin login
let r = await call('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }) });
check('superadmin login', r.status === 200, r.body?.message);

// 2 content list
r = await call('/api/superadmin/content');
check('content list', r.status === 200 && r.body?.items?.length >= 20, `${r.body?.items?.length} blocks`);

// 3 seed hero banners, then flip one off
r = await call('/api/superadmin/content/hero_banners');
const banners = r.body?.item?.data || [];
check('hero_banners readable', Array.isArray(banners) && banners.length > 0);
const flipped = banners.map((b, i) => (i === 0 ? { ...b, isActive: false } : b));
r = await call('/api/superadmin/content/hero_banners', { method: 'PUT', body: JSON.stringify({ data: flipped }) });
check('hero_banners save', r.status === 200);

const pub = await fetch(BASE + '/api/public/content').then((x) => x.json());
check('public content reflects isActive=false', pub?.content?.hero_banners?.[0]?.isActive === false);
// restore
await call('/api/superadmin/content/hero_banners', { method: 'DELETE' });

// 4 school create
const stamp = Date.now();
const email = `smoke${stamp}@school.test`;
r = await call('/api/superadmin/schools', { method: 'POST', body: JSON.stringify({ name: 'Smoke Test School', email, state: 'Delhi', city: 'New Delhi', password: 'school@123', status: 'active' }) });
const schoolId = r.body?.item?._id;
check('create school', r.status === 201 && !!schoolId, r.body?.item?.code);

// 5 student create
r = await call('/api/superadmin/students', { method: 'POST', body: JSON.stringify({ name: 'Smoke Student', classLevel: '8', subject: 'hindi', schoolId }) });
const rollNo = r.body?.item?.rollNo;
check('create student', r.status === 201 && !!rollNo, rollNo);

// 6 result create + publish
r = await call('/api/superadmin/results', { method: 'POST', body: JSON.stringify({ rollNo, marksObtained: 87, totalMarks: 100, isPublished: true }) });
check('create result', r.status === 201 || r.status === 200, `pct ${r.body?.item?.percentage}`);
check('ranks computed on create', (r.body?.item?.rankNational || 0) > 0, `national ${r.body?.item?.rankNational}, school ${r.body?.item?.rankSchool}, state ${r.body?.item?.rankState}`);

// 7 recompute endpoint
r = await call('/api/superadmin/results/recompute', { method: 'POST', body: JSON.stringify({}) });
check('recompute ranks', r.status === 200, `${r.body?.updated} rows`);

// 8 public result lookup
const pr = await fetch(`${BASE}/api/public/result?rollNo=${rollNo}`).then(async (x) => ({ s: x.status, b: await x.json() }));
check('public result lookup', pr.s === 200 && pr.b?.items?.[0]?.rankNational >= 1, pr.b?.message || `rank ${pr.b?.items?.[0]?.rankNational}`);

const pr2 = await fetch(`${BASE}/api/public/result?rollNo=BBO26-999999`).then(async (x) => ({ s: x.status, b: await x.json() }));
check('unknown roll gives real message', pr2.s === 404 && !!pr2.b?.message, pr2.b?.message);

// 9 public enquiry (contact form)
r = await call('/api/public/enquiry', { method: 'POST', body: JSON.stringify({ name: 'Smoke', email: 'a@b.com', message: 'hello', subject: 'test' }) });
check('contact form enquiry', r.status === 201, r.body?.message);

// 10 school login + scoped data
const adminCookie = cookie;
r = await call('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: 'school@123' }) });
check('school login', r.status === 200 && r.body?.redirect === '/school/dashboard');

r = await call('/api/school/students');
check('school sees own students', r.status === 200 && r.body?.items?.some((s) => s.rollNo === rollNo));

r = await call('/api/school/results');
const sr = r.body?.items?.find((x) => x.rollNo === rollNo);
check('school sees published result with ranks', !!sr && sr.rankSchool >= 1, sr ? `school ${sr.rankSchool} / state ${sr.rankState} / nat ${sr.rankNational}` : 'missing');

r = await call('/api/superadmin/schools');
check('school blocked from super admin API', r.status === 403);

// 11 school adds a student (auto roll)
r = await call('/api/school/students', { method: 'POST', body: JSON.stringify({ name: 'School Added', classLevel: '9', subject: 'sanskrit' }) });
const roll2 = r.body?.item?.rollNo;
check('school creates student', r.status === 201 && roll2 && roll2 !== rollNo, roll2);

// 12 cleanup as super admin
cookie = adminCookie;
r = await call(`/api/superadmin/schools/${schoolId}`, { method: 'DELETE' });
check('cascade delete school', r.status === 200);

const gone = await fetch(`${BASE}/api/public/result?rollNo=${rollNo}`).then((x) => x.status);
check('result removed with school', gone === 404);

console.log('\n' + results.join('\n'));
const passed = results.filter((x) => x.startsWith('PASS')).length;
console.log(`\n${passed}/${results.length} passed`);
process.exit(passed === results.length ? 0 : 1);
