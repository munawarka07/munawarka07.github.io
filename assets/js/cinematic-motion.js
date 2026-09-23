(()=>{
  'use strict';
  const root=document.documentElement,body=document.body;
  if(!body)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer:fine)');
  root.classList.add('motion-enabled');body.classList.add('motion-enabled');
  const isHome=!!document.querySelector('body .hero + #knowledge, body .hero ~ #knowledge');
  if(isHome)body.classList.add('motion-home');
  const progress=document.createElement('div');progress.className='motion-progress';progress.setAttribute('aria-hidden','true');body.appendChild(progress);
  let tx=0,ty=0,mx=0,my=0,targetScroll=scrollY,smoothScroll=scrollY,raf=0;
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const smooth=(a,b,v)=>{const x=clamp((v-a)/(b-a));return x*x*(3-2*x)};
  const revealSelectors=['.section-head','.k-card','.tools-wrap','.purpose-card','.final-cta','.role-card','.project-card','.guide-stage','.article-card','.article-card-new','.doc-card','.story-card','.hero-panel','.journal-orb','.facts','.timeline-item','.experience-card','.skill-card','.contact-card'];
  const seen=new Set();
  document.querySelectorAll(revealSelectors.join(',')).forEach((el,i)=>{
    if(seen.has(el))return;seen.add(el);el.classList.add('motion-item');
    if(el.classList.contains('section-head'))el.classList.add(i%2?'motion-right':'motion-left');
    el.style.setProperty('--motion-delay',`${Math.min((i%5)*55,220)}ms`);
  });
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
  seen.forEach(el=>io.observe(el));
  const depth=[...document.querySelectorAll('.k-card,.role-card,.project-card,.purpose-card,.guide-stage,.article-card,.article-card-new')];
  depth.forEach(card=>{
    card.classList.add('motion-depth');
    if(!fine.matches||reduce.matches)return;
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--tilt-x',`${(-y*2.1).toFixed(2)}deg`);card.style.setProperty('--tilt-y',`${(x*2.1).toFixed(2)}deg`)});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')});
  });
  const homeHero=document.querySelector('.hero');
  const scenes=isHome?[...document.querySelectorAll('.home-art-section')]:[];
  const pageHero=document.querySelector('.knowledge-hero,.article-hero,.project-hero,.experience-hero,.skills-hero,.about-hero');
  function update(){
    raf=0;targetScroll=scrollY;
    if(reduce.matches){smoothScroll=targetScroll;mx=0;my=0}else{smoothScroll=lerp(smoothScroll,targetScroll,.13);mx=lerp(mx,tx,.1);my=lerp(my,ty,.1)}
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);root.style.setProperty('--motion-scroll',(targetScroll/max).toFixed(5));root.style.setProperty('--motion-mx',mx.toFixed(4));root.style.setProperty('--motion-my',my.toFixed(4));
    if(homeHero){const r=homeHero.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,r.height));root.style.setProperty('--home-hero-y',`${(-p*72).toFixed(2)}px`);root.style.setProperty('--home-hero-opacity',(1-p*.48).toFixed(4));root.style.setProperty('--home-visual-y',`${(-p*28).toFixed(2)}px`);root.style.setProperty('--home-visual-scale',(1+p*.055).toFixed(4))}
    scenes.forEach((s,idx)=>{const r=s.getBoundingClientRect(),center=r.top+r.height/2,dist=(innerHeight/2-center)/(innerHeight+r.height),p=clamp((innerHeight-r.top)/(innerHeight+r.height));s.style.setProperty('--scene-p',smooth(.08,.55,p).toFixed(4));s.style.setProperty('--scene-y',`${(dist*20).toFixed(2)}px`);s.style.setProperty('--art-y',`${(dist*-46).toFixed(2)}px`);s.style.setProperty('--scene-scale',(1+Math.abs(dist)*.035).toFixed(4));s.style.setProperty('--scene-index',idx)})
    if(pageHero){const r=pageHero.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,r.height));root.style.setProperty('--page-hero-y',`${(-p*34).toFixed(2)}px`)}
    if(Math.abs(smoothScroll-targetScroll)>.15||Math.abs(mx-tx)>.001||Math.abs(my-ty)>.001)requestTick();
  }
  function requestTick(){if(!raf)raf=requestAnimationFrame(update)}
  addEventListener('scroll',requestTick,{passive:true});addEventListener('resize',requestTick,{passive:true});
  addEventListener('pointermove',e=>{if(!fine.matches||reduce.matches)return;tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;requestTick()},{passive:true});
  reduce.addEventListener?.('change',requestTick);requestTick();
})();
