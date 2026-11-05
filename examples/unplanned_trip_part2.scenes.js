add(0,3.4,(lt,d)=>{
 const x=lerp(-700,500,eo(pr(lt,0,1.3)));
 return {svg:`<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#tg)"/><g transform="translate(${x},1400) scale(.62)">${towTruck({x:0,y:0,rot:lt*500*(1-pr(lt,0,1.3)),heads:5})}</g>`,
  html:`<div class="big" style="top:500px;font-size:100px;line-height:1.15;color:#fff;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,.15,.45)})">അൺപ്ലാൻഡ് ട്രിപ്പ്...</div><div class="big" style="top:640px;font-size:76px;line-height:1.15;color:#ffd43b;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,1.0,.45)})">അൺപ്ലാൻഡ് എക്സ്പീരിയൻസ്!</div><div class="big" style="top:820px;font-size:64px;transform:scale(${pop(lt,2.35,.4)})"><span style="background:#ff5d73;color:#fff;padding:6px 30px;border-radius:24px;border:6px solid #1a1a1a">പാർട്ട് 2</span></div>`};
});
add(3.4,6.9,(lt,d)=>({ // stuck with the bent car
 svg:dayRoad()+suv({x:720,y:1560,s:.8,bent:true})+GANG.map(([c,i])=>person(c,{x:90+i*110,y:1720+(i%2)*20,s:.62,expr:i===2?'worry':(i%2?'sad':'worry'),headRot:Math.sin(lt*2+i)*6,sweat:i===2?1:0,la:i===4?150:8,ra:i===4?-150:-8})).join(''),html:''}));
