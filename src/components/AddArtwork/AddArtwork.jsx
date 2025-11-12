import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Upload, ImageIcon, Tag, Palette, FileText, Ruler, DollarSign, Eye } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-200">
      <div className="w-full max-w-2xl">
        <div className="bg-base-100 rounded-[20px] shadow-2xl overflow-hidden">
          
          <div className="h-48 w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="w-20 h-20 bg-base-100 rounded-full flex items-center justify-center shadow-lg">
              <Upload className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-bold text-base-content mb-2">Share Your Artwork</h2>
            <p className="text-base-content/60 text-sm">Add your masterpiece to the world</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <ImageIcon className="w-3 h-3" />
                    Image URL
                  </span>
                </label>
                <input 
                  type="url" 
                  name="image_url" 
                  placeholder="https://example.com/artwork.jpg" 
                  className="input input-bordered w-full"
                  required 
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    Title
                  </span>
                </label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Enter artwork title" 
                  className="input input-bordered w-full"
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      Category
                    </span>
                  </label>
                  <select 
                    name="category" 
                    className="select select-bordered w-full"
                    required
                    defaultValue=""
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

                <div>
                  <label className="label">
                    <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                      <Palette className="w-3 h-3" />
                      Medium/Tools
                    </span>
                  </label>
                  <input 
                    type="text" 
                    name="medium" 
                    placeholder="Oil on canvas, Procreate..." 
                    className="input input-bordered w-full"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    Description
                  </span>
                </label>
                <textarea 
                  name="description" 
                  placeholder="Describe your artwork, inspiration, and creative process..." 
                  className="textarea textarea-bordered w-full h-24"
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                      <Ruler className="w-3 h-3" />
                      Dimensions
                    </span>
                  </label>
                  <input 
                    type="text" 
                    name="dimensions" 
                    placeholder="24x36 inches" 
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                      <DollarSign className="w-3 h-3" />
                      Price
                    </span>
                  </label>
                  <input 
                    type="text" 
                    name="price" 
                    placeholder="$500" 
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    Visibility
                  </span>
                </label>
                <select 
                  name="visibility" 
                  className="select select-bordered w-full"
                  required
                  defaultValue="Public"
                >
                  <option value="Public">Public - Visible to everyone</option>
                  <option value="Private">Private - Only visible to you</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-6">
                <Upload className="w-4 h-4" />
                Upload Artwork
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtwork;