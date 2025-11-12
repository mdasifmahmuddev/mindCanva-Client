import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import './HeroSlider.css';
import { Link } from 'react-router';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const sliderImages = [
    {
      original: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&h=1080&fit=crop',
      title: 'Contemporary',
      subtitle: 'Masterpieces',
      description: 'Explore the finest contemporary art pieces'
    },
    {
      original: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1920&h=1080&fit=crop',
      title: 'Digital Art',
      subtitle: 'Revolution',
      description: 'Discover the future of digital creativity'
    },
    {
      original: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1920&h=1080&fit=crop',
      title: 'Creative',
      subtitle: 'Artists',
      description: 'Meet talented creators from around the world'
    },
    {
      original: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop',
      title: 'Modern',
      subtitle: 'Designs',
      description: 'Cutting-edge design and innovation'
    },
     
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay]);

  return (
    <section className="hero-slider-container">
      <div className="hero-slider-wrapper">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={image.original}
              alt={image.title}
              className="hero-slide-image"
            />
            
            <div className="hero-overlay"></div>
            
            <div className="hero-content">
              <div className={`hero-text ${index === currentIndex ? 'animate-in' : ''}`}>
                <div className="hero-icon-wrapper">
                  <Sparkles className="hero-sparkle-icon" />
                </div>

                <h1 className="hero-title">
                  <span className="hero-title-main">Discover</span>
                  <span className="hero-title-accent">
                    {image.title}
                  </span>
                </h1>

                <div className="hero-divider"></div>

                <p className="hero-description">
                  {image.description}
                </p>

                <button className="hero-btn">
                  <span className="hero-btn-text">

                    <Link to='./explore'>Explore Now</Link>



                  </span>
                  <ArrowRight className="hero-btn-icon" />
                </button>
              </div>
            </div>

            {index === currentIndex && <div className="hero-progress" />}
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="hero-nav hero-nav-prev"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="hero-nav hero-nav-next"
      >
        <ChevronRight size={32} />
      </button>

       
    </section>
  );
};

export default HeroSlider;