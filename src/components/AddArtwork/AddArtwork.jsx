import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Upload, ImageIcon, Tag, Palette, FileText, Ruler, DollarSign, Eye, User, Mail } from 'lucide-react';
import './AddArtwork.css'
const AddArtwork = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
      artist_name: user.displayName || 'Anonymous',
      created_by: user.email,
      artist_photo: user.photoURL || '',
      created_at: new Date(),
      likes: 0
    };

    try {
      const response = await axios.post('http://localhost:3000/artworks', formData);
      
      if (response.data.success) {
        toast.success("Artwork added successfully!");
        e.target.reset();
        navigate('/my-gallery');
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add artwork!");
    }
  };

  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.closest('.space-y-6');
    
    const formData = {
      image_url: form.querySelector('[name="image_url"]').value,
      title: form.querySelector('[name="title"]').value,
      category: form.querySelector('[name="category"]').value,
      medium: form.querySelector('[name="medium"]').value,
      description: form.querySelector('[name="description"]').value,
      dimensions: form.querySelector('[name="dimensions"]').value || 'Not specified',
      price: form.querySelector('[name="price"]').value || 'Not for sale',
      visibility: form.querySelector('[name="visibility"]').value,
      artist_name: user.displayName || 'Anonymous',
      created_by: user.email,
      artist_photo: user.photoURL || '',
      created_at: new Date(),
      likes: 0
    };

    try {
      const response = await axios.post('http://localhost:3000/artworks', formData);
      
      if (response.data.success) {
        toast.success("Artwork added successfully!");
        form.querySelectorAll('input[type="text"], input[type="url"], textarea, select').forEach(el => {
          if (!el.readOnly) el.value = '';
        });
        navigate('/my-gallery');
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add artwork!");
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4 bg-base-100 overflow-hidden">
      

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl top-0 -left-20 bg-animated"></div>
        <div className="absolute w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl bottom-0 -right-20 bg-animated-reverse"></div>
        <div className="absolute w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-animated"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <Upload className="w-8 h-8 text-primary-content" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-3 tracking-tight">
            Add New Artwork
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
          <p className="mt-4 text-base-content opacity-70">Share your creative masterpiece with the world</p>
        </div>
        
        <div className="bg-base-200 rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-base-300">
          <div className="space-y-6">
            
            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <ImageIcon className="w-4 h-4 text-primary" />
                Image URL
                <span className="text-error">*</span>
              </label>
              <input
                type="url"
                name="image_url"
                required
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40"
                placeholder="https://example.com/artwork.jpg"
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <FileText className="w-4 h-4 text-primary" />
                Title
                <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40"
                placeholder="Enter artwork title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                  <Tag className="w-4 h-4 text-primary" />
                  Category
                  <span className="text-error">*</span>
                </label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content"
                >
                  <option value="" disabled>Select category</option>
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

              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                  <Palette className="w-4 h-4 text-primary" />
                  Medium/Tools
                  <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="medium"
                  required
                  className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40"
                  placeholder="Oil on canvas, Procreate..."
                />
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <FileText className="w-4 h-4 text-primary" />
                Description
                <span className="text-error">*</span>
              </label>
              <textarea
                name="description"
                required
                rows="5"
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none text-base-content placeholder-base-content placeholder-opacity-40"
                placeholder="Describe your artwork, inspiration, and creative process..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                  <Ruler className="w-4 h-4 text-accent" />
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40"
                  placeholder="24x36 inches, 1920x1080px"
                />
              </div>

              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                  <DollarSign className="w-4 h-4 text-accent" />
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40"
                  placeholder="$500 or Not for sale"
                />
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <Eye className="w-4 h-4 text-primary" />
                Visibility
                <span className="text-error">*</span>
              </label>
              <select
                name="visibility"
                required
                defaultValue="Public"
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content"
              >
                <option value="Public">Public - Visible to everyone</option>
                <option value="Private">Private - Only visible to you</option>
              </select>
            </div>

            <div className="bg-base-300 bg-opacity-50 rounded-2xl p-6 border-2 border-base-300">
              <h3 className="text-sm font-bold text-base-content mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                Artist Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="flex items-center gap-2 text-xs font-semibold text-base-content opacity-70 mb-2">
                    <User className="w-3 h-3" />
                    Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || 'Anonymous'}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-base-100 border-2 border-base-300 text-base-content opacity-60 cursor-not-allowed"
                  />
                </div>
                <div className="relative">
                  <label className="flex items-center gap-2 text-xs font-semibold text-base-content opacity-70 mb-2">
                    <Mail className="w-3 h-3" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-base-100 border-2 border-base-300 text-base-content opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleButtonSubmit}
              className="submit-button mt-8"
            >
              <Upload className="w-5 h-5" />
              <span>Add Artwork</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtwork;