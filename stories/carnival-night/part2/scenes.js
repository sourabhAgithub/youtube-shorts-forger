// Carnival night - Part 2. Times come from timeline.json (voice sped to 65.78 s).
const TG=`<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140d3a"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#tg)"/>`;
const room=()=>`<rect width="${W}" height="${H}" fill="#ffe0b2"/><rect x="0" y="1330" width="${W}" height="590" fill="#a1887f"/><rect x="0" y="1320" width="${W}" height="20" fill="#6d4c41"/><rect x="640" y="420" width="300" height="240" fill="#1a237e" stroke="#6d4c41" stroke-width="12"/><circle cx="880" cy="490" r="30" fill="#fff6c8"/><path d="M640,540 L940,540 M790,420 L790,660" stroke="#6d4c41" stroke-width="8"/>`;
const dayStation=()=>sky()+cloud(140,420,.9)+cloud(760,560,.7)+ground(1300,'#9aa0a6')+policeStation(540,1300,1.15,0);
const sunIcon=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})">${[...Array(10)].map((_,i)=>`<rect x="-6" y="-90" width="12" height="30" rx="6" fill="#ffb300" transform="rotate(${i*36})"/>`).join('')}<circle r="50" fill="#ffd54f" stroke="#f9a825" stroke-width="6"/></g>`;

add(0,4.02,(lt,d)=>{ // title
 const x=lerp(-600,540,eo(pr(lt,0,1.3)));
 return {svg:TG+bulbString(1080,lt)+`<g transform="translate(900,1180) scale(.38)">${policeStation(0,0,1,lt)}</g><ellipse cx="540" cy="1460" rx="380" ry="34" fill="rgba(0,0,0,.3)"/>`+activaRiders({x,y:1450,s:1.05,rot:lt*500*(1-pr(lt,0,1.3)),me:'worry',f1:'worry'}),
  html:`<div class="big" style="top:500px;font-size:88px;line-height:1.15;color:#fff;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,.23,.45)})">കാർണിവൽ രാത്രി...</div><div class="big" style="top:650px;font-size:96px;line-height:1.15;color:#ffd43b;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,1.65,.45)})">ഒരു ചേസ്!</div><div class="big" style="top:820px;font-size:64px;transform:scale(${pop(lt,2.86,.4)})"><span style="background:#ff5d73;color:#fff;padding:6px 30px;border-radius:24px;border:6px solid #1a1a1a">പാർട്ട് 2</span></div>`};
});
add(4.02,5.95,(lt,d)=>{ // straight to the police station
 const px=lerp(1350,820,eo(pr(lt,0,d)));
 return {svg:night(lt)+`<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/>`+policeStation(px,1330,.9,lt)+activaRiders({x:330,y:1720,s:.95,rot:lt*800,me:'sad',f1:'worry'})+speed(0,1480,3,lt),html:''};
});
add(5.95,9.42,(lt,d)=>{ // friend sees my lip... bleeding
 if(lt<2.11)return {svg:stationInside()+person(ME,{x:400,y:1800,s:1,expr:'sad'})+person(F1,{x:700,y:1800,s:1,flip:true,expr:lt>.9?'shock':'normal',headRot:lt>.9?-8:0}),html:''};
 const l=lt-2.11;
 return {svg:stationInside()+`<rect width="${W}" height="${H}" fill="#000" opacity=".25"/>`+person(ME,{x:540,y:2150,s:2.4,expr:'sad',bleed:eo(pr(l,0,.8))}),html:''};
});
add(9.42,12.44,(lt,d)=>{ // the hero of the fight... cries at the sight of blood
 if(lt<1.17)return {svg:burst('#ffe082','#ffca28',lt*20)+person(F1,{x:540,y:1850,s:1.3,expr:'grin',ra:-165,la:20})+stars(lt,540,1050,260),html:''};
 const l=lt-1.17;
 return {svg:stationInside()+person(ME,{x:330,y:1800,s:.95,expr:'serious',bleed:1})+person(F1,{x:700,y:1800+Math.abs(Math.sin(l*14))*-10,s:1,expr:'sad',tears:l,la:150,ra:-150}),html:''};
});
add(12.44,17.02,(lt,d)=>{ // constable feels sorry; first aid right there
 const fa=lt>1.83;const pl=lt>2.9;
 return {svg:stationInside()+(fa?`<g transform="translate(540,1340)">${firstAid(0,0,pop(lt,1.83,.35))}</g>`:'')+
  person(COP,{x:820,y:1820,s:1,flip:true,expr:fa?'smile':'sad',headRot:fa?0:10,ra:fa&&!pl?-120:-10})+
  person(ME,{x:420,y:1820,s:.95,expr:pl?'smile':'sad',bleed:pl?0:1,plaster:pl})+person(F1,{x:180,y:1820,s:.85,expr:'sad',tears:fa?-1:lt}),html:''};
});
add(17.02,20.59,(lt,d)=>{ // names written; come back tomorrow morning
 const tm=lt>1.83;
 return {svg:stationInside()+person(ME,{x:380,y:1760,s:.95,expr:'serious',plaster:true,ra:-45})+person(F1,{x:150,y:1780,s:.85,expr:'worry'})+desk(470,1560,1)+register(470,1528,1,lt,!tm)+
  person(COP,{x:850,y:1820,s:1,flip:true,expr:tm?'serious':'normal',ra:tm?-110:-10})+
  (tm?thought(560,820,.75*pop(lt,1.83,.4),sunIcon(-60,-60,1.3)+policeStation(90,30,.32,0)):''),html:''};
});
add(20.59,22.38,(lt,d)=>({ // told everyone at home
 svg:room()+person(DAD,{x:220,y:1820,s:.95,expr:'shock'})+person(MOM,{x:450,y:1820,s:.9,expr:'shock',la:150,ra:-150})+person(ME,{x:820,y:1820,s:.95,flip:true,expr:'sad',plaster:true,ra:-60+Math.sin(lt*8)*15}),html:''}));
