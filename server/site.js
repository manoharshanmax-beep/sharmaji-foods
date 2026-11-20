import {esc} from '../public/model.js';
import {render,routes} from '../public/view.js';
import {orderEndpoint} from './orders.js';
const descriptions={
 '/':'Hand-rolled Rajasthani chapatis and homestyle sabjis from a family kitchen in Tamil Nadu. Plan a gathering for up to 50 people.',
 '/about':'Meet the family behind Sharmaji Foods and discover the chai shop where the story began.',
 '/menu':'Browse freshly made chapatis, lauki, aloo, gobi sabji and optional dahi.',
 '/bulk-orders':'Customize chapatis, sabji portions and curd for a gathering of up to 50 people.',
 '/cart':'Review the estimated cost and quantities for your family-style meal.',
 '/checkout':'Choose delivery or pickup and send the kitchen your advance booking request.',
 '/contact':'Contact Sharmaji Foods about gatherings, service locations and pickup in Tamil Nadu.',
 '/404':'Find your way back to the Sharmaji Foods kitchen.'
};
export function documentPage(path){
 const title=path==='/'?'Sharmaji Foods | Homemade Rajasthani Chapatis in Tamil Nadu':(routes[path]||routes['/404'])+' | Sharmaji Foods';
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#681d2b"><title>${esc(title)}</title><meta name="description" content="${esc(descriptions[path]||descriptions['/404'])}">${['/cart','/checkout','/404'].includes(path)?'<meta name="robots" content="noindex">':''}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"><script type="module" src="/app.js"></script></head><body><div id="app">${render(path)}</div></body></html>`;
}
export function makeWorker(assets){
 return {async fetch(request,env){
  const url=new URL(request.url),path=url.pathname.replace(/\/$/,'')||'/';
  if(path==='/api/orders')return orderEndpoint(request,env);
  if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405});
  const entry=Object.hasOwn(assets,path)?assets[path]:null;
  const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
  if(entry){
   const data=entry.binary?Uint8Array.from(atob(entry.data),c=>c.charCodeAt(0)):entry.data;
   return new Response(request.method==='HEAD'?null:data,{headers:{...headers,'Content-Type':entry.type,'Cache-Control':'public,max-age=0,must-revalidate'}});
  }
  const known=Object.hasOwn(routes,path)&&path!=='/404';
  return new Response(request.method==='HEAD'?null:documentPage(known?path:'/404'),{status:known?200:404,headers:{...headers,'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}});
 }};
}

