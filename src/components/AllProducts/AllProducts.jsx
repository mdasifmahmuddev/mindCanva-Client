import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Heart, Eye, User, Palette, Search } from 'lucide-react';

import './AllProducts.css'

const AllProducts = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('http://localhost:3000/categories')
      .then(response => {
        const cats = response.data || [];
        setCategories(['All', ...cats]);
        fetchAllArtworks();
      })
      .catch(error => {
        console.error(error);
        setCategories(['All', 'Painting', 'Digital Art', 'Sculpture', 'Photography', 'Mixed Media', 'Drawing']);
        fetchAllArtworks();
      });
  };

  const fetchAllArtworks = () => {
    axios.get('http://localhost:3000/artworks')
      .then(response => {
        setArtworks(response.data);
        setFilteredArtworks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to load artworks");
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      setFilteredArtworks(artworks);
      return;
    }

    axios.get(`http://localhost:3000/search?search=${searchText}`)
      .then(response => {
        if (selectedCategory === 'All') {
          setFilteredArtworks(response.data);
        } else {
          const filtered = response.data.filter(artwork => artwork.category === selectedCategory);
          setFilteredArtworks(filtered);
        }
      })
      .catch(error => {
        console.error(error);
        toast.error("Search failed");
      });
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredArtworks(artworks);
      return;
    }

    if (searchText.trim() === '') {
      axios.get(`http://localhost:3000/artworks/category/${category}`)
        .then(response => {
          setFilteredArtworks(response.data);
        })
        .catch(error => {
          console.error(error);
          const filtered = artworks.filter(artwork => artwork.category === category);
          setFilteredArtworks(filtered);
        });
    } else {
      axios.get(`http://localhost:3000/search?search=${searchText}`)
        .then(response => {
          const filtered = response.data.filter(artwork => artwork.category === category);
          setFilteredArtworks(filtered);
        })
        .catch(error => console.error(error));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-transparent"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-accent border-t-transparent absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="all-products-container">
      <div className="all-products-content">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
<h1 className="text-5xl md:text-6xl font-black text-base-content mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
         Explore Artwork 
          </h1>            <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search by title or artist name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-6 py-4 bg-base-200 border-2 border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base-content placeholder-base-content placeholder-opacity-50 transition-all"
              />
              <button
                onClick={handleSearch}
                className="search-button"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-content shadow-lg'
                    : 'bg-base-200 text-base-content hover:bg-base-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredArtworks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base-content opacity-50 text-xl">No artworks found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtworks.map((artwork) => (
                <div key={artwork._id} className="artwork-card group">
                  <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                    
                    <figure className="relative h-80 overflow-hidden">
                      <img
                        src={artwork.image_url}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                      
                      <div className="absolute top-4 right-4 glass-overlay px-3 py-2 rounded-full flex items-center gap-2">
                        <Palette className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold text-white">{artwork.category}</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 line-clamp-2 drop-shadow-lg">{artwork.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <User className="w-4 h-4 opacity-80" />
                          <p className="text-sm opacity-90 font-medium">By {artwork.artist_name}</p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="glass-overlay px-4 py-2 rounded-full flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-current text-error" />
                            <span className="text-sm font-bold">{artwork.likes || 0}</span>
                          </div>
                          
                          <Link to={`/artwork/${artwork._id}`}>
                            <button className="artwork-button">
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </figure>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;