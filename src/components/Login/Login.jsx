import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';
import './Login.css'

const Login = () => {
  const { signInUser, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError('');

    signInUser(email, password)
      .then(result => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        };

        axios.post('http://localhost:3000/users', newUser)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              showConfirmButton: false,
              timer: 1500
            });
            navigate(from, { replace: true });
          })
          .catch(error => {
            console.error(error);
            setError('Failed to save user data');
          });
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 bg-base-100 overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-2">Welcome Back</h1>
          <p className="text-base-content opacity-70">Login to continue your creative journey</p>
        </div>

        <div className="bg-base-200 rounded-3xl shadow-2xl p-8 border-2 border-base-300">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                className="input-field w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-base-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base-content placeholder-base-content placeholder-opacity-40" 
                required 
              />
            </div>

            {error && (
              <div className="rounded-xl p-4 bg-red-500/10 border border-red-600 text-center animate-fadeIn">
                <p className="text-red-600 text-sm font-semibold flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01M12 5.5a7 7 0 100 14 7 7 0 000-14z"
                    />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <button 
              type="submit"
              className="login-button"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-base-300"></div>
              <span className="text-sm font-semibold text-base-content opacity-50">OR</span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="login-button google-button"
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
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-primary hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;