import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import OrderCard from "../../components/OrderCard";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/api/orders/my")
      .then((r) => {
        setOrders(r.data);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e?.response?.data?.message || "Failed to load orders");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="ordersPage">
        <div className="orders-header">
          <h2>📦 My Orders</h2>
          <p>Track and manage your orders</p>
        </div>

        <div className="orders-container">
          {err && <p className="errTxt">{err}</p>}
          
          {loading ? (
            <div className="no-orders">
              <div className="no-orders-icon">⏳</div>
              <p>Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="no-orders">
              <div className="no-orders-icon">🌸</div>
              <h3>No orders yet</h3>
              <p>Start shopping to see your orders here!</p>
              <Link to="/" className="empty-btn">Browse Flowers</Link>
            </div>
          ) : (
            <div className="orderGrid">
              {orders.map((o) => (
                <OrderCard key={o._id} order={o} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
