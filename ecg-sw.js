// Service worker: solo maneja los archivos de la app ECG; el resto del sitio no se toca.
const C='ecg-contec-v4';
const F=['./ecg-contec.html','./ecg-manifest.json','./ecg-icon-192.png','./ecg-icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('ecg-contec-')&&n!==C).map(n=>caches.delete(n)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(!/\/ecg-[^/]*$/.test(u.pathname))return;
  // red primero (para recibir actualizaciones), caché si no hay internet
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
