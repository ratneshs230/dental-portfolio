import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Rita Chopra's Dental Clinic | Best Dentist in Rajendra Nagar, Delhi',
  description: 'Dr. Rita Chopra's Dental Clinic - 28+ years of dental excellence in Rajendra Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Rajendra Nagar","dental clinic Rajendra Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Rajendra Nagar"],
  openGraph: {
    title: 'Dr. Rita Chopra's Dental Clinic | Best Dentist in Rajendra Nagar, Delhi',
    description: 'Dr. Rita Chopra's Dental Clinic - 28+ years of dental excellence in Rajendra Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Rita Chopra's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "208, Rajendra Nagar, New Delhi - 11057",
    "addressLocality": "Rajendra Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-49751311",
  "priceRange": "₹700",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.6,
    "reviewCount": 139
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
