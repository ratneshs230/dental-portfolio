import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Amit Gupta's Dental Clinic | Best Dentist in Rajouri Garden, Delhi',
  description: 'Dr. Amit Gupta's Dental Clinic - 26+ years of dental excellence in Rajouri Garden. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Rajouri Garden","dental clinic Rajouri Garden","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Rajouri Garden"],
  openGraph: {
    title: 'Dr. Amit Gupta's Dental Clinic | Best Dentist in Rajouri Garden, Delhi',
    description: 'Dr. Amit Gupta's Dental Clinic - 26+ years of dental excellence in Rajouri Garden. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Amit Gupta's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "695, Rajouri Garden, New Delhi - 11094",
    "addressLocality": "Rajouri Garden",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-44871677",
  "priceRange": "₹200",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.2,
    "reviewCount": 100
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