add(22.38,27.28,(lt,d)=>{ // call Moothachan
 const talk=lt>2.0,ok=lt>3.87;
 return {svg:`<rect width="${W}" height="960" fill="#ffe0b2"/><rect x="0" y="960" width="${W}" height="960" fill="#c5e1a5"/><rect x="0" y="952" width="${W}" height="16" fill="#1a1a1a"/>`+
  `<clipPath id="th"><rect x="0" y="0" width="1080" height="952"/></clipPath><g clip-path="url(#th)">${person(ME,{x:360,y:1090,s:1.1,expr:talk?'normal':'worry',ra:-160,plaster:true})}${phoneG(452,600,.6,lt,!talk)}</g>`+
  `<clipPath id="bh"><rect x="0" y="968" width="1080" height="952"/></clipPath><g clip-path="url(#bh)">${person(UNCLE,{x:640,y:2050,s:1.1,flip:true,expr:ok?'smile':'serious',ra:-160,la:ok?130:(talk?60+Math.sin(lt*7)*20:10),thumb:false})}${phoneG(548,1560,.6,lt,false)}
  ${ok?`<g transform="translate(330,1450) scale(${pop(lt,3.87,.35)})"><circle r="90" fill="#43a047" stroke="#1a1a1a" stroke-width="8"/><path d="M-40,0 L-10,32 L44,-30" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`:''}</g>`,html:''};
});
add(27.28,30.08,(lt,d)=>{ // shaking with fear, back to the station
 const j=Math.sin(lt*40)*5;
 return {svg:dayStation()+person(ME,{x:420+j,y:1820,s:.95,expr:'worry',sweat:1,plaster:true})+person(F1,{x:660-j,y:1820,s:.95,expr:'worry',sweat:1}),html:''};
});
add(30.08,35.0,(lt,d)=>{ // SI smiling: your father called
 const sx=lerp(1250,780,eo(pr(lt,0,1)));const said=lt>1.48,glance=lt>3.05;
 return {svg:stationInside()+person(ME,{x:260,y:1820,s:.9,expr:glance?'grin':'worry',plaster:true,headRot:glance?12:0})+person(F1,{x:470,y:1820,s:.9,expr:glance?'think':'worry',headRot:glance?-12:0})+
  person(SI,{x:sx,y:1830,s:1.05,flip:true,expr:'grin',walk:lt<1?lt*9:null,ra:said?-120:-10})+
  (said&&!glance?thought(560,860,.62*pop(lt,1.48,.35),`${person(UNCLE,{x:-40,y:200,s:.6,expr:'smile',ra:-160})}${phoneG(20,-70,.4,lt,false)}`):'')+
  (glance?`<text x="480" y="${1220+Math.sin(lt*6)*8}" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${160*pop(lt,3.05,.3)}" fill="#ffd43b" stroke="#1a1a1a" stroke-width="8">?</text>`:''),html:''};
});
add(35.0,40.4,(lt,d)=>{ // brought out of the cell: same guy! we confirm
 const gx=lerp(740,560,eo(pr(lt,.2,1.6)));const zoom=lt>2.05&&lt<3.48;const conf=lt>3.48;
 if(zoom){const l=lt-2.05;return {svg:`<rect width="${W}" height="${H}" fill="#cfd8dc"/>`+cellBars(0,1080,500,1500,.6)+person({...GUNDA,cig:false},{x:540,y:2250,s:2.4,expr:'serious'}),html:''};}
 return {svg:stationInside()+cellBars(560,1080,420,1330)+person(COP,{x:880,y:1830,s:.95,flip:true,expr:'serious'})+person({...GUNDA,cig:false},{x:gx,y:1840,s:1.05,flip:true,expr:'serious'})+
  person(ME,{x:150,y:1830,s:.85,expr:conf?'angry':'worry',plaster:true,ra:conf?-100:-10,headRot:conf?Math.sin(lt*10)*8:0})+person(F1,{x:330,y:1830,s:.85,expr:conf?'angry':'worry',ra:conf?-100:-10,headRot:conf?Math.sin(lt*10+1)*8:0}),html:''};
});
add(40.4,46.65,(lt,d)=>{ // SI: a problem. 25 cases. main gunda of the area
 if(lt<2.24)return {svg:stationInside()+person(SI,{x:540,y:2100,s:1.8,expr:lt>.85?'serious':'normal',ra:lt>.85?-40:-10}),html:''};
 const l=lt-2.24;const n=Math.min(25,Math.floor(pr(l,0,1.7)*25)+1);const top=lt>4.46;const h=n*26*.9;
 return {svg:`<rect width="${W}" height="${H}" fill="#ffe082"/>`+(top?burst('#ffe082','#ffca28',lt*10):'')+`<rect x="0" y="1700" width="${W}" height="220" fill="#a1887f"/>`+fileStack(540,1720,.9,n)+
  (top?person({...GUNDA,cig:false},{x:540,y:1720-h,s:.8,expr:'grin',la:-90,ra:90}):person({...GUNDA,cig:false},{x:880,y:1840,s:.9,flip:true,expr:'smile'})),html:''};
});
add(46.65,50.23,(lt,d)=>{ // one more makes 26, that's all; your decision
 if(lt<2.04){const drop=lerp(-200,0,eo(pr(lt,0,.5)));const shrug=lt>.6;
  return {svg:`<rect width="${W}" height="${H}" fill="#ffe082"/><rect x="0" y="1700" width="${W}" height="220" fill="#a1887f"/>`+fileStack(400,1720,.9,25)+
   `<g transform="translate(400,${1720-25*26*.9+drop})">${fileStack(0,0,.9,1)}</g>`+person({...GUNDA,cig:false},{x:820,y:1840,s:1,flip:true,expr:shrug?'smile':'normal',la:shrug?70:8,ra:shrug?-70:-8,headRot:shrug?8:0}),html:''};}
 return {svg:stationInside()+person(SI,{x:700,y:1830,s:1.05,flip:true,expr:'serious',ra:-75})+person(ME,{x:300,y:1830,s:.85,expr:'think',plaster:true})+person(F1,{x:120,y:1830,s:.8,expr:'worry'}),html:''};
});
add(50.23,52.6,(lt,d)=>{ // we thought... no case
 const no=lt>1.11;
 return {svg:stationInside()+person(ME,{x:400,y:1830,s:.95,expr:no?'serious':'think',plaster:true,headRot:no?Math.sin(lt*16)*12:0,la:no?60:8,ra:no?-60:-8})+person(F1,{x:640,y:1830,s:.9,flip:true,expr:no?'serious':'think'})+
  thought(560,820,.6*pop(lt,.1,.35),fileStack(0,60,.9,8)+(no?`<g transform="scale(${pop(lt,1.11,.3)})"><path d="M-170,-170 L170,170 M170,-170 L-170,170" stroke="#e53935" stroke-width="40" stroke-linecap="round"/></g>`:'')),html:''};
});
add(52.6,56.02,(lt,d)=>{ // gunda complains: they hit me too
 const sir=lt>1.35,pt=lt>2.16;
 return {svg:`<rect width="${W}" height="${H}" fill="#cfd8dc"/><rect x="0" y="1500" width="${W}" height="420" fill="#90a4ae"/>`+cellBars(380,1080,520,1520)+
  person({...GUNDA,cig:false},{x:760,y:1840,s:1.15,flip:true,expr:sir?'sad':'worry',la:pt?10:150,ra:pt?-100:-150,headRot:sir&&!pt?Math.sin(lt*8)*6:0})+
  person(F1,{x:220,y:1840,s:.8,expr:pt?'grin':'normal'})+person(ME,{x:80,y:1840,s:.75,expr:'normal',plaster:true}),html:''};
});
add(56.02,59.5,(lt,d)=>{ // SI laughs: these kids? beat you?
 const kids=lt>1.58,you=lt>2.51;
 return {svg:stationInside()+person(ME,{x:120,y:1840,s:.6,expr:'normal',plaster:true})+person(F1,{x:250,y:1840,s:.6,expr:'grin'})+
  person({...GUNDA,cig:false},{x:880,y:1860,s:1.3,flip:true,expr:'sad'})+
  person(SI,{x:520,y:1850,s:1.05,flip:you,expr:'grin',bob:Math.abs(Math.sin(lt*12))*-14,ra:kids?(you?-100:-8):-40,la:kids?(you?8:100):40}),html:''};
});
add(59.5,63.39,(lt,d)=>{ // even today... just hot blood back then
 const ho=lt>1.51,mem=lt>2.04;
 return {svg:sky('#ff8a65','#ffe0b2')+`<circle cx="820" cy="1100" r="140" fill="#ffd54f" opacity=".9"/>`+ground(1300,'#8d6e63')+scooter({x:540,y:1780,s:.9,color:ACTIVA.color,trim:ACTIVA.trim})+
  person(ME,{x:240,y:1840,s:.9,expr:ho?'think':'smile'})+person(F1,{x:880,y:1840,s:.9,flip:true,expr:'smile'})+
  (mem?thought(540,820,.75*pop(lt,2.04,.4),`<rect x="-260" y="-200" width="520" height="340" rx="30" fill="#2a1f4e"/>${sedan({x:-90,y:90,s:.35,heads:4})}${activaRiders({x:140,y:110,s:.4,me:'angry',f1:'grin'})}`):''),html:''};
});
add(63.39,65.78,(lt,d)=>{ // now just a good story
 const fade=pr(lt,d-.5,d);
 return {svg:carnivalBg(lt)+person(ME,{x:400,y:1860,s:.95,expr:'grin',bob:Math.abs(Math.sin(lt*9))*-12,headRot:Math.sin(lt*9)*5,plaster:false})+person(F1,{x:680,y:1860,s:.95,flip:true,expr:'grin',bob:Math.abs(Math.sin(lt*9+1))*-12,ra:-120,la:-20})+
  `<rect width="${W}" height="${H}" fill="#000" opacity="${fade*.8}"/>`,html:''};
});

