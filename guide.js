(()=>{
  const drawer=document.getElementById('guide-drawer');
  const scrim=document.getElementById('guide-scrim');
  const content=document.getElementById('guide-content');
  const outline=document.getElementById('guide-outline');
  const openButton=document.getElementById('guide-open');
  if(!drawer||!openButton)return;

  let loaded=false;
  let fontSize=Number(localStorage.getItem('milesight-guide-font'))||14;
  let drawerWidth=Number(localStorage.getItem('milesight-guide-width'))||620;
  drawer.style.setProperty('--guide-font',fontSize+'px');
  drawer.style.width=Math.min(drawerWidth,window.innerWidth*.82)+'px';

  const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const inline=value=>escapeHtml(value)
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  const isSpecial=(line,next)=>/^#{1,4}\s/.test(line)||/^---+$/.test(line)||/^\d+\.\s/.test(line)||/^[-*]\s/.test(line)||(line.includes('|')&&next&&/^\s*\|?\s*:?-+/.test(next));

  function renderMarkdown(markdown){
    const lines=markdown.replace(/^\uFEFF/,'').split(/\r?\n/);
    const html=[];
    let i=0,headingIndex=0;
    while(i<lines.length){
      let line=lines[i].trim();
      if(!line){i++;continue}
      let heading=line.match(/^(#{1,4})\s+(.+)$/);
      if(heading){
        const level=heading[1].length,id='guide-section-'+(++headingIndex);
        html.push(`<h${level} id="${id}">${inline(heading[2])}</h${level}>`);i++;continue;
      }
      if(/^---+$/.test(line)){html.push('<hr>');i++;continue}
      if(line.includes('|')&&i+1<lines.length&&/^\s*\|?\s*:?-+/.test(lines[i+1])){
        const split=row=>row.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());
        const headers=split(line);i+=2;const rows=[];
        while(i<lines.length&&lines[i].includes('|')&&lines[i].trim()){rows.push(split(lines[i]));i++}
        html.push(`<table><thead><tr>${headers.map(x=>`<th>${inline(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${inline(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);continue;
      }
      if(/^\d+\.\s/.test(line)){
        const items=[];while(i<lines.length&&/^\d+\.\s/.test(lines[i].trim())){items.push(lines[i].trim().replace(/^\d+\.\s+/,''));i++}
        html.push(`<ol>${items.map(x=>`<li>${inline(x)}</li>`).join('')}</ol>`);continue;
      }
      if(/^[-*]\s/.test(line)){
        const items=[];while(i<lines.length&&/^[-*]\s/.test(lines[i].trim())){items.push(lines[i].trim().replace(/^[-*]\s+/,''));i++}
        html.push(`<ul>${items.map(x=>`<li>${inline(x)}</li>`).join('')}</ul>`);continue;
      }
      const paragraph=[line];i++;
      while(i<lines.length&&lines[i].trim()&&!isSpecial(lines[i].trim(),lines[i+1])){paragraph.push(lines[i].trim());i++}
      html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    }
    return html.join('');
  }

  function buildOutline(){
    outline.innerHTML='<option value="">选择章节</option>';
    content.querySelectorAll('h2,h3').forEach(heading=>{
      const option=document.createElement('option');
      option.value=heading.id;
      option.textContent=(heading.tagName==='H3'?'— ':'')+heading.textContent;
      outline.appendChild(option);
    });
  }

  function showGuide(markdown){
    content.innerHTML=renderMarkdown(markdown);
    buildOutline();loaded=true;
  }

  async function loadGuide(){
    if(loaded)return;
    try{
      const custom=localStorage.getItem('milesight-guide-custom');
      if(custom){showGuide(custom);return}
      const response=await fetch('USER-GUIDE-AND-SPEAKER-NOTES-ZH.md',{cache:'no-store'});
      if(!response.ok)throw new Error('Guide file unavailable');
      showGuide(await response.text());
    }catch(error){
      content.innerHTML='<h2>Unable to load the presenter guide</h2><p>Please open the site through the local preview server and try again.</p>';
    }
  }

  function openGuide(){
    scrim.hidden=false;drawer.setAttribute('aria-hidden','false');
    requestAnimationFrame(()=>drawer.classList.add('open'));
    loadGuide();document.body.classList.add('guide-open');
  }
  function closeGuide(){
    drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('guide-open');
    setTimeout(()=>{if(!drawer.classList.contains('open'))scrim.hidden=true},240);
  }

  openButton.addEventListener('click',openGuide);
  document.getElementById('guide-close').addEventListener('click',closeGuide);
  scrim.addEventListener('click',closeGuide);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&drawer.classList.contains('open'))closeGuide()});
  outline.addEventListener('change',()=>{const target=document.getElementById(outline.value);if(target)target.scrollIntoView({block:'start'})});
  document.getElementById('guide-smaller').addEventListener('click',()=>{fontSize=Math.max(11,fontSize-1);drawer.style.setProperty('--guide-font',fontSize+'px');localStorage.setItem('milesight-guide-font',fontSize)});
  document.getElementById('guide-larger').addEventListener('click',()=>{fontSize=Math.min(20,fontSize+1);drawer.style.setProperty('--guide-font',fontSize+'px');localStorage.setItem('milesight-guide-font',fontSize)});

  document.getElementById('guide-resizer').addEventListener('pointerdown',event=>{
    if(window.innerWidth<=800)return;
    event.preventDefault();document.body.classList.add('guide-resizing');
    const move=moveEvent=>{drawerWidth=Math.max(380,Math.min(window.innerWidth*.82,window.innerWidth-moveEvent.clientX));drawer.style.width=drawerWidth+'px'};
    const stop=()=>{document.body.classList.remove('guide-resizing');localStorage.setItem('milesight-guide-width',Math.round(drawerWidth));window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',stop)};
    window.addEventListener('pointermove',move);window.addEventListener('pointerup',stop);
  });
  window.addEventListener('storage',event=>{if(event.key==='milesight-guide-custom'){loaded=false;loadGuide()}});
})();
