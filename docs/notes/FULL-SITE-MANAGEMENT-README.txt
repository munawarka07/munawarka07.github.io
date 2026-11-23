MUNAWAR.IN — FULL CENTRAL ADMIN PACKAGE
=========================================

This package is designed for ONE deployment. It keeps the current website and working AI Hub assessment while centralizing future site-wide changes.

WHAT IS CENTRALIZED
-------------------
1. Top navigation across all canonical pages
   Data: _data/navigation.yml
   Template: _includes/site-header.html
   Admin: Site Management > Navigation Manager
   To move a page between dropdowns, change its Parent and Order.

2. Branding + favicon + global search settings
   Data: _data/site_settings.yml
   Template: _includes/site-head.html
   Root favicon files are included.

3. Footer
   Data: _data/footer.yml
   Template: _includes/site-footer.html
   Existing footer variants are preserved.

4. SEO for 18 canonical static pages
   Data: _data/seo.yml
   Template: _includes/site-seo.html
   Admin can edit title, description, canonical, indexing, and social title/description.
   Individual article SEO remains controlled by each article's existing fields.

5. Global announcement
   Data: _data/site_settings.yml > announcement
   Disabled by default. Enable only when needed. It appears as a dismissible non-intrusive notice.

6. AI Hub display controls
   Data: _data/ai_hub_admin.yml
   Admin can change tool visibility and order without rewriting the assessment or tool engines.
   All 8 tools remain enabled in their existing order by default.

7. Existing Decap CMS content manager
   Preserved. A new Site Management collection was added to admin/config.yml.
   Existing GitHub/Cloudflare authentication settings are unchanged.

SAFETY / PRESERVATION
---------------------
- Existing duplicate .html redirect pages are left unchanged.
- Existing content data files remain in place.
- AI Hub assessment JavaScript/question bank was not rewritten in this architecture upgrade.
- Existing page-specific navigation CTA labels/targets are preserved via front matter.
- Existing article layout keeps its dynamic article SEO logic.
- Global announcement is OFF by default.
- All current navigation items remain visible by default.
- All AI tools remain enabled by default.

ADMIN PATH
----------
https://munawar.in/admin/

AFTER DEPLOYMENT
----------------
GitHub Pages/Jekyll rebuilds the site whenever the admin saves changes. This is expected. You do not need to manually edit all pages.