const SUBS=[
[0.23,"Carnival night..."],
[1.65,"Carnival night... a chase!"],
[2.86,"Carnival night... a chase! Part 2"],
[4.02,"We went straight to the police station."],
[5.95,"That's where my friend saw my lip..."],
[8.06,"...it was bleeding."],
[9.42,"The hero of the fight..."],
[10.59,"...burst into tears the moment he saw blood!"],
[12.44,"The constable felt sorry for us."],
[14.27,"He gave me first aid right there."],
[17.02,"We wrote down our names and addresses..."],
[18.85,"...and he told us to come back the next morning."],
[20.59,"I got home and told my parents everything."],
[22.38,"I called my uncle, my dad's elder brother, a Tahsildar."],
[24.38,"\"Go to the station tomorrow with your friend...\""],
[26.25,"\"I'll handle it.\""],
[27.28,"Shaking with fear, we went back to the station."],
[30.08,"The SI walked up, smiling,"],
[31.56,"\"Your father called me.\""],
[33.13,"He thought my uncle was my dad!"],
[35.0,"They brought a man out of the cell."],
[37.05,"The same big guy!"],
[38.48,"We both confirmed it."],
[40.4,"The SI said,"],
[41.25,"\"There's a problem.\""],
[42.64,"\"He already has 25 cases against him.\""],
[44.86,"\"He's the main gangster of this area.\""],
[46.65,"\"One more, and it's 26.\""],
[47.86,"\"That's all it means to him.\""],
[48.69,"\"The decision is yours.\""],
[50.23,"We thought about it..."],
[51.34,"We thought about it... no case."],
[52.6,"Then the gangster complained,"],
[53.95,"\"Sir...\""],
[54.76,"\"Sir... they hit me too!\""],
[56.02,"The SI burst out laughing."],
[57.6,"\"These kids?\""],
[58.53,"\"These kids? Hit you?\""],
[59.5,"Even today, when I think of that night..."],
[61.01,"Hoo..."],
[61.54,"Hoo... that was just hot blood back then!"],
[63.39,"Now it's just a good story to tell."],
];
function subAt(t){let s=null;for(const [a,x] of SUBS){if(t>=a)s=x;}return s;}