add(6.9,10.9,(lt,d)=>{ // call brother -> brother calls service centre -> pickup ready
 const split=lt>1.45;
 return {svg:`<rect width="${W}" height="${H}" fill="#bbdefb"/>`+(split?`<rect x="0" y="960" width="${W}" height="960" fill="#ffe0b2"/><rect x="0" y="952" width="${W}" height="16" fill="#1a1a1a"/>`:'')+
  `<clipPath id="tophalf"><rect x="0" y="0" width="1080" height="${split?952:1920}"/></clipPath><g clip-path="url(#tophalf)"><g transform="translate(0,${split?-730:0})">${person(ME,{x:360,y:1820,s:1.1,expr:'worry',ra:-160})}${phoneG(452,1330,.6,lt,!split)}</g></g>`+
  (split?`${person(BRO,{x:330,y:1900,s:.95,expr:'serious',ra:-160})}${phoneG(412,1475,.55,lt,true)}<g transform="translate(790,1480) scale(${.34*pop(lt,2.4,.4)})">${towTruck({x:0,y:0,car:false})}</g>${lt>2.6?spark(790,1300,1.2,'#ffd43b'):''}`:''),html:''};
});
add(10.9,14.6,(lt,d)=>{ // but... 5000 to the driver
 const n=Math.min(5,Math.floor(pr(lt,.9,2.4)*5+.0001)+(lt>.9?1:0));
 return {svg:`<rect width="${W}" height="${H}" fill="#2e7d32"/><circle cx="540" cy="1000" r="460" fill="#43a047"/>`+
  [...Array(Math.min(5,n))].map((_,i)=>note(540+(i-2)*30,1180-i*70,(i%2?6:-6),1.6*pop(lt,.9+i*.3,.25))).join('')+
  person(DRV,{x:880,y:1840,s:.8,expr:'serious',ra:-60}),html:''};
});
add(14.6,20.7,(lt,d)=>{ // pooling the money
 const p4=lt>.15,p8=lt>1.4,p2=lt>3.15;
 let svg=parkingBg();
 svg+=person(F1,{x:180,y:1750,s:.8,expr:p4?'grin':'normal',ra:p4&&lt<1.4?-80:-10});
 svg+=person(F2,{x:380,y:1750,s:.8,expr:'worry',ra:p8?-40:-10,la:p8?40:10});
 svg+=person(F3,{x:700,y:1750,s:.8,expr:'worry',ra:p8?-40:-10,la:p8?40:10});
 svg+=person(F4,{x:900,y:1750,s:.8,expr:'sad',ra:p8?-40:-10,la:p8?40:10});
 svg+=person(ME,{x:540,y:1780,s:.85,expr:p2?'sad':'worry',ra:p2&&lt<4.3?-70:-10,sweat:p2?1:0});
 // pile on the ground in front
 const pile=[...Array(4)].map((_,i)=>note(540,1050-i*26,(i%2?5:-5),1.1*pop(lt,.2+i*.18,.25))).join('');
 const coins=p8?[0,1,2,3,4,5].map(i=>coin(420+i*48,1120+(i%2)*16,1.1*pop(lt,1.4+i*.12,.2))).join(''):'';
 const last=p2?note(540,950-60,8,1.1*pop(lt,4.15,.3),'#a5d6a7'):'';
 return {svg:svg+`<ellipse cx="540" cy="1160" rx="260" ry="40" fill="rgba(0,0,0,.15)"/>`+pile+coins+last,html:''};
});
add(20.7,25.85,(lt,d)=>{ // waiting from noon to 11 PM, hungry
 const k=eio(pr(lt,0,3.2));const tr=lt>3.0;
 const sky1=`rgb(${Math.round(lerp(126,13,k))},${Math.round(lerp(198,16,k))},${Math.round(lerp(242,51,k))})`;
 const sunY=lerp(260,1300,k);
 return {svg:`<rect width="${W}" height="${H}" fill="${sky1}"/><circle cx="300" cy="${sunY}" r="90" fill="#ffd43b" opacity="${1-k}"/>`+
  `<g opacity="${k}"><g transform="translate(860,260)"><circle r="70" fill="#fff6c8"/><circle cx="28" cy="-18" r="62" fill="${sky1}"/></g>${[...Array(18)].map((_,i)=>`<circle cx="${(i*197)%1080}" cy="${60+(i*131)%700}" r="3" fill="#fff"/>`).join('')}</g>`+
  `<rect x="0" y="1300" width="${W}" height="620" fill="${k>.5?'#3a3550':'#8d8a80'}"/>`+suv({x:780,y:1540,s:.7,bent:true})+
  GANG.map(([c,i])=>person(c,{x:80+i*105,y:1760,s:.58,expr:lt>4.1?'sad':'worry',headRot:10+Math.sin(lt*3+i)*6})).join('')+
  (lt>4.1?[0,1,2].map(i=>`<path d="M${120+i*210},1530 q20,-14 40,0 q20,14 40,0" stroke="#fff" stroke-width="6" fill="none" opacity="${.5+.5*Math.sin(lt*10+i)}"/>`).join(''):'')+
  (tr?`<g transform="translate(${lerp(1600,760,eo(pr(lt,3.0,4.2)))},1700) scale(.55)">${towTruck({x:0,y:0,car:false,lights:true,rot:lt*400})}</g>`:''),html:''};
});
add(25.85,33.0,(lt,d)=>{ // pay and ask the driver
 const pay=lt<1.9;
 return {svg:night(lt)+`<g transform="translate(700,1520) scale(.55)">${towTruck({x:0,y:0,car:false,lights:true})}</g>`+suv({x:240,y:1600,s:.55,bent:true})+
  [F1,F2,F3,F4].map((c,i)=>person(c,{x:90+i*80,y:1800,s:.5,expr:'worry'})).join('')+
  person(ME,{x:480,y:1830,s:.9,expr:pay?'normal':'worry',ra:pay?-80:(lt>2.2?-60+Math.sin(lt*6)*10:-20),la:pay?10:(lt>2.2?60:10)})+
  person(DRV,{x:820,y:1830,s:.9,flip:true,expr:'serious',ra:pay?-80:-10})+
  (pay?[0,1,2].map(i=>note(lerp(560,720,eo(pr(lt,.2,1.2))),1440-i*24,(i-1)*6,.55)).join(''):''),html:''};
});
add(33.0,39.4,(lt,d)=>{ // driver: sit in your car, but don't touch anything
 const point=lt>3.2,warn=lt>4.35;
 return {svg:night(lt)+`<g transform="translate(560,1500) scale(.6)">${towTruck({x:0,y:0,car:false,lights:true})}</g>`+suv({x:200,y:1470,s:.42,bent:true})+
  person(ME,{x:200,y:1830,s:.85,expr:warn?'shock':'worry'})+
  person(DRV,{x:820,y:1830,s:1,flip:true,expr:warn?'angry':'serious',ra:warn?-150+Math.sin(lt*14)*14:(point?-95:-10),la:lt<2?-60:10}),html:''};
});
add(39.4,43.85,(lt,d)=>({ // car loaded on the lorry, five of us inside
 svg:night(lt)+`<g transform="translate(470,1560) scale(.95)">${towTruck({x:0,y:0,carLift:eo(pr(lt,.2,2.0)),heads:lt>2.4?5:0,lights:true})}</g>`+
  (lt<2.4?[F1,F2,ME,F3,F4].map((c,i)=>person(c,{x:820+i*50,y:1830,s:.42,expr:'worry'})).join(''):''),html:''}));
