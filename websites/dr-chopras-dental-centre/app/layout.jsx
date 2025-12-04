import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Chopra's Dental Centre | Best Dentist in Rohini, Delhi',
  description: 'Dr. Chopra's Dental Centre - 22+ years of dental excellence in Rohini. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Rohini","dental clinic Rohini","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Rohini"],
  openGraph: {
    title: 'Dr. Chopra's Dental Centre | Best Dentist in Rohini, Delhi',
    description: 'Dr. Chopra's Dental Centre - 22+ years of dental excellence in Rohini. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Chopra's Dental Centre",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "619, Rohini, New Delhi - 11048",
    "addressLocality": "Rohini",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-23953024",
  "priceRange": "₹200",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4,
    "reviewCount": 90
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
