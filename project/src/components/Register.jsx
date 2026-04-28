import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const EMAIL_REGEX = /^[\w.+\-]+@[\w\-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username:"", email:"", password:"", confirmPassword:"" });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const showMsg = (txt, err = false) => { setMessage(txt); setIsError(err); };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(form.email)) { showMsg("Please enter a valid email address (e.g. user@gmail.com).", true); return; }
    if (form.password !== form.confirmPassword) { showMsg("Passwords don't match!", true); return; }
    const pwdRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,}$/;
    if (!pwdRegex.test(form.password)) { showMsg("Password must be ≥ 7 chars, 1 uppercase & 1 symbol.", true); return; }
    setLoading(true); showMsg('');
    try {
      await axios.post('http://localhost:8081/api/auth/register', { username: form.username, email: form.email, password: form.password });
      showMsg('Account created successfully! Redirecting to login…', false);
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      const msg = err.response?.data || 'Registration failed!';
      showMsg(typeof msg === 'string' ? msg : 'Registration failed!', true);
    } finally { setLoading(false); }
  };

  const font  = "'Inter','Plus Jakarta Sans',sans-serif";
  const base  = { width:"100%", padding:"12px 16px", borderRadius:"10px", fontSize:"15px", fontFamily:font, color:"#0f172a", background:"#fff", outline:"none", transition:"all 0.2s", boxSizing:"border-box" };
  const inp   = (name) => ({ ...base, border:`1.5px solid ${focused===name?"#0f62fe":"#e2e8f0"}`, boxShadow:focused===name?"0 0 0 3px rgba(15,98,254,0.10)":"none" });
  const validInp = (ok,bad,name) => ({ ...base,
    border:`1.5px solid ${bad?"#f43f5e":ok?"#22c55e":focused===name?"#0f62fe":"#e2e8f0"}`,
    boxShadow: bad?"0 0 0 3px rgba(244,63,94,0.10)":ok?"0 0 0 3px rgba(34,197,94,0.10)":focused===name?"0 0 0 3px rgba(15,98,254,0.10)":"none",
  });

  const emailOk  = form.email && EMAIL_REGEX.test(form.email);
  const emailBad = form.email && !EMAIL_REGEX.test(form.email);
  const pwdMatch = form.confirmPassword && form.password === form.confirmPassword;
  const pwdBad   = form.confirmPassword && form.password !== form.confirmPassword;

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:font, background:"#f4f6fb" }}>

      {/* LEFT PANEL */}
      <div className="hide-on-small" style={{
        flex:"1 1 50%", background:"linear-gradient(145deg,#0f172a 0%,#1e3a5f 55%,#0d5c73 100%)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"60px 48px", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 25% 35%,rgba(15,98,254,0.18) 0%,transparent 55%),radial-gradient(circle at 75% 70%,rgba(8,189,186,0.13) 0%,transparent 50%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", textAlign:"center", maxWidth:"360px" }}>
          <div style={{ width:"64px", height:"64px", borderRadius:"18px", background:"linear-gradient(135deg,#0f62fe,#08bdba)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"28px", margin:"0 auto 28px", boxShadow:"0 8px 24px rgba(15,98,254,0.4)" }}>🌟</div>
          <h2 style={{ fontSize:"2rem", fontWeight:800, color:"#fff", margin:"0 0 14px", letterSpacing:"-0.5px" }}>Start your wellness journey</h2>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"15px", lineHeight:1.7, margin:"0 0 36px" }}>
            Join thousands of users who have taken control of their health with FitWell.
          </p>
          {[["✅","Free forever — no credit card needed"],["🔒","Your data is encrypted & private"],["📱","Works on any device, anywhere"]].map(([icon,text],i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", background:"rgba(255,255,255,0.07)", borderRadius:"10px", padding:"12px 16px", border:"1px solid rgba(255,255,255,0.1)", marginBottom:"10px" }}>
              <span style={{ fontSize:"18px" }}>{icon}</span>
              <span style={{ color:"rgba(255,255,255,0.85)", fontSize:"14px" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex:"1 1 50%", display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 40px" }}>
        <div style={{ width:"100%", maxWidth:"460px", background:"#fff", borderRadius:"20px", padding:"44px 40px", boxShadow:"0 8px 40px rgba(15,23,42,0.10)", border:"1px solid #e2e8f0" }}>

          <div style={{ marginBottom:"28px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"linear-gradient(135deg,#0f62fe,#08bdba)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px" }}>🏃</div>
              <span style={{ fontWeight:800, fontSize:"17px", color:"#0f172a" }}>Fit<span style={{ color:"#0f62fe" }}>Well</span></span>
            </div>
            <h1 style={{ fontSize:"24px", fontWeight:800, color:"#0f172a", margin:"0 0 6px", letterSpacing:"-0.4px" }}>Create your account</h1>
            <p style={{ color:"#64748b", fontSize:"14px", margin:0 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color:"#0f62fe", fontWeight:600, textDecoration:"none" }}>Sign in here</Link>
            </p>
          </div>

          {message && (
            <div style={{ padding:"12px 14px", borderRadius:"10px", marginBottom:"20px", background:isError?"#fff1f2":"#f0fdf4", border:`1px solid ${isError?"#fecdd3":"#bbf7d0"}`, color:isError?"#be123c":"#15803d", fontSize:"14px", fontWeight:500, display:"flex", alignItems:"center", gap:"8px" }}>
              {isError?"⚠":"✓"} {message}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display:"flex", flexDirection:"column", gap:"15px" }}>
            <div>
              <label style={{ fontSize:"13px", fontWeight:600, color:"#475569", display:"block", marginBottom:"6px" }} htmlFor="reg-user">Username</label>
              <input id="reg-user" type="text" placeholder="Choose a username" value={form.username} onChange={update("username")} required onFocus={()=>setFocused("username")} onBlur={()=>setFocused("")} style={inp("username")} />
            </div>

            <div>
              <label style={{ fontSize:"13px", fontWeight:600, color:"#475569", display:"block", marginBottom:"6px" }} htmlFor="reg-email">Email Address</label>
              <input id="reg-email" type="email" placeholder="e.g. user@gmail.com" value={form.email} onChange={(e)=>{update("email")(e);setMessage("");}} required onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")} style={validInp(emailOk,emailBad,"email")} />
              {emailBad && <p style={{ color:"#f43f5e", fontSize:"12px", marginTop:"5px" }}>⚠ Enter a valid email like user@gmail.com</p>}
              {emailOk  && <p style={{ color:"#22c55e", fontSize:"12px", marginTop:"5px" }}>✓ Valid email address</p>}
            </div>

            <div>
              <label style={{ fontSize:"13px", fontWeight:600, color:"#475569", display:"block", marginBottom:"6px" }} htmlFor="reg-pwd">Password</label>
              <input id="reg-pwd" type="password" placeholder="Min 7 chars, 1 uppercase, 1 symbol" value={form.password} onChange={update("password")} required onFocus={()=>setFocused("password")} onBlur={()=>setFocused("")} style={inp("password")} />
            </div>

            <div>
              <label style={{ fontSize:"13px", fontWeight:600, color:"#475569", display:"block", marginBottom:"6px" }} htmlFor="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={update("confirmPassword")} required onFocus={()=>setFocused("confirm")} onBlur={()=>setFocused("")} style={validInp(pwdMatch,pwdBad,"confirm")} />
              {pwdBad   && <p style={{ color:"#f43f5e", fontSize:"12px", marginTop:"5px" }}>⚠ Passwords do not match</p>}
              {pwdMatch && <p style={{ color:"#22c55e", fontSize:"12px", marginTop:"5px" }}>✓ Passwords match</p>}
            </div>

            <button type="submit" disabled={loading} style={{ width:"100%", padding:"13px", borderRadius:"10px", border:"none", cursor:loading?"not-allowed":"pointer", background:loading?"#94a3b8":"linear-gradient(135deg,#0f62fe,#0043ce)", color:"#fff", fontSize:"15px", fontWeight:700, fontFamily:font, transition:"all 0.2s", marginTop:"4px", boxShadow:loading?"none":"0 3px 12px rgba(15,98,254,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}
              onMouseOver={e=>{ if(!loading){e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(15,98,254,0.45)";}}}
              onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=loading?"none":"0 3px 12px rgba(15,98,254,0.35)";}}>
              {loading && <span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />}
              {loading ? "Creating Account…" : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @media(max-width:768px){.hide-on-small{display:none!important}}`}</style>
    </div>
  );
};

export default Register;