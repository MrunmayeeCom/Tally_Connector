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

// Map plan gradient class → solid accent for CSS-based use
const PLAN_ACCENT: Record<string, { accent: string; bg: string; border: string; btnBg: string; btnShadow: string }> = {
  "from-gray-600 to-gray-700":    { accent: "#4B5563", bg: "#F9FAFB", border: "#E5E7EB", btnBg: "#4B5563", btnShadow: "rgba(75,85,99,0.25)" },
  "from-cyan-500 to-blue-600":    { accent: "#1A56DB", bg: "#EFF6FF", border: "#BFDBFE", btnBg: "#1A56DB", btnShadow: "rgba(26,86,219,0.28)" },
  "from-blue-600 to-indigo-600":  { accent: "#4338CA", bg: "#EEF2FF", border: "#C7D2FE", btnBg: "#4338CA", btnShadow: "rgba(67,56,202,0.25)" },
  "from-purple-600 to-pink-600":  { accent: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", btnBg: "#7C3AED", btnShadow: "rgba(124,58,237,0.25)" },
};

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .pr-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 50%, #F0F4FF 100%);
          padding: 64px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .pr-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1A56DB, #4338CA, #7C3AED);
        }

        .pr-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .pr-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .pr-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #1A56DB;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .pr-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 28px;
        }

        /* ── BILLING TABS ── */
        .pr-tabs {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          flex-wrap: wrap;
          justify-content: center;
          max-width: 100%;
        }
        .pr-tab {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 0.845rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          border: none;
          transition: all 0.18s ease;
          color: #64748B;
          background: transparent;
          flex: 1 1 calc(50% - 6px);
          min-width: calc(50% - 6px);
          box-sizing: border-box;
        }
        .pr-tab:hover { background: #F1F5F9; color: #374151; }
        .pr-tab.active {
          background: linear-gradient(145deg, #1A56DB, #0E3FA8);
          color: white;
          box-shadow: 0 3px 10px rgba(26,86,219,0.25);
        }
        .pr-tab-discount {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          background: #DCFCE7;
          color: #16A34A;
        }
        .pr-tab.active .pr-tab-discount {
          background: rgba(255,255,255,0.2);
          color: white;
        }

        /* ── LOADING ── */
        .pr-loading { text-align: center; color: #94A3B8; font-size: 0.9rem; margin-bottom: 32px; }

        /* ── GRID ── */
        .pr-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          align-items: start;
        }

        /* ── CARD ── */
        .pr-card {
          background: white;
          border: 1.5px solid #E5E7EB;
          border-radius: 20px;
          padding: 24px;
          position: relative;
          transition: all 0.22s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .pr-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }
        .pr-card.popular {
          border-color: #93C5FD;
          box-shadow: 0 4px 20px rgba(26,86,219,0.12);
        }
        .pr-popular-badge {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(145deg, #1A56DB, #0E3FA8);
          color: white;
          padding: 4px 14px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 3px 10px rgba(26,86,219,0.3);
          letter-spacing: 0.02em;
        }

        .pr-plan-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 7px;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
        }
        .pr-plan-desc {
          font-size: 0.8rem;
          color: #64748B;
          margin-bottom: 16px;
          line-height: 1.55;
        }
        .pr-price-row {
          margin-bottom: 4px;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .pr-price {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .pr-price-period {
          font-size: 0.77rem;
          color: #94A3B8;
          font-weight: 500;
        }
        .pr-discount-text {
          font-size: 0.75rem;
          color: #16A34A;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .pr-btn {
          width: 100%;
          padding: 10px 0;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          border: none;
          transition: all 0.18s ease;
          margin-bottom: 18px;
        }
        .pr-btn-primary {
          background: linear-gradient(145deg, #1A56DB, #0E3FA8);
          color: white;
          box-shadow: 0 3px 10px rgba(26,86,219,0.25);
        }
        .pr-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(26,86,219,0.35); }
        .pr-btn-default {
          background: #F1F5F9;
          color: #374151;
        }
        .pr-btn-default:hover { background: #E5E7EB; }

        .pr-features-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94A3B8;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .pr-features-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding-right: 4px;
        }
        .pr-features-list::-webkit-scrollbar { width: 4px; }
        .pr-features-list::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
        .pr-features-list::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        .pr-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.78rem;
          color: #374151;
          line-height: 1.4;
        }
        .pr-check {
          flex-shrink: 0;
          margin-top: 1px;
          width: 14px; height: 14px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #DCFCE7;
        }
        .pr-check svg { color: #16A34A; }
        .pr-card.popular .pr-check { background: #DBEAFE; }
        .pr-card.popular .pr-check svg { color: #1A56DB; }

        @media (max-width: 1024px) {
          .pr-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pr-tabs {
              width: 100%;
              max-width: 360px;
            }
          .pr-container { padding: 0 20px; }
          .pr-root { padding: 48px 0 64px; }
          .pr-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="pricing" className="pr-root">
        <div className="pr-container">

          {/* ── HEADER ── */}
          <motion.div
            className="pr-header"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="pr-eyebrow">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Pricing
            </div>
            <h2 className="pr-title">Pricing</h2>

            {/* Billing tabs */}
            <div className="pr-tabs">
              {BILLING_TABS.map((tab, index) => (
                <motion.button
                  key={tab.value}
                  className={`pr-tab${billingCycle === tab.value ? " active" : ""}`}
                  onClick={() => setBillingCycle(tab.value)}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  {tab.label}
                  {tab.discount && (
                    <span className="pr-tab-discount">{tab.discount}</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {loading && <p className="pr-loading">Loading plans...</p>}

          <div className="pr-grid">
            {plans.map((plan, index) => {
              const meta = PLAN_ACCENT[plan.color] || PLAN_ACCENT["from-gray-600 to-gray-700"];
              return (
                <motion.div
                  key={plan.licenseType}
                  className={`pr-card${plan.popular ? " popular" : ""}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  {plan.popular && (
                    <div className="pr-popular-badge">
                      <Star size={11} fill="white" />
                      Most Popular
                    </div>
                  )}

                  {/* Plan chip */}
                  <div
                    className="pr-plan-chip"
                    style={{ background: `linear-gradient(135deg, ${meta.accent}cc, ${meta.accent})` }}
                  >
                    <plan.icon size={12} />
                    {plan.name}
                  </div>

                  <p className="pr-plan-desc">{plan.description}</p>

                  <div className="pr-price-row">
                    <span className="pr-price">
                      {plan.isFree ? "Free" : `₹${getPrice(plan).toLocaleString()}`}
                    </span>
                    {!plan.isFree && (
                      <span className="pr-price-period">{getBillingText()}</span>
                    )}
                  </div>
                  {!plan.isFree && !plan.isEnterprise && getDiscountText() && (
                    <p className="pr-discount-text">{getDiscountText()}</p>
                  )}
                  {(plan.isFree || plan.isEnterprise || !getDiscountText()) && (
                    <div style={{ height: 20 }} />
                  )}

                  <button
                    className={`pr-btn ${plan.popular ? "pr-btn-primary" : "pr-btn-default"}`}
                    onClick={() => handlePlanClick(plan)}
                  >
                    {plan.isFree ? "Get Started Free" : plan.isEnterprise ? "Contact Sales" : "Buy Now"}
                  </button>

                  <div className="pr-features-label">Includes:</div>
                  <div className="pr-features-list">
                    {plan.features.map((feature) => (
                      <div key={feature.featureSlug} className="pr-feature-item">
                        <span className="pr-check">
                          <Check size={9} strokeWidth={3} />
                        </span>
                        <span>{feature.uiLabel}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

export default PricingSection;