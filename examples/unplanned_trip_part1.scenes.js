add(0,4.25,(lt,d)=>{
 const x=lerp(-600,540,eo(pr(lt,0,1.3)));
 return {svg:`<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#tg)"/><ellipse cx="540" cy="1320" rx="420" ry="40" fill="rgba(0,0,0,.3)"/>${suv({x,y:1310,s:1.1,heads:5,rot:lt*500*(1-pr(lt,0,1.3))})}`,
  html:`<div class="big" style="top:500px;font-size:100px;line-height:1.15;color:#fff;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,.15,.45)})">അൺപ്ലാൻഡ് ട്രിപ്പ്...</div><div class="big" style="top:640px;font-size:76px;line-height:1.15;color:#ffd43b;text-shadow:0 8px 0 #000;transform:scale(${pop(lt,1.45,.45)})">അൺപ്ലാൻഡ് എക്സ്പീരിയൻസ്!</div><div class="big" style="top:820px;font-size:64px;transform:scale(${pop(lt,3.2,.4)})"><span style="background:#ff5d73;color:#fff;padding:6px 30px;border-radius:24px;border:6px solid #1a1a1a">പാർട്ട് 1</span></div>`};
});
add(4.25,7.9,(lt,d)=>{ // five friends plan the dam trip
 const gang=[[F1,140],[F2,330],[ME,540],[F3,750],[F4,940]].map(([c,x],i)=>person(c,{x,y:1700,s:.72,expr:'grin',ra:i===2?-150:-20,la:i===2?20:10,bob:Math.abs(Math.sin(lt*6+i))*-8})).join('');
 const b=pop(lt,.6,.45);
 return {svg:parkingBg()+gang+`<g transform="translate(540,900) scale(${b})"><circle cx="-60" cy="250" r="16" fill="#fff" stroke="#333" stroke-width="5"/><circle cx="-30" cy="200" r="26" fill="#fff" stroke="#333" stroke-width="5"/>
  <path d="M-330,0 C-380,-150 -220,-280 -60,-240 C0,-350 260,-340 300,-210 C420,-190 430,0 330,60 C360,180 200,250 80,200 C0,280 -200,270 -240,180 C-380,200 -420,60 -330,0Z" fill="#fff" stroke="#333" stroke-width="8"/>
  <path d="M-260,90 C-150,-20 150,-30 260,90Z" fill="#6cbf57"/>${dam(0,60,.7)}<path d="M-230,-120 L-180,-160 L-130,-120" stroke="#5d4037" stroke-width="10" fill="none"/></g>`,html:''};
});
add(7.9,10.4,(lt,d)=>({ // off in the Terrano
 svg:sky()+cloud(200,300,.9)+cloud(760,420,.7)+ground(1350,'#6cbf57')+`<rect x="0" y="1500" width="${W}" height="200" fill="#8d8a80"/><rect x="0" y="1594" width="${W}" height="10" fill="#fff" opacity=".8"/>`+
  [...Array(5)].map((_,i)=>palm(1300-((i*360+lt*700)%1800),1400,.8,0)).join('')+suv({x:540,y:1690,s:1.05,heads:5,rot:lt*700,flash:lt>1.6&&lt<1.9?1-pr(lt,1.6,1.9):0})+
  `<g transform="translate(${[0,1,2].map(i=>0)[0]},0)">${[0,1,2].map(i=>`<rect x="${120-((lt*900+i*160)%300)}" y="${1460+i*50}" width="110" height="10" rx="5" fill="#fff" opacity=".8"/>`).join('')}</g>`,html:''}));
