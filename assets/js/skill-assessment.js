/* Munawar.in HR skill self-assessment (v2)
   - Question bank loads on demand from /assets/data/skill-bank.json
   - Fresh numerical questions are generated each attempt
   - Difficulty follows the chosen experience level and rises through the attempt
   - Options are shuffled; no feedback is shown until the report */
(function () {
  'use strict';
  var BANK_URL = '/assets/data/skill-bank.json?v=2';
  var TOTAL = 20, MAX_PAUSES = 3;
  var LEVELS = {
    starter:     { label: '0–1 year · Foundation',            minutes: 26, ramp: [1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4], expect: 2 },
    developing:  { label: '2–4 years · Independent practitioner', minutes: 28, ramp: [2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,5,5], expect: 3 },
    experienced: { label: '5–8 years · Senior / specialist',   minutes: 30, ramp: [2,2,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5], expect: 4 },
    leader:      { label: '9+ years · Lead / manager',         minutes: 32, ramp: [3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5], expect: 5 }
  };
  var REGIONS = { uae: 'UAE', global: 'Global' };
  var FOCUS = {
    comprehensive: { label: 'Comprehensive HR', d: null, numeric: 4 },
    payroll:   { label: 'Payroll & compensation', d: 'pay', numeric: 6 },
    lifecycle: { label: 'Employee lifecycle', d: 'life', numeric: 2 },
    talent:    { label: 'Recruitment, talent & workforce', d: 'tal', numeric: 3 },
    relations: { label: 'Employee relations', d: 'er', numeric: 1 },
    operations:{ label: 'HR operations & compliance', d: 'ops', numeric: 2 },
    analytics: { label: 'HRIS, data & analytics', d: 'ana', numeric: 5 },
    strategy:  { label: 'HRBP, strategy & leadership', d: 'str', numeric: 3 }
  };
  var DOMAINS = {
    pay: 'Payroll & compensation', ops: 'HR operations & compliance', life: 'Employee lifecycle',
    tal: 'Recruitment & talent', er: 'Employee relations', ana: 'HR data & analytics',
    str: 'Strategy & partnering', law: 'UAE employment law'
  };
  var TIERS = { 1: 'Foundation', 2: 'Practitioner', 3: 'Experienced practitioner', 4: 'Senior specialist', 5: 'Strategic lead' };
  var ACTIONS = {
    pay: ['Rebuild one month of payroll end to end: inputs, variance review, reconciliation and bank file.', 'Practise final settlement and proration calculations until the method is automatic.', 'Map your payroll controls to who inputs, who approves and who releases.'],
    ops: ['Pick one HR process and map it end to end, including hand-offs and waiting time.', 'Review how a recent policy change was embedded in systems, forms and manager guidance.', 'Learn the basics of records retention and personal data handling for HR files.'],
    life: ['Review your probation, transfer and exit steps against what the contract and policy actually allow.', 'Track time to productivity for recent joiners, not just checklist completion.', 'Study how phased returns and performance plans are run fairly and documented.'],
    tal: ['Practise structured interviewing with scoring guides and evidence notes.', 'Learn adverse impact checks and how to validate selection criteria.', 'Build a simple build/buy/borrow workforce plan for one critical role.'],
    er: ['Walk through a complete investigation: scope, evidence, balance of probabilities and reasoned findings.', 'Compare sanctions in similar past cases to understand consistency.', 'Learn when confidentiality, anonymity and whistleblowing protections apply.'],
    ana: ['Write precise definitions for headcount, turnover and absence before building any report.', 'Practise spotting mix effects, small-sample noise and selection bias.', 'Learn the governance basics for using people data responsibly.'],
    str: ['Before proposing solutions, practise writing the business problem in one sentence.', 'Frame your next recommendation as options against explicit criteria with trade-offs.', 'Connect one HR initiative to a measurable business outcome and track it.'],
    law: ['Re-read the current UAE labour law provisions on probation, leave, notice and end of service.', 'Work through gratuity calculations covering part-years, unpaid leave and the cap.', 'Check official MoHRE guidance for any updates before applying rules to cases.']
  };

  /* ---------- utilities ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function aed(v) { return 'AED ' + (Math.round(v * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function num(v, dp) { return (Math.round(v * Math.pow(10, dp)) / Math.pow(10, dp)).toFixed(dp); }
  function pct(v, dp) { return num(v * 100, dp == null ? 1 : dp) + '%'; }
  function distinct(correct, cands, fmt) {
    var out = [], seen = {}; seen[fmt(correct)] = 1;
    for (var i = 0; i < cands.length && out.length < 3; i++) { var s = fmt(cands[i]); if (!seen[s] && isFinite(cands[i])) { seen[s] = 1; out.push(s); } }
    var k = 1; while (out.length < 3) { var s2 = fmt(correct * (1 + 0.07 * k * (k % 2 ? 1 : -1))); if (!seen[s2]) { seen[s2] = 1; out.push(s2); } k++; }
    return [fmt(correct)].concat(out);
  }
  var MONTHS = [['January', 31], ['March', 31], ['April', 30], ['June', 30], ['July', 31], ['September', 30], ['October', 31], ['November', 30]];

  /* ---------- numerical question generators ---------- */
  var GEN = [
    { d: 'pay', l: 1, r: 'any', make: function () {
      var S = rnd(16, 48) * 500, m = pick(MONTHS), D = m[1], j = rnd(6, 24), days = D - j + 1, c = S / D * days;
      return { q: 'An employee with a monthly salary of ' + aed(S) + ' joins on ' + j + ' ' + m[0] + '. Using the calendar-day method, what is the salary for ' + m[0] + '?',
        o: distinct(c, [S / 30 * days, S / D * (days - 1), S / D * (j - 1), S / 30 * (30 - j + 1)], aed),
        e: m[0] + ' has ' + D + ' days. Payable days are ' + D + ' − ' + j + ' + 1 = ' + days + '. ' + aed(S) + ' ÷ ' + D + ' × ' + days + ' = ' + aed(c) + '.' }; } },
    { d: 'pay', l: 2, r: 'any', make: function () {
      var B = rnd(10, 30) * 500, H = rnd(6, 16) * 250, T = rnd(2, 6) * 250, G = B + H + T, m = pick(MONTHS), D = m[1], u = rnd(2, 6), c = G / D * (D - u);
      return { q: 'An employee earns basic ' + aed(B) + ', housing ' + aed(H) + ' and transport ' + aed(T) + ' a month. In ' + m[0] + ' they take ' + u + ' days of unpaid leave. Under the calendar-day method, what is the gross pay for the month?',
        o: distinct(c, [G / 30 * (30 - u), G - B / D * u, G / D * (D - u + 1), B / D * (D - u) + H + T], aed),
        e: 'Unpaid days reduce the whole gross: ' + aed(G) + ' ÷ ' + D + ' × (' + D + ' − ' + u + ') = ' + aed(c) + '.' }; } },
    { d: 'pay', l: 2, r: 'any', make: function () {
      var B = rnd(12, 40) * 500, G = B + rnd(8, 20) * 500, n = rnd(6, 24), c = B / 30 * n;
      return { q: 'Company policy pays unused annual leave on exit at basic salary ÷ 30 per day. An employee with basic ' + aed(B) + ' and gross ' + aed(G) + ' leaves with ' + n + ' unused days. What is the leave payment?',
        o: distinct(c, [G / 30 * n, B * 12 / 365 * n, B / 26 * n, B / 30 * (n - 1)], aed),
        e: 'The policy uses basic pay: ' + aed(B) + ' ÷ 30 × ' + n + ' = ' + aed(c) + '.' }; } },
    { d: 'pay', l: 3, r: 'any', make: function () {
      var B = rnd(10, 26) * 500, h1 = rnd(6, 14), h2 = rnd(3, 8), hr = B / 30 / 8, c = hr * (1.25 * h1 + 1.5 * h2);
      return { q: 'Policy sets the hourly rate at basic ÷ 30 ÷ 8, overtime at +25%, and overtime between 10 pm and 4 am at +50%. Basic is ' + aed(B) + '. The employee works ' + h1 + ' hours of daytime overtime and ' + h2 + ' hours of night overtime. What is the overtime pay?',
        o: distinct(c, [hr * 1.25 * (h1 + h2), hr * (1.5 * h1 + 1.25 * h2), hr * 1.5 * (h1 + h2), hr * (0.25 * h1 + 0.5 * h2)], aed),
        e: 'Hourly rate = ' + aed(B) + ' ÷ 30 ÷ 8 = ' + aed(hr) + '. Pay = ' + aed(hr) + ' × (' + h1 + ' × 1.25 + ' + h2 + ' × 1.5) = ' + aed(c) + '.' }; } },
    { d: 'pay', l: 3, r: 'any', make: function () {
      var M = rnd(24, 60) * 500, S = Math.round(M * (rnd(78, 122) / 100) / 50) * 50, c = S / M;
      var f = function (v) { return num(v, 2); };
      return { q: 'A grade has a midpoint of ' + aed(M) + '. An employee in the grade earns ' + aed(S) + '. What is the compa-ratio?',
        o: distinct(c, [M / S, (S - M) / M, S / (M * 1.2), c + 0.1], f),
        e: 'Compa-ratio = salary ÷ midpoint = ' + aed(S) + ' ÷ ' + aed(M) + ' = ' + f(c) + '.' }; } },
    { d: 'pay', l: 4, r: 'any', make: function () {
      var mn = rnd(20, 40) * 500, mx = Math.round(mn * (rnd(150, 170) / 100) / 500) * 500, S = Math.round((mn + (mx - mn) * (rnd(15, 85) / 100)) / 50) * 50, c = (S - mn) / (mx - mn);
      var f = function (v) { return pct(v, 0); };
      return { q: 'A salary range runs from ' + aed(mn) + ' to ' + aed(mx) + '. An employee earns ' + aed(S) + '. What is their range penetration?',
        o: distinct(c, [S / mx, (S - mn) / mx, S / ((mn + mx) / 2) - 0.5, 1 - c], f),
        e: 'Range penetration = (salary − minimum) ÷ (maximum − minimum) = (' + aed(S) + ' − ' + aed(mn) + ') ÷ (' + aed(mx) + ' − ' + aed(mn) + ') = ' + f(c) + '.' }; } },
    { d: 'law', l: 2, r: 'uae', f: ['pay'], make: function () {
      var B = rnd(8, 30) * 500, y = rnd(1, 4), mo = rnd(1, 11), yrs = y + mo / 12, dly = B / 30, c = 21 * yrs * dly;
      return { q: 'An employee resigns after ' + y + ' year' + (y > 1 ? 's' : '') + ' and ' + mo + ' months of continuous service. Last basic wage: ' + aed(B) + '. Using a daily rate of basic ÷ 30, what is the end-of-service gratuity?',
        o: distinct(c, [30 * yrs * dly, 21 * y * dly, 21 * yrs * B * 12 / 365 * 1.2, 21 * (y + 1) * dly], aed),
        e: 'Service is ' + num(yrs, 3) + ' years, all within the first five, so 21 days per year apply: 21 × ' + num(yrs, 3) + ' × ' + aed(dly) + ' = ' + aed(c) + '.' }; } },
    { d: 'law', l: 4, r: 'uae', f: ['pay'], make: function () {
      var B = rnd(10, 40) * 500, y = rnd(6, 11), mo = pick([3, 6, 9]), yrs = y + mo / 12, dly = B / 30, days = 21 * 5 + 30 * (yrs - 5), c = days * dly;
      return { q: 'An employee leaves after ' + y + ' years and ' + mo + ' months of continuous service. Last basic wage: ' + aed(B) + '. Using a daily rate of basic ÷ 30, what is the gratuity?',
        o: distinct(c, [21 * yrs * dly, 30 * yrs * dly, (21 * 5 + 30 * (y - 5)) * dly, (21 * 5 + 21 * (yrs - 5)) * dly], aed),
        e: 'First 5 years: 21 × 5 = 105 days. Remaining ' + num(yrs - 5, 2) + ' years × 30 = ' + num(30 * (yrs - 5), 1) + ' days. Total ' + num(days, 1) + ' days × ' + aed(dly) + ' = ' + aed(c) + '.' }; } },
    { d: 'law', l: 5, r: 'uae', f: ['pay'], make: function () {
      var B = rnd(12, 36) * 500, y = rnd(6, 9), mo = 6, u = pick([36.5, 73, 91.25]), tot = y + mo / 12, eff = tot - u / 365, dly = B / 30, days = 105 + 30 * (eff - 5), c = days * dly;
      return { q: 'Total time with the employer is ' + y + ' years and 6 months, including ' + u + ' days of unpaid leave. Last basic wage: ' + aed(B) + '. Using basic ÷ 30 as the daily rate, what is the gratuity?',
        o: distinct(c, [(105 + 30 * (tot - 5)) * dly, 21 * eff * dly, (21 * eff) * dly + 30 * dly, (105 + 21 * (eff - 5)) * dly], aed),
        e: 'Unpaid leave is excluded: ' + num(tot, 2) + ' − ' + u + '/365 = ' + num(eff, 2) + ' years. 105 days for the first five years + 30 × ' + num(eff - 5, 2) + ' = ' + num(days, 1) + ' days × ' + aed(dly) + ' = ' + aed(c) + '.' }; } },
    { d: 'ana', l: 2, r: 'any', make: function () {
      var H0 = rnd(180, 420), H1 = H0 + rnd(-30, 40), L = rnd(18, 60), avg = (H0 + H1) / 2, c = L / avg;
      return { q: 'Headcount was ' + H0 + ' at the start of the year and ' + H1 + ' at the end. There were ' + L + ' leavers. Using average headcount, what is the annual turnover rate?',
        o: distinct(c, [L / H0, L / H1, L / (H0 + H1), L / Math.max(H0, H1) * 1.1], function (v) { return pct(v); }),
        e: 'Average headcount = (' + H0 + ' + ' + H1 + ') ÷ 2 = ' + num(avg, 1) + '. Turnover = ' + L + ' ÷ ' + num(avg, 1) + ' = ' + pct(c) + '.' }; } },
    { d: 'ana', l: 3, r: 'any', make: function () {
      var A = rnd(120, 300), L = rnd(6, 18), q = L / A, c = q * 4;
      return { q: 'In one quarter, a unit with an average headcount of ' + A + ' had ' + L + ' leavers. Assuming the same pace, what is the annualised turnover rate?',
        o: distinct(c, [q, q * 12, q * 3, 1 - Math.pow(1 - q, 2)], function (v) { return pct(v); }),
        e: 'Quarterly rate = ' + L + ' ÷ ' + A + ' = ' + pct(q) + '. Annualised = × 4 = ' + pct(c) + '.' }; } },
    { d: 'ana', l: 3, r: 'any', make: function () {
      var H = rnd(80, 200), days = 22, lost = rnd(90, 260), c = lost / (H * days);
      return { q: 'A team of ' + H + ' employees had ' + days + ' working days last month and lost ' + lost + ' working days to absence. What was the absence rate?',
        o: distinct(c, [lost / (H * 30), lost / H / 100, lost / (H * days) * 12, lost / (H * 5)], function (v) { return pct(v, 2); }),
        e: 'Absence rate = days lost ÷ available days = ' + lost + ' ÷ (' + H + ' × ' + days + ') = ' + pct(c, 2) + '.' }; } },
    { d: 'tal', l: 4, r: 'any', make: function () {
      var aA = rnd(80, 200), aB = rnd(60, 180), rA = rnd(30, 50) / 100, rB = rA * (Math.random() < 0.55 ? rnd(55, 76) : rnd(84, 98)) / 100, hA = Math.round(aA * rA), hB = Math.round(aB * rB), sA = hA / aA, sB = hB / aB, lo = Math.min(sA, sB), hi = Math.max(sA, sB), ratio = lo / hi, flag = ratio < 0.8;
      var right = num(ratio, 2) + (flag ? ' — below 0.8, possible adverse impact' : ' — at or above 0.8, no adverse impact indicated');
      var wrong = [num(ratio, 2) + (flag ? ' — at or above 0.8, no adverse impact indicated' : ' — below 0.8, possible adverse impact'),
        num(hi / lo, 2) + ' — above 1, so no adverse impact is indicated',
        num(Math.abs(sA - sB) * 100, 1) + ' points — within the 20-point tolerance'];
      return { q: 'Group A: ' + aA + ' applicants, ' + hA + ' hired. Group B: ' + aB + ' applicants, ' + hB + ' hired. Using the four-fifths guideline, what is the impact ratio and conclusion?',
        o: [right].concat(wrong),
        e: 'Selection rates: A ' + pct(sA) + ', B ' + pct(sB) + '. Impact ratio = lower ÷ higher = ' + num(ratio, 2) + (flag ? ', below 0.8, so adverse impact should be reviewed.' : ', which meets the 0.8 guideline.') }; } },
    { d: 'tal', l: 2, r: 'any', make: function () {
      var hires = rnd(12, 40), ext = rnd(40, 120) * 1000, int = rnd(20, 70) * 1000, c = (ext + int) / hires;
      return { q: 'Last quarter, recruitment cost ' + aed(ext) + ' in external spend (agencies, adverts) and ' + aed(int) + ' in internal cost (recruiter time, tools). There were ' + hires + ' hires. What is the cost per hire?',
        o: distinct(c, [ext / hires, int / hires, (ext + int) / (hires * 3), (ext - int) / hires], aed),
        e: 'Cost per hire = (external + internal) ÷ hires = ' + aed(ext + int) + ' ÷ ' + hires + ' = ' + aed(c) + '.' }; } },
    { d: 'str', l: 4, r: 'any', f: ['tal', 'ops'], make: function () {
      var W = rnd(18, 48) * 25, std = 40, util = pick([0.8, 0.85]), cap = std * util, c = Math.ceil(W / cap);
      var f = function (v) { return v + ' FTE'; };
      return { q: 'A service team must deliver ' + W + ' hours of work per week. Each full-time employee works ' + std + ' hours, of which ' + Math.round(util * 100) + '% is productive. How many full-time employees are needed, rounded up?',
        o: [f(c)].concat(shuffle([Math.ceil(W / std), Math.floor(W / cap), Math.ceil(W / (std * (util + 0.1))), c + 2, Math.round(W / 37.5)].filter(function (v, i, a) { return v !== c && a.indexOf(v) === i; })).slice(0, 3).map(f)),
        e: 'Productive hours per FTE = ' + std + ' × ' + util + ' = ' + cap + '. ' + W + ' ÷ ' + cap + ' = ' + num(W / cap, 2) + ', rounded up to ' + c + '.' }; } },
    { d: 'pay', l: 5, r: 'any', make: function () {
      var n = rnd(180, 420), avg = rnd(14, 30) * 500, inc = rnd(3, 6) / 100, eff = pick([4, 7]), months = 13 - eff, c = n * avg * inc * months;
      var mName = { 4: 'April', 7: 'July' }[eff];
      return { q: n + ' employees with an average monthly salary of ' + aed(avg) + ' receive a ' + Math.round(inc * 100) + '% increase effective 1 ' + mName + '. What is the added salary cost for this calendar year, before employer on-costs?',
        o: distinct(c, [n * avg * inc * 12, n * avg * inc * (months - 1), n * avg * (1 + inc) * months, n * avg * inc * months / 12 * 13], aed),
        e: 'Monthly uplift = ' + n + ' × ' + aed(avg) + ' × ' + Math.round(inc * 100) + '% = ' + aed(n * avg * inc) + '. From ' + mName + ' to December is ' + months + ' months: ' + aed(c) + '.' }; } }
  ];

  /* ---------- state ---------- */
  var bank = null, bankPromise = null, S = null, timerId = null;
  function loadBank() {
    if (bank) return Promise.resolve(bank);
    if (!bankPromise) bankPromise = fetch(BANK_URL, { cache: 'force-cache' }).then(function (r) { if (!r.ok) throw new Error('bank'); return r.json(); }).then(function (j) { bank = j; return j; });
    return bankPromise;
  }
  function seenIds() { try { return JSON.parse(localStorage.getItem('mwSkillSeen') || '[]'); } catch (e) { return []; } }
  function saveSeen(ids) { try { var s = seenIds().concat(ids).slice(-120); localStorage.setItem('mwSkillSeen', JSON.stringify(s)); } catch (e) {} }

  function domainPlan(focus, region) {
    var all = ['pay', 'ops', 'life', 'tal', 'er', 'ana', 'str'], plan = [];
    var fd = FOCUS[focus].d;
    if (fd) { for (var i = 0; i < 10; i++) plan.push(fd); var others = shuffle(all.filter(function (x) { return x !== fd; })); for (var k = 0; plan.length < TOTAL; k++) plan.push(others[k % others.length]); }
    else { var base = shuffle(all); for (var j = 0; plan.length < TOTAL; j++) plan.push(base[j % base.length]); }
    if (region === 'uae') { var n = fd ? 3 : 4, idx = shuffle(plan.map(function (_, i) { return i; }).filter(function (i) { return plan[i] !== fd; })).slice(0, n); idx.forEach(function (i) { plan[i] = 'law'; }); }
    return shuffle(plan);
  }
  function build(level, region, focus) {
    var ramp = LEVELS[level].ramp.slice(), plan = domainPlan(focus, region), seen = seenIds(), used = {};
    var pool = bank.filter(function (q) { return region === 'uae' || q.r !== 'uae'; });
    var fd = FOCUS[focus].d, numericN = FOCUS[focus].numeric, out = [];
    // pick slots for numeric questions, spread across the ramp
    var gens = GEN.filter(function (g) { return (region === 'uae' || g.r !== 'uae') && (!fd || g.d === fd || (g.f || []).indexOf(fd) >= 0 || numericN <= 3); });
    gens = gens.filter(function (g) { return g.l >= ramp[0]; }); numericN = Math.min(numericN, gens.length);
    var genSlots = {}; for (var s = 0; s < numericN; s++) genSlots[Math.floor((s + 0.5) * TOTAL / numericN)] = 1;
    var usedGen = {};
    for (var i = 0; i < TOTAL; i++) {
      var t = ramp[i], d = plan[i], q = null;
      if (genSlots[i]) {
        var gc = gens.filter(function (g) { return !usedGen[GEN.indexOf(g)]; });
        gc.sort(function (a, b) { return Math.abs(a.l - t) - Math.abs(b.l - t) || (Math.random() - 0.5); });
        var near = gc.filter(function (g) { return Math.abs(g.l - t) === Math.abs(gc[0].l - t); });
        if (near.length) { var g = pick(near); usedGen[GEN.indexOf(g)] = 1; var m = g.make(); q = { id: 'gen' + GEN.indexOf(g), d: g.d, l: g.l, q: m.q, o: m.o, e: m.e, gen: true }; }
      }
      if (!q) {
        var match = function (x) { return !used[x.id] && (x.d === d || (x.f || []).indexOf(d) >= 0 || (d === 'law' && x.d === 'law')); };
        for (var delta = 0; delta <= 4 && !q; delta++) {
          var c = pool.filter(function (x) { return match(x) && Math.abs(x.l - t) === delta; });
          var fresh = c.filter(function (x) { return seen.indexOf(x.id) < 0; });
          if (c.length) q = pick(fresh.length ? fresh : c);
        }
        if (!q) { var any = pool.filter(function (x) { return !used[x.id]; }); any.sort(function (a, b) { return Math.abs(a.l - t) - Math.abs(b.l - t); }); q = any[0]; }
        used[q.id] = 1;
      }
      var correct = q.o[0], opts = shuffle(q.o);
      out.push({ id: q.id, d: q.d, l: q.l, q: q.q, e: q.e, opts: opts, ans: opts.indexOf(correct), pick: -1, gen: !!q.gen });
    }
    out.sort(function (a, b) { return a.l - b.l; });
    return out;
  }

  /* ---------- views ---------- */
  var VIEWS = ['skillIntro', 'skillInstructions', 'skillQuestions', 'skillResults'];
  function show(id) { VIEWS.forEach(function (v) { var el = $(v); if (el) el.classList.toggle('open', v === id); }); var box = document.querySelector('#skillModal .ai-box'); if (box) { box.scrollTop = 0; box.setAttribute('data-stage', id); } }
  function profile() { return { name: ($('skillName').value || '').trim(), level: $('skillLevel').value, region: $('skillRegion').value, focus: $('skillFocus').value }; }
  function fmtTime(s) { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }

  function open(ev) {
    if (ev) { ev.preventDefault(); ev.stopPropagation(); }
    var m = $('skillModal'); m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    if (!S || S.done || !S.started) show('skillIntro');
    loadBank().catch(function () {});
    return false;
  }
  function close(ev) {
    if (ev) ev.preventDefault();
    if (S && S.started && !S.done && !confirm('Close the assessment? This attempt will be lost.')) return false;
    stopTimer(); S = null;
    var m = $('skillModal'); m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
    $('skillPauseOverlay').classList.remove('open');
    return false;
  }
  function review(ev) {
    if (ev) ev.preventDefault();
    var p = profile(), req = $('skillRequired');
    if (!p.name || !p.level || !p.region || !p.focus) { req.classList.add('show'); return false; }
    req.classList.remove('show');
    var L = LEVELS[p.level];
    $('skillProfileSummary').innerHTML = '<div><span>Candidate</span><b>' + esc(p.name) + '</b></div><div><span>Experience</span><b>' + esc(L.label) + '</b></div><div><span>Context</span><b>' + esc(REGIONS[p.region]) + '</b></div><div><span>Specialism</span><b>' + esc(FOCUS[p.focus].label) + '</b></div>';
    $('skillInstructionTime').textContent = 'You have ' + L.minutes + ' minutes for 20 questions. Questions start at your level and get harder as you go, so budget more time for the later ones.';
    $('skillHonour').checked = false; $('skillInstructionRequired').classList.remove('show');
    show('skillInstructions');
    return false;
  }
  function edit(ev) { if (ev) ev.preventDefault(); show('skillIntro'); return false; }
  function start(ev) {
    if (ev) ev.preventDefault();
    if (!$('skillHonour').checked) { $('skillInstructionRequired').classList.add('show'); return false; }
    var btn = $('skillStartExamBtn'); btn.disabled = true; btn.textContent = 'Preparing questions…';
    loadBank().then(function () {
      var p = profile();
      S = { p: p, qs: build(p.level, p.region, p.focus), i: 0, left: LEVELS[p.level].minutes * 60, pauses: MAX_PAUSES, started: true, done: false, t0: Date.now() };
      renderQ(); show('skillQuestions'); startTimer();
    }).catch(function () {
      alert('The question bank could not be loaded. Please check your connection and try again.');
    }).then(function () { btn.disabled = false; btn.textContent = 'Start timed assessment →'; });
    return false;
  }
  function startTimer() { stopTimer(); var last = Date.now(); timerId = setInterval(function () { var now = Date.now(); S.left -= (now - last) / 1000; last = now; paintTimer(); if (S.left <= 0) { submit(true); } }, 250); paintTimer(); }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  function paintTimer() { var t = $('skillTimer'); t.textContent = fmtTime(S.left); t.classList.toggle('low', S.left < 120); }
  function renderQ() {
    var q = S.qs[S.i], n = S.i + 1;
    $('skillCount').innerHTML = 'Question <b>' + n + '</b> of ' + TOTAL;
    $('skillProgressBar').style.width = (n / TOTAL * 100) + '%';
    $('skillDomain').innerHTML = esc(DOMAINS[q.d]) + ' <span class="sk-diff" aria-label="Difficulty ' + q.l + ' of 5">' + [1, 2, 3, 4, 5].map(function (k) { return '<i class="' + (k <= q.l ? 'on' : '') + '"></i>'; }).join('') + '</span>';
    $('skillQuestionText').textContent = q.q;
    $('skillOptions').innerHTML = q.opts.map(function (o, k) { return '<button type="button" class="skill-option' + (q.pick === k ? ' selected' : '') + '" data-k="' + k + '" aria-pressed="' + (q.pick === k) + '"><span class="sk-letter">' + 'ABCD'[k] + '</span><span class="sk-text">' + esc(o) + '</span></button>'; }).join('');
    $('skillBack').disabled = S.i === 0;
    var nx = $('skillNext'); nx.disabled = q.pick < 0; nx.textContent = S.i === TOTAL - 1 ? 'Submit assessment ✓' : 'Next →';
    $('skillPauseBtn').textContent = 'Pause · ' + S.pauses + ' left'; $('skillPauseBtn').disabled = S.pauses <= 0;
    var qa = document.querySelector('#skillQuestions .sk-qwrap'); if (qa) { qa.classList.remove('sk-in'); void qa.offsetWidth; qa.classList.add('sk-in'); }
  }
  function choose(k) { var q = S.qs[S.i]; q.pick = k; [].forEach.call(document.querySelectorAll('#skillOptions .skill-option'), function (b, i) { b.classList.toggle('selected', i === k); b.setAttribute('aria-pressed', i === k); }); $('skillNext').disabled = false; }
  function next(ev) { if (ev) ev.preventDefault(); if (S.qs[S.i].pick < 0) return false; if (S.i === TOTAL - 1) { var un = S.qs.filter(function (q) { return q.pick < 0; }).length; if (un && !confirm(un + ' question(s) unanswered. Submit anyway?')) return false; submit(false); } else { S.i++; renderQ(); } return false; }
  function prev(ev) { if (ev) ev.preventDefault(); if (S.i > 0) { S.i--; renderQ(); } return false; }
  function pause(ev) { if (ev) ev.preventDefault(); if (!S || S.pauses <= 0) return false; S.pauses--; stopTimer(); $('skillPauseTime').textContent = fmtTime(S.left); var o = $('skillPauseOverlay'); o.classList.add('open'); o.setAttribute('aria-hidden', 'false'); return false; }
  function resume(ev) { if (ev) ev.preventDefault(); var o = $('skillPauseOverlay'); o.classList.remove('open'); o.setAttribute('aria-hidden', 'true'); renderQ(); startTimer(); return false; }

  /* ---------- results ---------- */
  function submit(timedOut) {
    stopTimer(); S.done = true; S.timedOut = timedOut; S.used = LEVELS[S.p.level].minutes * 60 - Math.max(0, S.left);
    saveSeen(S.qs.filter(function (q) { return !q.gen; }).map(function (q) { return q.id; }));
    var w = 0, got = 0, correct = 0, byD = {}, byL = {};
    S.qs.forEach(function (q) {
      var ok = q.pick === q.ans; w += q.l; if (ok) { got += q.l; correct++; }
      (byD[q.d] = byD[q.d] || { n: 0, c: 0 }).n++; if (ok) byD[q.d].c++;
      (byL[q.l] = byL[q.l] || { n: 0, c: 0 }).n++; if (ok) byL[q.l].c++;
    });
    var score = Math.round(got / w * 100), expect = LEVELS[S.p.level].expect;
    // demonstrated tier: climb the difficulty levels while accuracy holds at 60%+ (levels with fewer than 2 questions are skipped)
    var demo = 0, first = 0; for (var l = 1; l <= 5; l++) { var b = byL[l]; if (!b || b.n < 2) continue; if (!first) first = l; if (b.c / b.n >= 0.6) demo = l; else { if (!demo && l > 1) demo = l - 1; break; } }
    var band = score >= 85 ? ['Strong command', 'You handled difficult scenarios with consistent judgement.'] : score >= 70 ? ['Solid capability', 'Your judgement is reliable on most scenarios, with a few gaps at higher difficulty.'] : score >= 55 ? ['Developing capability', 'You have a working base, but harder scenarios exposed gaps worth closing.'] : ['Foundation gaps', 'Several core areas need structured learning before tackling complex cases.'];
    var rel = demo > expect ? 'above' : demo === expect ? 'in line with' : 'below';
    $('skillScore').innerHTML = '<span class="sk-ring" style="--p:' + score + '"><b>' + score + '</b><small>/100</small></span>';
    $('skillResultTitle').textContent = band[0];
    $('skillResultSummary').textContent = band[1] + ' You answered ' + correct + ' of 20 correctly' + (timedOut ? ' before time ran out' : '') + '. The score is weighted, so harder questions count for more.';
    $('skillMeta').innerHTML = [esc(S.p.name), esc(LEVELS[S.p.level].label), esc(REGIONS[S.p.region]), esc(FOCUS[S.p.focus].label), 'Time used ' + fmtTime(S.used)].map(function (x) { return '<span class="skill-meta-pill">' + x + '</span>'; }).join('');
    var lvlHtml = '<div class="sk-level"><div class="sk-level-head"><h3>Demonstrated level</h3><p>' + (demo ? 'You performed at <b>' + TIERS[demo] + '</b> level, ' + rel + ' what is typical for your selected experience (' + TIERS[expect] + ').' : 'Accuracy stayed below 60% across difficulty levels in this attempt, so no level could be confirmed yet.') + '</p></div><div class="sk-curve">' +
      [1, 2, 3, 4, 5].map(function (l) { var b = byL[l]; var v = b ? Math.round(b.c / b.n * 100) : null; return '<div class="sk-col' + (l === expect ? ' exp' : '') + '"><div class="sk-bar"><i style="height:' + (v == null ? 0 : Math.max(4, v)) + '%"></i></div><b>' + (v == null ? '–' : v + '%') + '</b><span>Level ' + l + '</span></div>'; }).join('') + '</div></div>';
    var dom = Object.keys(byD).map(function (k) { return { k: k, n: byD[k].n, c: byD[k].c, p: byD[k].c / byD[k].n }; }).sort(function (a, b) { return b.p - a.p || b.n - a.n; });
    $('skillDomainResults').innerHTML = lvlHtml + dom.map(function (x) { var p = Math.round(x.p * 100); return '<div class="domain-row"><span>' + esc(DOMAINS[x.k]) + '</span><div class="domain-track"><i style="width:' + p + '%"></i></div><b>' + x.c + '/' + x.n + '</b></div>'; }).join('');
    var strong = dom.filter(function (x) { return x.p >= 0.75 && x.n >= 2; }), weak = dom.filter(function (x) { return x.p < 0.6; }).sort(function (a, b) { return a.p - b.p; });
    $('skillStrengths').innerHTML = (strong.length ? strong : dom.slice(0, 1)).map(function (x) { return '<li><b>' + esc(DOMAINS[x.k]) + '</b> · ' + x.c + ' of ' + x.n + ' correct</li>'; }).join('');
    $('skillGaps').innerHTML = weak.length ? weak.map(function (x) { return '<li><b>' + esc(DOMAINS[x.k]) + '</b> · ' + x.c + ' of ' + x.n + ' correct</li>'; }).join('') : '<li>No area fell below 60% in this attempt. Try a higher experience level to stretch further.</li>';
    var acts = []; (weak.length ? weak : dom.slice(-2)).slice(0, 3).forEach(function (x) { (ACTIONS[x.k] || []).slice(0, 2).forEach(function (a) { acts.push('<li>' + esc(a) + '</li>'); }); });
    $('skillActions').innerHTML = acts.join('');
    $('skillReview').innerHTML = S.qs.map(function (q, i) {
      var ok = q.pick === q.ans;
      return '<details class="skill-review-item ' + (ok ? 'ok' : 'bad') + '"><summary><span class="sk-n">' + (i + 1) + '</span><span class="sk-q">' + esc(q.q) + '</span><span class="sk-res">' + (ok ? 'Correct' : q.pick < 0 ? 'Unanswered' : 'Incorrect') + '</span></summary>' +
        '<div class="sk-rv"><p><span>Your answer</span>' + (q.pick < 0 ? '—' : esc(q.opts[q.pick])) + '</p>' + (ok ? '' : '<p><span>Best answer</span>' + esc(q.opts[q.ans]) + '</p>') + '<p class="sk-why"><span>Why</span>' + esc(q.e) + '</p><p class="sk-tag">' + esc(DOMAINS[q.d]) + ' · difficulty ' + q.l + ' of 5</p></div></details>';
    }).join('');
    show('skillResults');
  }
  function pdf(ev) { if (ev) ev.preventDefault(); [].forEach.call(document.querySelectorAll('#skillReview details'), function (d) { d.open = true; }); document.documentElement.classList.add('sk-printing'); setTimeout(function () { window.print(); }, 60); return false; }
  window.addEventListener('afterprint', function () { document.documentElement.classList.remove('sk-printing'); });
  function retake(ev) { if (ev) ev.preventDefault(); S = null; review(); return false; }

  /* ---------- wiring ---------- */
  document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('#skillOptions .skill-option'); if (b && S && !S.done) choose(+b.getAttribute('data-k')); });
  document.addEventListener('keydown', function (e) {
    var m = $('skillModal'); if (!m || !m.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (!S || S.done || !$('skillQuestions').classList.contains('open') || $('skillPauseOverlay').classList.contains('open')) return;
    var k = 'abcd'.indexOf(e.key.toLowerCase()); if (k < 0) k = '1234'.indexOf(e.key);
    if (k >= 0) choose(k); else if (e.key === 'Enter' && !$('skillNext').disabled) next(); else if (e.key === 'ArrowLeft') prev();
  });
  window.MunawarAssessment = { open: open, review: review, edit: edit, start: start, pause: pause, resume: resume, prev: prev, next: next, pdf: pdf, retake: retake, close: close };
  window.closeSkillAssessment = close; window.openSkillAssessment = open;
  // test hook for automated checks
  window.__skillTest = { build: function (l, r, f) { return loadBank().then(function () { return build(l, r, f); }); }, gen: GEN };
})();
