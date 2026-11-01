const C='alltag-v37',F=['./','index.html','style.css','app.js','catalog.js','sync.js','manifest.json','icons/icon.svg','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','fonts/poppins-400.woff2','fonts/poppins-500.woff2','fonts/poppins-600.woff2','fonts/poppins-600i.woff2','fonts/poppins-700.woff2','fonts/poppins-700i.woff2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;   // Datenabgleich nie abfangen
  e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{})}return r}).catch(()=>caches.match(e.request)));
});
