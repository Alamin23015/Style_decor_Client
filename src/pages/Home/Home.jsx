import FeaturedServices from "./FeaturedServices"; 
import TopDecorators from "./TopDecorators";
import CoverageMap from "./CoverageMap";


import HeroSection from "./HeroSection"; 

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      
      
      <HeroSection />

      <FeaturedServices />
      <TopDecorators />
      <CoverageMap />
    </div>
  );
};

export default Home;