import { motion } from "framer-motion";
import { TrendingUp, GraduationCap, Megaphone, Award, ArrowRight, Users, MapPin } from "lucide-react";

export function PartnersSection({ goToPartnerPage }: { goToPartnerPage: () => void }) {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Access new markets and revenue streams through our established partner network",
      accent: "#1A56DB",
      bg: "#EFF6FF",
      border: "#BFDBFE",
    },
    {
      icon: GraduationCap,
      title: "Expert Training",
      description: "Comprehensive certification programs to build credibility and expertise",
      accent: "#7C3AED",
      bg: "#F5F3FF",
      border: "#DDD6FE",
    },
    {
      icon: Megaphone,
      title: "Marketing Support",
      description: "Co-marketing opportunities, branded materials and joint campaigns",
      accent: "#D97706",
      bg: "#FFFBEB",
      border: "#FDE68A",
    },
    {
      icon: Award,
      title: "Partner Recognition",
      description: "Bronze, Silver, and Gold tiers with increasing rewards and visibility",
      accent: "#059669",
      bg: "#ECFDF5",
      border: "#A7F3D0",
    },
  ];

  const stats = [
    { value: "200+", label: "Active Partners", icon: Users },
    { value: "30+", label: "Countries", icon: MapPin },
    { value: "8,000+", label: "Joint Clients", icon: TrendingUp },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .ps-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(160deg, #EFF6FF 0%, #F0F4FF 40%, #F5F3FF 70%, #EEF2FF 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }
        .ps-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1A56DB, #7C3AED, #1A56DB);
        }

        .ps-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── HEADER ── */
        .ps-header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: 56px;
        }
        .ps-eyebrow {
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
        .ps-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .ps-title span { color: #1A56DB; }
        .ps-subtitle {
          font-size: 0.95rem;
          color: #64748B;
          line-height: 1.7;
          max-width: 520px;
        }
        .ps-header-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-end;
          padding-top: 8px;
          flex-shrink: 0;
        }
        .ps-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: linear-gradient(145deg, #1A56DB, #0E3FA8);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 14px rgba(26,86,219,0.28);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .ps-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,86,219,0.38); }
        .ps-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: white;
          color: #374151;
          border: 1.5px solid #E5E7EB;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .ps-btn-secondary:hover { background: #F9FAFB; border-color: #D1D5DB; color: #111827; }

        /* ── STATS ROW ── */
        .ps-stats {
          display: flex;
          gap: 0;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 48px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .ps-stat {
          flex: 1;
          padding: 22px 28px;
          border-right: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ps-stat:last-child { border-right: none; }
        .ps-stat-icon {
          width: 40px; height: 40px;
          background: #EFF6FF;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ps-stat-icon svg { color: #1A56DB; }
        .ps-stat-num {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .ps-stat-label {
          font-size: 0.78rem;
          color: #94A3B8;
          font-weight: 500;
          margin-top: 2px;
        }

        /* ── BODY GRID ── */
        .ps-body {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 28px;
          align-items: start;
        }

        /* ── INFO CARD ── */
        .ps-info-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .ps-info-card-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94A3B8;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .ps-info-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .ps-info-card-body {
          font-size: 0.845rem;
          color: #64748B;
          line-height: 1.75;
        }
        .ps-divider {
          width: 100%;
          height: 1px;
          background: #F1F5F9;
          margin: 20px 0;
        }
        .ps-find-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .ps-find-text {
          font-size: 0.845rem;
          font-weight: 600;
          color: #0F172A;
        }
        .ps-find-sub {
          font-size: 0.78rem;
          color: #94A3B8;
          margin-top: 2px;
        }
        .ps-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #EFF6FF;
          color: #1A56DB;
          border: 1px solid #BFDBFE;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.18s ease;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .ps-link-btn:hover { background: #DBEAFE; border-color: #93C5FD; }

        /* ── BENEFITS CARD ── */
        .ps-benefits-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .ps-benefits-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94A3B8;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .ps-benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 22px;
        }
        .ps-benefit-item {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.18s ease;
        }
        .ps-benefit-item:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .ps-benefit-icon-wrap {
          width: 34px; height: 34px;
          background: white;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .ps-benefit-name {
          font-size: 0.845rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .ps-benefit-desc {
          font-size: 0.77rem;
          color: #64748B;
          line-height: 1.55;
        }
        .ps-become-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: linear-gradient(135deg, #EFF6FF, #F5F3FF);
          border: 1px solid #C7D2FE;
          border-radius: 12px;
          padding: 16px 20px;
        }
        .ps-become-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.01em;
        }
        .ps-become-sub {
          font-size: 0.77rem;
          color: #64748B;
          margin-top: 2px;
        }

        @media (max-width: 1024px) {
          .ps-body { grid-template-columns: 1fr; }
          .ps-header { grid-template-columns: 1fr; }
          .ps-header-actions { flex-direction: row; align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .ps-container { padding: 0 20px; }
          .ps-root { padding: 60px 0; }
          .ps-stats { flex-direction: column; }
          .ps-stat { border-right: none; border-bottom: 1px solid #E5E7EB; }
          .ps-stat:last-child { border-bottom: none; }
          .ps-benefits-grid { grid-template-columns: 1fr; }
          .ps-header-actions { flex-direction: column; }
        }
      `}</style>

      <section id="partners" className="ps-root">
        <div className="ps-container">

          {/* ── HEADER ── */}
          <motion.div
            className="ps-header"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="ps-eyebrow">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Partner Network
              </div>
              <h2 className="ps-title">
                Find a <span>Tally Connect</span><br />Partner in your area
              </h2>
              <p className="ps-subtitle">
                Connect with certified partners who can help you maximize your Tally Connect experience — from implementation to ongoing support.
              </p>
            </div>
            <div className="ps-header-actions">
              <button className="ps-btn-primary" onClick={goToPartnerPage}>
                Become a Partner
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>

          {/* ── BODY ── */}
          <div className="ps-body">

            {/* LEFT — Info card */}
            <motion.div
              className="ps-info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="ps-info-card-label">About the Program</div>
              <div className="ps-info-card-title">
                Tally Connect Partners can help you create and manage your business
              </div>
              <div className="ps-info-card-body">
                Our partners are there to make your Tally Connect experience more pleasant and productive — from choosing a subscription plan to product implementation, customization, and employee training. Tally Connect partners can also help you set up an integration with a third-party app or service.
              </div>
              <div className="ps-info-card-body" style={{ marginTop: 10 }}>
                Browse our Partner Directory to find a Tally Connect partner in your area and contact them directly, or use the form below to get a price estimate for your implementation project.
              </div>
              <div className="ps-divider" />
            </motion.div>

            {/* RIGHT — Benefits card */}
            <motion.div
              className="ps-benefits-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="ps-benefits-title">Why Become a Partner?</div>
              <div className="ps-benefits-grid">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    className="ps-benefit-item"
                    style={{ "--bg": b.bg, "--border": b.border } as React.CSSProperties}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                  >
                    <div className="ps-benefit-icon-wrap">
                      <b.icon size={17} style={{ color: b.accent }} />
                    </div>
                    <div className="ps-benefit-name">{b.title}</div>
                    <div className="ps-benefit-desc">{b.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}