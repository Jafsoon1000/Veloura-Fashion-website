import { createContext, useContext, useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:5000/api";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {
        setToken("");
        localStorage.removeItem("token");
      });
  }, [token]);

  const register = async (formData) => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setLoading(false);
    return data;
  };

  const login = async (email, password) => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (data.token) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
    }
    return data;
  };

  const sendOtp = async (phoneNumber) => {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber })
    });
    return res.json();
  };

  const verifyPhone = async (phoneNumber, code) => {
    const res = await fetch(`${API_BASE}/auth/verify-phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, code })
    });
    const data = await res.json();
    if (data.user) setUser(data.user);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({ user, token, loading, register, login, sendOtp, verifyPhone, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
