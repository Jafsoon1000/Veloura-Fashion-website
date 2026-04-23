import { useEffect, useState } from "react";
import "../../styles.css"; // Ensure styles are applied

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: "",
    usageLimit: "",
  });

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/coupons", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch coupons");
      const data = await res.json();
      setCoupons(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          discountValue: Number(formData.discountValue),
          usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create coupon");
      }

      setFormData({
        code: "",
        discountType: "percentage",
        discountValue: "",
        expiryDate: "",
        usageLimit: "",
      });
      fetchCoupons(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/coupons/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete coupon");
      setCoupons(coupons.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading coupons...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h2>Manage Coupons</h2>

      <form className="form card" onSubmit={handleCreateCoupon} style={{ marginBottom: "2rem" }}>
        <h3>Create New Coupon</h3>
        <div className="form-group">
          <label>Coupon Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            required
            placeholder="e.g., SUMMER20"
          />
        </div>
        <div className="form-group">
          <label>Discount Type</label>
          <select name="discountType" value={formData.discountType} onChange={handleInputChange}>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Discount Value</label>
          <input
            type="number"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Usage Limit (Optional)</label>
          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleInputChange}
            placeholder="Leave empty for unlimited"
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Coupon</button>
      </form>

      <div className="table-responsive card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Expiry</th>
              <th>Used</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td><strong>{coupon.code}</strong></td>
                <td>{coupon.discountType}</td>
                <td>
                  {coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                </td>
                <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td>{coupon.timesUsed} {coupon.usageLimit ? `/ ${coupon.usageLimit}` : ""}</td>
                <td>{coupon.isActive && new Date(coupon.expiryDate) >= new Date() ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => handleDeleteCoupon(coupon._id)} className="btn" style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem", backgroundColor: "var(--color-danger)" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>No coupons found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
