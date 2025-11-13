import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import './HeroSlider.css';
import { Link } from 'react-router';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const sliderImages = [
    {
      original: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1920&h=1080&fit=crop',
      title: 'Contemporary',
      subtitle: 'Masterpieces',
      description: 'Explore the finest contemporary art pieces'
    },
    {
      original: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Abstract',
      subtitle: 'Creations',
      description: 'Discover unique abstract artworks'
    },
    {
      original: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&h=1080&fit=crop',
      title: 'Creative',
      subtitle: 'Artists',
      description: 'Meet talented creators from around the world'
    },
    {
      original: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1920&h=1080&fit=crop',
      title: 'Vibrant',
      subtitle: 'Collections',
      description: 'Experience colorful and dynamic art'
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

                <Link to='/explore' className="hero-btn">
                  <span className="hero-btn-text">
                    Explore Now
                  </span>
                  <ArrowRight className="hero-btn-icon" />
                </Link>
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