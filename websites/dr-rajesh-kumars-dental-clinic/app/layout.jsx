import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Rajesh Kumar's Dental Clinic | Best Dentist in Connaught Place, Delhi',
  description: 'Dr. Rajesh Kumar's Dental Clinic - 29+ years of dental excellence in Connaught Place. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Connaught Place","dental clinic Connaught Place","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Connaught Place"],
  openGraph: {
    title: 'Dr. Rajesh Kumar's Dental Clinic | Best Dentist in Connaught Place, Delhi',
    description: 'Dr. Rajesh Kumar's Dental Clinic - 29+ years of dental excellence in Connaught Place. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Rajesh Kumar's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "350, Connaught Place, New Delhi - 11022",
    "addressLocality": "Connaught Place",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-43834726",
  "priceRange": "₹200",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4,
    "reviewCount": 88
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
