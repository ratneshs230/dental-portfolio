import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Rashmi Sethi's Dental Clinic | Best Dentist in Mayur Vihar, Delhi',
  description: 'Dr. Rashmi Sethi's Dental Clinic - 10+ years of dental excellence in Mayur Vihar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Mayur Vihar","dental clinic Mayur Vihar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Mayur Vihar"],
  openGraph: {
    title: 'Dr. Rashmi Sethi's Dental Clinic | Best Dentist in Mayur Vihar, Delhi',
    description: 'Dr. Rashmi Sethi's Dental Clinic - 10+ years of dental excellence in Mayur Vihar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Rashmi Sethi's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "51, Mayur Vihar, New Delhi - 11018",
    "addressLocality": "Mayur Vihar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-30152436",
  "priceRange": "₹1000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.5,
    "reviewCount": 96
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
