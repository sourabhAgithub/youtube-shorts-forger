// Carnival night - Part 1. Times come from timeline.json (voice sped to 65.74 s).
const TG=`<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140d3a"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#tg)"/>`;
const F1only=(x,y,s,o={})=>`<g transform="translate(${x},${y}) scale(${s})">${person(F1,{x:-10,y:-60,s:.62,expr:o.expr||'worry',ra:-75,la:-60})}${scooter({x:0,y:0,s:1,color:ACTIVA.color,trim:ACTIVA.trim})}</g>`;
const school=()=>`<g transform="translate(540,1250)"><rect x="-380" y="-420" width="760" height="420" fill="#fff3e0" stroke="#bcaaa4" stroke-width="6"/><path d="M-410,-420 L-330,-500 L330,-500 L410,-420Z" fill="#2e7d32"/>
 ${[-300,-190,90,200].map(cx=>`<rect x="${cx}" y="-370" width="80" height="80" fill="#5d8aa8"/><rect x="${cx}" y="-230" width="80" height="80" fill="#5d8aa8"/>`).join('')}<rect x="-60" y="-200" width="120" height="200" fill="#6d4c41"/><circle cx="0" cy="-330" r="44" fill="#fff" stroke="#2e7d32" stroke-width="8"/><path d="M0,-360 L0,-330 L22,-318" stroke="#1a1a1a" stroke-width="6" fill="none"/></g>`;
const straps=(x,y,s)=>`<path d="M${x-36*s},${y-336*s} L${x-44*s},${y-200*s} M${x+36*s},${y-336*s} L${x+44*s},${y-200*s}" stroke="#c62828" stroke-width="${14*s}" stroke-linecap="round"/>`;

add(0,3.79,(lt,d)=>{ // title
 const x=lerp(-600,540,eo(pr(lt,0,1.3)));
 return {svg:TG+bulbString(1080,lt)+`<ellipse cx="540" cy="1460" rx="380" ry="34" fill="rgba(0,0,0,.3)"/>`+activaRiders({x,y:1450,s:1.15,rot:lt*500*(1-pr(lt,0,1.3)),me:'grin',f1:'grin'})+speed(x-330,1260,3,lt),
  html:`<div class="big" style="top:500px;font-size:88px;line-height:1.15;color:#fff;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,.16,.45)})">കാർണിവൽ രാത്രി...</div><div class="big" style="top:650px;font-size:96px;line-height:1.15;color:#ffd43b;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,1.38,.45)})">ഒരു ചേസ്!</div><div class="big" style="top:820px;font-size:64px;transform:scale(${pop(lt,2.55,.4)})"><span style="background:#ff5d73;color:#fff;padding:6px 30px;border-radius:24px;border:6px solid #1a1a1a">പാർട്ട് 1</span></div>`};
});
add(3.79,5.12,(lt,d)=>({ // plus two days
 svg:sky()+cloud(120,500,.9)+cloud(720,620,.7)+ground(1250,'#6cbf57')+school()+`<rect x="0" y="1500" width="${W}" height="420" fill="#c8b98f"/>`+
  person(ME,{x:400,y:1820,s:.85,expr:'grin',ra:-30,bob:Math.abs(Math.sin(lt*6))*-8})+straps(400,1820,.85)+
  person(F1,{x:680,y:1820,s:.85,expr:'grin',la:30,bob:Math.abs(Math.sin(lt*6+1))*-8})+straps(680,1820,.85),html:''}));
add(5.12,8.61,(lt,d)=>{ // ten-day carnival, six days there
 const boxes=[...Array(10)].map((_,i)=>{const bx=135+i*90,sc=pop(lt,.2+i*.05,.3);const tick=i<6&&lt>1.49+i*.2;
  return `<g transform="translate(${bx},1250) scale(${sc})"><rect x="-36" y="-36" width="72" height="72" rx="10" fill="#fff" stroke="#1a1a1a" stroke-width="6"/>${tick?`<path d="M-20,0 L-6,16 L22,-18" stroke="#2e7d32" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="scale(${pop(lt,1.49+i*.2,.25)})"/>`:''}</g>`}).join('');
 return {svg:carnivalBg(lt)+`<rect x="70" y="1190" width="940" height="120" rx="24" fill="rgba(0,0,0,.45)"/>`+boxes+
  person(ME,{x:400,y:1850,s:.72,expr:'grin',ra:-140+Math.sin(lt*6)*10})+person(F1,{x:680,y:1850,s:.72,expr:'grin',la:140-Math.sin(lt*6)*10}),html:''};
});
add(8.61,9.72,(lt,d)=>({ // 12:30 at night
 svg:night(lt)+clock(540,1000,1.5*pop(lt,0,.4),12.5),html:''}));
