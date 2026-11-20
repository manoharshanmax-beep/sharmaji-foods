import {shop} from '../public/config.js';
import {dishes,occasions,futureEvent,orderTotal,validPlan,summary,sabjiIds} from '../public/model.js';
const reply=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
function parseOrder(raw){
 if(!raw||typeof raw!=='object'||typeof raw.id!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(raw.id)||!validPlan(raw.plan))return null;
 const order={id:raw.id,plan:{guests:raw.plan.guests,items:Object.fromEntries(dishes.map(([id])=>[id,raw.plan.items[id]]))}};
 for(const [key,max] of Object.entries({name:80,phone:18,occasion:40,date:10,time:5,method:10,area:120,address:300,notes:500})){
  const v=raw[key]??'';if(typeof v!=='string'||v.length>max)return null;
  order[key]=v.trim();
 }
 if(!order.name||!/^(?:\+?91)?[6-9]\d{9}$/.test(order.phone.replace(/[\s()-]/g,''))||!occasions.includes(order.occasion)||!['Pickup','Delivery'].includes(order.method))return null;
 if(order.method==='Delivery'&&(!order.address||(shop.deliveryAreas.length&&!shop.deliveryAreas.includes(order.area))))return null;
 if(order.method==='Pickup'){order.area='';order.address=''}
 if(raw.plan.extraSabjis?.length)order.plan.extraSabjis=sabjiIds.filter(id=>raw.plan.extraSabjis.includes(id));
 order.extraSabjiPrice=shop.extraSabjiPrice;
 order.fee=order.method==='Delivery'?shop.deliveryCharge:0;order.total=orderTotal(order);order.prices={...shop.prices};
 return order;
}
async function notifyOwner(env,o){
 // The owner is the only possible recipient. Store provider acceptance separately from confirmed delivery.
 const useWhatsApp=Boolean(env.TWILIO_WHATSAPP_FROM&&env.TWILIO_WHATSAPP_CONTENT_SID&&shop.whatsapp);
 if(!env.TWILIO_ACCOUNT_SID||!env.TWILIO_AUTH_TOKEN)return 'unconfigured';
 if(!useWhatsApp&&(!env.TWILIO_FROM||!env.OWNER_SMS_NUMBER))return 'unconfigured';
 try{
  const body=`Sharmaji Foods request ${o.id.slice(0,8)}: ${o.name}, ${o.phone}. ${o.occasion}, ${o.plan.guests} guests, ${o.date} ${o.time} IST, ${o.method}. Estimated INR ${o.total}.`;
  const parameters=useWhatsApp?{
   From:'whatsapp:'+env.TWILIO_WHATSAPP_FROM.replace(/^whatsapp:/,''),
   To:'whatsapp:+'+shop.whatsapp.replace(/\D/g,''),
   ContentSid:env.TWILIO_WHATSAPP_CONTENT_SID,
   ContentVariables:JSON.stringify({1:o.id.slice(0,8),2:summary(o).replace(/\s+/g,' ').trim()})
  }:{From:env.TWILIO_FROM,To:env.OWNER_SMS_NUMBER,Body:body};
  const response=await fetch(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(env.TWILIO_ACCOUNT_SID)}/Messages.json`,{method:'POST',headers:{Authorization:'Basic '+btoa(env.TWILIO_ACCOUNT_SID+':'+env.TWILIO_AUTH_TOKEN)},body:new URLSearchParams(parameters),signal:AbortSignal.timeout(9000)});
  return response.ok?(useWhatsApp?'whatsapp_accepted':'accepted'):'failed';
 }catch{return 'failed'}
}
export async function orderEndpoint(request,env){
 if(request.method!=='POST')return reply({error:'method'},405);
 const origin=request.headers.get('origin');
 if((origin&&origin!==new URL(request.url).origin)||!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'invalid request'},400);
 if(Number(request.headers.get('content-length'))>8192)return reply({error:'too large'},413);
 let order;
 try{const raw=await request.text();if(raw.length>8192)return reply({error:'too large'},413);order=parseOrder(JSON.parse(raw))}catch{return reply({error:'invalid'},400)}
 if(!order)return reply({error:'invalid fields'},400);
 const actorSource=request.headers.get('oai-authenticated-user-id')||request.headers.get('CF-Connecting-IP')||'local';
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(actorSource));
 const actor=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');
 const db=env.DB;
 if(!db)return reply({error:'booking service unavailable'},503);
 try{
  // A retry can return the caller's matching receipt even if menu prices have since changed.
  const prior=async()=>{const row=await db.prepare('SELECT actor,details,notification FROM bookings WHERE id=?').bind(order.id).first();
   if(!row)return null;
   if(row.actor!==actor)return reply({error:'reference conflict'},409);
   const stored=JSON.parse(row.details);
   for(const k of ['name','phone','occasion','date','time','method','area','address','notes','plan'])if(JSON.stringify(stored[k])!==JSON.stringify(order[k]))return reply({error:'reference conflict'},409);
   return reply({...stored,whatsappQueued:row.notification==='whatsapp_accepted'})};
  const existing=await prior();if(existing)return existing;
  if(!futureEvent(order.date,order.time))return reply({error:'event time'},400);
  const now=Date.now();
  const inserted=await db.prepare('INSERT OR IGNORE INTO bookings(id,created,actor,details,notification) SELECT ?,?,?,?,? WHERE (SELECT count(*) FROM bookings WHERE actor=? AND created>?) < 8').bind(order.id,now,actor,JSON.stringify(order),'pending',actor,now-3600000).run();
  if(!inserted.meta.changes)return (await prior())||reply({error:'rate limited'},429);
  const status=await notifyOwner(env,order);
  await db.prepare('UPDATE bookings SET notification=? WHERE id=?').bind(status,order.id).run();
  return reply({...order,whatsappQueued:status==='whatsapp_accepted'},201);
 }catch{return reply({error:'booking service unavailable'},503)}
}

