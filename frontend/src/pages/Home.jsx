import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Spring / Summer 2026</p>
        <h1>Bold Fashion For Everyday Icons</h1>
        <p>
          Discover curated premium fashion pieces, runway-inspired outfits, and essentials designed
          for your lifestyle.
        </p>
        <div className="row">
          <Link to="/shop" className="btn-primary">
            Shop Collection
          </Link>
          <Link to="/lookbook" className="btn-outline">
            View Lookbook
          </Link>
        </div>
      </div>
      <div className="hero-card">
        <h3>Featured Drop</h3>
        <p>Urban Linen Capsule with free global shipping this week.</p>
      </div>
    </section>
  );
}
