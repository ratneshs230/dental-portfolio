import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Kapoor's Dental Clinic | Best Dentist in Vasant Kunj, Delhi',
  description: 'Dr. Kapoor's Dental Clinic - 25+ years of dental excellence in Vasant Kunj. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Vasant Kunj","dental clinic Vasant Kunj","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Vasant Kunj"],
  openGraph: {
    title: 'Dr. Kapoor's Dental Clinic | Best Dentist in Vasant Kunj, Delhi',
    description: 'Dr. Kapoor's Dental Clinic - 25+ years of dental excellence in Vasant Kunj. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Kapoor's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "132, Vasant Kunj, New Delhi - 11067",
    "addressLocality": "Vasant Kunj",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-24672901",
  "priceRange": "₹700",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.5,
    "reviewCount": 153
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
