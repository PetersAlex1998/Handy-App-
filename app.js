'use strict';
const $=id=>document.getElementById(id);
/* ---------- Icons ---------- */
const P={
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
list:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="M3.5 6l1.2 1.2L6.5 5M3.5 12l1.2 1.2L6.5 11M3.5 18l1.2 1.2L6.5 17"/>',
cal:'<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 3v3M16 3v3"/>',
repeat:'<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 014-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 01-4 4H4"/>',
more:'<rect x="4" y="4" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
bell:'<path d="M6 16v-5a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
chevL:'<path d="M15 5l-7 7 7 7"/>',
chevR:'<path d="M9 5l7 7-7 7"/>',
flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3.2 2-4.2.3 1.5 1 2.2 2 2.2 0-3-1-5 1-8z"/>',
cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M3 4h2.5l2 11h11l2-8H6.5"/>',
note:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
down:'<path d="M12 3v12M7 11l5 5 5-5M4 20h16"/>',
up:'<path d="M12 16V4M7 8l5-5 5 5M4 20h16"/>',
copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
plate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
home:'<path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z"/>',
folder:'<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
chart:'<path d="M5 20v-7M12 20V5M19 20v-11"/>',
moon:'<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>',
book:'<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>'
};
function ic(n,s=22,w=1.8){return `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`}


/* ---------- Daten ---------- */
const K={s:'alltag.shop.v1',x:'alltag.recipes.v1',m:'alltag.meals.v1',c:'alltag.settings.v1',nu:'alltag.nudge.v1',bk:'alltag.books.v1',b:'alltag.backup.v1'};
// Aufgaben, Gewohnheiten, Notizen, Projekte, Rückblicke und Rituale sind ausgeblendet.
// Ihre Daten bleiben unverändert im Speicher und werden in jeder Sicherung mitgenommen.
const LEGACY={tasks:'alltag.tasks.v1',habits:'alltag.habits.v1',notes:'alltag.notes.v1',reviews:'alltag.reviews.v1',projects:'alltag.projects.v1',rituals:'alltag.rituals.v1'};
const load=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const day=(v,def)=>Number.isInteger(v)&&v>=0&&v<=6?v:def;
const persN=v=>{v=parseInt(v,10);return Number.isFinite(v)?Math.max(1,Math.min(20,v)):2};
const cleanSettings=o=>({planDay:day(o&&o.planDay,6),shopDay:day(o&&o.shopDay,0),persons:persN(o&&o.persons)});
let shop=load(K.s,[]),recipes=load(K.x,[]),meals=load(K.m,[]),books=load(K.bk,[]);
// Ältere Rezepte mit Buchname bekommen ein Kochbuch-Modul
recipes.forEach(r=>{if(r.book&&!r.bid){let b=books.find(x=>x.name===r.book);if(!b){b={id:Date.now()+books.length,name:r.book,cover:''};books.push(b)}r.bid=b.id}delete r.book});
let settings=cleanSettings(load(K.c,{}));
let nstate=Object.assign({date:'',hide:{},snooze:{}},load(K.nu,{}));
const saveS=()=>put(K.s,shop),saveX=()=>put(K.x,recipes),saveM=()=>put(K.m,meals),saveC=()=>put(K.c,settings),saveNu=()=>put(K.nu,nstate),saveB=()=>put(K.bk,books);
const saveAll=()=>{saveS();saveX();saveM();saveC();saveB()};
saveX();saveB();
const lastBackup=()=>{try{return +localStorage.getItem(K.b)||0}catch(e){return 0}};
const markBackup=()=>{try{localStorage.setItem(K.b,String(Date.now()))}catch(e){}};
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}

/* ---------- Hilfen ---------- */
const iso=d=>{const z=new Date(d.getTime()-d.getTimezoneOffset()*6e4);return z.toISOString().slice(0,10)};
const today=()=>iso(new Date());
function addDays(d,n){const x=new Date(d+'T00:00');x.setDate(x.getDate()+n);return iso(x)}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const dowIdx=d=>(new Date(d+'T00:00').getDay()+6)%7;   // 0 = Montag
const WDSHORT=['Mo','Di','Mi','Do','Fr','Sa','So'];

/* ---------- Rückgängig ---------- */
let undoSnap=null,toastTimer=null;
const snap=()=>JSON.stringify({shop,recipes,meals,settings,books});
function toast(msg,info){
  undoSnap=info?null:(snap.last||null);$('tundo').hidden=!!info;
  $('tmsg').textContent=msg;$('toast').hidden=false;
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>{$('toast').hidden=true},6000);
}
function destructive(msg,fn){snap.last=snap();fn();render();toast(msg)}
$('tundo').addEventListener('click',()=>{
  if(!undoSnap)return;
  const o=JSON.parse(undoSnap);shop=o.shop||[];recipes=o.recipes||[];meals=o.meals||[];books=o.books||[];settings=cleanSettings(o.settings);saveAll();
  undoSnap=null;$('toast').hidden=true;render();
});

/* ---------- Sicherung ---------- */
let pendingImport=null,backupMsg='',backupText='';
function legacyData(){const o={};Object.entries(LEGACY).forEach(([k,key])=>{const v=load(key,null);if(v!==null)o[k]=v});return o}
const hasLegacy=()=>Object.keys(legacyData()).length>0;
function backupDue(){const n=shop.length+recipes.length+meals.length,l=lastBackup();return n>=5&&(!l||Date.now()-l>14*864e5)}
function backupJSON(){return JSON.stringify({app:'alltag',version:3,exported:new Date().toISOString(),data:{shop,recipes,meals,books,settings,legacy:legacyData()}},null,1)}
function downloadBackup(){
  const json=backupJSON();
  try{
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([json],{type:'application/json'}));
    a.download='alltag-sicherung-'+today()+'.json';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),5000);
    markBackup();backupMsg='Sicherung erstellt. Die Datei liegt in deinen Downloads.';
  }catch(e){backupMsg='Das Herunterladen hat nicht geklappt. Nutze „Als Text kopieren“.'}
  render();
}
function copyBackup(){
  const json=backupJSON();
  const fallback=()=>{backupText=json;backupMsg='Kopieren war nicht möglich. Markiere den Text unten und kopiere ihn von Hand.';render()};
  try{navigator.clipboard.writeText(json).then(()=>{markBackup();backupText='';backupMsg='Sicherung in die Zwischenablage kopiert. Füge sie z. B. in eine Notiz oder Mail ein.';render()}).catch(fallback)}catch(e){fallback()}
}
function readBackup(text){
  try{
    const o=JSON.parse(text),d=o&&o.data?o.data:o;
    if(!d||!Array.isArray(d.shop))throw 0;
    const legacy=Object.assign({},d.legacy&&typeof d.legacy==='object'?d.legacy:{});
    Object.keys(LEGACY).forEach(k=>{if(Array.isArray(d[k])&&!(k in legacy))legacy[k]=d[k]});   // ältere Sicherungen
    pendingImport={d:{shop:d.shop,recipes:Array.isArray(d.recipes)?d.recipes:[],meals:Array.isArray(d.meals)?d.meals:[],books:Array.isArray(d.books)?d.books:[],settings:d.settings&&typeof d.settings==='object'?d.settings:null,legacy},exported:o.exported||''};backupMsg='';
  }catch(e){pendingImport=null;backupMsg='Diese Datei ist keine gültige Sicherung.'}
  render();
}
$('bfile').addEventListener('change',e=>{
  const f=e.target.files&&e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=()=>readBackup(String(r.result));r.onerror=()=>{backupMsg='Die Datei konnte nicht gelesen werden.';render()};r.readAsText(f);e.target.value='';
});
function applyImport(){
  if(!pendingImport)return;
  const d=pendingImport.d;pendingImport=null;snap.last=snap();
  shop=d.shop;recipes=d.recipes;meals=d.meals;books=d.books;recipes.forEach(r=>{if(r.book&&!r.bid){let b=books.find(x=>x.name===r.book);if(!b){b={id:Date.now()+books.length,name:r.book,cover:''};books.push(b)}r.bid=b.id}delete r.book});if(d.settings)settings=cleanSettings(d.settings);
  Object.entries(d.legacy).forEach(([k,v])=>{if(LEGACY[k])put(LEGACY[k],v)});
  saveAll();backupMsg='Sicherung eingespielt.';render();toast('Daten ersetzt');
}

/* ---------- Navigation und Darstellung ---------- */
let view='meals';
const TABS=[['meals','Essen','plate'],['recipes','Rezepte','book'],['shop','Einkauf','cart'],['more','Mehr','more']];
const GROUPS={meals:'meals',recipes:'recipes',rcol:'recipes',recipe:'recipes',shop:'shop'};
const group=v=>v==='cook'?(cookFrom==='meals'?'meals':'recipes'):(GROUPS[v]||'more');
let wl=null;
const needLock=()=>view==='cook'||(view==='shop'&&shopMode==='store');
async function wakeLock(on){try{if(on&&'wakeLock' in navigator&&!wl){wl=await navigator.wakeLock.request('screen');wl.addEventListener('release',()=>{wl=null})}else if(!on&&wl){await wl.release();wl=null}}catch(e){wl=null}}
function setTop(title,sub,o={}){
  $('crumb').innerHTML=o.back?`<button class="back" data-back="1">${ic('chevL',18,2)}${o.back}</button>`:'';
  $('h1').textContent=title;$('sub').textContent=sub||'';$('sub').hidden=!sub;
}
const mustCount=()=>shop.filter(x=>!x.done&&x.p!==true).length;
function renderBar(){
  const mc=mustCount();
  $('bar').innerHTML=TABS.map(([k,n,i])=>`<button data-nav="${k}" class="${group(view)===k?'on':''}" ${group(view)===k?'aria-current="page"':''}>${ic(i,24,group(view)===k?2.1:1.8)}<span>${n}</span>${k==='more'&&backupDue()?'<i class="dot" title="Sicherung fällig"></i>':''}${k==='shop'&&mc?`<i class="cnt" aria-label="${mc} zu kaufen">${Math.min(99,mc)}</i>`:''}</button>`).join('');
}
function fabInfo(){
  if(view==='meals')return['meal','Gericht planen'];
  if(view==='rcol'&&recCol!=='own'&&!/^c[uo]:/.test(String(recCol)))return['recipe','Rezept hinzufügen'];
  if(view==='rcol'&&recCol==='own')return['recipe','Neues Rezept'];
  return null;
}
function render(){
  $('view').className='wrap'+(view==='shop'&&shopMode==='store'?' store':'');
  wakeLock(needLock());
  const f=fabInfo();$('fab').hidden=!f;if(f){$('fab').innerHTML=ic('plus',28,2.2);$('fab').setAttribute('aria-label',f[1])}
  ({meals:renderMeals,recipes:renderRecipes,rcol:renderCollection,recipe:renderRecipe,cook:renderCook,shop:renderShop,more:renderMore})[view]();
  renderBar();
}
function go(v){view=v;window.scrollTo(0,0);render()}

