// Biblioteca Médica Personal Croce · Funciones comunes v1.0
(function(){
  window.CroceGuide=window.CroceGuide||{};
  window.CroceGuide.toggleFullscreen=function(){const d=document.documentElement;if(!document.fullscreenElement&&d.requestFullscreen)d.requestFullscreen().catch(()=>{});else if(document.exitFullscreen)document.exitFullscreen().catch(()=>{});};
  if(!window.toggleFullscreen) window.toggleFullscreen=window.CroceGuide.toggleFullscreen;
  if(!window.toggleFullScreen) window.toggleFullScreen=window.CroceGuide.toggleFullscreen;
  window.CroceGuide.toggleAllCards=function(open){document.querySelectorAll('.card').forEach(c=>{c.classList.toggle('open',!!open);const h=c.querySelector('.card-header,.card-head');const b=c.querySelector('.card-body');if(h){h.classList.toggle('open',!!open);h.setAttribute('aria-expanded',open?'true':'false')}if(b){b.classList.toggle('open',!!open);b.classList.toggle('show',!!open);b.style.display=open?'block':''}})};
  if(!window.toggleAllCards) window.toggleAllCards=window.CroceGuide.toggleAllCards;
  if(!window.expandAllCards) window.expandAllCards=function(){window.CroceGuide.toggleAllCards(true)};
  if(!window.collapseAllCards) window.collapseAllCards=function(){window.CroceGuide.toggleAllCards(false)};
  document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.classList&&e.target.classList.contains('card-header')){e.preventDefault();e.target.click();}});
})();
