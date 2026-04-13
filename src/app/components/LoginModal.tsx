import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, CheckCircle, Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";
import { syncCustomer, loginCustomer } from "../api/customerSync";
import { createPortal } from "react-dom";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdminLogin: (type: "admin" | "customer", name: string) => void;
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
}

type View = "signin" | "forgotpassword" | "emailsent";

// ── PASSWORD VALIDATION ───────────────────────────────────────────────────────
function validatePassword(p: string) {
  return {
    valid: /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && p.length >= 8,
    hasMinLength: p.length >= 8,
    hasUppercase: /[A-Z]/.test(p),
    hasLowercase: /[a-z]/.test(p),
    hasNumber: /[0-9]/.test(p),
  };
}

function PasswordStrength({ password }: { password: string }) {
  const validation = validatePassword(password);
  const checks = [
    { label: "8+ chars", ok: validation.hasMinLength },
    { label: "Uppercase", ok: validation.hasUppercase },
    { label: "Lowercase", ok: validation.hasLowercase },
    { label: "Number", ok: validation.hasNumber },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColor =
    score <= 1 ? "#f87171" : score === 2 ? "#fb923c" : score === 3 ? "#facc15" : "#4ade80";
  const label = score <= 1 ? "Weak" : score === 2 ? "Fair" : score === 3 ? "Good" : "Strong";

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{ background: i <= score ? barColor : "#e5e7eb" }}
            />
          ))}
        </div>
        <span className="text-[10px] font-semibold" style={{ color: barColor }}>
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {checks.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded font-medium transition-all duration-200"
            style={{
              background: c.ok ? "rgba(34,197,94,0.1)" : "rgba(209,213,219,0.5)",
              color: c.ok ? "#16a34a" : "#6b7280",
            }}
          >
            {c.ok ? "✓" : "○"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── CORNER SUCCESS POPUP ──────────────────────────────────────────────────────
function LoginSuccessPopup({ name, onClose }: { name: string; onClose: () => void }) {
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => onCloseRef.current(), 4000);
    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.93 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="fixed top-5 right-5 z-[99999] flex items-start gap-3 bg-white border border-gray-100 rounded-2xl shadow-2xl px-4 py-3.5 max-w-[280px]"
    >
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <CheckCircle className="w-4 h-4 text-green-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">You're logged in!</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Welcome back,{" "}
          <span className="font-medium text-blue-600">{name}</span> 👋
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0 mt-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 4, ease: "linear" }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 rounded-b-2xl"
      />
    </motion.div>,
    document.body,
  );
}

// ── ACCOUNT CREATED BANNER ────────────────────────────────────────────────────
function AccountCreatedBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-2.5 px-3.5 py-2.5 bg-green-50 border border-green-200 rounded-xl mb-5"
    >
      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="w-3 h-3 text-white" />
      </div>
      <p className="text-xs text-green-700 font-medium leading-snug">
        Account created! Sign in with your credentials below.
      </p>
    </motion.div>
  );
}

// ── WRONG PASSWORD BANNER ─────────────────────────────────────────────────────
function WrongPasswordBanner({ onForgot }: { onForgot?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex items-start gap-3 px-3.5 py-3 bg-red-50 border border-red-200 rounded-xl mb-5"
    >
      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
        <X className="w-3 h-3 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-red-700 leading-snug">Incorrect password</p>
        <p className="text-xs text-red-500 mt-0.5 leading-snug">
          Double-check and try again, or{" "}
          <button
            type="button"
            onClick={onForgot}
            className="underline font-semibold hover:text-red-700 transition-colors"
          >
            reset your password
          </button>
          .
        </p>
      </div>
    </motion.div>
  );
}

