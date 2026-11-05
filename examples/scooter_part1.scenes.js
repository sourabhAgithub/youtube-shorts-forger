add(0,2.5,(lt,d)=>{ // title
  const x=lerp(-500,540,eo(pr(lt,0,1.1)));
  return {svg:`<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#tg)"/>
   <ellipse cx="540" cy="1250" rx="420" ry="40" fill="rgba(0,0,0,.3)"/>${scooter({x,y:1240,s:1.25,rot:lt*400*(1-pr(lt,0,1.1))})}`,
   html:`${label('ഭാഗം 1',lt,.3,{top:420,bg:'#ff5d73',c:'#fff',fs:70})}<div class="big" style="top:560px;font-size:110px;line-height:1.1;color:#fff;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,.6,.45)})">സ്റ്റാർട്ട് ആവാത്ത<br><span style="color:#ffd43b">സ്കൂട്ടർ</span></div>`};
});
add(2.5,5.1,(lt,d)=>{ // college on hill
  const z=1+0.08*pr(lt,0,d);
  const walkers=[0,1,2,3].map(i=>{const px=(-100+((lt*110+i*300)%1300));return person([ME,SURESH,RAMESH,J1][i],{x:px,y:1480+i%2*40,s:.32,walk:lt*9+i,expr:'smile'})}).join('');
  return {svg:`<g transform="translate(540,960) scale(${z}) translate(-540,-960)">${sky()}${cloud(80,300,1)}${cloud(720,220,.9)}
   <path d="M0,1150 C250,900 800,880 1080,1100 L1080,1920 L0,1920Z" fill="#5fae4e"/>
   ${college(540,1010,1.05)}${palm(120,1180,1.1,Math.sin(lt*2)*4)}${palm(960,1160,1,Math.sin(lt*2+1)*4)}
   <path d="M480,1010 C470,1200 300,1300 340,1500 C360,1650 560,1700 600,1920 L760,1920 C720,1700 520,1640 500,1500 C470,1320 600,1200 600,1010Z" fill="#b0a48e"/>
   ${walkers}</g>`, html:label('സെക്കൻഡ് ഇയർ 🎓',lt,.2)};
});
add(5.1,7.4,(lt,d)=>({ // suresh + dio
  svg:parkingBg()+person(SURESH,{x:300,y:1560,s:1.05,expr:'grin',ra:-55-6*Math.sin(lt*6),bob:Math.sin(lt*6)*4})+scooter({x:700,y:1560,s:1.15})+stars(lt,720,1250,230),
  html:label('സുരേഷ് & റെഡ് ഡിയോ 🛵',lt,.15)}));
