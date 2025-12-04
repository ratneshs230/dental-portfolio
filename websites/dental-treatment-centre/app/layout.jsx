import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dental Treatment Centre | Best Dentist in Ashok Vihar, Delhi',
  description: 'Dental Treatment Centre - 14+ years of dental excellence in Ashok Vihar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Ashok Vihar","dental clinic Ashok Vihar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Ashok Vihar"],
  openGraph: {
    title: 'Dental Treatment Centre | Best Dentist in Ashok Vihar, Delhi',
    description: 'Dental Treatment Centre - 14+ years of dental excellence in Ashok Vihar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dental Treatment Centre",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "264, Ashok Vihar, New Delhi - 11088",
    "addressLocality": "Ashok Vihar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-42676498",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.9,
    "reviewCount": 185
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
