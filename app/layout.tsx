import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2cai',
  description: 'some utils',
  viewport: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
