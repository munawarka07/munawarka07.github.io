/* Munawar.in motion layer — v4 (2026-11)
   One consistent reveal system, pointer spotlight on cards, headline word reveal,
   number count-ups and magnetic primary buttons. Text content is never changed:
   words are only wrapped for animation and counters always finish on the authored value. */
(function(){
  'use strict';
  var d=document,w=window;
  var reduce=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=w.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s));};

  /* ---------- 1. Cards get the spotlight surface ---------- */
  var CARD='.k-card,.ai-card,.purpose-card,.role-card,.guide-card,.guide-stage,.article-card,.article-card-new,.doc-card,.story-card,.experience-card,.skill-card,.project-card,.award-card,.seo-link-card,.calc-card,.insight-expand-card,.law-card,.job-card,.map-card,.qa-item,.child-card,.impact-stat';
  var cards=$$('main '+CARD.split(',').join(',main '));
  cards.forEach(function(c){c.classList.add('ds-spot');});
  if(fine&&!reduce){
    d.addEventListener('pointermove',function(e){
      var c=e.target.closest&&e.target.closest('.ds-spot');
      if(!c)return;
      var r=c.getBoundingClientRect();
      c.style.setProperty('--mx',(e.clientX-r.left)+'px');
      c.style.setProperty('--my',(e.clientY-r.top)+'px');
    },{passive:true});
  }

  if(reduce||!('IntersectionObserver' in w)){
    // Make sure anything the older systems hid is visible.
    $$('.reveal,.reveal-left,.reveal-right,.hud-reveal').forEach(function(el){el.classList.add('visible','hud-in');});
    return;
  }

  // orbit sweep inside inner-page hero panels (decorative)
  $$('main .knowledge-hero .hero-panel').forEach(function(p){if(!p.querySelector('.ds-orbit')){var o=d.createElement('span');o.className='ds-orbit';o.setAttribute('aria-hidden','true');p.appendChild(o);}});

  /* ---------- 2. Unify reveals ---------- */
  // Older per-page reveal classes are converted to one system so every page moves the same way.
  var legacy=$$('.reveal,.reveal-left,.reveal-right,.hud-reveal');
  legacy.forEach(function(el){
    el.classList.remove('reveal','reveal-left','reveal-right','hud-reveal','visible','hud-in');
    el.classList.add('ds-r');
  });
  // Section heads and grids of cards reveal with a gentle stagger.
  $$('main .section-head, main .seo-related > *, main .final-cta, main .info-note').forEach(function(el){
    if(!el.closest('.ds-r'))el.classList.add('ds-r');
  });
  var groups=new Map();
  cards.forEach(function(c){
    if(c.closest('.ds-r')&&!c.classList.contains('ds-r'))return; // parent already animates
    var p=c.parentElement; if(!groups.has(p))groups.set(p,[]); groups.get(p).push(c);
  });
  groups.forEach(function(list){
    list.forEach(function(c,i){c.classList.add('ds-r');c.style.setProperty('--d',Math.min(i,8)*0.07+'s');});
  });

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('ds-in');io.unobserve(en.target);}
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  $$('.ds-r').forEach(function(el){
    // anything already on screen at load reveals immediately, without waiting for a scroll
    io.observe(el);
  });

  /* ---------- 3. Headline word reveal (hero h1 + section h2) ---------- */
  function splitWords(el){
    if(el.dataset.dsSplit)return; el.dataset.dsSplit='1';
    var i=0;
    (function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          if(!n.textContent.trim())return;
          var frag=d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(part){
            if(!part)return;
            if(/^\s+$/.test(part)){frag.appendChild(d.createTextNode(part));return;}
            var s=d.createElement('ds-w');s.className='ds-w';s.style.setProperty('--i',i++);s.textContent=part;frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag,n);
        }else if(n.nodeType===1&&n.tagName!=='BR'){
          var cs=getComputedStyle(n);
          if((cs.webkitBackgroundClip||cs.backgroundClip)==='text'){
            // gradient text animates as one unit so the gradient stays continuous
            n.classList.add('ds-w');n.style.setProperty('--i',i++);n.style.display='inline-block';
          }else walk(n);
        }
      });
    })(el);
    el.classList.add('ds-words');
    // the parent may itself be a .ds-r; the words carry the motion instead
    var host=el.closest('.ds-r'); if(host&&host!==el){host.classList.add('ds-in');}
  }
  var heads=$$('main :is(.hero,.knowledge-hero,.article-hero) h1');
  heads.forEach(function(h){splitWords(h);});
  var headIO=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('ds-in');headIO.unobserve(en.target);}});
  },{threshold:0.2});
  // wait for the opening animation (homepage, first visit) before playing the hero words
  function startHeads(){heads.forEach(function(h){headIO.observe(h);});}
  if(d.documentElement.classList.contains('mi-intro')){
    var mo=new MutationObserver(function(){if(d.documentElement.classList.contains('mi-reveal')){mo.disconnect();setTimeout(startHeads,250);}});
    mo.observe(d.documentElement,{attributes:true,attributeFilter:['class']});
  }else startHeads();

  /* ---------- 4. Count-up numbers ---------- */
  var nums=$$('main :is(.metric strong,.impact-stat strong,.stat strong,.stat-number,.big-number)').filter(function(el){
    return /^\s*[\d,]+(\.\d+)?\s*[+%]?\s*$/.test(el.textContent);
  });
  var numIO=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting)return; numIO.unobserve(en.target);
      var el=en.target,final=el.textContent,m=final.match(/([\d,]+(?:\.\d+)?)/);
      var target=parseFloat(m[1].replace(/,/g,'')),dec=(m[1].split('.')[1]||'').length,comma=m[1].indexOf(',')>-1;
      var t0=null,dur=1600;
      function fmt(v){var s=v.toFixed(dec);if(comma)s=s.replace(/\B(?=(\d{3})+(?!\d))/g,',');return final.replace(m[1],s);}
      function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,4);el.textContent=p<1?fmt(target*e):final;if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);
    });
  },{threshold:0.6});
  nums.forEach(function(n){n.style.fontVariantNumeric='tabular-nums';numIO.observe(n);});

  /* ---------- 5. Magnetic primary buttons ---------- */
  if(fine){
    $$('.btn.primary,.nav-cta').forEach(function(b){
      b.addEventListener('pointermove',function(e){
        var r=b.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/r.width,y=(e.clientY-r.top-r.height/2)/r.height;
        b.style.transform='translate3d('+(x*6)+'px,'+(y*5-2)+'px,0)';
      });
      b.addEventListener('pointerleave',function(){b.style.transform='';});
    });
  }
})();
