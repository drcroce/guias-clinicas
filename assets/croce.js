
(function(){
  function text(el){ return (el && el.textContent || '').replace(/\s+/g,' ').trim(); }
  function sectionTitle(section){
    const h = section.querySelector('.section-title, .sec-header h2, h2');
    return text(h) || (section.id||'Sección').replace(/^tab-/,'').replace(/[-_]/g,' ');
  }
  function getTabs(){ return Array.from(document.querySelectorAll('.tab-btn,.tab')); }
  function activateHash(){
    const id = decodeURIComponent((location.hash||'').replace('#',''));
    if(!id) return;
    const target = document.getElementById(id);
    if(!target) return;
    if(target.classList.contains('section') || target.classList.contains('tab-panel')){
      document.querySelectorAll('.section,.tab-panel').forEach(s=>s.classList.remove('active'));
      target.classList.add('active');
      const clean = id.replace(/^tab-/,'');
      getTabs().forEach(t=>{
        const oc=t.getAttribute('onclick')||'';
        if(oc.includes("'"+clean+"'")||oc.includes('"'+clean+'"')||oc.includes("'"+id+"'")||oc.includes('"'+id+'"')) t.classList.add('active');
        else t.classList.remove('active');
      });
      setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),50);
    }
  }
  function buildTOC(){
    if(document.querySelector('.croce-guide-toc')) return;
    const sections = Array.from(document.querySelectorAll('.section[id],.tab-panel[id]')).filter(s=>s.id && text(s).length>40);
    if(sections.length < 3) return;
    const toc=document.createElement('nav');
    toc.className='croce-guide-toc'; toc.setAttribute('aria-label','Índice interno de la guía');
    toc.innerHTML='<strong>Índice:</strong>';
    sections.forEach(sec=>{
      const a=document.createElement('a'); a.href='#'+sec.id; a.textContent=sectionTitle(sec).replace(/^\S+\s/,'').slice(0,42);
      a.addEventListener('click',function(e){ e.preventDefault(); history.replaceState(null,'','#'+sec.id); activateHash(); });
      toc.appendChild(a);
    });
    const tabs=document.querySelector('.tabs,.nav-tabs,.tabs-wrapper');
    if(tabs && tabs.parentNode) tabs.parentNode.insertBefore(toc,tabs.nextSibling);
    else if(document.body) document.body.insertBefore(toc, document.body.firstChild);
  }
  function keyboardCards(){
    document.querySelectorAll('.card-header').forEach(h=>{
      if(!h.hasAttribute('tabindex')) h.setAttribute('tabindex','0');
      if(!h.getAttribute('role')) h.setAttribute('role','button');
      h.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); h.click(); }});
    });
  }
  window.CrocePremium = { buildTOC, activateHash };
  document.addEventListener('DOMContentLoaded',()=>{ buildTOC(); keyboardCards(); activateHash(); });
  window.addEventListener('hashchange', activateHash);
})();
