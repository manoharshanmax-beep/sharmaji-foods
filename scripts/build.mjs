import {readdir,readFile,mkdir,writeFile,copyFile} from 'node:fs/promises';
import path from 'node:path';
const assets={};
const types={'.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp'};
async function collect(dir){
 for(const f of await readdir(dir,{withFileTypes:true})){
  const full=path.join(dir,f.name);
  if(f.isDirectory()){await collect(full);continue}
  const ext=path.extname(full),binary=ext==='.webp';
  assets['/'+path.relative('public',full).split(path.sep).join('/')]={type:types[ext],binary,data:(await readFile(full)).toString(binary?'base64':'utf8')};
 }
}
await collect('public');
const sources=[];
for(const p of ['public/config.js','public/language.js','public/model.js','public/view.js','server/orders.js','server/site.js']){
 const code=await readFile(p,'utf8');
 sources.push(code.replace(/^import .+;\n/gm,'').replace(/^export \{.+\};\n/gm,'').replace(/^export /gm,''));
}
await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
await copyFile('.openai/hosting.json','dist/.openai/hosting.json');
await writeFile('dist/server/index.js',sources.join('\n')+'\nexport default makeWorker('+JSON.stringify(assets)+');\n');

