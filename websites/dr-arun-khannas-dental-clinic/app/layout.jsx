import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Arun Khanna's Dental Clinic | Best Dentist in Lajpat Nagar, Delhi',
  description: 'Dr. Arun Khanna's Dental Clinic - 6+ years of dental excellence in Lajpat Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Lajpat Nagar","dental clinic Lajpat Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Lajpat Nagar"],
  openGraph: {
    title: 'Dr. Arun Khanna's Dental Clinic | Best Dentist in Lajpat Nagar, Delhi',
    description: 'Dr. Arun Khanna's Dental Clinic - 6+ years of dental excellence in Lajpat Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Arun Khanna's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "421, Lajpat Nagar, New Delhi - 11026",
    "addressLocality": "Lajpat Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-40135275",
  "priceRange": "₹500",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.8,
    "reviewCount": 96
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
