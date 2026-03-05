import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Users,
  ShieldCheck,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { purchaseLicense } from "../api/license";
import { createOrder, verifyPayment } from "../api/payment";
import { checkCustomerExists, syncCustomer } from "../api/customerSync";
import { loadRazorpay } from "../../utils/loadRazorpay";
import { getStoredUser } from "../api/auth";

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

interface CheckoutPageProps {
  selectedPlan: string;
  initialBillingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly";
  onBack: () => void;
  onProceedToPayment: (
    billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly",
    formData: any,
  ) => void;
}

export function CheckoutPage({
  selectedPlan,
  initialBillingCycle,
  onBack,
  onProceedToPayment,
}: CheckoutPageProps) {
  const navigate = useNavigate();

  const loggedInUser = getStoredUser();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
  });

  const [lmsPlan, setLmsPlan] = useState<{
    licenseId: string;
    planName: string;
    pricePerUser: number;
    includedUsers: number;
    discountConfig: {
      monthly: number;
      quarterly: number;
      "half-yearly": number;
      yearly: number;
    };
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const getMonthlyBaseCost = () => {
    if (!lmsPlan) return 0;
    return lmsPlan.pricePerUser * lmsPlan.includedUsers;
  };

  const getSubtotal = () => {
    const monthlyBase = getMonthlyBaseCost();
    if (billingCycle === "monthly") return monthlyBase;
    if (billingCycle === "quarterly") return monthlyBase * 3;
    if (billingCycle === "half-yearly") return monthlyBase * 6;
    return monthlyBase * 12;
  };

  const getDiscount = () => {
    if (!lmsPlan) return 0;
    const subtotal = getSubtotal();
    const pct = lmsPlan.discountConfig?.[billingCycle] ?? 0;
    return subtotal * (pct / 100);
  };

  const getPriceAfterDiscount = () => getSubtotal() - getDiscount();
  const getTax = () => getPriceAfterDiscount() * 0.18;
  const getTotal = () => getPriceAfterDiscount() + getTax();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lmsPlan) { alert("Plan not loaded"); return; }
    try {
      if (lmsPlan.pricePerUser === 0) {
        const purchaseRes = await purchaseLicense({
          name: formData.companyName,
          email: loggedInUser.email,
          licenseId: lmsPlan.licenseId,
          billingCycle: "monthly",
          amount: 0,
          currency: "INR",
        });
        const data = purchaseRes.data || purchaseRes;
        const transactionId = data?.transactionId || "free-plan";
        navigate(`/payment-success?txn=${transactionId}&plan=${encodeURIComponent(lmsPlan.planName)}&free=true`);
        return;
      }
      const purchaseRes = await purchaseLicense({
        name: formData.companyName,
        email: loggedInUser.email,
        licenseId: lmsPlan.licenseId,
        billingCycle: billingCycle,
        amount: getTotal(),
        currency: "INR",
      });
      const data = purchaseRes.data || purchaseRes;
      if (!data?.transactionId || !data?.userId) throw new Error("Transaction data missing from LMS");
      const { transactionId, userId } = data;
      const order = await createOrder({ userId, licenseId: lmsPlan.licenseId, billingCycle, amount: getTotal() * 100 });
      if (!order?.orderId) throw new Error("Failed to create Razorpay order");
      const loaded = await loadRazorpay();
      if (!loaded) { alert("Failed to load Razorpay"); return; }
      const rzp = new (window as any).Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "TallyConnect",
        prefill: { name: formData.companyName, email: loggedInUser.email, contact: formData.phone },
        handler: async (response: any) => {
          try {
            await verifyPayment({
              transactionId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate(`/payment-success?txn=${transactionId}&plan=${encodeURIComponent(selectedPlan)}&cycle=${billingCycle}`);
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            alert("Payment verification failed. Please contact support with transaction ID: " + transactionId);
          }
        },
        modal: { ondismiss: () => { console.log("Payment cancelled by user"); } },
        theme: { color: "#2563eb" },
      });
      rzp.open();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Something went wrong. Please try again.";
      alert(message);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getBillingText = () => {
    switch (billingCycle) {
      case "monthly": return "Monthly";
      case "quarterly": return "Quarterly";
      case "half-yearly": return "Half-Yearly";
      case "yearly": return "Yearly";
    }
  };

  const getSavingsPercent = () => lmsPlan?.discountConfig?.[billingCycle] ?? 0;

  const getBillingPeriod = () => {
    switch (billingCycle) {
      case "monthly": return "1 month";
      case "quarterly": return "3 months";
      case "half-yearly": return "6 months";
      case "yearly": return "12 months";
    }
  };

  useEffect(() => {
    if (!loggedInUser?.email) return;
    setFormData((prev) => ({ ...prev, email: loggedInUser.email }));
  }, [loggedInUser?.email]);

  useEffect(() => {
    const loadPlanFromLMS = async () => {
      try {
        const res = await fetch(
          "https://lisence-system.onrender.com/api/license/public/licenses-by-product/695902cfc240b17f16c3d716",
          { headers: { "x-api-key": "my-secret-key-123" } },
        );
        const data = await res.json();
        const matched = data.licenses.find((lic: any) => lic?.licenseType?._id === selectedPlan);
        if (!matched) throw new Error("Selected plan not found in LMS");

        let userCount = 1;
        const rawFeatures = matched.licenseType.features || [];

        if (Array.isArray(rawFeatures)) {
          const userFeatures = [];
          for (const feature of rawFeatures) {
            if (typeof feature === "object") {
              const label = (feature.uiLabel || feature.displayName || "").toLowerCase();
              const key = (feature.featureKey || "").toLowerCase();
              const slug = (feature.featureSlug || "").toLowerCase();
              const value = feature.limitValue ?? feature.value;
              if (feature.featureType === "limit" && typeof value === "number") {
                const isUserFeature = slug === "user-limit" || key === "user-limit" || slug.includes("user") || key.includes("user") || key.includes("seat") || slug.includes("seat") || label.includes("user") || label.includes("seat") || (label.includes("includes") && label.includes("user"));
                if (isUserFeature) {
                  userFeatures.push({ key: slug || key || label, value, priority: slug === "user-limit" || key === "user-limit" || slug === "users" || key === "users" ? 1 : 2 });
                }
              }
            } else if (typeof feature === "string") {
              const match = feature.match(/(\d+)\s*users?/i);
              if (match) userFeatures.push({ key: "string-match", value: parseInt(match[1]), priority: 1 });
            }
          }
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => a.priority !== b.priority ? a.priority - b.priority : b.value - a.value);
            userCount = userFeatures[0].value;
          }
        } else if (typeof rawFeatures === "object" && rawFeatures !== null) {
          const userFeatures = [];
          for (const [slug, value] of Object.entries(rawFeatures)) {
            const slugLower = slug.toLowerCase();
            const isUserFeature = slugLower === "user-limit" || slugLower === "users" || slugLower === "user" || slugLower === "seats" || slugLower.includes("user-limit") || slugLower.includes("user-count") || (slugLower.includes("user") && !slugLower.includes("admin") && !slugLower.includes("panel"));
            if (isUserFeature && typeof value === "number" && value > 0) {
              userFeatures.push({ key: slug, value, priority: slugLower === "user-limit" || slugLower === "users" ? 1 : 2 });
            }
          }
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => a.priority !== b.priority ? a.priority - b.priority : b.value - a.value);
            userCount = userFeatures[0].value;
          }
        }

        setLmsPlan({
          licenseId: matched._id,
          planName: matched.licenseType.name,
          pricePerUser: matched.licenseType.price.amount,
          includedUsers: userCount,
          discountConfig: matched.licenseType.discountConfig || { monthly: 0, quarterly: 5, "half-yearly": 10, yearly: 20 },
        });
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
        {/* CHANGED: lighter gradient */}
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
    <div className="relative min-h-screen font-[Inter] overflow-hidden">
      {/* CHANGED: lighter gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a] via-[#2d2870] to-[#9d2060]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-12">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Plans
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
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input placeholder="Enter company name" value={formData.companyName} onChange={(e) => handleInputChange("companyName", e.target.value)} className={`${inputClass} pl-10`} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input type="email" value={formData.email} readOnly className={`${inputClass} pl-10 opacity-60 cursor-not-allowed`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className={`${inputClass} pl-10`} required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input placeholder="Street address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} className={`${inputClass} pl-10`} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>City *</label>
                    <input placeholder="City" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>State *</label>
                    <input placeholder="State" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Pincode *</label>
                    <input placeholder="400001" value={formData.pincode} onChange={(e) => handleInputChange("pincode", e.target.value)} className={inputClass} required />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>GST Number (Optional)</label>
                  <input placeholder="22AAAAA0000A1Z5" value={formData.gstNumber} onChange={(e) => handleInputChange("gstNumber", e.target.value)} className={inputClass} />
                </div>

                <div className="pt-2 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all text-sm">
                    <CreditCard className="w-4 h-4" />
                    Proceed to Payment
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
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Users className="w-3.5 h-3.5" />
                  <span>Includes {lmsPlan.includedUsers} users</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-white/50 mb-2">Billing Cycle</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {BILLING_CYCLES.map((cycle) => {
                    const pct = lmsPlan.discountConfig?.[cycle] ?? 0;
                    const active = billingCycle === cycle;
                    return (
                      <button key={cycle} type="button" onClick={() => setBillingCycle(cycle)}
                        className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${active ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
                        {CYCLE_LABELS[cycle]}
                        {pct > 0 && <span className="ml-1 text-green-400">-{pct}%</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/10" />

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Price per user/month</span>
                  <span className="text-white">₹{lmsPlan.pricePerUser.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Number of users</span>
                  <span className="text-white">×{lmsPlan.includedUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Billing period</span>
                  <span className="text-white">{getBillingPeriod()}</span>
                </div>
                <div className="border-t border-white/10 pt-2.5 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white">₹{getSubtotal().toLocaleString("en-IN")}</span>
                  </div>
                  {getSavingsPercent() > 0 && (
                    <div className="flex justify-between text-green-400 font-medium">
                      <span>Discount ({getSavingsPercent()}%)</span>
                      <span>-₹{getDiscount().toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/50">GST (18%)</span>
                    <span className="text-white">₹{getTax().toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />

              <div className="flex justify-between items-baseline">
                <span className="text-white font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-pink-300">₹{getTotal().toLocaleString("en-IN")}</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  Secure payment processing
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                  Money-back guarantee
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <XCircle className="w-3.5 h-3.5 text-purple-400" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}