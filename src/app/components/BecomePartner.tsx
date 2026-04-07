import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { submitPartnerApplication } from "../api/partnerProgram";

// ── TOAST ──────────────────────────────────────────────────────────────────
type ToastType = "success" | "error";
interface Toast { id: number; message: string; type: ToastType; }

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto relative flex items-start gap-2.5 bg-white border border-gray-100 rounded-xl shadow-xl px-4 py-3 min-w-[260px] max-w-[320px] overflow-hidden"
          >
            {t.type === "success"
              ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              : <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />}
            <p className="text-sm text-gray-800 font-medium flex-1 leading-snug">{t.message}</p>
            <button onClick={() => onRemove(t.id)} className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
            <motion.div
              initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              style={{ transformOrigin: "left" }}
              className={`absolute bottom-0 left-0 right-0 h-0.5 ${t.type === "success" ? "bg-emerald-400" : "bg-red-400"}`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

// ── ICONS ──────────────────────────────────────────────────────────────────
const SyncIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
);
const RoleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const DashIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const MultiIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const VoucherIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const CheckIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

// ── DATA ───────────────────────────────────────────────────────────────────
const BENEFITS = [
  { icon: <SyncIcon />, title: "Real-Time Tally Sync", desc: "Automatically pull live data from Tally Prime every 5 minutes via the agent.exe desktop bridge — no manual exports, no delays, always current." },
  { icon: <RoleIcon />, title: "Role-Based Access Control", desc: "Assign fine-grained permissions to each user, controlling exactly which data rows and columns they can view across ledgers, vouchers, and reports." },
  { icon: <DashIcon />, title: "Financial Dashboard", desc: "Access key metrics like total receivables, expenses, net profit, and monthly comparisons — all without needing direct access to Tally Prime desktop." },
  { icon: <MultiIcon />, title: "Multi-Company Management", desc: "Manage multiple Tally companies from a single platform with independent user assignments and permissions configured per company." },
  { icon: <VoucherIcon />, title: "Voucher & Bill Creation", desc: "Create sales, purchase, payment, and receipt vouchers directly from the web interface — instantly written back into Tally Prime via agent.exe." },
  { icon: <BellIcon />, title: "Smart Notifications", desc: "Automated alerts for financial events, user activities, and scheduled PDF report delivery — keeping your team informed without any manual follow-up." },
];