add(9.72,11.9,(lt,d)=>({ // riding home
 svg:nightRoad(lt,lt*700)+headBeam(820,1540,600,.18)+activaRiders({x:540,y:1700,s:1.1,rot:lt*800,me:'smile',f1:'smile'})+speed(160,1480,3,lt),html:''}));
add(11.9,15.29,(lt,d)=>{ // swerving car overtakes, misses by an inch
 const T1=.96,T2=2.11;let cx,cy=1540,tilt=Math.sin(lt*5)*3;
 if(lt<T1)cx=lerp(-420,60,eo(pr(lt,0,T1)));else cx=lerp(60,1550,eio(pr(lt,T1,T2+.6)));
 const close=Math.sin(Math.PI*pr(lt,T1+.3,T2+.2));cy=1540+close*70;
 const miss=lt>T2;const wob=miss?Math.sin(lt*30)*6*(1-pr(lt,T2,T2+1)):0;
 return {svg:nightRoad(lt,lt*700)+sedan({x:cx,y:cy+Math.sin(lt*6)*10,s:.95,tilt,rot:lt*900,heads:4})+headBeam(cx+290,cy-140,500,.2)+
  activaRiders({x:640,y:1720,s:.95,rot:lt*800,tilt:wob,me:miss?'shock':(lt>T1?'worry':'normal'),f1:miss?'shock':(lt>T1?'worry':'normal')})+
  (miss?`<text x="640" y="${1150+Math.sin(lt*10)*8}" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${260*pop(lt,T2,.3)}" fill="#ff3d3d" stroke="#1a1a1a" stroke-width="10">!</text>`:''),html:''};
});
add(15.29,19.08,(lt,d)=>{ // angry: catch them!
 const pt=lt>1.89;const shout=lt>3.07;
 return {svg:nightRoad(lt,lt*900)+`<rect width="${W}" height="${H}" fill="#ff1744" opacity="${.12+.08*Math.sin(lt*8)}"/>`+sedan({x:960,y:1430,s:.35,rot:lt*900,brake:Math.floor(lt*3)%2==0})+
  activaRiders({x:560,y:1820,s:1.55,rot:lt*900,me:'angry',f1:'worry',mera:pt?-105+Math.sin(lt*14)*(shout?12:5):-20})+speed(120,1500,3,lt,160),html:''};
});
add(19.08,20.81,(lt,d)=>({ // friend fired up
 svg:nightRoad(lt,lt*1400)+activaRiders({x:540,y:1820,s:1.55,rot:lt*1400,tilt:-3,me:'angry',f1:'grin'})+speed(80,1380,4,lt*1.6,200)+stars(lt,700,1150,120),html:''}));
