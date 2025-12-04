import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Anjali Mehta's Dental Clinic | Best Dentist in Shalimar Bagh, Delhi',
  description: 'Dr. Anjali Mehta's Dental Clinic - 29+ years of dental excellence in Shalimar Bagh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Shalimar Bagh","dental clinic Shalimar Bagh","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Shalimar Bagh"],
  openGraph: {
    title: 'Dr. Anjali Mehta's Dental Clinic | Best Dentist in Shalimar Bagh, Delhi',
    description: 'Dr. Anjali Mehta's Dental Clinic - 29+ years of dental excellence in Shalimar Bagh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Anjali Mehta's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "306, Shalimar Bagh, New Delhi - 11011",
    "addressLocality": "Shalimar Bagh",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-21654426",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.6,
    "reviewCount": 149
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
