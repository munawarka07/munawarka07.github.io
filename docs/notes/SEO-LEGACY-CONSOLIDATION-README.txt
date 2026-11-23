Munawar.in — Legacy URL / Search Engine Consolidation
Date: 2026-09-16

Purpose
- Preserve the current website design and admin functionality.
- Keep clean canonical URLs as the only URLs in sitemap.xml.
- Mark legacy .html and accidental duplicate index-copy pages noindex,follow.
- Send visitors from legacy URLs to the matching clean URL.
- Recover common historical /about-me/ paths.

Important GitHub Pages limitation
GitHub Pages is static hosting. These compatibility pages use canonical + noindex + immediate client/meta redirect. They are not server-level HTTP 301 redirects. If the domain is later placed behind Cloudflare or another configurable edge/CDN, server-side 301 rules can be added there for even stronger consolidation.

After deployment
1. Confirm https://munawar.in/sitemap.xml opens and contains only clean URLs.
2. In Google Search Console submit: https://munawar.in/sitemap.xml
3. Request indexing for the homepage, HR Hub, About, Articles, Payroll Insights and UAE Labour Law clean URLs.
4. In Bing Webmaster Tools add/verify the site and submit the same sitemap.
5. Do not request indexing for legacy .html URLs.
6. Search-engine replacement is gradual; old snippets can remain visible until recrawled.

Files intentionally changed/added
- index (1).html through index (15).html: changed from duplicate indexable pages into noindex redirect compatibility pages.
- about-me/ and About-me/: added compatibility pages for historical About paths.
- 404.html: added recovery for common historical About paths; remains noindex.
- SEO-LEGACY-CONSOLIDATION-README.txt: this deployment guide.

Already correct in supplied site and therefore left untouched
- _data/seo.yml clean self-referencing canonicals
- sitemap.xml clean URL list
- robots.txt with sitemap declaration and /admin/ exclusion
- article layout canonical URLs
- navigation/internal links using clean URLs