add(43.85,51.9,(lt,d)=>{ // food stop: driver walks off to eat
 const ask=lt>2.2&&lt<3.6,beg=lt>3.6&&lt<5.4,go=lt>6.6;
 const dx=go?lerp(560,860,eio(pr(lt,6.6,d))):560;
 return {svg:night(lt)+
  `<g transform="translate(860,1420)"><rect x="-170" y="-260" width="340" height="260" fill="#5d4037"/><path d="M-210,-250 L0,-340 L210,-250Z" fill="#0277bd" stroke="#01579b" stroke-width="6"/><rect x="-150" y="-140" width="300" height="20" fill="#8d6e63"/>
   <circle cx="-110" cy="-200" r="${30+6*Math.sin(lt*6)}" fill="#ffd54f" opacity=".5"/><circle cx="-110" cy="-200" r="14" fill="#ffecb3"/>
   <ellipse cx="60" cy="-150" rx="50" ry="22" fill="#9e9e9e"/>${[0,1,2].map(i=>`<path d="M${40+i*20},-175 q-10,-30 0,-60" stroke="#fff" stroke-width="5" fill="none" opacity="${.3+.3*Math.sin(lt*4+i)}"/>`).join('')}</g>`+
  `<g transform="translate(250,1560) scale(.62)">${towTruck({x:0,y:0,heads:5,lights:false})}</g>`+
  person(DRV,{x:dx,y:1830,s:.85,flip:!go,expr:go?'grin':(ask?'normal':'serious'),ra:ask?-100:(go?-70:-10)})+
  (go?`<g transform="translate(${dx+70},1440)"><ellipse rx="44" ry="14" fill="#fff" stroke="#9e9e9e" stroke-width="4"/><circle cx="-10" cy="-8" r="14" fill="#f5deb3"/><circle cx="12" cy="-10" r="12" fill="#ffb74d"/></g>`:'')+
  (beg?`<g transform="translate(220,1250)">${[0,1].map(i=>`<circle cx="${i*60}" cy="${-Math.abs(Math.sin(lt*8+i))*10}" r="0"/>`).join('')}</g>`:''),html:''};
});
add(51.9,57.0,(lt,d)=>{ // kids shout from the roadside
 const shout=lt>2.25;const off=(lt*500)%400;
 return {svg:night(lt)+[...Array(4)].map((_,i)=>`<rect x="${1080-((i*300+off)%1500)}" y="1250" width="10" height="70" fill="#9e9e9e"/>`).join('')+
  `<g transform="translate(560,1600) scale(.8)">${towTruck({x:0,y:0,heads:5,lights:true,rot:lt*500})}</g>`+
  [[KID1,170],[KID2,300],[KID3,430]].map(([c,x],i)=>person(c,{x,y:1290,s:.42,expr:shout?'grin':'normal',ra:shout?-150+Math.sin(lt*12+i)*20:-20,la:shout?150-Math.sin(lt*12+i)*20:20,bob:shout?-Math.abs(Math.sin(lt*10+i))*14:0})).join('')+
  (shout?[0,1,2].map(i=>`<path d="M${200+i*130},1020 l-30,-40 M${215+i*130},1012 l0,-50 M${230+i*130},1020 l30,-40" stroke="#ffd43b" stroke-width="10" stroke-linecap="round" opacity="${.6+.4*Math.sin(lt*14+i)}"/>`).join(''):''),html:''};
});
add(57.0,59.4,(lt,d)=>({ // inside the car on the lorry: we burst out laughing
 svg:night(lt)+`<rect x="60" y="760" width="960" height="640" rx="60" fill="${SUVC}" stroke="#1a1a1a" stroke-width="12"/><rect x="110" y="820" width="860" height="420" rx="30" fill="#1d2b3a"/>`+
  `<clipPath id="cw"><rect x="110" y="820" width="860" height="420" rx="30"/></clipPath><g clip-path="url(#cw)">${GANG.map(([c,i])=>person(c,{x:200+i*170,y:1520,s:.95,expr:'grin',bob:-Math.abs(Math.sin(lt*10+i))*16,headRot:Math.sin(lt*8+i)*8})).join('')}</g>`,html:''}));
