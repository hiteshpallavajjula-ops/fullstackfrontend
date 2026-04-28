import React, { useState, useEffect } from "react";
import WorkoutLogger      from "./WorkoutLogger";
import WeeklyProgressChart from "./WeeklyProgressChart";
import CalorieCalculator  from "./CalorieCalculator";
import StepsCalculator    from "./StepsCalculator";
import HealthResources    from "./HealthResources";
import MentalWellness     from "./MentalWellness";
import NutritionGuide     from "./NutritionGuide";
import WellnessPrograms   from "./WellnessPrograms";

const NAV_ITEMS = [
  { label:"Progress Chart",    id:"progress",   icon:"📊", color:"#0f62fe", bg:"#eff6ff" },
  { label:"Workout Logger",    id:"workout",    icon:"🏋️", color:"#7c3aed", bg:"#f5f3ff" },
  { label:"Calorie Calculator",id:"calorie",    icon:"🍎", color:"#db7706", bg:"#fffbeb" },
  { label:"Steps Tracker",     id:"steps",      icon:"👟", color:"#059669", bg:"#f0fdf4" },
  { label:"Health Resources",  id:"resources",  icon:"📚", color:"#0891b2", bg:"#ecfeff" },
  { label:"Mental Wellness",   id:"wellness",   icon:"🧘", color:"#be185d", bg:"#fdf2f8" },
  { label:"Nutrition Guide",   id:"nutrition",  icon:"🥗", color:"#15803d", bg:"#f0fdf4" },
  { label:"Wellness Programs", id:"programs",   icon:"💪", color:"#b45309", bg:"#fffbeb" },
];

const font = "'Inter','Plus Jakarta Sans',sans-serif";

