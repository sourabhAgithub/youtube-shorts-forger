add(0,2.4,(lt,d)=>{
  const x=lerp(-500,540,eo(pr(lt,0,1.1)));
  return {svg:`<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#tg)"/>
   <ellipse cx="540" cy="1250" rx="420" ry="40" fill="rgba(0,0,0,.3)"/>${scooter({x,y:1240,s:1.25,rot:lt*400*(1-pr(lt,0,1.1))})}`,
   html:`<div class="big" style="top:520px;font-size:70px;transform:scale(${pop(lt,.2,.4)})"><span style="background:#ff5d73;color:#fff;padding:6px 30px;border-radius:24px;border:6px solid #1a1a1a">ഭാഗം 2</span></div><div class="big" style="top:660px;font-size:120px;line-height:1.1;color:#ffd43b;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,.5,.45)})">സ്കൂട്ടർ<br><span style="color:#fff">കള്ളന്മാർ</span></div>`};
});
add(2.4,5.6,(lt,d)=>{ // shocked at juniors' words
  const hit=lt>1.95;const sh=hit?Math.sin(lt*70)*14*(1-pr(lt,1.95,2.6)):0;
  return {svg:townBg()+person(SURESH,{x:130,y:1640,s:.85,expr:hit?'shock':'worry'})+scooter({x:370,y:1650,s:.8})+person(RAMESH,{x:580,y:1640,s:.85,flip:true,expr:hit?'shock':'normal'})+
   person(J1,{x:920,y:1560,s:.7,expr:'serious',ra:-95,flip:true})+person(J2,{x:800,y:1560,s:.7,expr:'serious',flip:true})+bike({x:860,y:1650,s:.85})+
   (hit?`<g transform="translate(${sh},0)">${burst('rgba(0,0,0,0)','rgba(255,82,82,.25)',lt*20)}</g>`:''),html:''};
});
add(5.6,10.0,(lt,d)=>{ // phone rings
  const ear=lt>1.4;
  return {svg:townBg()+scooter({x:620,y:1650,s:.8})+person(RAMESH,{x:860,y:1640,s:.9,flip:true,expr:'worry'})+
   person(SURESH,{x:300,y:1660,s:1.05,expr:ear?'worry':'shock',ra:ear?-160:-40,sweat:ear?1:0})+
   (ear?phone(380,880,.8,0):phone(470,1150,1,lt)),html:''};
});
add(10.0,12.4,(lt,d)=>{ // friend panics on phone
  const sh=Math.sin(lt*30)*4;
  return {svg:burst('#b3e5fc','#81d4fa',lt*15)+`<g transform="translate(${sh},0)">${person(FRIEND,{x:540,y:2250,s:2.2,expr:'shock',ra:-165,la:20,sweat:1})}${phone(700,1050,1.6,0)}</g>`,
   html:bubble('എടാ, ആരുടെ വണ്ടിയാടാ കൊണ്ടുപോയത്?!',90,760,lt,.1,'r')};
});
add(12.4,16.2,(lt,d)=>{ // reveal: belongs to junior girl
  const g=pop(lt,1.4,.45);
  return {svg:darkBg('#14102a')+`<path d="M330,0 L530,0 L780,1550 L80,1550Z" fill="rgba(255,244,180,.16)"/>`+scooter({x:420,y:1550,s:1.05})+
   `<g transform="translate(830,1560) scale(${g})">${person(GIRL,{x:0,y:0,s:1,expr:'smile',ra:-30,la:10})}</g>`+
   (lt>1.4?stars(lt,830,1100,220):''),html:''};
});
add(16.2,18.2,(lt,d)=>{ // same colour same model
  const a=pop(lt,0,.35),b=pop(lt,.75,.35);
  return {svg:parkingBg()+`<g transform="translate(290,1450) scale(${a})">${scooter({x:0,y:0,s:.72})}</g><g transform="translate(790,1450) scale(${b})">${scooter({x:0,y:0,s:.72})}</g>`+
   `<text x="540" y="1250" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="200" fill="#fff" stroke="#1a1a1a" stroke-width="10" opacity="${pr(lt,1,1.2)}">=</text>`,html:''};
});
add(18.2,22.2,(lt,d)=>{ // key won't turn
  const kx=lerp(980,640,eo(pr(lt,0,.7)));const j=lt>1.2&&lt<2.2?Math.sin(lt*30)*12:0;const x=lt>2.3;
  return {svg:`<rect width="${W}" height="${H}" fill="#b71c1c"/><circle cx="540" cy="900" r="420" fill="#d62828"/><circle cx="540" cy="900" r="110" fill="#333" stroke="#999" stroke-width="16"/><rect x="520" y="830" width="40" height="140" rx="8" fill="#111"/>
   <g transform="translate(${kx},900) rotate(${j} ${540-kx} 0)">${key(0,0,2.4,180)}</g>
   ${x?`<g transform="translate(540,900) scale(${pop(lt,2.3,.3)})" opacity=".92"><path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke="#fff" stroke-width="70" stroke-linecap="round"/><path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke="#111" stroke-width="40" stroke-linecap="round"/></g>`:''}`,
   html:''};
});
add(22.2,26.8,(lt,d)=>{ // girl finds empty spot
  const walkIn=lt<1.4;const gx=lerp(1200,700,eo(pr(lt,0,1.4)));
  return {svg:parkingBg()+scooter({x:220,y:1560,s:.7,color:'#1e88e5'})+
   `<g opacity="${.5+.3*Math.sin(lt*6)}"><rect x="360" y="1330" width="300" height="250" rx="20" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="30 20"/></g>`+
   person(GIRL,{x:gx,y:1640,s:1,flip:true,walk:walkIn?lt*10:null,expr:lt>1.6?(lt>2.7?'shock':'worry'):'smile',sweat:lt>2.7?1:0,la:lt>2.7?150:10,ra:lt>2.7?-150:-10})+
   (lt>1.6?`<text x="510" y="1200" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="${220*pop(lt,1.6,.4)}" fill="#ffd43b" stroke="#1a1a1a" stroke-width="8">?</text>`:''),html:''};
});
add(26.8,30.4,(lt,d)=>{ // witness: saw seniors rolling it down
  const p=pr(lt,.4,d);
  return {svg:hillBg()+person(J2,{x:230,y:1700,s:.95,expr:'shock',ra:-110,la:10})+person(GIRL,{x:880,y:1700,s:.95,flip:true,expr:'shock',sweat:1})+
   `<g transform="translate(540,1050) scale(${pop(lt,.2,.4)})"><circle r="260" fill="#fff" stroke="#1a1a1a" stroke-width="10"/><clipPath id="cp"><circle r="250"/></clipPath><g clip-path="url(#cp)">
    <rect x="-260" y="-260" width="520" height="520" fill="#9ed2f2"/><g transform="rotate(25)"><rect x="-600" y="40" width="1200" height="400" fill="#6cbf57"/><rect x="-600" y="40" width="1200" height="60" fill="#8d8a80"/>
    <g transform="translate(${lerp(-200,140,p)},70)">${person(SURESH,{x:-120,y:0,s:.3,ra:-80,la:-70,walk:lt*12})}${person(RAMESH,{x:-75,y:0,s:.3,ra:-80,la:-70,walk:lt*12+2})}${scooter({x:20,y:0,s:.32,rot:lt*600})}</g></g></g></g>`,html:''};
});
add(30.4,33.6,(lt,d)=>{ // key from girl, ride scooter back up
  if(lt<1.2){const k=eio(pr(lt,.1,1));
    return {svg:hillBg()+person(GIRL,{x:250,y:1700,s:1,expr:'angry',ra:-75})+person(SURESH,{x:830,y:1700,s:1,flip:true,expr:'sad',ra:-75,sweat:1})+key(lerp(380,700,k),1350-Math.sin(k*Math.PI)*100,.9,0),html:''};}
  const l=lt-1.2,p=pr(l,0,d-1.2);
  return {svg:sky()+cloud(200,250,.8)+`<g transform="translate(540,1250) rotate(-22)"><rect x="-1600" y="0" width="3200" height="1400" fill="#6cbf57"/><rect x="-1600" y="40" width="3200" height="130" fill="#8d8a80"/>
   ${[...Array(6)].map((_,i)=>palm(-1300+((i*400+l*500)%2400),-10,.75,0)).join('')}
   <g transform="translate(${lerp(-150,80,p)},140)">${person(RAMESH,{x:-40,y:-40,s:.8,expr:'sad',ra:-70,la:-60})}${scooter({x:0,y:0,s:.9,rot:-l*500})}</g>
   <g transform="translate(${lerp(-150,80,p)-330},140)">${person(SURESH,{x:0,y:0,s:.8,expr:'sad',walk:l*10,ra:-10})}</g></g>`,html:''};
});
add(33.6,35.5,(lt,d)=>({ // what about suresh's own dio?
  svg:parkingBg()+person(SURESH,{x:540,y:1700,s:1.15,expr:'think',ra:-150,la:10})+`<text x="800" y="${1050+Math.sin(lt*5)*12}" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="${260*pop(lt,.2,.4)}" fill="#ffd43b" stroke="#1a1a1a" stroke-width="8">?</text>`,html:''}));
