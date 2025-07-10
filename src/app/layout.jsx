import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

// min-h-full dans le body (et pas juste h-full) car le contenu peut-être plus grand que le viewport.
