import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="card">
      <h2>My Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phoneNumber}</p>
      <p>Phone Verified: {user?.isPhoneVerified ? "Yes" : "No"}</p>
    </section>
  );
}
