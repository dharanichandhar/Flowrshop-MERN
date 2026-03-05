import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const doLogout = () => {
    logout();
    nav("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="brand-icon">🌸</span>
          FlowerShop
        </Link>
      </div>

      <div className="nav-right">
        {user?.role === "admin" ? (
          <>
            <Link to="/admin" className="nav-link">Dashboard</Link>
            <Link to="/admin/products" className="nav-link">Products</Link>
            <Link to="/admin/orders" className="nav-link">Orders</Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/my-orders" className="nav-link">My Orders</Link>
          </>
        )}
        <button className="logoutBtn" onClick={doLogout}>Logout</button>
      </div>

      <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {user?.role === "admin" ? (
          <>
            <Link to="/admin" className="nav-link" onClick={closeMenu}>Dashboard</Link>
            <Link to="/admin/products" className="nav-link" onClick={closeMenu}>Products</Link>
            <Link to="/admin/orders" className="nav-link" onClick={closeMenu}>Orders</Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            <Link to="/cart" className="nav-link" onClick={closeMenu}>Cart</Link>
            <Link to="/my-orders" className="nav-link" onClick={closeMenu}>My Orders</Link>
          </>
        )}
        <button className="logoutBtn" onClick={doLogout}>Logout</button>
      </div>
    </nav>
  );
}
