(function(){
  const KEY='grow-with-me:v1';
  const VERSION=1;
  const today=()=>new Date().toISOString().slice(0,10);
  const task=(n,t,e,c)=>({id:crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`,n,t,e,c,d:0});
  const defaults=()=>({
    version:VERSION,onboarded:false,kind:'sprig',name:'Sage',stage:2,p:50,sad:false,streak:6,drops:42,
    tasks:[task('Drink 2L of water','All day','drop','#DDEFFB'),task('Morning stretch','7:30 am','move','#FCDFE8'),task('Read 10 pages','9:00 pm','book','#FFF2CC'),task('Lights out by 11','11:00 pm','moon','#E9E4FA')],
    history:{},lastSeen:today(),createdAt:today(),settings:{reminders:true,sound:true,haptics:false}
  });
  function safe(raw){
    const base=defaults();
    if(!raw||typeof raw!=='object')return base;
    const s={...base,...raw,settings:{...base.settings,...raw.settings},history:raw.history&&typeof raw.history==='object'?raw.history:{}};
    s.stage=Math.max(1,Math.min(4,Number(s.stage)||1));s.p=Math.max(0,Math.min(100,Number(s.p)||0));
    s.streak=Math.max(0,Number(s.streak)||0);s.drops=Math.max(0,Number(s.drops)||0);
    s.tasks=Array.isArray(raw.tasks)&&raw.tasks.length?raw.tasks.map((x,i)=>({...task('Habit','All day','spark','#D8F0DF'),...x,id:x.id||`legacy-${i}`})):base.tasks;
    return s;
  }
  function roll(s){
    const now=today();if(!s.lastSeen||s.lastSeen===now){s.lastSeen=now;return s}
    const start=new Date(`${s.lastSeen}T12:00:00`),end=new Date(`${now}T12:00:00`);
    if(start>end){s.lastSeen=now;return s}
    const completed=s.tasks.filter(x=>x.d).length,total=s.tasks.length;
    s.history[s.lastSeen]={completed,total,missed:completed<total};
    let cursor=new Date(start);cursor.setDate(cursor.getDate()+1);let misses=completed<total?1:0;
    while(cursor<end){const k=cursor.toISOString().slice(0,10);s.history[k]={completed:0,total,missed:true};misses++;cursor.setDate(cursor.getDate()+1)}
    if(misses){s.sad=true;s.p=Math.max(0,s.p-20*misses);s.streak=0}
    s.tasks.forEach(x=>x.d=0);s.lastSeen=now;return s;
  }
  function load(){try{return roll(safe(JSON.parse(localStorage.getItem(KEY))))}catch{return defaults()}}
  function save(s){s.version=VERSION;s.lastSeen=today();localStorage.setItem(KEY,JSON.stringify(s));return s}
  function reset(){localStorage.removeItem(KEY);return defaults()}
  window.GWMStore={load,save,reset,today};
})();
