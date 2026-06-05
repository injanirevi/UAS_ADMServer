"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, username, password });
    if (!res || res.error) {
      setError("Username atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at 20% 30%, rgba(194,155,98,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(139,126,116,0.12) 0%, transparent 55%), #FAF9F6",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative fashion circles */}
      <div style={{
        position: "absolute", top: "5%", left: "5%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(194,155,98,0.08) 0%, transparent 70%)",
        borderRadius: "50%", animation: "float1 10s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "5%",
        width: "420px", height: "420px",
        background: "radial-gradient(circle, rgba(139,126,116,0.07) 0%, transparent 70%)",
        borderRadius: "50%", animation: "float2 12s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      {/* Subtle linen texture pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(194,155,98,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(194,155,98,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.04)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(20px) scale(0.96)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes shimmerBar { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .login-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #D4A96A, #A07A42) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 16px 40px rgba(194,155,98,0.55) !important;
        }
        .login-btn:active:not(:disabled) { transform: translateY(0) !important; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }
      `}</style>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "440px",
        margin: "20px",
        animation: "fadeUp 0.7s ease forwards",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(194,155,98,0.25)",
          borderRadius: "28px",
          padding: "48px 44px",
          boxShadow: "0 24px 60px rgba(42,31,20,0.10), 0 0 0 1px rgba(194,155,98,0.08) inset",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Gold shimmer top bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: "linear-gradient(90deg, transparent, #C29B62, #E8C98A, #C29B62, transparent)",
            backgroundSize: "200% auto",
            animation: "shimmerBar 3s linear infinite",
          }} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            {/* Logo icon */}
            <div style={{
              width: "76px", height: "76px",
              background: "linear-gradient(135deg, rgba(194,155,98,0.15), rgba(160,122,66,0.08))",
              border: "1px solid rgba(194,155,98,0.35)",
              borderRadius: "22px",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 22px",
              boxShadow: "0 8px 24px rgba(194,155,98,0.2)",
            }}>
              {/* Fashion scissors/hanger icon */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C29B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
              </svg>
            </div>

            <h1 style={{
              fontSize: "26px", fontWeight: 800, margin: "0 0 6px",
              color: "#2A1F14",
              letterSpacing: "-0.5px",
            }}>
              Injani&apos;s{" "}
              <span style={{ color: "#C29B62" }}>Fashion</span>
            </h1>
            <p style={{ color: "#8B7E74", fontSize: "13px", margin: 0, letterSpacing: "0.5px" }}>
              Admin Panel · Kelola Tren &amp; Koleksi
            </p>
          </div>

          {/* Error box */}
          {error && (
            <div style={{
              background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.2)",
              borderRadius: "12px", padding: "12px 16px",
              color: "#A93226", fontSize: "13px", textAlign: "center",
              marginBottom: "24px",
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 700,
                color: "#8B7E74", textTransform: "uppercase", letterSpacing: "1.2px",
                marginBottom: "8px",
              }}>Username</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusUser ? "#C29B62" : "#A89882", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusUser(true)}
                  onBlur={() => setFocusUser(false)}
                  placeholder="Masukkan username"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: focusUser ? "#fff" : "#FAF7F2",
                    border: `1.5px solid ${focusUser ? "#C29B62" : "rgba(194,155,98,0.25)"}`,
                    borderRadius: "12px",
                    padding: "14px 16px 14px 44px",
                    color: "#2A1F14", fontSize: "14px",
                    outline: "none",
                    boxShadow: focusUser ? "0 0 0 3px rgba(194,155,98,0.12)" : "none",
                    transition: "all 0.2s",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 700,
                color: "#8B7E74", textTransform: "uppercase", letterSpacing: "1.2px",
                marginBottom: "8px",
              }}>Password</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusPass ? "#C29B62" : "#A89882", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  placeholder="Masukkan password"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: focusPass ? "#fff" : "#FAF7F2",
                    border: `1.5px solid ${focusPass ? "#C29B62" : "rgba(194,155,98,0.25)"}`,
                    borderRadius: "12px",
                    padding: "14px 48px 14px 44px",
                    color: "#2A1F14", fontSize: "14px",
                    outline: "none",
                    boxShadow: focusPass ? "0 0 0 3px rgba(194,155,98,0.12)" : "none",
                    transition: "all 0.2s",
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#A89882", padding: "4px",
                  display: "flex", alignItems: "center",
                }}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="login-btn" style={{
              width: "100%", padding: "15px",
              background: "linear-gradient(135deg, #C29B62 0%, #A07A42 100%)",
              border: "none", borderRadius: "12px",
              color: "#fff", fontSize: "15px", fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              boxShadow: "0 8px 24px rgba(194,155,98,0.45)",
              transition: "all 0.2s ease",
              letterSpacing: "0.3px",
            }}>
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Memverifikasi...
                </>
              ) : (
                <>
                  Masuk ke Dashboard
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "28px", color: "#A89882", fontSize: "12px" }}>
            © 2026 Injani&apos;s Fashion · Admin Control Panel
          </p>
        </div>
      </div>
    </div>
  );
}
