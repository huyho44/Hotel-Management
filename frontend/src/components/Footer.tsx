export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 0', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Huy Ho Hotel</h3>
          <p style={{ opacity: 0.8 }}>Luxury Hotel Management System</p>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'yellow' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="/rooms" style={{ color: 'white', textDecoration: 'none' }}>Rooms & Suites</a></li>
              <li><a href="/amenities" style={{ color: 'white', textDecoration: 'none' }}>Amenities</a></li>
              <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'yellow' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center', opacity: 0.6 }}>
        <p>&copy; {new Date().getFullYear()} Huy Ho Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
}
