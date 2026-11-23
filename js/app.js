const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ASSETS=window.GWM_ASSETS||{};
const ICO={drop:'<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',move:'<circle cx="12" cy="5" r="2"/><path d="M12 8v6l-3 6M12 14l3 6M7 11l5-3 5 3"/>',book:'<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/>',moon:'<path d="M20 14a8 8 0 1 1-10-10 6 6 0 0 0 10 10z"/>',spark:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'};
let S=window.GWMStore.load();
const persist=()=>window.GWMStore.save(S);
const STG=['Seed','Sprout','Young plant','In bloom'];
const leaf=(x,y,a,s,c)=>`<g transform="translate(${x},${y}) rotate(${a}) scale(${s})"><g class="lf"><path d="M0,0C-16,-8-21,-34 0,-60 21,-34 16,-8 0,0Z" fill="${c[0]}"/><path d="M0,0C16,-8 21,-34 0,-60Z" fill="${c[1]}" opacity=".6"/><path d="M0,-6V-46" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/></g></g>`;
function plant(kind,st,sad,w=230,mood='happy'){
 const key=kind+'_'+st+'_'+(sad?'sad':'happy');if(ASSETS[key])return`<img class="plant ${sad?'sad':''}" src="${ASSETS[key]}" width="${w}" alt="">`;
 const c=sad?['#B9CDB0','#A3BA9B']:kind==='cactus'?['#A8DEC4','#8CCDAE']:['#A5E0B1','#84CC98'];
 let g='';const top=[0,0,116,84,50][st],dx=sad?34:0,dy=sad?16:0,X=100+dx,Y=top+dy,stem=sad?'#A3BA9B':'#8CD0A0';
 if(st===1)g=`<ellipse cx="100" cy="138" rx="13" ry="17" fill="#E6C3A0" transform="rotate(${sad?14:0} 100 138)"/><path d="M100,121C113,125 113,150 100,155Z" fill="#CFA67F" opacity=".5"/>`;
 else if(kind==='cactus'){g=`<g transform="rotate(${sad?-5:0} 100 148)"><path d="M80 120h-20v-28M120 106h20v-28" stroke="${c[0]}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="${sad?'translate(0 14)':''}"/><rect x="74" y="${st>2?54:86}" width="52" height="${st>2?96:64}" rx="26" fill="${c[0]}"/><path d="M100 ${st>2?54:86}q26 0 26 26v38q0 26-26 26z" fill="${c[1]}" opacity=".55"/>${st>3&&!sad?'<circle cx="100" cy="52" r="9" fill="#F9C4D5"/><circle cx="100" cy="52" r="3.500" fill="#FFE29A"/>':''}</g>`}
 else{g=`<path d="M100,148Q100,${Y+10} ${X},${Y}" stroke="${stem}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  const L=st===2?[[1,-1,.55,-50,-112],[1,1,.55,50,112]]:[[.3,-1,.75,-58,-124],[.45,1,.8,58,124],[.68,-1,.85,-48,-120],[.82,1,.85,48,120],[1,0,.8,0,50]];
  if(st===4)L.pop();L.forEach(([t,s,z,a,b])=>{g+=leaf((100+dx*t*t).toFixed(1),(148-(148-Y)*t).toFixed(1),sad?b:a,z*(sad?.95:1),c)});
  if(st===4)g+=sad?`<ellipse cx="${X+4}" cy="${Y+10}" rx="8" ry="13" fill="#DCC3CF" transform="rotate(35 ${X} ${Y})"/>`:`<g transform="translate(${X},${Y-2})">${[0,1,2,3,4,5].map(i=>`<ellipse cy="-14" rx="9" ry="13" fill="${kind==='bloom'?'#F9C4D5':'#FFE29A'}" transform="rotate(${i*60})"/>`).join('')}<circle r="8" fill="${kind==='bloom'?'#FFE29A':'#F6B98A'}"/></g>`}
 const f=sad?`<path d="M82 173l10-4M118 173l-10-4" stroke="#6B514A" stroke-width="2.4" stroke-linecap="round"/><circle cx="88" cy="180" r="3.500" fill="#6B514A"/><circle cx="112" cy="180" r="3.500" fill="#6B514A"/><path d="M94 193q6-6 12 0" stroke="#6B514A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`:`<circle cx="88" cy="179" r="3.500" fill="#6B514A"/><circle cx="112" cy="179" r="3.500" fill="#6B514A"/><ellipse cx="79" cy="188" rx="5" ry="3.500" fill="#F4A9A0" opacity=".5"/><ellipse cx="121" cy="188" rx="5" ry="3.500" fill="#F4A9A0" opacity=".5"/><path d="M94 187q6 7 12 0" stroke="#6B514A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
 return `<svg class="plant ${sad?'sad':''}" viewBox="0 0 200 224" width="${w}"><ellipse cx="100" cy="218" rx="54" ry="6" fill="#27403A" opacity=".1"/><path d="M54 150h92l-9 58q-1 9-10 9H73q-9 0-10-9z" fill="${sad?'#E8D5CB':'#FAD3BD'}"/><path d="M112 150h34l-9 58q-1 9-10 9h-15z" fill="#fff" opacity=".28"/><rect x="46" y="140" width="108" height="20" rx="10" fill="${sad?'#EFDFD6':'#FDE3D2'}"/><ellipse cx="100" cy="146" rx="44" ry="5.500" fill="#8A6A5A" opacity=".8"/><g class="sw">${g}</g><g class="face">${face(sad?'sad':mood)}</g></svg>`}
const IC={home:'<path d="M4 11l8-7 8 7v9H4z"/>',progress:'<path d="M5 20V11M12 20V5M19 20v-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',garden:'<path d="M12 21V11M12 11C12 6 8 4 4 4c0 5 3 7 8 7zM12 14c0-4 3-6 8-6 0 5-3 7-8 6z"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>'};
const TABS=[['home','Home'],['progress','Progress'],['add',''],['garden','Garden'],['profile','You']];
$('#tabs').innerHTML=TABS.map(([k,l])=>`<button data-tab="${k}" class="${k==='add'?'fab':''}"><svg viewBox="0 0 24 24">${IC[k==='add'?'plus':k]}</svg>${l}</button>`).join('');
const NAMES={welcome:'1 · Welcome',pick:'2 · Choose seed',home:'3 · Home',add:'4 · Add habit',okc:'5 · Task done',grow:'6 · Growth moment',sad:'7 · Sad and recovery',progress:'8 · Progress',garden:'9 · Garden',profile:'10 · Profile'};
$('.jump').insertAdjacentHTML('beforeend',Object.entries(NAMES).map(([k,v])=>`<button data-jump="${k}">${v}</button>`).join(''));
const MAIN=['welcome','pick','home','progress','garden','profile','sad'];
function go(id){if(id==='add')return openHabit();if(id==='okc')return sheet('okc',1);if(id==='grow')return growOv();
 closeAll();MAIN.forEach(m=>$('#'+m).classList.toggle('on',m===id));
 $('#tabs').style.display=['home','progress','garden','profile'].includes(id)?'flex':'none';
 $$('#tabs [data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab===id));
 if(id==='home'){S.onboarded=true;persist();renderHome()}if(id==='progress')renderProg();if(id==='garden')renderGar();if(id==='profile')renderSettings();
 if(id==='sad'){$('#sn').textContent=S.name;$('[data-plant=sad]').innerHTML=plant(S.kind,S.stage,1,250)}
 if(id==='welcome')$('[data-plant=welcome]').innerHTML=plant('sprig',3,0,250)}
function sheet(id,on){$('#'+id).classList.toggle('on',!!on);$('#scrim').classList.toggle('on',!!on)}
function closeAll(){['add','okc'].forEach(i=>$('#'+i).classList.remove('on'));$('#scrim').classList.remove('on');$('#grow').classList.remove('on')}
document.addEventListener('click',e=>{const t=e.target.closest('[data-go],[data-tab],[data-jump]');if(t)go(t.dataset.go||t.dataset.tab||t.dataset.jump)});
$('#scrim').onclick=closeAll;
const KS=[['sprig','Sprig'],['bloom','Blossom'],['cactus','Prickle']];
$('#picks').innerHTML=KS.map(([k,n],i)=>`<button class="card pk ${i?'':'on'}" data-k="${k}">${plant(k,4,0,92)}<h3>${n}</h3></button>`).join('');
$$('.pk').forEach(b=>b.onclick=()=>{$$('.pk').forEach(x=>x.classList.remove('on'));b.classList.add('on');S.kind=b.dataset.k});
$('#plantit').onclick=()=>{S.name=$('#nm').value.trim()||'Sage';S.stage=1;S.p=0;S.sad=false;S.onboarded=true;S.tasks.forEach(t=>t.d=0);persist();go('home')};
function renderHome(){const h=new Date().getHours();$('#greet').textContent=h<12?'Good morning':h<18?'Good afternoon':'Good evening';
 $('#date').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});
 $('#pname').textContent=S.name;$('#homeplant').innerHTML=plant(S.kind,S.stage,S.sad,200);
 $('#hero').classList.toggle('gray',S.sad);$('#mood').textContent=S.sad?'Feeling droopy':'Happy';
 $('#stagelbl').textContent=`${STG[S.stage-1]} · stage ${S.stage} of 4`;$('#streak').textContent=S.streak;$('#drops').textContent=S.drops;
 const n=S.tasks.filter(t=>t.d).length,left=Math.ceil((100-S.p)/25);$('#done').textContent=`${n} of ${S.tasks.length}`;
 $('#ptxt').textContent=S.stage===4&&S.p>=100?'Fully grown. Keep your streak going.':`${left} more task${left>1?'s':''} until the next stage`;
 requestAnimationFrame(()=>$('#pbar').style.width=S.p+'%');
 $('#tasks').innerHTML=S.tasks.map((t,i)=>`<div class="card task st ${t.d?'done':''}" style="--i:${i+3}" data-t="${i}"><button class="task-hit" aria-label="${t.d?'Completed: ':'Complete: '}${esc(t.n)}" ${t.d?'disabled':''}><div class="ic" style="background:${t.c}"><svg viewBox="0 0 24 24">${ICO[t.e]||ICO.spark}</svg></div><div class="t"><h3>${esc(t.n)}</h3><span class="cap">${esc(t.t)}</span></div><div class="ck"><svg viewBox="0 0 16 16"><path d="M2 8.500l4 4L14 4"/></svg></div></button><button class="task-edit" aria-label="Edit ${esc(t.n)}">•••</button></div>`).join('');
 $$('.task-hit').forEach(el=>el.onclick=()=>complete(+el.closest('.task').dataset.t,el.closest('.task')));$$('.task-edit').forEach(el=>el.onclick=()=>openHabit(+el.closest('.task').dataset.t));renderStreak();startQuotes()}
function esc(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function complete(i,el){const t=S.tasks[i];if(t.d)return;t.d=1;el.classList.add('done');
 const ph=$('#ph').getBoundingClientRect(),a=el.querySelector('.ck').getBoundingClientRect(),b=$('#homeplant').getBoundingClientRect();
 const f=document.createElement('i');f.className='fly';$('#ph').append(f);
 const sx=a.left-ph.left,sy=a.top-ph.top,ex=b.left-ph.left+b.width/2-11,ey=b.top-ph.top+b.height*.3;
 f.animate([{transform:`translate(${sx}px,${sy}px) scale(.6)`},{transform:`translate(${(sx+ex)/2+30}px,${Math.min(sy,ey)-40}px) scale(1.1)`,offset:.5},{transform:`translate(${ex}px,${ey}px) scale(.5)`,opacity:.2}],{duration:900,easing:'cubic-bezier(.4,0,.3,1)'}).onfinish=()=>{f.remove();
  const wasSad=S.sad;S.sad=false;S.drops++;S.p=Math.min(100,S.p+25);$('#homeplant').innerHTML=plant(S.kind,S.stage,0,200);$('#homeplant svg,#homeplant img').classList.add('bounce');
  $('#hero').classList.remove('gray');$('#mood').textContent='Happy';joy();$('#pbar').style.width=S.p+'%';$('#drops').textContent=S.drops;$('#dropc').classList.remove('pop');void $('#dropc').offsetWidth;$('#dropc').classList.add('pop');
  if(S.tasks.every(x=>x.d)){S.streak++;S.history[window.GWMStore.today()]={completed:S.tasks.length,total:S.tasks.length,missed:false};$('#streak').textContent=S.streak;$('#streakc').classList.add('pop');renderStreak()}
  $('#done').textContent=`${S.tasks.filter(x=>x.d).length} of ${S.tasks.length}`;
  const up=S.p>=100&&S.stage<4;persist();feedback();$('#oktxt').textContent=wasSad?`${S.name} is smiling again.`:up?`${S.name} is ready to grow.`:`${S.name} loved that.`;
  setTimeout(()=>{if(up){S.stage++;S.p=0;persist();growOv()}else sheet('okc',1)},550)}}
$('#okb').onclick=()=>{closeAll();renderHome()};
function growOv(){closeAll();$('#gt').textContent=STG[S.stage-1];$('#gs').textContent=`${S.name} grew into a ${STG[S.stage-1].toLowerCase()}.`;
 $('#gplant').innerHTML=plant(S.kind,S.stage,0,230);$('#grow').classList.add('on');$$('.cf').forEach(c=>c.remove());
 for(let i=0;i<34;i++){const c=document.createElement('i');c.className='cf';const a=Math.random()*6.28,r=110+Math.random()*190;
  c.style.cssText=`--x:${Math.cos(a)*r}px;--y:${Math.sin(a)*r+80}px;--r:${Math.random()*720}deg;background:${['#F9C4D5','#fff','#BFE8CB','#CFEBFF','#FFE29A'][i%5]};animation-delay:${Math.random()*.3}s`;$('#grow').append(c)}}
$('#gb').onclick=()=>{$('#grow').classList.remove('on');go('home')};
const CATS=['drop|Water','move|Move','moon|Sleep','book|Mind','spark|Custom'],WH=['Morning','Afternoon','Evening','All day'];
$('#cats').innerHTML=CATS.map((c,i)=>{const[k,n]=c.split('|');return`<span class="chip ${i?'':'on'}" data-e="${k}"><svg viewBox="0 0 24 24">${ICO[k]}</svg>${n}</span>`}).join('');
$('#whens').innerHTML=WH.map((w,i)=>`<span class="chip ${i?'':'on'}">${w}</span>`).join('');
['#cats','#whens'].forEach(s=>$(s).onclick=e=>{const c=e.target.closest('.chip');if(!c)return;$$(s+' .chip').forEach(x=>x.classList.remove('on'));c.classList.add('on')});
$('#rem').onclick=e=>e.currentTarget.classList.toggle('on');
let editing=-1;
function openHabit(i=-1){editing=i;const t=S.tasks[i];$('#addtitle').textContent=t?'Edit habit':'New habit';$('#addbtn').textContent=t?'Save changes':'Add habit';$('#deletebtn').hidden=!t;$('#hn').value=t?.n||'';
 $$('#cats .chip').forEach((x,n)=>x.classList.toggle('on',t?x.dataset.e===t.e:n===0));$$('#whens .chip').forEach((x,n)=>x.classList.toggle('on',t?x.textContent===t.t:n===0));sheet('add',1);setTimeout(()=>$('#hn').focus(),100)}
$('#addbtn').onclick=()=>{const n=$('#hn').value.trim();if(!n){$('#hn').focus();return}const value={id:S.tasks[editing]?.id||`${Date.now()}-${Math.random()}`,n,t:$('#whens .on').textContent,e:$('#cats .on').dataset.e,c:'#D8F0DF',d:S.tasks[editing]?.d||0};
 if(editing<0)S.tasks.push(value);else S.tasks[editing]=value;persist();closeAll();go('home');toast(editing<0?'Habit added':'Habit updated')};
$('#deletebtn').onclick=()=>{if(editing<0)return;if(S.tasks.length===1){toast('Keep at least one habit');return}S.tasks.splice(editing,1);persist();closeAll();go('home');toast('Habit deleted')};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1900)}
function renderProg(){const now=new Date(),y=now.getFullYear(),m=now.getMonth(),days=new Date(y,m+1,0).getDate(),first=new Date(y,m,1).getDay();let h=['S','M','T','W','T','F','S'].map(x=>`<span>${x}</span>`).join('')+'<i></i>'.repeat(first);
 $('#caltitle').textContent=now.toLocaleDateString('en',{month:'long',year:'numeric'});for(let d=1;d<=days;d++){const k=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,rec=S.history[k],cls=d===now.getDate()?'t':rec?(rec.missed?'s':rec.completed===rec.total?'h':'e'):'e';h+=`<div class="d ${cls}" style="--n:${d}">${d}</div>`}$('#cal').innerHTML=h;
 const last=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const k=d.toISOString().slice(0,10),r=k===window.GWMStore.today()?{completed:S.tasks.filter(x=>x.d).length,total:S.tasks.length}:S.history[k];return[d.toLocaleDateString('en',{weekday:'narrow'}),r?.total?Math.round(r.completed/r.total*100):0]});
 $('#bars').innerHTML=last.map(([l,v],i)=>`<div><i style="height:${Math.max(4,v)}px;animation-delay:${i*90}ms"></i>${l}</div>`).join('');const done=Object.values(S.history).reduce((n,x)=>n+(x.completed||0),0)+S.tasks.filter(x=>x.d).length;const stats=$$('.stat b');if(stats.length){stats[0].textContent=S.streak;stats[1].textContent=done;stats[2].textContent=S.stage}}
