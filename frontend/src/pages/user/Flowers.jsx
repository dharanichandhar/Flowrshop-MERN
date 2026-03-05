import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import api from "../../api/axiosInstance";
import "./Flowers.css";

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function setCart(c) {
  localStorage.setItem("cart", JSON.stringify(c));
}

export default function Flowers() {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const isGarlands = type === "garlands";
  const category = isGarlands ? "garland" : "flower";
  const title = isGarlands ? "Flower Garlands" : "Fresh Flowers";
  const subtitle = isGarlands 
    ? "Handcrafted garlands for weddings, functions & events" 
    : "Beautiful fresh flowers for every occasion";

  useEffect(() => {
    setLoading(true);
    api.get(`/api/products?category=${category}`)
      .then((r) => {
        setItems(r.data);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e?.response?.data?.message || "Failed to load products");
        setLoading(false);
      });
  }, [category]);

  const add = (p) => {
    const cart = getCart();
    const idx = cart.findIndex((x) => x.productId === p._id);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ productId: p._id, title: p.title, price: p.price, qty: 1, imageUrl: p.imageUrl });
    setCart(cart);
    alert("Added to cart!");
  };

  return (
    <>
      <div className="productsPage">
        <div className="products-header">
          <h2>{isGarlands ? '🌸' : '💐'} {title}</h2>
          <p>{subtitle}</p>
        </div>
        
        {err && <p className="errTxt">{err}</p>}
        
        {loading ? (
          <div className="no-products">
            <div className="no-products-icon">🌸</div>
            <p>Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🌺</div>
            <p>No products available</p>
            <Link to="/" className="empty-btn" style={{marginTop: '16px', display: 'inline-block'}}>
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {items.map((p) => (
              <ProductCard key={p._id} p={p} onAdd={add} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