/* ---------- Startseite ---------- */
const NUDGE_SOURCES=[];   // Einhängepunkt für spätere Module
let nudgeActs={};
function backupCard(){return backupDue()?[{id:'backup',icon:'shield',title:'Zeit für eine Sicherung',text:'Sichere deine Daten, damit nichts verloren geht.',acts:[{l:'Zur Sicherung',run:()=>go('more')}]}]:[]}
function nsync(){const t=today();if(nstate.date!==t){nstate.date=t;nstate.hide={};saveNu()}}
function nHidden(id){nsync();return !!nstate.hide[id]||(nstate.snooze[id]||0)>Date.now()}
function nHide(id){nsync();nstate.hide[id]=true;saveNu()}
function nLater(id,ms){nstate.snooze[id]=Date.now()+(ms||2*36e5);saveNu()}
function nudgeHTML(c){
  nudgeActs[c.id]=c.acts||[];
  const acts=(c.acts||[]).map((a,k)=>`<button class="nbtn main" data-nact="${esc(c.id)}|${k}">${esc(a.l)}</button>`).join('');
  return `<div class="nudge ${c.cls||''}" data-nid="${esc(c.id)}"><div class="nh"><span class="ni">${ic(c.icon||'bell',18,2)}</span><b>${esc(c.title)}</b><button class="nx" data-nx="${esc(c.id)}" aria-label="Heute ausblenden">${ic('x',16,2)}</button></div>${c.text?`<p>${esc(c.text)}</p>`:''}<div class="na">${acts}<button class="nbtn" data-nlater="${esc(c.id)}" data-nms="${c.later||''}">Später</button></div></div>`;
}
function planWeekOff(){return dowIdx(today())>=settings.planDay?1:0}
function foodStep(){
  const t=today(),off=planWeekOff(),mon=monOf(off),end=addDays(mon,6);
  const from=mon>t?mon:t,upcoming=meals.filter(m=>m.date>=from&&m.date<=end);
  const open=shop.filter(x=>!x.done),must=open.filter(x=>x.p!==true),pan=open.filter(x=>x.p===true);
  const pend=meals.filter(m=>m.date>=mon&&m.date<=end&&m.date>=t&&m.rid&&!m.listed&&recOf(m.rid));
  const wk=off?'die nächste Woche':'diese Woche';
  if(!upcoming.length)return{id:'step-plan',cls:'next',prio:100,icon:'plate',title:off?'Plane die nächste Woche':'Plane deine Woche',text:'Lege fest, was es zu essen gibt. Die Einkaufsliste entsteht daraus.',
    acts:[{l:'Woche planen',run:()=>{mealStart=off?monOf(off):null;go('meals')}}].concat(recipes.length?[{l:'Vorschlag machen',run:()=>{mealStart=off?monOf(off):null;go('meals');openSuggest()}}]:[{l:'Rezepte wählen',run:()=>{recCol='own';go('rcol');openSheet('tpl')}}])};
  if(pend.length)return{id:'step-tolist',cls:'next',prio:100,icon:'cart',title:pend.length+' '+(pend.length===1?'Gericht':'Gerichte')+' noch nicht auf der Einkaufsliste',text:'Übernimm die Zutaten für '+wk+'. Gleiche Zutaten werden zusammengerechnet.',
    acts:[{l:'Zutaten übernehmen',run:()=>{mealStart=off?monOf(off):null;mealsToShop()}}]};
  if(pan.length)return{id:'step-pantry',cls:'next',prio:100,icon:'home',title:'Vorrat prüfen',text:pan.length+' '+(pan.length===1?'Zutat hast':'Zutaten hast')+' du wahrscheinlich zu Hause. Schau kurz nach, bevor du einkaufst.',
    acts:[{l:'Vorrat prüfen',run:()=>{shopMode='plan';go('shop')}}]};
  if(must.length)return{id:'step-shop',cls:'next',prio:100,icon:'cart',title:'Einkaufen: '+must.length+' '+(must.length===1?'Artikel':'Artikel'),text:dowIdx(t)===settings.shopDay?'Heute ist dein Einkaufstag.':'Alles ist geplant, die Liste ist fertig.',
    acts:[{l:'Im Laden',run:()=>{shopMode='store';go('shop')}},{l:'Liste ansehen',run:()=>{shopMode='plan';go('shop')}}]};
  return null;
}
/* ---------- Mehr: Wochenrhythmus, Sicherung ---------- */
function setSetting(k,v){settings[k]=k==='persons'?persN(v):day(+v,settings[k]);saveC();render()}
function renderMore(){
  setTop('Mehr','');
  const l=lastBackup();
  const lastTxt=l?'Letzte Sicherung: '+new Date(l).toLocaleDateString('de-DE',{day:'numeric',month:'long',year:'numeric'}):'Noch keine Sicherung gemacht';
  const wd=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
  const sel=k=>`<select id="set-${k}" data-set="${k}">${wd.map((n,i)=>`<option value="${i}" ${settings[k]===i?'selected':''}>${n}</option>`).join('')}</select>`;
  let h=`<div class="sec" style="margin-top:6px"><h2>Wochenrhythmus</h2></div><div class="card"><div class="setrow"><label for="set-planDay">Ich plane die nächste Woche ab</label>${sel('planDay')}</div><div class="setrow"><label for="set-shopDay">Mein Einkaufstag</label>${sel('shopDay')}</div><p class="hint" style="margin:10px 0 0">Ab dem Planungstag fragt die Startseite nach der nächsten Woche. Am Einkaufstag erinnert sie dich ans Einkaufen.</p></div>`;
  h+=`<div class="sec"><h2>Haushalt</h2></div><div class="card"><div class="meta" style="justify-content:center">Für wie viele Personen kochst du normalerweise?</div><div class="stepper"><button data-pers="-1" aria-label="Weniger">${ic('chevL',20,2)}</button><b>${settings.persons} ${settings.persons===1?'Person':'Personen'}</b><button data-pers="1" aria-label="Mehr">${ic('chevR',20,2)}</button></div><p class="hint" style="margin:6px 0 0;text-align:center">Wochenplan, Kochansicht und Einkaufsliste rechnen Rezepte automatisch auf diese Zahl um. Im Rezept selbst trägst du ein, für wie viele Personen es im Kochbuch steht.</p></div>`;
  h+=`<div class="sec"><h2>Datensicherung</h2></div><div class="card">
    <div class="bk"><span class="bki">${ic('shield',24)}</span><div><b>${backupDue()?'Zeit für eine Sicherung':'Deine Daten sind auf diesem Handy'}</b><div class="meta" style="font-size:13px;margin-top:2px">${lastTxt}. Sichere regelmäßig, damit nichts verloren geht, wenn du das Handy wechselst oder den Browser-Speicher löschst.</div></div></div>
    <button class="btn main" data-bdl="1">${ic('down',18)} Sicherung herunterladen</button>
    <button class="btn" data-bcopy="1">${ic('copy',18)} Als Text kopieren</button>
    <button class="btn" data-bfile="1">${ic('up',18)} Sicherung einspielen</button>`;
  if(pendingImport){
    const d=pendingImport.d,lg=Object.keys(d.legacy).length;
    h+=`<div class="note-msg"><b style="color:var(--text)">Aktuelle Daten ersetzen?</b><br>Die Sicherung enthält ${d.shop.length} Einkaufsartikel, ${d.recipes.length} Rezepte und ${d.meals.length} geplante Gerichte${lg?' sowie früher gespeicherte Aufgaben und Notizen (bleiben nur aufbewahrt)':''}${pendingImport.exported?' (vom '+new Date(pendingImport.exported).toLocaleDateString('de-DE')+')':''}. Du kannst danach „Rückgängig“ tippen.</div>
      <button class="btn danger" data-bapply="1">Ja, ersetzen</button><button class="btn" data-bcancel="1">Abbrechen</button>`;
  }
  if(backupMsg)h+=`<div class="note-msg" role="status">${esc(backupMsg)}</div>`;
  if(backupText)h+=`<textarea id="btext" readonly aria-label="Sicherung als Text">${esc(backupText)}</textarea>`;
  h+=`</div>`;
  if(hasLegacy())h+=`<div class="sec"><h2>Ausgeblendet</h2></div><div class="card"><p class="hint" style="margin:0">Aufgaben, Gewohnheiten, Notizen, Projekte und Rückblicke sind ausgeblendet. Deine früheren Einträge bleiben erhalten und stecken in jeder Sicherung.</p></div>`;
  h+=`<p class="meta" style="justify-content:center;margin-top:26px">Mein Alltag · Essen und Einkauf · Version 8</p>`;
  $('view').innerHTML=h;
}

