import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Heart, Eye, Trash2, Sparkles, Star, Palette } from 'lucide-react';

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://mind-canvas-server-dun.vercel.app/favorites`, {
        params: { email: user.email }
      })
        .then(response => {
          setFavorites(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleUnfavorite = (id) => {
    Swal.fire({
      title: 'Remove from favorites?',
      text: "This artwork will be removed from your collection",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Keep it',
      background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f3f4f6' : '#1f2937',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://mind-canvas-server-dun.vercel.app/favorites/${id}`)
          .then(response => {
            if (response.data.success) {
              setFavorites(favorites.filter(fav => fav._id !== id));
              Swal.fire({
                title: 'Removed!',
                text: 'Artwork removed from favorites',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#ffffff',
                color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f3f4f6' : '#1f2937',
              });
            }
          })
          .catch(error => console.error(error));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          
          <h1 className="text-5xl md:text-6xl font-black text-base-content mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Favorites
          </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>

           
        </div>

        {favorites.length === 0 ? (
          <div className="card bg-gradient-to-br from-base-200 to-base-300 shadow-2xl border border-base-content/10 max-w-2xl mx-auto">
            <div className="card-body text-center py-16">
              <Star className="w-24 h-24 mx-auto text-base-content/20 mb-6" />
              <h2 className="text-3xl font-bold text-base-content mb-3">No favorites yet</h2>
              <p className="text-base-content/60 text-lg mb-6">
                Start exploring and add artworks to build your personal collection
              </p>
              <Link to="/explore">
                <button className="btn btn-primary btn-lg gap-2">
                  <Palette className="w-5 h-5" />
                  Explore Gallery
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-base-content/70">
                <span className="font-bold text-primary text-2xl">{favorites.length}</span> 
                <span className="ml-2">masterpiece{favorites.length !== 1 ? 's' : ''} in your collection</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((favorite) => (
                <div 
                  key={favorite._id} 
                  className="card bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-base-content/5 overflow-hidden"
                >
                  <figure className="relative overflow-hidden h-64">
                    <img
                      src={favorite.artwork_image}
                      alt={favorite.artwork_title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="badge badge-accent badge-sm font-semibold shadow-lg">
                        {favorite.category}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-white">
                        <Heart className="w-4 h-4 fill-current text-error" />
                        <span className="text-sm font-semibold">Favorited</span>
                      </div>
                    </div>
                  </figure>
                  
                  <div className="card-body">
                    <h3 className="card-title text-base-content text-xl font-bold line-clamp-2">
                      {favorite.artwork_title}
                    </h3>
                    <p className="text-base-content/60 font-medium">
                      by <span className="text-primary font-bold">{favorite.artist_name}</span>
                    </p>
                    
                    <div className="card-actions justify-between items-center mt-4">
                      <Link to={`/artwork/${favorite.artwork_id}`} className="flex-1">
                        <button className="btn btn-primary btn-sm w-full group/btn">
                          <Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => handleUnfavorite(favorite._id)}
                        className="btn btn-error btn-sm btn-outline group/btn"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;