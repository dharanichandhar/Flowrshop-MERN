import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosInstance";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const load = () => {
    setLoading(true);
    api.get("/api/orders")
      .then((r) => setOrders(r.data))
      .catch((e) => setErr(e?.response?.data?.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    try {
      await api.put(`/api/orders/${id}/status`, { status });
      load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to update status");
    }
  };

  const statusOptions = ["Pending", "Packed", "Shipped", "Delivered", "Cancelled"];
  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);
  const getStatusColor = (status) => {
    const colors = {
      Pending: "#f59e0b",
      Packed: "#3b82f6",
      Shipped: "#8b5cf6",
      Delivered: "#10b981",
      Cancelled: "#ef4444"
    };
    return colors[status] || "#6b7280";
  };

  return (
    <>
      <Navbar />
      <div className="admin-orders-container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Order Management</h1>
            <p className="admin-subtitle">Manage and track all customer orders</p>
          </div>
          <div className="order-stats">
            <div className="stat-card">
              <span className="stat-number">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-card pending">
              <span className="stat-number">{orders.filter(o => o.status === "Pending").length}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card delivered">
              <span className="stat-number">{orders.filter(o => o.status === "Delivered").length}</span>
              <span className="stat-label">Delivered</span>
            </div>
          </div>
        </div>

        <div className="filter-bar">
          <button 
            className={`filter-btn ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All Orders
          </button>
          {statusOptions.map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {err && <div className="error-message">{err}</div>}
        
        {loading ? (
          <div className="loading-spinner">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card-admin">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="order-status-wrapper">
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) => changeStatus(order._id, e.target.value)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="order-customer">
                  <div className="customer-info">
                    <span className="customer-label">Customer:</span>
                    <span className="customer-name">
                      {order.userId?.name || "Unknown"}
                    </span>
                    <span className="customer-email">
                      {order.userId?.email || "No email"}
                    </span>
                  </div>
                  <div className="order-total">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">
                      ₹ {order.items.reduce((s, it) => s + it.price * it.qty, 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="item-row">
                      <img src={item.imageUrl} alt={item.title} className="item-image" />
                      <div className="item-details">
                        <span className="item-name">{item.title}</span>
                        <span className="item-qty">Qty: {item.qty}</span>
                      </div>
                      <span className="item-price">₹ {(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="order-address">
                  <span className="address-label">Delivery Address:</span>
                  <span className="address-text">
                    {order.address.fullAddress}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                  </span>
                  <span className="address-phone">📱 {order.address.mobile}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}