import "./CategoryCard.css";

export default function CategoryCard({ title, subtitle, imageUrl, onClick }) {
  return (
    <div className="catCard" onClick={onClick} role="button">
      <div className="catImageWrapper">
        <img src={imageUrl} alt={title} className="catImg" />
        <div className="catOverlay"></div>
      </div>
      <div className="catBody">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <div className="catArrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
