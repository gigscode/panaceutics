import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/app/providers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const geist = localFont({
  src: [
    { path: "../public/fonts/geist-latin-ext.woff2", weight: "100 900", style: "normal" },
    { path: "../public/fonts/geist-latin.woff2",     weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://panaceutics.org'),
  title: {
    default: "Panaceutics - Panacea|Therapeutics Solutions",
    template: "%s | Panaceutics"
  },
  description: "Where the cure is natural, but the proof is scientific. Discover evidence-based herbal alternatives.",
  keywords: ["herbal medicine", "phytotherapy", "natural remedies", "scientific research", "alternative medicine"],
  authors: [{ name: "Panaceutics Team" }],
  icons: {
    shortcut: '/favicon.ico',
    icon: [
      
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://panaceutics.org',
    siteName: 'Panaceutics',
    title: 'Panaceutics - Panacea|Therapeutics Solutions',
    description: 'Where the cure is natural, but the proof is scientific. Discover evidence-based herbal alternatives.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Panaceutics - Panacea|Therapeutics Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panaceutics - Panacea|Therapeutics Solutions',
    description: 'Where the cure is natural, but the proof is scientific. Discover evidence-based herbal alternatives.',
    images: ['/opengraph-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#042f2e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
