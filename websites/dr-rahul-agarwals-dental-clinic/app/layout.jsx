import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Rahul Agarwal's Dental Clinic | Best Dentist in Tilak Nagar, Delhi',
  description: 'Dr. Rahul Agarwal's Dental Clinic - 23+ years of dental excellence in Tilak Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Tilak Nagar","dental clinic Tilak Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Tilak Nagar"],
  openGraph: {
    title: 'Dr. Rahul Agarwal's Dental Clinic | Best Dentist in Tilak Nagar, Delhi',
    description: 'Dr. Rahul Agarwal's Dental Clinic - 23+ years of dental excellence in Tilak Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Rahul Agarwal's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "602, Tilak Nagar, New Delhi - 11021",
    "addressLocality": "Tilak Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-26264534",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.6,
    "reviewCount": 73
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
