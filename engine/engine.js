/* ===================================================================
   Story Shorts drawing engine (1080x1920, flat cartoon style)
   - Characters: person(colours,{x,y,s,expr,la,ra,flip,walk,headRot,bob,thumb,sweat})
       expr: normal smile grin shock worry sad angry serious think
       styles: short side spiky long(bald) ; c.kurta, c.mustache
   - Cast: ME F1 F2 F3 F4 (the five friends), SURESH RAMESH J1 J2 GIRL FRIEND TEASER
           DAD BRO DRV KID1 KID2 KID3 RIDER1 RIDER2
   - Vehicles: scooter() bike() suv({heads,bent,flash}) autoR({pax}) towTruck({carLift,heads,lights})
   - Places: sky() cloud() palm() college() dam() workshop() parkingBg() hillDay() night() dayRoad()
             slopeBg() curveSign() burst() ground()
   - Props: key() note() coin() phoneG() stars() spark()
   - Carnival night: cast GUNDA GOON1-3 COP SI UNCLE MOM LOCALS[]; person opts fat(c) mundu(c) cap(c) cig bleed plaster tears
             activaRiders() sedan({door,heads,brake}) headBeam() ferrisWheel() tent() carnivalBg() nightRoad() clock()
             policeStation() stationInside() desk() register() firstAid() cellBars() fileStack() smoke() impact()
             grawlix() thought() speed()
   - Story files call add(start,end,(lt,d)=>({svg,html})) and define SUBS=[[t,"caption"],...]
   =================================================================== */

