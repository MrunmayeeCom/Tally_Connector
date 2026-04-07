import { motion } from "framer-motion";
import { ShieldCheck, Users, Eye, Edit, Trash2 } from "lucide-react";

export function AdminPanelSection() {
  const adminFeatures = [
    {
      icon: Users,
      title: "User Management",
      description: "Create and manage users with ease",
      bullets: ["Add new users", "Assign roles & permissions", "Set email & password"],
      accent: "#1A56DB",
      bg: "#EFF6FF",
      border: "#BFDBFE",
      iconBg: "linear-gradient(135deg, #3B82F6, #1A56DB)",
    },
    {
      icon: Eye,
      title: "Field Visibility Control",
      description: "Control what users can see",
      bullets: ["Visibility rules per user", "Role-based visibility", "Custom field permissions"],
      accent: "#7C3AED",
      bg: "#F5F3FF",
      border: "#DDD6FE",
      iconBg: "linear-gradient(135deg, #A78BFA, #7C3AED)",
    },
    {
      icon: Edit,
      title: "User Editing",
      description: "Modify user details anytime",
      bullets: ["Update user information", "Change roles", "Reset passwords"],
      accent: "#D97706",
      bg: "#FFFBEB",
      border: "#FDE68A",
      iconBg: "linear-gradient(135deg, #FBBF24, #D97706)",
    },
    {
      icon: Trash2,
      title: "User Removal",
      description: "Remove users when needed",
      bullets: ["Delete user records", "Transfer access instantly", "Maintain audit logs"],
      accent: "#DC2626",
      bg: "#FFF1F2",
      border: "#FECDD3",
      iconBg: "linear-gradient(135deg, #F87171, #DC2626)",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .ap-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(160deg, #FDF4FF 0%, #FAF5FF 30%, #FFF1F2 60%, #FFF7ED 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }
        .ap-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #7C3AED, #DC2626, #D97706, #7C3AED);
        }
        .ap-root::after {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .ap-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .ap-header {
          text-align: center;
          margin-bottom: 44px;
        }
        .ap-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F5F3FF;
          border: 1px solid #DDD6FE;
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #7C3AED;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .ap-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .ap-title span { color: #7C3AED; }
        .ap-subtitle {
          font-size: 0.95rem;
          color: #64748B;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── HIGHLIGHT BANNER ── */
        .ap-banner {
          background: white;
          border: 1px solid #E9D5FF;
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 32px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: 0 2px 8px rgba(124,58,237,0.06);
        }
        .ap-banner-icon {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #A78BFA, #7C3AED);
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ap-banner-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }
        .ap-banner-body {
          font-size: 0.83rem;
          color: #64748B;
          line-height: 1.65;
        }

        /* ── CARDS GRID ── */
        .ap-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .ap-card {
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 16px;
          padding: 22px;
          transition: all 0.22s ease;
        }
        .ap-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.09);
        }
        .ap-card-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
          background: var(--icon-bg);
          flex-shrink: 0;
        }
        .ap-card-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 5px;
          letter-spacing: -0.01em;
        }
        .ap-card-desc {
          font-size: 0.78rem;
          color: #64748B;
          margin-bottom: 14px;
          line-height: 1.5;
        }
        .ap-bullet-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ap-bullet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.78rem;
          color: #374151;
          line-height: 1.4;
        }
        .ap-bullet-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
          background: var(--accent);
        }

        @media (max-width: 1024px) {
          .ap-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ap-container { padding: 0 20px; }
          .ap-root { padding: 60px 0; }
          .ap-grid { grid-template-columns: 1fr; }
          .ap-banner { flex-direction: column; gap: 12px; }
        }
      `}</style>

      <section id="admin-panel" className="ap-root">
        <div className="ap-container">

          {/* ── HEADER ── */}
          <motion.div
            className="ap-header"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="ap-eyebrow">
              <ShieldCheck size={11} />
              Admin Panel
            </div>
            <h2 className="ap-title">
              Powerful Admin <span>Control Center</span>
            </h2>
            <p className="ap-subtitle">
              Complete control over users, permissions, and data visibility across your organization
            </p>
          </motion.div>

          {/* ── BANNER ── */}
          <motion.div
            className="ap-banner"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="ap-banner-icon">
              <ShieldCheck size={20} color="white" />
            </div>
            <div>
              <div className="ap-banner-title">Complete Administrative Control</div>
              <div className="ap-banner-body">
                Manage your entire team with role-based access control. Control who sees what, manage permissions, and maintain complete security across your organization.
              </div>
            </div>
          </motion.div>

          {/* ── CARDS ── */}
          <div className="ap-grid">
            {adminFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="ap-card"
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
                <div className="ap-card-icon">
                  <feature.icon size={18} color="white" />
                </div>
                <div className="ap-card-title">{feature.title}</div>
                <div className="ap-card-desc">{feature.description}</div>
                <ul className="ap-bullet-list">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="ap-bullet">
                      <span className="ap-bullet-dot" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}