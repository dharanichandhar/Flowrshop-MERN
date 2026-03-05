import { useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard";
import "./Home.css";

export default function Home() {
  const nav = useNavigate();

  return (
    <>
      <div className="home">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">✨ Fresh Flowers Delivery</span>
            <h1 className="hero-title">
              Bring Beauty to <span className="highlight">Your Doorstep</span>
            </h1>
            <p className="hero-subtitle">
              Discover our stunning collection of fresh flowers and handcrafted garlands for every occasion
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Flower Varieties</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-circle"></div>
            <img 
              src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=600&q=80" 
              alt="Beautiful Flowers" 
              className="hero-img"
            />
          </div>
        </section>

        <section className="categories">
          <h2 className="title">Shop by Category</h2>
          <div className="category-grid">
            <CategoryCard
              title="Fresh Flowers"
              subtitle="Beautiful blooms for every occasion"
              imageUrl="https://img.freepik.com/premium-photo/hyper-realistic-hyper-detailed-rain-drops-falling-petal-single-pink-light-tones-soft-delicate-3_1032257-534.jpg"
              onClick={() => nav("/flowers")}
            />
            <CategoryCard
              title="Flower Garlands"
              subtitle="Handcrafted for functions & events"
              imageUrl="https://vizagpellipoolajada.com/wp-content/uploads/2019/12/fresh-flower-garlands.jpeg"
              onClick={() => nav("/garlands")}
            />
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Delivery</h3>
            <p>On orders above ₹500</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💐</div>
            <h3>Fresh Guarantee</h3>
            <p>Straight from the garden</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>Same Day Delivery</h3>
            <p>Order before 2 PM</p>
          </div>
        </section>
      </div>
    </>
  );
}