/* ---------- Essensplan und Rezepte (Tab "Essen") ---------- */
const SLOTL={F:'Frühstück',M:'Mittag',A:'Abend'};
let mealStart=null,mealSel={rid:null,title:'',portions:2};
const persDef=()=>settings.persons||2;
function monOf(off){const t=today();return addDays(t,-dowIdx(t)+7*off)}
function mealFrom(){return mealStart||today()}
function focusMeal(date){const t=today();mealStart=(date>=t&&date<=addDays(t,6))?null:date}
function weekOffsetOf(date){const m=addDays(date,-dowIdx(date));return Math.round((new Date(m+'T00:00')-new Date(monOf(0)+'T00:00'))/(7*864e5))}
function pendingMeals(){
  const t=today(),mon=mealFrom(),end=addDays(mon,6);
  return meals.filter(m=>m.date>=mon&&m.date<=end&&m.date>=t&&m.rid&&!m.listed&&recOf(m.rid));
}
function mealsToShop(){
  const l=pendingMeals();
  if(!l.length){toast('Es gibt nichts Neues für die Einkaufsliste.',true);return}
  snap.last=snap();let n=0,mm=0;
  l.forEach(m=>{const r=recOf(m.rid),res=addRecipeIngs(r,m.portions||r.portions);n+=res.n;mm+=res.m;m.listed=true});
  saveS();saveM();render();
  toast(`${l.length} ${l.length===1?'Gericht':'Gerichte'} auf der Liste: ${n} neue Zutaten, ${mm} zusammengefasst`);
}
function mealChip(m){
  const r=m.rid?recOf(m.rid):null;
  const chip=`<button class="mchip" data-medit="${m.id}"><span>${esc(m.title)}</span><small>${r&&m.portions?m.portions+' Port.':''}${m.listed?' '+ic('cart',13,2):''}</small></button>`;
  return r?`<div class="mc">${chip}<button class="mcook" data-cook="${r.id}|${m.portions||r.portions}" aria-label="Kochen: ${esc(m.title)}">${ic('plate',18,2)}<span>Kochen</span></button></div>`:chip;
}
let recCol='own';
const bookOf=r=>r&&r.bid?books.find(b=>b.id===r.bid):null;
function srcLine(r){const bk=bookOf(r),b=bk?('📖 '+esc(bk.name)+(r.page?', S. '+esc(r.page):'')):'';return [r.course?esc(r.course):'',r.cuisine?esc(r.cuisine):'',b].filter(Boolean).join(' · ')}
const recCount=n=>n+' '+(n===1?'Rezept':'Rezepte');
const recCard=r=>{const m=r.ings.filter(i=>!i.p).length;return `<button class="card pcard${r.img?' hasimg':''}" data-ropen="${r.id}">${r.img?`<img class="pthumb" src="${r.img}" alt="">`:''}<span class="pbody"><div class="phd"><b>${esc(r.name)}</b><span class="meta">${r.portions} Port.</span></div>${srcLine(r)?`<div class="meta" style="margin-top:2px">${srcLine(r)}</div>`:''}<div class="meta" style="margin-top:2px">${r.ings.length} Zutaten · ${m} zu kaufen · ${r.ings.length-m} wahrscheinlich vorrätig</div></span></button>`};
let recQ='';
function updateRecSearch(){
  const q=recQ.trim().toLowerCase(),main=$('rmain'),res=$('rres');if(!main||!res)return;
  main.hidden=!!q;res.hidden=!q;if(!q){res.innerHTML='';return}
  const bl=books.filter(b=>b.name.toLowerCase().includes(q));
  const rl=recipes.filter(r=>[r.name,(bookOf(r)||{}).name||'',r.cuisine||'',courseTxt(r),r.ings.map(i=>i.name).join(' ')].join(' ').toLowerCase().includes(q));
  const row=(act,ic_,title,sub,tag)=>`<button class="srow" ${act}><span class="si">${ic(ic_,20,1.8)}</span><span class="st"><b>${esc(title)}</b>${sub?`<small>${sub}</small>`:''}</span><span class="stag">${tag}</span></button>`;
  const items=bl.map(b=>({n:b.name,h:row(`data-rcol="${b.id}"`,'book',b.name,recCount(recipes.filter(r=>r.bid===b.id).length),'Buch')}))
    .concat(rl.map(r=>({n:r.name,h:row(`data-ropen="${r.id}"`,'plate',r.name,srcLine(r),'Rezept')})))
    .sort((a,b)=>a.n.toLowerCase().startsWith(q)===b.n.toLowerCase().startsWith(q)?a.n.localeCompare(b.n,'de'):a.n.toLowerCase().startsWith(q)?-1:1);
  let h=items.length?`<div class="slist">${items.map(x=>x.h).join('')}</div>`:`<div class="empty"><b>Nichts gefunden</b>Versuche einen anderen Suchbegriff.</div>`;
  res.innerHTML=h;
}
function renderRecipes(){
  setTop('Rezepte',recCount(recipes.length));
  const own=recipes.filter(r=>!bookOf(r));
  const tile=(act,inner,cls='')=>`<button class="mod ${cls}" ${act}>${inner}</button>`;
  let h=`<div class="sform"><input id="rsearch" type="search" value="${esc(recQ)}" placeholder="Kochbuch, Rezept oder Zutat suchen" aria-label="Suchen" enterkeyhint="search" autocomplete="off"></div><div id="rmain"><div class="mods">`;
  h+=tile('data-rcol="own"',`<span class="mi">${ic('plate',30,1.8)}</span><b>Eigene Rezepte</b><small>${recCount(own.length)}</small>`,'plain');
  h+=books.map(b=>{const n=recipes.filter(r=>r.bid===b.id).length;
    return tile(`data-rcol="${b.id}"`,b.cover?`<img src="${b.cover}" alt=""><span class="mcap"><b>${esc(b.name)}</b><small>${recCount(n)}</small></span>`:`<span class="mi">${ic('book',30,1.8)}</span><b>${esc(b.name)}</b><small>${recCount(n)}</small>`,b.cover?'cover':'plain')}).join('');
  h+=tile('data-bnew="1"',`<span class="mi">${ic('plus',30,1.8)}</span><b>Kochbuch hinzufügen</b>`,'add');
  h+=`</div>`;
  const cus=[...new Set(recipes.map(r=>r.cuisine).filter(Boolean))];
  const cos=COURSES.filter(c=>recipes.some(r=>r.course===c));
  if(cos.length)h+=`<div class="sec"><h2>Nach Gang</h2></div><div class="frow">${cos.map(c=>`<button class="chip" data-rcol="co:${esc(c)}">${esc(c)} <small>${recipes.filter(r=>r.course===c).length}</small></button>`).join('')}</div>`;
  if(cus.length)h+=`<div class="sec"><h2>Nach Küche</h2></div><div class="frow">${cus.map(c=>`<button class="chip" data-rcol="cu:${esc(c)}">${esc(c)}</button>`).join('')}</div>`;
  h+=`</div><div id="rres" hidden></div>`;
  $('view').innerHTML=h;updateRecSearch();
}
function renderCollection(){
  const isCo=String(recCol).startsWith('co:'),isCu0=String(recCol).startsWith('cu:'),isCu=isCu0||isCo,bk=!isCu&&recCol!=='own'?books.find(b=>b.id===+recCol):null;
  if(!isCu&&recCol!=='own'&&!bk){view='recipes';return renderRecipes()}
  const list=isCo?recipes.filter(r=>r.course===recCol.slice(3)):isCu0?recipes.filter(r=>r.cuisine===recCol.slice(3)):bk?recipes.filter(r=>r.bid===bk.id):recipes.filter(r=>!bookOf(r));
  setTop(isCu?recCol.slice(3):bk?bk.name:'Eigene Rezepte',recCount(list.length),{back:'Rezepte'});
  let h='';
  if(bk){
    h+=`<button class="btn main" data-newr="1" style="margin-top:4px">${ic('plus',18,2)} Rezept aus dem Buch hinzufügen</button>`;
  }else if(!isCu){
    h+=`<button class="btn" data-tplopen="1" style="margin-top:4px">${ic('book',18,2)} Rezeptvorlagen auswählen</button>`;
  }
  if(!list.length)h+=bk?`<div class="empty"><b>Noch keine Rezepte aus diesem Buch</b>Tippe oben auf den Knopf und trage ein Rezept mit Seitenzahl ein.</div>`:isCu?`<div class="empty"><b>Keine Rezepte</b></div>`:`<div class="empty"><b>Noch keine eigenen Rezepte</b>Wähle Vorlagen aus oder lege ein eigenes Rezept an. Daraus entstehen Wochenplan und Einkaufsliste.</div><button class="btn" data-rsample="1">6 Beispielrezepte laden</button>`;
  else h+=list.map(recCard).join('');
  if(bk)h+=`<button class="btn" data-bedit="${bk.id}" style="margin-top:18px">Kochbuch bearbeiten</button>`;
  $('view').innerHTML=h;
}
function renderMeals(){
  const t=today(),mon=mealFrom(),days=[...Array(7)].map((_,i)=>addDays(mon,i));
  const short=d=>new Date(d+'T00:00').toLocaleDateString('de-DE',{day:'numeric',month:'short'});
  const wm=meals.filter(m=>m.date>=mon&&m.date<=days[6]);
  const t0=today(),dd=Math.round((new Date(mon+'T00:00')-new Date(t0+'T00:00'))/864e5);
  setTop('Essensplan',dd===0?'Heute und die nächsten 6 Tage':dd<0?'Frühere Tage':'Spätere Tage');
  nudgeActs={};
  const step=foodStep(),cards=(step?[step]:[]).concat(backupCard()).filter(c=>!nHidden(c.id));
  let h=cards.map(nudgeHTML).join('')+`<div class="wk-nav"><button data-mwk="-1" aria-label="7 Tage zurück">${ic('chevL',20,2)}</button><b>${short(days[0])} – ${short(days[6])}</b><button data-mwk="1" aria-label="7 Tage weiter">${ic('chevR',20,2)}</button></div>`;
  h+=dd!==0?`<button class="wadd" data-mwk="reset">Zurück zu heute</button>`:`<button class="wadd" data-mwk="-1">${ic('chevL',16,2)} Letzte Tage ansehen</button>`;
  const prev=meals.filter(m=>m.date>=addDays(mon,-7)&&m.date<mon);
  if(!wm.length&&prev.length)h+=`<button class="btn" data-mcopy="1" style="margin-top:12px">Die 7 Tage davor übernehmen (${prev.length} ${prev.length===1?'Gericht':'Gerichte'})</button>`;
  const pend=pendingMeals();
  if(wm.some(m=>m.rid&&recOf(m.rid)))h+=`<div class="card mplan"><b>${pend.length?pend.length+' '+(pend.length===1?'Gericht':'Gerichte')+' noch nicht auf der Einkaufsliste':'Alle Zutaten sind auf der Liste'}</b><small>Vergangene Tage zählen nicht mit. Gleiche Zutaten werden zusammengerechnet.</small>${pend.length?`<button class="btn main" data-mtoshop="1">${ic('cart',18,2)} Zutaten auf die Einkaufsliste</button>`:''}</div>`;
  const openN=shop.filter(x=>!x.done).length;
  h+=`<button class="btn" data-go="shop" style="margin-top:12px">${ic('cart',18,2)} Zur Einkaufsliste${openN?' ('+openN+' offen)':''}</button>`;
  const emptyA=days.filter(d=>d>=t&&!wm.some(m=>m.date===d&&m.slot==='A'));
  if(recipes.length&&emptyA.length)h+=`<button class="btn" data-msuggest="1" style="margin-top:12px">${ic('plate',18,2)} Abendessen vorschlagen (${emptyA.length} ${emptyA.length===1?'Tag':'Tage'})</button>`;
  h+=days.map(d=>{
    const name=new Date(d+'T00:00').toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'short'});
    const rows=['F','M','A'].map(sl=>{
      const l=wm.filter(m=>m.date===d&&m.slot===sl).sort((a,b)=>a.id-b.id);
      if(!l.length&&sl==='F')return '';
      return `<div class="mealrow"><span class="ml">${SLOTL[sl]}</span><div class="mchips">${l.map(mealChip).join('')}<button class="madd" data-madd="${d}|${sl}">${l.length?'+ weiteres Gericht':'+ planen'}</button></div></div>`;
    }).join('');
    return `<section class="wday ${d===t?'today':''}"><h3><span>${name}${d===t?' · Heute':''}</span><button class="link" data-madd="${d}|F">+ Frühstück</button></h3>${rows}</section>`;
  }).join('');
  $('view').innerHTML=h;
}
const mealF={bk:'',cu:'',co:''};
function renderMealPick(){
  const raw=$('m-q').value.trim(),q=raw.toLowerCase();
  let h='';
  if(!recipes.length)h+=`<p class="hint" style="margin-top:8px">Noch keine Rezepte vorhanden. Tippe oben ein Gericht ein oder lege Rezepte unter „Rezepte“ an.</p>`;
  else{
    const cus=[...new Set(recipes.map(r=>r.cuisine).filter(Boolean))];
    const usedBooks=books.filter(b=>recipes.some(r=>r.bid===b.id)),hasOwn=recipes.some(r=>!bookOf(r));
    if(mealF.bk&&mealF.bk!=='own'&&!usedBooks.some(b=>String(b.id)===mealF.bk))mealF.bk='';
    if(mealF.cu&&!cus.includes(mealF.cu))mealF.cu='';
    const cos=COURSES.filter(c=>recipes.some(r=>r.course===c));if(mealF.co&&!cos.includes(mealF.co))mealF.co='';
    const fc=(k,v,l)=>`<button type="button" class="chip ${mealF[k]===v?'on':''}" data-mf="${k}|${esc(v)}">${esc(l)}</button>`;
    if(usedBooks.length)h+=`<div class="lbl">Kochbuch</div><div class="frow">${fc('bk','','Alle')}${hasOwn?fc('bk','own','Eigene'):''}${usedBooks.map(b=>fc('bk',String(b.id),b.name)).join('')}</div>`;
    if(cos.length)h+=`<div class="lbl">Gang</div><div class="frow">${fc('co','','Alle')}${cos.map(c=>fc('co',c,c)).join('')}</div>`;
    if(cus.length)h+=`<div class="lbl">Küche</div><div class="frow">${fc('cu','','Alle')}${cus.map(c=>fc('cu',c,c)).join('')}</div>`;
    const l=recipes.filter(r=>(!q||(r.name+' '+((bookOf(r)||{}).name||'')+' '+(r.cuisine||'')+' '+courseTxt(r)).toLowerCase().includes(q))
      &&(!mealF.bk||(mealF.bk==='own'?!bookOf(r):String(r.bid)===mealF.bk))&&(!mealF.cu||r.cuisine===mealF.cu)&&(!mealF.co||r.course===mealF.co))
      .sort((a,b)=>a.name.localeCompare(b.name,'de'));
    h+=`<div class="lbl">${l.length} ${l.length===1?'Rezept':'Rezepte'}</div>`;
    h+=l.length?`<div class="plist">${l.map(r=>`<button type="button" class="srow ${mealSel.rid===r.id?'sel':''}" data-mrec="${r.id}">${r.img?`<img class="sthumb" src="${r.img}" alt="">`:`<span class="si">${ic('plate',20,1.8)}</span>`}<span class="st"><b>${esc(r.name)}</b>${srcLine(r)?`<small>${srcLine(r)}</small>`:''}</span>${mealSel.rid===r.id?`<span class="stag">${ic('check',18,3)}</span>`:''}</button>`).join('')}</div>`:`<p class="hint">Kein Rezept passt zu dieser Auswahl.</p>`;
  }
  if(q&&!recipes.some(r=>r.name.toLowerCase()===q))h+=`<button type="button" class="btn" data-mfree="1" style="margin-top:10px">Als eigenes Gericht: „${esc(raw)}“</button>`;
  if(mealSel.rid&&recOf(mealSel.rid)&&recOf(mealSel.rid).portions!==mealSel.portions)h+=`<p class="hint" style="margin:10px 0 0">Im Rezept: ${recOf(mealSel.rid).portions} ${recOf(mealSel.rid).portions===1?'Portion':'Portionen'}. Die Mengen werden umgerechnet.</p>`;
  if(mealSel.rid)h+=`<div class="lbl">Portionen</div><div class="stepper" style="margin:0"><button type="button" data-mport="-1" aria-label="Weniger">${ic('chevL',20,2)}</button><b>${mealSel.portions} ${mealSel.portions===1?'Portion':'Portionen'}</b><button type="button" data-mport="1" aria-label="Mehr">${ic('chevR',20,2)}</button></div>`;
  else if(mealSel.title)h+=`<p class="hint" style="margin-top:10px">Eigenes Gericht: ${esc(mealSel.title)}</p>`;
  $('m-pick').innerHTML=h;
  $('m-q').required=!mealSel.rid&&!mealSel.title;
}

