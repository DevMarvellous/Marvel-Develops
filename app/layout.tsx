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
  description: 'Marvel Develops is a full-stack software agency building custom web applications, mobile apps, SaaS products, and AI solutions for businesses worldwide.',
  keywords: 'software agency, custom software development, web app development, SaaS, mobile app development, Marvellous Adepoju, React, Next.js, AI integration',
  authors: [{ name: 'Marvellous Adepoju', url: 'https://marveldevelops.com/about' }],
  creator: 'Marvellous Adepoju',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Marvel Develops — Software, end to end',
    description: 'Marvel Develops is a full-stack software agency building custom web applications, mobile apps, SaaS products, and AI solutions for businesses worldwide.',
    url: 'https://marveldevelops.com',
    siteName: 'Marvel Develops',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Marvel Develops — Custom Web Apps & Software Solutions',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvel Develops — Software, end to end',
    description: 'Marvel Develops is a full-stack software agency building custom web applications, mobile apps, SaaS products, and AI solutions for businesses worldwide.',
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
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG'
    },
    areaServed: 'Worldwide',
    founder: {
      '@type': 'Person',
      name: 'Marvellous Adepoju',
      jobTitle: 'Full-Stack Developer & System Architect',
      url: 'https://marveldevelops.com/about'
    },
    knowsAbout: [
      'Full-Stack Web Development',
      'Next.js & React Applications',
      'Mobile App Development',
      'SaaS System Architecture',
      'Google Gemini AI Integrations',
      'Custom API Development'
    ],
    sameAs: [
      'https://github.com/DevMarvellous',
      'https://instagram.com/marvel_develops'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Web Application Development',
            description: 'Scalable, modern web apps built with Next.js, React, and TypeScript.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SaaS Architecture & Development',
            description: 'End-to-end SaaS application engineering, database design, and cloud deployment.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Integration & Chatbot Solutions',
            description: 'Custom AI assistants and automated planning tools integrated into business platforms.'
          }
        }
      ]
    }
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
