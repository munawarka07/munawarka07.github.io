/* interaction-refinements */
(()=>{const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce||!matchMedia('(pointer:fine)').matches)return;const cards=document.querySelectorAll('.k-card,.role-card,.project-card,.guide-stage,.purpose-card');cards.forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*2.2}deg) rotateY(${x*2.2}deg) translateY(-3px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});const arts=document.querySelectorAll('.section-art');let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{arts.forEach(a=>{const r=a.parentElement.getBoundingClientRect(),v=Math.max(-1,Math.min(1,(innerHeight/2-(r.top+r.height/2))/innerHeight));a.style.transform=`translate3d(0,${v*14}px,0)`});ticking=false})},{passive:true})})();;
/* cinematic-motion */
(()=>{
'use strict';
const d=document,w=window,reduce=w.matchMedia('(prefers-reduced-motion: reduce)').matches,fine=w.matchMedia('(pointer:fine)').matches;
const $=(s,r=d)=>r.querySelector(s), $$=(s,r=d)=>[...r.querySelectorAll(s)];
const home=!!$('#knowledge');
// Global HUD layers.
const field=d.createElement('div');field.className='hud-field';field.setAttribute('aria-hidden','true');d.body.append(field);
const prog=d.createElement('div');prog.className='hud-progress';prog.setAttribute('aria-hidden','true');d.body.append(prog);
// Scanner/holographic treatment: no authored text is replaced.
const targets=$$('.k-card,.purpose-card,.purpose-links a,.tool-list a,.role-card,.guide-stage,.article-card,.article-card-new,.doc-card,.story-card,.experience-card,.skill-card,.project-card,.award-card');
targets.forEach(el=>{el.classList.add('hud-target');if(!$('.hud-corners',el)){const c=d.createElement('span');c.className='hud-corners';c.setAttribute('aria-hidden','true');el.append(c)}});
// Reveals use existing structural blocks, not headings individually (keeps text sharp).
const reveal=$$('.section-head,.search-box,.tools-wrap,.purpose-grid,.platform-layout,.ai-feature-grid,.ai-explore-row,.timeline-item,.experience-card,.skill-card,.project-card,.article-card,.article-card-new,.guide-stage');reveal.forEach(el=>el.classList.add('hud-reveal'));if('IntersectionObserver'in w){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('hud-in');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -5%'});reveal.forEach(el=>io.observe(el))}else reveal.forEach(el=>el.classList.add('hud-in'));
// Pointer spatial field + hero depth, desktop only.
let tx=w.innerWidth/2,ty=w.innerHeight/2,x=tx,y=ty;if(fine&&!reduce){w.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const visual=$('.hero .visual');function raf(){x+=(tx-x)*.12;y+=(ty-y)*.12;d.documentElement.style.setProperty('--hud-x',x+'px');d.documentElement.style.setProperty('--hud-y',y+'px');if(visual&&w.innerWidth>1024){const nx=x/w.innerWidth-.5,ny=y/w.innerHeight-.5;visual.style.transform=`perspective(1100px) translate3d(${nx*13}px,${ny*9}px,0) rotateX(${-ny*1.8}deg) rotateY(${nx*2.2}deg)`}requestAnimationFrame(raf)}requestAnimationFrame(raf)}
// Scroll progress. RAF-throttled.
let ticking=false;function update(){const max=Math.max(1,d.documentElement.scrollHeight-w.innerHeight),p=Math.min(1,Math.max(0,w.scrollY/max));prog.style.transform=`scaleX(${p})`;ticking=false}w.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});w.addEventListener('resize',update,{passive:true});update();
})();
;
/* munawar-motion */
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
  // Cards that are absolutely positioned or already transformed (orbit/map layouts) keep their geometry:
  // they get the glow but no lift and no entrance transform.
  function free(c){var cs=getComputedStyle(c);return cs.position!=='absolute'&&cs.position!=='fixed'&&cs.transform==='none';}
  cards.forEach(function(c){
    c.classList.add('ds-spot');
    if(getComputedStyle(c).position==='static')c.style.position='relative';
    if(free(c))c.classList.add('ds-lift');
  });
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
    if(!c.classList.contains('ds-lift'))return; // positioned layouts animate themselves
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
;
/* munawar-swipe */
/* Munawar.in — swipe rows + page transitions (v6, 2026-11)
   1. Any [data-swipe] row (and, on inner pages, any group of 4+ link cards) becomes a
      Netflix-style row: drag with the mouse or a finger, flick with momentum, snap to a card,
      arrow buttons on the edges, keyboard arrows, and a progress line.
   2. Smooth page-to-page transition for links inside the site.
   Content and links are never changed; reduced-motion users get plain scrolling rows. */
