/* Munawar.in skill assessment report (uses munawar-pdf.js) */
(function () {
  'use strict';
  var P = window.MunawarPDF; if (!P) return;
  var Doc = P.Doc, width = P.width, wrap = P.wrap, C = P.C, PW = P.PW, PH = P.PH, M = P.M, CW = P.CW;
  /* ---------------- report layout ---------------- */
  var BOTTOM = PH - 64;
  function render(R) {
    var d = new Doc();
    var dateStr = R.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    function ensure(h) { if (d.y + h > BOTTOM) { d.add(); d.y = M + 6; return true; } return false; }
    function heading(t, sub) {
      ensure(sub ? 54 : 36);
      d.rect(M, d.y + 1, 3, 13, C.blue);
      d.text(M + 11, d.y + 12, t, 13.5, { bold: true });
      d.y += 22;
      if (sub) { d.y += d.para(M, d.y + 9, sub, 9.5, CW, { color: C.muted }) + 2; }
      d.y += 6;
    }
    var pctColor = function (p) { return p >= 0.75 ? C.mint : p >= 0.5 ? C.amber : C.red; };

    /* --- cover header --- */
    d.rect(0, 0, PW, 214, C.navy);
    d.rect(0, 0, PW, 4, C.blue);
    d.rr(M, 30, 22, 22, 6, C.blue); d.text(M + 11, 45.5, 'M', 11, { bold: true, color: C.white, align: 'center' });
    d.text(M + 30, 45.5, 'Munawar.in', 12.5, { bold: true, color: C.white });
    d.text(PW - M, 45.5, 'HR skill self-assessment', 9.5, { color: [166, 187, 214], align: 'right' });
    d.text(M, 92, 'Capability report', 26, { bold: true, color: C.white });
    d.text(M, 116, R.profile.name, 13, { color: [214, 228, 246] });
    d.text(M, 134, dateStr + '   ·   Time used ' + R.used + (R.timedOut ? ' (time limit reached)' : ''), 9.5, { color: [150, 172, 200] });
    // profile chips
    var cx = M, chips = [R.profile.level, R.profile.region, R.profile.focus].concat(R.profile.format ? [R.profile.format] : []);
    var cy = 152; chips.forEach(function (t) { var w = width(t, 8.5) + 18; if (cx + w > PW - M - 136) { cx = M; cy += 27; } d.rr(cx, cy, w, 22, 11, C.navy2); d.text(cx + 9, cy + 14.5, t, 8.5, { color: [222, 234, 250] }); cx += w + 6; });
    // score ring
    var rx = PW - M - 58, ry = 112, rr = 50;
    d.circle(rx, ry, rr + 10, [17, 40, 72]);
    d.arc(rx, ry, rr, 0, Math.PI * 2, [38, 62, 98], 9);
    if (R.score > 0) d.arc(rx, ry, rr, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(R.score, 100) / 100, C.mintL, 9);
    d.text(rx, ry + 8, String(R.score), 30, { bold: true, color: C.white, align: 'center' });
    d.text(rx, ry + 22, 'out of 100', 7.5, { color: [150, 172, 200], align: 'center' });

    /* --- verdict --- */
    d.y = 246;
    d.text(M, d.y, R.band[0], 18, { bold: true });
    d.y += 10;
    d.y += d.para(M, d.y + 10, R.band[1] + ' You answered ' + R.correct + ' of ' + R.total + ' questions correctly. The score is weighted, so harder questions count for more.', 10, CW, { color: C.muted }) + 14;

    /* --- stat cards --- */
    var stats = [['Correct answers', R.correct + ' / ' + R.total], ['Weighted score', R.score + ' / 100'], ['Demonstrated level', R.demoName || 'Not yet confirmed'], ['Typical for your experience', R.expectName]];
    var gw = 10, cw = (CW - gw * 3) / 4;
    stats.forEach(function (s, i) {
      var x = M + i * (cw + gw);
      d.rr(x, d.y, cw, 58, 10, C.soft, C.line, 0.6);
      d.text(x + 12, d.y + 20, s[0], 8, { color: C.muted });
      var lines = wrap(s[1], 11.5, true, cw - 24);
      lines.slice(0, 2).forEach(function (ln, k) { d.text(x + 12, d.y + 38 + k * 13, ln, 11.5, { bold: true }); });
    });
    d.y += 58 + 26;

    /* --- demonstrated level + chart --- */
    var lvlText = R.demo ? 'You performed at ' + R.demoName + ' level, ' + R.rel + ' what is typical for your selected experience (' + R.expectName + '). Each bar shows your accuracy at that difficulty; the outlined bar marks the level expected for your experience.' : 'Accuracy stayed below 60% at the starting difficulty, so a level could not be confirmed in this attempt. Each bar shows your accuracy at that difficulty.';
    heading('Accuracy by difficulty', lvlText);
    ensure(150);
    var chartH = 96, top = d.y + 18, bw = 58, gap = (CW - bw * 5) / 4;
    for (var g = 0; g <= 4; g++) { var gy = top + chartH - chartH * g / 4; d.line(M, gy, M + CW, gy, C.line, 0.5); }
    R.byLevel.forEach(function (b, i) {
      var x = M + i * (bw + gap), p = b ? b.c / b.n : null, h = p == null ? 0 : Math.max(3, chartH * p);
      d.rr(x, top, bw, chartH, 6, [247, 249, 253]);
      if (h) d.rr(x, top + chartH - h, bw, h, 6, i + 1 === R.expect ? C.blue : [120, 160, 232]);
      if (i + 1 === R.expect) d.rr(x - 3, top - 3, bw + 6, chartH + 6, 8, null, C.blue, 0.9);
      d.text(x + bw / 2, top - 8, p == null ? '–' : Math.round(p * 100) + '%', 9.5, { bold: true, align: 'center' });
      d.text(x + bw / 2, top + chartH + 14, 'Level ' + (i + 1), 8.5, { color: C.muted, align: 'center' });
      d.text(x + bw / 2, top + chartH + 25, b ? b.c + ' of ' + b.n : 'none', 7.5, { color: C.muted, align: 'center' });
    });
    d.y = top + chartH + 46;

    /* --- results by area --- */
    heading('Results by area');
    R.domains.forEach(function (x) {
      ensure(26);
      var p = x.c / x.n;
      d.rr(M, d.y, CW, 22, 7, C.soft);
      d.text(M + 10, d.y + 14.5, x.name, 9.5, { bold: true });
      var tx = M + 190, tw = CW - 190 - 92;
      d.rr(tx, d.y + 8, tw, 6, 3, C.track);
      if (p > 0) d.rr(tx, d.y + 8, Math.max(6, tw * p), 6, 3, pctColor(p));
      d.text(M + CW - 46, d.y + 14.5, x.c + ' / ' + x.n, 9.5, { bold: true, align: 'right' });
      d.text(M + CW - 10, d.y + 14.5, Math.round(p * 100) + '%', 9, { color: C.muted, align: 'right' });
      d.y += 26;
    });
    d.y += 14;

    /* --- strengths / gaps --- */
    var colW = (CW - 14) / 2;
    function listH(items) { var h = 0; items.forEach(function (t) { h += d.paraH(t, 9.5, colW - 34) + 6; }); return h; }
    var sItems = R.strengths.length ? R.strengths.map(function (x) { return x.name + '  ·  ' + x.c + ' of ' + x.n + ' correct'; }) : ['No area reached 75% in this attempt yet. Focus on the priority areas first.'];
    var gItems = R.gaps.length ? R.gaps.map(function (x) { return x.name + '  ·  ' + x.c + ' of ' + x.n + ' correct'; }) : ['No area fell below 60% in this attempt. Try a higher experience level to stretch further.'];
    var boxH = Math.max(listH(sItems), listH(gItems)) + 44;
    ensure(boxH + 10);
    [[sItems, 'Current strengths', C.mint, M], [gItems, 'Priority areas to improve', C.red, M + colW + 14]].forEach(function (col) {
      var x = col[3], yy = d.y;
      d.rr(x, yy, colW, boxH, 10, C.white, C.line, 0.7);
      d.rect(x, yy + 14, 3, 14, col[2]);
      d.text(x + 14, yy + 25, col[1], 11, { bold: true });
      yy += 44;
      col[0].forEach(function (t) { d.circle(x + 18, yy - 3, 2.2, col[2]); yy += d.para(x + 26, yy, t, 9.5, colW - 34) + 6; });
    });
    d.y += boxH + 22;

    /* --- development focus --- */
    if (R.actions.length) {
      heading('Development focus');
      R.actions.forEach(function (a, i) {
        var h = d.paraH(a, 9.5, CW - 44) + 14; ensure(h + 4);
        d.rr(M, d.y, CW, h, 8, C.soft);
        d.circle(M + 15, d.y + h / 2, 8, C.blue);
        d.text(M + 15, d.y + h / 2 + 3, String(i + 1), 8, { bold: true, color: C.white, align: 'center' });
        d.para(M + 32, d.y + 15, a, 9.5, CW - 44);
        d.y += h + 5;
      });
    }

    /* --- review --- */
    d.add(); d.y = M + 6;
    heading('Question-by-question review', 'Your answer, the strongest answer and the reasoning behind each scenario. Questions are listed in the order they were asked, from easier to harder.');
    R.review.forEach(function (q, i) {
      var iw = CW - 52, parts = [];
      parts.push({ h: d.paraH(q.q, 10, iw - 70, { bold: true, lh: 14 }) });
      var hYour = 12 + d.paraH(q.mine || 'Not answered', 9.5, iw, { lh: 13.5 });
      var hBest = q.ok ? 0 : 12 + d.paraH(q.best, 9.5, iw, { lh: 13.5 });
      var hWhy = 12 + d.paraH(q.why, 9, iw, { lh: 13 });
      var H = 16 + parts[0].h + 8 + hYour + 6 + (hBest ? hBest + 6 : 0) + hWhy + 8 + 14 + 8;
      ensure(H + 8);
      var y0 = d.y, col = q.ok ? C.mint : C.red;
      d.rr(M, y0, CW, H, 10, C.white, C.line, 0.7);
      d.rr(M + 0.5, y0 + 12, 3.5, H - 24, 1.75, col);
      d.circle(M + 24, y0 + 22, 11, C.soft2);
      d.text(M + 24, y0 + 25.5, String(i + 1), 9.5, { bold: true, align: 'center' });
      var tag = q.ok ? 'Correct' : q.mine == null ? 'Unanswered' : 'Incorrect', tw = width(tag, 8, true) + 16;
      d.rr(M + CW - 14 - tw, y0 + 12, tw, 17, 8.5, q.ok ? [226, 245, 238] : [251, 232, 230]);
      d.text(M + CW - 14 - tw / 2, y0 + 23.5, tag, 8, { bold: true, color: col, align: 'center' });
      var x = M + 44, y = y0 + 16 + 10;
      y += d.para(x, y, q.q, 10, iw - 70, { bold: true, lh: 14 }) + 8;
      function block(label, text, size, color) { d.text(x, y, label, 7.5, { bold: true, color: C.muted }); y += 12; y += d.para(x, y, text, size, iw, { lh: size === 9 ? 13 : 13.5, color: color }) + 6; }
      block('Your answer', q.mine || 'Not answered', 9.5, q.ok ? C.ink : [150, 60, 50]);
      if (!q.ok) block('Best answer', q.best, 9.5, [12, 110, 80]);
      block('Why', q.why, 9, C.muted);
      d.text(x, y + 6, q.area + '  ·  difficulty ' + q.l + ' of 5', 8, { color: C.blue });
      d.y = y0 + H + 8;
    });
    // disclaimer
    var disc = 'This is a practical HR capability self-assessment for personal learning. It is not a professional certification, an employment assessment or legal advice. UAE employment-law scenarios reflect Federal Decree-Law No. 33 of 2021 as commonly applied; always verify against current official sources and the facts of the specific case.';
    var dh = d.paraH(disc, 8.5, CW - 28) + 24; ensure(dh + 10); d.y += 6;
    d.rr(M, d.y, CW, dh, 8, C.soft);
    d.para(M + 14, d.y + 18, disc, 8.5, CW - 28, { color: C.muted });

    /* --- footers --- */
    var total = d.pages.length;
    d.pages.forEach(function (p, i) {
      d.cur = p;
      if (i > 0) { d.text(M, 28, 'Munawar.in', 9, { bold: true, color: C.blue }); d.text(PW - M, 28, 'HR skill self-assessment  ·  ' + R.profile.name, 8.5, { color: C.muted, align: 'right' }); d.line(M, 36, PW - M, 36, C.line, 0.6); }
      d.line(M, PH - 40, PW - M, PH - 40, C.line, 0.6);
      d.text(M, PH - 26, 'munawar.in/hr-hub/ai-hub', 8, { color: C.muted });
      d.text(PW / 2, PH - 26, dateStr, 8, { color: C.muted, align: 'center' });
      d.text(PW - M, PH - 26, 'Page ' + (i + 1) + ' of ' + total, 8, { color: C.muted, align: 'right' });
    });
    return d.build('HR skill self-assessment report - ' + R.profile.name);
  }

  function fileName(R) {
    var n = (R.profile.name || 'candidate').normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') || 'candidate';
    var dt = R.date, ds = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
    return 'HR-Skill-Report-' + n + '-' + ds + '.pdf';
  }
  function download(R) {
    var bytes = render(R), blob = new Blob([bytes], { type: 'application/pdf' }), url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = fileName(R); a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
  }
  window.MunawarSkillPDF = { render: render, download: download, fileName: fileName };
})();
