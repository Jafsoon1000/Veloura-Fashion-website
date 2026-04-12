import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <section className="card">
      <h2>Your Cart</h2>
      <p>2 items • Total: $338</p>
      <Link to="/checkout" className="btn-primary">
        Proceed to Checkout
      </Link>
    </section>
  );
}
