export default function Contact() {
  return (
    <section>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2>Contact Us</h2>
        <p style={{ color: "var(--text-muted)" }}>We'd love to hear from you. Reach out to us for any inquiries!</p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Get in Touch</h3>
          <form style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1.5rem" }} onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-primary)" }} required />
            <input type="email" placeholder="Your Email" style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-primary)" }} required />
            <input type="text" placeholder="Subject" style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-primary)" }} />
            <textarea placeholder="Your Message" rows="5" style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-primary)", resize: "vertical" }} required></textarea>
            <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>Send Message</button>
          </form>
        </div>

        <div className="card">
          <h3>Contact Information</h3>
          <div style={{ marginTop: "1.5rem", lineHeight: "2" }}>
            <p><strong>Email:</strong> support@jafsoon.com</p>
            <p><strong>Phone:</strong> +1 555 007 2026</p>
            <p><strong>Address:</strong> 501 Fashion Avenue, Suite 10A<br />New York, NY 10018</p>
          </div>

          <h3 style={{ marginTop: "2.5rem" }}>Business Hours</h3>
          <div style={{ marginTop: "1.5rem", lineHeight: "2" }}>
            <p><strong>Monday - Friday:</strong> 9:00 AM - 8:00 PM</p>
            <p><strong>Saturday:</strong> 10:00 AM - 6:00 PM</p>
            <p><strong>Sunday:</strong> Closed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
