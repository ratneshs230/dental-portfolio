import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Expert Dental Clinic | Best Dentist in Kirti Nagar, Delhi',
  description: 'Expert Dental Clinic - 18+ years of dental excellence in Kirti Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Kirti Nagar","dental clinic Kirti Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Kirti Nagar"],
  openGraph: {
    title: 'Expert Dental Clinic | Best Dentist in Kirti Nagar, Delhi',
    description: 'Expert Dental Clinic - 18+ years of dental excellence in Kirti Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Expert Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "729, Kirti Nagar, New Delhi - 11071",
    "addressLocality": "Kirti Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-24715016",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.3,
    "reviewCount": 16
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
