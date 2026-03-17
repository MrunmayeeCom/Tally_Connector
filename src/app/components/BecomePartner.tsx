import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { TrendingUp, GraduationCap, Award, Briefcase, Target, Zap, CheckCircle, AlertCircle, X } from "lucide-react";
import { submitPartnerApplication } from "../api/partnerProgram";

// ── TOAST PORTAL ──────────────────────────────────────────────────────────────
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

// ── REUSABLE FIELD WRAPPER ────────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
  colSpan2,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  colSpan2?: boolean;
}) {
  return (
    <div className={colSpan2 ? "col-span-2" : ""}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── BECOME PARTNER PAGE ───────────────────────────────────────────────────────
export default function BecomePartner() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState<"become" | "directory">("become");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    city: "",
    businessType: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    existingClients: "",
    joinAs: "",
    whyPartner: "",
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        contactInformation: {
          fullName: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
        },
        companyInformation: {
          companyName: formData.companyName,
          website: formData.website || "",
          country: formData.country,
          city: formData.city,
        },
        businessDetails: {
          businessType: formData.businessType,
          yearsInBusiness: formData.yearsInBusiness,
          numberOfEmployees: formData.numberOfEmployees,
          existingClients: Number(formData.existingClients) || 0,
        },
        partnershipDetails: {
          joinAs: formData.joinAs,
          motivation: formData.whyPartner,
        },
        source: "tally",
      };
      await submitPartnerApplication(payload);

      showToast("Application submitted! Our team will get back to you within 2 business days.", "success");

      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        city: "",
        businessType: "",
        yearsInBusiness: "",
        numberOfEmployees: "",
        existingClients: "",
        joinAs: "",
        whyPartner: "",
      });
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to submit application. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: TrendingUp, title: "Revenue Growth", description: "Unlock new recurring revenue streams through implementation services, upselling opportunities, and long-term client partnerships powered by Tally Connect." },
    { icon: GraduationCap, title: "Training & Certification", description: "Gain access to structured training programs, expert-led sessions, and official certifications to strengthen your technical and consulting capabilities." },
    { icon: Award, title: "Partner Tiers", description: "Advance through Bronze, Silver, and Gold partnership levels based on performance, unlocking exclusive incentives and recognition." },
    { icon: Briefcase, title: "Business Support", description: "Receive dedicated success guidance, onboarding assistance, and growth strategy support tailored to your business goals." },
    { icon: Target, title: "Marketing Resources", description: "Access co-branded marketing materials, campaign support, and promotional opportunities to expand your market presence." },
    { icon: Zap, title: "Priority Support", description: "Get fast-track technical assistance, priority issue resolution, and direct access to specialized support teams." },
  ];

  const inputClass = "w-full border border-gray-200 text-sm p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white text-gray-800 placeholder-gray-300";
  const selectClass = `${inputClass} text-gray-800`;

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="relative min-h-screen font-[Inter] overflow-hidden">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#831843]"></div>

        {/* Content */}
        <div className="relative z-10 pt-24 pb-20">

          {/* HERO SECTION */}
          <div className="text-center px-6 mb-2 flex justify-center">
            <div className="rounded-3xl px-14 py-4 max-w-6xl">
              <h2 className="text-5xl md:text-6xl font-extrabold italic text-gray-200 tracking-wide">
                Become a Tally Connect Partner
              </h2>
              <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join our network of trusted partners and grow your business with Tally Connect
              </p>
            </div>
          </div>

          <div className="mt-6 mb-4 flex justify-center gap-6 flex-wrap"></div>

          <div className="max-w-6xl mx-auto px-6 space-y-10">
            {activeTab === "become" && (
              <div className="max-w-7xl mx-auto space-y-10">

                {/* PARTNER ADVANTAGES */}
                <div className="text-center mb-12">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-6 shadow-xl max-w-6xl mx-auto">
                    <h2 className="text-4xl font-semibold text-teal-300 mb-10">Partner Advantages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {benefits.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/10 p-3 rounded-xl border border-white/20 text-center backdrop-blur-md"
                        >
                          <item.icon className="w-6 h-6 mx-auto mb-2 text-teal-300" />
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="mt-1 text-xs text-gray-300 leading-relaxed">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TIERS + FORM SECTION */}
                <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-8 items-start">

                  {/* LEFT - TIERS */}
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-3xl md:text-4xl font-semibold">
                        <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                          Partnership Tiers
                        </span>
                      </h2>
                      <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
                      <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
                        Choose the partnership level that matches your business goals
                      </p>
                    </div>

                    <div className="space-y-4 max-w-xl mx-auto">
                      {/* GOLD */}
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl text-white flex overflow-hidden shadow-lg">
                        <div className="w-[35%] flex flex-col items-center justify-center bg-black/10 gap-3">
                          <Award className="w-12 h-12 text-white" />
                          <h3 className="font-bold text-lg">Gold Partner</h3>
                        </div>
                        <div className="w-[65%] p-5">
                          <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
                          <ul className="text-xs space-y-1 mb-3">
                            <li>✔ Expert certification</li>
                            <li>✔ 30+ implementations</li>
                            <li>✔ Premium revenue target</li>
                          </ul>
                          <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
                          <ul className="text-xs space-y-1">
                            <li>✔ All Silver benefits</li>
                            <li>✔ Dedicated success manager</li>
                            <li>✔ Featured listing</li>
                          </ul>
                        </div>
                      </div>

                      {/* SILVER */}
                      <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl text-white flex overflow-hidden shadow-lg">
                        <div className="w-[35%] flex flex-col items-center justify-center bg-black/10 gap-3">
                          <Target className="w-12 h-12 text-white" />
                          <h3 className="font-bold text-lg">Silver Partner</h3>
                        </div>
                        <div className="w-[65%] p-5">
                          <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
                          <ul className="text-xs space-y-1 mb-3">
                            <li>✔ Advanced certification</li>
                            <li>✔ 15+ implementations</li>
                            <li>✔ Higher revenue target</li>
                          </ul>
                          <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
                          <ul className="text-xs space-y-1">
                            <li>✔ All Bronze benefits</li>
                            <li>✔ Priority support</li>
                            <li>✔ Co-marketing opportunities</li>
                          </ul>
                        </div>
                      </div>

                      {/* BRONZE */}
                      <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl text-white flex overflow-hidden shadow-lg">
                        <div className="w-[35%] flex flex-col items-center justify-center bg-black/10 gap-3">
                          <Briefcase className="w-12 h-12 text-white" />
                          <h3 className="font-bold text-lg">Bronze Partner</h3>
                        </div>
                        <div className="w-[65%] p-5">
                          <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
                          <ul className="text-xs space-y-1 mb-3">
                            <li>✔ Basic certification</li>
                            <li>✔ 5+ implementations</li>
                            <li>✔ Annual revenue target</li>
                          </ul>
                          <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
                          <ul className="text-xs space-y-1">
                            <li>✔ Partner badge</li>
                            <li>✔ Marketing materials</li>
                            <li>✔ Technical support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT - FORM */}
                  <div className="bg-white text-black rounded-3xl p-10 shadow-2xl">
                    <h2 className="text-2xl font-semibold mb-1 text-center">
                      Partner Application Form
                    </h2>
                    <p className="text-xs text-gray-400 text-center mb-8">
                      Fields marked with <span className="text-red-500 font-semibold">*</span> are required
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">

                      {/* ── Section: Company Information ── */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 border-b border-gray-100 pb-2 mb-4">
                          Company Information
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                          <Field label="Company Name" required colSpan2>
                            <input
                              name="companyName" placeholder="e.g. Acme Solutions Pvt. Ltd."
                              required value={formData.companyName} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Website">
                            <input
                              name="website" placeholder="e.g. https://yourcompany.com"
                              value={formData.website} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Country" required>
                            <input
                              name="country" placeholder="e.g. India"
                              required value={formData.country} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                          <Field label="City" required>
                            <input
                              name="city" placeholder="e.g. Mumbai"
                              required value={formData.city} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* ── Section: Contact Information ── */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 border-b border-gray-100 pb-2 mb-4">
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                          <Field label="Contact Person" required colSpan2>
                            <input
                              name="contactPerson" placeholder="e.g. Rahul Sharma"
                              required value={formData.contactPerson} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Email Address" required>
                            <input
                              name="email" type="email" placeholder="e.g. rahul@company.com"
                              required value={formData.email} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Phone Number" required>
                            <input
                              name="phone" placeholder="e.g. +91 98765 43210"
                              required value={formData.phone} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* ── Section: Business Details ── */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 border-b border-gray-100 pb-2 mb-4">
                          Business Details
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                          <Field label="Business Type" required colSpan2>
                            <select name="businessType" value={formData.businessType} onChange={handleChange} className={selectClass}>
                              <option value="">Select business type</option>
                              <option value="Technology">Technology</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Finance">Finance</option>
                              <option value="Consulting">Consulting</option>
                              <option value="Reseller">Reseller</option>
                              <option value="Other">Other</option>
                            </select>
                          </Field>
                          <Field label="Years in Business" required>
                            <select name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} className={selectClass}>
                              <option value="">Select range</option>
                              <option value="0-1">0–1 years</option>
                              <option value="1-3">1–3 years</option>
                              <option value="3-5">3–5 years</option>
                              <option value="5-10">5–10 years</option>
                              <option value="10+">10+ years</option>
                            </select>
                          </Field>
                          <Field label="Number of Employees" required>
                            <select name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} className={selectClass}>
                              <option value="">Select range</option>
                              <option value="1-10">1–10</option>
                              <option value="11-50">11–50</option>
                              <option value="51-200">51–200</option>
                              <option value="201-500">201–500</option>
                              <option value="500+">500+</option>
                            </select>
                          </Field>
                          <Field label="Existing Clients">
                            <input
                              name="existingClients" placeholder="e.g. 25"
                              value={formData.existingClients} onChange={handleChange}
                              className={inputClass}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* ── Section: Partnership Details ── */}
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 border-b border-gray-100 pb-2 mb-4">
                          Partnership Details
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                          <Field label="Join As" required colSpan2>
                            <select name="joinAs" value={formData.joinAs} onChange={handleChange} className={selectClass}>
                              <option value="">Select partner type</option>
                              <option value="channel_partner">Channel Partner</option>
                              <option value="distributor">Distributor</option>
                            </select>
                          </Field>
                          <Field label="Why do you want to become a partner?" required colSpan2>
                            <textarea
                              name="whyPartner"
                              placeholder="Tell us about your goals, experience, and what makes your company a great fit..."
                              value={formData.whyPartner} onChange={handleChange}
                              className={`${inputClass} h-24 resize-none`}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting...
                          </>
                        ) : "Submit Application"}
                      </button>

                    </form>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "directory" && (
              <div className="space-y-16">
                <div className="text-center space-y-6">
                  <h2 className="text-4xl font-bold text-white">
                    Tally Connect Partners can help you create and manage your business!
                  </h2>
                  <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Our partners are there to make your Tally Connect experience more pleasant and productive –
                    from choosing a subscription plan to product implementation, customization, and employee training.
                    Tally Connect partners can also help you set up an integration with a third-party app or service.
                    Browse our Partner Directory to find a Tally Connect partner in your area and contact them directly
                    or use the form below to get a price estimate for your Tally Connect implementation project.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-10 py-12 shadow-2xl text-center">
                  <h3 className="text-3xl font-semibold text-teal-300 mb-12">
                    Why Become a Tally Connect Partner?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                      <h4 className="text-white font-semibold">Grow Your Business</h4>
                      <p className="text-gray-300 text-sm mt-2">Access new markets and revenue streams</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Expert Training</h4>
                      <p className="text-gray-300 text-sm mt-2">Comprehensive partner training programs</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Marketing Support</h4>
                      <p className="text-gray-300 text-sm mt-2">Co-marketing opportunities and materials</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Partner Recognition</h4>
                      <p className="text-gray-300 text-sm mt-2">Bronze, Silver, and Gold partner tiers</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}