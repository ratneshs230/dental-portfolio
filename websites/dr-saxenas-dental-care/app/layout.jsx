import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Saxena's Dental Care | Best Dentist in Tilak Nagar, Delhi',
  description: 'Dr. Saxena's Dental Care - 24+ years of dental excellence in Tilak Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Tilak Nagar","dental clinic Tilak Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Tilak Nagar"],
  openGraph: {
    title: 'Dr. Saxena's Dental Care | Best Dentist in Tilak Nagar, Delhi',
    description: 'Dr. Saxena's Dental Care - 24+ years of dental excellence in Tilak Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Saxena's Dental Care",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "436, Tilak Nagar, New Delhi - 11061",
    "addressLocality": "Tilak Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-43663803",
  "priceRange": "₹1000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.4,
    "reviewCount": 81
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
