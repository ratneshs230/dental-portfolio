import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Kumar's Dental Centre | Best Dentist in Janakpuri, Delhi',
  description: 'Dr. Kumar's Dental Centre - 5+ years of dental excellence in Janakpuri. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Janakpuri","dental clinic Janakpuri","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Janakpuri"],
  openGraph: {
    title: 'Dr. Kumar's Dental Centre | Best Dentist in Janakpuri, Delhi',
    description: 'Dr. Kumar's Dental Centre - 5+ years of dental excellence in Janakpuri. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Kumar's Dental Centre",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "147, Janakpuri, New Delhi - 11099",
    "addressLocality": "Janakpuri",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-31486105",
  "priceRange": "₹200",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.4,
    "reviewCount": 170
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
