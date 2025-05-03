import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apollo Doctors Clone',
  description: 'A clone of Apollo 247 doctors listing page',
  keywords: 'doctors, healthcare, apollo, medical, consultation',
  openGraph: {
    title: 'Apollo Doctors Clone',
    description: 'A clone of Apollo 247 doctors listing page',
    url: 'https://apollo-doctors-clone.vercel.app',
    siteName: 'Apollo Doctors Clone',
    images: [
      {
        url: 'https://apollo-doctors-clone.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apollo Doctors Clone',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
