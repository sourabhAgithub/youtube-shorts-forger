// Screenshot chosen moments of a part for checking: node tools/preview.js stories/<slug>/part1 1.5 12 30.2 ...
// Writes <dir>/preview/p_<i>.png and a contact sheet <dir>/preview/sheet.png (needs ffmpeg).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const {execSync}=require('child_process');
const dir=path.resolve(process.argv[2]);const ts=process.argv.slice(3).map(Number);const out=path.join(dir,'preview');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.join(dir,'index.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
 for(let i=0;i<ts.length;i++){await p.evaluate(t=>render(t),ts[i]);await p.screenshot({path:path.join(out,`p_${i}.png`)});}
 await b.close();console.log(errs.length?'page errors: '+errs.join(' | '):'no page errors');
 try{execSync(`ffmpeg -y -loglevel error -i ${out}/p_%d.png -vf "scale=270:480,tile=${Math.min(6,ts.length)}x${Math.ceil(ts.length/6)}" ${out}/sheet.png`);console.log('sheet: '+out+'/sheet.png');}catch(e){}})();
