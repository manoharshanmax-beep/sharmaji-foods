import './build.mjs';
import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
const {default:worker}=await import('../dist/server/index.js');
const sqlite=new DatabaseSync(process.env.BOOKINGS_DB||'preview.sqlite');
if(!sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='bookings'").get())sqlite.exec(readFileSync('drizzle/0000_orders.sql','utf8'));
const DB={prepare(sql){return {bind(...args){const stmt=sqlite.prepare(sql);return {first:()=>stmt.get(...args),run:()=>({meta:stmt.run(...args)})}}}}};
const port=Number(process.env.PORT||process.argv[process.argv.indexOf('--port')+1])||5173;
createServer(async(req,res)=>{
 try{
  const chunks=[];for await(const chunk of req)chunks.push(chunk);
  const url=new URL(req.url,'http://'+req.headers.host);
  const headers=new Headers();for(const [k,v] of Object.entries(req.headers))if(v)headers.set(k,String(v));
  if(headers.has('origin')&&new URL(headers.get('origin')).host===url.host)headers.set('origin',url.origin);
  const request=new Request(url,{method:req.method,headers,...(chunks.length?{body:Buffer.concat(chunks)}:{})});
  const result=await worker.fetch(request,{...process.env,DB});res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));
 }catch{res.writeHead(500);res.end('Unable to load page')}
}).listen(port,'0.0.0.0');

