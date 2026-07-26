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
  title: 'Marvel Develops — Software, end to end',
  description: 'Marvel Develops is a software agency that builds custom software — web, mobile, and SaaS — for businesses.',
  keywords: 'software agency, custom software development, web app development, SaaS, mobile app development, Marvellous Adepoju',
  authors: [{ name: 'Marvellous Adepoju', url: 'https://marveldevelops.com/about' }],
  creator: 'Marvellous Adepoju',
  openGraph: {
    title: 'Marvel Develops — Software, end to end',
    description: 'Marvel Develops is a software agency that builds custom software — web, mobile, and SaaS — for businesses.',
    url: 'https://marveldevelops.com',
    siteName: 'Marvel Develops',
    locale: 'en_US',
    type: 'website',
    // TODO: add public/og-image.png (1200×630) — referenced below.
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Marvel Develops',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvel Develops — Software, end to end',
    description: 'Marvel Develops is a software agency that builds custom software — web, mobile, and SaaS — for businesses.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/brand-logo.svg',
    apple: '/brand-logo.svg',
  },
  metadataBase: new URL('https://marveldevelops.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD structured data for Google Knowledge Graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Marvel Develops',
    image: 'https://marveldevelops.com/brand-logo.svg',
    description: 'Marvel Develops is a software agency that builds custom software — web, mobile, and SaaS — for businesses.',
    '@id': 'https://marveldevelops.com',
    url: 'https://marveldevelops.com',
    telephone: '+2349030891731',
    email: 'marvellousadepoju79@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG'
    },
    founder: {
      '@type': 'Person',
      name: 'Marvellous Adepoju',
      jobTitle: 'Full-Stack Developer',
      url: 'https://marveldevelops.com/about'
    },
    sameAs: [
      'https://github.com/DevMarvellous',
      'https://instagram.com/marvel_develops'
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable} bg-white overflow-x-hidden`}
    >
      <body className="font-sans antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