/* ---------- Einkauf: Katalog, Mengen zusammenfassen, Rezepte ---------- */
const ING_LIST=[],ING_MAP=new Map();
ING_DATA.split('\n').forEach(line=>{
  const [nm,u,c,v]=line.split('|'),parts=nm.split('~');
  const e={n:parts[0],u,c,v:v==='1'?1:0,names:[parts[0].toLowerCase()].concat(parts[1]?parts[1].split(',').map(x=>x.toLowerCase()):[])};
  ING_LIST.push(e);e.names.forEach(k=>ING_MAP.set(k,e));
});
const UNITS=['Stk','g','kg','ml','l','EL','TL','Bund','Dose','Pck','Prise','Zehe','Scheibe','Becher','Glas','Flasche'];
const UNIT_ALIAS={kg:'kg',g:'g',gr:'g',l:'l',ml:'ml',stk:'Stk',stück:'Stk',st:'Stk',el:'EL',tl:'TL',bund:'Bund',dose:'Dose',dosen:'Dose',pck:'Pck',packung:'Pck',packungen:'Pck',pkg:'Pck',prise:'Prise',prisen:'Prise',zehe:'Zehe',zehen:'Zehe',scheibe:'Scheibe',scheiben:'Scheibe',becher:'Becher',glas:'Glas',gläser:'Glas',flasche:'Flasche',flaschen:'Flasche'};
const CATO=['O','M','F','B','T','C','G','D','K','N','H','S'];
const CATL={O:'Obst & Gemüse',M:'Milch & Kühlregal',F:'Fleisch & Fisch',B:'Brot & Backwaren',T:'Nudeln, Reis & Backzutaten',C:'Konserven & Saucen',G:'Gewürze & Öle',D:'Getränke',K:'Tiefkühl',N:'Nüsse & Snacks',H:'Haushalt',S:'Sonstiges'};
let uidc=0;const uid=()=>Date.now()+(++uidc);
const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
function ingFind(name){
  const k=String(name).toLowerCase().trim().replace(/\s+/g,' ');if(!k)return null;
  if(ING_MAP.has(k))return ING_MAP.get(k);
  for(const cut of [1,2,3]){if(k.length>cut+3){const w=k.slice(0,-cut);if(ING_MAP.has(w))return ING_MAP.get(w)}}
  return null;
}
function ingKey(name){
  const e=ingFind(name);if(e)return e.n.toLowerCase();
  const k=String(name).toLowerCase().trim().replace(/\s+/g,' ');
  return k.length>5?k.replace(/(en|n|e|s)$/,''):k;
}
function ingSuggest(q,limit=6){
  const t=String(q).toLowerCase().trim();if(!t)return[];
  const out=[];
  for(const e of ING_LIST){if(e.names.some(n=>n.startsWith(t)))out.push(e)}
  for(const e of ING_LIST){if(out.length>=limit)break;if(!out.includes(e)&&e.names.some(n=>n.includes(t)))out.push(e)}
  return out.slice(0,limit);
}
function toBase(q,u){if(q==null)return{q:null,u};if(u==='kg')return{q:q*1000,u:'g'};if(u==='l')return{q:q*1000,u:'ml'};return{q,u}}
const fmtNum=n=>String(Math.round(n*100)/100).replace('.',',');
function fmtAmt(q,u){
  if(q==null)return '';
  if(u==='g'&&q>=1000)return fmtNum(q/1000)+' kg';
  if(u==='ml'&&q>=1000)return fmtNum(q/1000)+' l';
  return fmtNum(q)+(u?' '+u:'');
}
function parseShopText(t){
  const txt=String(t).trim();
  const m=txt.match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/);
  if(!m||!m[2])return{q:null,u:'',name:txt};
  const q=parseFloat(m[1].replace(',','.')),rest=m[2];
  const w=rest.split(/\s+/),first=w[0].toLowerCase().replace(/[.,]$/,'');
  if(UNIT_ALIAS[first]&&w.length>1)return{q,u:UNIT_ALIAS[first],name:w.slice(1).join(' ')};
  return{q,u:'',name:rest};
}
function mkShop(name,q,u,p,rec){
  const e=ingFind(name),unit=u||(q!=null&&e?e.u:''),b=toBase(q==null?null:Math.round(q*100)/100,unit);
  return{id:uid(),name:e?e.n:cap(String(name).trim()),key:ingKey(name),q:b.q,u:b.u||'',p:!!p,cat:e?e.c:'S',r:rec?[rec]:[],done:false};
}
function addToShop(name,q,u,p,rec){
  const it=mkShop(name,q,u,p,rec);
  const ex=shop.find(x=>!x.done&&(x.key||ingKey(x.name))===it.key&&(x.q==null||it.q==null||(x.u||'')===(it.u||'')));
  if(!ex){shop.push(it);return 'new'}
  if(ex.q!=null&&it.q!=null)ex.q=Math.round((ex.q+it.q)*100)/100;
  else if(it.q!=null){ex.q=it.q;ex.u=it.u}
  ex.p=ex.p===true&&it.p===true;
  ex.key=it.key;ex.r=ex.r||[];
  (it.r||[]).forEach(n=>{if(!ex.r.includes(n))ex.r.push(n)});
  return 'merged';
}
function addRecipeIngs(r,portions){
  const f=portions/(r.portions||1);let n=0,m=0;
  r.ings.forEach(i=>{const res=addToShop(i.name,i.q==null?null:i.q*f,i.u,i.p,r.name);if(res==='new')n++;else m++});
  return{n,m};
}
function recipeToShop(r,portions){
  snap.last=snap();
  const res=addRecipeIngs(r,portions);saveS();
  shopMode='plan';view='shop';render();
  toast(`„${r.name}“ auf der Liste: ${res.n} neu${res.m?', '+res.m+' zusammengefasst':''}`);
}
function makeSamples(){
  return SAMPLES.map(([name,portions,ings])=>({id:uid(),name,portions,note:'',cuisine:guessCuisine(name),course:guessCourse(name),bid:null,page:'',ings:ings.map(([n,q,u])=>{const e=ingFind(n);return{id:uid(),name:e?e.n:n,q,u,p:e?e.v===1:false}})}));
}
function recOf(id){return recipes.find(r=>r.id===id)}
function sugEmpty(){
  const t=today(),mon=mealFrom(),days=[...Array(7)].map((_,i)=>addDays(mon,i)).filter(d=>d>=t);
  const wm=meals.filter(m=>m.date>=mon&&m.date<=addDays(mon,6));
  return days.filter(d=>!wm.some(m=>m.date===d&&m.slot==='A'));
}
let sugN=1,sugCu=new Set();
function openSuggest(){
  if(!recipes.length){toast('Lege zuerst Rezepte an, dann kann ich etwas vorschlagen.',true);return}
  if(!sugEmpty().length){toast('Alle Abende sind schon geplant.',true);return}
  sugN=sugEmpty().length;sugCu=new Set();openSheet('sug');
}
function renderSug(){
  const max=sugEmpty().length,cus=[...new Set(recipes.map(r=>r.cuisine).filter(Boolean))];
  sugN=Math.max(1,Math.min(max,sugN));
  const pool=recipes.filter(r=>!sugCu.size||sugCu.has(r.cuisine));
  let h=`<div class="lbl" style="margin-top:4px">Wie viele Abendessen?</div><div class="stepper" style="margin:0"><button type="button" data-sugn="-1" aria-label="Weniger">${ic('chevL',20,2)}</button><b>${sugN} ${sugN===1?'Vorschlag':'Vorschläge'}</b><button type="button" data-sugn="1" aria-label="Mehr">${ic('chevR',20,2)}</button></div><p class="hint" style="text-align:center;margin:4px 0 0">${max} ${max===1?'Abend ist':'Abende sind'} noch frei</p>`;
  if(cus.length)h+=`<div class="lbl">Besondere Vorlieben (optional)</div><div class="mpick" style="margin-top:0">${cus.map(c=>`<button type="button" class="chip ${sugCu.has(c)?'on':''}" data-sugcu="${esc(c)}">${esc(c)}</button>`).join('')}</div><p class="hint" style="margin:8px 0 0">${sugCu.size?pool.length+' passende '+(pool.length===1?'Rezept':'Rezepte'):'Nichts gewählt: Ich wähle zufällig aus allen Rezepten.'}</p>`;
  else h+=`<p class="hint" style="margin-top:12px">Ich wähle zufällig aus deinen Rezepten. Mit einer Küche pro Rezept kannst du Vorlieben wählen.</p>`;
  h+=`<div class="acts"><button type="submit" class="ok">${ic('plate',18,2)} Vorschlagen</button></div>`;
  $('sug-body').innerHTML=h;
}
function suggestWeek(n,cus){
  const empty=sugEmpty();
  if(!recipes.length||!empty.length){toast('Es gibt nichts zu füllen.',true);return}
  const wm=meals.filter(m=>m.date>=mealFrom()&&m.date<=addDays(mealFrom(),6));
  const used=new Set(wm.filter(m=>m.rid).map(m=>m.rid));
  const base=cus&&cus.size?recipes.filter(r=>cus.has(r.cuisine)):recipes;
  if(!base.length){toast('Dazu gibt es noch keine Rezepte.',true);return}
  const shuffle=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  const pool=shuffle(base.filter(r=>!used.has(r.id))),spare=shuffle(base);
  snap.last=snap();let last=null,cnt=0;
  empty.slice(0,n||empty.length).forEach(d=>{
    let r=pool.shift();
    if(!r){r=spare.find(x=>x.id!==last)||spare[0]}
    last=r.id;meals.push({id:uid(),date:d,slot:'A',rid:r.id,title:r.name,portions:persDef(),listed:false});cnt++;
  });
  saveM();render();toast(cnt+' '+(cnt===1?'Abendessen':'Abendessen')+' vorgeschlagen. Tippe ein Gericht an, um es zu ändern.');
}
const ALL_TPL=()=>SAMPLES.concat(MORE_TPL);
const COURSES=['Vorspeise','Hauptspeise','Beilage','Nachspeise','Backen','Frühstück','Snack'];
const courseTxt=r=>r.course?(r.course==='Nachspeise'?'Nachspeise Dessert':r.course==='Backen'?'Backen Kuchen Gebäck':r.course):'';
const guessCourse=n=>/salat|bruschetta/i.test(n)?'Vorspeise':/haferflocken|rührei/i.test(n)?'Frühstück':/abendbrot/i.test(n)?'Snack':'Hauptspeise';
const CUISINES=['Deutsch','Italienisch','Asiatisch','Griechisch','Orientalisch','Mexikanisch','Amerikanisch','Französisch','Sonstige'];
const guessCuisine=n=>/spaghetti|lasagne|carbonara|pesto|bruschetta|penne/i.test(n)?'Italienisch':/curry/i.test(n)?'Asiatisch':/chili|wrap/i.test(n)?'Mexikanisch':/griech/i.test(n)?'Griechisch':/burger/i.test(n)?'Amerikanisch':/quiche/i.test(n)?'Französisch':/suppe|kartoffel|schnitzel|fischst|rahm|pfannkuchen|abendbrot|rührei|haferflocken|nudelsalat|gemüsepfanne/i.test(n)?'Deutsch':'';
const mkRecipe=([name,portions,ings])=>({id:uid(),name,portions,note:'',cuisine:guessCuisine(name),course:guessCourse(name),bid:null,page:'',ings:ings.map(([n,q,u])=>{const e=ingFind(n);return{id:uid(),name:e?e.n:n,q,u,p:e?e.v===1:false}})});
let tplSel=new Set();
function renderTpl(){
  const have=new Set(recipes.map(r=>r.name)),l=ALL_TPL().filter(t=>!have.has(t[0]));
  $('tpl-list').innerHTML=l.length?l.map(t=>`<button type="button" class="tpl ${tplSel.has(t[0])?'on':''}" data-tpl="${esc(t[0])}"><span class="tb">${tplSel.has(t[0])?ic('check',14,3):''}</span><span class="tn">${esc(t[0])}<small>${t[2].length} Zutaten · ${t[1]} Portionen</small></span></button>`).join(''):`<div class="empty"><b>Alles hinzugefügt</b>Du hast schon alle Vorlagen.</div>`;
  const n=[...tplSel].filter(x=>l.some(t=>t[0]===x)).length;
  $('tpl-ok').textContent=n?`${n} hinzufügen`:'Hinzufügen';$('tpl-ok').disabled=!n;
  $('tpl-all').textContent=n===l.length&&l.length?'Keine auswählen':'Alle auswählen';$('tpl-all').hidden=!l.length;
}
const catOf=x=>x.cat||((ingFind(x.name)||{}).c)||'S';