add(20.81,24.05,(lt,d)=>{ // chase, overtake, stop in front
 const A=1.73;const scroll=lt<A?lt*900:A*900+(1-Math.pow(1-pr(lt,A,A+.9),2))*400;
 const sx=lt<A?lerp(-260,930,eio(pr(lt,0,A))):930,sy=lt<A?1730:lerp(1730,1560,eo(pr(lt,A,A+.6)));
 const carx=lerp(500,380,eo(pr(lt,A,A+.9)));const moving=lt<A+.9;
 return {svg:nightRoad(lt,scroll)+(lt>A?[0,1].map(i=>`<rect x="${carx-240+i*300}" y="${1540+i*4}" width="${160*pr(lt,A,A+.9)}" height="12" rx="6" fill="#111" opacity=".7"/>`).join(''):'')+
  sedan({x:carx,y:1540,s:.8,rot:moving?lt*900:0,heads:4,brake:lt>A})+headBeam(carx+245,1430,420,.18)+
  activaRiders({x:sx,y:sy,s:.75,rot:moving?lt*1000:0,me:'angry',f1:lt<A?'grin':'angry'})+(lt<A?speed(sx-330,sy-260,3,lt):''),html:''};
});
add(24.05,28.13,(lt,d)=>{ // I walk to the car: trying to kill us?
 const mx=lerp(780,580,eo(pr(lt,0,1.5)));const walking=lt<1.5;const ask=lt>2.48;
 return {svg:night(lt)+`<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/>`+sedan({x:300,y:1560,s:.9,heads:4})+F1only(930,1640,.75,{expr:'serious'})+
  person(ME,{x:mx,y:1720,s:.9,flip:true,walk:walking?lt*10:null,expr:'angry',ra:ask?-100+Math.sin(lt*12)*10:-15,la:ask?40:8}),html:''};
});
add(28.13,32.6,(lt,d)=>{ // out steps... six-footer, huge, cigarette
 if(lt<.62){const dr=eo(pr(lt,0,.5));
  return {svg:night(lt)+`<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/>`+sedan({x:300,y:1560,s:.9,door:dr,heads:3})+person(GUNDA,{x:470,y:lerp(1980,1760,dr),s:.95,expr:'angry'})+person(ME,{x:800,y:1760,s:.85,flip:true,expr:'worry'}),html:''};}
 if(lt<3.18){const l=lt-.62;const fat=l>1.75?lerp(1.1,1.55,eob(pr(l,1.75,2.2))):1.1;const H2=lerp(1.05,1.45,eo(pr(l,0,.8)));
  return {svg:`<rect width="${W}" height="${H}" fill="#1b1340"/><rect x="0" y="1750" width="${W}" height="170" fill="#3a3550"/>`+
   `<g opacity="${pr(l,.3,.6)}"><path d="M200,1900 L200,${1900-536*H2}" stroke="#ffd43b" stroke-width="8"/>${[0,1,2,3,4,5,6].map(i=>`<rect x="184" y="${1900-i*536*H2/6-3}" width="32" height="6" fill="#ffd43b"/>`).join('')}</g>`+
   person({...GUNDA,fat},{x:500,y:1900,s:H2,expr:'angry',la:12,ra:-12})+person(ME,{x:880,y:1900,s:.62,flip:true,expr:'shock',sweat:1}),html:''};}
 const l=lt-3.18;
 return {svg:`<rect width="${W}" height="${H}" fill="#1b1340"/>`+person(GUNDA,{x:540,y:2150,s:2.6,expr:'serious'})+smoke(540+80*2.6,2150-(430-34)*2.6-20,lt,2.2),html:''};
});
add(32.6,33.21,(lt,d)=>{ // we're done for
 const sh=Math.sin(lt*60)*6;
 return {svg:burst('#455a64','#37474f',lt*20)+`<g transform="translate(${sh},0)">${person(ME,{x:540,y:2150,s:2.3,expr:'shock',sweat:1})}</g>`,html:''};
});
add(33.21,36.04,(lt,d)=>{ // three more get out, one in mundu
 const step=(i,t0,tx)=>{const k=eo(pr(lt,t0,t0+.5));return {x:lerp(480,tx,k),o:pr(lt,t0,t0+.15)}};
 const g1=step(1,0,660),g2=step(2,.45,170),g3=step(3,1.63,880);
 return {svg:night(lt)+`<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/>`+sedan({x:420,y:1480,s:.85,door:1})+
  `<g opacity="${g2.o}">${person(GOON2,{x:g2.x,y:1780,s:.82,expr:'angry'})}</g>`+person(GUNDA,{x:410,y:1800,s:.95,expr:'angry'})+
  `<g opacity="${g1.o}">${person(GOON1,{x:g1.x,y:1780,s:.82,expr:'angry'})}</g>`+
  (lt>1.63?`<g opacity="${g3.o}">${person(GOON3,{x:g3.x,y:1790,s:.84,expr:'serious'})}</g>${lt>1.8?spark(g3.x-90,1440,pop(lt,1.8,.3),'#ffd43b'):''}`:''),html:''};
});
const grabSet=(lt,o={})=>{const mx=o.mx??380,gx=o.gx??720,gs=o.gs??1.2,ms=o.ms??.9,lift=o.lift??30;
 return person(GUNDA,{x:gx,y:1860,s:gs,flip:true,expr:o.gexpr||'angry',ra:o.gra??-82,la:o.gla??10,headRot:o.ghr||0,cig:o.cig})+
  person(ME,{x:mx,y:1830-lift,s:ms,expr:o.mexpr||'shock',headRot:o.mhr||0,la:o.mla??20,ra:o.mra??-20,sweat:o.sweat||0})+
  `<circle cx="${mx+8}" cy="${1830-lift-322*ms}" r="${26*gs}" fill="${GUNDA.skin}" stroke="#1a1a1a" stroke-width="4"/>`;};