add(59.4,66.44,(lt,d)=>{ // then (tense night) vs now (laughing memory)
 const now=lt>2.45;
 if(!now) return {svg:night(lt)+`<g transform="translate(540,1250) rotate(-4)"><rect x="-380" y="-330" width="760" height="720" fill="#fff" stroke="#ccc" stroke-width="4"/><rect x="-340" y="-290" width="680" height="560" fill="#1b1340"/>
   <g transform="translate(-40,180) scale(.6)">${towTruck({x:0,y:0,heads:5,lights:true})}</g></g>`,html:''};
 const l=lt-2.45;
 return {svg:`<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb74d"/><stop offset="1" stop-color="#ff7043"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#wg)"/><circle cx="540" cy="900" r="220" fill="#ffe082" opacity=".8"/>`+
  `<path d="M0,1300 C300,1220 760,1220 1080,1300 L1080,1920 L0,1920Z" fill="#8d6e63"/>`+
  GANG.map(([c,i])=>person(c,{x:120+i*210,y:1700,s:.8,expr:'grin',ra:i%2?-150:-20,la:i%2?20:150,bob:-Math.abs(Math.sin(l*6+i))*12})).join('')+
  `<g transform="translate(540,620) rotate(${-4+Math.sin(l)*2}) scale(${.45*pop(l,2.4,.5)})"><rect x="-380" y="-330" width="760" height="720" fill="#fff" stroke="#ccc" stroke-width="4"/><rect x="-340" y="-290" width="680" height="560" fill="#1b1340"/><g transform="translate(-40,180) scale(.6)">${towTruck({x:0,y:0,heads:5,lights:true})}</g></g>`,html:''};
});


// ---------- subtitles (aligned to the voice) ----------
const SUBS=[
[0.15,"Unplanned trip... unplanned experience!"],
[2.4,"Unplanned trip... unplanned experience! Part 2"],
[3.55,"Stuck with a car with a bent axle, not knowing what to do..."],
[7.0,"I called my brother and told him what happened."],
[8.35,"He called the service centre and got a pickup ready."],
[11.0,"But..."],
[11.8,"But... we had to hand the driver ₹5000!"],
[14.75,"One guy somehow arranged 4000."],
[15.95,"We dug through everyone's pockets for 800."],
[17.7,"The last 200..."],
[18.7,"The last 200... was my last 200!"],
[20.8,"We started waiting at noon..."],
[22.3,"...and the pickup came at 11 PM!"],
[24.75,"Starving till then."],
[25.9,"After paying, I asked the driver,"],
[28.0,"\"Chetta, we have no way to get home...\""],
[30.1,"\"...that was all the money we had. Can we come with you?\""],
[33.0,"\"There's no room for five in here...\""],
[35.1,"\"So do one thing, just sit in your car!\""],
[37.35,"\"But don't go touching anything!\""],
[39.5,"So, with the car up on the lorry..."],
[41.95,"...all five of us sat inside it!"],
[43.9,"On the way, the driver stopped to eat."],
[46.05,"\"Aren't you eating?\""],
[47.5,"\"Chetta, if you pay, we'll eat...\""],
[49.25,"\"Ah... okay!\""],
[50.45,"...and off he went!"],
[52.2,"Suddenly, some boys by the roadside..."],
[54.15,"\"Hoy... Kochi Rajave...!\""],
[57.0,"Just like Jagathy in that film, that was us!"],
[59.45,"That day, we went through so much tension..."],
[61.9,"But today,"],
[62.7,"it's a memory we laugh about every time we tell it."],
[65.0,"That's how some memories are!"],
];
function subAt(t){let s=null;for(const [a,x] of SUBS){if(t>=a)s=x;}return s;}

