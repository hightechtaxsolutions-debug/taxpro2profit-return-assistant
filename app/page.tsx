import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AppShell, PrivacyNotice, areas } from '@/components/app-shell';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('display_name,role,access_status').eq('id', user.id).single();
  if (!profile || profile.access_status !== 'active') redirect('/access-pending');
  return <AppShell><main className="mx-auto max-w-7xl px-5 py-10"><div className="flex items-start justify-between gap-4"><div><p className="font-bold uppercase tracking-[.16em] text-[#6a35a6]">Your guided tax-preparation assistant</p><h1 className="mt-3 text-4xl font-black text-[#28114d]">Welcome back{profile.display_name ? `, ${profile.display_name}` : ''}. What are we working on today?</h1></div><form action="/auth/signout" method="post"><button className="rounded-xl border px-3 py-2 font-bold text-[#53258c]">Sign out</button></form></div>{profile.role === 'admin' && <Link href="/admin" className="mt-7 block rounded-2xl bg-[#28114d] p-5 font-bold text-white shadow-sm transition hover:bg-[#3a1a68]">Open Admin / Coach workspace →</Link>}<section className="mt-10"><h2 className="text-2xl font-bold text-[#28114d]">Your workspace</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{areas.map((area) => <Link href={`/${area.slug}`} key={area.slug} className="rounded-2xl border bg-white p-5 shadow-sm"><h3 className="font-bold text-[#28114d]">{area.label}</h3><p className="mt-2 text-sm text-[#696477]">{area.note}</p></Link>)}</div></section><div className="mt-8"><PrivacyNotice /></div></main></AppShell>;
}
