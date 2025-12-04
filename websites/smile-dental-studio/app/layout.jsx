import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Smile Dental Studio | Best Dentist in Rajendra Nagar, Delhi',
  description: 'Smile Dental Studio - 26+ years of dental excellence in Rajendra Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Rajendra Nagar","dental clinic Rajendra Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Rajendra Nagar"],
  openGraph: {
    title: 'Smile Dental Studio | Best Dentist in Rajendra Nagar, Delhi',
    description: 'Smile Dental Studio - 26+ years of dental excellence in Rajendra Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Smile Dental Studio",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "815, Rajendra Nagar, New Delhi - 11070",
    "addressLocality": "Rajendra Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-34547867",
  "priceRange": "₹700",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.7,
    "reviewCount": 145
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
