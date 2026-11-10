window.coverOpen=true;
const chapters=['explore','hq','optimize','deploy','prove'];
const previewParams=new URLSearchParams(location.search);
if(chapters.includes(previewParams.get('page'))){window.coverOpen=false;state.page=previewParams.get('page')}
if(DATA.scenarios[previewParams.get('scenario')])state.scenario=previewParams.get('scenario');
if(DATA.modules[previewParams.get('module')])state.module=previewParams.get('module');
if(/^\d+$/.test(previewParams.get('zone')||''))state.zone=Number(previewParams.get('zone'));
if(DATA.automation.some(x=>x.id===previewParams.get('automation')))state.automation=previewParams.get('automation');
function chapterIndex(){return coverOpen?-1:chapters.indexOf(state.page)}
function renderCover(){document.querySelector('#app').dataset.page='cover';document.querySelector('#app').innerHTML=coverHtml();document.querySelector('#crumb').textContent='Overview';document.querySelectorAll('[data-scenario]').forEach(b=>b.onclick=()=>{state.scenario=b.dataset.scenario;state.enabled=[...scenario().modules];state.module=state.enabled[0];persist();renderCover();scheduleFit()});document.querySelector('[data-start]').onclick=()=>selectChapter(0);scheduleFit()}
function selectChapter(i){if(i<0){coverOpen=true;renderCover();return}coverOpen=false;state.page=chapters[Math.max(0,Math.min(4,i))];render()}
function fitSlide(){let v=document.querySelector('#deck-viewport'),s=document.querySelector('#slide'),w=v.clientWidth,h=v.clientHeight;if(!w||!h)return;const designWidth=1200,scale=w/designWidth,designHeight=Math.max(500,Math.min(790,h/scale));s.style.width=designWidth+'px';s.style.height=designHeight+'px';s.style.setProperty('--page-height',designHeight+'px');s.style.transform=`scale(${scale})`;s.style.left='0px';s.style.top=Math.max(0,(h-designHeight*scale)/2)+'px';let i=chapterIndex();document.querySelectorAll('[data-step]').forEach(b=>b.classList.toggle('active',Number(b.dataset.step)===i));document.querySelector('#slide-number').textContent=i<0?'OVERVIEW':`0${i+1} / 05`;document.querySelector('#previous').disabled=i<0;document.querySelector('#next').disabled=i===4;document.querySelector('#next').textContent=i===4?'End of walkthrough':i<0?'Explore the store →':'Next chapter →'}
let fitting=false;function scheduleFit(){if(fitting)return;fitting=true;requestAnimationFrame(()=>{fitting=false;fitSlide()})}
document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>selectChapter(Number(b.dataset.step)));
document.querySelector('#previous').onclick=()=>selectChapter(chapterIndex()-1);
document.querySelector('#next').onclick=()=>{let i=chapterIndex();if(i<4)selectChapter(i+1)};
window.addEventListener('resize',scheduleFit);new ResizeObserver(scheduleFit).observe(document.querySelector('#slide'));
coverOpen?renderCover():render();
