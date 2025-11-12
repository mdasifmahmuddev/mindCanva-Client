import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { User, Mail, Image, Save, X } from 'lucide-react';
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
    <div className="min-h-screen py-12 px-4 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-200 rounded-3xl shadow-xl overflow-hidden">
          
          <div className="h-32 bg-gradient-to-r from-primary to-accent"></div>

          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-8">
              <div className="flex items-end gap-4">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 bg-base-100">
                    <img src={formData.photoURL || 'https://i.ibb.co/7XqW8br/default-avatar.png'} alt={formData.displayName} />
                  </div>
                </div>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-base-content">{formData.displayName}</h1>
                  <p className="text-base-content/60">{formData.email}</p>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary mt-4 md:mt-0"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="bg-base-100 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-base-content">Edit Profile</h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="input input-bordered w-full pl-10 bg-base-200 cursor-not-allowed"
                      />
                    </div>
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">Email cannot be changed</span>
                    </label>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Photo URL</span>
                    </label>
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                      <input
                        type="url"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="Enter photo URL"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn btn-primary flex-1"
                    >
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn btn-ghost flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-base-content">Full Name</h3>
                  </div>
                  <p className="text-base-content/80 text-lg">{formData.displayName}</p>
                </div>

                <div className="bg-base-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold text-base-content">Email Address</h3>
                  </div>
                  <p className="text-base-content/80 text-lg">{formData.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;