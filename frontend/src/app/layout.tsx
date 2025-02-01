import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AdminLayout from '@/components/layouts/AdminLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM System',
  description: 'System CRM dla firmy handlowej',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  )
}