add(10.4,13.85,(lt,d)=>{ // winding hill road with dam on top
 const road="M560,620 C820,700 820,820 520,880 C220,940 220,1060 520,1120 C820,1180 820,1320 560,1420 C420,1480 360,1560 420,1700";
 const p=1-eio(pr(lt,0,d));
 return {svg:sky()+cloud(100,160,.8)+`<path d="M0,760 C200,560 420,520 560,520 C760,520 900,620 1080,760 L1080,1920 L0,1920Z" fill="#6cbf57"/>`+dam(560,620,.6)+palm(100,960,.6,0)+palm(980,1160,.6,0)+palm(140,1360,.5,0)+
  `<path id="rd" d="${road}" stroke="#8d8a80" stroke-width="80" fill="none" stroke-linecap="round"/><path d="${road}" stroke="#fff" stroke-width="6" fill="none" stroke-dasharray="26 26"/>
  ${(()=>{const pt=roadPt(road,p);return `<g transform="translate(${pt.x},${pt.y})"><circle r="30" fill="${SUVC}" stroke="#1a1a1a" stroke-width="7"/><circle r="10" fill="#fff"/></g>`})()}`,html:''};
});
add(13.85,16.75,(lt,d)=>({ // slow drive uphill, friends clicking photos
 svg:sky()+cloud(200,260,.8)+cloud(800,380,.7)+slopeBg(-14,-lt*120)+`<g transform="translate(540,1300) rotate(-14)"><g transform="translate(0,170)">${suv({x:0,y:0,s:.95,heads:5,rot:lt*120,flash:lt>1.9&&lt<2.3?1-pr(lt,1.9,2.3):(lt>.4&&lt<.8?1-pr(lt,.4,.8):0)})}</g></g>`,html:''}));
add(16.75,18.3,(lt,d)=>({ // sharp curve ahead
 svg:sky()+`<path d="M0,1250 C300,1150 700,1150 1080,1250 L1080,1920 L0,1920Z" fill="#6cbf57"/><path d="M-50,1920 C200,1500 300,1350 700,1300 C900,1280 1000,1200 1130,1100" stroke="#8d8a80" stroke-width="200" fill="none"/><path d="M-50,1920 C200,1500 300,1350 700,1300 C900,1280 1000,1200 1130,1100" stroke="#fff" stroke-width="8" fill="none" stroke-dasharray="40 40"/>`+
  `<g transform="translate(780,820) scale(${pop(lt,.2,.4)})">${curveSign(0,0,1.1)}</g>`,html:''}));
add(18.3,22.3,(lt,d)=>{ // bike speeds down on wrong side
 const k=pr(lt,0,d);const bx=lerp(1300,700,eo(k));
 return {svg:sky()+cloud(160,300,.8)+slopeBg(-12,0)+`<g transform="translate(540,1300) rotate(-12)"><g transform="translate(0,170)">${suv({x:-330,y:0,s:.8,heads:5,rot:lt*100})}${riders(bx-540,40,1,lt)}
  ${[0,1,2].map(i=>`<rect x="${bx-540+180+i*20}" y="${-250+i*55}" width="${120+i*30}" height="10" rx="5" fill="#fff" opacity=".85"/>`).join('')}</g></g>`+
  (lt>2.4?`<text x="540" y="${880+Math.sin(lt*10)*8}" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${300*pop(lt,2.4,.3)}" fill="#ff3d3d" stroke="#1a1a1a" stroke-width="10">!</text>`:''),html:''};
});
add(22.3,23.95,(lt,d)=>{ // I swerve left
 const sw=eo(pr(lt,0,.9));
 return {svg:sky()+slopeBg(-12,0)+`<g transform="translate(540,1300) rotate(-12)"><g transform="translate(0,170)">${suv({x:-330-sw*120,y:-sw*40,s:.8,heads:5,tilt:-sw*8,rot:lt*200})}${riders(lerp(160,40,eo(pr(lt,0,d))),40,1,lt)}</g></g>`+
  `<path d="M300,880 L180,880 M210,840 L170,880 L210,920" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${pr(lt,.1,.4)}"/>`,html:''};
});
add(23.95,27.7,(lt,d)=>{ // crash into rear tyre
 const HT=1.35;const hit=lt>HT;const sh=hit?Math.sin(lt*70)*16*(1-pr(lt,HT,HT+.85)):0;
 return {svg:`<g transform="translate(${sh},${sh/2})">`+sky()+ground(1350,'#8d8a80')+suv({x:640,y:1640,s:1,heads:5,bent:hit,rot:0})+
  (hit?`<g transform="translate(330,1450) rotate(${-20+lt*20})"><path d="M0,-30 L70,-80 L60,-20 L140,-30 L80,20 L130,90 L50,60 L20,140 L-10,60 L-90,100 L-50,20 L-120,-10 L-40,-30 L-60,-100Z" fill="#ffd43b" stroke="#e53935" stroke-width="10" transform="scale(${pop(lt,HT,.25)*1.4})"/></g>`:
   riders(lerp(-200,240,eo(pr(lt,.3,HT))),1660,1.1,lt))+
  (hit?`<g transform="translate(150,1700) rotate(-75)">${bike({x:0,y:0,s:.8,color:'#e53935'})}</g>`:'')+`</g>`,html:''};
});
add(27.7,31.5,(lt,d)=>({ // both riders down
 svg:sky()+ground(1350,'#8d8a80')+`<g transform="translate(280,1650) rotate(-90)">${person(RIDER1,{x:0,y:0,s:.7,expr:'sad'})}</g><g transform="translate(560,1700) rotate(-82)">${person(RIDER2,{x:0,y:0,s:.7,expr:'worry'})}</g>`+
  `<g transform="translate(840,1680) rotate(-70)">${bike({x:0,y:0,s:.7,color:'#e53935'})}</g>`+
  [0,1,2].map(i=>spark(220+i*30+Math.cos(lt*5+i*2)*40,1560+Math.sin(lt*5+i*2)*14,.8)).join(''),html:''}));
