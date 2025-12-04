import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Smile Bright Dental | Best Dentist in Punjabi Bagh, Delhi',
  description: 'Smile Bright Dental - 7+ years of dental excellence in Punjabi Bagh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Punjabi Bagh","dental clinic Punjabi Bagh","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Punjabi Bagh"],
  openGraph: {
    title: 'Smile Bright Dental | Best Dentist in Punjabi Bagh, Delhi',
    description: 'Smile Bright Dental - 7+ years of dental excellence in Punjabi Bagh. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Smile Bright Dental",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "213, Punjabi Bagh, New Delhi - 11017",
    "addressLocality": "Punjabi Bagh",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-40949051",
  "priceRange": "₹1000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.2,
    "reviewCount": 154
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
