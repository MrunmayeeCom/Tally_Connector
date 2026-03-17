import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Building2, Mail, Phone, MapPin, CreditCard,
  Users, ShieldCheck, RefreshCw, XCircle, CheckCircle, AlertCircle, X, Check,
} from "lucide-react";
import { purchaseLicense } from "../api/license";
import { createOrder, verifyPayment } from "../api/payment";
import { loadRazorpay } from "../../utils/loadRazorpay";
import { getStoredUser } from "../api/auth";

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";
type ToastType = "success" | "error";

interface Toast { id: number; message: string; type: ToastType; }

interface CheckoutPageProps {
  selectedPlan: string;
  initialBillingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly";
  onBack: () => void;
  onProceedToPayment: (billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly", formData: any) => void;
}

// ── TOAST PORTAL ──────────────────────────────────────────────────────────────
function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto relative flex items-start gap-2.5 bg-white border border-gray-100 rounded-xl shadow-xl px-4 py-3 min-w-[260px] max-w-[320px] overflow-hidden"
          >
            {toast.type === "success"
              ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              : <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            }
            <p className="text-sm text-gray-800 font-medium flex-1 leading-snug">{toast.message}</p>
            <button onClick={() => onRemove(toast.id)} className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
            <motion.div
              initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              style={{ transformOrigin: "left" }}
              className={`absolute bottom-0 left-0 right-0 h-0.5 ${toast.type === "success" ? "bg-green-400" : "bg-red-400"}`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

// ── SUCCESS MODAL ─────────────────────────────────────────────────────────────
function SuccessModal({ planName, onGoHome }: { planName: string; onGoHome: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center animate-pulse">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">You're All Set! 🎉</h2>
        <p className="text-white/60 text-sm mb-2">Your <span className="text-pink-300 font-semibold">{planName}</span> plan is now active.</p>
        <p className="text-white/40 text-xs mb-8">Start exploring all the features included in your plan.</p>
        <button onClick={onGoHome} className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all text-sm">
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

// ── ALREADY ACTIVE MODAL ──────────────────────────────────────────────────────
// Same pattern as GeoTrack: isFree passed in, Close button hidden for free plans
function AlreadyActiveModal({
  planName, isFree, onClose, onGoHome,
}: {
  planName: string; isFree: boolean; onClose: () => void; onGoHome: () => void;
}) {
  if (isFree) {
    // FREE PLAN: clean white modal, only Go to Home
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="relative w-full max-w-sm text-center"
          style={{ background: "#ffffff", borderRadius: 20, padding: "36px 28px 28px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb", borderTop: "3px solid #38bdf8" }}
        >
          <div style={{ width: 76, height: 76, borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#bae6fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check style={{ width: 26, height: 26, color: "#0891b2" }} />
            </div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0f9ff", border: "1px solid #bae6fd", color: "#0891b2", fontSize: 13, fontWeight: 600, padding: "5px 14px", borderRadius: 100, marginBottom: 16 }}>
            <Check style={{ width: 12, height: 12 }} /> {planName} Plan
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", marginBottom: 10, marginTop: 0 }}>Plan Already Active! ✅</h3>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, marginBottom: 6, marginTop: 0 }}>You already have an active <strong style={{ color: "#0891b2" }}>{planName}</strong> plan on your account.</p>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 28, marginTop: 0 }}>Head home to continue using all your features.</p>
          <button onClick={onGoHome} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #0891b2, #6366f1)", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(8,145,178,0.35)" }}>
            Go to Home
          </button>
        </motion.div>
      </div>
    );
  }

  // PAID PLAN: dark glassmorphism, Close + Go to Home
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative w-full max-w-sm text-center"
        style={{ background: "rgba(50,25,90,0.72)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 24, padding: "40px 32px 32px", boxShadow: "0 32px 80px rgba(0,0,0,0.4)", borderTop: "3px solid transparent", backgroundImage: "linear-gradient(rgba(50,25,90,0.72),rgba(50,25,90,0.72)),linear-gradient(90deg,#ec4899,#a855f7,#6366f1)", backgroundOrigin: "border-box", backgroundClip: "padding-box,border-box" }}
      >
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 0 12px rgba(168,85,247,0.07)" }}>
          <Check style={{ width: 32, height: 32, color: "#c084fc" }} />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "#d8b4fe", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 100, marginBottom: 16 }}>
          <Check style={{ width: 11, height: 11 }} /> {planName} Plan
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", marginBottom: 10, marginTop: 0 }}>Plan Already Active! ✅</h3>
        <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.65, marginBottom: 6, marginTop: 0 }}>You already have an active <strong style={{ color: "#f9a8d4" }}>{planName}</strong> plan on your account.</p>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 28, marginTop: 0 }}>Head home to continue, or close this to upgrade your plan.</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
          <button onClick={onGoHome} style={{ flex: 1, padding: "11px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#ec4899,#a855f7)", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(168,85,247,0.4)" }}>Go to Home</button>
        </div>
      </motion.div>
    </div>
  );
}

// ── CHECKOUT PAGE ──────────────────────────────────────────────────────────────
export function CheckoutPage({ selectedPlan, initialBillingCycle, onBack, onProceedToPayment }: CheckoutPageProps) {
  const navigate     = useNavigate();
  const loggedInUser = getStoredUser();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);
  const [formData, setFormData]         = useState({ companyName: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", gstNumber: "" });
  const [lmsPlan, setLmsPlan]           = useState<{ licenseId: string; planName: string; pricePerUser: number; includedUsers: number; discountConfig: { monthly: number; quarterly: number; "half-yearly": number; yearly: number; }; } | null>(null);
  const [loading, setLoading]           = useState(true);
  const [showSuccessModal, setShowSuccessModal]   = useState(false);
  const [activatedPlanName, setActivatedPlanName] = useState("");
  const [showAlreadyActiveModal, setShowAlreadyActiveModal] = useState(false);
  const [existingPlanName, setExistingPlanName]             = useState("Current");

  // ── Same pattern as GeoTrack: isFree derived from lmsPlan price ──
  const isFree = lmsPlan?.pricePerUser === 0;

  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  const removeToast = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  // ── Check for existing active license on load (same pattern as GeoTrack) ──
  useEffect(() => {
    if (!loggedInUser?.email) return;
    const checkExisting = async () => {
      try {
        const res = await fetch(
          `https://lisence-system.onrender.com/api/external/actve-license/${loggedInUser.email}?productId=695902cfc240b17f16c3d716`,
          { headers: { "x-api-key": "my-secret-key-123" } }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.activeLicense && data.activeLicense.status === "active") {
            // licenseTypeId is the populated object (confirmed from API response)
            const lt = data.activeLicense.licenseTypeId || data.activeLicense.licenseType || {};
            const name = lt.name || "Current";
            const priceAmount = lt.price?.amount ?? null;
            const existingIsFree = Number(priceAmount) === 0;
            setExistingPlanName(name);
            if (existingIsFree) {
              setShowAlreadyActiveModal(true);
            } else {
              showToast(`${name} plan is currently active on your account.`, "success");
            }
          }
        }
      } catch (err) {
        console.error("License check failed:", err);
      }
    };
    checkExisting();
  }, [loggedInUser?.email]);

  const getMonthlyBaseCost    = () => (!lmsPlan ? 0 : lmsPlan.pricePerUser * lmsPlan.includedUsers);
  const getSubtotal           = () => { const b = getMonthlyBaseCost(); if (billingCycle === "quarterly") return b * 3; if (billingCycle === "half-yearly") return b * 6; if (billingCycle === "yearly") return b * 12; return b; };
  const getDiscount           = () => (!lmsPlan ? 0 : getSubtotal() * ((lmsPlan.discountConfig?.[billingCycle] ?? 0) / 100));
  const getPriceAfterDiscount = () => getSubtotal() - getDiscount();
  const getTax                = () => getPriceAfterDiscount() * 0.18;
  const getTotal              = () => getPriceAfterDiscount() + getTax();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lmsPlan) { showToast("Plan not loaded. Please try again.", "error"); return; }
    try {
      if (isFree) {
        await purchaseLicense({ name: formData.companyName, email: loggedInUser.email, licenseId: lmsPlan.licenseId, billingCycle: "monthly", amount: 0, currency: "INR" });
        setActivatedPlanName(lmsPlan.planName);
        setShowSuccessModal(true);
        return;
      }
      const purchaseRes = await purchaseLicense({ name: formData.companyName, email: loggedInUser.email, licenseId: lmsPlan.licenseId, billingCycle, amount: getTotal(), currency: "INR" });
      const data = purchaseRes.data || purchaseRes;
      if (!data?.transactionId || !data?.userId) throw new Error("Transaction data missing from LMS");
      const { transactionId, userId } = data;
      const order = await createOrder({ userId, licenseId: lmsPlan.licenseId, billingCycle, amount: getTotal() * 100 });
      if (!order?.orderId) throw new Error("Failed to create Razorpay order");
      const loaded = await loadRazorpay();
      if (!loaded) { showToast("Failed to load payment gateway. Please try again.", "error"); return; }
      const rzp = new (window as any).Razorpay({
        key: order.key, amount: order.amount, currency: order.currency, order_id: order.orderId, name: "TallyConnect",
        prefill: { name: formData.companyName, email: loggedInUser.email, contact: formData.phone },
        handler: async (response: any) => {
          try {
            await verifyPayment({ transactionId, razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature });
            navigate(`/payment-success?txn=${transactionId}&plan=${encodeURIComponent(selectedPlan)}&cycle=${billingCycle}`);
          } catch {
            showToast(`Payment verification failed. Contact support with transaction ID: ${transactionId}`, "error");
          }
        },
        modal: { ondismiss: () => {} },
        theme: { color: "#2563eb" },
      });
      rzp.open();
    } catch (err: any) {
      showToast(err?.response?.data?.message || err?.message || "Something went wrong. Please try again.", "error");
    }
  };

  const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  const getBillingText    = () => ({ monthly: "Monthly", quarterly: "Quarterly", "half-yearly": "Half-Yearly", yearly: "Yearly" }[billingCycle]);
  const getSavingsPercent = () => lmsPlan?.discountConfig?.[billingCycle] ?? 0;
  const getBillingPeriod  = () => ({ monthly: "1 month", quarterly: "3 months", "half-yearly": "6 months", yearly: "12 months" }[billingCycle]);
  const handleGoHome      = () => { window.location.href = "/"; };

  useEffect(() => {
    if (loggedInUser?.email) setFormData(prev => ({ ...prev, email: loggedInUser.email }));
  }, [loggedInUser?.email]);

  useEffect(() => {
    const loadPlanFromLMS = async () => {
      try {
        const res  = await fetch("https://lisence-system.onrender.com/api/license/public/licenses-by-product/695902cfc240b17f16c3d716", { headers: { "x-api-key": "my-secret-key-123" } });
        const data = await res.json();
        const matched = data.licenses.find((lic: any) => lic?.licenseType?._id === selectedPlan);
        if (!matched) throw new Error("Selected plan not found in LMS");
        let userCount = 1;
        const rawFeatures = matched.licenseType.features || [];
        if (Array.isArray(rawFeatures)) {
          const uf: any[] = [];
          for (const f of rawFeatures) {
            if (typeof f === "object") {
              const label = (f.uiLabel || f.displayName || "").toLowerCase(), key = (f.featureKey || "").toLowerCase(), slug = (f.featureSlug || "").toLowerCase(), value = f.limitValue ?? f.value;
              if (f.featureType === "limit" && typeof value === "number") { const isU = slug === "user-limit" || key === "user-limit" || slug.includes("user") || key.includes("user") || label.includes("user"); if (isU) uf.push({ value, priority: (slug === "user-limit" || key === "user-limit") ? 1 : 2 }); }
            } else if (typeof f === "string") { const m = f.match(/(\d+)\s*users?/i); if (m) uf.push({ value: parseInt(m[1]), priority: 1 }); }
          }
          if (uf.length > 0) { uf.sort((a, b) => a.priority !== b.priority ? a.priority - b.priority : b.value - a.value); userCount = uf[0].value; }
        } else if (typeof rawFeatures === "object" && rawFeatures !== null) {
          const uf: any[] = [];
          for (const [slug, value] of Object.entries(rawFeatures)) { const s = slug.toLowerCase(); if ((s === "user-limit" || s === "users" || s === "user" || s.includes("user-limit")) && typeof value === "number" && value > 0) uf.push({ value, priority: (s === "user-limit" || s === "users") ? 1 : 2 }); }
          if (uf.length > 0) { uf.sort((a, b) => a.priority !== b.priority ? a.priority - b.priority : b.value - a.value); userCount = uf[0].value; }
        }
        setLmsPlan({ licenseId: matched._id, planName: matched.licenseType.name, pricePerUser: matched.licenseType.price.amount, includedUsers: userCount, discountConfig: matched.licenseType.discountConfig || { monthly: 0, quarterly: 5, "half-yearly": 10, yearly: 20 } });
      } catch (err) {
        console.error("Failed to load checkout plan", err);
      } finally {
        setLoading(false);
      }
    };
    loadPlanFromLMS();
  }, [selectedPlan]);

  if (loading || !lmsPlan) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a] via-[#2d2870] to-[#9d2060]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="relative z-10 text-center">
          <div className="h-10 w-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70 text-sm">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const BILLING_CYCLES: BillingCycle[] = ["monthly", "quarterly", "half-yearly", "yearly"];
  const CYCLE_LABELS: Record<BillingCycle, string> = { monthly: "Monthly", quarterly: "Quarterly", "half-yearly": "Half-Yearly", yearly: "Yearly" };
  const inputClass = "w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400/60 focus:border-transparent transition-all";
  const labelClass = "block text-xs font-semibold text-white/70 mb-1.5";

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="relative min-h-screen font-[Inter] overflow-hidden">

        {/* Already Active Modal — isFree from lmsPlan.pricePerUser === 0 */}
        {showAlreadyActiveModal && (
          <AlreadyActiveModal
            planName={existingPlanName}
            isFree={isFree}
            onClose={() => setShowAlreadyActiveModal(false)}
            onGoHome={handleGoHome}
          />
        )}

        {showSuccessModal && (
          <SuccessModal planName={activatedPlanName} onGoHome={handleGoHome} />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a] via-[#2d2870] to-[#9d2060]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-12">
          <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Plans
          </button>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Complete Your Order</h1>
            <p className="text-white/60 text-sm">Seamlessly connect your Tally with modern business tools</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-1">Billing Information</h2>
                <p className="text-white/50 text-xs mb-6">Enter your company and billing details</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className={labelClass}>Company Name *</label>
                    <div className="relative"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" /><input placeholder="Enter company name" value={formData.companyName} onChange={e => handleInputChange("companyName", e.target.value)} className={`${inputClass} pl-10`} required /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Email Address *</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" /><input type="email" value={formData.email} readOnly className={`${inputClass} pl-10 opacity-60 cursor-not-allowed`} /></div></div>
                    <div><label className={labelClass}>Phone Number *</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" /><input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} className={`${inputClass} pl-10`} required /></div></div>
                  </div>
                  <div>
                    <label className={labelClass}>Address *</label>
                    <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" /><input placeholder="Street address" value={formData.address} onChange={e => handleInputChange("address", e.target.value)} className={`${inputClass} pl-10`} required /></div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><label className={labelClass}>City *</label><input placeholder="City" value={formData.city} onChange={e => handleInputChange("city", e.target.value)} className={inputClass} required /></div>
                    <div><label className={labelClass}>State *</label><input placeholder="State" value={formData.state} onChange={e => handleInputChange("state", e.target.value)} className={inputClass} required /></div>
                    <div><label className={labelClass}>Pincode *</label><input placeholder="400001" value={formData.pincode} onChange={e => handleInputChange("pincode", e.target.value)} className={inputClass} required /></div>
                  </div>
                  <div><label className={labelClass}>GST Number (Optional)</label><input placeholder="22AAAAA0000A1Z5" value={formData.gstNumber} onChange={e => handleInputChange("gstNumber", e.target.value)} className={inputClass} /></div>
                  <div className="pt-2 flex justify-end">
                    <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all text-sm">
                      <CreditCard className="w-4 h-4" /> Proceed to Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5">
                <h2 className="text-lg font-bold text-white">Order Summary</h2>
                <div>
                  <p className="text-xs text-white/50 mb-2">Selected Plan</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-pink-500/20 border border-pink-400/30 text-pink-300 rounded-full text-xs font-semibold">{lmsPlan.planName}</span>
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 text-purple-300 rounded-full text-xs font-semibold">{getBillingText()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50"><Users className="w-3.5 h-3.5" /><span>Includes {lmsPlan.includedUsers} users</span></div>
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-2">Billing Cycle</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {BILLING_CYCLES.map(cycle => {
                      const pct = lmsPlan.discountConfig?.[cycle] ?? 0, active = billingCycle === cycle;
                      return (
                        <button key={cycle} type="button" onClick={() => setBillingCycle(cycle)}
                          className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${active ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
                          {CYCLE_LABELS[cycle]}{pct > 0 && <span className="ml-1 text-green-400">-{pct}%</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="border-t border-white/10" />
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-white/50">Price per user/month</span><span className="text-white">&#x20B9;{lmsPlan.pricePerUser.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Number of users</span><span className="text-white">x{lmsPlan.includedUsers}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Billing period</span><span className="text-white">{getBillingPeriod()}</span></div>
                  <div className="border-t border-white/10 pt-2.5 space-y-2">
                    <div className="flex justify-between font-medium"><span className="text-white/50">Subtotal</span><span className="text-white">&#x20B9;{getSubtotal().toLocaleString("en-IN")}</span></div>
                    {getSavingsPercent() > 0 && <div className="flex justify-between text-green-400 font-medium"><span>Discount ({getSavingsPercent()}%)</span><span>-&#x20B9;{getDiscount().toLocaleString("en-IN")}</span></div>}
                    <div className="flex justify-between"><span className="text-white/50">GST (18%)</span><span className="text-white">&#x20B9;{getTax().toLocaleString("en-IN")}</span></div>
                  </div>
                </div>
                <div className="border-t border-white/10" />
                <div className="flex justify-between items-baseline">
                  <span className="text-white font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-pink-300">&#x20B9;{getTotal().toLocaleString("en-IN")}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-white/40"><ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Secure payment processing</div>
                  <div className="flex items-center gap-2 text-xs text-white/40"><RefreshCw className="w-3.5 h-3.5 text-blue-400" /> Money-back guarantee</div>
                  <div className="flex items-center gap-2 text-xs text-white/40"><XCircle className="w-3.5 h-3.5 text-purple-400" /> Cancel anytime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}