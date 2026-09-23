(()=>{
'use strict';
const d=document,w=window,root=d.documentElement,body=d.body;if(!body)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)');
root.classList.add('motion-enabled');body.classList.add('motion-enabled');
const $=(s,c=d)=>c.querySelector(s), $$=(s,c=d)=>[...c.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const isHome=!!$('#knowledge')&&!!$('#ai-hub')&&!!$('.hero');if(isHome)body.classList.add('motion-home');
const bar=d.createElement('div');bar.className='motion-progress';bar.setAttribute('aria-hidden','true');body.appendChild(bar);
/* staged opening */
requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.add('motion-loaded')));
/* reveal system */
const selectors=['.section-head','.k-card','.tools-wrap','.purpose-card','.purpose-links','.platform-copy','.final-cta','.role-card','.guide-stage','.article-card','.article-card-new','.doc-card','.story-card','.hero-panel','.facts','.timeline-item','.experience-card','.skill-card','.contact-card','.award-grid','.project-card'];
const reveal=[...new Set($$(selectors.join(',')))];reveal.forEach((el,i)=>{el.classList.add('motion-item');el.style.setProperty('--motion-delay',`${(i%5)*55}ms`)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -7% 0px'});reveal.forEach(x=>io.observe(x));
/* magnetic CTAs */
$$('.btn,.nav-cta,.note-button').forEach(el=>{if(!fine.matches||reduce.matches)return;el.classList.add('motion-magnet');el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);el.style.setProperty('--mag-x',`${x*.10}px`);el.style.setProperty('--mag-y',`${y*.14}px`)});el.addEventListener('pointerleave',()=>{el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px')})});
/* gentle card perspective */
$$('.k-card,.role-card,.guide-stage,.article-card,.article-card-new,.purpose-card').forEach(card=>{card.classList.add('motion-depth');if(!fine.matches||reduce.matches)return;card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',`${(-y*2.4).toFixed(2)}deg`);card.style.setProperty('--ry',`${(x*2.4).toFixed(2)}deg`)});card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')})});
/* selective progressive-reading effect */
const readTarget=isHome?$('#platform .platform-copy p'):null;if(readTarget&&!readTarget.dataset.motionSplit){const text=readTarget.textContent;readTarget.textContent='';readTarget.dataset.motionSplit='1';[...text].forEach((ch,i)=>{const s=d.createElement('span');s.className='motion-char';s.style.setProperty('--ci',i);s.textContent=ch===' '?'\u00a0':ch;readTarget.appendChild(s)});readTarget.style.setProperty('--char-count',[...text].length)}
/* project stacking */
const projectCards=$$('.project-card');if(projectCards.length>1){body.classList.add('motion-project-stack');projectCards.forEach((c,i)=>{c.style.setProperty('--stack-i',i);c.style.setProperty('--stack-target',(1-(projectCards.length-1-i)*.025).toFixed(3))})}
const scenes=isHome?[$('#knowledge'),$('#tools'),$('#resources'),$('#career'),$('#platform'),$('#ai-hub')].filter(Boolean):[];
let target=w.scrollY,smooth=w.scrollY,tx=0,ty=0,mx=0,my=0,raf=0;
function sceneProgress(el){const r=el.getBoundingClientRect();return clamp((innerHeight-r.top)/(innerHeight+r.height))}
function update(){raf=0;target=w.scrollY;smooth=reduce.matches?target:lerp(smooth,target,.12);mx=reduce.matches?0:lerp(mx,tx,.1);my=reduce.matches?0:lerp(my,ty,.1);const max=Math.max(1,root.scrollHeight-innerHeight);root.style.setProperty('--motion-scroll',(target/max).toFixed(5));root.style.setProperty('--motion-mx',mx.toFixed(4));root.style.setProperty('--motion-my',my.toFixed(4));root.style.setProperty('--motion-mx-px',`${(mx*20).toFixed(2)}px`);root.style.setProperty('--motion-my-px',`${(my*13).toFixed(2)}px`);root.style.setProperty('--motion-rx',`${(my*-2).toFixed(2)}deg`);root.style.setProperty('--motion-ry',`${(mx*2.5).toFixed(2)}deg`);root.style.setProperty('--motion-hero-x',`${(mx*-10).toFixed(2)}px`);root.style.setProperty('--motion-hero-y',`${(my*-7).toFixed(2)}px`);
 if(isHome){const hero=$('.hero'),hr=hero.getBoundingClientRect(),hp=clamp(-hr.top/Math.max(hr.height,1));root.style.setProperty('--hero-p',hp.toFixed(4));root.style.setProperty('--hero-y',`${(-hp*110).toFixed(1)}px`);root.style.setProperty('--hero-scale',(1-hp*.045).toFixed(4));root.style.setProperty('--hero-opacity',(1-hp*.72).toFixed(4));root.style.setProperty('--touch-hero-y',`${(-hp*28).toFixed(1)}px`);
 scenes.forEach((s,i)=>{const r=s.getBoundingClientRect(),p=sceneProgress(s),center=(r.top+r.height/2-innerHeight/2)/(innerHeight+r.height);s.style.setProperty('--scene-p',p.toFixed(4));s.style.setProperty('--scene-d',center.toFixed(4));s.style.setProperty('--scene-i',i);});
 const tools=$('#tools');if(tools){const p=sceneProgress(tools);tools.style.setProperty('--tools-x',`${((.5-p)*70).toFixed(1)}px`)}
 const career=$('#career');if(career){const p=sceneProgress(career);career.style.setProperty('--career-x',`${((p-.5)*55).toFixed(1)}px`)}
 if(readTarget){const r=readTarget.getBoundingClientRect(),p=clamp((innerHeight*.86-r.top)/(innerHeight*.62));readTarget.style.setProperty('--read-p',p.toFixed(4))}
 }
 projectCards.forEach((c,i)=>{const r=c.getBoundingClientRect(),p=clamp((96-r.top)/(Math.max(innerHeight*.55,1)));c.style.setProperty('--stack-p',p.toFixed(4));c.style.setProperty('--stack-scale',(1-p*(.035+Math.max(0,projectCards.length-1-i)*.012)).toFixed(4))});
 if(Math.abs(smooth-target)>.1||Math.abs(mx-tx)>.001||Math.abs(my-ty)>.001)tick();}
function tick(){if(!raf)raf=requestAnimationFrame(update)}
w.addEventListener('scroll',tick,{passive:true});w.addEventListener('resize',tick,{passive:true});w.addEventListener('pointermove',e=>{if(!fine.matches||reduce.matches)return;tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;tick()},{passive:true});reduce.addEventListener?.('change',tick);tick();
})();
