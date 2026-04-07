import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────
//  ⚙️  Email Middleware Config
// ─────────────────────────────────────────
const MIDDLEWARE_BASE_URL = "https://email-middleware-qyrt.onrender.com";
const MIDDLEWARE_API_KEY  = "averlon-mail-2026!";

// Base URL of your app — the reset link will be:
//   {APP_BASE_URL}/reset-password?token={token}&email={email}
const APP_BASE_URL = "http://localhost:5173"; // e.g. "https://hire2onboard.com"

// ─────────────────────────────────────────
//  Types
// ─────────────────────────────────────────
interface ForgotPasswordProps {
  onBack?: () => void;
  /** Optional: your own token generator. Defaults to a secure random token. */
  generateToken?: (email: string) => Promise<string>;
  /** Optional: called after token is generated so you can save it server-side */
  onTokenGenerated?: (
    email: string,
    token: string,
    expiresAt: number,
  ) => Promise<void>;
}

// ─────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────
function generateSecureToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function sendPasswordResetEmail(to: string, toName: string, resetLink: string) {
  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
      <div style="background:linear-gradient(135deg,#0D2244 0%,#0096B7 100%);padding:32px 40px;border-radius:16px 16px 0 0;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;line-height:1.2">Reset your password</h1>
        <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;font-size:13px">You requested a password reset</p>
      </div>

      <div style="background:#f8fafc;padding:32px 40px;border:1px solid #e2e8f0;border-top:none">
        <p style="margin:0 0 16px;font-size:14px">Hi <strong>${toName}</strong>,</p>
        <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.65">
          We received a request to reset the password for your Tally Connect account.
          Click the button below to set a new password. This link expires in <strong style="color:#0D2244">1 hour</strong>.
        </p>

        <div style="text-align:center;margin:28px 0">
          <a href="${resetLink}"
             style="display:inline-block;background:linear-gradient(135deg,#00B4D8,#0096B7);color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:12px;letter-spacing:.02em;box-shadow:0 4px 18px rgba(0,150,183,0.35)">
            Reset My Password →
          </a>
        </div>

        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin:24px 0">
          <p style="margin:0 0 6px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;font-weight:600">Or copy this link</p>
          <p style="margin:0;font-size:12px;color:#0096B7;word-break:break-all;font-family:monospace">${resetLink}</p>
        </div>

        <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6">
          If you didn't request this, you can safely ignore this email — your password won't change.
          For security, this link can only be used once.
        </p>
      </div>

      <div style="background:#f1f5f9;padding:16px 40px;border-radius:0 0 16px 16px;border:1px solid #e2e8f0;border-top:none;text-align:center">
        <p style="margin:0;font-size:11px;color:#94a3b8">© ${new Date().getFullYear()} Tally Connect · Averlon World</p>
      </div>
    </div>`;

  const res = await fetch(`${MIDDLEWARE_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": MIDDLEWARE_API_KEY,
    },
    body: JSON.stringify({
      to,
      subject: "Reset your Tally Connect password",
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Middleware error ${res.status}: ${body}`);
  }
}

// ─────────────────────────────────────────
//  Icons
// ─────────────────────────────────────────
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ─────────────────────────────────────────
//  Sent State View
// ─────────────────────────────────────────
function EmailSentView({
  email,
  onBack,
  onResend,
  resending,
}: {
  email: string;
  onBack?: () => void;
  onResend: () => void;
  resending: boolean;
}) {
  return (
    <motion.div
      key="sent"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Icon */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #00B4D8 0%, #0096B7 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 12px 36px rgba(0,180,216,0.32)",
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0D2244", letterSpacing: "-0.035em", marginBottom: "0.5rem" }}
        >
          Check your inbox
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          style={{ fontSize: "0.875rem", color: "#5a6f96", lineHeight: 1.7, maxWidth: 340, margin: "0 auto" }}
        >
          We sent a password reset link to{" "}
          <strong style={{ color: "#0096B7" }}>{email}</strong>. The link expires in{" "}
          <strong style={{ color: "#0D2244" }}>1 hour</strong>.
        </motion.p>
      </div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        style={{
          background: "#F0F9FF",
          border: "1px solid rgba(0,180,216,0.18)",
          borderRadius: 14,
          padding: "1.1rem 1.3rem",
          marginBottom: "1.5rem",
        }}
      >
        {[
          { n: 1, text: "Open the email from Tally Connect" },
          { n: 2, text: 'Click "Reset My Password →"' },
          { n: 3, text: "Set your new password on the next page" },
        ].map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.48 + i * 0.07 }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              paddingBottom: i < 2 ? "0.75rem" : 0,
              marginBottom: i < 2 ? "0.75rem" : 0,
              borderBottom: i < 2 ? "1px solid rgba(0,180,216,0.1)" : "none",
            }}
          >
            <span style={{
              width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #00B4D8, #0096B7)",
              color: "#fff", fontSize: 10.5, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {step.n}
            </span>
            <span style={{ fontSize: 12.5, color: "#334E6B", fontWeight: 500 }}>{step.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Resend */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: "center", fontSize: 12.5, color: "#94a3b8", marginBottom: "1.3rem" }}
      >
        Didn't receive it?{" "}
        <button
          onClick={onResend}
          disabled={resending}
          style={{
            background: "none", border: "none", padding: 0,
            color: resending ? "#94a3b8" : "#0096B7",
            fontWeight: 700,
            cursor: resending ? "default" : "pointer",
            fontSize: "inherit", fontFamily: "inherit",
          }}
        >
          {resending ? "Sending…" : "Resend email"}
        </button>
      </motion.p>

      {/* Back */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.66 }}
          onClick={onBack}
          style={{
            width: "100%", height: 48,
            border: "1.5px solid #dde6f0", borderRadius: 13,
            background: "transparent", fontFamily: "inherit",
            fontSize: "0.875rem", fontWeight: 600, color: "#334155",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#0096B7";
            (e.currentTarget as HTMLButtonElement).style.color = "#0096B7";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#dde6f0";
            (e.currentTarget as HTMLButtonElement).style.color = "#334155";
          }}
        >
          <ArrowLeft /> Back to sign in
        </motion.button>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────
export default function ForgotPassword({
  onBack,
  generateToken,
  onTokenGenerated,
}: ForgotPasswordProps) {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");
  const [focused, setFocused]   = useState(false);
  const [resending, setResending] = useState(false);

  const canSubmit = isValidEmail(email) && !loading;

  // ── Core send logic ──────────────────────
  async function sendResetEmail(isResend = false) {
    const setter = isResend ? setResending : setLoading;
    setter(true);
    setError("");

    try {
      // 1. Generate token
      const token = generateToken
        ? await generateToken(email.trim())
        : generateSecureToken();

      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

      // 2. Persist token (if callback provided — save to your LMS/DB here)
      if (onTokenGenerated) {
        await onTokenGenerated(email.trim(), token, expiresAt);
      }

      // 3. Build reset link
      const resetLink = `${APP_BASE_URL}/reset-password?token=${token}&email=${encodeURIComponent(email.trim())}`;

      // 4. Send via custom email middleware
      const toName = email.split("@")[0]; // e.g. "john" from john@example.com
      await sendPasswordResetEmail(email.trim(), toName, resetLink);

      if (!isResend) setSent(true);
    } catch (err) {
      console.error("ForgotPassword error:", err);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setter(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    await sendResetEmail(false);
  }

  // ─────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fp-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "2rem",
        position: "relative", overflow: "hidden",
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

        {/* Glow blobs */}
        <div style={{ position: "absolute", width: 440, height: 440, borderRadius: "50%", top: -160, right: -120, filter: "blur(80px)", background: "rgba(0,180,216,0.1)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", bottom: -130, left: -90, filter: "blur(80px)", background: "rgba(0,150,183,0.08)", pointerEvents: "none", zIndex: 0 }} />

        {/* ── Content ── */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 520, margin: "0 auto" }}>
          {/* Heading */}
          <AnimatePresence mode="wait">
            {!sent && (
              <motion.div
                key="heading"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: "2rem" }}
              >
                {/* Logo badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)",
                  borderRadius: 999, padding: "5px 14px 5px 8px", marginBottom: "1.1rem",
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "linear-gradient(135deg, #00B4D8, #0096B7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "#0096B7", letterSpacing: "0.04em" }}>
                    TALLY CONNECT
                  </span>
                </div>

                <h1 style={{
                  fontSize: "clamp(1.9rem, 4vw, 2.5rem)", fontWeight: 800,
                  color: "#0D2244", letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 0.55rem",
                }}>
                  Forgot your{" "}
                  <em style={{ color: "#0096B7", fontStyle: "normal" }}>password?</em>
                </h1>
                <p style={{ fontSize: "0.9rem", color: "#5a6f96", fontWeight: 400, lineHeight: 1.65, margin: 0 }}>
                  Enter your email and we'll send you a secure reset link right away.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.44, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
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
            <AnimatePresence mode="wait">
              {sent ? (
                <EmailSentView
                  key="sent"
                  email={email}
                  onBack={onBack}
                  onResend={() => sendResetEmail(true)}
                  resending={resending}
                />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Error banner */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: "1.2rem" }}
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
                    {/* Email field */}
                    <div style={{ marginBottom: "1.4rem" }}>
                      <label htmlFor="fp-email" style={{
                        display: "block", fontSize: "0.68rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "#334155", marginBottom: 7,
                      }}>
                        Email Address
                      </label>
                      <div style={{ position: "relative" }}>
                        <div style={{
                          position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                          pointerEvents: "none", color: focused ? "#0096B7" : "#94a3b8",
                          transition: "color 0.2s", display: "flex", alignItems: "center",
                        }}>
                          <MailIcon />
                        </div>
                        <input
                          id="fp-email" type="email" placeholder="you@example.com"
                          value={email} onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                          autoComplete="email"
                          style={{
                            width: "100%", padding: "13px 14px 13px 42px",
                            background: focused ? "#fff" : "#f8fafc",
                            border: `1.5px solid ${focused ? "#0096B7" : "#dde6f0"}`,
                            borderRadius: 13, fontFamily: "inherit",
                            fontSize: "0.88rem", color: "#0f172a", outline: "none",
                            transition: "all 0.2s",
                            boxShadow: focused ? "0 0 0 3.5px rgba(0,150,183,0.11)" : "none",
                          }}
                        />
                      </div>
                      {/* Inline validation hint */}
                      <AnimatePresence>
                        {email.length > 3 && !isValidEmail(email) && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                              margin: "5px 0 0", fontSize: 11, color: "#ef4444",
                              fontWeight: 500, display: "flex", alignItems: "center", gap: 4,
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            Please enter a valid email address
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: "rgba(200,230,245,0.7)", margin: "0.2rem 0 1.4rem" }} />

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={!canSubmit}
                      whileHover={canSubmit ? { scale: 1.012, boxShadow: "0 6px 24px rgba(0,150,183,0.36)" } : {}}
                      whileTap={canSubmit ? { scale: 0.985 } : {}}
                      style={{
                        width: "100%", height: 54, border: "none", borderRadius: 14,
                        fontFamily: "inherit", fontSize: "0.93rem", fontWeight: 700,
                        color: "#fff", cursor: !canSubmit ? "not-allowed" : "pointer",
                        background: !canSubmit
                          ? "rgba(0,150,183,0.35)"
                          : "linear-gradient(135deg, #00B4D8 0%, #0096B7 100%)",
                        boxShadow: !canSubmit
                          ? "none"
                          : "0 4px 18px rgba(0,150,183,0.32), inset 0 1px 0 rgba(255,255,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        letterSpacing: "0.01em", position: "relative", overflow: "hidden",
                        transition: "background 0.25s, box-shadow 0.25s",
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
                            borderTopColor: "#fff", borderRadius: "50%",
                            animation: "fp-spin 0.55s linear infinite", flexShrink: 0,
                          }} />
                          Sending reset link…
                        </>
                      ) : (
                        <><SendIcon /> Send reset link <ArrowRight /></>
                      )}
                    </motion.button>

                    {/* Back link */}
                    {onBack && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ textAlign: "center", marginTop: "1.15rem" }}
                      >
                        <button
                          type="button" onClick={onBack}
                          style={{
                            background: "none", border: "none", padding: 0,
                            cursor: "pointer", fontFamily: "inherit",
                            fontSize: "0.82rem", color: "#94a3b8", fontWeight: 500,
                            display: "inline-flex", alignItems: "center", gap: 5,
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#0096B7")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                        >
                          <ArrowLeft /> Back to sign in
                        </button>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}