add(7.4,10.6,(lt,d)=>{ // parking full of red dios
  const pan=-lerp(0,700,eio(pr(lt,0,d)));
  return {svg:parkingBg()+`<g transform="translate(${pan},0)">${[0,1,2,3,4,5].map(i=>scooter({x:180+i*330,y:1560-(i%2)*30,s:.78})).join('')}</g>`,
   html:label('എല്ലാർക്കും സെയിം ഡിയോ! 😅',lt,.4)};
});
add(10.6,13.6,(lt,d)=>{ // saturday special class
  const desks=[0,1,2].map(i=>{const x=220+i*320;return person([ME,SURESH,RAMESH][i],{x,y:1640,s:.75,expr:i===1?'sad':'normal',headRot:Math.sin(lt*3+i)*8,bob:Math.sin(lt*3+i)*6})+`<rect x="${x-150}" y="1400" width="300" height="40" fill="#8d5a32"/><rect x="${x-140}" y="1440" width="20" height="260" fill="#6d4426"/><rect x="${x+120}" y="1440" width="20" height="260" fill="#6d4426"/>`}).join('');
  const flip=pr(lt,.3,.9);
  return {svg:`<rect width="${W}" height="${H}" fill="#efe2c4"/><rect x="0" y="1300" width="${W}" height="620" fill="#c9a87a"/>
   <rect x="90" y="420" width="640" height="380" rx="14" fill="#2f5d3a" stroke="#7b4a2b" stroke-width="18"/>
   <text x="410" y="560" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="62" fill="#f5f5f5">SPECIAL CLASS</text>
   <text x="410" y="680" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="58" fill="#ffe082">ശനിയാഴ്ച</text>
   <g transform="translate(880,600)"><rect x="-120" y="-160" width="240" height="300" rx="12" fill="#fff" stroke="#999" stroke-width="4"/><rect x="-120" y="-160" width="240" height="70" rx="12" fill="#e53935"/>
   <text y="-112" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="38" fill="#fff">SAT</text>
   <g transform="scale(1,${lerp(-1,1,flip)})"><text y="70" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="70" fill="#222">ശനി</text></g></g>
   ${desks}
   <text x="${600+Math.sin(lt*2)*10}" y="${1080-lt*30}" font-family="Baloo Chettan 2" font-weight="800" font-size="60" fill="#555" opacity="${.4+.4*Math.sin(lt*4)}">Zzz</text>`,
   html:label('ശനിയാഴ്ച സ്പെഷ്യൽ ക്ലാസ്',lt,.2)};
});
const sun=(lt)=>`<g transform="translate(900,330) rotate(${lt*20})">${[...Array(12)].map((_,i)=>`<rect x="-6" y="-170" width="12" height="50" rx="6" fill="#ffb300" transform="rotate(${i*30})"/>`).join('')}<circle r="100" fill="#ffd54f"/></g>`;
add(13.6,17.9,(lt,d)=>{ // noon, me at activa, ramesh walks in
  const rx=lerp(1250,800,eo(pr(lt,.6,2.6)));const walking=lt<2.6;
  return {svg:parkingBg()+sun(lt)+scooter({x:520,y:1580,s:1,color:'#f1f3f4',trim:'#90a4ae'})+person(ME,{x:200,y:1600,s:1,expr:lt>2.4?'smile':'normal',ra:-30})+
   person(RAMESH,{x:rx,y:1600,s:1,flip:true,walk:walking?lt*10:null,expr:'smile',ra:lt>2.6?-150+Math.sin(lt*10)*15:-10,bob:walking?Math.abs(Math.sin(lt*10))*-8:0}),
   html:label('ഉച്ച ആയി, ക്ലാസ് കഴിഞ്ഞു! ☀️',lt,.1)};
});
const meSet=(lt,o={})=>parkingBg()+sun(lt+4)+scooter({x:520,y:1580,s:1,color:'#f1f3f4',trim:'#90a4ae'})+person(ME,{x:200,y:1600,s:1,expr:o.me||'smile',ra:o.mera??-30})+person(RAMESH,{x:800,y:1600,s:1,flip:true,expr:o.ram||'smile',ra:o.ra??-10,thumb:o.thumb});
add(17.9,20.4,(lt,d)=>({svg:meSet(lt,{mera:-100+Math.sin(lt*6)*8}),html:bubble('എന്നാ, നമുക്ക് പോയാലോ?',60,980,lt,.1,'l')}));
add(20.4,23.0,(lt,d)=>({svg:meSet(lt,{ram:'grin',ra:-150+Math.sin(lt*5)*6,thumb:true}),html:bubble('പിന്നെന്താ, പോവാലോ!',300,980,lt,.15,'r')}));
add(23.0,26.8,(lt,d)=>{ // key handover then insert
  if(lt<1.9){const k=eio(pr(lt,.3,1.5));
    return {svg:parkingBg()+scooter({x:540,y:1300,s:.7})+person(SURESH,{x:250,y:1650,s:1.05,expr:'normal',ra:-75})+person(RAMESH,{x:830,y:1650,s:1.05,flip:true,expr:'smile',ra:-75})+key(lerp(400,640,k),1290-Math.sin(k*Math.PI)*120,.9,-10+k*20),
     html:label('കീ 🔑',lt,.1)};}
  const l2=lt-1.9;const kx=lerp(980,640,eo(pr(l2,0,.8)));const kr=l2>1.1?lerp(0,60,eo(pr(l2,1.1,1.5))):0;
  return {svg:`<rect width="${W}" height="${H}" fill="#b71c1c"/><circle cx="540" cy="900" r="420" fill="#d62828"/><circle cx="540" cy="900" r="110" fill="#333" stroke="#999" stroke-width="16"/><rect x="520" y="830" width="40" height="140" rx="8" fill="#111"/>
   <g transform="translate(${kx},900) rotate(${kr} ${540-kx} 0)">${key(0,0,2.4,180)}</g>`,html:''};
});
add(26.8,29.2,(lt,d)=>{ // not starting
  const j=Math.sin(lt*30)*12;const sh=lt>.8?Math.sin(lt*60)*8*(1-pr(lt,.8,1.4)):0;
  return {svg:`<g transform="translate(${sh},0)"><rect width="${W}" height="${H}" fill="#b71c1c"/><circle cx="540" cy="900" r="420" fill="#d62828"/><circle cx="540" cy="900" r="110" fill="#333" stroke="#999" stroke-width="16"/><rect x="520" y="830" width="40" height="140" rx="8" fill="#111"/>
   <g transform="translate(640,900) rotate(${60+j} -100 0)">${key(0,0,2.4,180)}</g>
   <g transform="translate(540,900) scale(${pop(lt,.85,.3)})" opacity=".92"><path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke="#fff" stroke-width="70" stroke-linecap="round"/><path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke="#111" stroke-width="40" stroke-linecap="round"/></g></g>`,
   html:label('സ്റ്റാർട്ട് ആവുന്നില്ല! ❌',lt,.85,{bg:'#fff'})};
});
add(29.2,31.6,(lt,d)=>{ // 1 2 3 4
  const n=Math.min(4,1+Math.floor(lt/0.55));
  return {svg:parkingBg()+scooter({x:600,y:1600,s:1.1})+person(RAMESH,{x:330,y:1620,s:1.05,expr:'worry',ra:-80+Math.sin(lt*18)*10,la:-60,sweat:1}),
   html:`<div class="big" style="top:560px;font-size:240px;color:#fff;text-shadow:0 10px 0 #000;transform:scale(${eob(pr(lt%0.55,0,.25))})">${n}</div>`};
});
add(31.6,35.9,(lt,d)=>({ // no luck
  svg:parkingBg()+scooter({x:600,y:1600,s:1.1})+person(RAMESH,{x:330,y:1620,s:1.05,expr:'sad',headRot:18,ra:-35,la:-30,sweat:.8})+
   `<text x="760" y="1080" font-family="Baloo Chettan 2" font-weight="800" font-size="120" fill="#555">${'.'.repeat(1+Math.floor(lt*2)%3)}</text>`,
  html:label('ഒരു രക്ഷയുമില്ല! 😩',lt,.2)+(lt>2.55?label('സ്റ്റാർട്ട് ആവുന്നില്ല!',lt,2.6,{top:640,bg:'#fff',r:3,fs:60}):'')}));
