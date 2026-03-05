import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-icon">🌸</span>
          <h3>FlowerShop</h3>
          <p>Fresh flowers for every occasion. Delivery across the city.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/my-orders">My Orders</Link>
          </div>
          
          <div className="footer-section">
            <h4>Categories</h4>
            <Link to="/flowers">Fresh Flowers</Link>
            <Link to="/garlands">Garlands</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📍 Flower Shop, City</p>
            <p>📞 +91 9876543210</p>
            <p>✉️ info@flowershop.com</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 FlowerShop. All rights reserved.</p>
      </div>
    </footer>
  );
}
