import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell, PrivacyNotice, areas } from '@/components/app-shell';

export default async function WorkspacePage({ params }: { params: Promise<{ mode: string }> }) {
 const { mode } = await params; const area = areas.find((item) => item.slug === mode); if (!area) notFound();
 return <AppShell><main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14"><Link href="/" className="text-sm font-bold text-[#6a35a6] hover:text-[#28114d]">← Back to workspace</Link><section className="mt-7 rounded-3xl border border-[#e7e3ed] bg-white p-6 shadow-sm sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c99b2f]">TaxPro2Profit workspace</p><h1 className="mt-3 text-3xl font-black tracking-tight text-[#28114d] sm:text-4xl">{area.label}</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[#696477]">{area.note}. The functional source-grounded workflow for this area will be delivered after authentication, approved-source ingestion, and retrieval safeguards are in place.</p><div className="mt-8 rounded-2xl bg-[#f7f5fa] p-5"><p className="font-bold text-[#28114d]">Safety-first status</p><p className="mt-2 text-sm leading-6 text-[#696477]">No tax-rule answer is available on this screen yet. TaxPro2Profit will not generate unsupported guidance while the approved knowledge base is being configured.</p></div></section><div className="mt-6"><PrivacyNotice /></div></main></AppShell>;
}
