import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { UserPlus, Mail, Lock, User, Image, Sparkles, AlertCircle } from 'lucide-react';

const Register = () => {
  const { createUser, signInGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      
      const newUser = {
        name: name,
        email: email,
        image: photo
      };

      const response = await axios.post('http://localhost:3000/users', newUser, {
        headers: {
          'content-type': 'application/json'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome to mindCanva!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL
      };

      await axios.post('http://localhost:3000/users', newUser, {
        headers: {
          'content-type': 'application/json'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-200">
      <div className="w-full max-w-md">
        <div className="bg-base-100 rounded-[20px] shadow-2xl overflow-hidden">
          
          <div className="h-48 w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="w-20 h-20 bg-base-100 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-bold text-base-content mb-2">Create Account</h2>
            <p className="text-base-content/60 text-sm">Join mindCanva and showcase your artworks</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Name
                  </span>
                </label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your full name" 
                  className="input input-bordered w-full input-sm"
                  required 
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    Email
                  </span>
                </label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  className="input input-bordered w-full input-sm"
                  required 
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <Image className="w-3 h-3" />
                    Photo URL
                  </span>
                </label>
                <input 
                  type="text" 
                  name="photo" 
                  placeholder="https://example.com/photo.jpg" 
                  className="input input-bordered w-full input-sm"
                  required 
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium text-xs uppercase tracking-wider text-base-content/70 flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    Password
                  </span>
                </label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Enter a strong password" 
                  className="input input-bordered w-full input-sm"
                  required 
                />
                <div className="mt-1">
                  <p className="text-xs text-base-content/60 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Min 6 characters, 1 uppercase, 1 lowercase
                  </p>
                </div>
              </div>

              {error && (
                <div className="alert alert-error py-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs">{error}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full btn-sm">
                <UserPlus className="w-4 h-4" />
                Register
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-base-300"></div>
                <span className="text-xs font-semibold text-base-content/50">OR</span>
                <div className="flex-1 h-px bg-base-300"></div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full btn-sm"
              >
                <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                  </g>
                </svg>
                Continue with Google
              </button>

              <div className="text-center pt-2">
                <p className="text-sm text-base-content/70">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-primary hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;