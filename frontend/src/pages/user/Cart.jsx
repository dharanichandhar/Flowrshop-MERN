import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css";

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function setCart(c) {
  localStorage.setItem("cart", JSON.stringify(c));
}

export default function Cart() {
  const nav = useNavigate();
  const [cart, setCartState] = useState(getCart());

  const total = useMemo(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);

  const inc = (id) => {
    const c = cart.map((it) => it.productId === id ? { ...it, qty: it.qty + 1 } : it);
    setCart(c); setCartState(c);
  };
  const dec = (id) => {
    const c = cart
      .map((it) => it.productId === id ? { ...it, qty: it.qty - 1 } : it)
      .filter((it) => it.qty > 0);
    setCart(c); setCartState(c);
  };

  return (
    <>
      <div className="cartPage">
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🌸</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any flowers yet!</p>
            <Link to="/" className="empty-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cartList">
              {cart.map((it) => (
                <div className="cartRow" key={it.productId}>
                  <img src={it.imageUrl} alt={it.title} />
                  <div className="info">
                    <div className="t">{it.title}</div>
                    <div className="m">₹{it.price} each</div>
                  </div>
                  <div className="qty">
                    <button onClick={() => dec(it.productId)}>−</button>
                    <span>{it.qty}</span>
                    <button onClick={() => inc(it.productId)}>+</button>
                  </div>
                  <div className="line">₹{it.price * it.qty}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="cartBottom">
            <div className="cartBottomContent">
              <div className="tot">Total: <span>₹{total}</span></div>
              <button className="go" onClick={() => nav("/checkout")}>
                Checkout (COD)
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
