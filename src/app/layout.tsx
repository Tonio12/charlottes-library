import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const ibmPlexSans = localFont({
  src: [
    {
      path: '../../public/fonts/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IBMPlexSans-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'semibold',
    },
  ],
})

const bebasNeue = localFont({
  src: [
    {
      path: '../../public/fonts/BebasNeue-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--bebas-neue',
})

export const metadata: Metadata = {
  title: 'BookWise',
  description: 'BookWise is a platform for reading books',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
