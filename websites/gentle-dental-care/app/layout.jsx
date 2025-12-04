import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Gentle Dental Care | Best Dentist in Saket, Delhi',
  description: 'Gentle Dental Care - 18+ years of dental excellence in Saket. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Saket","dental clinic Saket","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Saket"],
  openGraph: {
    title: 'Gentle Dental Care | Best Dentist in Saket, Delhi',
    description: 'Gentle Dental Care - 18+ years of dental excellence in Saket. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Gentle Dental Care",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "254, Saket, New Delhi - 11084",
    "addressLocality": "Saket",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-49221132",
  "priceRange": "₹500",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.4,
    "reviewCount": 146
  }
})
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
