import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Smile Zone Dental | Best Dentist in Nehru Place, Delhi',
  description: 'Smile Zone Dental - 15+ years of dental excellence in Nehru Place. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Nehru Place","dental clinic Nehru Place","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Nehru Place"],
  openGraph: {
    title: 'Smile Zone Dental | Best Dentist in Nehru Place, Delhi',
    description: 'Smile Zone Dental - 15+ years of dental excellence in Nehru Place. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Smile Zone Dental",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "90, Nehru Place, New Delhi - 11081",
    "addressLocality": "Nehru Place",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-28923935",
  "priceRange": "₹1000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.4,
    "reviewCount": 48
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
