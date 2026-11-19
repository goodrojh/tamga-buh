import { LeadProvider } from '@/components/LeadModal'
import Navbar from '@/components/Navbar'
import MobileBar from '@/components/MobileBar'
import Hero from '@/sections/Hero'
import Services from '@/sections/Services'
import HowItWorks from '@/sections/HowItWorks'
import About from '@/sections/About'
import FAQ from '@/sections/FAQ'
import Footer from '@/sections/Footer'
import Contacts from '@/sections/Contacts'
import ThankYou from '@/pages/ThankYou'
import { isThanksPage } from '@/lib/thanks'

export default function App() {
  return (
    <LeadProvider>
      <Navbar />
      {isThanksPage() ? (
        <ThankYou />
      ) : (
      <main className="min-h-screen">
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <FAQ />
        <Contacts />
        <Footer />
      </main>
      )}
      <MobileBar />
    </LeadProvider>
  )
}
