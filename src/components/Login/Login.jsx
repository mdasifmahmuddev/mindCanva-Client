import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LogIn, Mail, Lock, Sparkles } from 'lucide-react';

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

        axios.post('https://mind-canvas-server-dun.vercel.app/users', newUser)
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-200">
      <div className="w-full max-w-md">
        <div className="bg-base-100 rounded-[20px] shadow-2xl overflow-hidden">
          
          <div className="h-48 w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="w-20 h-20 bg-base-100 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-bold text-base-content mb-2">Welcome Back</h2>
            <p className="text-base-content/60 text-sm">Login to continue your journey</p>
          </div>

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="input input-bordered w-full"
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
                  placeholder="Enter your password" 
                  className="input input-bordered w-full"
                  required 
                />
              </div>

              {error && (
                <div className="alert alert-error py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M12 5.5a7 7 0 100 14 7 7 0 000-14z" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full">
                <LogIn className="w-4 h-4" />
                Login
              </button>

              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-base-300"></div>
                <span className="text-xs font-semibold text-base-content/50">OR</span>
                <div className="flex-1 h-px bg-base-300"></div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full"
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
    </div>
  );
};

export default Login;