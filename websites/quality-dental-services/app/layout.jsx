import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Quality Dental Services | Best Dentist in Punjabi Bagh, Delhi',
  description: 'Quality Dental Services - 6+ years of dental excellence in Punjabi Bagh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Punjabi Bagh","dental clinic Punjabi Bagh","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Punjabi Bagh"],
  openGraph: {
    title: 'Quality Dental Services | Best Dentist in Punjabi Bagh, Delhi',
    description: 'Quality Dental Services - 6+ years of dental excellence in Punjabi Bagh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Quality Dental Services",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18, Punjabi Bagh, New Delhi - 11060",
    "addressLocality": "Punjabi Bagh",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-45553139",
  "priceRange": "₹700",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.2,
    "reviewCount": 42
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
