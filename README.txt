GEN AI-THON 2026 — CLICK DASHBOARD

DEPLOY USING GITHUB (required for the shared counter)
1. Extract this ZIP. Upload its contents to the root of the GitHub repository connected to your existing Netlify site. Include package.json, package-lock.json, netlify.toml, build.mjs, public/ and netlify/.
2. In Netlify, open Project configuration > Environment variables. Add DASHBOARD_PASSWORD with a strong password you choose. Make it available to Functions.
3. Trigger a new production deploy. Build command: node build.mjs. Publish directory: dist. Netlify installs the dependency and deploys the function automatically.
4. Visit your awareness link once, then open https://bloombreg-business-news.netlify.app/dashboard.html and enter your password.
5. Click Refresh counts to update the dashboard.

Uploading only dist with drag-and-drop publishes the page but DOES NOT deploy the counting function. Use GitHub for this version.

COUNTS
Total visits: successful recordings of awareness page loads, including reloads.
Unique browsers: anonymous browser identifiers, an estimate rather than an exact count of people. Multiple devices and cleared storage may count a person again.
Today: UTC calendar day.
Counts start after this version is deployed; earlier clicks cannot be reconstructed.
Dashboard visits and the optional news view are not counted. Automated browsers that run JavaScript can be counted. Users who block scripts may not be counted.
No names, emails, credentials, IP addresses or browser fingerprint information are stored by the custom counter. Netlify may maintain its own hosting logs.
The counter uses a site-wide Netlify Blobs store, which survives redeployments. No storage credentials are embedded in the browser.

VERIFICATION
Local build, JavaScript syntax and counter logic checks passed. Live storage and deployment must be checked after publishing to your Netlify account.