add(31.5,33.35,(lt,d)=>({ // we were angry
 svg:burst('#ff8a80','#ff5252',lt*20)+[[F1,110],[F2,325],[ME,540],[F3,755],[F4,970]].map(([c,x],i)=>person(c,{x,y:1780,s:.8,expr:'angry',ra:i===2?-110+Math.sin(lt*12)*12:-20,la:20})).join(''),html:''}));
add(33.35,38.05,(lt,d)=>{
 if(lt<2.55){ // rider unconscious
  return {svg:sky()+ground(1350,'#8d8a80')+`<g transform="translate(560,1680) rotate(-90)">${person(RIDER1,{x:0,y:0,s:.9,expr:'sad'})}</g>`+
   [0,1,2,3].map(i=>spark(420+Math.cos(lt*4+i*1.6)*80,1520+Math.sin(lt*4+i*1.6)*20,.9,'#ffd43b')).join('')+person(ME,{x:180,y:1780,s:.85,expr:'shock'})+person(F2,{x:900,y:1780,s:.85,flip:true,expr:'worry',sweat:1}),html:''};}
 const l=lt-2.55;
 return {svg:sky()+cloud(200,300,.8)+ground(1350,'#6cbf57')+`<rect x="0" y="1500" width="${W}" height="200" fill="#8d8a80"/>`+[...Array(4)].map((_,i)=>palm(1300-((i*400+l*900)%1800),1400,.8,0)).join('')+
  `<g transform="translate(900,1200)"><rect x="-6" y="0" width="12" height="300" fill="#78909c"/><rect x="-90" y="-90" width="180" height="140" rx="14" fill="#fff" stroke="#1a1a1a" stroke-width="8"/><rect x="-14" y="-70" width="28" height="100" fill="#e53935"/><rect x="-50" y="-34" width="100" height="28" fill="#e53935"/></g>`+suv({x:420,y:1690,s:.95,rot:l*900}),html:''};
});
add(38.05,40.85,(lt,d)=>{ // car pulling left, wobbling
 const wob=Math.sin(lt*9)*4;
 return {svg:sky()+cloud(200,300,.8)+ground(1350,'#6cbf57')+`<rect x="0" y="1500" width="${W}" height="200" fill="#8d8a80"/>`+[...Array(4)].map((_,i)=>palm(1300-((i*400+lt*500)%1800),1400,.8,0)).join('')+
  suv({x:540+Math.sin(lt*3)*14,y:1690+Math.abs(Math.sin(lt*9))*-8,s:1,tilt:wob,rot:lt*500,bent:true})+
  (lt>.95?`<text x="540" y="1050" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${240*pop(lt,.95,.3)}" fill="#ffd43b" stroke="#1a1a1a" stroke-width="10">?!</text>`:''),html:''};
});
add(40.85,46.05,(lt,d)=>{ // auto takes him to hospital
 const ax=lt<2.4?lerp(1400,700,eo(pr(lt,.9,2.0))):lerp(700,1500,eio(pr(lt,2.6,d-.3)));
 return {svg:sky()+cloud(200,300,.8)+ground(1350,'#6cbf57')+`<rect x="0" y="1500" width="${W}" height="200" fill="#8d8a80"/>`+
  suv({x:200,y:1690,s:.7,bent:true})+person(ME,{x:420,y:1700,s:.75,expr:'worry',ra:lt>.9&&lt<2.0?-150+Math.sin(lt*14)*15:-20})+
  autoR({x:ax,y:1690,s:.95,rot:lt*600,pax:lt>=2.4})+(lt<2.4?`${person(F1,{x:520,y:1720,s:.6,expr:'worry'})}${person(F4,{x:600,y:1720,s:.6,expr:'worry'})}`:''),html:''};
});
add(46.05,51.2,(lt,d)=>{ // bent wheel, spare tyre, same problem
 const sp=lt>2.72;const x=lt>3.76;
 return {svg:`<rect width="${W}" height="${H}" fill="#2c6fbb"/><rect x="0" y="1300" width="${W}" height="620" fill="#455a64"/><path d="M0,560 L1080,560 L1080,760 L0,760Z" fill="#1a1a1a" opacity=".25"/>`+
  `<path d="M140,980 A400,400 0 0 1 940,980Z" fill="#1a1a1a"/>`+
  (sp?`<g transform="translate(540,1080)">${wheel(0,0,250*pop(lt,2.72,.35),lt*30)}</g>`:`<g transform="translate(540,1080) skewX(14) scale(.82,1)">${wheel(0,0,250,0)}</g>`)+
  (sp?'':`<path d="M400,820 L470,880 M680,820 L610,880" stroke="#ffd43b" stroke-width="16" stroke-linecap="round" opacity="${.5+.5*Math.sin(lt*10)}"/>`)+
  (x?`<g transform="translate(540,1080) scale(${pop(lt,3.76,.3)})" opacity=".92"><path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke="#fff" stroke-width="70" stroke-linecap="round"/><path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke="#e53935" stroke-width="40" stroke-linecap="round"/></g>`:''),html:''};
});
add(51.2,54.8,(lt,d)=>{ // axle reveal
 const rv=lt>1.5;const g=.5+.5*Math.sin(lt*8);
 return {svg:`<rect width="${W}" height="${H}" fill="#263238"/><rect x="120" y="760" width="840" height="300" rx="40" fill="#37474f" stroke="#1a1a1a" stroke-width="8"/>`+
  `<g transform="translate(200,1200)">${wheel(0,0,120,0)}</g><g transform="translate(880,1200)">${wheel(0,0,120,0)}</g>`+
  `<path d="M200,1200 L500,1200 L580,${rv?1250:1200} L880,1200" stroke="#9aa3ad" stroke-width="44" fill="none" stroke-linejoin="round"/><path d="M200,1200 L500,1200 L580,${rv?1250:1200} L880,1200" stroke="#1a1a1a" stroke-width="6" fill="none"/>`+
  (rv?`<circle cx="545" cy="1225" r="${90+g*30}" fill="#ff1744" opacity="${.25+g*.25}"/>`:`<circle cx="540" cy="1200" r="${70+lt*20}" fill="none" stroke="#ffd43b" stroke-width="10" opacity=".7"/>`),
  html:''};
});
add(54.8,58.05,(lt,d)=>{ // 100 km from home, 2000 rupees
 const dr=eio(pr(lt,0,1.2));const w=pop(lt,1.3,.4);
 const path="M220,1500 C300,1200 700,1300 640,1000 C600,780 820,700 860,560";
 return {svg:`<rect width="${W}" height="${H}" fill="#e8f5e9"/>`+[...Array(9)].map((_,i)=>`<path d="M0,${200+i*190} L1080,${260+i*190}" stroke="#c8e6c9" stroke-width="30"/>`).join('')+
  `<path d="${path}" pathLength="1" stroke="#1a1a1a" stroke-width="14" fill="none" stroke-dasharray="${dr} 1" stroke-linecap="round"/>`+
  `<g transform="translate(220,1500)"><circle r="46" fill="${SUVC}" stroke="#1a1a1a" stroke-width="8"/><text y="16" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="44" fill="#fff">!</text></g>`+
  `<g transform="translate(860,540)"><path d="M-70,0 L0,-70 L70,0 L70,80 L-70,80Z" fill="#ffd43b" stroke="#1a1a1a" stroke-width="8"/><rect x="-20" y="20" width="40" height="60" fill="#8d6e63"/></g>`+
  `<g transform="translate(300,1700) scale(${w})"><rect x="-150" y="-90" width="300" height="180" rx="26" fill="#8d6e63" stroke="#1a1a1a" stroke-width="8"/><rect x="-120" y="-150" width="240" height="110" rx="10" fill="#81c784" stroke="#1a1a1a" stroke-width="6"/><circle cx="0" cy="-95" r="30" fill="none" stroke="#2e7d32" stroke-width="6"/><rect x="-100" y="-138" width="200" height="86" rx="6" fill="none" stroke="#2e7d32" stroke-width="4"/></g>`,html:''};
});
add(58.05,59.85,(lt,d)=>({ // how do we get home?
 svg:sky('#7e57c2','#ffab91')+ground(1350,'#8d8a80')+suv({x:640,y:1640,s:.85,bent:true})+person(ME,{x:220,y:1760,s:1,expr:'worry',la:150,ra:-150,sweat:1})+
  `<text x="760" y="${1000+Math.sin(lt*5)*14}" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${280*pop(lt,.15,.35)}" fill="#ffd43b" stroke="#1a1a1a" stroke-width="10">?</text>`,html:''}));
