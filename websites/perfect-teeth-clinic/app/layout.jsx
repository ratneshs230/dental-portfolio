import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Perfect Teeth Clinic | Best Dentist in Rajouri Garden, Delhi',
  description: 'Perfect Teeth Clinic - 19+ years of dental excellence in Rajouri Garden. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Rajouri Garden","dental clinic Rajouri Garden","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Rajouri Garden"],
  openGraph: {
    title: 'Perfect Teeth Clinic | Best Dentist in Rajouri Garden, Delhi',
    description: 'Perfect Teeth Clinic - 19+ years of dental excellence in Rajouri Garden. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Perfect Teeth Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "760, Rajouri Garden, New Delhi - 11050",
    "addressLocality": "Rajouri Garden",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-39244883",
  "priceRange": "₹700",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.8,
    "reviewCount": 50
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
