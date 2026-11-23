SEO INDEX CORRECTION ONLY

Upload these files to the same paths in the main GitHub Pages repository:

1) index.html -> repository root (replace existing root index.html)
2) hr-hub/index.html -> hr-hub/index.html (replace existing file)

Do NOT upload README.txt if you do not want it in the repository.

Purpose:
- Restores the real homepage and HR Hub content.
- When a visitor explicitly requests /index.html, browser redirects to /.
- When a visitor explicitly requests /hr-hub/index.html, browser redirects to /hr-hub/.
- Clean URLs continue to render the normal pages.

GitHub Pages cannot issue different server-side responses for / and /index.html because they resolve to the same static file. This conditional client-side redirect avoids breaking the clean page while reinforcing the canonical URL.
