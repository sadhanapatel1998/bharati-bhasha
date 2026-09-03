# Bharati Bhasha Olympiad — Fully Dynamic Portal

Next.js 16 (App Router) + MongoDB/Mongoose + Tailwind 4.
Two role-based panels, both fully bilingual (English / हिन्दी) with a live toggle.

---

## 1. Setup

```bash
npm install
cp .env.example .env.local     # fill MONGODB_URI + AUTH_SECRET

npm run seed:all               # super admin + all website content
npm run seed:demo              # optional: demo schools/students/enquiries

npm run dev
```

| script | what it does |
|---|---|
| `seed:admin` | creates/resets the first super admin + portal settings |
| `gen:content-seed` | re-reads `src/data/olympiadData.ts` and rebuilds `src/data/site-content.seed.json` |
| `seed:content` | loads the website content blocks into MongoDB (`-- --force` overwrites) |
| `seed:demo` | sample schools, students, announcements, enquiries and a limited sub-admin |
| `seed:all` | `seed:admin` + `gen:content-seed` + `seed:content` |

`.env.local`

| var | purpose |
|---|---|
| `MONGODB_URI` | Mongo Atlas / local connection string |
| `AUTH_SECRET` | HMAC key used to sign session JWTs — change in production |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | first super admin (default `admin@bharatibhasha.org` / `admin@123`) |

---

## 2. Routes

| URL | Who |
|---|---|
| `/registration` | school self-registration (3-step form, issues a school code) |
| `/login` | single login door for schools + admins, redirects by role |
| `/superadmin/*` | national office console |
| `/school/*` | school coordinator panel |
| `/admin/*` | legacy → redirects to `/superadmin/dashboard` |

Middleware (`middleware.ts`) verifies the session cookie on the edge and fences
roles: a school user can never reach `/superadmin`, and vice versa.

---

## 3. Roles

- **superadmin / admin** — everything: approve schools, CRUD students, upload &
  publish results, exams, announcements, enquiries, admin users, audit log,
  portal settings.
- **school** — own profile, own students (auto roll numbers), read-only view of
  results the national office has published.

---

## 4. Flow

1. School registers at `/registration` → status `pending`, gets code `BBO-DL-0001`.
2. Super admin approves it in **Schools** → status `active`.
3. School logs in, adds students → roll numbers `BBO26-000001` auto-generated.
4. Super admin uploads marks (single form or bulk CSV paste) in **Results**;
   percentage, grade and school/state/national ranks are computed server-side.
5. Publishing a result makes it visible in the school panel and (if
   `resultsPublic` is on in Settings) at `GET /api/public/result?rollNo=…`.

---

## 5. Website content CMS

Everything the public site shows — counters, ticker, exam dates, syllabus,
FAQs, testimonials, partner schools, sample papers, blogs, gallery, awards,
vision & mission, NEP pillars, state map data — is editable at
**`/superadmin/site-content`**.

How it stays safe:

- `src/data/contentRegistry.ts` lists every block and points at the ORIGINAL
  hard-coded data in `src/data/olympiadData.ts`.
- `useSiteContent(key, staticFallback)` renders the DB version when it exists
  and the original otherwise, so **no content can ever disappear** — even with
  the database switched off the site looks exactly as before.
- `npm run seed:content` copies that same original data into MongoDB so the
  console starts fully populated instead of empty.
- Each block has a **Restore original** button that puts the shipped content
  back in one click.

**No JSON needed.** Every block — however deeply nested — renders as a normal
form (`src/components/panel/SchemaForm.tsx`):

- objects become labelled field groups (`authorRole` → "Author role")
- arrays of objects become repeatable cards with collapse, reorder, duplicate
  and delete, plus an **Add** button that clones the existing shape
- arrays of strings get a numbered line editor with add/remove
- booleans become toggles, numbers become number inputs
- image fields get the uploader, and known fields (`heightMode`, `level`,
  `type`, `subject`) become dropdowns so a client cannot mistype a value

A **JSON** button in the header is still there for power users; it is opt-in
and never the default view.

Public read endpoint: `GET /api/public/content?keys=faqs,testimonials`.

---

## 6. Ranks

`src/server/lib/ranks.ts` computes three ranks per result, scoped to one exam:

- **school rank** — position among that school's results
- **state rank** — position among results from schools in the same state
- **national rank** — position across every result of the exam

Ties share a rank (1, 2, 2, 4). Ranks are recomputed automatically whenever a
result is created, edited, deleted or bulk-imported, and can be rebuilt on
demand with **Recalculate ranks** on the super admin Results page
(`POST /api/superadmin/results/recompute`, optional `{ examId }`).

Both panels show school/state/national rank. Until the national office
recalculates, the school panel shows a short note instead of empty columns.

---

## 7. Files & images

