import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BrandLogo from './BrandLogo';

function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <BrandLogo />
          <p className="navbar__tagline">Track what drops next.</p>
        </div>

        {user ? (
          <nav className="navbar__links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/discover">Discover</NavLink>
            <NavLink to="/watchlist">Watchlist</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            <button className="button button--ghost navbar__logout" onClick={handleLogout}>
              Logout
            </button>

            <span className="navbar__welcome">
              Hi, {profile?.name || user.displayName || 'User'}
            </span>
          </nav>
        ) : (
          <nav className="navbar__links">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;