add(59.85,61.68,(lt,d)=>({ // part 2
 svg:`<defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b4b"/><stop offset="1" stop-color="#5b2bb5"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#eg)"/>`,
 html:`<div class="big" style="top:640px;font-size:80px;color:#fff;opacity:${pr(lt,0,.3)}">ബാക്കി...</div><div class="big" style="top:760px;font-size:170px;color:#ffd43b;text-shadow:0 10px 0 #000;transform:scale(${pop(lt,.85,.4)})">പാർട്ട് 2</div>`}));

// ---------- subtitles (aligned to detected speech) ----------
const SUBS=[
[0.15,"Unplanned trip..."],
[1.45,"Unplanned trip... unplanned experience!"],
[3.2,"Unplanned trip... unplanned experience! Part 1"],
[4.25,"My first year of college."],
[5.4,"Five of us planned a trip to see a dam."],
[7.9,"We set off in my Terrano,"],
[8.6,"We set off in my Terrano, camera in hand."],
[10.4,"Just before the dam, there's a steep climb,"],
[12.3,"full of curves."],
[13.85,"I was driving slowly..."],
[15.1,"...while my friends clicked photos."],
[16.75,"At a big curve..."],
[18.3,"...a bike came down from above,"],
[19.95,"at full speed,"],
[20.7,"right into our side of the road!"],
[22.3,"I swerved to the left."],
[23.95,"But..."],
[24.75,"But... the bike crashed into my car's rear tyre!"],
[27.7,"Both of them fell!"],
[29.55,"Wrong side, full speed..."],
[31.5,"At first, we were really angry."],
[33.35,"But the rider seemed to have passed out."],
[35.9,"We put him in our car and rushed to the hospital."],
[38.05,"On the way..."],
[39.0,"...the car kept pulling to the left!"],
[40.85,"We couldn't risk it."],
[42.0,"We waved down an auto,"],
[43.25,"and two friends took him to the hospital."],
[46.05,"The rear wheel was bent."],
[48.75,"We put on the spare tyre..."],
[49.8,"Same problem!"],
[51.25,"That's when it hit us..."],
[52.7,"...the axle was the problem!"],
[54.85,"100 km from home..."],
[56.1,"100 km from home... with just \u20b9200 in my pocket."],
[58.1,"How would we get home now?"],
[59.9,"The rest..."],
[60.7,"...in Part 2!"],
];
function subAt(t){let s=null;for(const [a,x] of SUBS){if(t>=a)s=x;}return s;}

