'use strict';
/* Gemeinsame Sicht: gleicht die Daten mit einer Supabase-Tabelle ab, damit mehrere Handys dasselbe sehen.
   Ohne Anmeldung bleibt alles wie bisher nur auf diesem Handy. Läuft ohne Bibliothek, nur mit fetch.
   Die Werte unten sind öffentlich gedacht; geschützt sind die Daten durch Anmeldung und Zeilenregeln in der Datenbank. */
const Sync=(()=>{
  const URL_='https://grfyvfbwvdwhqbpykxep.supabase.co',KEY='sb_publishable_ruigxP7KaBl3W43H2er2aA_N89ml_x_';
  const SK='alltag.sync.v1',COLS=['shop','recipes','meals','books','settings'];
  const st=(()=>{try{return Object.assign({s:null,last:'1970-01-01T00:00:00Z',sh:{},at:0,err:'',mail:''},JSON.parse(localStorage.getItem(SK))||{})}catch(e){return{s:null,last:'1970-01-01T00:00:00Z',sh:{},at:0,err:'',mail:''}}})();
  COLS.forEach(c=>{if(!st.sh[c])st.sh[c]={}});
  const save=()=>{try{localStorage.setItem(SK,JSON.stringify(st))}catch(e){}};
  let busy=false,timer=null,again=false,viewStale=false;
  const hash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return String(h)+':'+s.length};
  const arr=c=>({shop:shop,recipes:recipes,meals:meals,books:books})[c];
  const keyOf=c=>({shop:K.s,recipes:K.x,meals:K.m,books:K.bk})[c];
  const items=c=>c==='settings'?[Object.assign({id:'main'},settings)]:arr(c);
  const persist=c=>{c==='settings'?put(K.c,settings):put(keyOf(c),arr(c))};
  const loggedIn=()=>!!st.s;

  async function raw(path,opt={},token){
    const h=Object.assign({apikey:KEY},opt.headers||{});
    if(token)h.Authorization='Bearer '+token;
    const r=await fetch(URL_+path,Object.assign({},opt,{headers:h}));
    return r;
  }
  function setSession(j,mail){
    st.s={access:j.access_token,refresh:j.refresh_token,exp:Date.now()+(j.expires_in||3600)*1000};
    if(mail){st.mail=mail}
    save();
  }
  async function refresh(){
    if(!st.s)return false;
    try{
      const r=await raw('/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({refresh_token:st.s.refresh})});
      if(!r.ok){if(r.status===400||r.status===401||r.status===403){st.s=null;st.err='Bitte neu anmelden.';save()}return false}
      setSession(await r.json());return true;
    }catch(e){return false}
  }
  async function token(){
    if(!st.s)return null;
    if(st.s.exp-Date.now()<60000){if(!(await refresh()))return st.s?st.s.access:null}
    return st.s?st.s.access:null;
  }
  async function api(path,opt){
    let t=await token();if(!t)throw new Error('auth');
    let r=await raw(path,opt,t);
    if(r.status===401&&await refresh()){t=st.s.access;r=await raw(path,opt,t)}
    if(r.status===401)throw new Error('auth');
    if(!r.ok)throw new Error('http '+r.status);
    return r;
  }
  async function login(mail,pw){
    try{
      const r=await raw('/auth/v1/token?grant_type=password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:mail,password:pw})});
      if(!r.ok){return r.status===400||r.status===401?'E-Mail oder Passwort stimmt nicht.':'Anmeldung nicht möglich ('+r.status+').'}
      setSession(await r.json(),mail);st.err='';save();sync();return '';
    }catch(e){return 'Keine Verbindung. Bist du online?'}
  }
  function logout(){st.s=null;st.err='';st.last='1970-01-01T00:00:00Z';st.sh={};COLS.forEach(c=>st.sh[c]={});st.at=0;save()}

  function diff(){
    const up=[];
    COLS.forEach(c=>{
      const cur=new Map();
      items(c).forEach(it=>cur.set(String(it.id),it));
      cur.forEach((it,id)=>{
        const hs=hash(JSON.stringify(it));
        if(st.sh[c][id]!==hs)up.push({collection:c,id,data:it,deleted:false,_h:hs});
      });
      Object.keys(st.sh[c]).forEach(id=>{if(!cur.has(id))up.push({collection:c,id,data:null,deleted:true,_h:null})});
    });
    return up;
  }
  async function push(){
    const up=diff();
    for(let i=0;i<up.length;i+=12){
      const part=up.slice(i,i+12);
      await api('/rest/v1/items?on_conflict=collection,id',{method:'POST',headers:{'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(part.map(({collection,id,data,deleted})=>({collection,id,data,deleted})))});
      part.forEach(p=>{if(p.deleted)delete st.sh[p.collection][p.id];else st.sh[p.collection][p.id]=p._h});
      save();
    }
    return up.length;
  }
  function apply(rows){
    let changed=false;const touched=new Set();
    rows.forEach(row=>{
      const c=row.collection;if(!COLS.includes(c))return;
      const id=String(row.id);
      if(c==='settings'){
        const lh=hash(JSON.stringify(Object.assign({id:'main'},settings)));
        if(st.sh.settings.main!==undefined&&lh!==st.sh.settings.main)return;      // lokal geändert, wird gleich hochgeladen
        if(row.deleted||!row.data)return;
        const d=Object.assign({},row.data);delete d.id;
        settings=cleanSettings(d);st.sh.settings.main=hash(JSON.stringify(Object.assign({id:'main'},settings)));
        touched.add(c);changed=true;return;
      }
      const a=arr(c),idx=a.findIndex(x=>String(x.id)===id);
      if(idx>=0){
        const lh=hash(JSON.stringify(a[idx]));
        if(st.sh[c][id]!==undefined&&lh!==st.sh[c][id])return;                  // lokal geändert
      }
      if(row.deleted||!row.data){
        if(idx>=0){a.splice(idx,1);changed=true;touched.add(c)}
        delete st.sh[c][id];return;
      }
      const it=row.data;
      if(idx>=0){a[idx]=it}else a.push(it);
      st.sh[c][id]=hash(JSON.stringify(it));
      changed=true;touched.add(c);
    });
    touched.forEach(persist);
    return changed;
  }
  async function pull(){
    const since=new Date(Date.parse(st.last)-5000).toISOString();
    let off=0,maxT=st.last,changed=false;
    for(;;){
      const r=await api('/rest/v1/items?select=collection,id,data,deleted,updated_at&updated_at=gt.'+encodeURIComponent(since)+'&order=updated_at.asc,collection.asc,id.asc&limit=40&offset='+off);
      const rows=await r.json();
      if(apply(rows))changed=true;
      rows.forEach(x=>{if(x.updated_at>maxT)maxT=x.updated_at});
      if(rows.length<40)break;off+=40;
    }
    st.last=maxT;save();return changed;
  }
  function viewSafe(){
    const sh=document.getElementById('sheet'),a=document.activeElement;
    if(sh&&!sh.hidden)return false;
    if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&a.id!=='')return false;
    return true;
  }
  async function sync(){
    if(!loggedIn())return;
    if(busy){again=true;return}
    busy=true;
    try{
      await push();
      const ch=await pull();
      await push();
      st.err='';st.at=Date.now();save();
      if(ch){if(viewSafe())render();else viewStale=true}
      else if(typeof view!=='undefined'&&view==='more'&&viewSafe())render();
    }catch(e){
      st.err=e.message==='auth'?'Bitte neu anmelden.':(navigator.onLine===false?'Offline. Es wird später abgeglichen.':'Abgleich nicht möglich. Es wird später erneut versucht.');
      save();
    }
    busy=false;
    if(again){again=false;touch()}
  }
  function touch(){if(!loggedIn())return;clearTimeout(timer);timer=setTimeout(sync,1500)}
  function start(){
    setInterval(()=>{
      if(document.hidden)return;
      if(viewStale&&viewSafe()){viewStale=false;render()}
      sync();
    },30000);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync()});
    window.addEventListener('online',sync);
    sync();
  }
  const status=()=>busy?'Abgleich läuft …':st.err?st.err:st.at?'Zuletzt abgeglichen: '+new Date(st.at).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+' Uhr':'Noch nicht abgeglichen';
  return{start,touch,sync,login,logout,loggedIn,status,mail:()=>st.mail,err:()=>st.err};
})();