function renderGar(){const L=[['sprig','Sprig','Grown'],['bloom','Blossom','Growing'],['cactus','Prickle','Grown']];
 $('#gar').innerHTML=L.map(([k,n,s],i)=>`<div class="card gc st" style="--i:${i}">${plant(k,s==='Grown'?4:S.stage,0,118)}<h3>${n}</h3><span class="chip" style="margin-top:8px;font-size:12px;padding:5px 12px">${s}</span></div>`).join('')+['Fern','Lily','Bonsai','Orchid','Mint'].map((n,i)=>`<div class="card gc lock st" style="--i:${i+3};padding-top:34px"><div class="ic" style="background:#F1F6F2;margin:0 auto"><svg viewBox="0 0 24 24" style="color:#A5B5AD"><rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></div><h3 style="margin-top:12px">${n}</h3><span class="cap">14 day streak</span></div>`).join('')}
const SETS=[['reminders','Daily reminders'],['sound','Sound effects'],['haptics','Haptics']];
function renderSettings(){$('#set').innerHTML=SETS.map(([k,n],i)=>`<div class="row" style="padding:18px 0;${i<2?'border-bottom:1px solid var(--line)':''}"><h3>${n}</h3><button class="tg ${S.settings[k]?'on':''}" data-setting="${k}" role="switch" aria-checked="${!!S.settings[k]}" aria-label="${n}"></button></div>`).join('');$$('#set .tg').forEach(t=>t.onclick=()=>{const k=t.dataset.setting;S.settings[k]=!S.settings[k];t.classList.toggle('on',S.settings[k]);t.setAttribute('aria-checked',S.settings[k]);persist()})}renderSettings();
$('#miss').onclick=()=>{S.sad=true;S.p=Math.max(0,S.p-20);S.streak=0;S.history[window.GWMStore.today()]={completed:S.tasks.filter(x=>x.d).length,total:S.tasks.length,missed:true};persist();go('sad')};
$('#revive').onclick=()=>go('home');
$('#resetapp').onclick=()=>{if(!confirm('Reset this garden and remove all saved habits?'))return;S=window.GWMStore.reset();persist();renderSettings();go('welcome');toast('Local data reset')};
function face(m){const k='#6B514A',j=m==='joy',s=m==='sad';
 const eyes=j?`<path d="M82 182q6-8 12 0M106 182q6-8 12 0" stroke="${k}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`:s?`<path d="M82 173l10-4M118 173l-10-4" stroke="${k}" stroke-width="2.4" stroke-linecap="round"/><g class="bl"><circle cx="88" cy="181" r="3.5" fill="${k}"/><circle cx="112" cy="181" r="3.5" fill="${k}"/></g>`:`<g class="bl"><circle cx="88" cy="179" r="3.5" fill="${k}"/><circle cx="112" cy="179" r="3.5" fill="${k}"/><circle cx="89.3" cy="177.7" r="1.1" fill="#fff"/><circle cx="113.3" cy="177.7" r="1.1" fill="#fff"/></g>`;
 const mouth=j?`<path d="M93 187q7 11 14 0z" fill="#EE9A9A" stroke="${k}" stroke-width="2" stroke-linejoin="round"/>`:s?`<path d="M94 194q6-6 12 0" stroke="${k}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`:`<path d="M94 187q6 7 12 0" stroke="${k}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
 const op=j?.8:s?.3:.5;
 return `<g class="eyes">${eyes}</g><ellipse cx="79" cy="188" rx="5" ry="3.5" fill="#F4A9A0" opacity="${op}"/><ellipse cx="121" cy="188" rx="5" ry="3.5" fill="#F4A9A0" opacity="${op}"/>${mouth}${s?'<path d="M124 184q4 6 0 9-4-3 0-9z" fill="#A9D8F5"/>':''}`}
function setMood(m){const f=$('#homeplant .face');if(f)f.innerHTML=face(m)}
const Q={idle:['Good vibes only, and a little sunshine.','I can feel myself growing!','Small steps count. Thanks for showing up.','Is that a breeze? Lovely.','You are doing great today.','Slow and steady wins the garden.'],joy:['Ahh, that was refreshing!','Yum! More of that, please.','Look at me go!','You remembered me. Thank you!','Feeling brand new!'],sad:['I am a little thirsty…','I missed you. One small task?','Rough day? We can grow slowly.']};
let qi=0,qt;function say(t){const b=$('#bub');if(!b)return;b.classList.remove('on');void b.offsetWidth;b.textContent=t;b.classList.add('on')}
function startQuotes(){clearInterval(qt);const p=()=>{const a=S.sad?Q.sad:Q.idle;say(a[qi++%a.length])};setTimeout(p,500);qt=setInterval(()=>{if($('#home').classList.contains('on'))p()},7500)}
function joy(){const n=S.tasks.filter(t=>t.d).length;setMood('joy');say(Q.joy[(n-1)%Q.joy.length]);setTimeout(()=>setMood('happy'),2800)}
setInterval(()=>{const p=$('#homeplant .plant');if(!p||!$('#home').classList.contains('on'))return;if(Math.random()<.5){p.classList.add('gust');setTimeout(()=>p.classList.remove('gust'),1900)}else{const c=Math.random()<.5?'look-l':'look-r';p.classList.add(c);setTimeout(()=>p.classList.remove(c),1400)}},4200);
const FP=[['#F9C4D5','#FFE29A'],['#FFE29A','#F6B98A'],['#D9CFF5','#FFE29A'],['#CFEBFF','#FFE29A'],['#BFE8CB','#FFE29A']];
function flower(i,s,z=32){if(s==='p')return`<svg viewBox="0 0 32 32" width="${z}"><circle class="tp" cx="16" cy="16" r="6" fill="#FFE29A"/></svg>`;if(s==='m')return`<svg viewBox="0 0 32 32" width="${z}"><circle cx="16" cy="16" r="5.5" fill="#DCD4F2"/></svg>`;const p=FP[i%5];return`<svg class="bl8" viewBox="0 0 32 32" width="${z}" style="animation-delay:${i*70}ms">${[0,1,2,3,4].map(k=>`<ellipse cx="16" cy="8.5" rx="4.6" ry="7" fill="${p[0]}" transform="rotate(${k*72} 16 16)"/>`).join('')}<circle cx="16" cy="16" r="4.2" fill="${p[1]}"/></svg>`}
let skm='w';
function renderStreak(){const T=S.tasks.every(t=>t.d),w=skm==='w',n=w?7:30;
 const keys=Array.from({length:n},(_,i)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(n-1-i));return d.toISOString().slice(0,10)}),days=keys.map((k,i)=>{if(i===n-1)return T?1:2;const r=S.history[k];return r?(r.missed?0:r.completed===r.total?1:2):2}),done=days.filter(x=>x===1).length,L=o=>'SMTWTFS'[new Date(Date.now()-o*864e5).getDay()];
 const st=s=>s===1?'o':s===0?'m':'p';$('#skc').textContent=`${done} of ${n} days`;
 $('#sk').innerHTML=w?`<div class="ft"><i class="fill" id="skf"></i>${days.map((s,i)=>`<div class="fw">${flower(i,st(s))}</div>`).join('')}</div><div class="fl-l">${days.map((s,i)=>`<span class="${i===6?'tdy':''}">${i===6?'Today':L(6-i)}</span>`).join('')}</div>`:`<div class="fm">${days.map((s,i)=>flower(i,st(s),26)).join('')}</div>`;
 const f=$('#skf');if(f)requestAnimationFrame(()=>requestAnimationFrame(()=>f.style.width=(done/n*100)+'%'));
 $('#skt').textContent=done>=n?'Your garden is in full bloom.':`Bloom ${n-done} more to fill your ${w?'week':'month'}.`}
$('#skw').onclick=()=>{skm='w';$('#skw').classList.add('on');$('#skm').classList.remove('on');$('#skw').setAttribute('aria-pressed','true');$('#skm').setAttribute('aria-pressed','false');renderStreak()};
$('#skm').onclick=()=>{skm='m';$('#skm').classList.add('on');$('#skw').classList.remove('on');$('#skm').setAttribute('aria-pressed','true');$('#skw').setAttribute('aria-pressed','false');renderStreak()};
function feedback(){if(S.settings.haptics&&navigator.vibrate)navigator.vibrate(30);if(!S.settings.sound)return;try{const C=window.AudioContext||window.webkitAudioContext,a=new C(),o=a.createOscillator(),g=a.createGain();o.frequency.value=660;g.gain.setValueAtTime(.045,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.22);o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.22)}catch{}}
let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#installapp').hidden=false});$('#installapp').onclick=async()=>{if(!installPrompt)return;installPrompt.prompt();const result=await installPrompt.userChoice;if(result.outcome==='accepted')toast('App installed');installPrompt=null;$('#installapp').hidden=true};
function net(){const offline=!navigator.onLine;$('#net').textContent=offline?'Offline · changes stay on this device':'';$('#net').classList.toggle('on',offline)}window.addEventListener('online',net);window.addEventListener('offline',net);net();
if('serviceWorker'in navigator&&location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>toast('Offline mode could not start')));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
go(S.onboarded?'home':'welcome');
