import { Metadata } from "next";
import HeroSection from './components/home/hero'
import CurvedPanoramicSlider from './components/home/curved-panoramic-slider'
import ParallaxZoomScroll from './components/home/parallax-zoom-scroll'
import Brand from './components/home/brand'
import QuickSummary from './components/home/quick-summary'
import Timeline from './components/home/timeline'
import CustomerStories from './components/home/customer-stories'
import Faq from './components/home/faq'
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

      {/* ---------------------Parallax Zoom Scroll section Starts-----------------  */}
      <ParallaxZoomScroll />
      {/* ---------------------Parallax Zoom Scroll section Ends-----------------  */}

      {/* ---------------------Brand logo section Starts-----------------  */}
      <Brand />
      {/* ---------------------Brand logo section Ends-----------------  */}

      {/* ---------------------Quick Summary section Starts-----------------  */}
      <QuickSummary />
      {/* ---------------------Quick Summary section Ends-----------------  */}

      {/* ---------------------Timeline section Starts-----------------  */}
      <Timeline />
      {/* ---------------------Timeline section Ends-----------------  */}

      {/* ---------------------Customer Stories section Starts-----------------  */}
      <CustomerStories />
      {/* ---------------------Customer Stories section Ends-----------------  */}

      {/* ---------------------Faq section Starts-----------------  */}
      <Faq />
      {/* ---------------------Faq section Ends-----------------  */}

      {/* ---------------------Solutions section Starts-----------------  */}
      <Solutions />
      {/* ---------------------Solutions section Ends-----------------  */}
    </main>
  )
}
