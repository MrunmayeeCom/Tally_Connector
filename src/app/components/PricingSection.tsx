import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onPlanSelect: (
    plan: string,
    billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly"
  ) => void;
  onContactSales?: () => void;
  onBuyNow?: (
    plan: string,
    billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly"
  ) => void;
}

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

interface Plan {
  licenseType: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "quarterly" | "half-yearly" | "yearly";
  features: { featureSlug: string; uiLabel: string }[];
  popular: boolean;
  isFree: boolean;
  isEnterprise: boolean;
  icon: any;
  color: string;
}

const PLAN_ORDER: Record<string, number> = {
  starter: 1, professional: 2, business: 3, enterprise: 4,
};

const PLAN_UI_META: Record<string, { icon: any; popular?: boolean; color: string }> = {
  starter:      { icon: Star,     color: "from-gray-600 to-gray-700" },
  professional: { icon: Zap,      color: "from-cyan-500 to-blue-600", popular: true },
  business:     { icon: Sparkles, color: "from-blue-600 to-indigo-600" },
  enterprise:   { icon: Crown,    color: "from-purple-600 to-pink-600" },
};

const BILLING_TABS: { label: string; value: BillingCycle; discount: string }[] = [
  { label: "Monthly",     value: "monthly",     discount: "" },
  { label: "Quarterly",   value: "quarterly",   discount: "-5%" },
  { label: "Half Yearly", value: "half-yearly", discount: "-10%" },
  { label: "Yearly",      value: "yearly",      discount: "-20%" },
];

export function PricingSection({ onPlanSelect, onContactSales, onBuyNow }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const getPrice = (plan: Plan) => {
    if (plan.isFree) return 0;
    if (billingCycle === "monthly")     return plan.price;
    if (billingCycle === "quarterly")   return plan.price * 3 * 0.95;
    if (billingCycle === "half-yearly") return plan.price * 6 * 0.90;
    return plan.price * 12 * 0.8;
  };

  const getBillingText = () => {
    if (billingCycle === "monthly")     return "/user/month";
    if (billingCycle === "quarterly")   return "/user/quarter";
    if (billingCycle === "half-yearly") return "/user/6 months";
    return "/year";
  };

  const getDiscountText = () => {
    if (billingCycle === "quarterly")   return "Save 5%";
    if (billingCycle === "half-yearly") return "Save 10%";
    if (billingCycle === "yearly")      return "Save 20%";
    return "";
  };

  const handlePlanClick = (plan: Plan) => {
    if (plan.isEnterprise) {
      onContactSales?.();
    } else {
      const user = localStorage.getItem("user");
      if (user && onBuyNow) {
        onBuyNow(plan.licenseType, billingCycle);
      } else {
        onPlanSelect(plan.licenseType, billingCycle);
      }
    }
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(
          "https://lisence-system.onrender.com/api/license/public/licenses-by-product/695902cfc240b17f16c3d716",
          { headers: { "x-api-key": "my-secret-key-123" } }
        );
        const data = await res.json();
        const licenses = data.licenses || data.data || data || [];

        const mapped: Plan[] = licenses
          .map((lic: any) => {
            const lt = lic.licenseTypeId || lic.licenseType;
            if (!lt) return null;
            const key = lt.name?.toLowerCase();
            const meta = PLAN_UI_META[key] || {};
            return {
              licenseType: lt._id,
              name: lt.name,
              description: lt.description ?? `Best for ${lt.name} users`,
              price: lt.price?.amount ?? 0,
              billingPeriod: lt.price?.billingPeriod ?? "monthly",
              features: lt.features ?? [],
              popular: meta.popular ?? false,
              isFree: (lt.price?.amount ?? 0) === 0,
              isEnterprise: lt.name.toLowerCase() === "enterprise",
              icon: meta.icon || Star,
              color: meta.color || "from-gray-600 to-gray-700",
            };
          })
          .filter(Boolean);

        mapped.sort(
          (a, b) =>
            (PLAN_ORDER[a.name.toLowerCase()] ?? 99) -
            (PLAN_ORDER[b.name.toLowerCase()] ?? 99)
        );
        setPlans(mapped);
      } catch (err) {
        console.error("Failed to load Tally Connector plans", err);
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  return (
    <>
      {/* Gray scrollbar styles */}
      <style>{`
        .gray-scrollbar::-webkit-scrollbar { width: 8px; }
        .gray-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .gray-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        .gray-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>

      <section id="pricing" className="pt-10 pb-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-8 text-gray-900">Pricing</h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {BILLING_TABS.map((tab, index) => (
                <motion.button
                  key={tab.value}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setBillingCycle(tab.value)}
                  className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                    billingCycle === tab.value
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                  {tab.discount && (
                    <span className={`ml-2 text-xs font-semibold ${billingCycle === tab.value ? "text-white" : "text-green-600"}`}>
                      {tab.discount}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {loading && <p className="text-center text-gray-500 mb-8">Loading plans...</p>}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.licenseType}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative rounded-3xl p-6 bg-white shadow-xl hover:shadow-2xl transition-all ${
                  plan.popular ? "ring-4 ring-cyan-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg whitespace-nowrap">
                      <Star className="w-4 h-4 fill-white" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${plan.color} text-white text-xs font-semibold mb-2`}>
                    {plan.name}
                  </div>
                  <p className="text-gray-600 text-xs mb-3">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.isFree ? "Free" : `₹${getPrice(plan).toLocaleString()}`}
                    </span>
                    {!plan.isFree && (
                      <span className="text-gray-600 text-xs">{getBillingText()}</span>
                    )}
                  </div>
                  {!plan.isFree && !plan.isEnterprise && getDiscountText() && (
                    <p className="text-xs text-green-600 mt-1">{getDiscountText()}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlanClick(plan)}
                  className={`w-full py-2 rounded-xl font-semibold text-sm mb-4 transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.isFree
                    ? "Get Started Free"
                    : plan.isEnterprise
                    ? "Contact Sales"
                    : "Buy Now"}
                </motion.button>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 text-xs mb-2">Includes:</p>
                  <div className="max-h-64 overflow-y-auto pr-2 space-y-2 gray-scrollbar">
                    {plan.features.map((feature) => (
                      <div key={feature.featureSlug} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className={`w-3 h-3 mt-0.5 flex-shrink-0 bg-gradient-to-r ${plan.color} text-white rounded-full p-0.5`} />
                        <span>{feature.uiLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default PricingSection;