let shopMode='plan',recId=null,recPort=0;
function shopRow(x,pantry){
  const src=x.r&&x.r.length?`<span class="meta">aus ${x.r.map(esc).join(', ')}</span>`:'';
  const amt=x.q!=null?`<span class="amt">${esc(fmtAmt(x.q,x.u))}</span>`:'';
  if(pantry)return `<div class="item pn"><span class="tx"><span>${esc(x.name)}</span>${src}</span>${amt}<div class="pan"><button data-shave="${x.id}">${ic('check',14,2.4)} Habe ich</button><button class="miss" data-smiss="${x.id}">Fehlt</button></div></div>`;
  return `<div class="item ${x.done?'done':''}"><button class="chk" data-sdone="${x.id}" aria-label="${x.done?'Wieder öffnen':'Abgehakt'}">${x.done?ic('check',16,2.6):''}</button><span class="tx"><span>${esc(x.name)}</span>${src}</span>${amt}<button data-sdel="${x.id}" aria-label="Entfernen" style="border:0;background:none;color:var(--muted);padding:4px">${ic('x',18,2)}</button></div>`;
}
function renderShop(){
  const open=shop.filter(x=>!x.done),done=shop.filter(x=>x.done);
  const must=open.filter(x=>x.p!==true),pan=open.filter(x=>x.p===true);
  const store=shopMode==='store';
  setTop('Einkauf',store?(done.length+' von '+(must.length+done.length)+' im Wagen'):must.length+' zu kaufen'+(pan.length?' · '+pan.length+' prüfen':''));
  const seg=`<div class="seg">${[['plan','Planen'],['store','Im Laden']].map(([k,n])=>`<button data-shmode="${k}" class="${shopMode===k?'on':''}">${n}</button>`).join('')}</div>`;
  let h=seg;
  const catGroups=(l)=>CATO.map(c=>{const g=l.filter(x=>catOf(x)===c).sort((a,b)=>a.name.localeCompare(b.name,'de'));return g.length?`<div class="shcat">${CATL[c]}</div>`+g.map(x=>shopRow(x,false)).join(''):''}).join('');
  if(store){
    const tot=must.length+done.length;
    if(!tot)h+=`<div class="empty"><b>Nichts zu kaufen</b>Die Liste ist leer.</div>`;
    else h+=`<div class="card hero"><b>${done.length} von ${tot} im Wagen</b><small>${must.length?must.length+' '+(must.length===1?'Artikel fehlt':'Artikel fehlen')+' noch':'Alles im Wagen. Guten Heimweg.'}</small><div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${tot}" aria-valuenow="${done.length}"><i style="width:${Math.round(done.length/tot*100)}%"></i></div></div>`;
    h+=catGroups(must);
    if(pan.length)h+=`<details class="tbl"><summary>Vorrat prüfen (${pan.length})</summary><p class="hint">Hast du das zu Hause? „Fehlt“ setzt es auf die Einkaufsliste.</p>${pan.sort((a,b)=>a.name.localeCompare(b.name,'de')).map(x=>shopRow(x,true)).join('')}</details>`;
    if(done.length)h+=`<div class="sec"><h2>Im Wagen</h2><span class="meta">${done.length}</span></div>`+done.map(x=>shopRow(x,false)).join('')+`<button class="btn main" data-sclear="1" style="margin-top:14px">Einkauf beendet: Abgehakte entfernen</button>`;
    $('view').innerHTML=h;return;
  }
  h+=`<form class="sform" id="sform" autocomplete="off"><input id="sname" type="text" placeholder="Artikel, z. B. 2 Tomaten" aria-label="Artikel"><button aria-label="Hinzufügen">${ic('plus',22,2.2)}</button></form><div class="sug" id="ssug"></div>`;
  if(!shop.length)h+=`<div class="empty"><b>Die Liste ist leer</b>Schreibe oben einen Artikel auf, zum Beispiel „2 Tomaten“, oder übernimm die Zutaten aus dem Wochenplan unter „Essen“.</div>`;
  if(must.length){
    h+=`<div class="sec"><h2>Unbedingt kaufen</h2><span class="meta">${must.length}</span></div>`+catGroups(must);
  }
  if(pan.length){
    h+=`<div class="sec"><h2>Wahrscheinlich vorrätig</h2><button class="link" data-shaveall="1">Alles da</button></div><p class="hint">Schau kurz nach, ob du es zu Hause hast. „Fehlt“ schiebt es nach oben.</p>`+pan.sort((a,b)=>a.name.localeCompare(b.name,'de')).map(x=>shopRow(x,true)).join('');
  }
  if(done.length)h+=`<div class="sec"><h2>Abgehakt</h2><span class="meta">${done.length}</span></div>`+done.map(x=>shopRow(x,false)).join('')+`<button class="clear" data-sclear="1">Abgehakte entfernen (${done.length})</button>`;
  $('view').innerHTML=h;
}
function renderRecipe(){
  const r=recOf(recId);
  if(!r){view='recipes';return renderRecipes()}
  if(!recPort)recPort=persDef();
  const f=recPort/(r.portions||1);
  setTop(r.name,'Im Buch: '+r.portions+' '+(r.portions===1?'Portion':'Portionen')+(recPort!==r.portions?' · umgerechnet auf '+recPort:'')+(r.cuisine?' · '+r.cuisine:''),{back:'Rezepte'});
  const must=r.ings.filter(i=>!i.p),pan=r.ings.filter(i=>i.p);
  const row=i=>`<div class="rrow"><span class="rn">${esc(i.name)}</span><span class="ra">${i.q!=null?esc(fmtAmt(Math.round(i.q*f*100)/100,i.u)):'nach Bedarf'}</span></div>`;
  let h=(r.img?`<img class="rhero" src="${r.img}" alt="${esc(r.name)}">`:'')+`<div class="card"><div class="meta" style="justify-content:center">Für wie viele Portionen?</div><div class="stepper"><button data-rport="-1" aria-label="Weniger">${ic('chevL',20,2)}</button><b>${recPort} ${recPort===1?'Portion':'Portionen'}</b><button data-rport="1" aria-label="Mehr">${ic('chevR',20,2)}</button></div></div>`;
  const bkr=bookOf(r);
  if(bkr)h+=`<div class="card srcbox">${ic('book',18,2)}<div><b>${esc(bkr.name)}</b><small>${r.page?'Seite '+esc(r.page):'Seite nicht angegeben'}</small></div></div>`;
  h+=`<button class="btn main" data-cook="${r.id}|${recPort}" style="margin-top:12px">${ic('plate',18,2)} Jetzt kochen</button>`;
  h+=`<button class="btn" data-rtoshop="1" style="margin-top:12px">${ic('cart',18,2)} Zutaten auf die Einkaufsliste</button>`;
  h+=`<div class="sec"><h2>Unbedingt kaufen</h2><span class="meta">${must.length}</span></div>`+(must.length?must.map(row).join(''):`<div class="empty" style="padding:12px">Keine Zutat markiert.</div>`);
  if(pan.length)h+=`<div class="sec"><h2>Wahrscheinlich vorrätig</h2><span class="meta">${pan.length}</span></div>`+pan.map(row).join('');
  if(r.note)h+=`<div class="sec"><h2>Zubereitung</h2></div><div class="card"><p class="pnote" style="margin:0">${esc(r.note)}</p></div>`;
  h+=`<button class="btn" data-redit="${r.id}" style="margin-top:18px">Rezept bearbeiten</button>`;
  $('view').innerHTML=h;
}
let cookId=null,cookPort=2,cookFrom='recipe',cookDone=new Set();
function renderCook(){
  const r=recOf(cookId);
  if(!r){view='recipes';return renderRecipes()}
  const f=cookPort/(r.portions||1);
  setTop(r.name,cookPort+' '+(cookPort===1?'Portion':'Portionen')+(r.cuisine?' · '+r.cuisine:''),{back:cookFrom==='meals'?'Essensplan':'Rezept'});
  const ck=k=>cookDone.has(k);
  let h=r.img?`<img class="rhero small" src="${r.img}" alt="${esc(r.name)}">`:'';
  const bkr=bookOf(r);
  if(bkr)h+=`<div class="card srcbox">${ic('book',18,2)}<div><b>${esc(bkr.name)}</b><small>${r.page?'Seite '+esc(r.page):'Seite nicht angegeben'}${r.note?'':' · Zubereitung steht im Kochbuch'}</small></div></div>`;
  h+=`<div class="sec"><h2>Zutaten</h2><span class="meta">${r.ings.filter(i=>ck('i'+i.id)).length}/${r.ings.length}</span></div>`;
  h+=r.ings.map(i=>`<button class="crow ${ck('i'+i.id)?'done':''}" data-cdone="i${i.id}"><span class="cb">${ck('i'+i.id)?ic('check',14,3):''}</span><span class="rn">${esc(i.name)}</span><span class="ra">${i.q!=null?esc(fmtAmt(Math.round(i.q*f*100)/100,i.u)):'nach Bedarf'}</span></button>`).join('');
  const steps=(r.note||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
  if(steps.length){h+=`<div class="sec"><h2>Zubereitung</h2></div>`+steps.map((t,k)=>`<button class="crow step ${ck('s'+k)?'done':''}" data-cdone="s${k}"><span class="cb">${ck('s'+k)?ic('check',14,3):k+1}</span><span class="rn">${esc(t)}</span></button>`).join('')}
  else if(!bkr)h+=`<div class="empty" style="padding:12px">Noch keine Zubereitung hinterlegt. Du kannst sie beim Bearbeiten des Rezepts eintragen.</div>`;
  h+=`<button class="btn" data-redit="${r.id}" style="margin-top:18px">Rezept bearbeiten</button>`;
  $('view').innerHTML=h;
}
function updateShopSug(){
  const el=$('ssug'),inp=$('sname');if(!el||!inp)return;
  const p=parseShopText(inp.value);
  const l=p.name.length>=1?ingSuggest(p.name):[];
  el.innerHTML=l.map(e=>`<button type="button" data-ssug="${esc(e.n)}">${esc(e.n)}<small>${e.u}</small></button>`).join('');
}

/* Rezept bearbeiten (Sheet) */
let sheetIngs=[];
function renderIngs(){
  $('r-ings').innerHTML=sheetIngs.length?sheetIngs.map((i,k)=>`<div class="ing"><input type="number" step="any" inputmode="decimal" data-iq="${k}" value="${i.q==null?'':i.q}" placeholder="–" aria-label="Menge ${esc(i.name)}"><select data-iu="${k}" aria-label="Einheit ${esc(i.name)}"><option value="">–</option>${UNITS.map(u=>`<option ${u===i.u?'selected':''}>${u}</option>`).join('')}</select><span class="iname">${esc(i.name)}</span><button type="button" class="pv ${i.p?'on':''}" data-ip="${k}" aria-pressed="${i.p}" title="Umschalten">${i.p?'Vorrat':'Kaufen'}</button><button type="button" class="ix" data-ix="${k}" aria-label="Entfernen">${ic('x',16,2)}</button></div>`).join(''):`<div class="hint">Noch keine Zutaten.</div>`;
}
function updateIngSug(){
  const el=$('r-sug');if(!el)return;
  const q=parseShopText($('r-iname').value).name;
  el.innerHTML=(q.length>=1?ingSuggest(q):[]).map(e=>`<button type="button" data-rsug="${esc(e.n)}">${esc(e.n)}<small>${e.u}</small></button>`).join('');
}
const FRAC={'½':.5,'¼':.25,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125};
function parseIngLine(line){
  let t=String(line).replace(/^[\s\-–•*·\u2022]+/,'').trim();if(!t)return null;
  t=t.replace(/(\d)\s*([½¼¾⅓⅔⅛])/g,(m,a,f)=>String(+a+FRAC[f])).replace(/([½¼¾⅓⅔⅛])/g,(m,f)=>String(FRAC[f]));
  t=t.replace(/(\d+)\s+(\d+)\/(\d+)/g,(m,a,b,c)=>String(+a+b/c)).replace(/(\d+)\/(\d+)/g,(m,b,c)=>String(+b/+c));
  t=t.replace(/^(\d+(?:[.,]\d+)?)\s*[-–]\s*\d+(?:[.,]\d+)?/,'$1');          // „2-3“ zählt als 2
  t=t.replace(/\([^)]*\)/g,' ').split(/[,;]/)[0].replace(/\s+/g,' ').trim();    // Klammern und Zusätze nach dem Komma weglassen
  if(!t)return null;
  const ps=parseShopText(t);if(!ps.name)return null;
  const e=ingFind(ps.name);let u=ps.u;if(!u&&ps.q!=null&&e)u=e.u;
  return{id:uid(),name:e?e.n:cap(ps.name),q:ps.q==null?null:Math.round(ps.q*100)/100,u:u||'',p:e?e.v===1:false};
}
function addIngLines(text){
  const l=String(text).split(/\n+/).map(parseIngLine).filter(Boolean);
  l.forEach(i=>sheetIngs.push(i));if(l.length){renderIngs();updateIngSug()}return l.length;
}
function addIngFromInputs(){
  const raw=$('r-iname').value.trim();if(!raw)return false;
  const ps=parseShopText(raw);let q=null,u=$('r-iu').value;
  const qv=$('r-iq').value.trim().replace(',','.');
  if(qv!==''&&!isNaN(parseFloat(qv)))q=parseFloat(qv);
  else if(ps.q!=null){q=ps.q;if(ps.u)u=ps.u}
  const e=ingFind(ps.name);
  if(!u&&q!=null&&e)u=e.u;
  sheetIngs.push({id:uid(),name:e?e.n:cap(ps.name),q,u:u||'',p:e?e.v===1:false});
  $('r-iname').value='';$('r-iq').value='';$('r-iu').value='';
  renderIngs();updateIngSug();return true;
}

