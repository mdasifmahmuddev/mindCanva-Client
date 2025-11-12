import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { User, Mail, Image, Save, X, Edit2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(formData.displayName, formData.photoURL);

      const response = await axios.put('http://localhost:3000/users/profile', {
        email: user.email,
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });

      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-base-200">
      <div className="max-w-md mx-auto">
        <div className="relative bg-base-100 rounded-[20px] shadow-2xl overflow-hidden">
          
          <div className="h-48 w-full bg-gradient-to-br from-primary to-accent"></div>

          <div className="absolute top-[96px] left-1/2 -translate-x-1/2 w-28 h-28 bg-base-100 rounded-full flex justify-center items-center shadow-lg">
            <img 
              src={formData.photoURL || 'https://i.ibb.co/7XqW8br/default-avatar.png'} 
              alt={formData.displayName}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div className="pt-16 pb-8 px-8 text-center">
            <h2 className="text-2xl font-bold text-base-content mb-2">
              {formData.displayName}
            </h2>
            <p className="text-base-content/60 text-sm mb-6">
              {formData.email}
            </p>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-sm btn-primary"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {isEditing && (
            <div className="px-8 pb-8">
              <div className="border-t border-base-300 pt-6 space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70">Full Name</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="input input-bordered w-full pl-10 input-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70">Email</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="input input-bordered w-full pl-10 input-sm bg-base-200 cursor-not-allowed opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70">Photo URL</span>
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      className="input input-bordered w-full pl-10 input-sm"
                      placeholder="Enter photo URL"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;