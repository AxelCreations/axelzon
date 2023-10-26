import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SessionProvider from './SessionProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AxelZon',
  description: 'Anything from A to Z. F* Amazon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <Navbar />
        <main className='p-4 max-w-7xl m-auto min-w-[300px]'>
          {children}
        </main>
        <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
