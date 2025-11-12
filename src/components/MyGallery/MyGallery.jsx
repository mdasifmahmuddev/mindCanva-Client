import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Heart, Edit, Trash2, Eye, EyeOff, Palette, User } from 'lucide-react';
import './MyGallery.css'

const MyGallery = () => {
  const { user } = useContext(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArtwork, setEditingArtwork] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchMyArtworks();
    }
  }, [user]);

  const fetchMyArtworks = () => {
    setLoading(true);
    axios.get(`http://localhost:3000/my-artworks`, {
      params: { email: user.email }
    })
      .then(response => {
        setArtworks(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        toast.error("Failed to load artworks!");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'oklch(71.76% 0.221 22.18)',
      cancelButtonColor: 'oklch(62.45% 0.278 3.836)',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/artworks/${id}`)
          .then(response => {
            if (response.data.success) {
              toast.success("Artwork deleted successfully!");
              fetchMyArtworks();
            }
          })
          .catch(err => {
            console.error(err);
            toast.error("Failed to delete artwork!");
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const formData = {
      image_url: e.target.image_url.value,
      title: e.target.title.value,
      category: e.target.category.value,
      medium: e.target.medium.value,
      description: e.target.description.value,
      dimensions: e.target.dimensions.value || 'Not specified',
      price: e.target.price.value || 'Not for sale',
      visibility: e.target.visibility.value,
    };

    axios.put(`http://localhost:3000/artworks/${editingArtwork._id}`, formData)
      .then(response => {
        if (response.data.success) {
          toast.success("Artwork updated successfully!");
          setEditingArtwork(null);
          fetchMyArtworks();
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update artwork!");
      });
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
    <div className="relative min-h-screen py-12 px-4 bg-base-100 overflow-hidden">
      

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl top-0 -left-20 bg-animated"></div>
        <div className="absolute w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl bottom-0 -right-20 bg-animated-reverse"></div>
        <div className="absolute w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-animated"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-base-content mb-4 tracking-tight">
            My Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-base-content opacity-70 mb-4">No artworks yet!</p>
            <p className="text-base-content opacity-50">Start adding your creative works.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
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
                      {artwork.visibility === 'Public' ? (
                        <>
                          <Eye className="w-4 h-4 text-success" />
                          <span className="text-xs font-semibold text-white">Public</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-base-content" />
                          <span className="text-xs font-semibold text-white">Private</span>
                        </>
                      )}
                    </div>
                    
                    <div className="absolute top-4 left-4 glass-overlay px-3 py-2 rounded-full flex items-center gap-2">
                      <Palette className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold text-white">{artwork.category}</span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2 line-clamp-2 drop-shadow-lg">{artwork.title}</h3>
                      <p className="text-sm opacity-90 mb-3 line-clamp-2">{artwork.description}</p>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="glass-overlay px-3 py-1 rounded-full flex items-center gap-2">
                          <Heart className="w-4 h-4 fill-current text-error" />
                          <span className="text-sm font-bold">{artwork.likes || 0}</span>
                        </div>
                        <div className="glass-overlay px-3 py-1 rounded-full text-xs">
                          {artwork.medium}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingArtwork(artwork)}
                          className="action-button flex-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(artwork._id)}
                          className="action-button delete-button flex-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </figure>
                  
                </div>
              </div>
            ))}
          </div>
        )}
 
        {editingArtwork && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
            <div className="bg-base-100 rounded-3xl p-8 max-w-2xl w-full my-8 shadow-2xl border-2 border-primary">
              <h3 className="text-3xl font-bold mb-6 text-primary">
                Update Artwork
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    defaultValue={editingArtwork.image_url}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base-content transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingArtwork.title}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base-content transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingArtwork.category}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base-content transition-all"
                  >
                    <option value="Painting">Painting</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Sculpture">Sculpture</option>
                    <option value="Photography">Photography</option>
                    <option value="Mixed Media">Mixed Media</option>
                    <option value="Drawing">Drawing</option>
                    <option value="3D Art">3D Art</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Medium/Tools
                  </label>
                  <input
                    type="text"
                    name="medium"
                    defaultValue={editingArtwork.medium}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base-content transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editingArtwork.description}
                    required
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-base-content transition-all"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    defaultValue={editingArtwork.dimensions}
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base-content transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={editingArtwork.price}
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base-content transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2">
                    Visibility
                  </label>
                  <select
                    name="visibility"
                    defaultValue={editingArtwork.visibility}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-base-200 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base-content transition-all"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const form = e.target.closest('.space-y-4');
                      const formData = {
                        image_url: form.querySelector('[name="image_url"]').value,
                        title: form.querySelector('[name="title"]').value,
                        category: form.querySelector('[name="category"]').value,
                        medium: form.querySelector('[name="medium"]').value,
                        description: form.querySelector('[name="description"]').value,
                        dimensions: form.querySelector('[name="dimensions"]').value || 'Not specified',
                        price: form.querySelector('[name="price"]').value || 'Not for sale',
                        visibility: form.querySelector('[name="visibility"]').value,
                      };
                      axios.put(`http://localhost:3000/artworks/${editingArtwork._id}`, formData)
                        .then(response => {
                          if (response.data.success) {
                            toast.success("Artwork updated successfully!");
                            setEditingArtwork(null);
                            fetchMyArtworks();
                          }
                        })
                        .catch(err => {
                          console.error(err);
                          toast.error("Failed to update artwork!");
                        });
                    }}
                    className="flex-1 action-button py-4 text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingArtwork(null)}
                    className="flex-1 bg-base-300 text-base-content py-4 rounded-xl hover:bg-base-content hover:text-base-100 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGallery;