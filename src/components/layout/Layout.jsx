import Header from "./Header"
import Navigation from "./Navigation"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

