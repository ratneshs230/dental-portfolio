import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: 'Dr. Manish Kapoor's Dental Clinic | Best Dentist in Patel Nagar, Delhi',
  description: 'Dr. Manish Kapoor's Dental Clinic - 19+ years of dental excellence in Patel Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
  keywords: ["dentist Patel Nagar","dental clinic Patel Nagar","best dentist Delhi","dental checkup","teeth cleaning","cavity filling","tooth extraction","root canal treatment","teeth treatment Patel Nagar"],
  openGraph: {
    title: 'Dr. Manish Kapoor's Dental Clinic | Best Dentist in Patel Nagar, Delhi',
    description: 'Dr. Manish Kapoor's Dental Clinic - 19+ years of dental excellence in Patel Nagar. Services include Dental Checkup, Teeth Cleaning, Cavity Filling. Book appointment today!',
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
  "name": "Dr. Manish Kapoor's Dental Clinic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "391, Patel Nagar, New Delhi - 11046",
    "addressLocality": "Patel Nagar",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "telephone": "+91-11-28423032",
  "priceRange": "₹300",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.3,
    "reviewCount": 25
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
