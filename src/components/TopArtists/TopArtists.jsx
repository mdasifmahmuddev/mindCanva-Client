import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPalette, FaAward, FaHeart, FaEnvelope } from 'react-icons/fa';

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmail, setShowEmail] = useState({});

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3000/artists/top');
        setArtists(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const toggleEmail = (artistId) => {
    setShowEmail(prev => ({
      ...prev,
      [artistId]: !prev[artistId]
    }));
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
              <FaPalette className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (artists.length === 0) {
    return (
      <section className="py-20 px-4 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <FaPalette className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
            <h3 className="text-2xl font-bold text-base-content mb-2">No Artists Yet</h3>
            <p className="text-base-content/60">Start creating artworks to appear here!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-base-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <FaAward className="text-primary text-xl" />
            <span className="text-primary font-semibold text-sm">Featured Artists</span>
          </div>
          <h2 className="text-5xl font-bold text-base-content mb-4">
            Top Artists of the Week
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Celebrating the most loved artists based on community appreciation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <div 
              key={artist._id} 
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-base-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-base-content/90 via-base-content/40 to-transparent z-10"></div>
                  <img 
                    src={artist.artist_photo || 'https://via.placeholder.com/400x500?text=Artist'} 
                    alt={artist.artist_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-primary text-primary-content px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      {index === 0 && '🏆'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      <span>#{index + 1}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <FaPalette className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">{artist.artist_name}</h3>
                        <p className="text-white/80 text-sm">Featured Artist</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-error/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                        <FaHeart className="text-white text-xs" />
                        <span className="text-white text-xs font-bold">{artist.total_likes} Total Loves</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-base-200">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-base-100 rounded-xl p-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FaPalette className="text-primary text-lg" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-base-content/60">Artworks</p>
                        <p className="text-lg font-bold text-base-content">{artist.total_artworks}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-base-100 rounded-xl p-3">
                      <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center flex-shrink-0">
                        <FaHeart className="text-error text-lg" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-base-content/60">Loves</p>
                        <p className="text-lg font-bold text-base-content">{artist.total_likes}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleEmail(artist._id)}
                    className="w-full btn btn-primary btn-sm rounded-xl flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <FaEnvelope className="text-base" />
                    {showEmail[artist._id] ? 'Hide Email' : 'Contact Artist'}
                  </button>
                  
                  <div 
                    className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
                      showEmail[artist._id] ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="bg-base-100 rounded-xl p-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FaEnvelope className="text-primary flex-shrink-0" />
                        <a 
                          href={`mailto:${artist.artist_email}`}
                          className="text-sm text-base-content hover:text-primary transition-colors truncate"
                        >
                          {artist.artist_email}
                        </a>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(artist.artist_email);
                        }}
                        className="btn btn-xs btn-ghost"
                        title="Copy email"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArtists;