import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/app/providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Panaceutics - Phytotherapeutic Solutions",
  description: "Where the cure is natural, but the proof is scientific. Discover evidence-based herbal alternatives.",
  generator: "v0.app",
  metadataBase: new URL('https://panaceutics.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: 'Panaceutics - Phytotherapeutic Solutions',
    description: 'Where the cure is natural, but the proof is scientific. Discover evidence-based herbal alternatives.',
    siteName: 'Panaceutics',
    url: 'https://panaceutics.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panaceutics - Phytotherapeutic Solutions',
    description: 'Where the cure is natural, but the proof is scientific. Discover evidence-based herbal alternatives.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`font-sans antialiased`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
