import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Mittal's Dental Studio | Best Dentist in Hauz Khas, Delhi',
  description: 'Dr. Mittal's Dental Studio - 14+ years of dental excellence in Hauz Khas. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Hauz Khas","dental clinic Hauz Khas","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Hauz Khas"],
  openGraph: {
    title: 'Dr. Mittal's Dental Studio | Best Dentist in Hauz Khas, Delhi',
    description: 'Dr. Mittal's Dental Studio - 14+ years of dental excellence in Hauz Khas. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Mittal's Dental Studio",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "706, Hauz Khas, New Delhi - 11020",
    "addressLocality": "Hauz Khas",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-27595323",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.6,
    "reviewCount": 69
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
