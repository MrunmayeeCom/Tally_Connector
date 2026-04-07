import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resetPassword as resetPasswordAPI } from "../api/lms";

// ─────────────────────────────────────────
//  Types
// ─────────────────────────────────────────
interface ResetPasswordProps {
  onBack?: () => void;
}

// ─────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────
function validate(p: string) {
  return {
    valid:     p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p),
    hasMinLen: p.length >= 8,
    hasUpper:  /[A-Z]/.test(p),
    hasLower:  /[a-z]/.test(p),
    hasNumber: /[0-9]/.test(p),
  };
}

function getQueryParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

// ─────────────────────────────────────────
//  Icons
// ─────────────────────────────────────────
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

// ─────────────────────────────────────────
//  Password Strength Indicator
// ─────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  const v = validate(password);
  const checks = [
    { label: "8+ chars",  ok: v.hasMinLen },
    { label: "Uppercase", ok: v.hasUpper },
    { label: "Lowercase", ok: v.hasLower },
    { label: "Number",    ok: v.hasNumber },
  ];
  const score  = checks.filter(c => c.ok).length;
  const colors = ["#f87171", "#fb923c", "#facc15", "#4ade80"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const color  = colors[score - 1] ?? "#e2e8f0";
  const label  = labels[score - 1] ?? "";

  return (
    <AnimatePresence>
      {password.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{ overflow: "hidden", paddingTop: 8 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ display: "flex", flex: 1, gap: 4 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  height: 3, flex: 1, borderRadius: 99,
                  background: i <= score ? color : "#e2e8f0",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 38, textAlign: "right" }}>
              {label}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {checks.map(c => (
              <span key={c.label} style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 10.5, padding: "3px 9px", borderRadius: 999, fontWeight: 500,
                background: c.ok ? "rgba(34,197,94,0.1)" : "rgba(209,213,219,0.45)",
                color: c.ok ? "#16a34a" : "#6b7280",
                transition: "all 0.2s",
              }}>
                {c.ok ? "✓" : "○"} {c.label}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────
//  Invalid / Expired Token View
// ─────────────────────────────────────────
function InvalidTokenView({ onBack }: { onBack?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: "center", padding: "1rem 0" }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "rgba(239,68,68,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 1.4rem",
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
          stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0D2244", marginBottom: "0.5rem" }}>
        Link expired or invalid
      </h2>
      <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.8rem" }}>
        This reset link has expired or is no longer valid.<br />
        Please request a new one.
      </p>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: "linear-gradient(135deg, #00B4D8, #0096B7)",
            border: "none", borderRadius: 13,
            padding: "13px 28px", color: "#fff",
            fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,150,183,0.3)",
          }}
        >
          Request new link
        </button>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────
//  Success Popup
// ─────────────────────────────────────────
function SuccessPopup({ onSignIn, onClose }: { onSignIn: () => void; onClose: () => void }) {
  const dotColors = ["#00B4D8", "#0096B7", "#4ade80", "#facc15", "#f472b6", "#a78bfa"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15,23,42,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 28,
          padding: "2.4rem 2rem 2rem",
          width: "100%", maxWidth: 380,
          textAlign: "center",
          boxShadow: "0 32px 80px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.08)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Confetti */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, y: -10, x: 0, rotate: 0, scale: 1 }}
            animate={{ opacity: 0, y: 100 + Math.random() * 40, x: (Math.random() - 0.5) * 80, rotate: 360, scale: 0.5 }}
            transition={{ duration: 0.9 + Math.random() * 0.7, delay: Math.random() * 0.45, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${8 + Math.random() * 84}%`,
              top: `${Math.random() * 15}%`,
              width: 5 + Math.random() * 6,
              height: 5 + Math.random() * 6,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background: dotColors[i % dotColors.length],
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 76, height: 76, borderRadius: "50%",
            background: "linear-gradient(135deg, #00B4D8 0%, #0096B7 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.4rem",
            boxShadow: "0 10px 32px rgba(0,150,183,0.35)",
          }}
        >
          <motion.svg
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.48, duration: 0.3 }}
            width="32" height="32" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"/>
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0D2244", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Password reset!
          </h2>
          <p style={{ fontSize: "0.845rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.6rem" }}>
            Your password has been updated successfully.{" "}
            Sign in with your new credentials to continue.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSignIn}
            style={{
              width: "100%", height: 50, border: "none", borderRadius: 13,
              background: "linear-gradient(135deg, #00B4D8, #0096B7)",
              color: "#fff", fontFamily: "inherit",
              fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,150,183,0.3)",
            }}
          >
            Go to sign in →
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
//  Input Field
// ─────────────────────────────────────────
function PasswordInput({
  id, label, value, onChange, placeholder, show, onToggleShow, hasError, icon,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  show: boolean; onToggleShow: () => void;
  hasError?: boolean; icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: "1.3rem" }}>
      <label htmlFor={id} style={{
        display: "block", fontSize: "0.68rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "#334155", marginBottom: 7,
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 14, top: "50%",
          transform: "translateY(-50%)", pointerEvents: "none",
          color: focused ? "#0096B7" : "#94a3b8",
          transition: "color 0.2s", display: "flex", alignItems: "center",
        }}>
          {icon}
        </div>
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="new-password"
          style={{
            width: "100%",
            padding: "13px 46px 13px 42px",
            background: focused ? "#fff" : "#f8fafc",
            border: `1.5px solid ${hasError ? "#ef4444" : focused ? "#0096B7" : "#dde6f0"}`,
            borderRadius: 13, fontFamily: "inherit",
            fontSize: "0.88rem", color: "#0f172a",
            outline: "none", transition: "all 0.2s",
            boxShadow: hasError
              ? "0 0 0 3px rgba(239,68,68,0.1)"
              : focused
              ? "0 0 0 3.5px rgba(0,150,183,0.11)"
              : "none",
          }}
        />
        <button type="button" onClick={onToggleShow} tabIndex={-1} style={{
          position: "absolute", right: 13, top: "50%",
          transform: "translateY(-50%)", background: "none",
          border: "none", cursor: "pointer", color: "#94a3b8", padding: 0,
          display: "flex", alignItems: "center",
        }}>
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────
export default function ResetPassword({ onBack }: ResetPasswordProps) {
  // Read token + email from URL: /reset-password?token=...&email=...
  const token = getQueryParam("token");
  const email = getQueryParam("email");

  // If no token in URL, show invalid state
  const tokenMissing = !token;

  const [password,     setPassword]     = useState("");
  const [confirm,      setConfirm]      = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [showPopup,    setShowPopup]    = useState(false);
  const [error,        setError]        = useState("");

  const passwordsMatch = password === confirm;
  const isStrong       = validate(password).valid;
  const canSubmit      = password.length > 0 && confirm.length > 0 && passwordsMatch && isStrong;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setError("");
    setLoading(true);
    try {
      // Calls your LMS: hashes password + POST /api/external/customer-password-sync
      await resetPasswordAPI(email, password);
      setShowPopup(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes rp-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem", position: "relative", overflow: "hidden",
        background: "linear-gradient(145deg, #e0f7fb 0%, #f0f9ff 50%, #e8f4fd 100%)",
      }}>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "radial-gradient(circle, rgba(0,150,183,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", width: 420, height: 420, borderRadius: "50%",
          top: -140, right: -100, filter: "blur(70px)",
          background: "rgba(0,180,216,0.09)", pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", width: 340, height: 340, borderRadius: "50%",
          bottom: -120, left: -80, filter: "blur(70px)",
          background: "rgba(0,150,183,0.08)", pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560, margin: "0 auto" }}>

          {/* Heading */}
          {!tokenMissing && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "2rem" }}
            >
              {/* Brand badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(0,180,216,0.1)",
                border: "1px solid rgba(0,180,216,0.2)",
                borderRadius: 999, padding: "5px 14px 5px 8px",
                marginBottom: "1.1rem",
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "linear-gradient(135deg, #00B4D8, #0096B7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "#0096B7", letterSpacing: "0.04em" }}>
                  TALLY CONNECT
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 4.5vw, 2.7rem)", fontWeight: 800,
                color: "#0D2244", letterSpacing: "-0.045em", lineHeight: 1.1,
                marginBottom: "0.6rem", margin: "0 0 0.55rem",
              }}>
                Reset your{" "}
                <em style={{ color: "#0096B7", fontStyle: "normal" }}>password</em>
              </h1>
              <p style={{ fontSize: "0.92rem", color: "#5a6f96", fontWeight: 400, lineHeight: 1.65, margin: 0 }}>
                Choose a strong new password to secure your account
                {email ? ` for ${email}` : ""}.
              </p>
            </motion.div>
          )}

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.44, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(200,230,245,0.9)",
              borderRadius: 24, padding: "2.4rem 2.6rem",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              boxShadow: [
                "0 2px 4px rgba(0,0,0,0.02)",
                "0 12px 40px rgba(0,150,183,0.1)",
                "0 28px 72px rgba(0,150,183,0.06)",
                "inset 0 1px 0 rgba(255,255,255,1)",
              ].join(", "),
            }}
          >
            {/* Invalid token state */}
            {tokenMissing ? (
              <InvalidTokenView onBack={onBack} />
            ) : (
              <>
                {/* Error banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: "1.3rem" }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      style={{
                        background: "rgba(239,68,68,0.07)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        borderRadius: 11, padding: "11px 14px",
                        fontSize: 12.5, color: "#dc2626", fontWeight: 500,
                      }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit}>
                  {/* New Password */}
                  <PasswordInput
                    id="rp-password" label="New Password"
                    value={password} onChange={setPassword}
                    placeholder="Min. 8 characters"
                    show={showPassword} onToggleShow={() => setShowPassword(v => !v)}
                    icon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    }
                  />
                  <PasswordStrength password={password} />

                  {/* Confirm Password */}
                  <div style={{ marginTop: password.length > 0 ? "1.1rem" : 0 }}>
                    <PasswordInput
                      id="rp-confirm" label="Confirm Password"
                      value={confirm} onChange={setConfirm}
                      placeholder="Re-enter your password"
                      show={showConfirm} onToggleShow={() => setShowConfirm(v => !v)}
                      hasError={confirm.length > 0 && !passwordsMatch}
                      icon={
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                      }
                    />
                  </div>

                  {/* Match hint */}
                  <AnimatePresence>
                    {confirm.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          fontSize: 11, fontWeight: 500, marginTop: -8, marginBottom: "1.2rem",
                          display: "flex", alignItems: "center", gap: 4,
                          color: passwordsMatch ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {passwordsMatch ? (
                          <>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Passwords match
                          </>
                        ) : (
                          <>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                            Passwords don't match
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(200,230,245,0.7)", margin: "0.25rem 0 1.4rem" }} />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={!canSubmit || loading}
                    whileHover={canSubmit && !loading ? { scale: 1.012, boxShadow: "0 6px 24px rgba(0,150,183,0.36)" } : {}}
                    whileTap={canSubmit && !loading ? { scale: 0.985 } : {}}
                    style={{
                      width: "100%", height: 56, border: "none", borderRadius: 14,
                      fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 700,
                      color: "#fff",
                      cursor: !canSubmit || loading ? "not-allowed" : "pointer",
                      background: !canSubmit || loading
                        ? "rgba(0,150,183,0.35)"
                        : "linear-gradient(135deg, #00B4D8 0%, #0096B7 100%)",
                      boxShadow: !canSubmit || loading
                        ? "none"
                        : "0 4px 18px rgba(0,150,183,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      letterSpacing: "0.01em",
                      position: "relative", overflow: "hidden",
                      transition: "background 0.25s, box-shadow 0.25s, opacity 0.25s",
                    }}
                  >
                    <span style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, rgba(255,255,255,0.13), transparent 60%)",
                      pointerEvents: "none",
                    }} />
                    {loading ? (
                      <>
                        <span style={{
                          width: 16, height: 16,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "rp-spin 0.55s linear infinite",
                          flexShrink: 0,
                        }} />
                        Resetting password…
                      </>
                    ) : (
                      <>Reset password <ArrowRight /></>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* Success Popup */}
        <AnimatePresence>
          {showPopup && (
            <SuccessPopup
              onSignIn={() => onBack?.()}
              onClose={() => setShowPopup(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}