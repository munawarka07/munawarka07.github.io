MUNAWAR.IN ASSESSMENT ANALYTICS ADMIN

Upload these two files into your existing /admin/ folder:

1) assessment-analytics.html
2) assessment-analytics-link.js

Then add this ONE line to your existing /admin/index.html immediately before </body>:

<script src="/admin/assessment-analytics-link.js"></script>

After GitHub Pages deploys:
- Open https://munawar.in/admin/
- A blue "Assessment Analytics" button will appear at the bottom-right.
- Click it.
- Enter your ASSESSMENT_ADMIN_KEY.
- The dashboard shows visual results instead of raw JSON.

The key is stored only in sessionStorage for the current browser session.
No assessment names, emails, IP addresses or individual answers are displayed by this dashboard.
