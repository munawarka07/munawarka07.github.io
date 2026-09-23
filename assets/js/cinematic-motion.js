(()=>{
'use strict';
const root=document.documentElement,body=document.body;if(!body)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)');
root.classList.add('motion-enabled');body.classList.add('motion-enabled');
const isHome=!!document.querySelector('body .hero ~ #knowledge');if(isHome)body.classList.add('motion-home');
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t,smooth=(a,b,v)=>{const x=clamp((v-a)/(b-a));return x*x*(3-2*x)};
const progress=document.createElement('div');progress.className='motion-progress';progress.setAttribute('aria-hidden','true');body.appendChild(progress);
/* reusable reveal choreography */
const selectors=['.section-head','.k-card','.purpose-card','.final-cta','.role-card','.project-card','.guide-stage','.article-card','.article-card-new','.doc-card','.story-card','.hero-panel','.facts','.timeline-item','.skill-card','.contact-card','.acc-item','.qa-item'];
const items=[...new Set([...document.querySelectorAll(selectors.join(','))])];
items.forEach((el,i)=>{el.classList.add('motion-item');el.style.setProperty('--motion-delay',`${Math.min((i%6)*65,325)}ms`);if(el.classList.contains('section-head'))el.classList.add(i%2?'motion-right':'motion-left')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -6%'});items.forEach(el=>io.observe(el));
/* staged hero opening */
if(isHome){const hero=document.querySelector('.hero'),copy=hero?.querySelector('.hero-grid>div:first-child'),visual=hero?.querySelector('.visual');const stages=copy?[copy.querySelector('.eyebrow'),copy.querySelector('h1'),copy.querySelector('p'),copy.querySelector('.actions'),copy.querySelector('.hero-metrics'),visual].filter(Boolean):[];stages.forEach((el,i)=>{el.classList.add('motion-hero-stage');el.style.setProperty('--hero-delay',`${80+i*115}ms`)});requestAnimationFrame(()=>body.classList.add('motion-ready'))}else requestAnimationFrame(()=>body.classList.add('motion-ready'));
/* magnetic hover: restrained, only interactive focal elements */
const magnets=[...document.querySelectorAll('.btn,.nav-cta,.note-button')];magnets.forEach(el=>{if(!fine.matches||reduce.matches)return;el.classList.add('motion-magnet');el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);el.style.setProperty('--mag-x',`${x/10}px`);el.style.setProperty('--mag-y',`${y/10}px`)});el.addEventListener('pointerleave',()=>{el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px')})});
/* card depth */
const depth=[...document.querySelectorAll('.k-card,.role-card,.project-card,.purpose-card,.guide-stage,.article-card,.article-card-new')];depth.forEach(card=>{card.classList.add('motion-depth');if(!fine.matches||reduce.matches)return;card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--tilt-x',`${(-y*1.8).toFixed(2)}deg`);card.style.setProperty('--tilt-y',`${(x*1.8).toFixed(2)}deg`)});card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')})});
/* project cards become a sticky stack on the dedicated projects page */
const projectGrid=document.querySelector('#projects .project-grid');if(projectGrid&&projectGrid.querySelectorAll('.project-card').length>1){projectGrid.classList.add('motion-stack');[...projectGrid.querySelectorAll('.project-card')].forEach((c,i)=>{c.style.setProperty('--stack-i',i);c.style.setProperty('--stack-count',projectGrid.children.length)})}
let tx=0,ty=0,mx=0,my=0,targetScroll=scrollY,smoothScroll=scrollY,raf=0;
const hero=document.querySelector('.hero'),pageHero=document.querySelector('.knowledge-hero,.article-hero,.project-hero,.experience-hero,.skills-hero,.about-hero');
const flowSections=isHome?[...document.querySelectorAll('#knowledge,#tools,#resources,#career,#platform,#ai-hub')]:[];
function update(){raf=0;targetScroll=scrollY;if(reduce.matches){smoothScroll=targetScroll;mx=my=0}else{smoothScroll=lerp(smoothScroll,targetScroll,.14);mx=lerp(mx,tx,.11);my=lerp(my,ty,.11)}
const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);root.style.setProperty('--motion-scroll',(targetScroll/max).toFixed(5));root.style.setProperty('--motion-mx',mx.toFixed(4));root.style.setProperty('--motion-my',my.toFixed(4));
if(hero){const r=hero.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,r.height));root.style.setProperty('--home-hero-y',`${(-p*68).toFixed(2)}px`);root.style.setProperty('--home-hero-opacity',(1-p*.42).toFixed(4));root.style.setProperty('--home-visual-y',`${(-p*32).toFixed(2)}px`);root.style.setProperty('--home-visual-scale',(1+p*.06).toFixed(4))}
flowSections.forEach((s,i)=>{const r=s.getBoundingClientRect(),p=clamp((innerHeight-r.top)/(innerHeight+r.height)),center=(r.top+r.height/2-innerHeight/2)/(innerHeight+r.height);s.style.setProperty('--section-progress',p.toFixed(4));s.style.setProperty('--section-drift',`${(center*-22).toFixed(2)}px`);s.style.setProperty('--flow-x',`${((i%2?1:-1)*(1-smooth(.12,.72,p))*46).toFixed(2)}px`)});
if(pageHero){const r=pageHero.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,r.height));root.style.setProperty('--page-hero-y',`${(-p*32).toFixed(2)}px`)}
if(projectGrid?.classList.contains('motion-stack')){[...projectGrid.children].forEach((c,i)=>{const r=c.getBoundingClientRect(),p=clamp((120-r.top)/Math.max(1,r.height));c.style.setProperty('--stack-scale',(1-p*Math.max(0,(projectGrid.children.length-1-i))*.018).toFixed(4))})}
if(Math.abs(smoothScroll-targetScroll)>.12||Math.abs(mx-tx)>.001||Math.abs(my-ty)>.001)requestTick()}
function requestTick(){if(!raf)raf=requestAnimationFrame(update)}
addEventListener('scroll',requestTick,{passive:true});addEventListener('resize',requestTick,{passive:true});addEventListener('pointermove',e=>{if(!fine.matches||reduce.matches)return;tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;requestTick()},{passive:true});reduce.addEventListener?.('change',requestTick);requestTick();
})();
