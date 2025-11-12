 
   import CTASection from '../CTASection/CTASection.jsx';
import CommunityHighlights from '../CommunityHighlights/CommunityHighlights.jsx';
import FeaturedArtworks from '../FeaturedArtwork/FeaturedArtwork.jsx';
import HeroSlider from '../HeroSlider/HeroSlider.jsx';
import TopArtists from '../TopArtists/TopArtists.jsx';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <FeaturedArtworks />
       <TopArtists />
      <CommunityHighlights/>
      <CTASection />
    </div>
  );
};

export default Home;