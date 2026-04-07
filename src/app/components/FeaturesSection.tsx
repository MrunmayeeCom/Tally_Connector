import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, RefreshCw } from "lucide-react";

interface FeaturesSectionProps {
  onKnowMore?: () => void;
}

export function FeaturesSection({ onKnowMore }: FeaturesSectionProps) {
  const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Your finances, beautifully visualized in one place.",
    bullets: [
      "Your numbers, always up to date",
      "Key info at a glance on one screen",
      "Browse bills and transactions easily",
    ],
    accent: "#1A56DB",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    iconBg: "linear-gradient(135deg, #3B82F6, #1A56DB)",
  },
  {
    icon: Zap,
    title: "Always Up to Date",
    description: "Data refreshes every 5 minutes — automatically.",
    bullets: [
      "Auto-refresh every 5 minutes",
      "Only new changes are fetched",
      "No manual exports or imports needed",
    ],
    accent: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    iconBg: "linear-gradient(135deg, #34D399, #059669)",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "You decide who sees what, down to every field.",
    bullets: [
      "Each person only sees what you allow",
      "Every login is verified",
      "Every change is tracked and logged",
    ],
    accent: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    iconBg: "linear-gradient(135deg, #FBBF24, #D97706)",
  },
  {
    icon: RefreshCw,
    title: "Works with Tally",
    description: "View and create entries directly from your browser.",
    bullets: [
      "Data flows both ways — view and create",
      "Create vouchers & bills without opening Tally",
      "Only changed data is synced — fast and clean",
    ],
    accent: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    iconBg: "linear-gradient(135deg, #A78BFA, #7C3AED)",
  },
];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .feat-root {
          font-family: 'Inter', sans-serif;
          background: white;
          padding: 80px 0 48px;
          position: relative;
          overflow: hidden;
        }
        .feat-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1A56DB, #059669, #D97706, #7C3AED);
        }

        .feat-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .feat-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .feat-eyebrow {
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
        .feat-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .feat-title span { color: #1A56DB; }
        .feat-subtitle {
          font-size: 0.95rem;
          color: #64748B;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        .feat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }
        .feat-card {
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        .feat-card::after {
          content: '';
          position: absolute;
          bottom: -30px; right: -30px;
          width: 90px; height: 90px;
          border-radius: 50%;
          background: var(--card-border);
          opacity: 0.35;
          pointer-events: none;
          transition: opacity 0.22s ease;
        }
        .feat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.09);
        }
        .feat-card:hover::after { opacity: 0.6; }

        .feat-icon {
          width: 42px; height: 42px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          background: var(--icon-bg);
          position: relative; z-index: 1;
          transition: transform 0.2s ease;
        }
        .feat-card:hover .feat-icon { transform: scale(1.08); }

        .feat-card-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
          position: relative; z-index: 1;
        }
        .feat-card-desc {
          font-size: 0.82rem;
          color: #64748B;
          margin-bottom: 16px;
          line-height: 1.55;
          position: relative; z-index: 1;
        }
        .feat-bullets {
          list-style: none;
          padding: 0; margin: 0;
          display: flex; flex-direction: column;
          gap: 7px;
          position: relative; z-index: 1;
        }
        .feat-bullet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.78rem;
          color: #374151;
          line-height: 1.45;
        }
        .feat-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
          background: var(--accent);
        }

        .feat-footer {
          text-align: center;
        }
        .feat-footer-text {
          font-size: 0.9rem;
          color: #64748B;
          margin-bottom: 20px;
        }
        .feat-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          background: linear-gradient(145deg, #1A56DB, #0E3FA8);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 0.925rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 14px rgba(26,86,219,0.28);
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
        }
        .feat-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(26,86,219,0.38); }

        @media (max-width: 1024px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .feat-container { padding: 0 20px; }
          .feat-root { padding: 60px 0 40px; }
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="features" className="feat-root">
        <div className="feat-container">

          <motion.div
            className="feat-header"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="feat-eyebrow">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Features
            </div>
            <h2 className="feat-title">
              Powerful Features for <span>Modern Businesses</span>
            </h2>
            <p className="feat-subtitle">
              Everything you need to manage and analyze your Tally data efficiently
            </p>
          </motion.div>

          <div className="feat-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feat-card"
                style={{
                  "--card-bg": feature.bg,
                  "--card-border": feature.border,
                  "--icon-bg": feature.iconBg,
                  "--accent": feature.accent,
                } as React.CSSProperties}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="feat-icon">
                  <feature.icon size={19} color="white" />
                </div>
                <div className="feat-card-title">{feature.title}</div>
                <div className="feat-card-desc">{feature.description}</div>
                <ul className="feat-bullets">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="feat-bullet">
                      <span className="feat-dot" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="feat-footer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="feat-footer-text">Discover how Tally Connect can transform your business</p>
            <button className="feat-btn" onClick={onKnowMore}>
              Contact Support 
            </button>
          </motion.div>

        </div>
      </section>
      <hr className="border-t-2 border-black" />
    </>
  );
}