const W=1080,H=1920;
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const eo=t=>1-Math.pow(1-cl(t),3);
const eio=t=>{t=cl(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const eob=t=>{t=cl(t);if(t<=0)return 0;const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
const pr=(lt,a,b)=>cl((lt-a)/(b-a));
const pop=(lt,d=0,len=.35)=>eob(pr(lt,d,d+len));

// ---------- characters ----------
const ME={shirt:'#3a7bd5',pants:'#2b2f45',skin:'#c48659',hair:'#1a1a1a',style:'side'};
const SURESH={shirt:'#f4b400',pants:'#3b3b58',skin:'#b5784c',hair:'#121212',style:'short'};
const RAMESH={shirt:'#2fa36b',pants:'#283552',skin:'#a96c43',hair:'#1d1d1d',style:'spiky'};
const J1={shirt:'#ff7043',pants:'#263238',skin:'#bf8456',hair:'#141414',style:'spiky'};
const J2={shirt:'#8e5bd6',pants:'#37474f',skin:'#a5693f',hair:'#1b1b1b',style:'short'};
const DAD={shirt:'#ffffff',pants:'#e8e2d0',skin:'#b07448',hair:'#9e9e9e',style:'bald',mustache:true};

function hair(st,c){
  if(st==='spiky')return `<path d="M-66,-2 C-72,-60 -40,-78 -30,-70 L-24,-96 L-6,-74 L8,-100 L20,-74 L40,-94 L42,-66 C66,-58 72,-30 66,-2 C55,-34 30,-44 0,-42 C-30,-44 -55,-34 -66,-2Z" fill="${c}"/>`;
  if(st==='side')return `<path d="M-70,8 C-86,-70 -40,-110 10,-106 C62,-102 88,-66 70,6 C64,-22 54,-38 40,-44 C12,-48 -20,-38 -42,-30 C-56,-24 -66,-10 -70,8Z" fill="${c}"/><path d="M-30,-96 C-10,-70 20,-56 60,-50" stroke="rgba(255,255,255,.18)" stroke-width="6" fill="none"/>`;
  if(st==='long')return `<path d="M-70,10 C-86,-72 -46,-106 0,-106 C46,-106 86,-72 70,10 C66,-18 58,-34 44,-44 C26,-40 10,-48 0,-60 C-10,-48 -26,-40 -44,-44 C-58,-34 -66,-18 -70,10Z" fill="${c}"/><circle cx="-60" cy="34" r="6" fill="#ffd43b"/><circle cx="60" cy="34" r="6" fill="#ffd43b"/>`;
  if(st==='bald')return `<path d="M-66,0 C-70,-20 -60,-30 -56,-26 L-56,8Z M66,0 C70,-20 60,-30 56,-26 L56,8Z" fill="${c}"/>`;
  return `<path d="M-70,6 C-86,-72 -46,-106 0,-106 C46,-106 86,-72 70,6 C66,-20 58,-34 46,-42 C28,-32 -8,-30 -32,-44 C-50,-36 -64,-20 -70,6Z" fill="${c}"/><path d="M-40,-92 C-20,-100 20,-100 40,-92" stroke="rgba(255,255,255,.18)" stroke-width="6" fill="none"/>`;
}
function face(e){
  let s='';
  const eyesN=`<ellipse cx="-22" cy="-4" rx="7" ry="9" fill="#1a1a1a"/><ellipse cx="22" cy="-4" rx="7" ry="9" fill="#1a1a1a"/>`;
  const eyesBig=`<circle cx="-23" cy="-6" r="16" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="23" cy="-6" r="16" fill="#fff" stroke="#1a1a1a" stroke-width="3"/><circle cx="-23" cy="-5" r="6" fill="#1a1a1a"/><circle cx="23" cy="-5" r="6" fill="#1a1a1a"/>`;
  const bw=(a,b,c,d)=>`<path d="M${a} M${b}" />`;
  switch(e){
    case 'smile': s=eyesN+`<path d="M-24,22 Q0,46 24,22" stroke="#1a1a1a" stroke-width="6" fill="#7a2e1f" stroke-linejoin="round"/>`;break;
    case 'grin': s=`<path d="M-30,-4 Q-22,-14 -14,-4 M14,-4 Q22,-14 30,-4" stroke="#1a1a1a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-26,18 Q0,52 26,18Z" fill="#7a2e1f" stroke="#1a1a1a" stroke-width="5"/>`;break;
    case 'shock': s=eyesBig+`<path d="M-40,-36 L-12,-30 M40,-36 L12,-30" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/><ellipse cx="0" cy="34" rx="13" ry="18" fill="#5a1a10" stroke="#1a1a1a" stroke-width="4"/>`;break;
    case 'worry': s=eyesN+`<path d="M-38,-22 L-12,-32 M38,-22 L12,-32" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/><path d="M-20,34 Q0,22 20,34" stroke="#1a1a1a" stroke-width="6" fill="none" stroke-linecap="round"/>`;break;
    case 'sad': s=`<path d="M-30,-2 Q-22,6 -14,-2 M14,-2 Q22,6 30,-2" stroke="#1a1a1a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-38,-20 L-12,-30 M38,-20 L12,-30" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/><path d="M-18,34 Q0,24 18,34" stroke="#1a1a1a" stroke-width="6" fill="none" stroke-linecap="round"/>`;break;
    case 'angry': s=eyesN+`<path d="M-38,-30 L-10,-18 M38,-30 L10,-18" stroke="#1a1a1a" stroke-width="7" stroke-linecap="round"/><path d="M-20,36 Q0,24 20,36" stroke="#1a1a1a" stroke-width="7" fill="none" stroke-linecap="round"/>`;break;
    case 'serious': s=eyesN+`<path d="M-36,-24 L-12,-20 M36,-24 L12,-20" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/><path d="M-14,30 L14,30" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round"/>`;break;
    case 'think': s=`<ellipse cx="-20" cy="-10" rx="7" ry="9" fill="#1a1a1a"/><ellipse cx="24" cy="-10" rx="7" ry="9" fill="#1a1a1a"/><path d="M-12,30 Q4,36 18,26" stroke="#1a1a1a" stroke-width="6" fill="none" stroke-linecap="round"/>`;break;
    default: s=eyesN+`<path d="M-16,28 Q0,36 16,28" stroke="#1a1a1a" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}
// x,y = feet centre. la/ra arm angles (deg). 0 = hanging down. ra negative raises to the right, la positive raises to the left.
function person(c,o){
  const {x,y,s=1,expr='normal',la=8,ra=-8,flip=false,walk=null,headRot=0,bob=0,thumb=false,sweat=0,bleed=0,plaster=false,tears=-1}=o;
  const fw=c.fat||1,cig=o.cig??c.cig;
  const legA=walk===null?0:Math.sin(walk)*22;
  const arm=(sx,a,front)=>`<g transform="translate(${sx},-318) rotate(${a})"><rect x="-17" y="-6" width="34" height="150" rx="17" fill="${c.shirt}" stroke="rgba(0,0,0,.18)" stroke-width="3"/><rect x="-14" y="80" width="28" height="64" rx="14" fill="${c.skin}"/><circle cx="0" cy="150" r="19" fill="${c.skin}"/>${(front&&thumb)?`<rect x="-8" y="118" width="16" height="34" rx="8" fill="${c.skin}" transform="rotate(180 0 150)"/>`:''}</g>`;
  return `<g transform="translate(${x},${y+bob}) scale(${flip?-s:s},${s})">
   <g transform="translate(${-22*fw},-175) rotate(${legA})"><rect x="-19" y="0" width="38" height="170" rx="16" fill="${c.pants}"/><ellipse cx="-4" cy="170" rx="30" ry="13" fill="#222"/></g>
   <g transform="translate(${22*fw},-175) rotate(${-legA})"><rect x="-19" y="0" width="38" height="170" rx="16" fill="${c.pants}"/><ellipse cx="6" cy="170" rx="30" ry="13" fill="#222"/></g>
   ${c.mundu?`<path d="M${-62*fw},-190 L${62*fw},-190 L${70*fw},-22 L${-70*fw},-22Z" fill="${c.mundu}" stroke="rgba(0,0,0,.2)" stroke-width="4"/><rect x="${-70*fw}" y="-40" width="${140*fw}" height="12" fill="#d4a72c"/><path d="M${10*fw},-190 L${24*fw},-30" stroke="rgba(0,0,0,.15)" stroke-width="4"/>`:''}
   ${arm(-54*fw,la,false)}
   <rect x="${-68*fw}" y="-340" width="${136*fw}" height="${c.kurta?260:190}" rx="42" fill="${c.shirt}"/>
   <path d="M-22,-340 L0,-306 L22,-340Z" fill="${c.skin}"/>
   ${c.kurta?"":`<rect x="${-70*fw}" y="-180" width="${140*fw}" height="22" rx="8" fill="${c.mundu?"#5d4037":c.pants}"/>`}
   ${arm(54*fw,ra,true)}
   <rect x="-17" y="-372" width="34" height="38" fill="${c.skin}"/>
   <g transform="translate(0,-430) rotate(${headRot})">
     ${c.style==="long"?`<path d="M-74,-10 C-84,-96 84,-96 74,-10 L82,120 Q0,140 -82,120Z" fill="${c.hair}"/>`:""}<ellipse cx="-64" cy="2" rx="12" ry="18" fill="${c.skin}"/><ellipse cx="64" cy="2" rx="12" ry="18" fill="${c.skin}"/>
     <circle r="66" fill="${c.skin}"/>
     ${hair(c.style,c.hair)}
     ${c.mustache?'<path d="M-30,20 Q-14,8 0,16 Q14,8 30,20 Q14,28 0,22 Q-14,28 -30,20Z" fill="#555"/>':''}
     <circle cx="-38" cy="18" r="10" fill="#e07a5f" opacity=".25"/><circle cx="38" cy="18" r="10" fill="#e07a5f" opacity=".25"/>
     ${face(expr)}
     ${c.cap?`<path d="M-68,-48 C-72,-118 72,-118 68,-48Z" fill="${c.cap}" stroke="#1a1a1a" stroke-width="4"/><rect x="-72" y="-56" width="144" height="18" rx="6" fill="#3e3420"/><path d="M20,-42 L100,-38 Q86,-24 20,-30Z" fill="#1a1a1a"/><circle cx="0" cy="-80" r="12" fill="#ffd54f" stroke="#8d6e00" stroke-width="3"/>`:''}
     ${bleed>0?`<path d="M16,32 C12,${44+bleed*16} 16,${54+bleed*20} 22,${54+bleed*20} C28,${54+bleed*20} 30,${44+bleed*16} 16,32Z" fill="#d32f2f" stroke="#7f0000" stroke-width="2"/>`:''}
     ${plaster?`<rect x="6" y="20" width="38" height="18" rx="5" fill="#f2d0a9" stroke="#a1887f" stroke-width="3" transform="rotate(-18 25 29)"/>`:''}
     ${tears>=0?[-23,23].map(ex=>`<path d="M${ex-6},6 L${ex-10},${30+((tears*120)%60)} L${ex+4},${30+((tears*120)%60)} L${ex+6},6Z" fill="#7fd3ff" opacity=".9"/><circle cx="${ex-4}" cy="${40+((tears*120+20)%70)}" r="7" fill="#7fd3ff"/>`).join(''):''}
     ${cig?`<g transform="translate(14,34) rotate(12)"><rect x="0" y="-6" width="62" height="12" rx="3" fill="#fafafa" stroke="#555" stroke-width="2"/><rect x="0" y="-6" width="16" height="12" fill="#e0a060"/><rect x="56" y="-6" width="8" height="12" fill="#ff5722"/></g>`:''}
     ${sweat>0?`<path d="M74,-40 C64,-20 70,-6 80,-6 C90,-6 94,-20 74,-40Z" fill="#7fd3ff" stroke="#2b8fc7" stroke-width="3" opacity="${sweat}"/>`:''}
   </g></g>`;
}
// ---------- vehicles ----------
function wheel(cx,cy,r,rot){return `<g transform="translate(${cx},${cy}) rotate(${rot})"><circle r="${r}" fill="#1f1f1f"/><circle r="${r*.55}" fill="#9aa3ad"/><circle r="${r*.18}" fill="#444"/>${[0,72,144,216,288].map(a=>`<rect x="-3" y="${-r*.52}" width="6" height="${r*.5}" fill="#555" transform="rotate(${a})"/>`).join('')}</g>`}
function scooter(o){
  const {x,y,s=1,color='#d62828',trim='#ffffff',flip=false,rot=0,tilt=0}=o;
  return `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${flip?-s:s},${s})">
  <ellipse cx="0" cy="4" rx="230" ry="16" fill="rgba(0,0,0,.18)"/>
  ${wheel(-145,-50,50,rot)}${wheel(155,-50,50,rot)}
  <path d="M-225,-92 C-238,-175 -175,-205 -95,-200 L12,-194 C34,-150 24,-112 2,-96 Z" fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="4"/>
  <path d="M-200,-120 C-170,-150 -100,-160 -20,-150" stroke="${trim}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M-200,-205 C-178,-232 -40,-232 2,-206 L2,-192 L-200,-192 Z" fill="#1c1c1c"/>
  <rect x="-10" y="-112" width="120" height="24" rx="8" fill="#3a3a3a"/>
  <path d="M96,-96 L146,-96 C182,-172 184,-262 158,-336 L124,-336 C114,-256 104,-172 96,-96 Z" fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="4"/>
  <path d="M110,-84 Q158,-128 210,-84 Z" fill="${color}"/>
  <rect x="96" y="-372" width="80" height="18" rx="9" fill="#2a2a2a" transform="rotate(-12 136 -363)"/>
  <rect x="132" y="-352" width="16" height="30" fill="#2a2a2a"/>
  <ellipse cx="168" cy="-300" rx="14" ry="22" fill="#fff6b0" stroke="#333" stroke-width="3"/>
  <circle cx="-218" cy="-118" r="10" fill="#ff8a00"/>
  </g>`;
}
function bike(o){
  const {x,y,s=1,color='#1565c0',rot=0}=o;
  return `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="4" rx="240" ry="16" fill="rgba(0,0,0,.18)"/>
  ${wheel(-165,-60,60,rot)}${wheel(165,-60,60,rot)}
  <rect x="-60" y="-120" width="110" height="70" rx="12" fill="#555"/>
  <path d="M-170,-150 L-40,-170 L60,-170 L120,-140 L60,-120 L-150,-120Z" fill="${color}"/>
  <path d="M-20,-215 C30,-235 100,-225 120,-170 L-10,-165 Z" fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="4"/>
  <path d="M-170,-178 L-10,-190 L-10,-168 L-170,-160Z" fill="#1c1c1c"/>
  <path d="M120,-170 L165,-60" stroke="#888" stroke-width="12"/>
  <path d="M105,-250 L150,-240" stroke="#222" stroke-width="12" stroke-linecap="round"/>
  <line x1="128" y1="-245" x2="120" y2="-175" stroke="#222" stroke-width="10"/>
  <circle cx="160" cy="-200" r="18" fill="#fff6b0" stroke="#333" stroke-width="3"/>
  <path d="M-60,-70 L-210,-80" stroke="#999" stroke-width="12" stroke-linecap="round"/>
  </g>`;
}
function key(x,y,s,rot){return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><circle cx="-90" cy="0" r="46" fill="#f2c14e" stroke="#8a6d1d" stroke-width="6"/><circle cx="-90" cy="0" r="16" fill="#fff0" stroke="#8a6d1d" stroke-width="6"/><rect x="-46" y="-12" width="120" height="24" rx="6" fill="#d9dde2" stroke="#7a828c" stroke-width="4"/><path d="M20,12 L28,26 L40,12 L50,26 L60,12Z" fill="#d9dde2" stroke="#7a828c" stroke-width="3"/></g>`}
// ---------- backgrounds ----------
function sky(a='#7cc6f2',b='#d8f1ff'){return `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sk)"/>`}
function cloud(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})" fill="#fff" opacity=".9"><circle cx="0" cy="0" r="50"/><circle cx="55" cy="-20" r="60"/><circle cx="115" cy="0" r="48"/><rect x="0" y="0" width="115" height="48"/></g>`}
function palm(x,y,s,sw=0){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 C10,-120 -10,-260 20,-380" stroke="#8d6e4a" stroke-width="26" fill="none" stroke-linecap="round"/><g transform="translate(20,-380) rotate(${sw})">${[-150,-110,-60,-20,20,60].map(a=>`<path d="M0,0 C40,-30 110,-20 150,30 C100,0 50,0 0,0Z" fill="#2e8b3e" transform="rotate(${a})"/>`).join('')}<circle r="14" fill="#6b4f2a"/></g></g>`}
function college(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})">
 <rect x="-260" y="-230" width="520" height="230" fill="#f3e3c3" stroke="#c9b18a" stroke-width="5"/>
 <path d="M-290,-230 L-230,-310 L230,-310 L290,-230Z" fill="#c4452c"/>
 ${[-200,-110,-20,70,160].map(cx=>`<rect x="${cx}" y="-200" width="50" height="60" fill="#5d8aa8"/><rect x="${cx}" y="-110" width="50" height="60" fill="#5d8aa8"/>`).join('')}
 <rect x="-40" y="-90" width="80" height="90" fill="#7b4a2b"/>
 <rect x="-130" y="-290" width="260" height="50" rx="8" fill="#1f3c88"/>
 <text x="0" y="-253" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="36" fill="#fff">കോളേജ്</text></g>`}
function parkingBg(){return sky('#8fd0f5','#e3f5ff')+cloud(120,260,1)+cloud(700,380,.8)+
 `<rect x="0" y="900" width="${W}" height="400" fill="#e9dcc0"/><rect x="0" y="1180" width="${W}" height="30" fill="#c9b691"/>
 ${palm(90,1180,1.1,0)}${palm(1000,1180,1,0)}
 <rect x="0" y="1300" width="${W}" height="620" fill="#9aa0a6"/>
 ${[0,1,2,3,4,5].map(i=>`<rect x="${i*220-40}" y="1300" width="12" height="620" fill="#f5f5f5" opacity=".7" transform="skewX(-12)"/>`).join('')}`}
function ground(y,c='#9aa0a6'){return `<rect x="0" y="${y}" width="${W}" height="${H-y}" fill="${c}"/>`}
function stars(lt,cx,cy,r){return [0,1,2,3].map(i=>{const a=i*1.7+lt*2,o=.5+.5*Math.sin(lt*8+i*2);return `<path d="M0,-26 L7,-7 L26,0 L7,7 L0,26 L-7,7 L-26,0 L-7,-7Z" fill="#fff59d" opacity="${o}" transform="translate(${cx+Math.cos(a)*r},${cy+Math.sin(a)*r*.6}) scale(${.6+.6*o})"/>`}).join('')}
function burst(col1,col2,rot){let s=`<rect width="${W}" height="${H}" fill="${col1}"/><g transform="translate(540,900) rotate(${rot})">`;for(let i=0;i<24;i+=2){const a=i*15*Math.PI/180,b=(i+1)*15*Math.PI/180;s+=`<path d="M0,0 L${Math.cos(a)*2000},${Math.sin(a)*2000} L${Math.cos(b)*2000},${Math.sin(b)*2000}Z" fill="${col2}"/>`}return s+'</g>'}
function workshop(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})">
 <rect x="-230" y="-330" width="460" height="330" fill="#f0c987" stroke="#b38a4c" stroke-width="5"/>
 <rect x="-170" y="-210" width="340" height="210" fill="#5f6368"/>${[0,1,2,3,4,5,6].map(i=>`<rect x="-170" y="${-200+i*30}" width="340" height="5" fill="#80868b"/>`).join('')}
 <rect x="-210" y="-310" width="420" height="80" rx="10" fill="#c62828"/>
 <text x="0" y="-255" text-anchor="middle" font-family="Baloo Chettan 2" font-weight="800" font-size="46" fill="#fff">വർക്ക്‌ഷോപ്പ്</text>
 <g transform="translate(290,0)">${[0,1,2].map(i=>`<ellipse cx="0" cy="${-30-i*48}" rx="56" ry="26" fill="#222"/><ellipse cx="0" cy="${-30-i*48}" rx="24" ry="10" fill="#555"/>`).join('')}</g></g>`}

// ---------- html helpers ----------
const label=(t,lt,d=.12,o={})=>{return '';const sc=pop(lt,d,.4);if(sc<=0)return '';return `<div class="label" style="top:${o.top||230}px;transform:translateX(-50%) scale(${sc}) rotate(${o.r??-3}deg);${o.bg?`background:${o.bg};`:''}${o.fs?`font-size:${o.fs}px;`:''}${o.c?`color:${o.c};`:''}">${t}</div>`};
const bubble=(t,x,y,lt,d=0,side='l')=>{const sc=pop(lt,d,.35);if(sc<=0)return '';return `<div class="bubble ${side}" style="left:${x}px;bottom:${H-y}px;transform:scale(${sc})">${t}</div>`};

// ---------- scenes ----------
const SC=[];
const add=(s,e,f)=>SC.push({s,e,f});
const spark=(x,y,sc,c='#fff')=>`<path d="M0,-26 L7,-7 L26,0 L7,7 L0,26 L-7,7 L-26,0 L-7,-7Z" fill="${c}" stroke="#1a1a1a" stroke-width="3" transform="translate(${x},${y}) scale(${sc})"/>`;
let _rp=null;function roadPt(d,t){if(!_rp){const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('style','position:absolute;left:-9999px');_rp=document.createElementNS('http://www.w3.org/2000/svg','path');sv.appendChild(_rp);document.body.appendChild(sv);}_rp.setAttribute('d',d);return _rp.getPointAtLength(_rp.getTotalLength()*t);}
// ---------- PART 3 (Unplanned trip – part 1) ----------
const F1={shirt:'#f4b400',pants:'#3b3b58',skin:'#b5784c',hair:'#121212',style:'short'};
const F2={shirt:'#2fa36b',pants:'#283552',skin:'#a96c43',hair:'#1d1d1d',style:'spiky'};
const F3={shirt:'#8e5bd6',pants:'#37474f',skin:'#c68a5e',hair:'#151515',style:'side'};
const F4={shirt:'#ff7043',pants:'#263238',skin:'#bf8456',hair:'#141414',style:'short'};
const RIDER1={shirt:'#455a64',pants:'#212121',skin:'#a96c43',hair:'#111',style:'spiky'};
const RIDER2={shirt:'#c62828',pants:'#263238',skin:'#b5784c',hair:'#151515',style:'short'};
const SUVC='#2c6fbb';
function suv(o){
 const {x,y,s=1,color=SUVC,rot=0,flip=false,tilt=0,bent=false,flash=0,heads=0}=o;
 const hp=[[120,'#b5784c'],[45,'#c48659'],[-70,'#a96c43'],[-115,'#bf8456'],[-160,'#c68a5e']].slice(0,heads);
 const hd=hp.map(([hx,c])=>`<g transform="translate(${hx},-218)"><rect x="-22" y="10" width="44" height="30" rx="12" fill="#455a64"/><circle r="24" fill="${c}"/><path d="M-25,-2 C-28,-30 28,-30 25,-2 C18,-14 -18,-14 -25,-2Z" fill="#151515"/></g>`).join('');
 const wl=(cx,b)=>b?`<g transform="translate(${cx},-60) skewX(14) scale(.82,1)">${wheel(0,0,60,rot)}</g>`:wheel(cx,-60,60,rot);
 return `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${flip?-s:s},${s})">
 <ellipse cx="0" cy="4" rx="300" ry="18" fill="rgba(0,0,0,.2)"/>
 <path d="M-272,-72 L-272,-178 Q-270,-192 -252,-194 L-196,-196 L-158,-288 Q-152,-298 -136,-298 L112,-298 Q130,-298 142,-284 L204,-200 L252,-190 Q276,-184 279,-162 L282,-72 Q282,-56 266,-56 L-256,-56 Q-272,-56 -272,-72Z" fill="${color}" stroke="#1a1a1a" stroke-width="7" stroke-linejoin="round"/>
 <rect x="-150" y="-312" width="250" height="10" rx="5" fill="#1a1a1a"/>
 <path d="M-176,-200 L-142,-280 L-36,-280 L-36,-200Z" fill="#1d2b3a" stroke="#1a1a1a" stroke-width="4"/>
 <path d="M-20,-280 L106,-280 L132,-248 L178,-200 L-20,-200Z" fill="#1d2b3a" stroke="#1a1a1a" stroke-width="4"/>
 <clipPath id="wc${heads}"><path d="M-176,-200 L-142,-280 L-36,-280 L-36,-200Z M-20,-280 L106,-280 L132,-248 L178,-200 L-20,-200Z"/></clipPath><g clip-path="url(#wc${heads})">${hd}</g>
 <path d="M-160,-262 L-150,-270 M-6,-268 L20,-268" stroke="#fff" stroke-width="6" opacity=".35" stroke-linecap="round"/>
 <line x1="-28" y1="-200" x2="-28" y2="-80" stroke="#1a1a1a" stroke-width="4"/><rect x="-80" y="-176" width="30" height="8" rx="4" fill="#1a1a1a"/><rect x="40" y="-176" width="30" height="8" rx="4" fill="#1a1a1a"/>
 <rect x="-272" y="-96" width="554" height="22" fill="#263238" opacity=".85"/>
 <path d="M250,-176 Q266,-176 272,-160 L272,-146 L246,-148Z" fill="#fff6b0" stroke="#1a1a1a" stroke-width="4"/>
 <rect x="-272" y="-176" width="14" height="34" rx="4" fill="#e53935" stroke="#1a1a1a" stroke-width="3"/>
 <path d="M-245,-56 A80,80 0 0 1 -85,-56Z" fill="#1a1a1a"/><path d="M90,-56 A80,80 0 0 1 250,-56Z" fill="#1a1a1a"/>
 ${wl(-165,bent)}${wl(170,false)}
 ${flash>0?`<circle cx="-110" cy="-240" r="${40+flash*60}" fill="#fff" opacity="${flash}"/>`:''}
 </g>`;}
function autoR(o){const {x,y,s=1,rot=0,flip=false,pax=true}=o;
 const bust=(px,c,skin,tilt=0)=>`<g transform="translate(${px},-160) rotate(${tilt})"><rect x="-26" y="-70" width="52" height="74" rx="20" fill="${c}"/><circle cy="-96" r="26" fill="${skin}"/><path d="M-27,-100 C-30,-132 30,-132 27,-100 C20,-114 -20,-114 -27,-100Z" fill="#151515"/></g>`;
 return `<g transform="translate(${x},${y}) scale(${flip?-s:s},${s})">
 <ellipse cx="10" cy="6" rx="230" ry="16" fill="rgba(0,0,0,.2)"/>
 <path d="M-178,-320 Q-176,-350 -130,-352 L96,-352 Q150,-350 168,-312 L176,-262 L-178,-262Z" fill="#1f1f1f" stroke="#111" stroke-width="5"/>
 <rect x="-178" y="-266" width="14" height="140" fill="#1f1f1f"/>
 <rect x="-164" y="-262" width="250" height="110" fill="#fff8e1" opacity=".35"/>
 ${pax?bust(-120,F1.shirt,F1.skin)+bust(-58,RIDER1.shirt,RIDER1.skin,10)+bust(4,F4.shirt,F4.skin):''}
 ${pax?`<g transform="translate(120,-170)"><rect x="-22" y="-60" width="44" height="64" rx="18" fill="#795548"/><circle cy="-84" r="23" fill="#a1694a"/><path d="M-24,-88 C-26,-114 26,-114 24,-88 C18,-100 -18,-100 -24,-88Z" fill="#151515"/></g>`:''}
 <path d="M168,-312 Q206,-262 210,-180 L176,-180 L170,-262Z" fill="#9ed2f2" stroke="#1a1a1a" stroke-width="5"/>
 <path d="M-190,-60 L-190,-158 Q-190,-166 -180,-166 L120,-166 Q178,-166 214,-122 Q232,-96 230,-60Z" fill="#ffcc00" stroke="#1a1a1a" stroke-width="6" stroke-linejoin="round"/>
 <rect x="-190" y="-120" width="320" height="16" fill="#2e7d32"/>
 <path d="M210,-180 Q232,-150 230,-110" stroke="#1a1a1a" stroke-width="6" fill="none"/>
 <circle cx="226" cy="-128" r="12" fill="#fff6b0" stroke="#1a1a1a" stroke-width="4"/>
 <line x1="186" y1="-262" x2="214" y2="-292" stroke="#1a1a1a" stroke-width="5"/><ellipse cx="220" cy="-298" rx="12" ry="8" fill="#9ed2f2" stroke="#1a1a1a" stroke-width="4"/>
 <path d="M130,-60 Q170,-110 214,-60Z" fill="#1f1f1f"/>
 ${wheel(-120,-46,46,rot)}${wheel(172,-44,42,rot)}
 </g>`;}
function dam(x,y,sc){return `<g transform="translate(${x},${y}) scale(${sc})">
 <defs><linearGradient id="dmc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eceff1"/><stop offset="1" stop-color="#90a4ae"/></linearGradient>
 <linearGradient id="dmw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fc3f7"/><stop offset="1" stop-color="#0288d1"/></linearGradient></defs>
 <path d="M-330,-210 C-200,-300 -80,-260 0,-290 C120,-320 220,-270 330,-215 L330,-200 L-330,-200Z" fill="#43a047"/>
 <rect x="-300" y="-212" width="600" height="26" rx="6" fill="url(#dmw)"/>
 <path d="M-270,0 L-232,-196 Q0,-210 232,-196 L270,0 Q0,16 -270,0Z" fill="url(#dmc)" stroke="#37474f" stroke-width="6" stroke-linejoin="round"/>
 <rect x="-246" y="-216" width="492" height="22" rx="4" fill="#78909c" stroke="#37474f" stroke-width="5"/>
 ${[-200,-160,-120,-80,-40,0,40,80,120,160,200].map(px=>`<rect x="${px-3}" y="-236" width="6" height="22" fill="#455a64"/>`).join('')}<rect x="-246" y="-238" width="492" height="5" fill="#455a64"/>
 ${[-150,-75,0,75,150].map(gx=>`<path d="M${gx-26},-194 L${gx-26},-150 Q${gx},-168 ${gx+26},-150 L${gx+26},-194Z" fill="#546e7a" stroke="#37474f" stroke-width="4"/>
   <path d="M${gx-20},-150 C${gx-24},-100 ${gx-30},-50 ${gx-34},0 L${gx+34},0 C${gx+30},-50 ${gx+24},-100 ${gx+20},-150Z" fill="#b3e5fc" opacity=".9"/>
   <path d="M${gx-8},-145 C${gx-10},-100 ${gx-12},-50 ${gx-14},-5" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/>`).join('')}
 ${[-170,-90,0,90,170].map(fx=>`<ellipse cx="${fx}" cy="4" rx="54" ry="18" fill="#fff" opacity=".9"/>`).join('')}
 <path d="M-120,10 C-80,80 80,80 120,10 L170,140 L-170,140Z" fill="url(#dmw)" opacity=".9"/>
 </g>`}
const hillDay=()=>sky()+cloud(80,280,1)+cloud(700,220,.8)+`<path d="M0,1100 C300,900 760,880 1080,1050 L1080,1920 L0,1920Z" fill="#5fae4e"/>`+palm(110,1180,1,0)+palm(980,1150,.9,0);
function curveSign(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-8" y="0" width="16" height="320" fill="#78909c"/><g transform="rotate(45)"><rect x="-110" y="-110" width="220" height="220" rx="18" fill="#ffd43b" stroke="#1a1a1a" stroke-width="10"/></g><path d="M-40,60 C-40,0 40,10 40,-50 L40,-60" stroke="#1a1a1a" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M14,-46 L40,-86 L66,-46Z" fill="#1a1a1a"/></g>`}
function riders(bx,by,s,lt){ // bike going left with two riders
 return `<g transform="translate(${bx},${by}) scale(-1,1)">${person(RIDER2,{x:-70,y:-70,s:.62*s,expr:'grin',ra:-60})}${person(RIDER1,{x:40,y:-70,s:.62*s,expr:'grin',ra:-80,la:-70})}${bike({x:0,y:0,s:.85*s,color:'#e53935',rot:lt*900})}</g>`;}
const slopeBg=(ang,off,fill='#6cbf57')=>`<g transform="translate(540,1300) rotate(${ang})"><rect x="-1600" y="0" width="3200" height="1500" fill="${fill}"/><rect x="-1600" y="30" width="3200" height="150" fill="#8d8a80"/><rect x="-1600" y="100" width="3200" height="8" fill="#fff" opacity=".7" stroke-dasharray="40 40"/>${[...Array(6)].map((_,i)=>palm(-1300+(((i*420)+off)%2520+2520)%2520,0,.8,0)).join('')}</g>`;


// ---------- extra library pieces (phone, cash, lorry, night) ----------
const GIRL={shirt:'#e91e63',pants:'#f8bbd0',skin:'#c68a5e',hair:'#111',style:'long',kurta:true};
const FRIEND={shirt:'#00897b',pants:'#263238',skin:'#b5784c',hair:'#151515',style:'side'};
const TEASER={shirt:'#6d4c41',pants:'#212121',skin:'#a96c43',hair:'#141414',style:'spiky'};
const BRO={shirt:'#607d8b',pants:'#263238',skin:'#b5784c',hair:'#151515',style:'side'};
const DRV={shirt:'#eceff1',pants:'#6d4c41',skin:'#9c6644',hair:'#1a1a1a',style:'short',mustache:true};
const KID1={shirt:'#ffeb3b',pants:'#1565c0',skin:'#a96c43',hair:'#151515',style:'spiky'};
const KID2={shirt:'#e91e63',pants:'#263238',skin:'#bf8456',hair:'#151515',style:'short'};
const KID3={shirt:'#00bcd4',pants:'#37474f',skin:'#b5784c',hair:'#151515',style:'side'};
const GANG=[[F1,0],[F2,1],[ME,2],[F3,3],[F4,4]];
const note=(x,y,r=0,sc=1,c='#81c784')=>`<g transform="translate(${x},${y}) rotate(${r}) scale(${sc})"><rect x="-90" y="-44" width="180" height="88" rx="8" fill="${c}" stroke="#1b5e20" stroke-width="5"/><circle r="24" fill="none" stroke="#2e7d32" stroke-width="5"/><rect x="-72" y="-30" width="144" height="60" rx="4" fill="none" stroke="#2e7d32" stroke-width="3"/></g>`;
const coin=(x,y,sc=1)=>`<g transform="translate(${x},${y}) scale(${sc})"><circle r="22" fill="#ffd54f" stroke="#a1887f" stroke-width="5"/><circle r="12" fill="none" stroke="#bf9b30" stroke-width="3"/></g>`;
const phoneG=(x,y,sc,lt,ring=true)=>`<g transform="translate(${x},${y}) scale(${sc}) rotate(${ring?Math.sin(lt*40)*6:0})"><rect x="-40" y="-72" width="80" height="144" rx="14" fill="#222"/><rect x="-32" y="-60" width="64" height="108" rx="6" fill="#4fc3f7"/></g>${ring?[0,1,2].map(i=>{const t=(lt*1.5+i/3)%1;return `<path d="M${x+55*sc+t*50},${y-50-t*25} q${25+t*25},${50+t*25} 0,${100+t*50}" stroke="#ffd43b" stroke-width="9" fill="none" stroke-linecap="round" opacity="${1-t}"/>`}).join(''):''}`;
function towTruck(o){const {x,y,s=1,rot=0,car=true,carLift=1,heads=5,lights=false}=o;
 const cy=lerp(260,0,carLift);
 return `<g transform="translate(${x},${y}) scale(${s})">
 <ellipse cx="40" cy="6" rx="470" ry="20" fill="rgba(0,0,0,.25)"/>
 ${car?`<g transform="translate(-60,${-150+cy}) rotate(${(1-carLift)*-9})">${suv({x:0,y:0,s:.82,heads,bent:true})}</g>`:''}
 <rect x="-330" y="-152" width="560" height="34" rx="6" fill="#78909c" stroke="#1a1a1a" stroke-width="6"/>
 <rect x="-330" y="-122" width="560" height="40" fill="#37474f"/>
 <path d="M230,-82 L230,-300 Q232,-318 252,-320 L350,-320 Q380,-318 395,-290 L430,-210 Q445,-200 445,-180 L445,-82Z" fill="#f57c00" stroke="#1a1a1a" stroke-width="7" stroke-linejoin="round"/>
 <path d="M262,-300 L348,-300 L390,-212 L262,-212Z" fill="#1d2b3a" stroke="#1a1a1a" stroke-width="4"/>
 <rect x="440" y="-170" width="16" height="40" rx="4" fill="${lights?'#fff59d':'#fff6b0'}" stroke="#1a1a1a" stroke-width="3"/>
 ${lights?`<path d="M456,-150 L760,-230 L760,-60Z" fill="#fff59d" opacity=".25"/>`:''}
 <rect x="236" y="-120" width="210" height="14" fill="#263238"/>
 ${wheel(-250,-56,56,rot)}${wheel(-120,-56,56,rot)}${wheel(360,-56,56,rot)}
 </g>`;}
const night=(lt=0)=>`<defs><linearGradient id="ng" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1033"/><stop offset="1" stop-color="#2a1f6e"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#ng)"/>`+
 `<g transform="translate(860,260)"><circle r="70" fill="#fff6c8"/><circle cx="28" cy="-18" r="62" fill="#14123a"/></g>`+
 [...Array(26)].map((_,i)=>`<circle cx="${(i*197)%1080}" cy="${60+(i*131)%760}" r="${2+(i%3)}" fill="#fff" opacity="${.4+.5*Math.abs(Math.sin(lt*2+i))}"/>`).join('')+
 `<path d="M0,1180 C200,1100 400,1120 560,1160 C760,1100 900,1110 1080,1150 L1080,1920 L0,1920Z" fill="#1b1340"/>`+
 [...Array(6)].map((_,i)=>palm(80+i*190,1220,.6,0).replace(/#2e8b3e/g,'#0e0a24').replace(/#8d6e4a/g,'#0e0a24').replace(/#6b4f2a/g,'#0e0a24')).join('')+
 `<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/><rect x="0" y="1520" width="${W}" height="10" fill="#fff" opacity=".35"/>`;
const dayRoad=()=>sky()+cloud(120,260,1)+cloud(700,380,.8)+`<path d="M0,1150 C300,1000 760,980 1080,1120 L1080,1920 L0,1920Z" fill="#6cbf57"/>`+palm(90,1250,1,0)+palm(990,1230,.9,0)+`<rect x="0" y="1350" width="${W}" height="250" fill="#8d8a80"/><rect x="0" y="1468" width="${W}" height="10" fill="#fff" opacity=".7"/>`;


// ---------- Carnival night pieces (gunda, police, carnival, sedan) ----------
const ACTIVA={color:'#f1f3f4',trim:'#90a4ae'};               // the narrator's white Activa
const GUNDA={shirt:'#3e2723',pants:'#212121',skin:'#8d5a3b',hair:'#111',style:'short',mustache:true,fat:1.45,cig:true};
const GOON1={shirt:'#b71c1c',pants:'#263238',skin:'#a1694a',hair:'#111',style:'spiky'};
const GOON2={shirt:'#37474f',pants:'#1b1b1b',skin:'#9c6644',hair:'#151515',style:'short'};
const GOON3={shirt:'#fafafa',pants:'#fafafa',skin:'#a96c43',hair:'#151515',style:'side',mundu:'#f7f3e8',mustache:true};
const COP={shirt:'#b89b5e',pants:'#a88b50',skin:'#a5693f',hair:'#151515',style:'short',mustache:true,cap:'#8a7442'};
const SI={shirt:'#c2a46b',pants:'#ab8f55',skin:'#b07448',hair:'#151515',style:'short',mustache:true,cap:'#6d5a2e',fat:1.15};
const UNCLE={shirt:'#e3f2fd',pants:'#37474f',skin:'#a9714b',hair:'#bdbdbd',style:'side',mustache:true};
const MOM={shirt:'#7b1fa2',pants:'#ce93d8',skin:'#b5784c',hair:'#111',style:'long',kurta:true};
const LOCALS=[{shirt:'#5d4037',pants:'#efebe9',skin:'#9c6644',hair:'#9e9e9e',style:'bald',mustache:true,mundu:'#efebe9'},
 {shirt:'#00695c',pants:'#263238',skin:'#b5784c',hair:'#151515',style:'short'},
 {shirt:'#f9a825',pants:'#3e2723',skin:'#a96c43',hair:'#111',style:'spiky'},
 {shirt:'#455a64',pants:'#f5f5f5',skin:'#bf8456',hair:'#151515',style:'side',mundu:'#f5f5f5'}];
// two friends on the Activa, facing right: F1 drives, ME behind
function activaRiders(o){const {x,y,s=1,rot=0,tilt=0,me='normal',f1='normal',mera=-20,f1ra=-75,meFlip=false,meBleed=0}=o;
 return `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${s})">${person(ME,{x:-120,y:-60,s:.62,expr:me,ra:mera,la:10,flip:meFlip,bleed:meBleed})}${person(F1,{x:-10,y:-60,s:.62,expr:f1,ra:f1ra,la:-60})}${scooter({x:0,y:0,s:1,color:ACTIVA.color,trim:ACTIVA.trim,rot})}</g>`;}
// low four-door car, facing right. door: 0 shut .. 1 open (front door). heads: silhouettes inside
function sedan(o){const {x,y,s=1,color='#4a1515',rot=0,tilt=0,door=0,heads=0,brake=false}=o;
 const hd=[[60,'#8d5a3b'],[-80,'#a1694a'],[-150,'#9c6644'],[-20,'#a96c43']].slice(0,heads).map(([hx,c])=>`<g transform="translate(${hx},-196)"><circle r="26" fill="${c}"/><path d="M-27,-2 C-30,-32 30,-32 27,-2 C20,-14 -20,-14 -27,-2Z" fill="#111"/></g>`).join('');
 return `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${s})">
 <ellipse cx="0" cy="4" rx="320" ry="18" fill="rgba(0,0,0,.25)"/>
 <path d="M-300,-70 L-300,-140 Q-298,-160 -270,-164 L-170,-172 L-110,-248 Q-100,-258 -84,-258 L70,-258 Q88,-258 100,-246 L170,-172 L268,-160 Q300,-154 304,-126 L306,-70 Q306,-56 290,-56 L-286,-56 Q-300,-56 -300,-70Z" fill="${color}" stroke="#1a1a1a" stroke-width="7" stroke-linejoin="round"/>
 <path d="M-156,-172 L-104,-240 L-14,-240 L-14,-172Z M2,-240 L84,-240 L146,-172 L2,-172Z" fill="#1d2b3a" stroke="#1a1a1a" stroke-width="4"/>
 <clipPath id="sdw"><path d="M-156,-172 L-104,-240 L-14,-240 L-14,-172Z M2,-240 L84,-240 L146,-172 L2,-172Z"/></clipPath><g clip-path="url(#sdw)">${hd}</g>
 <path d="M-120,-228 L-108,-236 M14,-228 L40,-228" stroke="#fff" stroke-width="6" opacity=".3" stroke-linecap="round"/>
 <line x1="-6" y1="-172" x2="-6" y2="-70" stroke="#1a1a1a" stroke-width="4"/><rect x="-70" y="-150" width="30" height="8" rx="4" fill="#1a1a1a"/><rect x="60" y="-150" width="30" height="8" rx="4" fill="#1a1a1a"/>
 ${door>0?`<path d="M-2,-172 L146,-172 L150,-72 L-2,-72Z" fill="#111"/><path d="M146,-172 L${146+door*70},${-182-door*6} L${150+door*70},${-62+door*6} L150,-72Z" fill="${color}" stroke="#1a1a1a" stroke-width="6" stroke-linejoin="round"/>`:''}
 <rect x="-300" y="-110" width="606" height="16" fill="rgba(0,0,0,.25)"/>
 <path d="M282,-150 Q300,-148 302,-132 L276,-130Z" fill="#fff6b0" stroke="#1a1a1a" stroke-width="4"/>
 <rect x="-300" y="-150" width="16" height="26" rx="4" fill="${brake?'#ff1744':'#c62828'}" stroke="#1a1a1a" stroke-width="3"/>${brake?`<circle cx="-300" cy="-137" r="40" fill="#ff1744" opacity=".35"/>`:''}
 <path d="M-250,-56 A72,72 0 0 1 -106,-56Z M110,-56 A72,72 0 0 1 254,-56Z" fill="#1a1a1a"/>
 ${wheel(-178,-52,56,rot)}${wheel(182,-52,56,rot)}
 </g>`;}
function headBeam(x,y,len=700,op=.22){return `<path d="M${x},${y-10} L${x+len},${y-120} L${x+len},${y+90} L${x},${y+14}Z" fill="#fff59d" opacity="${op}"/>`}
function ferrisWheel(x,y,s,lt){const n=10;let g='';for(let i=0;i<n;i++){const a=i*2*Math.PI/n+lt*.25;const px=Math.cos(a)*300,py=Math.sin(a)*300;
  g+=`<line x1="0" y1="0" x2="${px}" y2="${py}" stroke="#ffcc80" stroke-width="6"/><g transform="translate(${px},${py})"><path d="M-30,0 L30,0 L24,46 L-24,46Z" fill="${['#e53935','#ffd43b','#43a047','#1e88e5','#8e24aa'][i%5]}" stroke="#1a1a1a" stroke-width="4"/></g>`;}
 const bulbs=[...Array(24)].map((_,i)=>{const a=i*Math.PI/12+lt*.25;return `<circle cx="${Math.cos(a)*300}" cy="${Math.sin(a)*300}" r="9" fill="#fff59d" opacity="${.5+.5*Math.sin(lt*6+i)}"/>`}).join('');
 return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 L-200,520 M40,0 L200,520" stroke="#90a4ae" stroke-width="22"/><circle r="300" fill="none" stroke="#ffb74d" stroke-width="14"/>${g}${bulbs}<circle r="34" fill="#ffb74d" stroke="#1a1a1a" stroke-width="6"/></g>`;}
function tent(x,y,s,c1='#e53935',c2='#fff'){return `<g transform="translate(${x},${y}) scale(${s})">${[...Array(6)].map((_,i)=>`<path d="M0,-300 L${-240+i*80},0 L${-160+i*80},0Z" fill="${i%2?c2:c1}" stroke="#1a1a1a" stroke-width="4"/>`).join('')}<rect x="-240" y="0" width="480" height="40" fill="${c1}" stroke="#1a1a1a" stroke-width="4"/><rect x="-6" y="-340" width="12" height="44" fill="#1a1a1a"/><path d="M6,-340 L60,-326 L6,-312Z" fill="#ffd43b"/></g>`}
const bulbString=(y,lt,amp=40)=>[...Array(14)].map((_,i)=>{const x=i*80+20;return `<circle cx="${x}" cy="${y+Math.sin(i/13*Math.PI)*amp}" r="11" fill="${['#ffd43b','#ff5252','#69f0ae','#40c4ff'][i%4]}" opacity="${.55+.45*Math.sin(lt*5+i*1.3)}"/>`}).join('')+`<path d="M20,${y} Q540,${y+amp*2} 1060,${y}" stroke="#333" stroke-width="3" fill="none"/>`;
function carnivalBg(lt){return `<defs><linearGradient id="cng" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140d3a"/><stop offset="1" stop-color="#4a1e6e"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#cng)"/>`+
 [...Array(20)].map((_,i)=>`<circle cx="${(i*197)%1080}" cy="${50+(i*131)%520}" r="${2+(i%3)}" fill="#fff" opacity="${.4+.5*Math.abs(Math.sin(lt*2+i))}"/>`).join('')+
 ferrisWheel(760,820,1,lt)+tent(250,1300,1.1)+tent(880,1340,.8,'#1e88e5','#ffd43b')+`<rect x="0" y="1340" width="${W}" height="580" fill="#2b2140"/>`+bulbString(560,lt)+bulbString(1100,lt+1,30);}
const nightRoad=(lt,off=0)=>night(lt)+[...Array(4)].map((_,i)=>`<g transform="translate(${((i*360-off)%1440+1440)%1440-180},1300)"><rect x="-6" y="-360" width="12" height="360" fill="#263238"/><path d="M0,-360 L60,-360" stroke="#263238" stroke-width="12"/><circle cx="60" cy="-350" r="16" fill="#fff59d"/><path d="M60,-350 L-10,0 L130,0Z" fill="#fff59d" opacity=".08"/></g>`).join('')+`<rect x="0" y="1520" width="${W}" height="10" fill="#fff" opacity=".35" stroke-dasharray="60 60"/>`;
function clock(x,y,s,h=12.5,lt=0){const ma=(h%1)*360,ha=(h%12)*30;return `<g transform="translate(${x},${y}) scale(${s})"><circle r="150" fill="#fffde7" stroke="#1a1a1a" stroke-width="14"/>${[...Array(12)].map((_,i)=>`<rect x="-5" y="-136" width="10" height="${i%3?18:30}" fill="#1a1a1a" transform="rotate(${i*30})"/>`).join('')}<rect x="-8" y="-80" width="16" height="86" rx="8" fill="#1a1a1a" transform="rotate(${ha})"/><rect x="-5" y="-120" width="10" height="126" rx="5" fill="#e53935" transform="rotate(${ma})"/><circle r="14" fill="#1a1a1a"/></g>`}
function policeStation(x,y,s,lt=0){const bl=Math.floor(lt*4)%2;return `<g transform="translate(${x},${y}) scale(${s})">
 <rect x="-320" y="-360" width="640" height="360" fill="#fff3e0" stroke="#8d6e63" stroke-width="6"/><rect x="-340" y="-400" width="680" height="50" fill="#c62828" stroke="#1a1a1a" stroke-width="5"/>
 <rect x="-340" y="-350" width="680" height="16" fill="#1565c0"/>
 ${[-250,-150,150,250].map(cx=>`<rect x="${cx-34}" y="-290" width="68" height="90" fill="#5d8aa8" stroke="#6d4c41" stroke-width="5"/>`).join('')}
 <rect x="-70" y="-230" width="140" height="230" fill="#1565c0" stroke="#0d47a1" stroke-width="6"/><circle cx="40" cy="-110" r="8" fill="#ffd43b"/>
 <rect x="-8" y="-470" width="16" height="72" fill="#455a64"/><rect x="-44" y="-500" width="40" height="32" rx="8" fill="${bl?'#ff1744':'#b71c1c'}"/><rect x="4" y="-500" width="40" height="32" rx="8" fill="${bl?'#0d47a1':'#2979ff'}"/>
 ${bl?`<circle cx="-24" cy="-484" r="50" fill="#ff1744" opacity=".25"/>`:`<circle cx="24" cy="-484" r="50" fill="#2979ff" opacity=".25"/>`}</g>`}
const stationInside=()=>`<rect width="${W}" height="${H}" fill="#f3e5c0"/><rect x="0" y="0" width="${W}" height="120" fill="#e0cfa0"/><rect x="0" y="1330" width="${W}" height="590" fill="#a1887f"/><rect x="0" y="1320" width="${W}" height="20" fill="#6d4c41"/>`+
 `<rect x="120" y="420" width="260" height="190" fill="#5d8aa8" stroke="#6d4c41" stroke-width="10"/><line x1="250" y1="420" x2="250" y2="610" stroke="#6d4c41" stroke-width="8"/>`+
 `<g transform="translate(820,500)"><rect x="-90" y="-110" width="180" height="220" rx="10" fill="#fff" stroke="#8d6e63" stroke-width="8"/><circle cy="-10" r="56" fill="#c62828"/><circle cy="-10" r="36" fill="#ffd43b"/></g>`;
function desk(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-260" y="-30" width="520" height="40" rx="6" fill="#795548" stroke="#3e2723" stroke-width="6"/><rect x="-240" y="10" width="40" height="230" fill="#5d4037"/><rect x="200" y="10" width="40" height="230" fill="#5d4037"/><rect x="-200" y="10" width="400" height="150" fill="#6d4c41"/></g>`}
function register(x,y,s,lt,write=true){const p=write?(lt*1.6)%1:0;return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-170,-10 L0,-30 L170,-10 L170,10 L0,-8 L-170,10Z" fill="#fff" stroke="#555" stroke-width="5"/>${[0,1,2].map(i=>`<path d="M${-150+i*5},${-4-i*6} L-20,${-20-i*6}" stroke="#90caf9" stroke-width="3"/>`).join('')}${write?`<path d="M20,-20 ${[...Array(8)].map((_,i)=>`L${20+i*15*Math.min(1,p*1.2)},${-24+(i%2?-8:6)}`).join(' ')}" stroke="#1a237e" stroke-width="4" fill="none"/><g transform="translate(${30+p*110},-40) rotate(30)"><rect x="-6" y="-70" width="12" height="70" fill="#1565c0"/><path d="M-6,0 L6,0 L0,14Z" fill="#1a1a1a"/></g>`:''}</g>`}
function firstAid(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-60" width="180" height="120" rx="16" fill="#fff" stroke="#c62828" stroke-width="8"/><rect x="-14" y="-40" width="28" height="80" fill="#e53935"/><rect x="-40" y="-14" width="80" height="28" fill="#e53935"/><rect x="-30" y="-80" width="60" height="24" rx="8" fill="none" stroke="#c62828" stroke-width="8"/></g>`}
function cellBars(x0,x1,y0,y1,op=1){let s=`<g opacity="${op}"><rect x="${x0}" y="${y0}" width="${x1-x0}" height="26" fill="#455a64" stroke="#1a1a1a" stroke-width="5"/><rect x="${x0}" y="${y1-26}" width="${x1-x0}" height="26" fill="#455a64" stroke="#1a1a1a" stroke-width="5"/>`;for(let x=x0+30;x<x1;x+=90)s+=`<rect x="${x-10}" y="${y0}" width="20" height="${y1-y0}" rx="8" fill="#78909c" stroke="#1a1a1a" stroke-width="4"/>`;return s+'</g>'}
function fileStack(x,y,s,n,lt=0){let g='';for(let i=0;i<n;i++){const c=['#ffcc80','#ffe0b2','#bcaaa4','#ffd180'][i%4];g+=`<g transform="translate(${((i*37)%22)-11},${-i*26}) rotate(${((i*53)%7)-3})"><rect x="-130" y="-24" width="260" height="26" rx="4" fill="${c}" stroke="#6d4c41" stroke-width="4"/><rect x="-40" y="-20" width="80" height="6" fill="#8d6e63"/></g>`;}return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`}
const smoke=(x,y,lt,sc=1)=>[0,1,2].map(i=>{const t=(lt*.8+i/3)%1;return `<circle cx="${x+Math.sin(t*6+i)*14*sc}" cy="${y-t*120*sc}" r="${(10+t*26)*sc}" fill="#cfd8dc" opacity="${(1-t)*.7}"/>`}).join('');
const impact=(x,y,sc,c='#ffd43b')=>`<path d="M0,-30 L22,-80 L28,-26 L84,-40 L40,0 L86,46 L26,30 L18,86 L-6,34 L-60,70 L-34,14 L-90,-6 L-34,-24 L-50,-86Z" fill="${c}" stroke="#1a1a1a" stroke-width="6" transform="translate(${x},${y}) scale(${sc})"/>`;
const grawlix=(x,y,sc,lt)=>`<g transform="translate(${x},${y}) scale(${sc})"><path d="M-170,-90 Q-180,-150 -100,-150 L100,-150 Q180,-150 170,-90 L170,-20 Q170,30 100,30 L-20,30 L-80,90 L-60,30 L-100,30 Q-170,30 -170,-20Z" fill="#fff" stroke="#1a1a1a" stroke-width="7"/><path d="M-120,-60 l20,-30 l20,30 l20,-30 l20,30" stroke="#e53935" stroke-width="9" fill="none" stroke-linejoin="round"/><path d="M20,-88 m-22,0 a22,22 0 1,0 44,0 a22,22 0 1,0 -44,0 M10,-76 L40,-46" stroke="#1a1a1a" stroke-width="8" fill="none" transform="rotate(${Math.sin(lt*20)*8} 20 -70)"/>${spark(110,-70,.9,'#ffd43b')}</g>`;
const thought=(x,y,sc,inner)=>`<g transform="translate(${x},${y}) scale(${sc})"><circle cx="-180" cy="250" r="16" fill="#fff" stroke="#333" stroke-width="5"/><circle cx="-140" cy="200" r="26" fill="#fff" stroke="#333" stroke-width="5"/><path d="M-300,0 C-350,-150 -200,-270 -50,-230 C10,-330 250,-320 280,-200 C390,-180 400,0 300,60 C330,170 180,240 70,190 C0,260 -190,250 -220,170 C-350,190 -390,60 -300,0Z" fill="#fff" stroke="#333" stroke-width="8"/>${inner}</g>`;
const speed=(x,y,n=3,lt=0,len=140)=>[...Array(n)].map((_,i)=>`<rect x="${x-((lt*900+i*130)%260)}" y="${y+i*50}" width="${len}" height="10" rx="5" fill="#fff" opacity=".75"/>`).join('');


window.render=function(t){
  const sc=SC.find(s=>t>=s.s&&t<s.e)||SC[SC.length-1];
  const lt=t-sc.s,d=sc.e-sc.s;
  const r=sc.f(lt,d);
  const zin=1+0.04*(1-eo(pr(lt,0,.3)));
  const fade=1-pr(lt,0,.12);
  const sub=subAt(t);
  document.getElementById('stage').innerHTML=
   `<div style="position:absolute;inset:0;transform:scale(${zin})"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${r.svg}</svg>${r.html||''}</div>`+
   (sub?`<div class="sub"><span>${sub}</span></div>`:'')+
   `<div class="vig" style="background:radial-gradient(ellipse at center,rgba(0,0,0,0) 60%,rgba(0,0,0,.35) 100%)"></div>`+
   (fade>0?`<div class="vig" style="background:#000;opacity:${fade*.6}"></div>`:'');
};
window.SCENES=SC.map(s=>[s.s,s.e]);

