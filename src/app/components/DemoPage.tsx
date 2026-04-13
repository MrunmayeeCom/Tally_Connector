import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, AlertCircle, X, Mail, Phone, MapPin,
  Clock, Headphones, Building2, Send, MessageCircle, ArrowRight,
} from "lucide-react";
import { createCustomerSupport } from "../api/customerSupport";

// ── Email Middleware Config ───────────────────────────────────────────────────
const MIDDLEWARE_BASE_URL = "https://email-middleware-qyrt.onrender.com";
const MIDDLEWARE_API_KEY  = "averlon-mail-2026!";

const SUPPORT_EMAIL = "info@averlonworld.com"; // admin recipient

async function sendSupportEmail(payload: {
  userName: string;
  userEmail: string;
  userPhone: string;
  userCompany: string;
  inquiryType: string;
  subject: string;
  message: string;
}) {
  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": MIDDLEWARE_API_KEY,
  };

  // 1. Confirmation email to user
  const userHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
      <div style="background:linear-gradient(135deg,#0f2044,#0d7a8a);padding:32px 40px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">We've received your message</h1>
        <p style="color:#a5f3fc;margin:8px 0 0;font-size:14px">Tally Connect Support</p>
      </div>
      <div style="background:#f8fafc;padding:32px 40px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none">
        <p style="margin:0 0 16px">Hi <strong>${payload.userName}</strong>,</p>
        <p style="margin:0 0 24px;color:#475569">Thanks for reaching out! Our support team will get back to you within <strong>24 hours</strong>.</p>
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:24px">
          <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em">Your submission</p>
          <table style="width:100%;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#64748b;width:120px">Type</td><td style="color:#1e293b;font-weight:600">${payload.inquiryType}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Subject</td><td style="color:#1e293b;font-weight:600">${payload.subject}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;vertical-align:top">Message</td><td style="color:#1e293b">${payload.message}</td></tr>
          </table>
        </div>
        <p style="margin:0;font-size:13px;color:#94a3b8">— Tally Connect Support Team</p>
      </div>
    </div>`;

  // 2. Admin notification email
  const adminHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
      <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:18px">🔔 New Support Request</h1>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none">
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#64748b;width:130px">Name</td><td style="color:#1e293b;font-weight:600">${payload.userName}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="color:#1e293b">${payload.userEmail}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="color:#1e293b">${payload.userPhone || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Company</td><td style="color:#1e293b">${payload.userCompany || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Type</td><td style="color:#1e293b;font-weight:600">${payload.inquiryType}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Subject</td><td style="color:#1e293b;font-weight:600">${payload.subject}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Message</td><td style="color:#1e293b">${payload.message}</td></tr>
        </table>
      </div>
    </div>`;

  await Promise.all([
    // confirmation to user
    fetch(`${MIDDLEWARE_BASE_URL}/send-email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        to: payload.userEmail,
        subject: `We received your request: ${payload.subject}`,
        html: userHtml,
      }),
    }),
    // notification to admin
    fetch(`${MIDDLEWARE_BASE_URL}/send-email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        to: SUPPORT_EMAIL,
        subject: `[Tally Connect] New ${payload.inquiryType} from ${payload.userName}`,
        html: adminHtml,
      }),
    }),
  ]);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const mapInquiryType = (type: string) => {
  switch (type) {
    case "support": return "TECHNICAL_SUPPORT";
    case "sales":   return "SALES_INQUIRY";
    case "billing": return "BILLING_QUESTION";
    case "demo":    return "DEMO_REQUEST";
    case "feature": return "FEATURE_REQUEST";
    case "bug":     return "BUG_REPORT";
    case "custom":  return "ENTERPRISE_CUSTOM_PLAN";
    default:        return "OTHER";
  }
};

// ── TOAST ─────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error";
interface Toast { id: number; message: string; type: ToastType; }

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
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
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

