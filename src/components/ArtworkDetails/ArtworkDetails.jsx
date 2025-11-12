import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../contexts/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Heart, Star, Palette, User, Layers, Ruler, Tag, Info } from 'lucide-react';

const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [artwork, setArtwork] = useState(null);
  const [artistInfo, setArtistInfo] = useState({ photo: '', totalArtworks: 0 });
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);

  useEffect(() => {
    axios.get(`https://mind-canvas-server-dun.vercel.app/artworks/${id}`)
      .then(response => {
        setArtwork(response.data);
        fetchArtistInfo(response.data.created_by);
        if (user?.email) {
          checkIfLiked(response.data._id);
          checkIfFavorited(response.data._id);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id, user]);

  const fetchArtistInfo = (email) => {
    axios.get(`https://mind-canvas-server-dun.vercel.app/artworks/artist/${email}`)
      .then(response => {
        setArtistInfo({
          photo: response.data.artist_photo || '',
          totalArtworks: response.data.total || 0
        });
      })
      .catch(error => console.error(error));
  };

  const checkIfLiked = (artworkId) => {
    if (!user?.email) return;
    
    axios.get(`https://mind-canvas-server-dun.vercel.app/likes/check`, {
      params: {
        artwork_id: artworkId,
        user_email: user.email
      }
    })
      .then(response => {
        setHasLiked(response.data.hasLiked);
      })
      .catch(error => console.error(error));
  };

  const checkIfFavorited = (artworkId) => {
    if (!user?.email) return;
    
    axios.get(`https://mind-canvas-server-dun.vercel.app/favorites/check`, {
      params: {
        artwork_id: artworkId,
        user_email: user.email
      }
    })
      .then(response => {
        setIsFavorited(response.data.isFavorited);
      })
      .catch(error => console.error(error));
  };

  const handleLike = () => {
    if (!user?.email) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to like this artwork',
        icon: 'info',
        confirmButtonColor: '#570df8'
      });
      return;
    }

    if (hasLiked) {
      Swal.fire({
        title: 'Already Appreciated',
        text: 'You have already shown love for this artwork',
        icon: 'info',
        confirmButtonColor: '#570df8',
        timer: 2000
      });
      return;
    }

    if (isLiking) return;
    
    setIsLiking(true);

    axios.patch(`https://mind-canvas-server-dun.vercel.app/artworks/${id}/like`, {
      user_email: user.email
    })
      .then(response => {
        if (response.data.success) {
          setArtwork({...artwork, likes: (artwork.likes || 0) + 1});
          setHasLiked(true);
          Swal.fire({
            title: 'Love Sent!',
            icon: 'success',
            confirmButtonColor: '#570df8',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          setHasLiked(true);
        }
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Please try again',
          icon: 'error',
          confirmButtonColor: '#570df8'
        });
      })
      .finally(() => {
        setIsLiking(false);
      });
  };

  const handleAddToFavorites = () => {
    if (!user?.email) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to add to favorites',
        icon: 'info',
        confirmButtonColor: '#570df8'
      });
      return;
    }

    if (isFavorited) {
      Swal.fire({
        title: 'Already in Favorites',
        icon: 'info',
        confirmButtonColor: '#570df8',
        timer: 2000
      });
      return;
    }

    if (isAddingFavorite) return;
    
    setIsAddingFavorite(true);

    const favoriteData = {
      artwork_id: artwork._id,
      artwork_image: artwork.image_url,
      artwork_title: artwork.title,
      artist_name: artwork.artist_name,
      category: artwork.category,
      user_email: user.email
    };

    axios.post('https://mind-canvas-server-dun.vercel.app/favorites', favoriteData)
      .then(response => {
        if (response.data.success) {
          setIsFavorited(true);
          Swal.fire({
            title: 'Saved!',
            icon: 'success',
            confirmButtonColor: '#570df8',
            timer: 1500,
            showConfirmButton: false
          });
        } else if (response.data.alreadyExists) {
          setIsFavorited(true);
        }
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          confirmButtonColor: '#570df8'
        });
      })
      .finally(() => {
        setIsAddingFavorite(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-base-content">Artwork Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium">
            <Palette className="w-3 h-3" />
            {artwork.category}
          </span>
          
          <div className="flex items-center gap-2">
            <Heart className={`w-5 h-5 ${hasLiked ? 'text-error fill-error' : 'text-base-content/40'}`} />
            <span className="text-lg font-semibold text-base-content">{artwork.likes || 0}</span>
          </div>
        </div>

        <div className="bg-base-200 rounded-2xl overflow-hidden mb-8">
          <div className="flex items-center justify-center p-8 lg:p-16">
            <img
              src={artwork.image_url}
              alt={artwork.title}
              className="w-full h-auto object-contain max-h-[70vh] rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-2">
              {artwork.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-base-300">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img 
                  src={artistInfo.photo || 'https://via.placeholder.com/80'} 
                  alt={artwork.artist_name}
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-base-content/50 flex items-center gap-1">
                <User className="w-3 h-3" />
                Artist
              </p>
              <p className="text-base font-semibold text-base-content">{artwork.artist_name}</p>
              <p className="text-xs text-base-content/50">{artistInfo.totalArtworks} artworks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-base-content/50 uppercase tracking-wide mb-1">Description</p>
                <p className="text-sm text-base-content/80">{artwork.description}</p>
              </div>
            </div>

            {artwork.medium && (
              <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                <Layers className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-base-content/50 uppercase tracking-wide mb-1">Medium</p>
                  <p className="text-sm text-base-content/80">{artwork.medium}</p>
                </div>
              </div>
            )}

            {artwork.dimensions && (
              <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                <Ruler className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-base-content/50 uppercase tracking-wide mb-1">Dimensions</p>
                  <p className="text-sm text-base-content/80">{artwork.dimensions}</p>
                </div>
              </div>
            )}

            {artwork.price && (
              <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                <Tag className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-base-content/50 uppercase tracking-wide mb-1">Price</p>
                  <p className="text-sm font-semibold text-success">${artwork.price}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleLike}
              disabled={hasLiked || isLiking}
              className={`flex-1 btn ${
                hasLiked 
                  ? 'btn-outline border-2 border-error/30 text-error hover:bg-error/10' 
                  : 'btn-error'
              } ${isLiking ? 'loading' : ''}`}
            >
              {!isLiking && (
                <>
                  <Heart className={`w-5 h-5 ${hasLiked ? 'fill-error' : ''}`} />
                  {hasLiked ? 'Loved' : 'Love'}
                </>
              )}
            </button>

            <button
              onClick={handleAddToFavorites}
              disabled={isFavorited || isAddingFavorite}
              className={`flex-1 btn ${
                isFavorited 
                  ? 'btn-outline border-2 border-primary/30 text-primary hover:bg-primary/10'
                  : 'btn-primary'
              } ${isAddingFavorite ? 'loading' : ''}`}
            >
              {!isAddingFavorite && (
                <>
                  <Star className={`w-5 h-5 ${isFavorited ? 'fill-primary' : ''}`} />
                  {isFavorited ? 'Saved' : 'Save'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;