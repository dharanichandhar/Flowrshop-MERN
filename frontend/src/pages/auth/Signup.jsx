import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (password !== cpass) return setErr("Passwords do not match");
    setLoading(true);
    try {
      await signup({ name, email, password });
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Signup failed");
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
            <h2>Create Account</h2>
            <p>Join us and start ordering beautiful flowers</p>
          </div>
          
          {err && <div className="err">{err}</div>}
          
          <div className="formGroup">
            <label className="formLabel">Full Name</label>
            <input
              type="text"
              className="formInput"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="formGroup">
            <label className="formLabel">Confirm Password</label>
            <input
              type="password"
              className="formInput"
              placeholder="Confirm your password"
              value={cpass}
              onChange={(e) => setCpass(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submitBtn" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
          
          <p className="switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
        
        <Link to="/" className="backHome">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}