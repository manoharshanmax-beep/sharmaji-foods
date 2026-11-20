import {readFile,writeFile} from 'node:fs/promises';
import {documentPage} from '../server/site.js';
import {routes} from '../public/view.js';

const filenames=Object.fromEntries(Object.keys(routes).map(route=>[route,route==='/'?'index.html':route.slice(1)+'.html']));
function localLinks(html){
 return html.replace(/href="(\/[^"]*)"/g,(original,url)=>{
  const [path,query]=url.split('?');
  return filenames[path]?'href="'+filenames[path]+(query?'?'+query:'')+'"':original;
 }).replaceAll('src="/images/','src="public/images/');
}
function plainScript(text){
 return text.replace(/^import .+;\r?\n/gm,'').replace(/^export \{.+\};\r?\n/gm,'').replace(/^export /gm,'');
}
const commons=[];
for(const file of ['config','language','model','view'])commons.push(plainScript(await readFile('public/'+file+'.js','utf8')));
const initial=plainScript(await readFile('public/app.js','utf8'));
let app=initial.replace(/^const path=.*?;$/m,'const path=document.body.dataset.page;')
 .replace('innerHTML=render(path,lang,{cart,plan,fields})','innerHTML=localLinks(render(path,lang,{cart,plan,fields}))')
 .replace("location.assign('/cart')","location.assign('cart.html')");
const bundle='const filenames='+JSON.stringify(filenames)+';\n'+localLinks.toString()+'\n'+commons.join('\n')+'\n;(()=>{\n'+app+'\n})();\n';
await writeFile('public/local-preview.js',bundle);
for(const [path,filename] of Object.entries(filenames)){
 const html=localLinks(documentPage(path)).replace('href="/favicon.svg"','href="public/favicon.svg"').replace('href="/style.css"','href="public/style.css"').replace('<script type="module" src="/app.js"></script>','<script defer src="public/local-preview.js"></script>').replace('<body>','<body data-page="'+path+'">');
 await writeFile(filename,html);
}
