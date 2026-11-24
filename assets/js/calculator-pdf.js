/* Munawar.in HR calculators: download any calculator result as an A4 PDF (uses munawar-pdf.js) */
(function () {
  'use strict';
  function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function fmtDate(v) { if (!v) return ''; var d = new Date(v + 'T00:00:00'); return isNaN(d) ? v : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }
  function money(v) { var n = parseFloat(v); return isNaN(n) ? v : 'AED ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function collect(panel) {
    var D = { title: txt(panel.querySelector('h2')), kind: txt(panel.querySelector('.calc-card > .section-label')), inputs: [], adds: [], deds: [], cards: [], note: '' };
    panel.querySelectorAll('.form-group').forEach(function (g) {
      var lab = txt(g.querySelector('label')), inp = g.querySelector('input,select'), val = '';
      if (!inp) return;
      if (inp.tagName === 'SELECT') val = txt(inp.options[inp.selectedIndex]);
      else if (inp.type === 'date') val = fmtDate(inp.value);
      else val = inp.value;
      if (/salary|wage|basic|amount/i.test(lab) && val !== '') val = money(val);
      D.inputs.push([lab, val === '' ? '—' : val]);
    });
    [['#payAdditions', 'adds'], ['#payDeductions', 'deds']].forEach(function (k) {
      panel.querySelectorAll(k[0] + ' .pay-row').forEach(function (r) {
        var a = r.querySelector('.pay-amount').value; if (a === '' || +a === 0) return;
        D[k[1]].push([r.querySelector('.pay-desc').value.trim() || (k[1] === 'adds' ? 'Addition' : 'Deduction'), money(a)]);
      });
    });
    var rc = panel.querySelector('.result-card');
    D.resultLabel = txt(rc.querySelector('.section-label')); D.result = txt(rc.querySelector('strong'));
    rc.querySelectorAll('.breakdown > div, .pay-summary > div').forEach(function (c) { D.cards.push([txt(c.querySelector('small')), txt(c.querySelector('b'))]); });
    D.note = txt(rc.querySelector('p'));
    return D;
  }
  function render(D) {
    var P = window.MunawarPDF, C = P.C, M = P.M, CW = P.CW, PW = P.PW, d = new P.Doc();
    var now = new Date(), dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    P.brandHeader(d, D.title, 'HR calculators', 150);
    d.text(M, 116, (D.kind ? D.kind + '   ·   ' : '') + 'Generated ' + dateStr, 10, { color: [166, 187, 214] });
    d.y = 176;
    // result hero
    d.rr(M, d.y, CW, 86, 14, C.soft2, [205, 222, 247], 0.8);
    d.text(M + 20, d.y + 28, D.resultLabel || 'Result', 10, { color: C.muted, bold: true });
    d.text(M + 20, d.y + 64, D.result, 30, { bold: true, color: C.blue });
    d.y += 86 + 26;
    function heading(t) { if (d.y + 60 > P.PH - 64) { d.add(); d.y = P.M + 6; } d.rect(M, d.y + 1, 3, 13, C.blue); d.text(M + 11, d.y + 12, t, 13, { bold: true }); d.y += 26; }
    function table(rows, colA) {
      rows.forEach(function (r, i) {
        var hA = d.paraH(r[0], 9.5, colA - 20), hB = d.paraH(r[1], 9.5, CW - colA - 20, { bold: true }), h = Math.max(hA, hB) + 14;
        if (d.y + h > P.PH - 64) { d.add(); d.y = P.M + 6; }
        if (i % 2 === 0) d.rr(M, d.y, CW, h, 6, C.soft);
        d.para(M + 12, d.y + 15, r[0], 9.5, colA - 20, { color: C.muted });
        d.para(M + colA, d.y + 15, r[1], 9.5, CW - colA - 20, { bold: true });
        d.y += h;
      });
      d.y += 18;
    }
    heading('Inputs'); table(D.inputs, 230);
    if (D.adds.length) { heading('Additions'); table(D.adds, 330); }
    if (D.deds.length) { heading('Deductions'); table(D.deds, 330); }
    if (D.cards.length) {
      heading('Breakdown');
      var cols = 3, gap = 10, w = (CW - gap * (cols - 1)) / cols;
      for (var i = 0; i < D.cards.length; i += cols) {
        var row = D.cards.slice(i, i + cols), h = 0;
        row.forEach(function (c) { h = Math.max(h, d.paraH(c[0], 8, w - 24) + d.paraH(c[1], 12, w - 24, { bold: true }) + 26); });
        if (d.y + h > P.PH - 64) { d.add(); d.y = P.M + 6; }
        row.forEach(function (c, k) {
          var x = M + k * (w + gap), y = d.y;
          d.rr(x, y, w, h, 10, C.white, C.line, 0.7);
          y += 18; y += d.para(x + 12, y, c[0], 8, w - 24, { color: C.muted }) + 4;
          d.para(x + 12, y + 6, c[1], 12, w - 24, { bold: true });
        });
        d.y += h + gap;
      }
      d.y += 10;
    }
    var disc = (D.note ? D.note + ' ' : '') + 'This is an indicative estimate generated at munawar.in. Confirm the result against the employment contract, company policy and current official guidance before using it for payment.';
    var dh = d.paraH(disc, 8.5, CW - 28) + 24; if (d.y + dh > P.PH - 64) { d.add(); d.y = P.M + 6; }
    d.rr(M, d.y, CW, dh, 8, C.soft); d.para(M + 14, d.y + 18, disc, 8.5, CW - 28, { color: C.muted });
    P.footers(d, D.title, dateStr, 'munawar.in/hr-hub/calculator');
    return { bytes: d.build(D.title + ' - Munawar.in'), name: D.title.replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') + '-' + now.toISOString().slice(0, 10) + '.pdf' };
  }
  function attach() {
    document.querySelectorAll('.calc-panel .result-card').forEach(function (rc) {
      if (rc.querySelector('.calc-pdf-btn')) return;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'btn secondary calc-pdf-btn'; b.textContent = 'Download result as PDF ↓';
      b.addEventListener('click', function () {
        var panel = rc.closest('.calc-panel'), D = collect(panel);
        if (!/[1-9]/.test(D.result)) { b.textContent = 'Calculate first, then download'; setTimeout(function () { b.textContent = 'Download result as PDF ↓'; }, 2200); return; }
        try { var out = render(D); window.MunawarPDF.save(out.bytes, out.name); } catch (e) { alert('The PDF could not be created on this device.'); }
      });
      rc.appendChild(b);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach); else attach();
  window.MunawarCalcPDF = { collect: collect, render: render };
})();
