// Render a story part to JPEG frames with headless Chromium (Playwright).
// Usage: node tools/render.js stories/<slug>/part1 <durationSeconds> [fps=30] [workers=4]
// Expects <dir>/index.html (copy of engine/template.html) and <dir>/scenes.js. Writes <dir>/frames/.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const dir=path.resolve(process.argv[2]),DUR=+process.argv[3],FPS=+(process.argv[4]||30),K=+(process.argv[5]||4);
const N=Math.ceil(DUR*FPS);fs.rmSync(path.join(dir,'frames'),{recursive:true,force:true});fs.mkdirSync(path.join(dir,'frames'));
(async()=>{const b=await chromium.launch();await Promise.all([...Array(K)].map(async(_,w)=>{
 const p=await b.newPage({viewport:{width:1080,height:1920}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.join(dir,'index.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1000);
 for(let i=w;i<N;i+=K){await p.evaluate(t=>render(t),i/FPS);await p.screenshot({path:path.join(dir,'frames',`f${String(i).padStart(5,'0')}.jpg`),type:'jpeg',quality:90});}
 if(errs.length)console.error('page errors:',errs.slice(0,3));}));await b.close();console.log(`${N} frames -> ${dir}/frames`);})();
