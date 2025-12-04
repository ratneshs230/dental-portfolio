import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Jain's Dental Centre | Best Dentist in Paschim Vihar, Delhi',
  description: 'Dr. Jain's Dental Centre - 8+ years of dental excellence in Paschim Vihar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Paschim Vihar","dental clinic Paschim Vihar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Paschim Vihar"],
  openGraph: {
    title: 'Dr. Jain's Dental Centre | Best Dentist in Paschim Vihar, Delhi',
    description: 'Dr. Jain's Dental Centre - 8+ years of dental excellence in Paschim Vihar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Jain's Dental Centre",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "714, Paschim Vihar, New Delhi - 11055",
    "addressLocality": "Paschim Vihar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-30756416",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.5,
    "reviewCount": 153
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
