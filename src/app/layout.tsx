import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Navigation } from '@/components/navigation'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartPark - Intelligent Parking Management',
  description: 'Find, reserve, and manage your parking with ease using SmartPark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



















// import './globals.css'
// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import React from "react";
//
// const inter = Inter({ subsets: ['latin'] })
//
// export const metadata: Metadata = {
//   title: 'Parking Lot User App',
//   description: 'Manage your parking with ease',
// }
//
// export default function RootLayout({
//                                      children,
//                                    }: {
//   children: React.ReactNode
// }) {
//   return (
//       <html lang="en">
//       <body className={inter.className}>{children}</body>
//       </html>
//   )
// }
