import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
export const dynamic='force-dynamic';
export default async function Admin(){const s=await createClient();const {data:{user}}=await s.auth.getUser();if(!user)redirect('/login');const {data:p}=await s.from('profiles').select('role,access_status,display_name').eq('id',user.id).single();if(p?.role!=='admin'||p.access_status!=='active')redirect('/');return <main className="mx-auto max-w-5xl p-10"><p className="font-bold uppercase text-[#c99b2f]">Admin / Coach</p><h1 className="mt-3 text-4xl font-black text-[#28114d]">Admin home</h1><p className="mt-4 text-[#696477]">Welcome, {p.display_name||'Coach'}. Student approval and source management will be added in the following phases.</p></main>;}