/* ---------- Fenster von unten (Gericht, Rezept, Vorlagen) ---------- */
let sheet={mode:null,id:null},sheetCover='',sheetImg='';
function renderRImg(){
  $('r-prev').innerHTML=sheetImg?`<img src="${sheetImg}" alt="Foto">`:`<span>${ic('plate',30,1.6)}<small>Noch kein Foto</small></span>`;
  $('r-rm').hidden=!sheetImg;$('r-pick').textContent=sheetImg?'Anderes Foto wählen':'Foto wählen';
}
$('r-file').addEventListener('change',async e=>{
  const f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;
  try{sheetImg=await coverFromFile(f,720);renderRImg()}catch(err){toast('Das Bild konnte nicht geladen werden.',true)}
});
function renderCover(){
  $('b-prev').innerHTML=sheetCover?`<img src="${sheetCover}" alt="Cover">`:`<span>${ic('book',34,1.6)}<small>Noch kein Cover</small></span>`;
  $('b-rm').hidden=!sheetCover;$('b-pick').textContent=sheetCover?'Anderes Bild wählen':'Cover-Bild wählen';
}
function coverFromFile(f,S=480){
  return new Promise((res,rej)=>{
    const fr=new FileReader();
    fr.onerror=rej;
    fr.onload=()=>{const im=new Image();im.onerror=rej;im.onload=()=>{
      const sc=Math.min(1,S/Math.max(im.width,im.height)),c=document.createElement('canvas');
      c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);
      c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',0.8))};im.src=fr.result};
    fr.readAsDataURL(f);
  });
}
$('b-file').addEventListener('change',async e=>{
  const f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;
  try{sheetCover=await coverFromFile(f);renderCover()}catch(err){toast('Das Bild konnte nicht geladen werden.',true)}
});
$('sugform').addEventListener('submit',e=>{e.preventDefault();const n=sugN,c=new Set(sugCu);closeSheet();suggestWeek(n,c)});
$('bform').addEventListener('submit',e=>{
  e.preventDefault();
  const name=$('b-name').value.trim();if(!name)return;
  if(sheet.id){const x=books.find(q=>q.id==sheet.id);if(x){x.name=name;x.cover=sheetCover}}
  else{const n={id:uid(),name,cover:sheetCover};books.push(n);recCol=String(n.id)}
  saveB();const isNew=!sheet.id;closeSheet();if(isNew){view='rcol'}render();
});
function openSheet(mode,id,pre){
  sheet={mode,id:id||null};
  $('tplform').hidden=mode!=='tpl';$('mform').hidden=mode!=='meal';$('rform').hidden=mode!=='recipe';$('bform').hidden=mode!=='book';$('sugform').hidden=mode!=='sug';
  if(mode==='sug'){
    $('sh-title').textContent='Abendessen vorschlagen';renderSug();
  }else if(mode==='tpl'){
    $('sh-title').textContent='Rezeptvorlagen';tplSel=new Set();renderTpl();
  }else if(mode==='meal'){
    const x=id?meals.find(q=>q.id==id):null;
    $('sh-title').textContent=x?'Gericht bearbeiten':'Gericht planen';
    $('m-date').value=x?x.date:((pre&&pre.date)||today());
    $('m-slot').value=x?x.slot:((pre&&pre.slot)||'A');
    mealSel=x?{rid:x.rid&&recOf(x.rid)?x.rid:null,title:x.title,portions:x.portions||persDef()}:{rid:null,title:'',portions:persDef()};
    $('m-q').value=x&&!mealSel.rid?x.title:'';
    $('m-del').hidden=!x;renderMealPick();
  }else if(mode==='book'){
    const x=id?books.find(q=>q.id==id):null;
    $('sh-title').textContent=x?'Kochbuch bearbeiten':'Kochbuch hinzufügen';
    $('b-name').value=x?x.name:'';sheetCover=x?x.cover||'':'';$('b-del').hidden=!x;renderCover();
  }else if(mode==='recipe'){
    const x=id?recipes.find(q=>q.id==id):null;
    $('sh-title').textContent=x?'Rezept bearbeiten':'Neues Rezept';
    $('r-name').value=x?x.name:'';$('r-port').value=x?x.portions:persDef();$('r-note').value=x?x.note||'':'';sheetImg=x?x.img||'':'';renderRImg();
    $('r-cuisine').innerHTML='<option value="">Keine Angabe</option>'+CUISINES.map(c=>`<option>${c}</option>`).join('');$('r-cuisine').value=x?x.cuisine||'':'';
    $('r-course').innerHTML='<option value="">Keine Angabe</option>'+COURSES.map(c=>`<option>${c}</option>`).join('');$('r-course').value=x?x.course||'':'';
    $('r-book').innerHTML='<option value="">Kein Kochbuch</option>'+books.map(b=>`<option value="${b.id}">${esc(b.name)}</option>`).join('');
    $('r-book').value=x?(x.bid||''):((pre&&pre.bid)||'');$('r-page').value=x?x.page||'':'';
    $('r-paste').value='';$('r-page').placeholder='Seite';
    if(!x&&pre&&pre.bid){const last=recipes.filter(r=>r.bid===pre.bid).pop();if(last){$('r-cuisine').value=last.cuisine||'';$('r-course').value=last.course||'';if(last.page)$('r-page').placeholder='zuletzt S. '+last.page}}
    $('r-iu').innerHTML='<option value="">Einheit</option>'+UNITS.map(u=>`<option>${u}</option>`).join('');
    $('r-iname').value='';$('r-iq').value='';
    sheetIngs=x?x.ings.map(i=>({...i})):[];renderIngs();updateIngSug();
    $('r-del').hidden=!x;
  }
  $('sheet').hidden=false;document.body.classList.add('lock');
  if(!id)setTimeout(()=>{try{if(!$('sheet').hidden&&!$('sheet').contains(document.activeElement))$(mode==='recipe'?'r-name':mode==='meal'?'m-q':'tpl-ok').focus()}catch(e){}},60);
}
function closeSheet(){$('sheet').hidden=true;document.body.classList.remove('lock');sheet={mode:null,id:null}}
$('sh-x').innerHTML=ic('x',18,2);
$('tplform').addEventListener('submit',e=>{
  e.preventDefault();
  const have=new Set(recipes.map(r=>r.name)),add=ALL_TPL().filter(t=>tplSel.has(t[0])&&!have.has(t[0]));
  if(!add.length)return;
  snap.last=snap();recipes=recipes.concat(add.map(mkRecipe));saveX();closeSheet();recCol='own';view='rcol';render();
  toast(add.length+' '+(add.length===1?'Rezept':'Rezepte')+' hinzugefügt');
});
$('mform').addEventListener('submit',e=>{
  e.preventDefault();
  const date=$('m-date').value;if(!date)return;
  const typed=$('m-q').value.trim();
  const sel=mealSel.rid?mealSel:{rid:null,title:typed||mealSel.title,portions:null};
  if(!sel.rid&&!sel.title)return;
  const f={date,slot:$('m-slot').value,rid:sel.rid||null,title:sel.title,portions:sel.rid?sel.portions:null};
  let note='';
  if(sheet.id){
    const x=meals.find(q=>q.id==sheet.id);
    if(x){const ch=x.rid!==f.rid||x.portions!==f.portions;Object.assign(x,f);if(x.listed&&ch){x.listed=false;note='Hinweis: Die Zutaten standen schon auf der Einkaufsliste. Pass sie dort bei Bedarf an.'}}
  }else meals.push(Object.assign({id:uid(),listed:false},f));
  saveM();closeSheet();focusMeal(date);render();
  if(note)toast(note,true);
});
$('rform').addEventListener('submit',e=>{
  e.preventDefault();
  const name=$('r-name').value.trim();if(!name)return;
  addIngFromInputs();
  const r={name,portions:Math.max(1,Math.min(50,parseInt($('r-port').value,10)||2)),note:$('r-note').value.trim(),cuisine:$('r-cuisine').value,course:$('r-course').value,img:sheetImg,bid:$('r-book').value?+$('r-book').value:null,page:$('r-page').value.trim(),ings:sheetIngs.map(i=>({...i}))};
  if(sheet.id){const x=recipes.find(q=>q.id==sheet.id);if(x)Object.assign(x,r);recPort=0}
  else{const n=Object.assign({id:uid()},r);recipes.push(n);recId=n.id;recPort=0;view='recipe';window.scrollTo(0,0)}
  saveX();closeSheet();render();
});

/* ---------- Eingaben und Klicks ---------- */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!$('sheet').hidden)closeSheet();
  if(e.key==='Enter'&&e.target&&e.target.id==='r-iname'){e.preventDefault();addIngFromInputs()}
});
document.addEventListener('click',e=>{
  if(e.target.classList&&e.target.classList.contains('bd')){closeSheet();return}
  const b=e.target.closest('button');if(!b)return;
  const D=b.dataset;
  if(b.id==='fab'){const f=fabInfo();if(f)openSheet(f[0],null,f[0]==='recipe'&&/^\d+$/.test(String(recCol))?{bid:+recCol}:null);return}
  // Fenster
  if(D.ip!==undefined){const i=sheetIngs[+D.ip];if(i){i.p=!i.p;renderIngs()}return}
  if(D.ix!==undefined){sheetIngs.splice(+D.ix,1);renderIngs();return}
  if(D.rsug){$('r-iname').value=D.rsug;const g=ingFind(D.rsug);if(g)$('r-iu').value=g.u;$('r-sug').innerHTML='';$('r-iq').focus();return}
  if(D.radd){addIngFromInputs();return}
  if(D.tpl!==undefined){if(tplSel.has(D.tpl))tplSel.delete(D.tpl);else tplSel.add(D.tpl);renderTpl();return}
  if(D.tplall){const have=new Set(recipes.map(r=>r.name)),l=ALL_TPL().filter(t=>!have.has(t[0]));tplSel=tplSel.size>=l.length?new Set():new Set(l.map(t=>t[0]));renderTpl();return}
  if(D.sugn){sugN+=+D.sugn;renderSug();return}
  if(D.sugcu){sugCu.has(D.sugcu)?sugCu.delete(D.sugcu):sugCu.add(D.sugcu);renderSug();return}
  if(D.mf){const[k,v]=D.mf.split('|');mealF[k]=v;renderMealPick();return}
  if(D.mrec){const r=recOf(+D.mrec);if(r){mealSel={rid:r.id,title:r.name,portions:persDef()};$('m-q').value=r.name;renderMealPick()}return}
  if(D.mfree){mealSel={rid:null,title:$('m-q').value.trim(),portions:null};renderMealPick();return}
  if(D.mport){mealSel.portions=Math.max(1,Math.min(50,mealSel.portions+(+D.mport)));renderMealPick();return}
  if(D.mdel){const id=+sheet.id;closeSheet();destructive('Gericht gelöscht',()=>{meals=meals.filter(q=>q.id!==id);saveM()});return}
  if(D.rpaste){const n=addIngLines($('r-paste').value);if(n){$('r-paste').value='';toast(n+' '+(n===1?'Zutat':'Zutaten')+' übernommen. Prüfe Menge und „Kaufen/Vorrat“ unten.',true)}else toast('Keine Zutaten erkannt. Eine Zutat pro Zeile, z. B. „200 g Reis“.',true);return}
  if(D.rpick){$('r-file').click();return}
  if(D.rrm){sheetImg='';renderRImg();return}
  if(D.bpick){$('b-file').click();return}
  if(D.brm){sheetCover='';renderCover();return}
  if(D.bdel){const id=+sheet.id;closeSheet();destructive('Kochbuch gelöscht (die Rezepte bleiben bei „Eigene Rezepte“)',()=>{books=books.filter(q=>q.id!==id);recipes.forEach(r=>{if(r.bid===id)r.bid=null});saveB();saveX();view='recipes'});return}
  if(D.newr){openSheet('recipe',null,/^\d+$/.test(String(recCol))?{bid:+recCol}:null);return}
  if(D.rdel){const id=+sheet.id;closeSheet();destructive('Rezept gelöscht',()=>{recipes=recipes.filter(q=>q.id!==id);saveX();if(view==='recipe')view='rcol'});return}
  if(D.close){closeSheet();return}
  // Navigation
  if(D.nav){go(D.nav);return}
  if(D.go){go(D.go);return}
  if(D.back){if(view==='cook')go(cookFrom==='recipe'?'recipe':'meals');else if(view==='recipe')go('rcol');else go('recipes');return}
  if(D.rcol){recCol=D.rcol;go('rcol');return}
  if(D.bnew){openSheet('book');return}
  if(D.bedit){openSheet('book',D.bedit);return}
  if(D.cook){const[i,p]=D.cook.split('|');cookId=+i;cookPort=+p||2;cookFrom=view==='meals'?'meals':'recipe';cookDone=new Set();go('cook');return}
  // Startseite
  if(D.nact){const i=D.nact.lastIndexOf('|'),id=D.nact.slice(0,i),a=(nudgeActs[id]||[])[+D.nact.slice(i+1)];if(a){if(a.done)nHide(id);a.run()}render();return}
  if(D.nx){nHide(D.nx)}
  else if(D.nlater){nLater(D.nlater,+D.nms||0)}
  // Essen
  else if(D.mwk){mealStart=D.mwk==='reset'?null:addDays(mealFrom(),7*(+D.mwk))}
  else if(D.madd){const[d,sl]=D.madd.split('|');openSheet('meal',null,{date:d,slot:sl});return}
  else if(D.medit){openSheet('meal',D.medit);return}
  else if(D.mtoshop){mealsToShop();return}
  else if(D.mcopy){const mon=mealFrom(),pv=meals.filter(m=>m.date>=addDays(mon,-7)&&m.date<mon);snap.last=snap();pv.forEach(m=>meals.push(Object.assign({},m,{id:uid(),date:addDays(m.date,7),listed:false})));saveM();render();toast('Vorwoche übernommen: '+pv.length+' '+(pv.length===1?'Gericht':'Gerichte'));return}
  else if(D.mgo){focusMeal(D.mgo);go('meals');return}
  else if(D.msuggest){openSuggest();return}
  else if(D.tplopen){openSheet('tpl');return}
  else if(D.ropen){recId=+D.ropen;{const rr=recOf(recId);if(rr)recCol=rr.bid?String(rr.bid):'own'}recPort=0;view='recipe';window.scrollTo(0,0)}
  else if(D.rport){recPort=Math.max(1,Math.min(50,recPort+(+D.rport)))}
  else if(D.rtoshop){const r=recOf(recId);if(r)recipeToShop(r,recPort||r.portions);return}
  else if(D.redit){openSheet('recipe',D.redit);return}
  else if(D.rsample){snap.last=snap();recipes=recipes.concat(makeSamples());saveX();render();toast('Beispielrezepte geladen');return}
  // Einkauf
  else if(D.shmode){shopMode=D.shmode}
  else if(D.shgo){shopMode=D.shgo;go('shop');return}
  else if(D.shave){destructive('Als vorhanden abgehakt',()=>{shop=shop.filter(t=>t.id!=D.shave);saveS()});return}
  else if(D.smiss){const x=shop.find(t=>t.id==D.smiss);if(x){x.p=false;saveS()}}
  else if(D.shaveall){destructive('Alle als vorhanden abgehakt',()=>{shop=shop.filter(t=>t.p!==true||t.done);saveS()});return}
  else if(D.ssug){const inp=$('sname'),txt=inp.value.trim(),pr=parseShopText(txt);inp.value=txt.slice(0,txt.length-pr.name.length)+D.ssug;updateShopSug();inp.focus();return}
  else if(D.sdone){const x=shop.find(t=>t.id==D.sdone);x.done=!x.done;saveS()}
  else if(D.sdel){destructive('Artikel entfernt',()=>{shop=shop.filter(t=>t.id!=D.sdel);saveS()});return}
  else if(D.sclear){destructive('Abgehakte entfernt',()=>{shop=shop.filter(t=>!t.done);saveS()});return}
  // Sicherung
  else if(D.bdl){downloadBackup();return}
  else if(D.bcopy){copyBackup();return}
  else if(D.bfile){$('bfile').click();return}
  else if(D.bapply){applyImport();return}
  else if(D.bcancel){pendingImport=null}
  else if(D.pers){setSetting('persons',settings.persons+(+D.pers));return}
  else if(D.cdone){cookDone.has(D.cdone)?cookDone.delete(D.cdone):cookDone.add(D.cdone)}
  else return;
  render();
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='sform')return;
  e.preventDefault();const v=$('sname').value.trim();if(!v)return;
  const ps=parseShopText(v);addToShop(ps.name,ps.q,ps.u,false,'');saveS();render();$('sname').focus();
});
document.addEventListener('change',e=>{
  const t=e.target;if(!t.dataset)return;
  if(t.dataset.iu!==undefined){const i=sheetIngs[+t.dataset.iu];if(i)i.u=t.value}
  else if(t.dataset.set)setSetting(t.dataset.set,t.value);
});
document.addEventListener('input',e=>{
  const t=e.target;
  if(t.id==='sname')updateShopSug();
  else if(t.id==='r-iname')updateIngSug();
  else if(t.id==='rsearch'){recQ=t.value;updateRecSearch()}
  else if(t.id==='m-q')renderMealPick();
  else if(t.dataset&&t.dataset.iq!==undefined){const i=sheetIngs[+t.dataset.iq];if(i){const v=t.value.replace(',','.');i.q=v===''||isNaN(parseFloat(v))?null:parseFloat(v)}}
});

/* ---------- Start ---------- */
document.addEventListener('visibilitychange',()=>{if(!document.hidden)wakeLock(needLock())});
render();
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
