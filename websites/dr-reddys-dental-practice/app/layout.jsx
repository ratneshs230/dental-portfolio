import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Reddy's Dental Practice | Best Dentist in Laxmi Nagar, Delhi',
  description: 'Dr. Reddy's Dental Practice - 23+ years of dental excellence in Laxmi Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Laxmi Nagar","dental clinic Laxmi Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Laxmi Nagar"],
  openGraph: {
    title: 'Dr. Reddy's Dental Practice | Best Dentist in Laxmi Nagar, Delhi',
    description: 'Dr. Reddy's Dental Practice - 23+ years of dental excellence in Laxmi Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Reddy's Dental Practice",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "562, Laxmi Nagar, New Delhi - 11041",
    "addressLocality": "Laxmi Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-29065084",
  "priceRange": "₹1000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.7,
    "reviewCount": 73
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
