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
