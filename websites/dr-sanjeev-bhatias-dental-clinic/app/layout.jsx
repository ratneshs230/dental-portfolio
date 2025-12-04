import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Sanjeev Bhatia's Dental Clinic | Best Dentist in Green Park, Delhi',
  description: 'Dr. Sanjeev Bhatia's Dental Clinic - 29+ years of dental excellence in Green Park. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Green Park","dental clinic Green Park","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Green Park"],
  openGraph: {
    title: 'Dr. Sanjeev Bhatia's Dental Clinic | Best Dentist in Green Park, Delhi',
    description: 'Dr. Sanjeev Bhatia's Dental Clinic - 29+ years of dental excellence in Green Park. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Sanjeev Bhatia's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "665, Green Park, New Delhi - 11060",
    "addressLocality": "Green Park",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-41922043",
  "priceRange": "₹700",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.5,
    "reviewCount": 40
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
