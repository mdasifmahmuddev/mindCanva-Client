import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTrophy, FaPalette, FaUsers, FaCrown, FaFire } from 'react-icons/fa';

const CommunityHighlights = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const highlights = [
    {
      id: 1,
      title: "1st Prize: Professional Art Board",
      desc: "Win a premium 24x36 inch professional art board with premium canvas. Perfect for creating your next masterpiece with superior texture and durability.",
      icon: <FaTrophy className="text-6xl mb-4" />,
      bgColor: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
      buttonText: "Learn More"
    },
    {
      id: 2,
      title: "2nd Prize: Art Pen Color Box",
      desc: "Take home a deluxe 48-color professional art pen set featuring alcohol-based markers, fine liners, and brush tips for all your creative needs.",
      icon: <FaPalette className="text-6xl mb-4" />,
      bgColor: "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)",
      buttonText: "View Details"
    },
    {
      id: 3,
      title: "3rd Prize: Premium Art Pen Set",
      desc: "Receive a curated collection of 24 premium quality art pens including gel pens, watercolor pens, and metallic markers to elevate your artwork.",
      icon: <FaCrown className="text-6xl mb-4" />,
      bgColor: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
      buttonText: "Explore Prize"
    },
    {
      id: 4,
      title: "Monthly Art Challenge",
      desc: "Join artists worldwide in our themed competition. Submit your best work and compete for amazing prizes. New theme announced every month!",
      icon: <FaFire className="text-6xl mb-4" />,
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      buttonText: "Join Challenge"
    },
    {
      id: 5,
      title: "Community Showcase",
      desc: "Get featured on our homepage and social media. Share your creative journey with thousands of art enthusiasts and grow your following.",
      icon: <FaUsers className="text-6xl mb-4" />,
      bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      buttonText: "Submit Work"
    }
  ];

  const artPatterns = [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1920&h=1080&fit=crop&q=80'
  ];

  const next = () => setActiveSlide((activeSlide + 1) % highlights.length);
  const prev = () => setActiveSlide((activeSlide - 1 + highlights.length) % highlights.length);

  const getStyles = (index) => {
    const diff = index - activeSlide;
    const total = highlights.length;
    
    let position = diff;
    if (diff > total / 2) position = diff - total;
    if (diff < -total / 2) position = diff + total;

    if (position === 0)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)",
        zIndex: 10,
        pointerEvents: "auto"
      };
    else if (position === -1)
      return {
        opacity: 1,
        transform: "translateX(-280px) translateZ(-350px) rotateY(35deg) scale(0.85)",
        zIndex: 9,
        pointerEvents: "auto"
      };
    else if (position === 1)
      return {
        opacity: 1,
        transform: "translateX(280px) translateZ(-350px) rotateY(-35deg) scale(0.85)",
        zIndex: 9,
        pointerEvents: "auto"
      };
    else if (position === -2)
      return {
        opacity: 0.7,
        transform: "translateX(-520px) translateZ(-450px) rotateY(35deg) scale(0.7)",
        zIndex: 8,
        pointerEvents: "auto"
      };
    else if (position === 2)
      return {
        opacity: 0.7,
        transform: "translateX(520px) translateZ(-450px) rotateY(-35deg) scale(0.7)",
        zIndex: 8,
        pointerEvents: "auto"
      };
    else if (position < -2)
      return {
        opacity: 0,
        transform: "translateX(-600px) translateZ(-500px) rotateY(35deg) scale(0.6)",
        zIndex: 7,
        pointerEvents: "none"
      };
    else if (position > 2)
      return {
        opacity: 0,
        transform: "translateX(600px) translateZ(-500px) rotateY(-35deg) scale(0.6)",
        zIndex: 7,
        pointerEvents: "none"
      };
  };

  return (
    <section className="relative py-20 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-base-100">
      {artPatterns.map((pattern, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-all duration-1000"
          style={{
            opacity: activeSlide === idx ? 0.3 : 0,
            backgroundImage: `url(${pattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px) saturate(1.2)',
            transform: activeSlide === idx ? 'scale(1.05)' : 'scale(1.15)',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-base-100/85 via-base-100/70 to-base-100/85" />

      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,.05) 50px, rgba(255,255,255,.05) 100px),
            repeating-linear-gradient(-45deg, transparent, transparent 50px, rgba(0,0,0,.05) 50px, rgba(0,0,0,.05) 100px)
          `
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
          style={{
            top: '5%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
          style={{
            bottom: '5%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(138,43,226,0.6) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255,105,180,0.6) 0%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
      `}</style>

      <div className="text-center mb-16 z-20 relative">
         <h1 className="text-5xl md:text-6xl font-black text-base-content mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Prize showcase
          </h1> 
        <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
         
      </div>

      <div className="relative w-full max-w-7xl h-[550px] flex items-center justify-center mb-8 z-10" style={{ perspective: "1200px" }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {highlights.map((item, i) => (
            <React.Fragment key={item.id}>
              <div
                className="absolute w-[320px] md:w-[380px] h-[480px] rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-700 cursor-pointer group"
                style={{
                  background: item.bgColor,
                  ...getStyles(i),
                  boxShadow: activeSlide === i ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(102, 126, 234, 0.3)' : '0 20px 40px -12px rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => setActiveSlide(i)}
              >
                <div className="absolute inset-0 rounded-3xl bg-white/5 backdrop-blur-sm" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="text-white relative z-10">
                  <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">{item.title}</h3>
                  <p className="text-white/95 mb-6 leading-relaxed text-sm md:text-base drop-shadow-md">{item.desc}</p>
                  
                  <button className="relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group/btn transition-all duration-300 hover:scale-105">
                    <span className="absolute inset-0 bg-white/20 backdrop-blur-md" />
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <span className="absolute inset-0 border-2 border-white/40 rounded-xl" />
                    <span className="relative z-10 flex items-center gap-2">
                      {item.buttonText}
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-300" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-300" />
              </div>
              
              <div
                className="absolute w-[320px] md:w-[380px] h-[480px] rounded-3xl transition-all duration-700 pointer-events-none"
                style={{
                  background: item.bgColor,
                  transform: `${getStyles(i).transform} translateY(60px) scaleY(-1)`,
                  opacity: getStyles(i).opacity * 0.3,
                  zIndex: getStyles(i).zIndex - 1,
                  filter: "blur(20px)"
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex gap-6 z-20 relative mb-6">
        <button
          onClick={prev}
          className="relative w-16 h-16 rounded-full overflow-hidden group transition-all duration-300 hover:scale-110 bg-base-200"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
          <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-0.5 bg-base-100 backdrop-blur-sm rounded-full" />
          <span className="absolute inset-0 flex items-center justify-center">
            <FaChevronLeft className="text-2xl text-base-content relative z-10 transform group-hover:-translate-x-1 transition-transform" />
          </span>
        </button>
        
        <button
          onClick={next}
          className="relative w-16 h-16 rounded-full overflow-hidden group transition-all duration-300 hover:scale-110 bg-base-200"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accent to-info" />
          <span className="absolute inset-0 bg-gradient-to-r from-info to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-0.5 bg-base-100 backdrop-blur-sm rounded-full" />
          <span className="absolute inset-0 flex items-center justify-center">
            <FaChevronRight className="text-2xl text-base-content relative z-10 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      <div className="flex gap-3 z-20 relative">
        {highlights.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className="relative group"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${
              activeSlide === idx 
                ? 'w-12' 
                : 'w-2 group-hover:w-4'
            }`}
            style={{
              background: activeSlide === idx 
                ? 'linear-gradient(90deg, oklch(var(--p)), oklch(var(--s)), oklch(var(--a)))' 
                : 'oklch(var(--bc) / 0.2)'
            }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default CommunityHighlights;