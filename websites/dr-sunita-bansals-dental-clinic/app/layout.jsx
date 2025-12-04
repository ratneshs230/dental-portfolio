import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Sunita Bansal's Dental Clinic | Best Dentist in Malviya Nagar, Delhi',
  description: 'Dr. Sunita Bansal's Dental Clinic - 8+ years of dental excellence in Malviya Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Malviya Nagar","dental clinic Malviya Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Malviya Nagar"],
  openGraph: {
    title: 'Dr. Sunita Bansal's Dental Clinic | Best Dentist in Malviya Nagar, Delhi',
    description: 'Dr. Sunita Bansal's Dental Clinic - 8+ years of dental excellence in Malviya Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Sunita Bansal's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "27, Malviya Nagar, New Delhi - 11098",
    "addressLocality": "Malviya Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-23156241",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 3.7,
    "reviewCount": 102
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