add(35.9,38.3,(lt,d)=>{ // suresh tension
  const z=1+.12*pr(lt,0,d);const sh=Math.sin(lt*40)*4;
  return {svg:burst('#ffcc80','#ffab40',lt*15)+`<g transform="translate(${540+sh},1000) scale(${z}) translate(-540,-1000)">${person(SURESH,{x:540,y:2280,s:2.3,expr:'shock',la:150,ra:-150,sweat:1})}</g>
   ${[0,1,2].map(i=>{const t=(lt*1.4+i/3)%1;return `<path d="M0,-30 C-14,-6 -10,10 0,10 C10,10 14,-6 0,-30Z" fill="#7fd3ff" stroke="#2b8fc7" stroke-width="3" transform="translate(${300+i*240},${600+t*500}) scale(2)" opacity="${1-t}"/>`}).join('')}`,
   html:label('ഫുൾ ടെൻഷൻ! 😰',lt,.15,{bg:'#ff5252',c:'#fff'})};
});
add(38.3,42.1,(lt,d)=>{ // thought: angry parent
  const c=pop(lt,.2,.45);const wag=Math.sin(lt*12)*18;
  return {svg:parkingBg()+person(SURESH,{x:260,y:1700,s:.95,expr:'worry',sweat:1,la:20,ra:-20})+
   `<g transform="translate(640,880) scale(${c})">
     <circle cx="-290" cy="300" r="18" fill="#fff" stroke="#333" stroke-width="5"/><circle cx="-235" cy="245" r="28" fill="#fff" stroke="#333" stroke-width="5"/>
     <path d="M-330,0 C-380,-160 -220,-300 -60,-250 C0,-380 260,-360 300,-220 C420,-200 440,0 340,60 C380,200 200,300 80,240 C0,330 -200,320 -240,220 C-380,240 -420,80 -330,0Z" fill="#fff" stroke="#333" stroke-width="8"/>
     <path d="M-220,140 L-220,-40 L0,-180 L220,-40 L220,140Z" fill="#ffe0b2" stroke="#8d6e63" stroke-width="6"/>
     ${person(DAD,{x:-20,y:150,s:.55,expr:'angry',ra:-100+wag,la:20})}
     <text x="150" y="-60" font-family="Baloo Chettan 2" font-weight="800" font-size="110" fill="#e53935">!!!</text></g>`,
   html:label('വീട്ടീന്ന് നല്ലോണം കേൾക്കും! 😬',lt,.6,{top:1180,fs:62,r:2})};
});
add(42.1,44.5,(lt,d)=>{ // battery?
  const blink=Math.floor(lt*4)%2;
  return {svg:parkingBg()+scooter({x:540,y:1600,s:.95})+person(SURESH,{x:800,y:1560,s:.8,flip:true,expr:'worry'})+person(ME,{x:130,y:1640,s:.95,expr:'think',ra:-150,la:10})+person(RAMESH,{x:960,y:1660,s:.95,flip:true,expr:'think'})+
   `<g transform="translate(540,760) scale(${pop(lt,.2,.4)})"><rect x="-150" y="-80" width="300" height="160" rx="24" fill="#fff" stroke="#222" stroke-width="14"/><rect x="150" y="-35" width="30" height="70" rx="8" fill="#222"/><rect x="-128" y="-58" width="70" height="116" rx="10" fill="${blink?'#e53935':'#ff8a80'}"/></g>`,
   html:label('ബാറ്ററി പോയോ? 🔋',lt,.3)};
});
add(44.5,47.9,(lt,d)=>{ // hill road down to workshop
  const ty=-lerp(0,260,eio(pr(lt,0,d)));const dr=eio(pr(lt,.3,2.6));
  const road="M560,560 C820,640 820,760 520,820 C220,880 220,1000 520,1060 C820,1120 820,1260 560,1360 C420,1420 360,1500 420,1620";
  return {svg:`<g transform="translate(0,${ty})">${sky()}${cloud(100,160,.8)}
   <path d="M0,700 C200,520 420,470 560,470 C760,470 900,560 1080,700 L1080,2300 L0,2300Z" fill="#6cbf57"/>
   <path d="M0,1500 L1080,1500 L1080,2300 L0,2300Z" fill="#c8c2b0"/>
   ${college(560,520,.42)}${palm(100,900,.6,0)}${palm(980,1100,.6,0)}${palm(130,1300,.5,0)}
   <path d="${road}" stroke="#8d8a80" stroke-width="80" fill="none" stroke-linecap="round"/>
   <path d="${road}" pathLength="1" stroke="#ffd43b" stroke-width="16" fill="none" stroke-dasharray="${dr} 1" stroke-linecap="round"/>
   ${workshop(560,1760,.75)}</g>`,
   html:label('വർക്ക്‌ഷോപ്പിലേക്ക് 🔧',lt,.2)};
});
add(47.9,52.0,(lt,d)=>{ // ramesh idea
  const b=pop(lt,.15,.4);const point=lt>1.6;
  return {svg:sky()+`<path d="M0,1250 L1080,1650 L1080,1920 L0,1920Z" fill="#6cbf57"/><path d="M0,1350 L1080,1750 L1080,1920 L0,1920Z" fill="#8d8a80"/>`+palm(900,1600,.7,0)+
   person(RAMESH,{x:360,y:1500,s:1.1,expr:'grin',ra:point?-115:-150,la:10})+
   `<g transform="translate(360,870) scale(${b})">${[...Array(10)].map((_,i)=>`<rect x="-6" y="-170" width="12" height="40" rx="6" fill="#ffd600" transform="rotate(${i*36+lt*30})"/>`).join('')}<circle r="85" fill="#fff59d" stroke="#f9a825" stroke-width="8"/><rect x="-35" y="70" width="70" height="55" rx="10" fill="#9e9e9e"/></g>`,
   html:bubble('കുന്നല്ലേ... ഉരുട്ടി താഴെ എത്തിക്കാം!',260,760,lt,.4,'l')+(lt>2.4?label('ഉരുട്ടാം! 💡',lt,2.5,{top:1180}):'')};
});
add(52.0,55.5,(lt,d)=>{ // pushing downhill
  const off=(lt*500)%400;const ang=22;
  const posts=[...Array(6)].map((_,i)=>{const px=1300-((i*400+off)%2400);return palm(px,0,.75,0)}).join('');
  return {svg:sky()+cloud(200,250,.8)+cloud(760,420,.7)+`<g transform="translate(540,1250) rotate(${ang})">
   <rect x="-1600" y="0" width="3200" height="1400" fill="#6cbf57"/><rect x="-1600" y="40" width="3200" height="130" fill="#8d8a80"/>
   <g transform="translate(0,-10)">${posts}</g>
   <g transform="translate(0,140)">${person(SURESH,{x:-330,y:0,s:.85,expr:'worry',ra:-80,la:-70,walk:lt*12,sweat:1})}${person(RAMESH,{x:-210,y:0,s:.85,expr:'grin',ra:-80,la:-70,walk:lt*12+2})}${scooter({x:120,y:0,s:.9,rot:lt*600})}
   ${[0,1,2,3].map(i=>`<rect x="${-560-((lt*900+i*130)%300)}" y="${-260+i*60}" width="120" height="10" rx="5" fill="#fff" opacity=".8"/>`).join('')}</g></g>`,
   html:label('ഉരുട്ടി ഉരുട്ടി താഴേക്ക്... 😅',lt,.2)};
});
add(55.5,59.7,(lt,d)=>{ // bike arrives
  const k=eo(pr(lt,.3,1.9));const bx=lerp(1500,860,k);const moving=lt<1.9;
  const dust=lt>1.6?[0,1,2,3,4].map(i=>{const t=pr(lt,1.6+i*.05,2.8);return `<circle cx="${bx-180+i*70}" cy="${1610-t*80}" r="${30+t*80}" fill="#d7ccc8" opacity="${(1-t)*.8}"/>`}).join(''):'';
  const shocked=lt>2.0;
  return {svg:sky()+cloud(150,300,.8)+workshop(260,1300,.9)+ground(1300,'#9aa0a6')+`<rect x="0" y="1480" width="${W}" height="14" fill="#fff" opacity=".6"/>`+
   person(SURESH,{x:120,y:1640,s:.85,expr:shocked?'shock':'worry'})+scooter({x:360,y:1650,s:.8})+person(RAMESH,{x:560,y:1640,s:.85,flip:true,expr:shocked?'shock':'normal'})+
   person(J1,{x:bx+60,y:1560,s:.7,expr:'serious'})+person(J2,{x:bx-80,y:1560,s:.7,expr:'serious'})+bike({x:bx,y:1650,s:.85,rot:moving?lt*900:0})+
   (moving?[0,1,2].map(i=>`<rect x="${bx+260}" y="${1450+i*60}" width="${140+i*40}" height="10" rx="5" fill="#fff" opacity=".8"/>`).join(''):'')+dust,
   html:label('ബ്രൂം... 🏍️',lt,.3,{bg:'#fff'})};
});
add(59.7,62.3,(lt,d)=>{ // two juniors
  const z=1+.06*pr(lt,0,d);
  return {svg:sky('#90caf9','#e3f2fd')+ground(1250,'#9aa0a6')+`<g transform="translate(540,1300) scale(${z}) translate(-540,-1300)">${person(J2,{x:400,y:1440,s:1.15,expr:'serious',ra:-20})}${person(J1,{x:640,y:1440,s:1.15,expr:'serious',ra:-20})}${bike({x:540,y:1620,s:1.25})}</g>`,
   html:label('രണ്ട് ജൂനിയേഴ്സ് 👀',lt,.2)};
});
add(62.3,64.4,(lt,d)=>{ // pointing
  const ax=lerp(1300,760,eo(pr(lt,.1,1)));const z=1+.08*pr(lt,0,d);
  return {svg:`<rect width="${W}" height="${H}" fill="#263238"/><g transform="translate(540,1200) scale(${z}) translate(-540,-1200)"><ellipse cx="330" cy="1460" rx="360" ry="60" fill="rgba(255,255,255,.08)"/>${scooter({x:330,y:1450,s:1.15})}
   <g transform="translate(${ax},1050)"><rect x="60" y="-55" width="700" height="110" rx="50" fill="${J1.shirt}"/><rect x="-60" y="-48" width="150" height="96" rx="44" fill="${J1.skin}"/><rect x="-200" y="-22" width="170" height="44" rx="22" fill="${J1.skin}"/><rect x="-10" y="-10" width="60" height="70" rx="20" fill="${J1.skin}" opacity=".85"/></g></g>`,
   html:''};
});
add(64.4,67.8,(lt,d)=>{ // shocked
  const hit=lt>.86;const sh=hit?Math.sin(lt*70)*14*(1-pr(lt,.86,1.6)):0;
  return {svg:burst(hit?'#ff8a80':'#ffe082',hit?'#ff5252':'#ffca28',lt*20)+`<g transform="translate(${sh},0)">${person(SURESH,{x:300,y:2150,s:1.9,expr:'shock',la:20,ra:-20})}${person(RAMESH,{x:790,y:2150,s:1.9,flip:true,expr:'shock',la:20,ra:-20})}</g>`,
   html:bubble('ചേട്ടാ...',330,720,lt,0,'r')+(hit?`<div class="big" style="top:1180px;font-size:120px;color:#fff;text-shadow:0 10px 0 #b71c1c,0 0 30px #000;transform:scale(${pop(lt,.86,.35)}) rotate(-4deg)">നിങ്ങളുടെ അല്ല!</div>`:'')};
});
add(67.8,69.6,(lt,d)=>({ // whose?
  svg:`<rect width="${W}" height="${H}" fill="#111"/><path d="M440,0 L640,0 L900,1500 L180,1500Z" fill="rgba(255,244,180,.18)"/><ellipse cx="540" cy="1500" rx="380" ry="60" fill="rgba(255,244,180,.25)"/>${scooter({x:540,y:1500,s:1.1})}
   <text x="540" y="${900+Math.sin(lt*5)*15}" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="${380*pop(lt,.1,.4)}" font-family="Baloo Chettan 2" fill="#ffd43b" stroke="#000" stroke-width="8">?</text>`,
  html:label('പിന്നെ ആരുടെ? 🤔',lt,.25)}));
