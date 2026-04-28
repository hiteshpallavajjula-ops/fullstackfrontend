import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
    background: "#f4f6fb",
  },
  left: {
    flex: "1 1 50%",
    background: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 55%, #0d5c73 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 48px",
    position: "relative",
    overflow: "hidden",
  },
  right: {
    flex: "1 1 50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 40px",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "44px 40px",
    boxShadow: "0 8px 40px rgba(15,23,42,0.10)",
    border: "1px solid #e2e8f0",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    color: "#0f172a",
    background: "#fff",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#475569",
    display: "block",
    marginBottom: "6px",
  },
};

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message,  setMessage]  = useState('');
  const [isError,  setIsError]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [focused,  setFocused]  = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post("http://localhost:8081/api/auth/login", { username, password });
      if (res.data) {
        const userRole      = res.data.role || "student";
        const finalUsername = res.data.username || username;
        const finalEmail    = res.data.email || finalUsername;
        const mfaEnabled    = res.data.mfaEnabled !== false;

        if (mfaEnabled) {
          localStorage.setItem("userEmail", finalEmail);
          localStorage.setItem("username",  finalUsername);
          localStorage.setItem("userRole",  userRole);
          if (res.data.mfaSetupRequired) localStorage.setItem("qrCodeUrl", res.data.qrCodeUrl);
          else localStorage.removeItem("qrCodeUrl");
          setMessage("MFA required. Check your authenticator app.");
          setIsError(false);
          navigate("/mfa");
        } else {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail",  finalEmail);
          localStorage.setItem("username",   finalUsername);
          localStorage.setItem("userRole",   userRole);
          navigate(userRole === "admin" ? "/admin" : "/dashboard");
        }
      } else {
        setMessage("Invalid credentials. Please try again.");
        setIsError(true);
      }
    } catch {
      setMessage("Invalid credentials. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    ...S.input,
    borderColor: focused === name ? "#0f62fe" : "#e2e8f0",
    boxShadow: focused === name ? "0 0 0 3px rgba(15,98,254,0.10)" : "none",
  });

  return (
    <div style={S.page}>

      {/* ── LEFT PANEL ── */}
      <div style={S.left} className="hide-on-small">
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 40%, rgba(15,98,254,0.2) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(8,189,186,0.15) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: "380px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "18px",
            background: "linear-gradient(135deg, #0f62fe, #08bdba)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", margin: "0 auto 28px",
            boxShadow: "0 8px 24px rgba(15,98,254,0.4)",
          }}>🏃</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            Welcome back to FitWell
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
            Track your fitness, monitor your nutrition, and stay on top of your mental wellness — all in one place.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "40px" }}>
            {["🏋️  Log workouts & calories", "📊  View weekly progress charts", "🧘  Mental wellness sessions"].map((t, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "rgba(255,255,255,0.07)", borderRadius: "10px",
                padding: "12px 16px", border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={S.right}>
        <div style={S.card}>
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #0f62fe, #08bdba)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
              }}>🏃</div>
              <span style={{ fontWeight: 800, fontSize: "17px", color: "#0f172a" }}>
                Fit<span style={{ color: "#0f62fe" }}>Well</span>
              </span>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.4px" }}>
              Sign in to your account
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#0f62fe", fontWeight: 600, textDecoration: "none" }}>
                Create one free
              </Link>
            </p>
          </div>

          {/* Alert */}
          {message && (
            <div style={{
              padding: "12px 14px", borderRadius: "10px", marginBottom: "20px",
              background: isError ? "#fff1f2" : "#eff6ff",
              border: `1px solid ${isError ? "#fecdd3" : "#bfdbfe"}`,
              color: isError ? "#be123c" : "#1d4ed8",
              fontSize: "14px", fontWeight: 500,
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span>{isError ? "⚠" : "ℹ"}</span> {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={S.label} htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused("")}
                required
                style={inputStyle("username")}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ ...S.label, marginBottom: 0 }} htmlFor="login-password">Password</label>
              </div>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
                style={inputStyle("password")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px", borderRadius: "10px",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                background: loading ? "#94a3b8" : "linear-gradient(135deg, #0f62fe, #0043ce)",
                color: "#fff", fontSize: "15px", fontWeight: 700,
                fontFamily: "inherit", transition: "all 0.2s",
                boxShadow: loading ? "none" : "0 3px 12px rgba(15,98,254,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
              onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(15,98,254,0.45)"; } }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 3px 12px rgba(15,98,254,0.35)"; }}
            >
              {loading && <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .hide-on-small { display: none !important; } }
      `}</style>
    </div>
  );
};

export default Login;