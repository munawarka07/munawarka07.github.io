/* Munawar.in PDF engine: builds a real A4 PDF in the browser and downloads it directly.
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

  function save(bytes, name) {
    var blob = new Blob([bytes], { type: 'application/pdf' }), url = URL.createObjectURL(blob), el = document.createElement('a');
    el.href = url; el.download = name; el.rel = 'noopener'; document.body.appendChild(el); el.click(); el.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
  }
  function brandHeader(d, title, subtitle, height) {
    d.rect(0, 0, PW, height, C.navy); d.rect(0, 0, PW, 4, C.blue);
    d.rr(M, 30, 22, 22, 6, C.blue); d.text(M + 11, 45.5, 'M', 11, { bold: true, color: C.white, align: 'center' });
    d.text(M + 30, 45.5, 'Munawar.in', 12.5, { bold: true, color: C.white });
    d.text(PW - M, 45.5, subtitle, 9.5, { color: [166, 187, 214], align: 'right' });
    d.text(M, 92, title, 26, { bold: true, color: C.white });
  }
  function footers(d, label, dateStr, path) {
    var total = d.pages.length;
    d.pages.forEach(function (p, i) {
      d.cur = p;
      if (i > 0) { d.text(M, 28, 'Munawar.in', 9, { bold: true, color: C.blue }); d.text(PW - M, 28, label, 8.5, { color: C.muted, align: 'right' }); d.line(M, 36, PW - M, 36, C.line, 0.6); }
      d.line(M, PH - 40, PW - M, PH - 40, C.line, 0.6);
      d.text(M, PH - 26, path, 8, { color: C.muted });
      d.text(PW / 2, PH - 26, dateStr, 8, { color: C.muted, align: 'center' });
      d.text(PW - M, PH - 26, 'Page ' + (i + 1) + ' of ' + total, 8, { color: C.muted, align: 'right' });
    });
  }
  window.MunawarPDF = { Doc: Doc, width: width, wrap: wrap, C: C, PW: PW, PH: PH, M: M, CW: CW, save: save, brandHeader: brandHeader, footers: footers };
})();
