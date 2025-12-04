import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dental Care Plus | Best Dentist in Patel Nagar, Delhi',
  description: 'Dental Care Plus - 23+ years of dental excellence in Patel Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Patel Nagar","dental clinic Patel Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Patel Nagar"],
  openGraph: {
    title: 'Dental Care Plus | Best Dentist in Patel Nagar, Delhi',
    description: 'Dental Care Plus - 23+ years of dental excellence in Patel Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dental Care Plus",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "903, Patel Nagar, New Delhi - 11060",
    "addressLocality": "Patel Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-20485097",
  "priceRange": "₹200",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.8,
    "reviewCount": 46
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
