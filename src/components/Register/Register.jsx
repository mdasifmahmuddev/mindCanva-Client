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

    // Password validation
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
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 bg-base-100 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-5deg); }
          66% { transform: translate(20px, -20px) rotate(5deg); }
        }
        .bg-animated {
          animation: float 25s ease-in-out infinite;
        }
        .bg-animated-reverse {
          animation: floatReverse 30s ease-in-out infinite;
        }
        .register-button {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 150ms cubic-bezier(0, 0, 0.58, 1);
        }
        .register-button::before {
          position: absolute;
          content: '';
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: inherit;
          transform: translate3d(0, 0.7em, -1em);
          transition: transform 150ms cubic-bezier(0, 0, 0.58, 1);
          z-index: -1;
          background: currentColor;
          box-shadow: 0 0 0 3px currentColor, 0 0.7em 0 0 theme('colors.accent');
        }
        .register-button:hover {
          transform: translate(0, 0.3em);
        }
        .register-button:hover::before {
          transform: translate3d(0, 0.4em, -1em);
          box-shadow: 0 0 0 3px currentColor, 0 0.4em 0 0 theme('colors.accent');
        }
        .register-button:active {
          transform: translate(0em, 0.7em);
        }
        .register-button:active::before {
          transform: translate3d(0, 0, -1em);
          box-shadow: 0 0 0 3px currentColor, 0 0 theme('colors.accent');
        }
        .google-button::before {
          background: theme('colors.base-300');
          box-shadow: 0 0 0 3px theme('colors.base-300'), 0 0.7em 0 0 theme('colors.base-200');
        }
        .google-button:hover::before {
          box-shadow: 0 0 0 3px theme('colors.base-300'), 0 0.4em 0 0 theme('colors.base-200');
        }
        .google-button:active::before {
          box-shadow: 0 0 0 3px theme('colors.base-300'), 0 0 theme('colors.base-200');
        }
        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-field:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl top-0 -left-20 bg-animated"></div>
        <div className="absolute w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl bottom-0 -right-20 bg-animated-reverse"></div>
        <div className="absolute w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-animated"></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-primary-content" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-2">Create Account</h1>
          <p className="text-base-content opacity-70">Join mindCanva and showcase your artworks</p>
        </div>

        <div className="bg-base-200 rounded-3xl shadow-2xl p-8 border-2 border-base-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <User className="w-4 h-4 text-primary" />
                Name
              </label>
              <input 
                type="text" 
                name="name" 
                placeholder="Your full name" 
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40" 
                required 
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="your.email@example.com" 
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40" 
                required 
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <Image className="w-4 h-4 text-primary" />
                Photo URL
              </label>
              <input 
                type="text" 
                name="photo" 
                placeholder="https://example.com/photo.jpg" 
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40" 
                required 
              />
            </div>

            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-bold text-base-content mb-3">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter a strong password" 
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40" 
                required 
              />
              <div className="mt-2 space-y-1">
                <p className="text-xs text-base-content opacity-60 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Min 6 characters, 1 uppercase, 1 lowercase
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border-2 border-red-600 rounded-xl p-4 text-center animate-fadeIn">
                <p className="text-red-600 text-sm font-semibold flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  {error}
                </p>
              </div>
            )}

            <button 
              type="submit"
              className="register-button w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase bg-base-100 border-3 border-primary text-primary rounded-2xl hover:bg-base-200 focus:outline-none"
            >
              <UserPlus className="w-5 h-5" />
              <span>Register</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-base-300"></div>
              <span className="text-sm font-semibold text-base-content opacity-50">OR</span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="register-button google-button w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase bg-base-100 border-3 border-base-300 text-base-content rounded-2xl hover:bg-base-200 focus:outline-none"
            >
              <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-base-content opacity-70">
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
  );
};

export default Register;