add(36.04,38.87,(lt,d)=>{ // grabs my shirt: who are you to ask?
 const shout=lt>1.33;const sh=shout?Math.sin(lt*40)*5:0;
 return {svg:`<rect width="${W}" height="${H}" fill="#2a1f4e"/><rect x="0" y="1500" width="${W}" height="420" fill="#3a3550"/><g transform="translate(${sh},0)">`+grabSet(lt,{lift:30*eo(pr(lt,0,.4)),mexpr:shout?'worry':'shock',sweat:shout?1:0})+`</g>`+
  (shout?[0,1,2].map(i=>`<path d="M${600-i*10},${1260+i*36} L${520-i*30},${1240+i*50}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${.5+.5*Math.sin(lt*20+i)}"/>`).join(''):''),html:''};
});
add(38.87,42.76,(lt,d)=>{ // cigarette falls into my shirt... burns!
 const t=eio(pr(lt,0,1.15));const cx=lerp(900,600,t*t),cy=lerp(760,1640,t);const inside=lt>1.15;const burn=lt>3.55;
 const sh=burn?Math.sin(lt*60)*12*(1-pr(lt,3.55,3.9)):0;
 return {svg:`<g transform="translate(${sh},${burn?-30*Math.sin(Math.PI*pr(lt,3.55,3.9)):0})">`+(burn?burst('#ff8a80','#ff5252',lt*30):`<rect width="${W}" height="${H}" fill="#2a1f4e"/>`)+
  person(ME,{x:540,y:2350,s:2.2,expr:burn?'shock':(inside?'worry':'normal'),sweat:inside?1:0,la:burn?150:10,ra:burn?-150:-10})+
  (inside?smoke(600,1620,lt,1.4):`<g transform="translate(${cx},${cy}) rotate(${lt*400})"><rect x="-60" y="-12" width="120" height="24" rx="6" fill="#fafafa" stroke="#555" stroke-width="4"/><rect x="-60" y="-12" width="30" height="24" fill="#e0a060"/><rect x="48" y="-12" width="14" height="24" fill="#ff5722"/></g>`)+
  (burn?impact(780,1620,pop(lt,3.55,.25)*1.3,'#ffd43b')+impact(300,1700,pop(lt,3.65,.25),'#ff9100'):'')+`</g>`,html:''};
});
add(42.76,45.56,(lt,d)=>{ // friend jumps, swings, lands one
 const jump=Math.sin(Math.PI*pr(lt,0,2.6));const fx=lerp(1080,880,eo(pr(lt,0,.6)));const swing=lt>.69;const hit=lt>1.74;
 return {svg:`<rect width="${W}" height="${H}" fill="#2a1f4e"/><rect x="0" y="1500" width="${W}" height="420" fill="#3a3550"/>`+
  grabSet(lt,{mx:300,gx:620,gs:1.1,ms:.82,ghr:hit?18*(1-pr(lt,1.74,2.4)):0,gexpr:hit?'shock':'angry',mexpr:'worry'})+
  person(F1,{x:fx,y:1840-jump*230,s:.85,flip:true,expr:'angry',ra:swing?(hit?-95:-160+120*eo(pr(lt,.69,1.74))):-150,la:30})+
  (hit?impact(800,1270,pop(lt,1.74,.25)*1.0):''),html:''};
});
add(45.56,48.42,(lt,d)=>{ // every blow lands on me
 const k=Math.floor(lt/.45),ph=(lt%.45)/.45;const side=k%2?1:-1;
 return {svg:`<rect width="${W}" height="${H}" fill="#2a1f4e"/><rect x="0" y="1500" width="${W}" height="420" fill="#3a3550"/>`+
  grabSet(lt,{mx:400,gx:720,gs:1.15,ms:.88,gla:-60-60*Math.sin(Math.PI*ph),mhr:side*14*Math.sin(Math.PI*ph),mexpr:k%2?'shock':'sad'})+
  impact(400+side*125,1390,pop(lt%.45,0,.15)*.7*(1-ph),k%2?'#ffd43b':'#ff9100'),html:''};
});
add(48.42,51.85,(lt,d)=>{ // he holds me by the collar at arm's length; my swings never reach him
 const a=lt*16;const miss=lt>1.3;const gx=720,gs=1.2,mx=330,ms=.8,my=1830-82;
 const shx=gx-54*GUNDA.fat*gs,shy=1860-318*gs,cx=mx+8,cy=my-322*ms;
 const len=Math.hypot(shx-cx,shy-cy),ang=Math.atan2(cy-shy,cx-shx)*180/Math.PI;
 return {svg:`<rect width="${W}" height="${H}" fill="#2a1f4e"/><rect x="0" y="1500" width="${W}" height="420" fill="#3a3550"/>`+
  person(GUNDA,{x:gx,y:1860,s:gs,flip:true,expr:'serious',ra:-90})+
  `<g transform="translate(${shx},${shy}) rotate(${ang})"><rect x="0" y="-21" width="${len}" height="42" rx="21" fill="${GUNDA.shirt}" stroke="rgba(0,0,0,.25)" stroke-width="3"/><rect x="${len-90}" y="-17" width="90" height="34" rx="17" fill="${GUNDA.skin}"/></g>`+
  person(ME,{x:mx,y:my,s:ms,expr:'angry',la:40+50*Math.sin(a),ra:-140+30*Math.sin(a+1.6)})+
  `<circle cx="${cx}" cy="${cy}" r="30" fill="${GUNDA.skin}" stroke="#1a1a1a" stroke-width="4"/>`+
  [0,1].map(i=>`<path d="M${500+i*24},${1400+i*60} q40,30 0,70" stroke="#fff" stroke-width="7" fill="none" opacity="${.3+.4*Math.abs(Math.sin(a+i))}"/>`).join('')+
  smoke(gx-80*gs,1860-(430-34)*gs-20,lt,1.1)+
  (miss?`<text x="330" y="${1130+Math.sin(lt*6)*10}" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${200*pop(lt,1.3,.3)}" fill="#ffd43b" stroke="#1a1a1a" stroke-width="8">?</text>`:''),html:''};
});
add(51.85,55.72,(lt,d)=>{ // crowd gathers; they swear and leave
 const sw=lt>1.1,go=lt>2.4;const cx=go?lerp(760,1500,eio(pr(lt,2.6,d))):760;
 const locals=LOCALS.map((c,i)=>`<g opacity="${pr(lt,i*.25,i*.25+.2)}">${person(c,{x:90+i*140,y:1560,s:.5,expr:'worry'})}</g>`).join('');
 return {svg:night(lt)+`<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/>`+locals+sedan({x:cx,y:1640,s:.8,heads:go?4:0,rot:go?lt*900:0})+
  person(ME,{x:330,y:1840,s:.82,expr:'sad'})+person(F1,{x:520,y:1840,s:.82,expr:'worry'})+
  (go?'':person(GUNDA,{x:820,y:1860,s:1.05,flip:true,expr:'angry',ra:sw?-100+Math.sin(lt*14)*12:-10}))+(sw&&!go?grawlix(640,1080,pop(lt,1.1,.3),lt):''),html:''};
});
add(55.72,60.31,(lt,d)=>{ // why didn't any of you do something?
 const ask=lt>1.66;
 return {svg:night(lt)+`<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/>`+
  LOCALS.map((c,i)=>person(c,{x:110+i*150,y:1780+(i%2)*20,s:.75,expr:ask?(i%2?'worry':'serious'):'worry',headRot:ask?-14+i*4:0})).join('')+
  person(F1,{x:960,y:1800,s:.8,flip:true,expr:'worry'})+person(ME,{x:770,y:1820,s:.85,flip:true,expr:ask?'angry':'sad',la:ask?120+Math.sin(lt*6)*10:10,ra:ask?-120-Math.sin(lt*6)*10:-10}),html:''};
});
add(60.31,64.21,(lt,d)=>{ // son... do you know who he is?
 if(lt<2.23){const ox=lerp(150,560,eo(pr(lt,0,1)));const hand=lt>1.1;
  return {svg:night(lt)+`<rect x="0" y="1300" width="${W}" height="620" fill="#3a3550"/>`+
   person(ME,{x:800,y:1820,s:.85,flip:true,expr:'worry'})+person(LOCALS[0],{x:ox,y:1820,s:.85,walk:lt<1?lt*9:null,expr:'serious',ra:hand?-75:-10}),html:''};}
 const l=lt-2.23;const z=1+.06*pr(l,0,1.7);
 return {svg:`<rect width="${W}" height="${H}" fill="#120a1e"/><g opacity="${.35+.15*Math.sin(l*5)}"><circle cx="540" cy="900" r="520" fill="#b71c1c"/></g>`+
  `<g opacity=".55">${person({...GUNDA,shirt:'#000',pants:'#000',skin:'#000',hair:'#000'},{x:540,y:1500,s:1.5,expr:'serious'})}</g>`+
  `<g transform="translate(540,1300) scale(${z}) translate(-540,-1300)">${person(LOCALS[0],{x:300,y:2150,s:1.7,expr:'serious'})}${person(ME,{x:820,y:2150,s:1.5,flip:true,expr:'shock',sweat:1})}</g>`,html:''};
});
add(64.21,65.74,(lt,d)=>({ // end card
 svg:TG,html:`<div class="big" style="top:640px;font-size:80px;color:#fff;opacity:${pr(lt,0,.3)}">ബാക്കി...</div><div class="big" style="top:760px;font-size:170px;color:#ffd43b;text-shadow:0 10px 0 #000;transform:scale(${pop(lt,.7,.4)})">പാർട്ട് 2</div>`}));

