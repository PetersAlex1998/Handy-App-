const C='alltag-v28',F=['./','index.html','style.css','app.js','catalog.js','manifest.json','icons/icon.svg','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const h=new URL(e.request.url).hostname,font=h==='fonts.googleapis.com'||h==='fonts.gstatic.com';
  e.respondWith(fetch(e.request).then(r=>{if(font&&r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{})}return r}).catch(()=>caches.match(e.request)));
});
