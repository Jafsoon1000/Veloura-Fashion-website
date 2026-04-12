export default function Checkout() {
  return (
    <section className="card">
      <h2>Checkout</h2>
      <form className="form">
        <input placeholder="Full Name" />
        <input placeholder="Address" />
        <input placeholder="Card Number" />
        <button className="btn-primary" type="submit">
          Place Order
        </button>
      </form>
    </section>
  );
}
