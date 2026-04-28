import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "🏋️",
    title: "Fitness Tracking",
    desc: "Log workouts, track calories burned, and monitor your physical progress with detailed analytics.",
    color: "#0f62fe",
    bg: "#eff6ff",
  },
  {
    icon: "🧘",
    title: "Mental Wellness",
    desc: "Track mood, practice mindfulness, and maintain emotional balance with guided sessions.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: "🥗",
    title: "Nutrition Guide",
    desc: "Get personalised nutrition advice and healthy eating tips tailored to your health goals.",
    color: "#059669",
    bg: "#f0fdf4",
  },
  {
    icon: "📊",
    title: "Progress Insights",
    desc: "Visualise your weekly trends with interactive charts and celebrate every milestone.",
    color: "#db7706",
    bg: "#fffbeb",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "98%",  label: "Satisfaction Rate" },
  { value: "50+",  label: "Wellness Programs" },
  { value: "4.9★", label: "App Rating" },
];

const HomePage = () => {
  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh", fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #0e4d6e 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 25% 30%, rgba(15,98,254,0.18) 0%, transparent 55%),
                            radial-gradient(circle at 75% 70%, rgba(8,189,186,0.14) 0%, transparent 50%)`,
          pointerEvents: "none",
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(15,98,254,0.15)", border: "1px solid rgba(15,98,254,0.3)",
          borderRadius: "99px", padding: "6px 18px",
          marginBottom: "28px", animation: "fadeInUp 0.5s ease forwards",
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
          <span style={{ color: "#a5f3fc", fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px" }}>
            Your Holistic Health Platform
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.1,
          margin: "0 0 20px",
          maxWidth: "820px",
          letterSpacing: "-1.5px",
          animation: "fadeInUp 0.55s 0.08s ease both",
        }}>
          Transform Your{" "}
          <span style={{
            background: "linear-gradient(90deg, #60a5fa, #38bdf8, #34d399)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Health Journey
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          maxWidth: "600px",
          lineHeight: 1.75,
          margin: "0 0 44px",
          animation: "fadeInUp 0.55s 0.15s ease both",
        }}>
          Your comprehensive companion for tracking fitness, nutrition, and mental wellness.
          Get personalised insights and take control of your health today.
        </p>

        {/* CTA buttons */}
        <div style={{
          display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center",
          animation: "fadeInUp 0.55s 0.22s ease both",
        }}>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "14px 32px", borderRadius: "12px", border: "none",
              background: "linear-gradient(135deg, #0f62fe, #0ea5e9)",
              color: "#fff", fontSize: "16px", fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", transition: "all 0.22s",
              boxShadow: "0 4px 20px rgba(15,98,254,0.45)",
              letterSpacing: "-0.2px",
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(15,98,254,0.55)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,98,254,0.45)"; }}
            >
              Start Your Journey →
            </button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "14px 32px", borderRadius: "12px",
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              color: "#fff", fontSize: "16px", fontWeight: 600,
              fontFamily: "inherit", cursor: "pointer", transition: "all 0.22s",
              backdropFilter: "blur(8px)",
            }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            >
              Sign In
            </button>
          </Link>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px", marginTop: "64px",
          backdropFilter: "blur(12px)",
          animation: "fadeInUp 0.55s 0.3s ease both",
          overflow: "hidden",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "20px 36px", textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "4px", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{
              display: "inline-block", padding: "4px 16px",
              background: "#eff6ff", color: "#1d4ed8",
              borderRadius: "99px", fontSize: "13px", fontWeight: 600,
              marginBottom: "14px",
            }}>
              Everything You Need
            </span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800,
              color: "#0f172a", margin: "0", letterSpacing: "-0.8px",
            }}>
              All-in-one health platform
            </h2>
            <p style={{ color: "#64748b", marginTop: "12px", fontSize: "16px" }}>
              Comprehensive tools designed to support every aspect of your wellbeing.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px",
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #e2e8f0",
                borderRadius: "16px", padding: "28px 24px",
                boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
                transition: "all 0.22s", cursor: "default",
              }}
              onMouseOver={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(15,23,42,0.10)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(15,23,42,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: f.bg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "24px", marginBottom: "18px",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.7", margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "80px 24px", background: "#f4f6fb" }}>
        <div style={{
          maxWidth: "780px", margin: "0 auto", textAlign: "center",
          background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
          borderRadius: "24px", padding: "60px 40px",
          boxShadow: "0 20px 60px rgba(15,23,42,0.2)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(15,98,254,0.2) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            Ready to transform your health?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "16px", margin: "0 0 32px", lineHeight: 1.7 }}>
            Join thousands of users who are already on their wellness journey with FitWell.
          </p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "14px 36px", borderRadius: "12px", border: "none",
              background: "linear-gradient(135deg, #0f62fe, #0ea5e9)",
              color: "#fff", fontSize: "16px", fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", transition: "all 0.22s",
              boxShadow: "0 4px 18px rgba(15,98,254,0.4)",
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(15,98,254,0.5)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(15,98,254,0.4)"; }}
            >
              Create Free Account
            </button>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;