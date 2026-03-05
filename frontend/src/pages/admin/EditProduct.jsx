import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosInstance";
import "./EditProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageMethod, setImageMethod] = useState("url");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    api.get("/api/products")
      .then((r) => {
        const p = r.data.find((x) => x._id === id);
        if (!p) return setErr("Product not found");
        setForm({ ...p, price: String(p.price), stock: String(p.stock) });
        setPreview(p.imageUrl);
      })
      .catch(() => setErr("Failed to load"));
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setForm((p) => ({ ...p, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    set("imageUrl", url);
    setPreview(url);
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await api.put(`/api/products/${id}`, {
        title: form.title,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        imageUrl: form.imageUrl
      });
      nav("/admin/products");
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!form) {
    return (
      <>
        <Navbar />
        <div className="add-product-page">
          <div className="page-header">
            <Link to="/admin/products" className="back-link">
              ← Back to Products
            </Link>
            <h1 className="page-title">Edit Product</h1>
            {err ? <p className="errTxt">{err}</p> : <p>Loading...</p>}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="add-product-page">
        <div className="page-header">
          <Link to="/admin/products" className="back-link">
            ← Back to Products
          </Link>
          <h1 className="page-title">Edit Product</h1>
          <p className="page-subtitle">Update the product details below</p>
        </div>

        <div className="form-container">
          <form className="product-form" onSubmit={submit}>
            {err && <div className="form-error">{err}</div>}
            
            <div className="form-group">
              <label className="form-label">Product Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter product name"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  value={form.stock}
                  onChange={(e) => set("stock", e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <div className="category-options">
                <label className={`cat-option ${form.category === "flower" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="category"
                    value="flower"
                    checked={form.category === "flower"}
                    onChange={(e) => set("category", e.target.value)}
                  />
                  <span className="cat-icon">🌸</span>
                  <span className="cat-name">Flower</span>
                </label>
                <label className={`cat-option ${form.category === "garland" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="category"
                    value="garland"
                    checked={form.category === "garland"}
                    onChange={(e) => set("category", e.target.value)}
                  />
                  <span className="cat-icon">🎀</span>
                  <span className="cat-name">Garland</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Image</label>
              <div className="image-upload-options">
                <button
                  type="button"
                  className={`upload-option ${imageMethod === "url" ? "active" : ""}`}
                  onClick={() => setImageMethod("url")}
                >
                  📎 Image URL
                </button>
                <button
                  type="button"
                  className={`upload-option ${imageMethod === "file" ? "active" : ""}`}
                  onClick={() => setImageMethod("file")}
                >
                  📁 Upload File
                </button>
              </div>

              {imageMethod === "url" ? (
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={handleUrlChange}
                  required={imageMethod === "url"}
                />
              ) : (
                <div className="file-upload-area">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                    id="file-upload-edit"
                  />
                  <label htmlFor="file-upload-edit" className="file-upload-label">
                    <span className="upload-icon">📷</span>
                    <span>Click to upload image</span>
                    <span className="upload-hint">PNG, JPG, GIF up to 5MB</span>
                  </label>
                </div>
              )}

              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => nav("/admin/products")}>
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}