const Dashboard = () => {
  const [workoutLogs,      setWorkoutLogs]      = useState([]);
  const [healthScore,      setHealthScore]      = useState(0);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [active,           setActive]           = useState("progress");

  const userEmail = localStorage.getItem("userEmail");
  const username  = userEmail ? userEmail.split("@")[0] : "Student";

  useEffect(() => {
    if (!userEmail) return;
    const workouts = JSON.parse(localStorage.getItem(`workouts_${userEmail}`)) || [];
    const moods    = JSON.parse(localStorage.getItem(`moods_${userEmail}`))    || [];
    setWorkoutLogs(workouts);
    calcScore(workouts, moods);
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    setEnrolledPrograms(JSON.parse(localStorage.getItem(`wellness_${userEmail}`)) || []);
  }, [userEmail]);

  const calcScore = (workouts, moods) => {
    let s = workouts.length * 10 + workouts.reduce((a, w) => a + (w.calories || 0), 0) / 50 + moods.length * 5;
    setHealthScore(Math.round(Math.min(s, 100)));
  };

  const handleAddWorkout = (workout) => {
    const updated = [...workoutLogs, { ...workout, duration: parseInt(workout.duration), calories: parseInt(workout.calories) }];
    setWorkoutLogs(updated);
    localStorage.setItem(`workouts_${userEmail}`, JSON.stringify(updated));
    const moods = JSON.parse(localStorage.getItem(`moods_${userEmail}`)) || [];
    calcScore(updated, moods);
  };

  const healthStatus = healthScore >= 80 ? "Excellent" : healthScore >= 50 ? "Good" : "Needs Attention";
  const statusColor  = healthScore >= 80 ? "#15803d" : healthScore >= 50 ? "#b45309" : "#be123c";
  const statusBg     = healthScore >= 80 ? "#f0fdf4" : healthScore >= 50 ? "#fffbeb" : "#fff1f2";
  const totalCal     = workoutLogs.reduce((s, w) => s + (w.calories || 0), 0);
  const adminNote    = localStorage.getItem(`suggestion_${userEmail}`);
  const activeItem   = NAV_ITEMS.find(n => n.id === active);

  const card = { background:"#fff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"24px", boxShadow:"0 1px 4px rgba(15,23,42,0.05)" };

  return (
    <div style={{ background:"#f4f6fb", minHeight:"100vh", fontFamily:font, paddingTop:"80px" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"28px 24px", display:"flex", flexDirection:"column", gap:"20px" }}>

        {/* ── HEADER ── */}
        <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius:"20px", padding:"32px 36px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"20px", boxShadow:"0 8px 32px rgba(15,23,42,0.18)" }}>
          <div>
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"13px", fontWeight:600, margin:"0 0 4px", letterSpacing:"0.5px", textTransform:"uppercase" }}>Welcome back</p>
            <h1 style={{ fontSize:"28px", fontWeight:800, color:"#fff", margin:"0 0 6px", letterSpacing:"-0.5px" }}>
              {username.charAt(0).toUpperCase() + username.slice(1)} 👋
            </h1>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"14px", margin:0 }}>Your health & wellness dashboard</p>
          </div>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            {[
              { val:`${workoutLogs.length}`, lbl:"Workouts" },
              { val:`${totalCal.toLocaleString()}`, lbl:"Calories Burned" },
              { val:`${enrolledPrograms.length}`, lbl:"Programs" },
            ].map((s,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"12px", padding:"14px 20px", textAlign:"center", minWidth:"90px" }}>
                <div style={{ fontSize:"22px", fontWeight:800, color:"#fff", lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.55)", marginTop:"4px" }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HEALTH SCORE & PROGRESS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"16px" }}>
          {/* Health Score */}
          <div style={{ ...card, display:"flex", flexDirection:"column", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:"13px", fontWeight:600, color:"#64748b", margin:"0 0 4px" }}>Health Score</p>
                <p style={{ fontSize:"36px", fontWeight:900, color:"#0f172a", margin:0, letterSpacing:"-1px" }}>{healthScore}<span style={{ fontSize:"18px", color:"#94a3b8" }}>/100</span></p>
              </div>
              <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px" }}>❤️</div>
            </div>
            <div style={{ height:"8px", background:"#f1f5f9", borderRadius:"99px", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${healthScore}%`, background:"linear-gradient(90deg,#0f62fe,#08bdba)", borderRadius:"99px", transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
            <span style={{ display:"inline-flex", alignItems:"center", padding:"4px 12px", borderRadius:"99px", fontSize:"12px", fontWeight:700, background:statusBg, color:statusColor, alignSelf:"flex-start" }}>
              {healthStatus}
            </span>
          </div>

          {/* Total Calories */}
          <div style={{ ...card, display:"flex", flexDirection:"column", gap:"8px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:"13px", fontWeight:600, color:"#64748b", margin:"0 0 4px" }}>Total Calories Burned</p>
                <p style={{ fontSize:"36px", fontWeight:900, color:"#0f172a", margin:0, letterSpacing:"-1px" }}>{totalCal.toLocaleString()}</p>
              </div>
              <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"#fffbeb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px" }}>🔥</div>
            </div>
            <p style={{ fontSize:"14px", color:"#64748b", margin:0 }}>{workoutLogs.length} workout{workoutLogs.length !== 1 ? "s" : ""} logged</p>
          </div>

          {/* Enrolled Programs */}
          <div style={{ ...card, display:"flex", flexDirection:"column", gap:"8px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:"13px", fontWeight:600, color:"#64748b", margin:"0 0 4px" }}>Enrolled Programs</p>
                <p style={{ fontSize:"36px", fontWeight:900, color:"#0f172a", margin:0, letterSpacing:"-1px" }}>{enrolledPrograms.length}</p>
              </div>
              <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"#f5f3ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px" }}>💪</div>
            </div>
            <p style={{ fontSize:"14px", color:"#64748b", margin:0 }}>Active wellness programs</p>
          </div>
        </div>

        {/* ── ADMIN SUGGESTION ── */}
        {adminNote && (
          <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:"14px", padding:"18px 22px", display:"flex", gap:"14px", alignItems:"flex-start" }}>
            <span style={{ fontSize:"22px", flexShrink:0 }}>📌</span>
            <div>
              <p style={{ fontSize:"13px", fontWeight:700, color:"#92400e", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.4px" }}>Admin Suggestion</p>
              <p style={{ fontSize:"14px", color:"#78350f", margin:0, lineHeight:1.6 }}>{adminNote}</p>
            </div>
          </div>
        )}

        {/* ── ENROLLED PROGRAMS LIST ── */}
        {enrolledPrograms.length > 0 && (
          <div style={card}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
              <div style={{ width:"4px", height:"22px", background:"linear-gradient(180deg,#0f62fe,#08bdba)", borderRadius:"3px" }} />
              <h2 style={{ fontSize:"17px", fontWeight:700, color:"#0f172a", margin:0 }}>My Wellness Programs</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"14px" }}>
              {enrolledPrograms.map((p, i) => (
                <div key={i} style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"18px", transition:"all 0.2s" }}
                  onMouseOver={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(15,23,42,0.08)";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseOut={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
                  <h3 style={{ fontSize:"15px", fontWeight:700, color:"#0f172a", margin:"0 0 6px" }}>{p.name}</h3>
                  <p style={{ fontSize:"13px", color:"#64748b", margin:"0 0 10px", lineHeight:1.6 }}>{p.description}</p>
                  {p.duration && <p style={{ fontSize:"12px", color:"#0f62fe", fontWeight:600, margin:0 }}>⏱ {p.duration}</p>}
                  <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"10px" }}>
                    <span style={{ width:"8px", height:"8px", background:"#22c55e", borderRadius:"50%", display:"inline-block" }} />
                    <span style={{ fontSize:"12px", fontWeight:600, color:"#15803d" }}>Enrolled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── QUICK ACCESS GRID ── */}
        <div style={card}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
            <div style={{ width:"4px", height:"22px", background:"linear-gradient(180deg,#0f62fe,#08bdba)", borderRadius:"3px" }} />
            <h2 style={{ fontSize:"17px", fontWeight:700, color:"#0f172a", margin:0 }}>Quick Access</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:"12px" }}>
            {NAV_ITEMS.map(({ label, id, icon, color, bg }) => (
              <button key={id} onClick={() => setActive(id)} style={{
                padding:"18px 12px", borderRadius:"12px", border:`1.5px solid ${active===id ? color : "#e2e8f0"}`,
                background: active===id ? color : "#fff",
                cursor:"pointer", transition:"all 0.2s", textAlign:"center",
                boxShadow: active===id ? `0 4px 16px ${color}33` : "none",
              }}
              onMouseOver={e=>{ if(active!==id){e.currentTarget.style.background=bg;e.currentTarget.style.borderColor=color;e.currentTarget.style.transform="translateY(-2px)";}}}
              onMouseOut={e=>{ if(active!==id){e.currentTarget.style.background="#fff";e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="translateY(0)";}}}
              >
                <div style={{ fontSize:"26px", marginBottom:"8px" }}>{icon}</div>
                <p style={{ fontSize:"12px", fontWeight:600, color: active===id ? "#fff" : "#475569", margin:0, lineHeight:1.4 }}>{label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── ACTIVE COMPONENT ── */}
        <div style={{ ...card, padding:"28px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"22px", paddingBottom:"16px", borderBottom:"1px solid #f1f5f9" }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"10px", background: activeItem?.bg || "#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px" }}>
              {activeItem?.icon}
            </div>
            <h2 style={{ fontSize:"18px", fontWeight:700, color:"#0f172a", margin:0 }}>{activeItem?.label}</h2>
          </div>
          {active === "progress"   && <WeeklyProgressChart workoutLogs={workoutLogs} />}
          {active === "workout"    && <WorkoutLogger onAddWorkout={handleAddWorkout} />}
          {active === "calorie"    && <CalorieCalculator />}
          {active === "steps"      && <StepsCalculator />}
          {active === "resources"  && <HealthResources />}
          {active === "wellness"   && <MentalWellness />}
          {active === "nutrition"  && <NutritionGuide />}
          {active === "programs"   && <WellnessPrograms />}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;