import { Metadata } from "next";
import Brand from "./components/home/brand";
import CustomerStories from "./components/home/customer-stories";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import CurvedPanoramicSlider from "./components/home/curved-panoramic-slider";
import Timeline from "./components/home/timeline";
import Solutions from "./components/home/solution";

export const metadata: Metadata = {
    title: "Home | A Thousand Voices",
};

export default function Home() {
  return (
    <main>
      {/* ---------------------Hero section Starts-----------------  */}
      <HeroSection />
      {/* ---------------------Hero section Ends-----------------  */}

      {/* ---------------------Curved Panoramic Slider section Starts-----------------  */}
      <CurvedPanoramicSlider />
      {/* ---------------------Curved Panoramic Slider section Ends-----------------  */}

      {/* ---------------------Brand logo section Starts-----------------  */}
      <Brand />
      {/* ---------------------Brand logo section Ends-----------------  */}

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
