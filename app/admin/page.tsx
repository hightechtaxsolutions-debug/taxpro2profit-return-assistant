import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { StudentInviteForm } from '@/components/student-invite-form';

export const dynamic = 'force-dynamic';
export default async function Admin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role,access_status,display_name').eq('id', user.id).single();
  if (profile?.role !== 'admin' || profile.access_status !== 'active') redirect('/');
  return <main className="mx-auto max-w-5xl p-6 sm:p-10"><p className="text-sm font-bold uppercase tracking-[.15em] text-[#c99b2f]">Admin / Coach</p><h1 className="mt-2 text-4xl font-black text-[#28114d]">Admin home</h1><p className="mt-4 text-[#696477]">Welcome, {profile.display_name || 'Coach'}. Use private invitations to give enrolled students access.</p><StudentInviteForm /><section className="mt-8 rounded-2xl border border-dashed border-[#d8d2df] p-5 text-sm leading-6 text-[#696477]">Knowledge-source upload, student invitation history, source management, analytics, and Coach Cocoa Tips will be added in the next product phases.</section></main>;
}
