/* Munawar.in skill report: builds a real A4 PDF in the browser and downloads it directly.
   No external libraries: standard Helvetica fonts, vector shapes, WinAnsi text. */
(function () {
  'use strict';
var W_R=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,350,556,350,222,556,333,1000,556,556,333,1000,667,333,1000,350,611,350,350,222,222,333,333,350,556,1000,333,1000,500,333,944,350,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500];
var W_B=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,350,556,350,278,556,500,1000,556,556,333,1000,667,333,1000,350,611,350,350,278,278,500,500,350,556,1000,333,1000,556,333,944,350,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556];
var CP={8364:128,8218:130,402:131,8222:132,8230:133,8224:134,8225:135,710:136,8240:137,352:138,8249:139,338:140,381:142,8216:145,8217:146,8220:147,8221:148,8226:149,8211:150,8212:151,732:152,8482:153,353:154,8250:155,339:156,382:158,376:159};

  var PW = 595.28, PH = 841.89, M = 44, CW = PW - 2 * M;
  var C = { navy: [11, 27, 45], navy2: [22, 52, 98], blue: [28, 95, 212], cyan: [54, 200, 223], mint: [18, 161, 115], mintL: [95, 224, 184], red: [217, 72, 59], amber: [214, 140, 26],
    ink: [11, 27, 45], muted: [93, 111, 132], line: [227, 233, 241], soft: [244, 247, 252], soft2: [236, 242, 251], white: [255, 255, 255], track: [225, 233, 246] };
  var SUB = { '→': '->', '✓': '', '≥': '>=', '≤': '<=', '−': '-', '‑': '-', ' ': ' ', ' ': ' ', ' ': ' ', '≈': '~' };
  function enc(str) {
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i], cc = str.charCodeAt(i);
      if (SUB[ch] != null) { out += enc(SUB[ch]); continue; }
      if (cc < 128 || (cc >= 160 && cc < 256)) out += ch;
      else if (CP[cc]) out += String.fromCharCode(CP[cc]);
      else out += '?';
    }
    return out;
  }
  function width(s, size, bold) { var W = bold ? W_B : W_R, t = 0, e = enc(s); for (var i = 0; i < e.length; i++) t += W[e.charCodeAt(i)] || 556; return t * size / 1000; }
  function wrap(s, size, bold, maxW) {
    var words = String(s).split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (width(t, size, bold) <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function esc(s) { return enc(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)'); }
  function rgb(c) { return (c[0] / 255).toFixed(3) + ' ' + (c[1] / 255).toFixed(3) + ' ' + (c[2] / 255).toFixed(3); }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }

  function Doc() { this.pages = []; this.add(); }
  Doc.prototype.add = function () { this.cur = []; this.pages.push(this.cur); this.y = M; return this; };
  Doc.prototype.op = function (s) { this.cur.push(s); };
  Doc.prototype.fill = function (c) { this.op(rgb(c) + ' rg'); };
  Doc.prototype.stroke = function (c) { this.op(rgb(c) + ' RG'); };
  Doc.prototype.rect = function (x, y, w, h, c) { this.fill(c); this.op(f(x) + ' ' + f(PH - y - h) + ' ' + f(w) + ' ' + f(h) + ' re f'); };
  Doc.prototype.rrPath = function (x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2); var k = 0.5523 * r, X = x, Y = PH - y - h, o = this;
    o.op(f(X + r) + ' ' + f(Y) + ' m ' + f(X + w - r) + ' ' + f(Y) + ' l ' + f(X + w - r + k) + ' ' + f(Y) + ' ' + f(X + w) + ' ' + f(Y + r - k) + ' ' + f(X + w) + ' ' + f(Y + r) + ' c ' +
      f(X + w) + ' ' + f(Y + h - r) + ' l ' + f(X + w) + ' ' + f(Y + h - r + k) + ' ' + f(X + w - r + k) + ' ' + f(Y + h) + ' ' + f(X + w - r) + ' ' + f(Y + h) + ' c ' +
      f(X + r) + ' ' + f(Y + h) + ' l ' + f(X + r - k) + ' ' + f(Y + h) + ' ' + f(X) + ' ' + f(Y + h - r + k) + ' ' + f(X) + ' ' + f(Y + h - r) + ' c ' +
      f(X) + ' ' + f(Y + r) + ' l ' + f(X) + ' ' + f(Y + r - k) + ' ' + f(X + r - k) + ' ' + f(Y) + ' ' + f(X + r) + ' ' + f(Y) + ' c h');
  };
  Doc.prototype.rr = function (x, y, w, h, r, fillC, strokeC, lw) {
    this.rrPath(x, y, w, h, r);
    if (fillC && strokeC) { this.fill(fillC); this.stroke(strokeC); this.op(f(lw || 0.8) + ' w B'); }
    else if (fillC) { this.fill(fillC); this.op('f'); }
    else { this.stroke(strokeC); this.op(f(lw || 0.8) + ' w S'); }
  };
  Doc.prototype.line = function (x1, y1, x2, y2, c, lw, dash) { this.stroke(c); this.op((dash ? '[' + dash + '] 0 d ' : '') + f(lw || 0.6) + ' w ' + f(x1) + ' ' + f(PH - y1) + ' m ' + f(x2) + ' ' + f(PH - y2) + ' l S' + (dash ? ' [] 0 d' : '')); };
  Doc.prototype.arc = function (cx, cy, r, a0, a1, c, lw) {
    var n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 0.06)), pts = [];
    for (var i = 0; i <= n; i++) { var a = a0 + (a1 - a0) * i / n; pts.push(f(cx + r * Math.cos(a)) + ' ' + f(PH - (cy + r * Math.sin(a)))); }
    this.stroke(c); this.op('1 J ' + f(lw) + ' w ' + pts[0] + ' m ' + pts.slice(1).join(' l ') + ' l S 0 J');
  };
  Doc.prototype.circle = function (cx, cy, r, c) { this.rr(cx - r, cy - r, 2 * r, 2 * r, r, c); };
  Doc.prototype.text = function (x, y, s, size, opt) {
    opt = opt || {}; var bold = !!opt.bold, w = width(s, size, bold);
    if (opt.align === 'right') x -= w; else if (opt.align === 'center') x -= w / 2;
    this.fill(opt.color || C.ink);
    this.op('BT /' + (bold ? 'F2' : 'F1') + ' ' + f(size) + ' Tf ' + f(x) + ' ' + f(PH - y) + ' Td (' + esc(s) + ') Tj ET');
    return w;
  };
  Doc.prototype.para = function (x, y, s, size, maxW, opt) {
    opt = opt || {}; var lh = opt.lh || size * 1.45, lines = wrap(s, size, opt.bold, maxW), d = this;
    lines.forEach(function (ln, i) { d.text(x, y + i * lh, ln, size, opt); });
    return lines.length * lh;
  };
  Doc.prototype.paraH = function (s, size, maxW, opt) { opt = opt || {}; return wrap(s, size, opt.bold, maxW).length * (opt.lh || size * 1.45); };
  Doc.prototype.build = function (title) {
    var objs = [], pageIds = [], o = function (s) { objs.push(s); return objs.length; };
    var cat = o(''), pages = o(''), f1 = o('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'), f2 = o('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    this.pages.forEach(function (p) {
      var stream = p.join('\n'), cs = o('<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream');
      pageIds.push(o('<< /Type /Page /Parent ' + pages + ' 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] /Resources << /Font << /F1 ' + f1 + ' 0 R /F2 ' + f2 + ' 0 R >> >> /Contents ' + cs + ' 0 R >>'));
    });
    objs[cat - 1] = '<< /Type /Catalog /Pages ' + pages + ' 0 R >>';
    objs[pages - 1] = '<< /Type /Pages /Kids [' + pageIds.map(function (i) { return i + ' 0 R'; }).join(' ') + '] /Count ' + pageIds.length + ' >>';
    var info = o('<< /Title (' + esc(title) + ') /Author (Munawar.in) /Creator (Munawar.in HR skill self-assessment) >>');
    var out = '%PDF-1.4\n%âãÏÓ\n', offs = [];
    objs.forEach(function (s, i) { offs.push(out.length); out += (i + 1) + ' 0 obj\n' + s + '\nendobj\n'; });
    var x = out.length;
    out += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(function (n) { return ('0000000000' + n).slice(-10) + ' 00000 n \n'; }).join('');
    out += 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root ' + cat + ' 0 R /Info ' + info + ' 0 R >>\nstartxref\n' + x + '\n%%EOF';
    var bytes = new Uint8Array(out.length); for (var i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 255;
    return bytes;
  };

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
