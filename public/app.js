import {shop} from './config.js';
import {translate} from './language.js';
import {dishes,freshPlan,validPlan,futureEvent,amount,rupees,sabjiIds,quantityIds,chooseSabji,restoreCart,whatsappOrderUrl} from './model.js';
import {render,estimate,fulfil,routes} from './view.js';
const path=location.pathname.replace(/\/$/,'')||'/';
const storage=(store,key,fallback)=>{try{return JSON.parse(store.getItem(key))??fallback}catch{return fallback}};
let lang=storage(localStorage,'sf.language','en');
if(!['en','ta','hi'].includes(lang))lang='en';
const t=k=>translate(lang,k);
let cart=restoreCart(storage(localStorage,'sf.cart',null));
let plan=structuredClone(cart||freshPlan());
const dish=new URLSearchParams(location.search).get('dish');
if(sabjiIds.includes(dish)){chooseSabji(plan.items,dish);plan.extraSabjis=(plan.extraSabjis||[]).filter(id=>id!==dish)}
if(['raita','dahi'].includes(dish)&&!plan.items[dish])plan.items[dish]=1;
let fields=storage(sessionStorage,'sf.fields',{});
const fileCheckout=Boolean(document.body.dataset.page);
const save=(store,k,v)=>store.setItem(k,JSON.stringify(v));
const q=sel=>document.querySelector(sel);
function persistFields(form){
 const values=Object.fromEntries(new FormData(form));
 fields={...fields,...values}; save(sessionStorage,'sf.fields',fields);
}
function draw(){
 document.documentElement.lang=lang;
 document.title=path==='/'?'Sharmaji Foods · '+t('A Rajasthani kitchen in Tamil Nadu'):t(routes[path]||'Page not found')+' · Sharmaji Foods';
 q('#app').innerHTML=render(path,lang,{cart,plan,fields});
 q('#language').onchange=e=>{lang=e.target.value;save(localStorage,'sf.language',lang);draw()};
 q('#hamburger').onclick=e=>{const nav=q('#mobile-nav');nav.hidden=!nav.hidden;e.currentTarget.setAttribute('aria-expanded',String(!nav.hidden))};
 q('#mobile-nav').onkeydown=e=>{if(e.key==='Escape'){q('#hamburger').click();q('#hamburger').focus()}};
 document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));
  document.querySelectorAll('[data-group]').forEach(el=>el.hidden=b.dataset.filter!=='All dishes'&&el.dataset.group!==b.dataset.filter);
 });
 if(q('#planner'))bindPlanner();
 if(q('#checkout'))bindCheckout();
 if(q('#remove'))q('#remove').onclick=()=>{cart=null;plan=freshPlan();localStorage.removeItem('sf.cart');sessionStorage.removeItem('sf.request');draw()};

}
function bindPlanner(){
 const f=q('#planner');
 function update(e){
  const oldGuests=plan.guests;
  const guests=Number(f.elements.guests.value);
  if(e?.target.name==='guests'&&guests>0&&guests<=shop.maxGuests&&oldGuests>0){
   f.elements.chapati.value=Math.min(500,Math.max(shop.minChapatis,Math.round(plan.items.chapati*guests/oldGuests)));
  }
  plan={guests,items:Object.fromEntries(quantityIds.map(id=>[id,Number(f.elements[id].value)]))};
  const included=f.elements.sabji.value;
  chooseSabji(plan.items,included);
  plan.extraSabjis=[];
  for(const box of f.querySelectorAll('[name=extraSabji]')){
   box.disabled=box.value===included;
   box.closest('label').hidden=box.disabled;
   if(box.disabled)box.checked=false;
   if(box.checked)plan.extraSabjis.push(box.value);
  }
  q('#estimate').innerHTML=estimate(plan,t);q('#error').textContent='';
 }
 f.oninput=update;
 f.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{const input=b.parentElement.querySelector('input');input.value=Math.min(Number(input.max),Math.max(Number(input.min),Number(input.value)+Number(b.dataset.step)));update({target:input})});
 f.onsubmit=e=>{e.preventDefault();update();if(!validPlan(plan)){q('#error').textContent=t('Minimum chapati order')+' · '+shop.minChapatis;return}save(localStorage,'sf.cart',plan);location.assign('/cart')};
}
function bindCheckout(){
 const form=q('#checkout');
 function method(){
  const delivery=form.elements.method.value==='Delivery';
  q('#fulfil').innerHTML=fulfil(t,delivery,fields);
  q('#estimate').innerHTML=estimate(cart,t,delivery?shop.deliveryCharge:0);
  q('#place-total').textContent=rupees(amount(cart)+(delivery?shop.deliveryCharge:0));
 }
 method();
 form.oninput=()=>persistFields(form);
 form.onchange=e=>{persistFields(form);if(e.target.name==='method')method()};
 form.onsubmit=async e=>{
  e.preventDefault();persistFields(form);
  if(!futureEvent(fields.date,fields.time)){q('#error').textContent=t('Choose a later event time.');return}
  if(!/^(?:\+?91)?[6-9]\d{9}$/.test(fields.phone.replace(/[\s()-]/g,''))){form.elements.phone.setCustomValidity(t('Please check the form and try again.'));form.elements.phone.reportValidity();form.elements.phone.oninput=()=>form.elements.phone.setCustomValidity('');return}
  const button=form.querySelector('button[type=submit]');const originalButton=button.innerHTML;button.disabled=true;button.textContent=t('Sending…');q('#error').textContent='';
  const order={plan:cart,...fields,area:fields.method==='Delivery'?(fields.area||''):'',address:fields.method==='Delivery'?(fields.address||''):''};
  const signature=JSON.stringify(order);
  let token=storage(sessionStorage,'sf.request',null);
  if(!token||token.signature!==signature){token={id:crypto.randomUUID(),signature};save(sessionStorage,'sf.request',token)}
  try{
   if(fileCheckout){
    const fee=order.method==='Delivery'?shop.deliveryCharge:0;
    location.assign(whatsappOrderUrl({...order,id:token.id,fee,total:amount(cart)+fee},t));
    return;
   }
   const response=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...order,id:token.id})});
   if(!response.ok)throw new Error(response.status===429?'Too many requests. Please try again later.':response.status===400?'Please check the form and try again.':'We could not save your request. Your cart is still here. Please retry.');
   const saved=await response.json();
   if(saved.whatsappQueued){q('#error').textContent=t('Order notification queued for the kitchen.');return}
   location.assign(whatsappOrderUrl(saved,t));
  }catch(err){
   q('#error').textContent=t(err.message?.includes('Please')?err.message:'We could not save your request. Your cart is still here. Please retry.');
  }finally{
   button.disabled=false;button.innerHTML=originalButton;
  }
 };
}
draw();
