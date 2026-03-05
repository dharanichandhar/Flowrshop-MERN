import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Home from "../pages/user/Home.jsx";
import Flowers from "../pages/user/Flowers.jsx";
import Cart from "../pages/user/Cart.jsx";
import Checkout from "../pages/user/Checkout.jsx";
import MyOrders from "../pages/user/MyOrders.jsx";
import NotFound from "../pages/NotFound.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageProducts from "../pages/admin/ManageProducts.jsx";
import AddProduct from "../pages/admin/AddProduct.jsx";
import EditProduct from "../pages/admin/EditProduct.jsx";
import AdminOrders from "../pages/admin/AdminOrders.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import UserLayout from "./UserLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/flowers" element={<ProtectedRoute><Flowers type="flowers" /></ProtectedRoute>} />
        <Route path="/garlands" element={<ProtectedRoute><Flowers type="garlands" /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      </Route>

      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
      <Route path="/admin/products/add" element={<AdminRoute><AddProduct /></AdminRoute>} />
      <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