// ── DEMO PAGE ─────────────────────────────────────────────────────────────────
export function DemoPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    subject: "", message: "", type: "support",
  });
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts]   = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const inquiryType = mapInquiryType(formData.type);

    try {
      // 1. Save to backend (existing API)
      await createCustomerSupport({
        fullName:    formData.name,
        email:       formData.email,
        phoneNumber: formData.phone,
        companyName: formData.company,
        inquiryType,
        subject:     formData.subject,
        message:     formData.message,
        source:      "TALLY",
      });

      // 2. Send emails via custom middleware
      await sendSupportEmail({
        userName:    formData.name,
        userEmail:   formData.email,
        userPhone:   formData.phone,
        userCompany: formData.company,
        inquiryType,
        subject:     formData.subject,
        message:     formData.message,
      });

      showToast("Thank you! Our support team will get back to you within 24 hours.", "success");
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "", type: "support" });
    } catch (error) {
      console.error(error);
      showToast("Failed to submit support request. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "", type: "support" });
  };

  // ── Contact channel cards ─────────────────────────────────────────────────
  const channels = [
    {
      icon: Headphones,
      title: "Customer Support",
      color: "text-teal-500",
      iconBg: "bg-teal-50 border-teal-100",
      border: "border-teal-100 hover:border-teal-300",
      details: [
        { icon: Mail,  text: "info@averlonworld.com" },
        { icon: Phone, text: "+91 9892440788" },
        { icon: Clock, text: "24/7 Support Available" },
      ],
    },
    {
      icon: Building2,
      title: "Sales Inquiries",
      color: "text-violet-500",
      iconBg: "bg-violet-50 border-violet-100",
      border: "border-violet-100 hover:border-violet-300",
      details: [
        { icon: Mail,  text: "info@averlonworld.com" },
        { icon: Phone, text: "+91 9892440788" },
        { icon: Clock, text: "Mon–Sat: 9:30 AM – 6:30 PM IST" },
      ],
    },
    {
      icon: MapPin,
      title: "Office Location",
      color: "text-emerald-500",
      iconBg: "bg-emerald-50 border-emerald-100",
      border: "border-emerald-100 hover:border-emerald-300",
      details: [
        { icon: MapPin, text: "5th Floor, Lodha Supremus – II, Phase – II, Unit No. A.515, Road No. 22, Wagle Industrial Estate, Thane West, Maharashtra 400604" },
      ],
    },
  ];

  const inputCls = "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-teal-400 focus:bg-white transition-all";
  const labelCls = "block text-[11px] font-semibold text-gray-500 mb-1.5";

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="min-h-screen font-[Inter]" style={{ background: "linear-gradient(160deg,#eaf6fb 0%,#f5f9ff 50%,#eaf6f8 100%)" }}>

        {/* ── Hero ── */}
        <div className="relative bg-gradient-to-br from-[#0f2044] via-[#0a3d5c] to-[#0d7a8a] pt-16 pb-24 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold mb-5 backdrop-blur-sm mt-10">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              We're here to help — Mon – Sat, 9:30 AM – 6:30 PM IST
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Get In Touch with
              <span className="text-cyan-300"> Tally Connect Support</span>
            </h1>
            <p className="text-sm text-blue-100 max-w-md mx-auto leading-relaxed">
              Our support team is ready to help you with any questions, technical issues, or sales inquiries.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8">

          {/* ── Channel Cards ── */}
          <div className="relative z-10 -mt-12 mb-14">
            <div className="grid md:grid-cols-3 gap-4">
              {channels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <div key={i} className={`bg-white rounded-2xl border ${ch.border} p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                    <div className={`w-10 h-10 rounded-xl border ${ch.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-4 h-4 ${ch.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">{ch.title}</h3>
                    <div className="space-y-2">
                      {ch.details.map((d, j) => {
                        const DIcon = d.icon;
                        return (
                          <div key={j} className="flex items-start gap-2 text-xs text-gray-500">
                            <DIcon className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{d.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-[11px] font-semibold text-gray-400 whitespace-nowrap">
              <Send className="w-3 h-3 text-teal-500" />
              Send a Message
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">Contact Support Form</h2>
            <p className="text-[11px] text-gray-400">Fill out the form below and our support team will get back to you within 24 hours</p>
          </div>

          {/* ── Form ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 mb-14">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name <span className="text-teal-500">*</span></label>
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email Address <span className="text-teal-500">*</span></label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98924 40788" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Company Name</label>
                  <input name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corporation" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Inquiry Type <span className="text-teal-500">*</span></label>
                  <div className="relative">
                    <select name="type" value={formData.type} onChange={handleChange} required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white transition-all appearance-none pr-8">
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="billing">Billing Question</option>
                      <option value="demo">Demo Request</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="custom">Enterprise Custom Plan</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Subject <span className="text-teal-500">*</span></label>
                  <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help you?" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Message <span className="text-teal-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4}
                  placeholder="Please describe your inquiry in detail..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-teal-400 focus:bg-white transition-all resize-none" />
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={handleCancel}
                  className="px-6 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2 px-7 py-2 rounded-xl bg-[#0d7a8a] hover:bg-[#0a6070] text-white text-xs font-bold transition-all hover:scale-105 shadow-md shadow-cyan-900/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                  <Send className="w-3.5 h-3.5" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* ── FAQ CTA ── */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2044] via-[#0a3d5c] to-[#0d7a8a] p-10 text-center mb-16 shadow-xl shadow-cyan-900/30">
            <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-300/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Looking for Quick Answers?</h3>
              <p className="text-xs text-cyan-100 mb-6 max-w-xs mx-auto leading-relaxed">
                Check out our FAQ section for instant answers to common questions about Tally Connect.
              </p>
              <button
                onClick={() => window.location.href = "/faqs"}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#0a3d5c] rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200">
                Visit FAQ Section
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}