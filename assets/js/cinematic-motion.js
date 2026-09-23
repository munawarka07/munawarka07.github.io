(()=>{
'use strict';
const d=document,w=window,root=d.documentElement,body=d.body;if(!body)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)'),touch=matchMedia('(pointer:coarse)');
const $=(s,c=d)=>c.querySelector(s), $$=(s,c=d)=>[...c.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t,smooth=(a,b,v)=>{const x=clamp((v-a)/(b-a));return x*x*(3-2*x)};
root.classList.add('motion-enabled');body.classList.add('motion-enabled');
const isHome=!!$('#knowledge')&&!!$('#ai-hub')&&!!$('.hero'); if(isHome)body.classList.add('motion-home');

/* persistent journey + command pulse */
const progress=d.createElement('div');progress.className='motion-progress';progress.setAttribute('aria-hidden','true');body.appendChild(progress);
const pulse=d.createElement('div');pulse.className='motion-command-pulse';pulse.setAttribute('aria-hidden','true');body.appendChild(pulse);
const journey=d.createElement('div');journey.className='motion-journey';journey.setAttribute('aria-hidden','true');journey.innerHTML='<span class="motion-journey-dot"></span><span class="motion-journey-label"></span>';body.appendChild(journey);
const journeyLabel=$('.motion-journey-label',journey);
requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.add('motion-loaded')));

/* staged reveals */
const selectors=['.section-head','.k-card','.tools-wrap','.purpose-card','.purpose-links','.platform-copy','.final-cta','.role-card','.guide-stage','.article-card','.article-card-new','.doc-card','.story-card','.hero-panel','.facts','.timeline-item','.experience-card','.skill-card','.contact-card','.award-grid','.project-card'];
const reveal=[...new Set($$(selectors.join(',')))]; reveal.forEach((el,i)=>{el.classList.add('motion-item');el.style.setProperty('--motion-delay',`${(i%5)*55}ms`)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'}); reveal.forEach(x=>io.observe(x));

/* magnetic + spatial focus + elastic grid */
$$('.btn,.nav-cta,.note-button,a.k-card').forEach(el=>{if(!fine.matches||reduce.matches)return;el.classList.add('motion-magnet');el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.setProperty('--mag-x',`${x*.075}px`);el.style.setProperty('--mag-y',`${y*.095}px`)});el.addEventListener('pointerleave',()=>{el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px')})});
const cards=$$('.k-card,.role-card,.guide-stage,.article-card,.article-card-new,.purpose-card,.project-card,.skill-card');
cards.forEach(card=>{card.classList.add('motion-depth','motion-glass');if(!fine.matches||reduce.matches)return;card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--spot-x',`${(x*100).toFixed(1)}%`);card.style.setProperty('--spot-y',`${(y*100).toFixed(1)}%`);card.style.setProperty('--rx',`${(-(y-.5)*2.2).toFixed(2)}deg`);card.style.setProperty('--ry',`${((x-.5)*2.2).toFixed(2)}deg`);card.classList.add('motion-focused');const parent=card.parentElement;if(parent){parent.classList.add('motion-grid-active');[...parent.children].forEach(c=>c.classList.toggle('motion-neighbor',c!==card))}});card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');card.classList.remove('motion-focused');const p=card.parentElement;if(p){p.classList.remove('motion-grid-active');[...p.children].forEach(c=>c.classList.remove('motion-neighbor'))}})});

/* selective progressive reading */
const readTarget=isHome?$('#platform .platform-copy p'):null;
if(readTarget&&!readTarget.dataset.motionSplit){const text=readTarget.textContent;readTarget.textContent='';readTarget.dataset.motionSplit='1';[...text].forEach((ch,i)=>{const s=d.createElement('span');s.className='motion-char';s.style.setProperty('--ci',i);s.textContent=ch===' '? '\u00a0':ch;readTarget.appendChild(s)})}

/* project stacking */
const projectCards=$$('.project-card');if(projectCards.length>1){body.classList.add('motion-project-stack');projectCards.forEach((c,i)=>{c.style.setProperty('--stack-i',i)})}

/* process journey progression */
const guideStages=$$('.guide-stage');guideStages.forEach((s,i)=>s.style.setProperty('--guide-i',i));

/* page transition + motion memory: only normal same-origin navigations */
function safeInternal(a){try{const u=new URL(a.href,location.href);return u.origin===location.origin&&u.href!==location.href&&!a.hasAttribute('download')&&a.target!=='_blank'&&!u.hash.startsWith('#') }catch{return false}}
d.addEventListener('click',e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const a=e.target.closest('a[href]');if(!a||!safeInternal(a)||reduce.matches)return;e.preventDefault();const r=a.getBoundingClientRect();sessionStorage.setItem('munawar-motion-origin',JSON.stringify({x:(r.left+r.width/2)/innerWidth,y:(r.top+r.height/2)/innerHeight,t:Date.now()}));root.style.setProperty('--exit-x',`${r.left+r.width/2}px`);root.style.setProperty('--exit-y',`${r.top+r.height/2}px`);body.classList.add('motion-page-exit');setTimeout(()=>location.href=a.href,360)});
try{const mem=JSON.parse(sessionStorage.getItem('munawar-motion-origin')||'null');if(mem&&Date.now()-mem.t<8000&&!reduce.matches){root.style.setProperty('--entry-x',`${mem.x*100}%`);root.style.setProperty('--entry-y',`${mem.y*100}%`);body.classList.add('motion-memory-entry');setTimeout(()=>body.classList.remove('motion-memory-entry'),700)}sessionStorage.removeItem('munawar-motion-origin')}catch{}

