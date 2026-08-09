'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export function StudentInviteForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(formData: FormData) {
    setSending(true); setMessage(''); setError('');
    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
    const { data, error: invokeError } = await supabase.functions.invoke('send-student-invite', { body: { display_name: String(formData.get('display_name') || '').trim(), email: String(formData.get('email') || '').trim() } });
    if (invokeError || data?.error) setError(data?.error || 'The invitation could not be sent. Please try again.');
    else { setMessage(data?.message || 'Invitation sent.'); (document.getElementById('student-invite-form') as HTMLFormElement | null)?.reset(); }
    setSending(false);
  }

  return <section className="mt-8 max-w-2xl rounded-3xl border border-[#e7e3ed] bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#c99b2f]">Invite-only access</p><h2 className="mt-2 text-2xl font-black text-[#28114d]">Invite a student</h2><p className="mt-2 text-sm leading-6 text-[#696477]">Send one unique account invitation to an enrolled TaxPro2Profit student. The student becomes an active Preparer after accepting their invite.</p>{message && <p className="mt-4 rounded-xl bg-[#effaf3] p-3 text-sm text-[#17633a]">{message}</p>}{error && <p className="mt-4 rounded-xl bg-[#fff1f1] p-3 text-sm text-[#9b1c1c]">{error}</p>}<form id="student-invite-form" action={submit} className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-[#403a4b]">Student name<input name="display_name" required className="mt-1.5 w-full rounded-xl border border-[#d8d2df] px-3 py-3 font-normal" /></label><label className="text-sm font-bold text-[#403a4b]">Student email<input name="email" type="email" required className="mt-1.5 w-full rounded-xl border border-[#d8d2df] px-3 py-3 font-normal" /></label><button disabled={sending} className="sm:col-span-2 rounded-xl bg-[#28114d] px-4 py-3 font-bold text-white disabled:opacity-60">{sending ? 'Sending invitation…' : 'Send student invitation'}</button></form></section>;
}
