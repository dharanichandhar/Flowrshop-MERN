import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosInstance";
import "./ManageProducts.css";

export default function ManageProducts() {
  const nav = useNavigate();
  const [category, setCategory] = useState("flower");
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  const load = () => {
    api.get(`/api/products?category=${category}`)
      .then((r) => setItems(r.data))
      .catch((e) => setErr(e?.response?.data?.message || "Failed"));
  };

  useEffect(() => { load(); }, [category]);

  const del = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      load();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to delete");
    }
  };

  const filteredItems = items.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="manage-products-container">
        <div className="manage-header">
          <div>
            <h1 className="manage-title">Product Management</h1>
            <p className="manage-subtitle">Manage your flower and garland inventory</p>
          </div>
          <Link className="add-product-btn" to="/admin/products/add">
            <span className="btn-icon">+</span>
            Add Product
          </Link>
        </div>

        <div className="manage-toolbar">
          <div className="category-tabs">
            <button 
              className={`cat-tab ${category === "flower" ? "active" : ""}`}
              onClick={() => setCategory("flower")}
            >
              <span className="tab-icon">🌸</span>
              Flowers
              <span className="tab-count">{category === "flower" ? items.length : ""}</span>
            </button>
            <button 
              className={`cat-tab ${category === "garland" ? "active" : ""}`}
              onClick={() => setCategory("garland")}
            >
              <span className="tab-icon">🎀</span>
              Garlands
              <span className="tab-count">{category === "garland" ? items.length : ""}</span>
            </button>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {err && <div className="error-message">{err}</div>}

        <div className="products-summary">
          <div className="summary-card">
            <span className="summary-number">{items.length}</span>
            <span className="summary-label">Total Products</span>
          </div>
          <div className="summary-card in-stock">
            <span className="summary-number">{items.filter(p => p.stock > 0).length}</span>
            <span className="summary-label">In Stock</span>
          </div>
          <div className="summary-card out-stock">
            <span className="summary-number">{items.filter(p => p.stock === 0).length}</span>
            <span className="summary-label">Out of Stock</span>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>No products found</p>
            <Link to="/admin/products/add" className="empty-add-btn">Add your first product</Link>
          </div>
        ) : (
          <div className="products-grid">
            {filteredItems.map((p) => (
              <div className="product-card" key={p._id}>
                <div className="product-image-wrapper">
                  <img src={p.imageUrl} alt={p.title} className="product-image" />
                  <span className={`stock-badge ${p.stock > 0 ? "available" : "unavailable"}`}>
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                  </span>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{p.title}</h3>
                  <div className="product-meta">
                    <span className="product-category">{p.category}</span>
                    <span className="product-price">₹ {p.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => nav(`/admin/products/edit/${p._id}`)}
                  >
                    <span className="btn-icon">✏️</span>
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => del(p._id)}
                  >
                    <span className="btn-icon">🗑️</span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}