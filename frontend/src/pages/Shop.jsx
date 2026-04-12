import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading shop...</p>;

  return (
    <section>
      <h2>Shop All</h2>
      <div className="grid">
        {products.map((product) => (
          <article key={product._id} className="card product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <Link to={`/product/${product._id}`} className="btn-outline">
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