add(69.6,71.32,(lt,d)=>({ // part 2
  svg:`<defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#eg)"/>`,
  html:`<div class="big" style="top:640px;font-size:80px;color:#fff;opacity:${pr(lt,0,.3)}">ബാക്കി...</div><div class="big" style="top:760px;font-size:170px;color:#ffd43b;text-shadow:0 10px 0 #000;transform:scale(${pop(lt,.25,.4)})">പാർട്ട് 2 ➡️</div>`}));

// ---------- subtitles (aligned to detected speech) ----------
const SUBS=[
[2.55,"This happened back in my second year of college!"],
[5.2,"My friend Suresh had a red Dio."],
[7.45,"Back then, almost everyone in college had the same colour Dio."],
[10.65,"One Saturday, we had a special class."],
[13.65,"The class got over by noon."],
[15.45,"I was standing near my Activa when I saw Ramesh."],
[17.95,"I asked him,"],
[19.05,"\"So, shall we go?\""],
[20.45,"Ramesh said, \"Sure, let's go!\""],
[23.1,"Ramesh took the key from Suresh, put it in the Dio and turned it."],
[26.8,"But..."],
[27.55,"But... the scooter won't start!"],
[29.3,"He tried turning the key three or four times."],
[31.7,"No matter how much he tried... no luck."],
[34.1,"It just won't start!"],
[36.0,"Seeing this, Suresh got super tense."],
[38.4,"\"Dude, if anything happens to this scooter, I'll get a proper scolding at home!\""],
[42.2,"We thought the battery must be dead."],
[44.5,"Anyway, we decided to show it at the workshop down the hill."],
[47.95,"Then Ramesh said, \"It's a hill... let's just roll it down!\""],
[52.05,"So the two of them rolled the scooter all the way down."],
[55.55,"Just as they reached the workshop, a bike stopped right in front of them."],
[59.7,"There were two juniors on it."],
[62.35,"They pointed at the scooter and said..."],
[64.4,"\"Bro...\""],
[65.2,"\"Bro... that scooter... isn't yours!\""],
[67.9,"Then whose could it be?"],
[69.65,"The rest... in Part 2!"],
];
function subAt(t){let s=null;for(const [a,x] of SUBS){if(t>=a)s=x;}if(t<2.5)return null;return s;}

