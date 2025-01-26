"use client"

import TradingChallenge from "./component/trading-challenge"
import { Advantages } from "./component/components_advantages"
import { CommunityCallToAction } from "./component/components_community-cta"
import { Footer } from "./component/components_footer"
import { Navbar } from "./component/navbar"
import HeroSection from "./component/hero-section"
import FundedTraderSteps from "./component/steps"
import Testimonials from "./component/testimonials"
import FaqsSection from "./component/faqsection"
import StatisticsSection from "./component/StatisticsSection"
import PayoutSection from "./component/payout"
import { ForexRatesSection } from "./component/app_page"
export default function SyntheticV0PageForDeployment() {
  return <><Navbar/> 
  <HeroSection/>
  <ForexRatesSection/>
  <StatisticsSection/>
  <Advantages/>
  <TradingChallenge/>
  <FundedTraderSteps/>
  <PayoutSection/>  
  <Testimonials/>
  <CommunityCallToAction/>
  <FaqsSection/>
  <Footer/> 
  </>
}