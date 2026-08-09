import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'TaxPro2Profit Return Assistant', description: 'Learn it. Work it. Check it.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
