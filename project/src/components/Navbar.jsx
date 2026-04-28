import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const role       = localStorage.getItem("userRole");
  const userEmail  = localStorage.getItem("userEmail");
  const username   = userEmail ? userEmail.split("@")[0] : "";
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!userEmail || !isLoggedIn) { setCartCount(0); return; }
    const compute = () => {
      const joined = JSON.parse(localStorage.getItem(`wellness_${userEmail}`)) || [];
      const paid   = JSON.parse(localStorage.getItem(`paid_${userEmail}`))    || [];
      setCartCount(joined.filter(p => !paid.some(pd => pd.name === p.name)).length);
    };
    compute();
    const id = setInterval(compute, 2000);
    return () => clearInterval(id);
  }, [userEmail, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isHome = location.pathname === "/";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
      background: scrolled || !isHome
        ? "rgba(255,255,255,0.97)"
        : "rgba(255,255,255,0.10)",
      backdropFilter: "blur(18px)",
      borderBottom: scrolled || !isHome
        ? "1px solid #e2e8f0"
        : "1px solid rgba(255,255,255,0.18)",
      boxShadow: scrolled || !isHome
        ? "0 1px 12px rgba(15,23,42,0.07)"
        : "none",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: "64px",
      }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #0f62fe 0%, #08bdba 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(15,98,254,0.35)",
            fontSize: "18px",
          }}>
            <span>🏃</span>
          </div>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800, fontSize: "20px",
            color: scrolled || !isHome ? "#0f172a" : "#ffffff",
            letterSpacing: "-0.5px",
            transition: "color 0.3s",
          }}>
            Fit<span style={{ color: "#0f62fe" }}>Well</span>
          </span>
        </Link>

        {/* ── NAV ACTIONS ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "8px 20px", borderRadius: "8px", border: "1.5px solid",
                  borderColor: scrolled || !isHome ? "#e2e8f0" : "rgba(255,255,255,0.45)",
                  background: "transparent",
                  color: scrolled || !isHome ? "#0f172a" : "#ffffff",
                  fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(15,98,254,0.07)"; e.currentTarget.style.borderColor = "#0f62fe"; e.currentTarget.style.color = "#0f62fe"; }}
                onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = scrolled || !isHome ? "#e2e8f0" : "rgba(255,255,255,0.45)"; e.currentTarget.style.color = scrolled || !isHome ? "#0f172a" : "#ffffff"; }}
                >
                  Sign In
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "8px 20px", borderRadius: "8px", border: "none",
                  background: "linear-gradient(135deg, #0f62fe, #0043ce)",
                  color: "#fff", fontSize: "14px", fontWeight: 600,
                  fontFamily: "inherit", cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(15,98,254,0.3)",
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(15,98,254,0.4)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,98,254,0.3)"; }}
                >
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <>
              {/* User chip */}
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "99px",
                background: "rgba(15,98,254,0.07)", border: "1px solid rgba(15,98,254,0.15)",
              }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #0f62fe, #08bdba)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0,
                }}>
                  {username.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                  {username}
                </span>
                <span style={{
                  fontSize: "11px", fontWeight: 600,
                  background: role === "admin" ? "#fef3c7" : "#dbeafe",
                  color: role === "admin" ? "#92400e" : "#1d4ed8",
                  padding: "2px 8px", borderRadius: "99px",
                }}>
                  {role === "admin" ? "Admin" : "Student"}
                </span>
              </div>

              {/* Admin panel button */}
              {role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  style={{
                    padding: "8px 16px", borderRadius: "8px",
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                    border: "none", cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.2s", boxShadow: "0 2px 8px rgba(124,58,237,0.3)",
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  ⚙ Admin Panel
                </button>
              )}

              {/* Cart icon — student only */}
              {role === "student" && (
                <button
                  onClick={() => navigate("/payment")}
                  title="View Cart"
                  style={{
                    position: "relative", width: "40px", height: "40px",
                    borderRadius: "10px", border: "1.5px solid #e2e8f0",
                    background: "#f8fafc", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span style={{ fontSize: "18px" }}>🛒</span>
                  {cartCount > 0 && (
                    <span style={{
                      position: "absolute", top: "-5px", right: "-5px",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      color: "#fff", borderRadius: "50%",
                      width: "18px", height: "18px", fontSize: "10px",
                      fontWeight: 700, display: "flex", alignItems: "center",
                      justifyContent: "center", border: "2px solid #fff",
                      boxShadow: "0 1px 4px rgba(239,68,68,0.5)",
                      animation: "badgePulse 2s infinite",
                    }}>
                      {cartCount}
                    </span>
                  )}
                </button>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px", borderRadius: "8px",
                  background: "#fff1f2", color: "#be123c",
                  border: "1.5px solid #fecdd3",
                  fontSize: "13px", fontWeight: 600,
                  fontFamily: "inherit", cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = "#ffe4e6"; e.currentTarget.style.borderColor = "#fda4af"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#fff1f2"; e.currentTarget.style.borderColor = "#fecdd3"; }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;