const SUBS=[
[0.16,"Carnival night..."],
[1.38,"Carnival night... a chase!"],
[2.55,"Carnival night... a chase! Part 1"],
[3.79,"Back when I was doing my Plus Two."],
[5.12,"There was a ten-day carnival in town."],
[6.61,"We were there six of those ten days!"],
[8.61,"One night, at 12:30,"],
[9.72,"my friend and I were riding back on our Activa."],
[11.9,"Behind us, a car was swerving all over the road."],
[12.86,"Suddenly it overtook us..."],
[14.01,"...missing us by an inch!"],
[15.29,"Furious, I told my friend,"],
[17.18,"\"Don't let them go...\""],
[17.55,"\"Don't let them go... catch them!\""],
[18.36,"\"Let's give them a piece of our mind!\""],
[19.08,"He got all fired up too."],
[20.81,"He chased them down, overtook them,"],
[22.54,"and stopped our scooter right in front of the car."],
[24.05,"I walked up to the car and asked,"],
[26.53,"\"What's this, man...\""],
[26.95,"\"What's this, man... trying to kill us?\""],
[28.13,"Out stepped..."],
[28.75,"...a six-footer,"],
[30.5,"...a six-footer, huge,"],
[31.31,"...with a cigarette between his lips."],
[32.6,"We were done for!"],
[33.21,"Three more got out behind him,"],
[34.84,"one of them in a mundu."],
[36.04,"The big guy grabbed me by the shirt."],
[37.37,"\"Who are you to question me?\""],
[38.87,"His cigarette fell inside my shirt..."],
[42.42,"It burned!"],
[42.76,"My friend jumped in,"],
[43.45,"threw a punch..."],
[44.5,"...and it landed!"],
[45.56,"But every blow the big guy threw landed right on me."],
[48.42,"I was swinging too..."],
[49.72,"I was swinging too... but nothing connected!"],
[51.85,"When a crowd gathered,"],
[52.95,"they swore at us and left."],
[55.72,"I asked the people there,"],
[57.38,"\"Why didn't any of you do something?\""],
[60.31,"One man said..."],
[61.41,"\"Son...\""],
[62.54,"\"Son... do you know who he is?\""],
[64.21,"The rest..."],
[64.91,"...in Part 2!"],
];
function subAt(t){let s=null;for(const [a,x] of SUBS){if(t>=a)s=x;}return s;}

