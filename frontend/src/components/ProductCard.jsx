import "./ProductCard.css";

export default function ProductCard({ p, onAdd }) {
  return (
    <div className="pCard">
      <div className="pImageWrapper">
        <img className="pImg" src={p.imageUrl} alt={p.title} />
        <div className="pBadge">Fresh</div>
      </div>
      <div className="pBody">
        <h4 className="pTitle">{p.title}</h4>
        <p className="pDesc">{p.description || "Fresh and beautiful flowers"}</p>
        <div className="pFooter">
          <p className="price">₹{p.price}</p>
          <button className="btn" onClick={() => onAdd(p)}>
            <span>Add</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
