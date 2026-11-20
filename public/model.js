import {shop} from './config.js';
export const dishes = [
 ['chapati','Fresh Chapatis','Soft whole-wheat flatbreads, rolled by hand.','Chapatis'],
 ['lauki','Lauki Sabji','Tender bottle gourd cooked with gentle spices.','Sabjis'],
 ['aloo','Aloo Sabji','Golden potatoes tossed with warming spices.','Sabjis'],
 ['gobi','Gobi Sabji','Cauliflower florets with a homestyle masala.','Sabjis'],
 ['dahi','Dahi packet','A cooling side of plain curd.','Sides'],
 ['raita','Raita','Seasoned curd to serve alongside your chapatis.','Sides']
];
export const occasions=['Birthday party','Annual day','Family gathering','Office meeting','Religious function','Other event'];
export const freshPlan=()=>({guests:10,extraSabjis:[],items:{chapati:30,lauki:0,aloo:30,gobi:0,dahi:0,raita:0}});
export const amount=plan=>dishes.reduce((sum,[id])=>sum+(plan.items[id]||0)*shop.prices[id],0)+(plan.extraSabjis||[]).length*shop.extraSabjiPrice;
export const rupees=n=>'₹'+new Intl.NumberFormat('en-IN').format(n);
export const sabjiIds=['lauki','aloo','gobi'];
export const quantityIds=['chapati','dahi','raita'];
export function chooseSabji(items,id){
 for(const key of sabjiIds)items[key]=key===id?items.chapati:0;
}
export function validPlan(p){
 if(!p||!Number.isInteger(p.guests)||p.guests<1||p.guests>shop.maxGuests||!p.items)return false;
 const items=p.items;
 const extras=p.extraSabjis===undefined?[]:p.extraSabjis;
 if(!Array.isArray(extras)||new Set(extras).size!==extras.length||!extras.every(id=>sabjiIds.includes(id)&&items[id]===0))return false;
 return dishes.every(([id])=>Number.isInteger(items[id])&&items[id]>=0&&items[id]<=500)
  &&items.chapati>=shop.minChapatis&&sabjiIds.filter(id=>items[id]>0).length===1
  &&sabjiIds.some(id=>items[id]===items.chapati);
}
export function restoreCart(p){
 if(validPlan(p))return p;
 if(!p?.items||p.items.raita!==undefined)return null;
 const items={...p.items,raita:0};
 const selected=sabjiIds.find(id=>items[id]>0)||'aloo';
 chooseSabji(items,selected);
 const cart={guests:p.guests,items};
 return validPlan(cart)?cart:null;
}
export const whatsappOrderUrl=(o,t)=>'https://wa.me/'+shop.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(summary(o,t));
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const indianDate=(time=Date.now())=>new Date(time+19800000).toISOString().slice(0,10);
export function futureEvent(date,time,now=Date.now()){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))return false;
 const stamp=Date.parse(date+'T'+time+':00+05:30');
 return Number.isFinite(stamp)&&indianDate(stamp)===date&&stamp>now+shop.leadHours*3600000;
}
export const orderTotal=o=>amount(o.plan)+(o.method==='Delivery'?shop.deliveryCharge:0);
export function summary(o,t=k=>k){
 const fields=[[t('Reference'),o.id],[t('Your name'),o.name],[t('Mobile number'),o.phone],[t('Guests'),o.plan.guests],[t('Occasion'),t(o.occasion)],[t('Event date'),o.date],[t('Required time (IST)'),o.time],[t('Receive your order'),t(o.method)]];
 if(o.method==='Delivery')fields.push([t('Delivery address'),[o.address,o.area].filter(Boolean).join(', ')]);
 const lines=dishes.filter(([id])=>o.plan.items[id]>0).map(([id,name])=>(o.prices||shop.prices)[id]===0?t(name)+' — '+t('Complimentary'):t(name)+' × '+o.plan.items[id]+' — '+rupees(o.plan.items[id]*(o.prices||shop.prices)[id]));
 for(const id of o.plan.extraSabjis||[]){
  const name=dishes.find(d=>d[0]===id)[1];
  lines.push(t('Extra sabji')+' · '+t(name)+' — '+rupees(o.extraSabjiPrice??shop.extraSabjiPrice));
 }
 return [shop.name+' · '+t('Your order'),...fields.map(([k,v])=>k+': '+v),'',...lines,t('Delivery')+': '+rupees(o.fee??0),t('Total')+': '+rupees(o.total??orderTotal(o)),o.notes?'\n'+t('Special instructions (optional)')+': '+o.notes:'',shop.samplePrices?t('Sample pricing. The kitchen will confirm the final quote.'):''].filter(Boolean).join('\n');
}
