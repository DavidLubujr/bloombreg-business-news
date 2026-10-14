import { getStore } from '@netlify/blobs';
import { timingSafeEqual } from 'node:crypto';
const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function handle(request,store,password){
  const url=new URL(request.url);
  if(request.method==='POST'){
    if(request.headers.get('origin')!==url.origin)return reply({error:'Invalid origin'},403);
    let data;try{data=await request.json()}catch{return reply({error:'Invalid request'},400)}
    const valid=x=>typeof x==='string'&&/^[0-9a-f-]{36}$/i.test(x);
    if(!valid(data.visitor)||!valid(data.event))return reply({error:'Invalid identifier'},400);
    const day=new Date().toISOString().slice(0,10);
    await store.setJSON(`visits/${day}/${data.event}_${data.visitor}`,{}, {onlyIfNew:true});
    return reply({ok:true});
  }
  if(request.method!=='GET')return reply({error:'Method not allowed'},405);
  if(!password)return reply({error:'Set DASHBOARD_PASSWORD in Netlify environment variables and redeploy.'},503);
  const token=request.headers.get('authorization')?.replace(/^Bearer /,'')||'';
  const a=Buffer.from(token),b=Buffer.from(password);
  if(a.length!==b.length||!timingSafeEqual(a,b))return reply({error:'Incorrect dashboard password'},401);
  const visitors=new Set();let total=0,today=0;const day=new Date().toISOString().slice(0,10);
  for await(const page of store.list({prefix:'visits/',paginate:true})){
    for(const {key} of page.blobs){total++;if(key.startsWith(`visits/${day}/`))today++;visitors.add(key.split('_').pop());}
  }
  return reply({total,unique:visitors.size,today,updated:new Date().toISOString()});
}
export default async request=>{
  try{return await handle(request,getStore({name:'gen-ai-thon-clicks',consistency:'strong'}),process.env.DASHBOARD_PASSWORD)}
  catch{return reply({error:'Click storage is unavailable. Check the Netlify function logs.'},503)}
};