add(35.5,38.0,(lt,d)=>{ // own dio safe in parking
  const z=1+.1*eo(pr(lt,0,d));
  return {svg:`<g transform="translate(540,1450) scale(${z}) translate(-540,-1450)">${parkingBg()}<path d="M440,0 L640,0 L900,1600 L180,1600Z" fill="rgba(255,250,200,.35)"/>${scooter({x:540,y:1600,s:1.1})}${stars(lt,540,1300,280)}
   <g transform="translate(540,1080)"><rect x="-150" y="-55" width="300" height="80" rx="16" fill="#fff" stroke="#1a1a1a" stroke-width="6"/><text y="2" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="46" fill="#1a1a1a">SURESH</text></g></g>`,
   html:''};
});
add(38.0,42.4,(lt,d)=>{ // suresh can't look at her
  return {svg:parkingBg()+person(GIRL,{x:800,y:1680,s:1,flip:true,expr:'angry',la:30,ra:-30})+
   person(SURESH,{x:250,y:1680,s:1,expr:'sad',headRot:22,sweat:1,ra:-5,la:5})+
   `<g opacity="${.6+.4*Math.sin(lt*6)}"><circle cx="210" cy="${1250+20}" r="16" fill="#ff5252" opacity=".5"/><circle cx="290" cy="${1250+30}" r="16" fill="#ff5252" opacity=".5"/></g>`,html:''};
});
add(42.4,44.8,(lt,d)=>{ // comment from behind
  const tx=lerp(1200,860,eo(pr(lt,.3,1.3)));
  return {svg:parkingBg()+person(SURESH,{x:200,y:1700,s:1,expr:'sad'})+person(RAMESH,{x:470,y:1700,s:1,expr:'worry'})+person(TEASER,{x:tx,y:1640,s:.9,flip:true,expr:'grin'}),html:''};
});
add(44.8,47.0,(lt,d)=>({ // teaser close-up
  svg:burst('#fff3c4','#ffe082',lt*15)+person(TEASER,{x:540,y:2250,s:2.2,expr:'grin',ra:-120+Math.sin(lt*10)*10,la:10}),
  html:`<div class="big" style="top:1500px;font-size:120px;color:#fff;text-shadow:0 10px 0 #b71c1c,0 0 30px #000;transform:scale(${pop(lt,.3,.35)}) rotate(-4deg)">സ്കൂട്ടർ കള്ളന്മാർ!</div>`}));
