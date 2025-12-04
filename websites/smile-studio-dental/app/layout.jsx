import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Smile Studio Dental | Best Dentist in Greater Kailash, Delhi',
  description: 'Smile Studio Dental - 4+ years of dental excellence in Greater Kailash. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Greater Kailash","dental clinic Greater Kailash","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Greater Kailash"],
  openGraph: {
    title: 'Smile Studio Dental | Best Dentist in Greater Kailash, Delhi',
    description: 'Smile Studio Dental - 4+ years of dental excellence in Greater Kailash. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Smile Studio Dental",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "615, Greater Kailash, New Delhi - 11066",
    "addressLocality": "Greater Kailash",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-48519065",
  "priceRange": "₹1000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4,
    "reviewCount": 36
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
