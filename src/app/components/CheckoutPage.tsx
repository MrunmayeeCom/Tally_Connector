import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Building2, Mail, Phone, MapPin, CreditCard,
  Users, ShieldCheck, Lock, BadgeCheck, CheckCircle2, Gift, Check,
  CheckCircle, AlertCircle, X,
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

// ── ALREADY ACTIVE MODAL ──────────────────────────────────────────────────────
function AlreadyActiveModal({ planName, isFree, onClose, onGoHome }: { planName: string; isFree: boolean; onClose: () => void; onGoHome: () => void; }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(8px)", animation: "gt-fade-in 0.2s ease" }}>
      <div className="bg-white w-full max-w-sm text-center"
        style={{ borderRadius: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.2)", animation: "gt-slide-up 0.35s cubic-bezier(0.34,1.56,0.64,1)", borderTop: "4px solid transparent", backgroundImage: "linear-gradient(white,white),linear-gradient(90deg,#0d7a8a,#0a3d5c,#0f2044)", backgroundOrigin: "border-box", backgroundClip: "padding-box,border-box", padding: "40px 32px 32px" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#ccfbf1,#99f6e4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 0 0 12px rgba(13,122,138,0.08)", animation: "gt-pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}>
          <Check style={{ width: 32, height: 32, color: "#0d7a8a" }} />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg,#f0fdfa,#ccfbf1)", border: "1px solid #99f6e4", color: "#0d7a8a", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 100, marginBottom: 16 }}>
          <Check style={{ width: 11, height: 11 }} /> {planName} Plan
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 10, marginTop: 0 }}>Plan Already Active! ✅</h3>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 6, marginTop: 0 }}>You already have an active <strong style={{ color: "#0d7a8a" }}>{planName}</strong> plan on your account.</p>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 24, marginTop: 0 }}>Head to home to continue, or close this to upgrade your plan.</p>
        <div style={{ display: "flex", gap: 10 }}>
          {!isFree && (
            <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f1f5f9", color: "#475569", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
          )}
          <button onClick={onGoHome} style={{ flex: 1, padding: "11px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(13,122,138,0.3)" }}>Go to Home</button>
        </div>
      </div>
    </div>
  );
}

// ── SUCCESS MODAL ─────────────────────────────────────────────────────────────
function SuccessModal({ planName, onGoHome }: { planName: string; onGoHome: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", animation: "gt-fade-in 0.2s ease" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm text-center overflow-hidden" style={{ animation: "gt-slide-up 0.3s ease" }}>
        <div className="px-6 pt-8 pb-6" style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)" }}>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-9 w-9 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">You're All Set! 🎉</h2>
          <p className="text-teal-100 text-sm">Your <span className="font-semibold text-cyan-200">{planName}</span> plan is now active</p>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center justify-between bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-4">
            <div className="text-left"><p className="text-sm font-bold text-teal-800">{planName} Plan</p><p className="text-xs text-teal-500 mt-0.5">Active now</p></div>
            <div className="text-right"><p className="text-xl font-extrabold text-teal-600">₹0</p><p className="text-[10px] text-teal-400">forever</p></div>
          </div>
          <div className="space-y-2 mb-5 text-left">
            {["No credit card required", "Instant access to all features", "Cancel anytime"].map(t => (
              <div key={t} className="flex items-center gap-2 text-xs text-gray-500"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />{t}</div>
            ))}
          </div>
          <button onClick={onGoHome} className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)", fontFamily: "inherit" }}>
            Go to Home →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CHECKOUT PAGE ──────────────────────────────────────────────────────────────