`POST /api/superadmin/uploads` (multipart: `file`, `folder`) stores files in
**`/public/uploads/<folder>/`** and returns the public path, e.g.
`/uploads/banner/hero-1712345678-a1b2c3.jpg`.

- folders: `content`, `banner`, `gallery`, `schools`, `blog`, `papers`, `docs`
- images: JPG / PNG / WEBP / GIF / AVIF / SVG, max 6 MB
- documents: PDF / DOC / DOCX / XLS / XLSX, max 25 MB
- unique hashed filenames, so re-uploading never overwrites
- `GET ?folder=banner` lists the library, `DELETE ?url=…` removes a file
- School users may upload their own logo (forced into `schools/`)

In the console, the right widget appears automatically from the field name:

- `image`, `logo`, `photo`, `thumbnail`, `banner`, `cover`, `avatar`, `src`
  -> ImageUploadField (drag-drop, media library, URL box)
- `pdfUrl`, `fileUrl`, `downloadUrl`, `document`, `attachment`, `syllabusPdf`,
  `brochure` -> FileUploadField (PDF upload + file library)

So **Sample papers** now has a real PDF upload per paper, and the new
**Downloads** block holds the syllabus / prospectus / OMR / registration form
PDFs used by the download buttons across the site.

`/public/uploads/.gitignore` keeps the folder in git but its contents out.
On ephemeral hosts (Vercel) point this at S3/Cloudinary instead.

---

## 8. Homepage banner

The hero is a real slider driven by two content blocks:

- **Hero banners** (`hero_banners`) — repeatable rows of `image`, `alt`,
  `link`, `isActive`, each with an image uploader and reorder controls
- **Hero slider settings** (`hero_settings`) — `autoplay`, `intervalMs`,
  `showArrows`, `showDots`, `heightMode` (`natural` | `fixed`), `fixedHeightPx`

Setting **isActive** to off removes a banner from the site immediately.
`heightMode: "natural"` reads the first banner's own dimensions and sizes the
section to that aspect ratio, so the banner height follows the uploaded image
instead of being hard-coded. Autoplay pauses on hover, arrows/dots/keyboard
arrows and touch swipe all work, and a banner with a `link` becomes clickable.

---

## 9. Permissions

`src/server/lib/permissions.ts` defines 20 permissions across Schools,
Students, Results, Exams, Website content, Announcements, Enquiries, Admin
users and System.

- **superadmin** — implicitly holds every permission, always.
- **admin** — holds exactly what the super admin ticked when creating the
  account (checkbox grid in **Admin users → Add admin**).
- Selecting a `manage` permission auto-grants its matching `view`.
- `results.publish` is separate from `results.manage`: an officer can enter
  marks but cannot make them public. A bulk import by such a user lands as
  draft.

Enforcement happens in three places:

1. `requirePermission(req, 'results.manage')` on every console API route.
2. The sidebar hides sections the user cannot view.
3. Edit controls render disabled for view-only users.

---

## 10. Bilingual system

- `src/i18n/dictionary.ts` — every panel string in `en` + `hi`.
- `src/i18n/LangProvider.tsx` — `useI18n()` gives `t()`, `pick()` (for
  `{en,hi}` DB fields), `n()` (numbers) and `d()` (dates), all locale-aware.
- `<LanguageToggle />` sits in both panel headers and on the auth pages;
  the choice persists in `localStorage`.
- Content models (announcements, exams, schools) store both `field` and
  `fieldHi`, so CMS content is bilingual too.

---

## 11. API

```
POST   /api/auth/register-school
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/superadmin/stats
GET    POST   /api/superadmin/schools          PATCH DELETE /api/superadmin/schools/:id
GET    POST   /api/superadmin/students         PATCH DELETE /api/superadmin/students/:id
GET    POST   /api/superadmin/results          PATCH DELETE /api/superadmin/results/:id
POST          /api/superadmin/results/bulk
GET    POST   /api/superadmin/exams            PATCH DELETE /api/superadmin/exams/:id
GET    POST   /api/superadmin/announcements    PATCH DELETE /api/superadmin/announcements/:id
GET           /api/superadmin/enquiries        PATCH DELETE /api/superadmin/enquiries/:id
GET    POST   /api/superadmin/admins           PATCH DELETE /api/superadmin/admins/:id
GET           /api/superadmin/audit-logs
GET    PUT    /api/superadmin/settings
GET           /api/superadmin/content
GET    PUT    /api/superadmin/content/:key      DELETE = restore original
POST          /api/superadmin/results/recompute
GET POST DELETE /api/superadmin/uploads

GET           /api/school/stats
GET    PATCH  /api/school/profile
GET    POST   /api/school/students             PATCH DELETE /api/school/students/:id
GET           /api/school/results

GET           /api/public/announcements
GET           /api/public/content?keys=a,b
GET           /api/public/result?rollNo=…
POST          /api/public/enquiry
```

Every mutating super-admin call writes an entry to the audit log.

---

## 12. Collections

