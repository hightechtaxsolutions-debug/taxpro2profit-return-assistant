import Link from 'next/link';

export const areas = [
  { slug: 'learn', label: 'Learn', note: 'Build practical tax knowledge' },
  { slug: 'prep-a-return', label: 'Prep a Return', note: 'Guided return-support workflow' },
  { slug: 'check-my-work', label: 'Check My Work', note: 'Validate facts before proceeding' },
  { slug: 'document-help', label: 'Document Help', note: 'Recognize forms and key boxes' },
  { slug: 'ask-the-assistant', label: 'Ask the Assistant', note: 'Source-grounded support' },
  { slug: 'escalations', label: 'Escalations', note: 'Ask a Coach for help' },
  { slug: 'resource-library', label: 'Resource Library', note: 'Approved reference materials' },
];
export function BrandMark() { return <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#c99b2f] font-black text-[#28114d]">TP</span>; }
export function PrivacyNotice() { return <aside className="rounded-2xl border border-[#e7d7ae] bg-[#fffaf0] p-4 text-sm leading-6 text-[#5d4a19]"><strong className="block text-[#47370d]">Protect taxpayer information</strong>Do not enter full Social Security numbers, bank account information, passwords, or other unnecessary sensitive taxpayer information.</aside>; }
export function AppShell({ children }: { children: React.ReactNode }) { return <div className="min-h-screen"><header className="border-b border-[#e7e3ed] bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"><Link href="/" className="flex items-center gap-3" aria-label="TaxPro2Profit home"><BrandMark /><span><strong className="block text-sm tracking-tight text-[#28114d]">TaxPro2Profit</strong><span className="block text-xs text-[#696477]">Return Assistant</span></span></Link><span className="hidden rounded-full bg-[#f4effa] px-3 py-1.5 text-xs font-semibold text-[#53258c] sm:block">Training workspace</span></div></header>{children}</div>; }
