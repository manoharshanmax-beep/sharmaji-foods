import {shop} from './config.js';
import {translate} from './language.js';
import {dishes,occasions,freshPlan,amount,rupees,esc,indianDate,sabjiIds} from './model.js';
export const routes={'/':'Home','/about':'About Us','/menu':'Food Menu','/bulk-orders':'Bulk Orders','/cart':'Cart','/checkout':'Checkout','/contact':'Contact Us','/404':'Page not found'};
const icons={
 pin:'<rect x="5.8" y="7.5" width="12.4" height="9" rx="2"/><path d="M5.8 10.5H2a1.5 1.5 0 0 0 0 3h3.8m12.4-3H22a1.5 1.5 0 0 1 0 3h-3.8M9 10h5"/>',
 bag:'<path d="M5 7.5h14l1 13H4l1-13Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/>',
 menu:'<path d="M3 6h18M3 12h18M3 18h18"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>',
 globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
 leaf:'<path d="M5 17c-5-10 8-14 16-13-1 9-6 20-16 13Zm0 0L16 8"/>',
 people:'<circle cx="9" cy="8" r="3"/><path d="M2 21v-3c0-7 14-7 14 0v3m0-15c5 0 5 6 0 6m2 2q4 0 4 6"/>'
};
export const icon=k=>`<svg aria-hidden="true" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icons[k]}</svg>`;
const bloom='<span aria-hidden="true" class="bloom">❧</span>';
const logo=`<a href="/" class="brand" aria-label="Sharmaji Foods">${icon('pin')}<span>Sharmaji Foods</span></a>`;
const btn=(url,label,cls='primary')=>`<a class="btn ${cls}" href="${url}">${label}</a>`;
const note=t=>shop.samplePrices?`<p class="note">${t('Sample pricing. The kitchen will confirm the final quote.')}</p>`:'';
const card=(d,t,full)=>{let [id,title,desc,group]=d;return `<a class="dish" data-group="${group}" href="/bulk-orders?dish=${id}"><div class="dish-image">${id==='raita'?'<span class="raita-tile" aria-hidden="true">🥣</span>':`<img src="/images/${id}.webp" alt="${t(title)}" loading="lazy">`}</div><div class="dish-info"><div><h3>${t(title)}</h3>${full?`<p>${t(desc)}</p><small>${sabjiIds.includes(id)?t('Complimentary'):rupees(shop.prices[id])+' / '+t(id==='chapati'?'per chapati':id==='dahi'?'per packet':'per portion')}</small>`:''}</div><span class="add" aria-label="${t('Select dish')}">+</span></div></a>`};
const story='When our family from Rajasthan made Tamil Nadu home, our chapatis came with us. At our chai shop, customers began ordering them with sabji for their own gatherings. Those orders grew into Sharmaji Foods.';
function home(t){
 return `<section class="hero"><div class="hero-copy"><p class="eyebrow"><i></i>${t('A Rajasthani kitchen in Tamil Nadu')}</p><h1>${t('Homemade Goodness for')} <em>${t('Every Occasion')}</em></h1><p class="hero-text">${t('Hand-rolled chapatis and homestyle sabjis for gatherings of up to 50.')}</p><div class="actions">${btn('/bulk-orders',t('Plan an Order'))}<a class="under" href="/menu">${t('Explore Menu')}</a></div></div><div class="hero-image"><img fetchpriority="high" src="/images/hero.webp" alt="${t('Fresh Chapatis')} · ${t('Sabjis')} · ${t('Dahi')}"></div></section>
 <section class="wrap feature"><div class="ornament">${bloom}</div><div class="section-title"><h2>${t('From Our Kitchen')}</h2><a class="under" href="/menu">${t('View full menu')}</a></div><div class="cards">${dishes.slice(0,4).map(d=>card(d,t,false)).join('')}</div></section>
 <section class="story-band"><div class="wrap story-inner"><span class="seal">${icon('pin')}</span><div><p class="eyebrow">${t('Our family story')}</p><h2>${t('It started at our chai shop.')}</h2><p>${t(story)}</p></div>${btn('/about',t('Meet the family'),'light')}</div></section>`;
}
function about(t,lang){
 return `<div class="wrap page"><p class="eyebrow">${t('Our family story')}</p><div class="split"><div><h1>${t('It started at our chai shop.')}</h1><p class="lead">${t(story)}</p>${btn('/menu',t('Explore Menu'))}</div><img class="story-photo" src="/images/hero.webp" alt="${t('Fresh Chapatis')}"></div><div class="info-grid"><section class="panel"><h2>${t('Food & hygiene')}</h2><p>${t('Our chapatis contain wheat and our dahi contains milk. Tell us about allergies when you book so the family can discuss ingredients, shared equipment and packing before confirming.')}</p></section><section class="panel"><h2>${t('Customer reviews')}</h2>${shop.reviews.length?shop.reviews.map(r=>`<blockquote>${esc(r[lang]||r.en)}<footer>${esc(r.name)}</footer></blockquote>`).join(''):`<p>${t('Customer reviews will appear here as families share their experiences.')}</p>`}</section></div></div>`;
}
function menu(t){return `<div class="wrap page"><p class="eyebrow">${t('Our kitchen')}</p><h1>${t('Our Food Menu')}</h1><p class="lead">${t('Each chapati includes your choice of lauki, aloo or gobi sabji.')} ${t('Minimum chapati order')} · ${shop.minChapatis}. ${t('Extra sabji')} · ${rupees(shop.extraSabjiPrice)}.</p><div class="filters">${['All dishes','Chapatis','Sabjis','Sides'].map((s,i)=>`<button class="chip" aria-pressed="${!i}" data-filter="${s}">${t(s)}</button>`).join('')}</div><div class="cards menu-cards">${dishes.map(d=>card(d,t,true)).join('')}</div>${note(t)}</div>`}
function estimate(plan,t,fee=null){
 return `<div class="line-items">${dishes.filter(([id])=>plan.items[id]).map(([id,n])=>`<div><span>${t(n)}${sabjiIds.includes(id)?'':' × '+plan.items[id]}</span><b>${sabjiIds.includes(id)?t('Complimentary'):rupees(plan.items[id]*shop.prices[id])}</b></div>`).join('')}${(plan.extraSabjis||[]).map(id=>`<div><span>${t('Extra sabji')} · ${t(dishes.find(d=>d[0]===id)[1])}</span><b>${rupees(shop.extraSabjiPrice)}</b></div>`).join('')}</div>${fee===null?'':`<div class="row"><span>${t('Delivery')}</span><b>${rupees(fee)}</b></div>`}<div class="row total"><span>${t(fee===null?'Food subtotal':'Total')}</span><strong>${rupees(amount(plan)+(fee||0))}</strong></div>`;
}
export {estimate};
function counter(key,value,label,max,min=0){return `<div class="counter"><button type="button" data-step="-1" aria-label="− ${label}">−</button><input type="number" inputmode="numeric" aria-label="${label}" name="${key}" min="${min}" max="${max}" required value="${value}"><button type="button" data-step="1" aria-label="+ ${label}">+</button></div>`}
function extraOptions(plan,t){
 return sabjiIds.map(id=>{
  const included=plan.items[id]>0;
  const selected=(plan.extraSabjis||[]).includes(id);
  const name=t(dishes.find(d=>d[0]===id)[1]);
  return `<label class="sabji-option" ${included?'hidden':''}><input name="extraSabji" type="checkbox" value="${id}" ${included?'disabled':''} ${selected?'checked':''}><span>${name} · ${rupees(shop.extraSabjiPrice)}</span></label>`;
 }).join('');
}
function bulk(t,s){
 const p=s.plan||freshPlan();
 const quantityRow=(id,label,unit,min=0)=>`<div class="choice"><div><b>${t(label)}</b><small>${rupees(shop.prices[id])} / ${t(unit)}</small></div>${counter(id,p.items[id],t(label),500,min)}</div>`;
 const options=sabjiIds.map(id=>{
  const name=t(dishes.find(d=>d[0]===id)[1]);
  return `<label class="sabji-option"><input required type="radio" name="sabji" value="${id}" ${p.items[id]>0?'checked':''}><img src="/images/${id}.webp" alt=""><span>${name}</span></label>`;
 }).join('');
 return `<div class="wrap page"><p class="eyebrow">${t('Orders for 1–50 guests')}</p><h1>${t('Plan your gathering')}</h1><p class="lead">${t('Each chapati includes your choice of lauki, aloo or gobi sabji.')}</p><form id="planner" class="columns"><section class="panel"><h2>${t('Build your menu')}</h2><div class="choice guest">${icon('people')}<b>${t('Guests')}</b>${counter('guests',p.guests,t('Guests'),shop.maxGuests,1)}</div><div class="choices"><p class="note">${t('Minimum chapati order')} · ${shop.minChapatis}</p>${quantityRow('chapati','Chapati quantity','per chapati',shop.minChapatis)}<fieldset class="sabji-set"><legend>${t('Choose one complimentary sabji')}</legend>${options}</fieldset><fieldset class="sabji-set"><legend>${t('Additional sabjis (optional)')}</legend>${extraOptions(p,t)}</fieldset><h3 class="group-title">${t('Optional add-ons')}</h3>${quantityRow('dahi','Dahi packet','per packet')}${quantityRow('raita','Raita','per portion')}</div></section><aside class="panel summary"><h2>${t('Your estimate')}</h2><div id="estimate" aria-live="polite">${estimate(p,t)}</div><p class="note">${t('Delivery fee is added at checkout.')}</p>${note(t)}<button class="btn primary wide" type="submit">${t(s.cart?'Update cart':'Add to cart')}</button><p id="error" role="alert"></p></aside></form></div>`;
}
function empty(t,title){return `<div class="wrap page narrow"><div class="panel centered">${icon('bag')}<h1>${t(title)}</h1>${btn('/bulk-orders',t('Plan an Order'))}</div></div>`}
function cart(t,s){
 if(!s.cart)return empty(t,'Your cart is empty.');
 return `<div class="wrap page narrow"><p class="eyebrow">${t('Order details')}</p><h1>${t('Your cart')}</h1><div class="panel"><h2>${t('Your gathering')}</h2><p>${t('Guests')} · ${s.cart.guests}</p>${estimate(s.cart,t)}<p class="note">${t('Delivery fee is added at checkout.')}</p>${note(t)}<div class="actions">${btn('/checkout',t('Continue to checkout'))}${btn('/bulk-orders',t('Edit menu'),'light')}<button id="remove" class="plain">${t('Remove order')}</button></div></div></div>`;
}
function checkout(t,s){
 if(!s.cart)return empty(t,'Your cart is empty.');
 const val=k=>esc(s.fields?.[k]||'');const delivery=s.fields?.method==='Delivery';
 const field=(key,label,type,attrs,wide='')=>`<label class="${wide}">${t(label)}<input name="${key}" type="${type}" value="${val(key)}" ${attrs} required></label>`;
 return `<div class="wrap page"><p class="eyebrow">${t('Your gathering')} · ${s.cart.guests} ${t('Guests')}</p><h1>${t('Checkout')}</h1><form id="checkout" class="columns"><div class="panel field-grid">
 ${field('name','Your name','text','autocomplete="name" maxlength="80"')}${field('phone','Mobile number','tel','autocomplete="tel" inputmode="tel" maxlength="18" placeholder="+91"')}
 <label class="span">${t('Occasion')}<select name="occasion">${occasions.map(o=>`<option value="${o}" ${o===s.fields?.occasion?'selected':''}>${t(o)}</option>`).join('')}</select></label>
 ${field('date','Event date','date',`min="${indianDate()}"`)}${field('time','Required time (IST)','time','')}
 <fieldset class="span"><legend>${t('Receive your order')}</legend><div class="radios">${['Pickup','Delivery'].map(m=>`<label><input type="radio" name="method" value="${m}" ${(m==='Delivery')===delivery?'checked':''}>${t(m)}</label>`).join('')}</div></fieldset>
 <div class="span" id="fulfil"></div><label class="span">${t('Special instructions (optional)')}<textarea name="notes" maxlength="500" rows="3">${val('notes')}</textarea></label><div class="span"><p class="note">${t('WhatsApp will open with your order. Tap Send to message the kitchen.')}</p><button class="btn primary wide" type="submit"> ${t('Order on WhatsApp')} · <span id="place-total">${rupees(amount(s.cart)+(delivery?shop.deliveryCharge:0))}</span></button><p id="error" role="alert"></p></div></div><aside class="summary panel"><h2>${t('Order summary')}</h2><div id="estimate">${estimate(s.cart,t,delivery?shop.deliveryCharge:0)}</div>${note(t)}<p class="note">${t('The kitchen will confirm availability and the final amount with you.')}</p></aside></form></div>`;
}
export function fulfil(t,delivery,fields={}){
 if(!delivery)return `<p class="note">${esc(shop.pickupAddress)||t('Pickup address will be confirmed with your booking.')}</p>`;
 return `${shop.deliveryAreas.length?`<label>${t('Service area')}<select required name="area"><option value="">—</option>${shop.deliveryAreas.map(a=>`<option ${a===fields.area?'selected':''}>${esc(a)}</option>`).join('')}</select></label>`:`<p class="note">${t('Delivery area will be checked before the booking is confirmed.')}</p>`}<label>${t('Delivery address')}<textarea required name="address" maxlength="300" rows="2">${esc(fields.address)}</textarea></label>`;
}
function contacts(t){const num=shop.phone.replace(/[^\d+]/g,''),wa=shop.whatsapp.replace(/\D/g,'');return [wa?btn('https://wa.me/'+wa,'WhatsApp','light'):'',num?btn('tel:'+num,esc(shop.phone),'light'):'',shop.email?btn('mailto:'+esc(shop.email),esc(shop.email),'light'):''].join('')}
function contact(t){return `<div class="wrap page"><p class="eyebrow">${t('Tamil Nadu')}</p><h1>${t('Contact our kitchen')}</h1><div class="info-grid"><section class="panel"><h2>${t('Your gathering')}</h2><p>${t('Planning a gathering? Send your details with a booking request so our family can follow up.')}</p><div class="actions">${btn('/bulk-orders',t('Plan an Order'))}${contacts(t)}</div></section><section class="panel"><h2>${t('Service locations')}</h2><p>${shop.deliveryAreas.length?shop.deliveryAreas.map(esc).join(' · '):t('Tamil Nadu')}</p><p>${t('Delivery coverage and pickup details are confirmed for each booking.')}</p>${shop.pickupAddress?`<p>${esc(shop.pickupAddress)}</p>`:''}</section></div></div>`}
export function render(path,lang='en',s={}){
 const t=k=>translate(lang,k);
 const nav=[['/','Home'],['/about','About Us'],['/menu','Food Menu'],['/bulk-orders','Bulk Orders'],['/contact','Contact']];
 const links=nav.map(([p,n])=>`<a href="${p}" ${path===p?'aria-current="page"':''}>${t(n)}</a>`).join('');
 const body=({'/':()=>home(t),'/menu':()=>menu(t),'/about':()=>about(t,lang),'/bulk-orders':()=>bulk(t,s),'/cart':()=>cart(t,s),'/checkout':()=>checkout(t,s),'/contact':()=>contact(t)})[path]?.()||`<div class="wrap page centered"><p class="eyebrow">404</p><h1>${t('Page not found')}</h1>${btn('/',t('Back to home'))}</div>`;
 return `<a class="skip" href="#main">${t('Skip to content')}</a><header class="mast"><div class="head-inner">${logo}<nav aria-label="${t('Menu')}" class="desktop-nav">${links}</nav><div class="tools"><label class="lang">${icon('globe')}<select id="language" aria-label="${t('Language')}">${[['en','EN'],['ta','தமிழ்'],['hi','हिन्दी']].map(([v,n])=>`<option value="${v}" ${lang===v?'selected':''}>${n}</option>`).join('')}</select></label><a class="bag" href="/cart" aria-label="${t('Cart')}">${icon('bag')}${s.cart?'<i>1</i>':''}</a><button id="hamburger" aria-label="${t('Menu')}" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button></div></div><nav id="mobile-nav" hidden>${links}</nav></header><main id="main">${body}</main><footer class="footer"><div class="wrap foot-inner"><div>${logo}<p>${t('A Rajasthani kitchen in Tamil Nadu')}</p></div><nav>${links}</nav><small>© ${new Date().getFullYear()} Sharmaji Foods</small></div></footer>${['/','/about','/contact','/menu'].includes(path)?`<div class="sticky-cta">${btn('/bulk-orders',t('Order Now'))}</div>`:''}`;
}

