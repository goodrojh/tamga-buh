import { LeadProvider } from '@/components/LeadModal'
import { ArticleProvider } from '@/components/ArticleModal'
import Navbar from '@/components/Navbar'
import MobileBar from '@/components/MobileBar'
import Hero from '@/sections/Hero'
import Features from '@/sections/Features'
import Audience from '@/sections/Audience'
import Services from '@/sections/Services'
import Kalmykia from '@/sections/Kalmykia'
import HowItWorks from '@/sections/HowItWorks'
import Pricing from '@/sections/Pricing'
import Calculator from '@/sections/Calculator'
import Compare from '@/sections/Compare'
import Tamga from '@/sections/Tamga'
import About from '@/sections/About'
import Cases from '@/sections/Cases'
import FAQ from '@/sections/FAQ'
import Blog from '@/sections/Blog'
import Footer from '@/sections/Footer'
import Contacts from '@/sections/Contacts'
import ThankYou from '@/pages/ThankYou'
import { isThanksPage } from '@/lib/thanks'

export default function App() {
  return (
    <LeadProvider>
      <ArticleProvider>
      <Navbar />
      {isThanksPage() ? (
        <ThankYou />
      ) : (
      <main className="min-h-screen">
        <Hero />
        <Features />
        <Audience />
        <Services />
        <Kalmykia />
        <HowItWorks />
        <Pricing />
        <Calculator />
        <Compare />
        <Tamga />
        <About />
        <Cases />
        <FAQ />
        <Blog />
        <Contacts />
        <Footer />
      </main>
      )}
      <MobileBar />
      </ArticleProvider>
    </LeadProvider>
  )
}
