import { Metadata } from "next";
import HeroSection from './components/home/hero'
import IntroStatement from './components/home/intro-statement'
import Timeline from './components/home/timeline'
import CustomerStories from './components/home/customer-stories'
import Solutions from './components/home/solution'

export const metadata: Metadata = {
    title: "Home | A Thousand Voices",
};

export default function Home() {
  return (
    <main>
      {/* ---------------------Hero section Starts-----------------  */}
      <HeroSection />
      {/* ---------------------Hero section Ends-----------------  */}

      {/* ---------------------Intro statement section Starts-----------------  */}
      <IntroStatement />
      {/* ---------------------Intro statement section Ends-----------------  */}

      {/* ---------------------Timeline section Starts-----------------  */}
      <Timeline />
      {/* ---------------------Timeline section Ends-----------------  */}

      {/* ---------------------Customer Stories section Starts-----------------  */}
      <CustomerStories />
      {/* ---------------------Customer Stories section Ends-----------------  */}

      {/* ---------------------Solutions section Starts-----------------  */}
      <Solutions />
      {/* ---------------------Solutions section Ends-----------------  */}
    </main>
  )
}
