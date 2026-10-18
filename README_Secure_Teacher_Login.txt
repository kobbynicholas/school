HILLTOP INTERNATIONAL BRITISH SCHOOL — SECURE MARKS PORTAL
=========================================================

This package adds a shared teacher login session for all pages, a separate administrator login, and a protected same-origin submission gateway. It uses Cloudflare Pages Functions (JavaScript, not PHP) while keeping GitHub as the source repository.

IMPORTANT: Functions require a Cloudflare Pages project connected to Git. Cloudflare dashboard Direct Upload does not deploy Pages Functions. Test the deployment at `/auth/health` before entering a password.

WHAT IS INCLUDED
----------------
index.html                         modern school portal home page
exams.html                         end-of-term bulk marks entry
mid-term.html                      mid-term bulk marks entry
Mockmarks.html                     mock bulk marks entry
class-config.json                  current class roster / year / term config
admin-settings.html                class list and period configuration tool (admin-only)
admin-login.html                   separate administrator login
login.html                         shared teacher login
Hilltop_Exam_Report_System.html    exam report tool (protected by site-wide middleware)
functions/_middleware.js           session authentication for all published paths
functions/auth/teacher-login.js    explicit teacher login route
functions/auth/admin-login.js      explicit administrator login route
functions/auth/logout.js           explicit logout route
functions/auth/health.js           public deployment test endpoint
functions/_utils/proxy.js          protected Google Apps Script submission proxy
functions/api/submit/*.js          protected exam / midterm / mock routes
APPS_SCRIPT_SECURITY_PATCH.txt     required next step to protect the three endpoints

Keep your existing supporting image and data files in the repo, for example top.png, pic.jpg, picc.jpg, pix.jpg, rem.png, books.jpg, load.gif, and any result/recording pages or scripts that your school currently uses. The middleware protects all paths that Cloudflare Pages serves, including pages not listed above.

IMPORTANT SECURITY LIMITATION
-----------------------------
The website/login gate can protect website routes, but it cannot by itself close the original public Google Apps Script URLs. For complete protection against direct mark submissions, apply APPS_SCRIPT_SECURITY_PATCH.txt to EACH of the three Apps Script projects and set the matching GATEWAY_SECRET Script Property. Do not use this as a fully secured marks system until all three endpoints have been guarded and tested.

PART 1 — PREPARE GITHUB
-----------------------
1. Back up the current repository and its working files.
2. Keep the existing assets and any additional pages that your school uses.
3. Copy the files from this package into the root of your website repository, replacing the current index.html, exams.html, mid-term.html, Mockmarks.html, admin-settings.html, class-config.json, and Hilltop_Exam_Report_System.html as applicable.
4. Keep filenames exactly as shown. The form endpoints now point to /api/submit/exams, /api/submit/midterm, and /api/submit/mock, which are Cloudflare Pages Functions routes.
5. Because the repository contains student names and school records, make the GitHub repository PRIVATE if you have permission to do so. A private repository does not make a separately published GitHub Pages site private.

PART 2 — CREATE A CLOUDFLARE PAGES PROJECT CONNECTED TO GITHUB
--------------------------------------------------------------
1. Sign into Cloudflare and open Workers & Pages.
2. Create a Pages project and choose Connect to Git. Authorize GitHub and select the repository.
3. For a plain HTML site set the production branch to your actual branch, usually main.
4. Set the build command to: node build.mjs
5. Set the build output directory to: dist
6. Deploy. The included build.mjs copies website pages and web assets to dist/ while leaving functions/ at the project root where Cloudflare Pages Functions detects it. It intentionally excludes Excel workbooks, PDFs, ZIPs and text notes from the website output.
7. Open the new *.pages.dev URL and check that unauthenticated requests go to login.html.

PART 3 — ADD ENCRYPTED CLOUDFLARE SECRETS
-----------------------------------------
In Cloudflare dashboard > Workers & Pages > your Pages project > Settings > Variables and Secrets, add the following as ENCRYPTED SECRETS for the Production environment:

TEACHER_PASSWORD       Choose one strong shared code for teachers.
ADMIN_PASSWORD         Choose a different, administrator-only code.
SESSION_SECRET         A long random signing secret (at least 32 random characters).
GAS_SUBMISSION_SECRET  A long random gateway secret (at least 32 random characters).

Do not type passwords into the HTML files or commit them to GitHub. The same GAS_SUBMISSION_SECRET value must be set as the GATEWAY_SECRET Script Property in each of the three Google Apps Script projects; see APPS_SCRIPT_SECURITY_PATCH.txt. Save the secrets and redeploy the production branch after adding them. For security, the login fails closed until the required secrets exist.

The teacher session lasts up to eight hours. The administrator login also creates a teacher session, so the administrator can open the marks portals without logging in twice. The admin-settings.html page always requires the separate administrator session.

PART 4 — LOCK THE OLD GITHUB PAGES ADDRESS
------------------------------------------
After the new Cloudflare site and login have been tested, disable/unpublish the old GitHub Pages deployment in the repository's Settings > Pages (and disable any workflow that republishes it). Otherwise the old github.io URL may remain an unprotected route around the new login. Keep the repository private where possible.

PART 5 — PROTECT GOOGLE APPS SCRIPT SUBMISSIONS
-----------------------------------------------
Follow APPS_SCRIPT_SECURITY_PATCH.txt exactly for EACH of the three deployed Google Apps Script projects. The patch requires an authentication guard at the start of each existing doPost(e), a GATEWAY_SECRET Script Property in each project, and redeploying each existing web app as a new version. The Apps Script guard must run before anything writes to the spreadsheet.

PART 6 — TEST BEFORE USING OFFICIAL MARKS
-----------------------------------------
1. Open the Cloudflare site in a private/incognito window: it should redirect to teacher login.
2. Enter the teacher code: index, exams, mid-term, mock and the report tool should become accessible.
3. Try /admin-settings.html while signed in only as a teacher: it should request the separate admin code.
4. Use Log out, then verify that pages require login again.
5. Submit one test row in each marks portal and confirm it is in the intended Google Sheet.
6. Confirm each Apps Script endpoint rejects an unauthenticated direct request without _gatewaySecret.
7. Only then use it for official marks.

NOTES
-----
- The shared teacher password is an access gate, not separate named accounts. Anyone who knows it has the same portal access.
- The gateway can confirm the request reached Google Apps Script, but the Apps Script response format may not conclusively prove a row was saved. Always verify a test row in the sheet before an official batch.
- This package has been syntax-checked locally; it has not been deployed to your Cloudflare account or tested against your live Google Apps Script deployments. I cannot set your Cloudflare secrets or change GitHub/Apps Script settings from this generated package.

Official Cloudflare documentation:
- Pages Functions middleware: https://developers.cloudflare.com/pages/functions/middleware/
- Static HTML / Pages deployment: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- Pages secrets and bindings: https://developers.cloudflare.com/pages/functions/bindings/
- Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/

TROUBLESHOOTING: HTTP ERROR 405 AT THE LOGIN ENDPOINT
This package uses explicit Cloudflare Pages Function routes under /auth/* (rather than the old /__auth/* URLs). The teacher form must post to /auth/teacher-login and administrator form to /auth/admin-login. First check https://YOUR-PROJECT.pages.dev/auth/health . It should return JSON containing {"ok":true,"service":"hilltop-pages-functions"}.
- If /auth/health returns 404/405 or a static error page, Cloudflare Pages Functions are not deployed or the deployment is not using this repository's Functions source. In Cloudflare dashboard, open Workers & Pages > your Pages project > Settings > Builds & deployments; use Git integration connected to this repository, build command `node build.mjs`, and output directory `dist`. Do not use the dashboard's Direct Upload method for this package: Cloudflare documents that Direct Upload is not supported with Pages Functions.
- Confirm `functions/` is at the repository root beside `build.mjs`, NOT inside `dist/`. Commit the changes and wait for a successful production deployment.
- When `/auth/health` returns `ok:true`, open https://YOUR-PROJECT.pages.dev/login.html and submit the teacher code. It should redirect to `/index.html` on success or back to `/login.html?error=1` on a wrong code, never remain on the POST endpoint with HTTP 405.
