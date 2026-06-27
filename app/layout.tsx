import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Brand fonts: Plus Jakarta Sans (display/headings — clean and easy to read),
// Inter (body/UI), JetBrains Mono (small eyebrow labels). Wired into the CSS
// variables consumed by --font-sans / --font-serif / --font-mono in globals.css.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jbmono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Outends — Software, end to end',
  description: 'Outends is a software agency that builds custom software — web, mobile, and SaaS — for businesses.',
  keywords: 'software agency, custom software development, web app development, SaaS, mobile app development',
  openGraph: {
    title: 'Outends — Software, end to end',
    description: 'Outends is a software agency that builds custom software — web, mobile, and SaaS — for businesses.',
    url: 'https://outends.com',
    siteName: 'Outends',
    locale: 'en_US',
    type: 'website',
    // TODO: add public/og-image.png (1200×630) — referenced below.
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Outends',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outends — Software, end to end',
    description: 'Outends is a software agency that builds custom software — web, mobile, and SaaS — for businesses.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/brand-logo.svg',
    apple: '/brand-logo.svg',
  },
  metadataBase: new URL('https://outends.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable} bg-white overflow-x-hidden`}
    >
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
