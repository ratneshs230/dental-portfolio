import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Vikram Verma's Dental Clinic | Best Dentist in Defence Colony, Delhi',
  description: 'Dr. Vikram Verma's Dental Clinic - 21+ years of dental excellence in Defence Colony. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Defence Colony","dental clinic Defence Colony","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Defence Colony"],
  openGraph: {
    title: 'Dr. Vikram Verma's Dental Clinic | Best Dentist in Defence Colony, Delhi',
    description: 'Dr. Vikram Verma's Dental Clinic - 21+ years of dental excellence in Defence Colony. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Vikram Verma's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "479, Defence Colony, New Delhi - 11050",
    "addressLocality": "Defence Colony",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-40481061",
  "priceRange": "₹500",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.5,
    "reviewCount": 176
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
