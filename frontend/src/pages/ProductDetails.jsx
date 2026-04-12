import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-details-container">
      <div className="card product-detail-card">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>
          <p className="price">Price: ${product.price}</p>
          <button className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </section>
  );
}