`users` · `schools` · `students` · `results` · `exams` · `announcements`
· `enquiries` · `auditlogs` · `settings` · `sitecontents`

---

## 13. Tests

```bash
npm run test:ranks   # unit tests for the ranking maths - no database needed
npm run test:e2e     # end-to-end run against a live server (needs MongoDB)
```

`test:e2e` signs in as the seeded super admin and walks the whole flow:
content editing -> public content reflects the edit -> create school -> create
student -> publish result -> ranks computed -> public result lookup -> contact
enquiry -> school login -> school sees its own students and ranks -> school is
blocked from super admin APIs -> cascade delete. It cleans up after itself.

Start the app first (`npm run dev`), then run it. Override the target with
`BASE=http://localhost:4000 npm run test:e2e`.

---

## 14. Wired-up site behaviour

- **Sample papers** download the PDF uploaded for them; papers with no file
  yet say the paper is coming soon instead of faking a download.
- **Syllabus** downloads the PDF from the Downloads block.
- **Exam dates** "add to calendar" generates a real `.ics` file.
- **Newsletter** (footer) and **blog share link** do real work - a real
  subscription request and a real clipboard copy.
- **Careers -> Apply** opens a real pre-filled mail draft.
- Every one of these reports the ACTUAL server response; no more canned
  success toasts.
- **Contact form** posts to `/api/public/enquiry`; the message lands in
  super admin → Enquiries with a reply box.
- **Performance report** is fully real: it queries `/api/public/result` and
  renders the returned marks, percentage and school/state/national ranks.
  There is no demo report any more - if the roll number is unknown or the
  result is unpublished, the page shows the server's own message (student not
  found vs result not published yet). Public lookup is gated by
  **Settings -> Show results publicly**, which now defaults to ON (each
  individual result still has to be published).
- **Announcement bar** shows the editable ticker items followed by whatever is
  published in super admin → Announcements.
- Roll numbers and school codes are allocated by scanning for the first free
  value, so deleting a record can never cause a duplicate-key error.
- `studentCount` is recounted on delete rather than decremented, so it can
  never drift negative.

---

## 15. Dark mode

Tailwind v4 binds `dark:` to the browser's `prefers-color-scheme` by default.
The public site only has a light design, so a visitor whose OS was in dark
mode saw half-applied dark styles across every page.

`src/index.css` rebinds the variant to a class:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

- Public pages never carry `.dark`, so they stay light for everyone
  regardless of the browser theme. The root layout also declares
  `color-scheme: light`, which stops the browser tinting inputs, scrollbars
  and autofill backgrounds.
- The admin panels have a real dark theme and opt in themselves:
  `PanelProvider` toggles `.dark` on `<html>` and sets `color-scheme: dark`
  with it. On a first visit it follows the browser preference; after that the
  header toggle wins and the choice is saved.

Verified in the production build: the compiled stylesheet contains zero
`prefers-color-scheme:dark` rules and 175 `.dark`-scoped ones.

---

## 16. Notes

- Auth is a dependency-free HMAC-SHA256 JWT in an httpOnly cookie
  (`src/server/lib/auth.ts`) — works in both the Edge middleware and Node
  route handlers, so no extra packages are needed.
- Passwords are bcrypt-hashed. Suspending a school also disables its login.
- Deleting a school cascades to its users, students and results.
- The marketing site pulls Google Fonts at build time; make sure the build
  machine has internet access to `fonts.googleapis.com`.

---

## Admin panel on mobile

The console is built for phones as well as desktops.

- **Tables become cards.** Below `md`, `TableWrap` collapses each row into a
  card and prints the column name beside every value. The labels are read from
  `<thead>` at runtime, so every table in both panels gets the treatment
  without any per-page markup. Above `md` the normal table returns.
- **Top bar** shrinks: compact language toggle, smaller avatar, brand text and
  role label hidden on the narrowest screens; the sidebar drawer is capped at
  `min(84vw, 300px)` so it can never exceed the viewport.
- **Filters and search** go full width and stack instead of overflowing.
- **Modals** open as a full sheet on a phone with a sticky footer, and return
  to a centred dialog from `sm` upwards.
- **Page headers** stack the title above the action buttons, which then split
  the row evenly.
- **Website content** replaces the 24-item sidebar with a grouped dropdown on
  phones, so the editor stays on screen.
- **Row editors** in the content forms tighten their toolbar and hide the
  duplicate button on the smallest screens.
- **No sideways scrolling.** The website-content editor used to run past the
  right edge on a phone: the URL box inside the image and file uploaders
  carried a fixed `min-w-[180px]`, and the nested form containers had no
  `min-w-0`, so a flex child could refuse to shrink and stretch the whole
  card. The uploaders' URL box now goes full width below `sm`, every nested
  container in `SchemaForm` is `min-w-0`, long values wrap instead of
  overflowing, and the panel shell clips any residual horizontal overflow.