const scenes=isHome?[$('#knowledge'),$('#tools'),$('#resources'),$('#career'),$('#platform'),$('#ai-hub')].filter(Boolean):[];
const sceneNames=['Knowledge','Tools','Resources','Career','Platform','AI Intelligence'];
let target=w.scrollY,smoothY=w.scrollY,lastY=w.scrollY,velocity=0,tx=0,ty=0,mx=0,my=0,raf=0,lastActive=-1;
function sceneProgress(el){const r=el.getBoundingClientRect();return clamp((innerHeight-r.top)/(innerHeight+r.height))}
function tick(){if(!raf)raf=requestAnimationFrame(update)}
function update(){raf=0;target=w.scrollY;const delta=target-lastY;lastY=target;velocity=lerp(velocity,delta,.16);smoothY=reduce.matches?target:lerp(smoothY,target,clamp(.105+Math.abs(velocity)*.002,.105,.22));mx=reduce.matches?0:lerp(mx,tx,.1);my=reduce.matches?0:lerp(my,ty,.1);
 const max=Math.max(1,root.scrollHeight-innerHeight),globalP=target/max;root.style.setProperty('--motion-scroll',globalP.toFixed(5));root.style.setProperty('--motion-velocity',clamp(Math.abs(velocity)/55,0,1).toFixed(4));root.style.setProperty('--motion-mx-px',`${(mx*18).toFixed(2)}px`);root.style.setProperty('--motion-my-px',`${(my*12).toFixed(2)}px`);root.style.setProperty('--motion-rx',`${(my*-1.8).toFixed(2)}deg`);root.style.setProperty('--motion-ry',`${(mx*2.2).toFixed(2)}deg`);
 if(isHome){const hero=$('.hero'),hr=hero.getBoundingClientRect(),hp=clamp(-hr.top/Math.max(hr.height,1));root.style.setProperty('--hero-p',hp.toFixed(4));root.style.setProperty('--hero-y',`${(-hp*92).toFixed(1)}px`);root.style.setProperty('--hero-scale',(1-hp*.035).toFixed(4));root.style.setProperty('--hero-opacity',(1-hp*.62).toFixed(4));
 let nearest=0,nearestDist=Infinity;scenes.forEach((s,i)=>{const r=s.getBoundingClientRect(),p=sceneProgress(s),center=(r.top+r.height/2-innerHeight/2)/(innerHeight+r.height),near=1-clamp(Math.abs(r.top+r.height/2-innerHeight/2)/(innerHeight*.72));const enter=smooth(.02,.42,p),exit=smooth(.68,.98,p),active=enter*(1-exit);s.style.setProperty('--scene-p',p.toFixed(4));s.style.setProperty('--scene-d',center.toFixed(4));s.style.setProperty('--scene-active',active.toFixed(4));s.style.setProperty('--scene-near',near.toFixed(4));s.style.setProperty('--scene-compress',exit.toFixed(4));const dist=Math.abs(r.top+r.height/2-innerHeight/2);if(dist<nearestDist){nearestDist=dist;nearest=i}});
 if(nearest!==lastActive){lastActive=nearest;journeyLabel.textContent=sceneNames[nearest]||'';journey.classList.remove('motion-ping');void journey.offsetWidth;journey.classList.add('motion-ping')}
 const tools=$('#tools');if(tools)tools.style.setProperty('--tools-x',`${((.5-sceneProgress(tools))*82).toFixed(1)}px`);const career=$('#career');if(career)career.style.setProperty('--career-x',`${((sceneProgress(career)-.5)*62).toFixed(1)}px`);if(readTarget){const r=readTarget.getBoundingClientRect(),p=clamp((innerHeight*.86-r.top)/(innerHeight*.62));readTarget.style.setProperty('--read-p',p.toFixed(4))}
 }
 projectCards.forEach((c,i)=>{const r=c.getBoundingClientRect(),p=clamp((110-r.top)/(Math.max(innerHeight*.58,1)));c.style.setProperty('--stack-p',p.toFixed(4));c.style.setProperty('--stack-scale',(1-p*(.03+Math.max(0,projectCards.length-1-i)*.01)).toFixed(4))});
 guideStages.forEach((s,i)=>{const r=s.getBoundingClientRect(),p=clamp((innerHeight*.76-r.top)/(innerHeight*.48));s.style.setProperty('--guide-p',p.toFixed(4));s.classList.toggle('motion-guide-active',p>.5)});
 if(Math.abs(smoothY-target)>.12||Math.abs(mx-tx)>.001||Math.abs(my-ty)>.001||Math.abs(velocity)>.05)tick();}
w.addEventListener('scroll',tick,{passive:true});w.addEventListener('resize',tick,{passive:true});w.addEventListener('pointermove',e=>{if(!fine.matches||reduce.matches)return;tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;tick()},{passive:true});reduce.addEventListener?.('change',tick);tick();
})();
