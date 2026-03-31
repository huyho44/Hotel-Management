import { ArrowRight, Star, Coffee, Wifi, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <header className="hero animate-fade-in">
        <div className="hero-content">
          <h1>We'll make your stay unforgettable </h1>
          <p>
            Welcome to Huy Ho Hotel. Discover our exquisite rooms, world-class amenities,
            and unparalleled service tailored just for you. Escape the ordinary.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/rooms" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Explore Rooms
            </Link>
             <Link to="/contact" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderColor: 'white', color: 'yellow' }}>
              Contact Us <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
        </div>
      </header>

      <section className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Signature Amenities</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Indulge in a relaxing environment designed entirely around your comfort and happiness. Check out what we offer.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', padding: '0 2rem' }}>
          {[
            { icon: <Star size={40} color="var(--color-accent)"/>, title: "5-Star Service", desc: "Enjoy top tier hospitality" },
            { icon: <Coffee size={40} color="var(--color-accent)"/>, title: "Premium Breakfast", desc: "Complimentary breakfast for guests" },
            { icon: <Wifi size={40} color="var(--color-accent)"/>, title: "High Speed Fiber", desc: "Stay connected smoothly" },
            { icon: <Car size={40} color="var(--color-accent)"/>, title: "Valet Parking", desc: "Safe secure parking space" }
          ].map((item, i) => (
            <div key={i} style={{ 
              padding: '2rem', 
              backgroundColor: 'white', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.3s ease'
             }}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
             >
              <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
