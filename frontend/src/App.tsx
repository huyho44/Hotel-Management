import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Rooms & Suites Coming Soon</h2></div>} />
          <Route path="/amenities" element={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Amenities Coming Soon</h2></div>} />
          <Route path="/contact" element={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Contact Page Coming Soon</h2></div>} />
          <Route path="/login" element={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Login Modal/Page Coming Soon</h2></div>} />
          <Route path="/book" element={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Booking Engine Coming Soon</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
