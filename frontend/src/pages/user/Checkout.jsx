import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../api/axiosInstance";
import "./Checkout.css";

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export default function Checkout() {
  const nav = useNavigate();
  const cart = getCart();
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    mobile: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: ""
  });

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const place = async (e) => {
    e.preventDefault();
    setErr("");

    if (cart.length === 0) return setErr("Cart is empty");

    try {
      await api.post("/api/orders", { items: cart, address: form });
      localStorage.removeItem("cart");
      nav("/my-orders");
    } catch (e) {
      setErr(e?.response?.data?.message || "Order failed. Please try again.");
    }
  };

  return (
    <>
      <div className="checkoutPage">
        <div className="checkout-header">
          <h2>📝 Checkout</h2>
          <p>Complete your order details below</p>
        </div>

        <div className="checkout-container">
          <div className="note">Payment Method: <b>Cash on Delivery (COD)</b></div>

          <form className="checkForm" onSubmit={place}>
            {err && <div className="errBox">{err}</div>}

            <Input label="Mobile Number" value={form.mobile} onChange={(e) => onChange("mobile", e.target.value)} placeholder="Enter your mobile number" />
            <Input label="Street Address" value={form.street} onChange={(e) => onChange("street", e.target.value)} placeholder="House No, Street Name" />
            
            <div className="form-row">
              <Input label="City" value={form.city} onChange={(e) => onChange("city", e.target.value)} placeholder="City" />
              <Input label="State" value={form.state} onChange={(e) => onChange("state", e.target.value)} placeholder="State" />
            </div>
            
            <Input label="Pincode" value={form.pincode} onChange={(e) => onChange("pincode", e.target.value)} placeholder="Pincode" />

            <div className="taWrap">
              <label className="iLabel">Full Address</label>
              <textarea
                className="ta"
                rows="3"
                value={form.fullAddress}
                onChange={(e) => onChange("fullAddress", e.target.value)}
                placeholder="Complete delivery address..."
              />
            </div>

            <Button type="submit">Place Order</Button>
          </form>
        </div>
      </div>
    </>
  );
}
