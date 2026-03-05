import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosInstance";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          api.get("/api/orders"),
          api.get("/api/products")
        ]);
        setStats({
          totalOrders: ordersRes.data.length,
          pendingOrders: ordersRes.data.filter(o => o.status === "Pending").length,
          totalProducts: productsRes.data.length
        });
      } catch (e) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Manage your flower shop</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card orders">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <span className="stat-number">{stats.totalOrders}</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <span className="stat-number">{stats.pendingOrders}</span>
              <span className="stat-label">Pending Orders</span>
            </div>
          </div>
          <div className="stat-card products">
            <div className="stat-icon">🌸</div>
            <div className="stat-content">
              <span className="stat-number">{stats.totalProducts}</span>
              <span className="stat-label">Total Products</span>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="section-card">
            <h2 className="section-title">Quick Actions</h2>
            <div className="action-grid">
              <Link to="/admin/products/add" className="action-btn add-product">
                <span className="action-icon">➕</span>
                <span className="action-text">Add New Product</span>
              </Link>
              <Link to="/admin/orders" className="action-btn view-orders">
                <span className="action-icon">📋</span>
                <span className="action-text">View All Orders</span>
              </Link>
              <Link to="/admin/products" className="action-btn manage-products">
                <span className="action-icon">🌺</span>
                <span className="action-text">Manage Products</span>
              </Link>
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot pending"></div>
                <div className="activity-content">
                  <span className="activity-text">Manage your flower inventory</span>
                  <span className="activity-time">Add, edit, or remove products</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot orders"></div>
                <div className="activity-content">
                  <span className="activity-text">Track customer orders</span>
                  <span className="activity-time">Update order status in real-time</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot products"></div>
                <div className="activity-content">
                  <span className="activity-text">Two categories available</span>
                  <span className="activity-time">Flowers and Garlands</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-banner">
          <div className="banner-icon">ℹ️</div>
          <div className="banner-content">
            <span className="banner-title">Admin Access Only</span>
            <span className="banner-text">This dashboard is restricted to authorized administrators only.</span>
          </div>
        </div>
      </div>
    </>
  );
}