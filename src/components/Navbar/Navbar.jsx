import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthProvider';
import Swal from 'sweetalert2';
import { useTheme } from '../../contexts/ThemeProvider';
import { 
  Home, 
  Search, 
  User, 
  Heart, 
  PlusCircle, 
  Image,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Palette
} from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged Out Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch();
  };

  const navItems = [
    { to: '/', label: 'Home', icon: Home, auth: false },
    { to: '/explore', label: 'Explore', icon: Search, auth: false },
    { to: '/add-artwork', label: 'Add Artwork', icon: PlusCircle, auth: true },
    { to: '/my-gallery', label: 'My Gallery', icon: Image, auth: true },
    { to: '/my-favorites', label: 'Favorites', icon: Heart, auth: true }
  ];

  return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-base-100 via-base-100 to-primary/5 shadow-sm backdrop-blur-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
          >
            <Palette className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              mindCanva
            </span>
          </Link>

          <div className="hidden lg:flex">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                if (item.auth && !user) return null;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 ${
                        isActive
                          ? 'bg-primary text-primary-content'
                          : 'text-base-content hover:bg-base-200'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-ghost hover:rotate-180 transition-transform duration-500"
            >
              {theme === 'garden' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/7XqW8br/default-avatar.png'}
                      alt={user.displayName}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-xl"
                >
                  <li className="menu-title"><span>{user.displayName}</span></li>
                  <li>
                    <Link to="/my-profile">
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden btn btn-ghost btn-circle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-base-300">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                if (item.auth && !user) return null;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary text-primary-content'
                          : 'hover:bg-base-200'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
              
              {user && (
                <NavLink
                  to="/my-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-200'
                    }`
                  }
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">My Profile</span>
                </NavLink>
              )}

              {!user && (
                <div className="flex gap-2 mt-4 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-ghost flex-1"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-primary flex-1"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;