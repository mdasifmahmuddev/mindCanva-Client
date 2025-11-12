import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';
import { Sparkles, ArrowRight } from 'lucide-react';
import './HeroSlider.css'

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderImages = [
    {
      original: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&h=100&fit=crop',
      title: 'Contemporary',
      subtitle: 'Masterpieces'
    },
    {
      original: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=150&h=100&fit=crop',
      title: 'Digital Art',
      subtitle: 'Revolution'
    },
    {
      original: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=150&h=100&fit=crop',
      title: 'Creative',
      subtitle: 'Artists'
    }
  ];

  return (
    <section className="relative text-white overflow-hidden">
     

      <div className="max-w-7xl mx-auto">
        <ImageGallery 
          items={sliderImages}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={true}
          autoPlay={true}
          slideInterval={5000}
          showThumbnails={false}
          onSlide={(index) => setCurrentIndex(index)}
          renderItem={(item) => (
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
              <img 
                src={item.original} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 max-w-4xl">
                  <div className="mb-4 flex justify-center">
                    <Sparkles className="w-12 h-12 text-primary floating-icon" />
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                    <span className="block mb-2">Discover</span>
                    <span className="sparkle-text block">
                      <Typewriter
                        words={[item.title, item.subtitle]}
                        loop={1}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={80}
                        delaySpeed={2000}
                      />
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                    Explore amazing art from creators worldwide — start your journey today.
                  </p>
                  
                  <Link to="/explore">
                    <button className="hero-button">
                      <span>Explore Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  
                  <div className="mt-8 flex justify-center gap-3">
                    {sliderImages.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'w-12 bg-primary' 
                            : 'w-8 bg-white/40'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default HeroSlider;