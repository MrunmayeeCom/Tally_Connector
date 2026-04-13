import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ListChecks,
  Receipt,
  FileText,
  Calendar,
  Package,
  Settings,
  Target,
} from "lucide-react";
import bgImage from "../../assets/bimage3a.jpg";

export function UserSideSection() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Interactive Dashboard",
      description: "View all your data in beautiful graphs and charts with quick navigation tabs.",
      bullets: ["Live real-time visualization", "Quick access widgets", "Customizable layout", "Voucher & Bill Lists"],
      chipBg: "linear-gradient(135deg, #0EA5E9bb, #2563EBbb)",
      checkColor: "#7DD3FC",
      dotColor: "rgba(125,211,252,0.7)",
    },
    {
      icon: ListChecks,
      title: "Tally Ledger List",
      description: "Complete ledger management with comprehensive party information.",
      bullets: ["Party Name & Type", "Opening Balance & Outstanding", "Due Dates & Reminders", "Pending Bills"],
      chipBg: "linear-gradient(135deg, #6366F1bb, #4338CAbb)",
      checkColor: "#A5B4FC",
      dotColor: "rgba(165,180,252,0.7)",
    },
    {
      icon: Receipt,
      title: "Voucher Explorer",
      description: "Explore and manage all your vouchers in one place with advanced features.",
      bullets: ["Date & Voucher Type", "Reference & Party Details", "Amount & Status Tracking", "Narration Fields"],
      chipBg: "linear-gradient(135deg, #A855F7bb, #DB2777bb)",
      checkColor: "#E879F9",
      dotColor: "rgba(232,121,249,0.7)",
    },
    {
      icon: FileText,
      title: "Order Book",
      description: "Track all your orders and manage customer/supplier relationships.",
      bullets: ["Order Number & Type", "Customer/Supplier Info", "Amount & Due Dates", "Status Monitoring"],
      chipBg: "linear-gradient(135deg, #F472B6bb, #E11D48bb)",
      checkColor: "#FDA4AF",
      dotColor: "rgba(253,164,175,0.7)",
    },
    {
      icon: Calendar,
      title: "Monthly Summary",
      description: "Get comprehensive monthly financial insights at a glance.",
      bullets: ["Estimate Analysis", "Expense Tracking", "Profit Calculations", "Margin Metrics"],
      chipBg: "linear-gradient(135deg, #FB923Cbb, #D97706bb)",
      checkColor: "#FCD34D",
      dotColor: "rgba(252,211,77,0.7)",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Complete inventory tracking with detailed stock movements.",
      bullets: ["Item Code & Name", "Stock Levels (Opening/Closing)", "Inward/Outward Tracking", "Rate & Value"],
      chipBg: "linear-gradient(135deg, #34D399bb, #059669bb)",
      checkColor: "#6EE7B7",
      dotColor: "rgba(110,231,183,0.7)",
    },
    {
      icon: Settings,
      title: "Settings & Profile",
      description: "Personalize your experience and manage security.",
      bullets: ["Profile Management", "Password Security", "Company Name Visibility", "User Preferences"],
      chipBg: "linear-gradient(135deg, #2DD4BFbb, #0891B2bb)",
      checkColor: "#5EEAD4",
      dotColor: "rgba(94,234,212,0.7)",
    },
    {
      icon: Target,
      title: "Smart Features",
      description: "Enhanced productivity tools with access across all modules.",
      bullets: ["Excel/CSV Export", "Advanced Filters", "Search Functionality", "Custom Themes"],
      chipBg: "linear-gradient(135deg, #818CF8bb, #7C3AEDbb)",
      checkColor: "#C4B5FD",
      dotColor: "rgba(196,181,253,0.7)",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .us-root {
          font-family: 'Inter', sans-serif;
          padding: 64px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .us-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0EA5E9, #6366F1, #A855F7);
          z-index: 2;
        }

        .us-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .us-bg img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .us-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 18, 38, 0.68);
        }

        .us-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .us-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .us-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #7DD3FC;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
          backdrop-filter: blur(8px);
        }
        .us-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 10px;
        }
        .us-title span {
          background: linear-gradient(90deg, #7DD3FC, #818CF8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .us-subtitle {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.55);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .us-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          align-items: stretch;  /* ← makes all cards in a row match the tallest */
          height: 100%;
          box-sizing: border-box;
        }

        /* Glassmorphism card */
        .us-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255,255,255,0.16);
          border-radius: 20px;
          padding: 22px;
          position: relative;
          transition: all 0.22s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .us-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.28);
          box-shadow: 0 16px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18);
        }

        /* Top shine line on each card */
        .us-card::before {
          content: '';
          position: absolute;
          top: 0; left: 12px; right: 12px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          border-radius: 1px;
        }

        .us-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 7px;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .us-card-desc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.55;
          margin-bottom: 14px;
        }

        .us-features-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .us-features-list {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .us-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.4;
        }

        .us-check {
          flex-shrink: 0;
          margin-top: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
        }

        @media (max-width: 1024px) {
          .us-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .us-container { padding: 0 20px; }
          .us-root { padding: 48px 0 64px; }
          .us-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="user-side" className="us-root">
        <div className="us-bg">
          <img src={bgImage} alt="" />
          <div className="us-bg-overlay" />
        </div>

        <div className="us-container">
          <motion.div
            className="us-header"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="us-eyebrow">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              Features
            </div>
            <h2 className="us-title">
              Everything Users Need<br />
              <span>at Their Fingertips</span>
            </h2>
            <p className="us-subtitle">
              Powerful features designed to make daily operations smooth and efficient
            </p>
          </motion.div>

          <div className="us-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="us-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="us-chip" style={{ background: feature.chipBg }}>
                  <feature.icon size={12} />
                  {feature.title}
                </div>

                <p className="us-card-desc">{feature.description}</p>

                <div className="us-features-label">Includes:</div>
                <div className="us-features-list">
                  {feature.bullets.map((bullet) => (
                    <div key={bullet} className="us-feature-item">
                      <span className="us-check">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path
                            d="M1.5 4L3 5.5L6.5 2"
                            stroke={feature.checkColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}