(function(){
  'use strict';
  var d=document,w=window;
  var reduce=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s));};

  /* ---------- auto-detect card groups on inner pages ---------- */
  function autoRows(){
    if(d.body.classList.contains('jpage'))return; // homepage marks its rows explicitly
    // browse-style card groups become swipe rows; reading lists, filters and expanding cards stay as grids
    var OK=['k-card','guide-card','project-card','ai-card','child-card','story-card','purpose-card','role-card-link'];
    var seen=new Set();
    $$('main .ds-spot').forEach(function(c){
      var p=c.parentElement; if(!p||seen.has(p))return; seen.add(p);
      if(p.closest('[data-swipe],form,nav,.site-header,footer,.global-search-overlay'))return;
      var kids=Array.prototype.slice.call(p.children);
      if(kids.length<4)return;
      var ok=kids.every(function(k){return OK.some(function(cl){return k.classList.contains(cl);});});
      if(!ok)return;
      var cs=getComputedStyle(p); if(cs.display!=='grid'&&cs.display!=='flex')return;
      p.setAttribute('data-swipe','auto');
    });
  }

  /* ---------- build a swipe row ---------- */
  function build(track){
    if(track.dataset.swipeReady)return; track.dataset.swipeReady='1';
    track.classList.add('sw-track');
    var shell=d.createElement('div'); shell.className='sw';
    track.parentNode.insertBefore(shell,track); shell.appendChild(track);
    var prev=d.createElement('button'),next=d.createElement('button'),bar=d.createElement('div');
    prev.className='sw-btn sw-prev';prev.type='button';prev.setAttribute('aria-label','Previous');prev.innerHTML='<span>‹</span>';
    next.className='sw-btn sw-next';next.type='button';next.setAttribute('aria-label','Next');next.innerHTML='<span>›</span>';
    bar.className='sw-bar';bar.innerHTML='<i></i>';
    shell.appendChild(prev);shell.appendChild(next);shell.appendChild(bar);
    track.setAttribute('tabindex','0');
    if(!track.getAttribute('aria-label'))track.setAttribute('aria-label','Cards — drag, swipe or use the arrow keys');

    var items=function(){return Array.prototype.slice.call(track.children);};
    function step(){var it=items();if(it.length<2)return track.clientWidth*.8;return Math.max(160,(it[1].offsetLeft-it[0].offsetLeft)*Math.max(1,Math.floor(track.clientWidth/(it[1].offsetLeft-it[0].offsetLeft))-0));}
    function update(){
      var max=track.scrollWidth-track.clientWidth;
      shell.classList.toggle('at-start',track.scrollLeft<=4);
      shell.classList.toggle('at-end',track.scrollLeft>=max-4);
      shell.classList.toggle('no-scroll',max<=4);
      var vis=track.clientWidth/Math.max(1,track.scrollWidth);
      bar.firstChild.style.width=(vis*100)+'%';
      bar.firstChild.style.transform='translateX('+((max>0?track.scrollLeft/max:0)*(1/vis-1)*100)+'%)';
    }
    function go(dir){track.scrollBy({left:dir*step(),behavior:reduce?'auto':'smooth'});}
    prev.addEventListener('click',function(){go(-1);});
    next.addEventListener('click',function(){go(1);});
    track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(1);}if(e.key==='ArrowLeft'){e.preventDefault();go(-1);}});
    track.addEventListener('scroll',function(){w.requestAnimationFrame(update);},{passive:true});
    w.addEventListener('resize',update);

    /* mouse drag with momentum (touch uses native swipe) */
    var down=false,moved=0,x0=0,s0=0,lastX=0,lastT=0,vel=0,raf=0;
    track.addEventListener('pointerdown',function(e){
      if(e.pointerType!=='mouse'||e.button!==0)return;
      if(e.target.closest('input,select,textarea'))return;
      down=true;moved=0;x0=lastX=e.clientX;s0=track.scrollLeft;lastT=performance.now();vel=0;
      cancelAnimationFrame(raf);
    });
    w.addEventListener('pointermove',function(e){
      if(!down)return;
      var dx=e.clientX-x0;moved=Math.max(moved,Math.abs(dx));
      if(moved<=6)return; // a small wobble is still a click
      if(!track.classList.contains('dragging')){track.classList.add('dragging');}
      track.scrollLeft=s0-dx;
      var t=performance.now();vel=(e.clientX-lastX)/Math.max(1,t-lastT);lastX=e.clientX;lastT=t;
    });
    function release(){
      if(!down)return;down=false;
      if(moved<=6)return; // it was a click
      var v=-vel*16; // px per frame
      if(reduce||Math.abs(v)<1){track.classList.remove('dragging');snap();return;}
      (function glide(){track.scrollLeft+=v;v*=.94;if(Math.abs(v)>.6){raf=requestAnimationFrame(glide);}else{track.classList.remove('dragging');snap();}})();
    }
    w.addEventListener('pointerup',release);w.addEventListener('pointercancel',release);
    function snap(){
      var it=items(),best=0,bd=1e9,pad=parseFloat(getComputedStyle(track).scrollPaddingLeft)||0;
      it.forEach(function(el){var dd=Math.abs(el.offsetLeft-pad-track.scrollLeft);if(dd<bd){bd=dd;best=el.offsetLeft-pad;}});
      track.scrollTo({left:best,behavior:reduce?'auto':'smooth'});
    }
    /* a drag is not a click */
    track.addEventListener('click',function(e){if(moved>6){e.preventDefault();e.stopPropagation();}},true);
    track.addEventListener('dragstart',function(e){e.preventDefault();});
    /* cards slide in one by one the first time the row is seen */
    if('IntersectionObserver' in w&&!reduce){
      items().forEach(function(el,i){el.style.setProperty('--sw-i',Math.min(i,8));});
      shell.classList.add('sw-pre');
      var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){shell.classList.add('sw-in');io.disconnect();}});},{threshold:.15});
      io.observe(shell);
    }
    update();setTimeout(update,400);
  }

  function init(){autoRows();$$('[data-swipe]').forEach(build);}
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();

  /* ---------- page transitions ---------- */
  if(!reduce){
    var veil=d.createElement('div');veil.className='pt-veil';veil.setAttribute('aria-hidden','true');
    veil.innerHTML='<span class="pt-mark"><img src="/assets/images/munawar-logo-256.webp" alt=""></span>';
    d.documentElement.appendChild(veil);
    d.documentElement.classList.add('pt-enter');
    w.addEventListener('pageshow',function(){d.documentElement.classList.remove('pt-leave');requestAnimationFrame(function(){d.documentElement.classList.add('pt-ready');});});
    d.addEventListener('click',function(e){
      if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
      var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
      var href=a.getAttribute('href');
      if(!href||href.charAt(0)==='#'||a.target==='_blank'||a.hasAttribute('download')||/^(mailto|tel|javascript):/i.test(href))return;
      var u;try{u=new URL(a.href,location.href);}catch(err){return;}
      if(u.origin!==location.origin)return;
      if(u.pathname===location.pathname&&u.hash)return;
      if(/\.(docx?|xlsx?|pdf|zip)$/i.test(u.pathname)||u.pathname.indexOf('/admin')===0)return;
      e.preventDefault();
      d.documentElement.classList.add('pt-leave');
      setTimeout(function(){location.href=a.href;},420);
    });
  }
})();
;