export function CheckoutPage({ selectedPlan, initialBillingCycle, onBack, onProceedToPayment }: CheckoutPageProps) {
  const navigate     = useNavigate();
  const loggedInUser = getStoredUser();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);
  const [activating, setActivating]     = useState(false);
  const [formData, setFormData]         = useState({ companyName: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", gstNumber: "" });
  const [lmsPlan, setLmsPlan]           = useState<{ licenseId: string; planName: string; pricePerUser: number; includedUsers: number; discountConfig: { monthly: number; quarterly: number; "half-yearly": number; yearly: number; }; } | null>(null);
  const [loading, setLoading]                               = useState(true);
  const [showSuccessModal, setShowSuccessModal]             = useState(false);
  const [activatedPlanName, setActivatedPlanName]           = useState("");
  const [showAlreadyActiveModal, setShowAlreadyActiveModal] = useState(false);
  const [existingPlanName, setExistingPlanName]             = useState("Current");

  const isFree = lmsPlan?.pricePerUser === 0;

  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  const removeToast = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  useEffect(() => {
    if (!loggedInUser?.email) return;
    const checkExisting = async () => {
      try {
        const res = await fetch(
          `https://license-system-v6ht.onrender.com/api/external/actve-license/${loggedInUser.email}?productId=695902cfc240b17f16c3d716`,
          { headers: { "x-api-key": "my-secret-key-123" } }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.activeLicense && data.activeLicense.status === "active") {
            const lt = data.activeLicense.licenseTypeId || data.activeLicense.licenseType || {};
            const name = lt.name || "Current";
            const priceAmount = lt.price?.amount ?? null;
            const existingIsFree = Number(priceAmount) === 0;
            setExistingPlanName(name);
            if (existingIsFree) { setShowAlreadyActiveModal(true); }
            else { showToast(`${name} plan is currently active on your account.`, "success"); }
          }
        }
      } catch (err) { console.error("License check failed:", err); }
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
        setActivating(true);
        await purchaseLicense({ name: formData.companyName, email: loggedInUser.email, licenseId: lmsPlan.licenseId, billingCycle: "monthly", amount: 0, currency: "INR" });
        setActivatedPlanName(lmsPlan.planName);
        setShowSuccessModal(true);
        setActivating(false);
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
        theme: { color: "#0d7a8a" },
      });
      rzp.open();
    } catch (err: any) {
      showToast(err?.response?.data?.message || err?.message || "Something went wrong. Please try again.", "error");
    } finally { setActivating(false); }
  };

  const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  const getSavingsPercent = () => lmsPlan?.discountConfig?.[billingCycle] ?? 0;
  const getBillingPeriod  = () => ({ monthly: "1 month", quarterly: "3 months", "half-yearly": "6 months", yearly: "12 months" }[billingCycle]);
  const handleGoHome      = () => { window.location.href = "/"; };

  useEffect(() => {
    if (loggedInUser?.email) setFormData(prev => ({ ...prev, email: loggedInUser.email }));
  }, [loggedInUser?.email]);

  useEffect(() => {
    const loadPlanFromLMS = async () => {
      try {
        const res  = await fetch("https://license-system-v6ht.onrender.com/api/license/public/licenses-by-product/695902cfc240b17f16c3d716", { headers: { "x-api-key": "my-secret-key-123" } });
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
      } catch (err) { console.error("Failed to load checkout plan", err); }
      finally { setLoading(false); }
    };
    loadPlanFromLMS();
  }, [selectedPlan]);

  if (loading || !lmsPlan) return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading checkout...</p>
      </div>
    </div>
  );

  const cycles: BillingCycle[]                        = ["monthly", "quarterly", "half-yearly", "yearly"];
  const cycleLabels: Record<BillingCycle, string>     = { monthly: "Monthly", quarterly: "Quarterly", "half-yearly": "Half-Yearly", yearly: "Yearly" };
  const fieldCls = "w-full px-3 h-10 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-teal-400 transition-all";
  const iconFieldCls = "w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-teal-400 transition-all";

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <style>{`
        @keyframes gt-fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gt-slide-up { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes gt-pop-in   { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#F5F7FA]">

        {showAlreadyActiveModal && (
          <AlreadyActiveModal planName={existingPlanName} isFree={isFree!} onClose={() => setShowAlreadyActiveModal(false)} onGoHome={handleGoHome} />
        )}
        {showSuccessModal && (
          <SuccessModal planName={activatedPlanName} onGoHome={handleGoHome} />
        )}

        {/* ── Sticky Header Bar ── */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)" }}>
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-800 tracking-tight">TallyConnect Checkout</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
            <span className="text-teal-600 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Select Plan</span>
            <span className="mx-1 text-gray-300">›</span>
            <span className="text-teal-600 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)" }}>2</span>
              Billing Details
            </span>
            <span className="mx-1 text-gray-300">›</span>
            <span className="flex items-center gap-1 text-gray-400">
              <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-400 text-[10px] flex items-center justify-center">3</span>
              {isFree ? "Activate" : "Payment"}
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Plans
          </button>

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{isFree ? "Activate Your Free Plan" : "Complete Your Order"}</h1>
            <p className="text-sm text-gray-500 mt-1">{isFree ? "Fill in your details to get started — no payment required" : "Just one step away from connecting your Tally with modern business tools"}</p>
          </div>

          {isFree && (
            <div className="mb-6 flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-5 py-4">
              <Gift className="h-5 w-5 text-teal-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-teal-700">You're activating the Free Plan</p>
                <p className="text-xs text-teal-600 mt-0.5">No credit card required. Your plan will be activated instantly.</p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-5">

              {/* Step 1 – Selected Plan card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)" }}>1</span>
                  <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Selected Plan</h2>
                </div>
                <div className="rounded-xl p-4 flex items-start justify-between gap-4 border bg-teal-50 border-teal-100">
                  <div>
                    <p className="text-lg font-bold text-teal-700 mb-1">{lmsPlan.planName}</p>
                    <div className="flex items-center gap-1.5 text-sm text-teal-500 mb-3"><Users className="h-3.5 w-3.5" /> Includes {lmsPlan.includedUsers} users</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {["Tally ERP integration", "Real-time sync"].map(f => (
                        <div key={f} className="flex items-center gap-1.5 text-xs text-teal-600"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-400" />{f}</div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {isFree
                      ? <><div className="text-2xl font-bold text-teal-600">₹0</div><div className="text-xs text-teal-400">forever</div></>
                      : <><div className="text-2xl font-bold text-teal-700">₹{lmsPlan.pricePerUser.toLocaleString("en-IN")}</div><div className="text-xs text-teal-400">/user/month</div></>
                    }
                  </div>
                </div>
              </div>

              {/* Step 2 – Billing form */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)" }}>2</span>
                  <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Billing Information</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Company Name *</label>
                      <div className="relative"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input placeholder="Enter company name" value={formData.companyName} onChange={e => handleInputChange("companyName", e.target.value)} className={iconFieldCls} required /></div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address *</label>
                      <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input type="email" value={formData.email} readOnly className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 text-sm cursor-not-allowed focus:outline-none" /></div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone Number *</label>
                      <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} className={iconFieldCls} required /></div>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address *</label>
                      <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input placeholder="Street address" value={formData.address} onChange={e => handleInputChange("address", e.target.value)} className={iconFieldCls} required /></div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">City *</label>
                      <input placeholder="City" value={formData.city} onChange={e => handleInputChange("city", e.target.value)} className={fieldCls} required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">State *</label>
                      <input placeholder="State" value={formData.state} onChange={e => handleInputChange("state", e.target.value)} className={fieldCls} required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pincode *</label>
                      <input placeholder="400001" value={formData.pincode} onChange={e => handleInputChange("pincode", e.target.value)} className={fieldCls} required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">GST Number <span className="normal-case font-normal text-gray-400">(Optional)</span></label>
                      <input placeholder="22AAAAA0000A1Z5" value={formData.gstNumber} onChange={e => handleInputChange("gstNumber", e.target.value)} className={fieldCls} />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button type="submit" disabled={activating}
                      className="flex items-center gap-2 px-6 h-11 rounded-xl text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)", fontFamily: "inherit" }}>
                      {isFree
                        ? <><Gift className="h-4 w-4" />{activating ? "Activating..." : "Activate Free Plan"}</>
                        : <><CreditCard className="h-4 w-4" />{activating ? "Processing..." : "Proceed to Payment"}</>
                      }
                    </button>
                  </div>
                </form>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-6 py-3">
                {[{ icon: <Lock className="h-3.5 w-3.5" />, label: "SSL Secured" }, { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "256-bit Encryption" }, { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "PCI Compliant" }].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">{icon}{label}</div>
                ))}
              </div>
            </div>

            {/* ── RIGHT – Sticky Order Summary ── */}
            <div className="sticky top-20">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5" style={{ background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-teal-200">Order Summary</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">{lmsPlan.planName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-white/80 text-xs"><Users className="h-3.5 w-3.5" /> Includes {lmsPlan.includedUsers} users</div>
                </div>

                <div className="px-6 py-5 space-y-5">
                  {!isFree && (
                    <>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Billing Cycle</p>
                        <div className="grid grid-cols-4 gap-1.5">
                          {cycles.map(cycle => {
                            const pct = lmsPlan?.discountConfig?.[cycle] ?? 0, isActive = billingCycle === cycle;
                            return (
                              <button key={cycle} type="button" onClick={() => setBillingCycle(cycle)}
                                style={{ fontFamily: "inherit", ...(isActive ? { background: "linear-gradient(135deg,#0d7a8a,#0a3d5c)", borderColor: "#0d7a8a" } : {}) }}
                                className={`rounded-lg py-2 px-1 text-center transition-all text-[11px] font-semibold border ${isActive ? "text-white shadow-sm" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600"}`}>
                                {cycleLabels[cycle]}
                                {pct > 0 && <span className={`block text-[10px] mt-0.5 font-medium ${isActive ? "text-teal-200" : "text-green-500"}`}>-{pct}%</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="border-t border-gray-100" />
                    </>
                  )}

                  {isFree ? (
                    <div className="space-y-4">
                      <div className="rounded-xl bg-teal-50 border border-teal-200 px-4 py-5 text-center">
                        <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide mb-2">Total Due Today</p>
                        <p className="text-5xl font-bold text-teal-600">₹0</p>
                        <p className="text-xs text-teal-500 mt-2">No credit card required</p>
                      </div>
                      <div className="space-y-1.5">
                        {["No payment required", "Instant activation", "Cancel anytime"].map(t => (
                          <p key={t} className="text-xs text-gray-400 flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-teal-500 shrink-0" />{t}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Price per user/month</span><span className="font-medium text-gray-800">₹{lmsPlan.pricePerUser.toLocaleString("en-IN")}</span></div>
                        <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Number of users</span><span className="font-medium text-gray-800">×{lmsPlan.includedUsers}</span></div>
                        <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Billing period</span><span className="font-semibold text-gray-800">{getBillingPeriod()}</span></div>
                      </div>
                      <div className="border-t border-gray-100" />
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Subtotal</span><span className="font-medium text-gray-800">₹{getSubtotal().toLocaleString("en-IN")}</span></div>
                        {getSavingsPercent() > 0 && <div className="flex justify-between items-center text-sm"><span className="text-green-600 font-medium">Discount ({getSavingsPercent()}%)</span><span className="font-semibold text-green-600">-₹{getDiscount().toLocaleString("en-IN")}</span></div>}
                        <div className="flex justify-between items-center text-sm"><span className="text-gray-500">GST (18%)</span><span className="font-medium text-gray-800">₹{getTax().toLocaleString("en-IN")}</span></div>
                      </div>
                      <div className="border-t border-gray-100" />
                      <div className="rounded-xl px-4 py-3.5 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#0f2044,#0a3d5c)" }}>
                        <span className="text-sm font-semibold text-gray-300">Total Amount</span>
                        <span className="text-2xl font-bold text-white">₹{getTotal().toLocaleString("en-IN")}</span>
                      </div>
                      <div className="space-y-1.5">
                        {["Secure payment processing", "Money-back guarantee", "Cancel anytime"].map(t => (
                          <p key={t} className="text-xs text-gray-400 flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-teal-500 shrink-0" />{t}</p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