add(47.0,51.0,(lt,d)=>{ // embarrassed + laughing crowd
  const ha=[[140,700],[860,760],[200,1020],[880,1060],[540,620]].map(([x,y],i)=>`<text x="${x}" y="${y+Math.sin(lt*8+i)*12}" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${90*pop(lt,.2+i*.25,.3)}" fill="#ff5252" stroke="#fff" stroke-width="6" transform="rotate(${(i%2?8:-8)} ${x} ${y})">HA HA</text>`).join('');
  return {svg:parkingBg()+[0,1,2,3].map(i=>person([J1,J2,TEASER,FRIEND][i],{x:[90,990,260,820][i],y:1560,s:.6,flip:i%2===1,expr:'grin',bob:Math.abs(Math.sin(lt*12+i))*-10})).join('')+
   person(SURESH,{x:400,y:1760,s:1.05,expr:'sad',headRot:15,sweat:1})+person(RAMESH,{x:680,y:1760,s:1.05,flip:true,expr:'worry',sweat:1,la:150,ra:-150})+ha,html:''};
});
add(51.0,54.88,(lt,d)=>({ // end card
  svg:`<defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#eg)"/>`+
   person(SURESH,{x:540,y:1820,s:1.1,expr:'grin',ra:-150+Math.sin(lt*6)*10,la:10}),
  html:`<div class="big" style="top:600px;font-size:84px;line-height:1.25;color:#fff;text-shadow:0 6px 0 #000;transform:scale(${pop(lt,.6,.4)})">നിങ്ങളുടെ ഗ്യാങ്ങിലും<br>ഉണ്ടോ ഇതുപോലൊരു<br><span style="color:#ffd43b">സുരേഷ്?</span></div>`}));

// ---------- subtitles (aligned to detected speech) ----------
const SUBS=[
[1.1,"Part 2: The Scooter Thieves!"],
[2.45,"Hearing those words from the juniors..."],
[4.35,"...both of them were stunned!"],
[5.65,"At that very moment, Suresh's phone rang."],
[7.4,"It was a friend from college."],
[8.7,"Totally tense, he asked,"],
[10.05,"\"Dude, whose scooter did you guys take?!\""],
[12.45,"Here's what actually happened..."],
[13.8,"That Dio belonged to a junior girl!"],
[16.3,"Same colour. Same model."],
[18.3,"Suresh's key went in."],
[19.5,"But how would it turn..."],
[20.5,"...it wasn't even his scooter!"],
[22.3,"When the poor girl came back after class... her scooter was gone."],
[24.85,"As she stood there scared, someone said,"],
[26.9,"\"I saw some seniors rolling a red Dio down the hill!\""],
[30.6,"Finally, they got her key and took the scooter back to her."],
[33.75,"So what about Suresh's own Dio?"],
[35.55,"It was right there in the parking... perfectly fine!"],
[39.4,"Suresh couldn't even look at her face."],
[42.6,"Then came a comment from behind..."],
[44.9,"\"Oh look, the scooter thieves are here!\""],
[47.05,"\"Planning to steal any more scooters? Just let us know in advance!\""],
[51.75,"Is there a Suresh like this in your gang too?"],
[54.15,"Comment below!"],
];
function subAt(t){let s=null;for(const [a,x] of SUBS){if(t>=a)s=x;}if(t<1.1)return null;return s;}

