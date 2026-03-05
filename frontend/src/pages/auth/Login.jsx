import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const u = await login({ email, password });
      if (u.role === "admin") nav("/admin");
      else nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="auth-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="auth-container">
        <div className="auth-brand">
          <span className="brand-icon">🌸</span>
          <h1>FlowerShop</h1>
        </div>
        
        <form className="authCard" onSubmit={submit}>
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>
          
          {err && <div className="err">{err}</div>}
          
          <div className="formGroup">
            <label className="formLabel">Email</label>
            <input
              type="email"
              className="formInput"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="formGroup">
            <label className="formLabel">Password</label>
            <input
              type="password"
              className="formInput"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submitBtn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          
          <p className="switch">
            New user? <Link to="/signup">Create Account</Link>
          </p>
        </form>
        
        <Link to="/" className="backHome">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}