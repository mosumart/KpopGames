# K-POP STAR QUIZ V1.0

A responsive, child-friendly HTML/CSS/JavaScript quiz. No database needed for local progress.

## Run locally

The HTML uses ES modules. Do **not** open `index.html` via file://. Use `npx serve .` or `python3 -m http.server 8000` and open http://localhost:8000. On a plain local static server, `/api/photos` and `/api/discover` do not run; deploy to Vercel to activate them.

## Vercel

1. Extract the ZIP and upload the project folder to a GitHub repository.
2. Import repository into Vercel, choose **Other** framework, no build command, output directory `.` (project root).
3. Deploy. Serverless API routes in `/api` become available automatically. If your Vercel project requires a different output configuration, adjust it before deployment.
4. Test `/api/discover` and `/api/photos?title=Jisoo` after deployment. Wikimedia may rate-limit or lack a freely licensed image; the app handles these cases.
5. Check photo file-page licensing and attribution before commercial use; free-licensed does not always mean attribution-free.

## Scope and security

- Default play: offline seed of questions grounded in official agency profiles.
- Online idol mode: Wikimedia page thumbnails with `pilicense=free`, where available; photo attribution linked to Commons file page.
- Internet discovery: candidates **must** be reviewed before local approval. Not automatically pushed to children.
- Admin controls are **local-only editor tools**, not a protected public administrator dashboard. There is no admin login or shared cloud database in V1. Do not use it for a public collaborative admin workflow.
- If moving to production multiuser admin: add Supabase Auth + server-side policies (RLS), storage for `approved_questions`, review records, moderation and audited write operations; never trust a local `approved` flag for central publication.
- `localStorage` progress is per browser/device; not shared across users.
- Current seed covers BTS, BLACKPINK, TWICE and Stray Kids. Other filters are placeholders and honestly report no available questions.
- Hard difficulty currently has no approved questions, and reports this rather than generating unverified claims.
- Images and APIs require network access. Mode photo gracefully reports insufficient images.

## Files

- `index.html` screen markup
- `style.css` responsive UI
- `main.js` quiz state, score, difficulty, hints, local progress, admin review
- `data/seed.js` curated source-based question generation
- `data/questions.json` reserved for future backend-fed approved JSON
- `api/photos.js` requests free licensed Wikimedia article image
- `api/discover.js` pulls Wikipedia article metadata into review candidates
- `tests/*.test.mjs` basic bank regression tests

## Testing checklist

- Launch all six game modes, select options and play to final results.
- Switch group and difficulty; verify missing filters show an honest message.
- In idol mode on Vercel, verify images, correct label, source links and missing-photo fallback.
- Verify answer randomization, no repeated IDs, source links and correction feedback.
- Verify +100, first-five-second bonus +50, 3-streak combo +100, hint penalties and timer expiry.
- Verify XP, stars, achievements and persistence after refresh.
- Verify import goes to pending, approve/reject moves only selected entries, export works.
- Verify offline trivia mode on local static server and network failure handling.
- Verify narrow mobile, both themes and keyboard interaction.

## Important behavior

Daily challenge is based on the device local date, not server time. It is not tamper-proof. Optional sounds use Web Audio when supported. Some Wikimedia images might have constraints; review the linked file page.
