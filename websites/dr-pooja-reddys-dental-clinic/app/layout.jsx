import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Pooja Reddy's Dental Clinic | Best Dentist in Green Park, Delhi',
  description: 'Dr. Pooja Reddy's Dental Clinic - 18+ years of dental excellence in Green Park. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Green Park","dental clinic Green Park","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Green Park"],
  openGraph: {
    title: 'Dr. Pooja Reddy's Dental Clinic | Best Dentist in Green Park, Delhi',
    description: 'Dr. Pooja Reddy's Dental Clinic - 18+ years of dental excellence in Green Park. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Pooja Reddy's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "129, Green Park, New Delhi - 11095",
    "addressLocality": "Green Park",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-39569199",
  "priceRange": "₹500",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.9,
    "reviewCount": 44
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
