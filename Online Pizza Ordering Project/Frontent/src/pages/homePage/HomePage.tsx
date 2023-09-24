import { Fragment, memo } from "react"
import "./home.css"
import Header from "./components/Header"
import LandingSection from "./components/LandingSection"
import MenuSection from "./components/MenuSection"
import AboutSection from "./components/AboutSection"
import ContactUsSection from "./components/ContactUsSection"
import Footer from "./components/Footer"
const HomePage: React.FC = () => {

  return (
    <Fragment>
      <div className="bg-dark">
        <Header />
        <LandingSection />
        <MenuSection />
        <AboutSection />
        <ContactUsSection />
        <Footer />
      </div>
    </Fragment>
  )
}

export default memo(HomePage)