// ── LOGIN MODAL ───────────────────────────────────────────────────────────────
export function LoginModal({
  open,
  onOpenChange,
  onAdminLogin,
  onLoginSuccess,
  onForgotPassword,
}: LoginModalProps) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<View>("signin");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loggedInName, setLoggedInName] = useState("");
  const [showCreatedBanner, setShowCreatedBanner] = useState(false);
  const [showWrongPassword, setShowWrongPassword] = useState(false);

  const passwordValid = validatePassword(adminPassword).valid;

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setAdminEmail("");
      setAdminPassword("");
      setName("");
      setIsSignUp(false);
      setLoading(false);
      setView("signin");
      setForgotEmail("");
      setShowPassword(false);
      setShowCreatedBanner(false);
      setShowWrongPassword(false);
    }
    onOpenChange(val);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminEmail) { toast.error("Email is required"); return; }
    if (adminPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }

    try {
      setLoading(true);

      // ── SIGN UP flow ──
      if (isSignUp) {
        if (!name) { toast.error("Name is required to create account"); return; }

        await syncCustomer({ name, email: adminEmail, source: "Tally", password: adminPassword });

        const createdEmail = adminEmail;
        const createdPassword = adminPassword;

        setIsSignUp(false);
        setShowCreatedBanner(true);
        setShowWrongPassword(false);
        setName("");
        setAdminEmail(createdEmail);
        setAdminPassword(createdPassword);
        setLoading(false);
        toast.success("Account created! Sign in to continue.");
        return;
      }

      // ── SIGN IN flow ──
      try {
        const loginResult = await loginCustomer({
          email: adminEmail,
          password: adminPassword,
        });
        const displayName = loginResult.customer?.name || adminEmail.split("@")[0];

        localStorage.setItem("user", JSON.stringify({ name: displayName, email: adminEmail }));

        // ✅ Dispatch with email + name in detail so agentUpdateService can read them
        window.dispatchEvent(
          new CustomEvent("userLoginStatusChanged", {
            detail: { email: adminEmail, name: displayName },
          })
        );

        setLoggedInName(displayName);
        setShowPopup(true);

        handleOpenChange(false);
        onAdminLogin("admin", displayName);
        onLoginSuccess?.();
      } catch (err: any) {
        if (err.message === "WRONG_PASSWORD") {
          setShowWrongPassword(true);
          toast.error("Incorrect password. Please try again.");
        } else if (err.message === "NOT_FOUND") {
          toast.error("Account not found");
          setIsSignUp(true);
          setShowCreatedBanner(false);
          setShowWrongPassword(false);
        } else {
          toast.error(err.message || "Something went wrong");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setView("emailsent");
      toast.success("Reset link sent! Check your inbox.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <LoginSuccessPopup
            name={loggedInName}
            onClose={() => setShowPopup(false)}
          />
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-none bg-white rounded-3xl shadow-2xl">
          <VisuallyHidden>
            <DialogTitle>Login to Tally Connector</DialogTitle>
            <DialogDescription>Sign in or create an account to continue</DialogDescription>
          </VisuallyHidden>

          <div className="relative">
            <div className="p-7">

              {/* ── SIGN IN / SIGN UP VIEW ── */}
              {view === "signin" && (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-gray-900 mb-1"
                  >
                    {isSignUp ? "Create an Account" : "Login to Tally Connector"}
                  </motion.h2>
                  <p className="text-gray-500 mb-5 text-sm">
                    {isSignUp ? "Fill in your details to get started" : "Sign in to continue"}
                  </p>

                  <AnimatePresence>
                    {showWrongPassword && !isSignUp && (
                      <WrongPasswordBanner
                        onForgot={() => {
                          handleOpenChange(false);
                          onForgotPassword?.();
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showCreatedBanner && !isSignUp && <AccountCreatedBanner />}
                  </AnimatePresence>

                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <input type="email" name="fake_email" style={{ display: "none" }} autoComplete="username" />
                    <input type="password" name="fake_password" style={{ display: "none" }} autoComplete="current-password" />

                    {isSignUp && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1.5">Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          placeholder="xyz@gmail.com"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          required
                          autoComplete="new-email"
                          className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-semibold text-gray-800">Password</label>
                        {!isSignUp && (
                          <button
                            type="button"
                            onClick={() => {
                              handleOpenChange(false);
                              onForgotPassword?.();
                            }}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={adminPassword}
                          onChange={(e) => {
                            setAdminPassword(e.target.value);
                            setShowWrongPassword(false);
                          }}
                          required
                          minLength={6}
                          autoComplete="new-password"
                          className="w-full pl-10 pr-11 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {isSignUp && <PasswordStrength password={adminPassword} />}
                    </div>

                    <div className="flex justify-center pt-1">
                      <motion.button
                        type="submit"
                        disabled={loading || (isSignUp && !passwordValid)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-10 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-center shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
                      </motion.button>
                    </div>

                    <p className="text-center text-sm mt-2">
                      {isSignUp ? (
                        <>
                          <span className="text-gray-500">Already have an account? </span>
                          <button
                            type="button"
                            onClick={() => { setIsSignUp(false); setShowCreatedBanner(false); setShowWrongPassword(false); }}
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            Sign in
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-gray-500">Don't have an account? </span>
                          <button
                            type="button"
                            onClick={() => { setIsSignUp(true); setShowCreatedBanner(false); setShowWrongPassword(false); }}
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            Sign up
                          </button>
                        </>
                      )}
                    </p>
                  </form>
                </motion.div>
              )}

              {/* ── FORGOT PASSWORD VIEW ── */}
              {view === "forgotpassword" && (
                <motion.div
                  key="forgotpassword"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-center mb-5">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.05 }}
                      className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center"
                    >
                      <Mail className="w-7 h-7 text-blue-500" />
                    </motion.div>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="text-2xl font-bold text-gray-900 text-center mb-1.5"
                  >
                    Forgot Password?
                  </motion.h2>
                  <p className="text-gray-500 text-sm text-center mb-6">
                    No worries! We'll send you reset instructions.
                  </p>

                  <form onSubmit={handleSendReset} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold leading-none">i</span>
                      </div>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        We'll send a secure reset link to your registered email address. The link will expire in 15 minutes.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-1">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setView("signin")}
                        className="flex-1 py-2.5 text-sm bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                      >
                        Send Reset Link
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ── EMAIL SENT VIEW ── */}
              {view === "emailsent" && (
                <motion.div
                  key="emailsent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-center mb-5">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="text-2xl font-bold text-gray-900 text-center mb-1.5"
                  >
                    Check your email!
                  </motion.h2>
                  <p className="text-gray-500 text-sm text-center mb-6">
                    A reset link has been sent to your inbox.
                  </p>

                  <p className="text-center text-xs text-gray-400 mb-1">We've sent a reset link to</p>
                  <p className="text-center text-sm font-semibold text-blue-600 mb-5">{forgotEmail}</p>

                  <div className="bg-green-50 rounded-xl p-4 mb-5 space-y-2.5 border border-green-100">
                    {[
                      "Check your inbox and spam folder",
                      "Click the reset link in the email",
                      "The link expires in 15 minutes",
                    ].map((tip) => (
                      <div key={tip} className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mb-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOpenChange(false)}
                      className="px-10 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      Got it, thanks!
                    </motion.button>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    Didn't receive the email?{" "}
                    <button
                      onClick={() => setView("forgotpassword")}
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Resend
                    </button>
                  </p>
                </motion.div>
              )}

            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}