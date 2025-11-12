import { Link } from 'react-router';
import { ArrowRight, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const backgroundStyle = {
    background: `linear-gradient(135deg, rgba(251, 186, 55, 0.08), rgba(212, 81, 19, 0.08))`,
    backgroundColor: '#f5f5f3'
  };

  const artworks = [
    {
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop',
      title: 'Sunset Colors',
      artist: 'Kamrul Hassan'
    },
    {
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop',
      title: 'Riverside',
      artist: 'Zainul Abedin'
    },
    {
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=800&fit=crop',
      title: 'Village Life',
      artist: 'SM Sultan'
    },
    {
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=800&fit=crop',
      title: 'Colors of Bengal',
      artist: 'Qayyum Chowdhury'
    },
    {
      image: 'https://plus.unsplash.com/premium_vector-1711987249751-39018b5775f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=396',
      title: 'Modern Expression',
      artist: 'Shahabuddin Ahmed'
    },
    {
      image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&h=800&fit=crop',
      title: 'Abstract Dreams',
      artist: 'Rashid Choudhury'
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-base-100" style={backgroundStyle}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl top-0 -left-20"
          style={{ 
            opacity: isVisible ? 0.1 : 0,
            transition: 'opacity 2s ease-out',
            animation: 'float 8s ease-in-out infinite'
          }} 
        />
        <div 
          className="absolute w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl bottom-0 -right-20"
          style={{ 
            opacity: isVisible ? 0.1 : 0,
            transition: 'opacity 2s ease-out 0.5s',
            animation: 'float 10s ease-in-out infinite reverse'
          }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div 
          className="text-center mb-16"
          style={{ 
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease-out'
          }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-base-content mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Handpick Masterpiece
          </h1> 
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
           
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-2xl" />
          
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {artworks.map((artwork, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                style={{
                  animation: `float 5s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.6s ease-out ${index * 0.15}s`
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl border border-base-content/10 hover:border-primary/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />
                  
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white font-bold text-sm mb-1 truncate">{artwork.title}</h3>
                    <p className="text-white/80 text-xs truncate">{artwork.artist}</p>
                  </div>

                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;