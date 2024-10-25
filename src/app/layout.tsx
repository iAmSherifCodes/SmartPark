import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import Link from 'next/link'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parking Lot User App',
  description: 'Manage your parking with ease',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <div className="flex min-h-screen">
        {/*<nav className="w-64 bg-gray-100 p-4">*/}
        {/*  <ul className="space-y-2">*/}
        {/*    <li><Link href="/">Home</Link></li>*/}
        {/*    <li><Link href="/dashboard">Dashboard</Link></li>*/}
        {/*    <li><Link href="/reserve">Make Reservation</Link></li>*/}
        {/*    <li><Link href="/availability">Check Availability</Link></li>*/}
        {/*    <li><Link href="/checkin">Check In</Link></li>*/}
        {/*    <li><Link href="/checkout">Check Out</Link></li>*/}
        {/*    <li><Link href="/payment">Payment</Link></li>*/}
        {/*  </ul>*/}
        {/*</nav>*/}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
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