// ---------- sync fix: scene/caption times above were one phrase early from 12 s to 55 s ----------
// Each pair is [real voice time, time used in the scenes above]; real times come from a DTW
// alignment of the recording against espeak-ng Malayalam, snapped to the pauses in the audio.
const WARP=[[0,0],[11.9,11.9],[14.0,12.86],[15.29,14.01],[17.18,15.29],[18.36,17.18],[19.08,17.55],[19.73,18.36],[20.81,19.08],[22.54,20.81],[24.32,22.54],[26.53,24.05],[28.13,26.53],[28.75,26.95],[30.5,28.13],[31.31,28.75],[32.6,30.5],[33.21,31.31],[34.84,32.6],[36.04,33.21],[37.375,34.84],[38.87,36.04],[40.44,37.37],[42.42,38.87],[44.5,42.42],[45.56,42.76],[46.17,43.45],[47.21,44.5],[48.42,45.56],[51.81,48.42],[52.77,49.72],[54.88,51.85],[55.72,52.95],[57.38,55.72],[58.04,57.38],[60.31,60.31],[65.74,65.74]];
const _render=window.render;
window.render=function(t){for(let i=1;i<WARP.length;i++){const [a,oa]=WARP[i-1],[b,ob]=WARP[i];if(t<=b){return _render(oa+(ob-oa)*cl((t-a)/(b-a)));}}return _render(t);};
