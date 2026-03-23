import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { createCustomerSupport } from "../api/customerSupport";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "tally_service1";
const EMAILJS_USER_TEMPLATE_ID = "template_chn5yuz";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_dm77nkd";
const EMAILJS_PUBLIC_KEY = "IFjcViXLpqqHwzIu7";

const mapInquiryType = (type: string) => {
  switch (type) {
    case "support": return "TECHNICAL_SUPPORT";
    case "sales": return "SALES_INQUIRY";
    case "billing": return "BILLING_QUESTION";
    case "demo": return "DEMO_REQUEST";
    case "feature": return "FEATURE_REQUEST";
    case "bug": return "BUG_REPORT";
    case "custom": return "ENTERPRISE_CUSTOM_PLAN";
    default: return "OTHER";
  }
};

// ── TOAST ─────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

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
            <button
              onClick={() => onRemove(toast.id)}
              className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
            >
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
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    type: "support",
  });
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      companyName: formData.company,
      inquiryType: mapInquiryType(formData.type),
      subject: formData.subject,
      message: formData.message,
      source: "TALLY",
    } as const;

    try {
      await createCustomerSupport(payload);

      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone || "Not provided",
        user_company: formData.company || "Not provided",
        inquiry_type: mapInquiryType(formData.type),
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_USER_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

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

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="relative min-h-screen font-[Inter] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#831843]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-16 pt-28 pb-6">
          <div className="mb-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 text-center shadow-2xl w-full">
              <h1 className="text-4xl font-bold text-teal-300 mb-4 tracking-tight">Contact Support</h1>
              <p className="text-sm text-white/80 leading-relaxed">
                Our dedicated support team is here to assist you with any questions regarding Tally Connect solutions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-md border border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-teal-400 transition-all duration-300">
                <h3 className="font-semibold text-base mb-3">Customer Support</h3>
                <p className="text-xs text-gray-600 mb-1">Email: info@averlonworld.com</p>
                <p className="text-xs text-gray-600 mb-1">Phone: +91 9892440788</p>
                <p className="text-xs text-gray-600">24/7 Support Available</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md border border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-blue-400 transition-all duration-300">
                <h3 className="font-semibold text-base mb-3">Sales Inquiries</h3>
                <p className="text-xs text-gray-600 mb-1">Email: info@averlonworld.com</p>
                <p className="text-xs text-gray-600 mb-1">Phone: +91 9892440788</p>
                <p className="text-xs text-gray-600">Mon-Fri: 9AM - 6PM PST</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md border border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-purple-400 transition-all duration-300">
                <h3 className="font-semibold text-base mb-3">Office Location</h3>
                <p className="text-xs text-gray-600">
                  5th Floor, Lodha Supremus - II, Phase - II, Unit No, A. 507, Road No. 22, Wagle Industrial Estate, Thane West, Maharashtra 400604
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-lg border border-transparent hover:shadow-2xl hover:border-teal-400 transition-all duration-300">
              <h2 className="text-lg font-semibold mb-2">Send us a Message</h2>
              <p className="text-xs text-gray-500 mb-5">
                Fill out the form below and our support team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="border text-sm p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none" />
                  <input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="border text-sm p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none" />
                  <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border text-sm p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none" />
                  <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} className="border text-sm p-2 rounded focus:ring-2 focus:ring-teal-400 outline-none" />
                </div>

                <select name="type" value={formData.type} onChange={handleChange} required className="w-full border text-sm p-2 rounded mb-4 focus:ring-2 focus:ring-teal-400 outline-none">
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="billing">Billing Question</option>
                  <option value="demo">Demo Request</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="custom">Enterprise Custom Plan</option>
                  <option value="other">Other</option>
                </select>

                <input name="subject" placeholder="Subject *" value={formData.subject} onChange={handleChange} required className="w-full border text-sm p-2 rounded mb-4 focus:ring-2 focus:ring-teal-400 outline-none" />

                <textarea name="message" placeholder="Please describe your inquiry in detail..." value={formData.message} onChange={handleChange} required className="w-full border text-sm p-2 rounded mb-6 h-28 focus:ring-2 focus:ring-teal-400 outline-none"></textarea>

                <div className="flex gap-4">
                  <button type="submit" disabled={loading} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm py-2 rounded transition disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? "Submitting..." : "Send Message"}
                  </button>
                  <button type="button" onClick={handleCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-sm py-2 rounded transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}