import './Home.css'
import Hero from '../components/Hero/Hero'
import AboutCarousel from '../components/AboutCarousel/AboutCarousel'
import PortfolioTabs from '../components/PortfolioTabs/PortfolioTabs'
import ContactBanner from '../components/ContactBanner/ContactBanner'

export default function Home() {
  return (
    <div className="home-wrapper">
      <Hero />
      <AboutCarousel />
      <PortfolioTabs />
      <ContactBanner />
    </div>
  )
}
