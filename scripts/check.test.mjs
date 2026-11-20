import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import worker from '../dist/server/index.js';
import {freshPlan,indianDate,whatsappOrderUrl} from '../public/model.js';
import {render,routes} from '../public/view.js';
import {shop} from '../public/config.js';
import {translate} from '../public/language.js';
import {orderEndpoint} from '../server/orders.js';
function database(){
 const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_orders.sql','utf8'));
 return {db,DB:{prepare(sql){return {bind(...args){const query=db.prepare(sql);return {first:()=>query.get(...args),run:()=>({meta:query.run(...args)})}}}}}};
}
const request=o=>new Request('https://example.test/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)});
const booking=()=>({id:crypto.randomUUID(),name:'Kitchen test',phone:'9000000000',date:indianDate(Date.now()+86400000),time:'12:00',occasion:'Family gathering',method:'Pickup',plan:freshPlan()});
test('booking, price calculation, optional curd, delivery and idempotence',async()=>{
 const env=database(),o=booking();o.method='Delivery';o.address='Test address';o.plan.items.dahi=3;o.plan.items.raita=2;o.total=1;
 const result=await orderEndpoint(request(o),env);assert.equal(result.status,201);
 assert.equal((await result.json()).total,870);
 assert.equal((await orderEndpoint(request(o),env)).status,200);
 assert.equal((await orderEndpoint(request({...o,name:'Changed'}),env)).status,409);
 assert.equal(env.db.prepare('select count(*) as n from bookings').get().n,1);
 assert.equal(env.db.prepare('select notification from bookings').get().notification,'unconfigured');
});
test('invalid and past bookings are rejected; failed storage never produces a receipt',async()=>{
 for(const edit of [o=>o.plan.guests=51,o=>o.date='2020-01-01',o=>o.method='Delivery',o=>o.plan.items.gobi=-1,o=>o.time='25:31',o=>o.plan.items.gobi=30,o=>o.plan.items.chapati=0]){
  const o=booking();edit(o);assert.equal((await orderEndpoint(request(o),database())).status,400);
 }
 assert.equal((await orderEndpoint(request(booking()),{})).status,503);
});
test('Twilio notification is submitted once for a repeated booking',async()=>{
 const env={...database(),TWILIO_ACCOUNT_SID:'sample',TWILIO_AUTH_TOKEN:'test',TWILIO_FROM:'test',OWNER_SMS_NUMBER:'test'};
 const original=globalThis.fetch;let count=0;
 globalThis.fetch=async(url,options)=>{count++;assert.match(url,/api\.twilio\.com/);assert.equal(options.body.get('To'),'test');return new Response('{}',{status:201})};
 try{const o=booking();await orderEndpoint(request(o),env);await orderEndpoint(request(o),env);assert.equal(count,1);assert.equal(env.db.prepare('select notification from bookings').get().notification,'accepted')}finally{globalThis.fetch=original}
});
test('all pages and internal assets resolve, including translated checkout and WhatsApp receipt',async()=>{
 for(const [p] of Object.entries(routes)){
  const response=await worker.fetch(new Request('https://example.test'+p),{});
  assert.equal(response.status,p==='/404'?404:200);
  const html=await response.text();assert.match(html,/<meta name="description"/);
  for(const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g))assert.equal((await worker.fetch(new Request('https://example.test'+m[1]),{})).status,200,m[1]);
 }
 assert.equal((await worker.fetch(new Request('https://example.test/missing-page'),{})).status,404);
 for(const lang of ['en','ta','hi'])assert.ok(render('/checkout',lang,{cart:freshPlan()}).includes(translate(lang,'Required time (IST)')));
 assert.equal((await worker.fetch(new Request('https://example.test/confirmation'),{})).status,404);
});
test('each free sabji and both add-ons appear in the kitchen WhatsApp draft',async()=>{
 for(const id of ['lauki','aloo','gobi']){
  const o=booking();o.plan.items={chapati:15,lauki:0,aloo:0,gobi:0,dahi:1,raita:1};o.plan.items[id]=15;
  const result=await orderEndpoint(request(o),database());assert.equal(result.status,201);
  const saved=await result.json();assert.equal(saved.total,410);
  const msg=new URL(whatsappOrderUrl(saved)).searchParams.get('text');
  assert.ok(msg.includes('Complimentary'));assert.ok(msg.includes('Dahi packet × 1'));assert.ok(msg.includes('Raita × 1'));assert.ok(msg.includes('₹410'));
 }
});
test('configured WhatsApp API targets the kitchen once on retry',async()=>{
 const env={...database(),TWILIO_ACCOUNT_SID:'sample',TWILIO_AUTH_TOKEN:'test',TWILIO_WHATSAPP_FROM:'+10000000000',TWILIO_WHATSAPP_CONTENT_SID:'template'};
 const original=globalThis.fetch;let calls=0;let params;
 globalThis.fetch=async(url,req)=>{calls++;params=req.body;return new Response('{}',{status:201})};
 try{const o=booking();for(let n=0;n<2;n++)assert.equal((await (await orderEndpoint(request(o),env)).json()).whatsappQueued,true);
  assert.equal(calls,1);assert.equal(params.get('To'),'whatsapp:+919626750414');assert.match(params.get('ContentVariables'),/Aloo Sabji/);
 }finally{globalThis.fetch=original}
});

test('minimum chapatis and per-variety pricing are enforced by the booking API',async()=>{
 const o=booking();o.plan.items.chapati=o.plan.items.aloo=14;
 assert.equal((await orderEndpoint(request(o),database())).status,400);
 o.plan.items.chapati=o.plan.items.aloo=15;
 for(const [extras,total] of [[[],375],[['gobi'],475],[['gobi','lauki'],575]]){
  o.plan.extraSabjis=extras;
  const response=await orderEndpoint(request(o),database());assert.equal(response.status,201);
  const record=await response.json();assert.equal(record.total,total);
  const message=new URL(whatsappOrderUrl(record)).searchParams.get('text');
  assert.ok(message.includes('Aloo Sabji — Complimentary'));assert.equal(message.split('— ₹100').length-1,extras.length);
 }
 for(const bad of [['aloo'],['lauki','lauki'],['unknown']]){
  o.plan.extraSabjis=bad;assert.equal((await orderEndpoint(request(o),database())).status,400);
 }
});
