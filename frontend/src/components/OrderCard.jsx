import "./OrderCard.css";

export default function OrderCard({ order, isAdmin, onStatusChange }) {
  const total = order.items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="oCard">
      <div className="oTop">
        <div>
          <div className="oId">Order: {order._id}</div>
          <div className="oMeta">Total: ₹ {total} • Payment: COD</div>
        </div>

        <div className="oStatus">
          {isAdmin ? (
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order._id, e.target.value)}
            >
              {["Pending", "Packed", "Shipped", "Delivered", "Cancelled"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          ) : (
            <span className="badge">{order.status}</span>
          )}
        </div>
      </div>

      <div className="oItems">
        {order.items.map((it) => (
          <div key={it.productId} className="oItem">
            <img src={it.imageUrl} alt={it.title} />
            <div>
              <div className="t">{it.title}</div>
              <div className="m">₹ {it.price} × {it.qty}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="oAddr">
        <b>Address:</b> {order.address.fullAddress}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode} • Mob: {order.address.mobile}
      </div>

      {order.userId?.email && (
        <div className="oUser">
          <b>User:</b> {order.userId.name} ({order.userId.email})
        </div>
      )}
    </div>
  );
}