import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Das Dental Practice | Best Dentist in Najafgarh, Delhi',
  description: 'Dr. Das Dental Practice - 24+ years of dental excellence in Najafgarh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Najafgarh","dental clinic Najafgarh","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Najafgarh"],
  openGraph: {
    title: 'Dr. Das Dental Practice | Best Dentist in Najafgarh, Delhi',
    description: 'Dr. Das Dental Practice - 24+ years of dental excellence in Najafgarh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Das Dental Practice",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "823, Najafgarh, New Delhi - 11034",
    "addressLocality": "Najafgarh",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-46528737",
  "priceRange": "₹1000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.9,
    "reviewCount": 99
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
