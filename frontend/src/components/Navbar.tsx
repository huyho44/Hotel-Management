import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Huy Ho Hotel Logo" style={{ height: '32px', width: 'auto', objectFit: 'cover' }} />
          <span>Huy Ho Hotel</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/rooms" className="nav-link">Rooms & Suites</Link>
          <Link to="/amenities" className="nav-link">Amenities</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <div style={{ paddingLeft: '2rem', borderLeft: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
              <LogIn size={18} /> Login
            </Link>
            <Link to="/book" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