const TIERS = [
  {
    key: "bronze",
    name: "Bronze Partner",
    sub: "Entry-level partnership",
    headerColor: "#B45309",
    accentColor: "#B45309",
    requirements: ["Basic certification training", "5+ implementations", "Annual revenue target"],
    benefits: ["Official partner badge", "Marketing materials", "Technical support", "Basic certification"],
  },
  {
    key: "silver",
    name: "Silver Partner",
    sub: "Advanced partnership",
    headerColor: "#64748B",
    accentColor: "#64748B",
    requirements: ["Advanced certification", "15+ implementations", "Higher revenue target"],
    benefits: ["All Bronze benefits", "Priority support access", "Co-marketing opportunities", "Advanced certification"],
  },
  {
    key: "gold",
    name: "Gold Partner",
    sub: "Elite partnership",
    headerColor: "#D97706",
    accentColor: "#D97706",
    requirements: ["Master certification", "30+ implementations", "Premium revenue target"],
    benefits: ["All Silver benefits", "Dedicated success manager", "Featured partner listing", "Highest tier recognition"],
  },
];

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function BecomePartner() {
  const [formData, setFormData] = useState({
    companyName: "", contactPerson: "", email: "", phone: "",
    website: "", country: "", city: "",
    businessType: "", yearsInBusiness: "", numberOfEmployees: "",
    existingClients: "", joinAs: "", whyPartner: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const heroRef     = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const tiersRef    = useRef<HTMLDivElement>(null);
  const formRef     = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("tc-visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    [heroRef, benefitsRef, tiersRef, formRef].forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { companyName, contactPerson, email, phone, country, city, businessType, yearsInBusiness, numberOfEmployees, joinAs } = formData;
    if (!companyName || !contactPerson || !email || !phone || !country || !city || !businessType || !yearsInBusiness || !numberOfEmployees || !joinAs) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitPartnerApplication({
        contactInformation: { fullName: contactPerson, email, phone },
        companyInformation: { companyName, website: formData.website || "", country, city },
        businessDetails: { businessType, yearsInBusiness, numberOfEmployees, existingClients: Number(formData.existingClients) || 0 },
        partnershipDetails: { joinAs, motivation: formData.whyPartner || "No additional information provided" },
        source: "tally",
      });
      showToast("Application submitted! Our team will get back to you within 2 business days.", "success");
      setFormData({ companyName: "", contactPerson: "", email: "", phone: "", website: "", country: "", city: "", businessType: "", yearsInBusiness: "", numberOfEmployees: "", existingClients: "", joinAs: "", whyPartner: "" });
    } catch (err: any) {
      showToast(err?.response?.data?.message || err?.message || "Failed to submit. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .tc-root { min-height: 100vh; background: #F8FAFB; font-family: 'Inter', sans-serif; color: #111827; }

        /* ── HERO ── */
        .tc-hero {
          background: linear-gradient(135deg, #1A56DB 0%, #1e40af 100%);
          padding: 99px 0 64px; position: relative; overflow: hidden;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .tc-hero.tc-visible { opacity: 1; transform: translateY(0); }
        .tc-hero::before {
          content: ''; position: absolute; right: -120px; top: -120px;
          width: 480px; height: 480px; border-radius: 50%;
          background: rgba(255,255,255,0.06); pointer-events: none;
        }
        .tc-hero::after {
          content: ''; position: absolute; left: -60px; bottom: -80px;
          width: 280px; height: 280px; border-radius: 50%;
          background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .tc-container { max-width: 1200px; margin: 0 auto; padding: 0 32px; position: relative; }
        .tc-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          border-radius: 100px; padding: 5px 14px;
          font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.9);
          letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 20px;
        }
        .tc-hero-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 800; color: white;
          letter-spacing: -0.03em; line-height: 1.08; margin-bottom: 16px; max-width: 660px;
        }
        .tc-hero-title span { color: #93C5FD; }
        .tc-hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.82); max-width: 540px; line-height: 1.7; }

        /* ── STATS ── */
        .tc-stats { background: white; border-bottom: 1px solid #E5E7EB; padding: 40px 0; }
        .tc-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); text-align: center; }
        .tc-stat { padding: 8px 0; border-right: 1px solid #E5E7EB; }
        .tc-stat:last-child { border-right: none; }
        .tc-stat-num { font-family: 'Inter', sans-serif; font-size: 2.3rem; font-weight: 800; color: #1A56DB; letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px; }
        .tc-stat-label { font-size: 0.82rem; color: #6B7280; font-weight: 500; }

        /* ── BENEFITS ── */
        .tc-benefits {
          padding: 68px 0; position: relative; overflow: hidden;
          background: #F8FAFB;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .tc-benefits.tc-visible { opacity: 1; transform: translateY(0); }
        .tc-section-title { font-family: 'Inter', sans-serif; font-size: clamp(1.6rem,3vw,2.3rem); font-weight: 800; color: #111827; letter-spacing: -0.03em; text-align: center; margin-bottom: 10px; }
        .tc-section-sub { font-size: 0.95rem; color: #6B7280; text-align: center; max-width: 560px; margin: 0 auto 48px; line-height: 1.7; }
        .tc-benefits-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .tc-benefit-card {
          border-radius: 16px; padding: 26px;
          transition: all 0.22s ease; border: 1px solid transparent;
        }
        .tc-benefit-card:nth-child(1) { background: #EFF6FF; border-color: #BFDBFE; }
        .tc-benefit-card:nth-child(2) { background: #EEF2FF; border-color: #C7D2FE; }
        .tc-benefit-card:nth-child(3) { background: #F0F9FF; border-color: #BAE6FD; }
        .tc-benefit-card:nth-child(4) { background: #F0FDF4; border-color: #BBF7D0; }
        .tc-benefit-card:nth-child(5) { background: #FFF7ED; border-color: #FED7AA; }
        .tc-benefit-card:nth-child(6) { background: #FDF4FF; border-color: #E9D5FF; }
        .tc-benefit-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .tc-benefit-icon { width: 46px; height: 46px; background: rgba(255,255,255,0.7); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; border: 1px solid rgba(0,0,0,0.06); }
        .tc-benefit-title { font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 8px; letter-spacing: -0.01em; }
        .tc-benefit-desc { font-size: 0.83rem; color: #4B5563; line-height: 1.65; }

        /* ── TIERS ── */
        .tc-tiers { padding: 68px 0; background: #F1F5F9; opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .tc-tiers.tc-visible { opacity: 1; transform: translateY(0); }
        .tc-tiers-eyebrow { text-align: center; margin-bottom: 14px; }
        .tc-tiers-badge { display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid #1A56DB; border-radius: 100px; padding: 5px 14px; font-size: 0.78rem; font-weight: 700; color: #1A56DB; letter-spacing: 0.02em; }
        .tc-tiers-title { font-family: 'Inter', sans-serif; font-size: clamp(1.6rem,3vw,2.4rem); font-weight: 800; color: #111827; letter-spacing: -0.03em; text-align: center; margin-bottom: 8px; }
        .tc-tiers-sub { font-size: 0.9rem; color: #6B7280; text-align: center; margin-bottom: 44px; }
        .tc-tiers-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; max-width: 1060px; margin: 0 auto; }
        .tc-tier-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 2px 12px rgba(0,0,0,0.05); transition: all 0.25s ease; }
        .tc-tier-card:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(0,0,0,0.1); }
        .tc-tier-header { padding: 20px 24px; text-align: center; }
        .tc-tier-name { font-family: 'Inter', sans-serif; font-size: 1.15rem; font-weight: 800; color: white; letter-spacing: -0.01em; }
        .tc-tier-body { padding: 24px; }
        .tc-tier-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 12px; }
        .tc-tier-list { list-style: none; padding: 0; margin: 0 0 22px; }
        .tc-tier-item { display: flex; align-items: flex-start; gap: 8px; font-size: 0.845rem; color: #374151; padding: 5px 0; }

        /* ── FORM SECTION ── */
        .tc-form-section {
          padding: 56px 0 68px;
          background: linear-gradient(135deg, #BFDBFE 0%, #C7D2FE 50%, #DDD6FE 100%);
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .tc-form-section.tc-visible { opacity: 1; transform: translateY(0); }
        .tc-form-title { font-family: 'Inter', sans-serif; font-size: clamp(1.5rem,3vw,2.3rem); font-weight: 800; color: #111827; letter-spacing: -0.03em; text-align: center; margin-bottom: 10px; }
        .tc-form-sub { font-size: 0.95rem; color: #6B7280; text-align: center; max-width: 580px; margin: 0 auto 44px; line-height: 1.7; }
        .tc-form-card { background: white; border-radius: 20px; border: 1px solid #E2E8F0; padding: 36px 40px; max-width: 1100px; margin: 0 auto; box-shadow: 0 4px 32px rgba(0,0,0,0.06); }
        .tc-form-section-label { font-size: 0.73rem; font-weight: 700; color: #1A56DB; letter-spacing: 0.07em; text-transform: uppercase; border-bottom: 1px solid #EEF2FF; padding-bottom: 8px; margin-bottom: 18px; margin-top: 28px; }
        .tc-form-section-label:first-child { margin-top: 0; }
        .tc-form-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 14px; }
        .tc-form-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: 14px; }
        .tc-form-group { display: flex; flex-direction: column; gap: 7px; }
        .tc-form-label { font-size: 0.75rem; font-weight: 600; color: #374151; letter-spacing: 0.01em; }
        .tc-form-req { color: #EF4444; margin-left: 2px; }
        .tc-input, .tc-select, .tc-textarea {
          padding: 9px 14px; border: 1.5px solid #E5E7EB; border-radius: 10px;
          font-size: 0.845rem; font-family: 'Inter', sans-serif;
          color: #111827; background: white; transition: all 0.2s ease;
          box-sizing: border-box; width: 100%;
        }
        .tc-input::placeholder, .tc-textarea::placeholder { color: #9CA3AF; }
        .tc-input:focus, .tc-select:focus, .tc-textarea:focus { outline: none; border-color: #1A56DB; box-shadow: 0 0 0 3px rgba(26,86,219,0.08); }
        .tc-textarea { resize: none; }
        .tc-submit { min-width: 200px; padding: 12px 32px; background: linear-gradient(145deg, #1A56DB, #0E3FA8); color: white; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; box-shadow: 0 4px 14px rgba(26,86,219,0.3); transition: all 0.2s ease; letter-spacing: -0.01em; display: flex; align-items: center; gap: 8px; }
        .tc-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(26,86,219,0.42); }
        .tc-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .tc-form-note { font-size: 0.77rem; color: #9CA3AF; margin-top: 8px; }

        /* ── CTA ── */
        .tc-cta { background: white; padding: 68px 0; border-top: 1px solid #E5E7EB; }
        .tc-cta-title { font-family: 'Inter', sans-serif; font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 800; color: #111827; text-align: center; letter-spacing: -0.03em; margin-bottom: 12px; }
        .tc-cta-sub { font-size: 1rem; color: #6B7280; text-align: center; max-width: 460px; margin: 0 auto 36px; line-height: 1.7; }
        .tc-cta-btns { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .tc-cta-btn-primary { padding: 13px 28px; background: linear-gradient(145deg, #1A56DB, #0E3FA8); color: white; border: none; border-radius: 10px; font-size: 0.9rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; box-shadow: 0 4px 14px rgba(26,86,219,0.28); transition: all 0.2s ease; }
        .tc-cta-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,86,219,0.38); }
        .tc-cta-btn-outline { padding: 13px 28px; background: transparent; color: #374151; border: 1.5px solid #D1D5DB; border-radius: 10px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s ease; }
        .tc-cta-btn-outline:hover { background: #F9FAFB; border-color: #9CA3AF; color: #111827; }

        @media (max-width: 1024px) {
          .tc-benefits-grid { grid-template-columns: repeat(2,1fr); }
          .tc-tiers-grid { grid-template-columns: 1fr; max-width: 480px; }
          .tc-stats-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .tc-container { padding: 0 20px; }
          .tc-benefits-grid { grid-template-columns: 1fr; }
          .tc-form-grid, .tc-form-grid-2 { grid-template-columns: 1fr; }
          .tc-hero { padding: 80px 0 44px; }
          .tc-form-card { padding: 24px 20px; }
          .tc-cta-btns { flex-direction: column; }
          .tc-cta-btn-primary, .tc-cta-btn-outline { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="tc-root">

        {/* ── HERO ── */}
        <div ref={heroRef} className="tc-hero">
          <div className="tc-container">
            <div className="tc-hero-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Partner Program
            </div>
            <h1 className="tc-hero-title">
              Become a<br /><span>Tally Connect</span> Partner
            </h1>
            <p className="tc-hero-sub">Join our growing network of certified partners and help businesses seamlessly manage Tally Prime from anywhere</p>
          </div>
        </div>

        {/* ── BENEFITS ── */}
        <div ref={benefitsRef} className="tc-benefits">
          <div className="tc-container">
            <h2 className="tc-section-title">Why Partner with Tally Connect?</h2>
            <p className="tc-section-sub">Deliver powerful Tally Prime web access to your clients and unlock new revenue streams</p>
            <div className="tc-benefits-grid">
              {BENEFITS.map((b) => (
                <div key={b.title} className="tc-benefit-card">
                  <div className="tc-benefit-icon">{b.icon}</div>
                  <div className="tc-benefit-title">{b.title}</div>
                  <div className="tc-benefit-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TIERS ── */}
        <div ref={tiersRef} className="tc-tiers">
          <div className="tc-container">
            <div className="tc-tiers-eyebrow">
              <div className="tc-tiers-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
                Partnership Levels
              </div>
            </div>
            <h2 className="tc-tiers-title">Partner Program Tiers</h2>
            <p className="tc-tiers-sub">Choose the partnership level that matches your business goals</p>
            <div className="tc-tiers-grid">
              {TIERS.map((tier) => (
                <div key={tier.key} className="tc-tier-card" style={{ border: `2.5px solid ${tier.headerColor}` }}>
                  <div className="tc-tier-header" style={{ background: tier.headerColor }}>
                    <div className="tc-tier-name">{tier.name}</div>
                  </div>
                  <div className="tc-tier-body">
                    <div className="tc-tier-label" style={{ color: tier.accentColor }}>Requirements:</div>
                    <ul className="tc-tier-list">
                      {tier.requirements.map((r) => (
                        <li key={r} className="tc-tier-item">
                          <CheckIcon color={tier.accentColor} />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="tc-tier-label" style={{ color: tier.accentColor }}>Benefits:</div>
                    <ul className="tc-tier-list" style={{ marginBottom: 0 }}>
                      {tier.benefits.map((b) => (
                        <li key={b} className="tc-tier-item">
                          <CheckIcon color={tier.accentColor} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── APPLICATION FORM ── */}
        <div ref={formRef} className="tc-form-section">
          <div className="tc-container">
            <h2 className="tc-form-title">Partner Application Form</h2>
            <p className="tc-form-sub">Fill out the form below to start your journey as a Tally Connect partner</p>

            <div className="tc-form-card">
              <form onSubmit={handleSubmit}>

                {/* Company Information */}
                <div className="tc-form-section-label">Company Information</div>
                <div className="tc-form-grid">
                  <div className="tc-form-group">
                    <label className="tc-form-label">Company Name<span className="tc-form-req">*</span></label>
                    <input className="tc-input" type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Acme Solutions Pvt. Ltd." required />
                  </div>
                  <div className="tc-form-group">
                    <label className="tc-form-label">Country<span className="tc-form-req">*</span></label>
                    <input className="tc-input" type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" required />
                  </div>
                  <div className="tc-form-group">
                    <label className="tc-form-label">City<span className="tc-form-req">*</span></label>
                    <input className="tc-input" type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Mumbai" required />
                  </div>
                </div>
                <div className="tc-form-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 0 }}>
                  <div className="tc-form-group" style={{ gridColumn: "1 / span 1" }}>
                    <label className="tc-form-label">Website</label>
                    <input className="tc-input" type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://yourcompany.com" />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="tc-form-section-label" style={{ marginTop: 28 }}>Contact Information</div>
                <div className="tc-form-grid">
                  <div className="tc-form-group">
                    <label className="tc-form-label">Contact Person<span className="tc-form-req">*</span></label>
                    <input className="tc-input" type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="e.g. Rahul Sharma" required />
                  </div>
                  <div className="tc-form-group">
                    <label className="tc-form-label">Email Address<span className="tc-form-req">*</span></label>
                    <input className="tc-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@company.com" required />
                  </div>
                  <div className="tc-form-group">
                    <label className="tc-form-label">Phone Number<span className="tc-form-req">*</span></label>
                    <input className="tc-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                  </div>
                </div>

                {/* Business Details */}
                <div className="tc-form-section-label" style={{ marginTop: 28 }}>Business Details</div>
                <div className="tc-form-grid">
                  <div className="tc-form-group">
                    <label className="tc-form-label">Business Type<span className="tc-form-req">*</span></label>
                    <select className="tc-select" name="businessType" value={formData.businessType} onChange={handleChange} required>
                      <option value="">Select type</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Reseller">Reseller</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="tc-form-group">
                    <label className="tc-form-label">Years in Business<span className="tc-form-req">*</span></label>
                    <select className="tc-select" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} required>
                      <option value="">Select range</option>
                      <option value="0-1">0–1 years</option>
                      <option value="1-3">1–3 years</option>
                      <option value="3-5">3–5 years</option>
                      <option value="5-10">5–10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div className="tc-form-group">
                    <label className="tc-form-label">Number of Employees<span className="tc-form-req">*</span></label>
                    <select className="tc-select" name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} required>
                      <option value="">Select range</option>
                      <option value="1-10">1–10</option>
                      <option value="11-50">11–50</option>
                      <option value="51-200">51–200</option>
                      <option value="201-500">201–500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>
                <div className="tc-form-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <div className="tc-form-group">
                    <label className="tc-form-label">Existing Clients</label>
                    <input className="tc-input" type="number" name="existingClients" value={formData.existingClients} onChange={handleChange} placeholder="e.g. 25" />
                  </div>
                </div>

                {/* Partnership Details */}
                <div className="tc-form-section-label" style={{ marginTop: 28 }}>Partnership Details</div>
                <div className="tc-form-grid-2">
                  <div className="tc-form-group">
                    <label className="tc-form-label">Join As<span className="tc-form-req">*</span></label>
                    <select className="tc-select" name="joinAs" value={formData.joinAs} onChange={handleChange} required>
                      <option value="">Select partner type</option>
                      <option value="channel_partner">Channel Partner</option>
                      <option value="distributor">Distributor</option>
                    </select>
                  </div>
                </div>
                <div className="tc-form-group" style={{ marginBottom: 8 }}>
                  <label className="tc-form-label">Why do you want to become a partner?</label>
                  <textarea className="tc-textarea" name="whyPartner" value={formData.whyPartner} onChange={handleChange} rows={4} placeholder="Tell us about your goals, experience, and what makes your company a great fit..." />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, marginTop: 24 }}>
                  <button type="submit" className="tc-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin" style={{ width: 16, height: 16 }} viewBox="0 0 24 24">
                          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : "Submit Application"}
                  </button>
                  <p className="tc-form-note">By submitting this form, you agree to our terms and conditions</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}