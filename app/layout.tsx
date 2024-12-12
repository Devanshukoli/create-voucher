import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { VoucherProvider } from '@/context/VoucherContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travel Voucher Application',
  description: 'Create and manage travel vouchers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VoucherProvider>
          {children}
        </VoucherProvider>
      </body>
    </html>
  )
}

