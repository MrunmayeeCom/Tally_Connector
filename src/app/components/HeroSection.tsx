import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, HeadphonesIcon } from "lucide-react";
import heroImage from "../../assets/bimage1a.jpg";

export function HeroSection({ goToDemo }: { goToDemo: () => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .hero-root {
          font-family: 'Inter', sans-serif;
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0EA5E9, #6366F1, #A855F7);
          z-index: 3;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,18,50,0.78) 0%, rgba(10,30,50,0.72) 50%, rgba(30,10,50,0.78) 100%);
        }

        /* animated blobs */
        .hero-blob-1 {
          position: absolute;
          top: -160px; right: -160px;
          width: 384px; height: 384px;
          background: linear-gradient(135deg, rgba(34,211,238,0.18), rgba(37,99,235,0.18));
          border-radius: 50%;
          filter: blur(64px);
          z-index: 0;
        }
        .hero-blob-2 {
          position: absolute;
          bottom: -160px; left: -160px;
          width: 384px; height: 384px;
          background: linear-gradient(135deg, rgba(168,85,247,0.18), rgba(236,72,153,0.18));
          border-radius: 50%;
          filter: blur(64px);
          z-index: 0;
        }

        .hero-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 96px 40px;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        /* ── BANNER ── */
        .hero-banner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 100px;
          margin-bottom: 32px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .hero-banner::before {
          content: '';
          display: block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #34D399;
          flex-shrink: 0;
          box-shadow: 0 0 6px #34D399;
        }
        .hero-banner span {
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(255,255,255,0.88);
          letter-spacing: 0.01em;
        }

        /* ── HEADING ── */
        .hero-h1 {
          font-size: clamp(2.6rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
          color: #fff;
        }
        .hero-h1 em {
          font-style: italic;
          background: linear-gradient(90deg, #7DD3FC, #818CF8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.58);
          max-width: 540px;
          margin: 0 auto 56px;
          line-height: 1.7;
          font-weight: 400;
        }

        /* ── STATS ── */
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 820px;
          margin: 0 auto;
        }

        .hero-stat-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: left;
          position: relative;
          transition: all 0.22s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12);
          cursor: default;
        }
        .hero-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 12px; right: 12px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }
        .hero-stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.28);
          box-shadow: 0 16px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18);
        }

        .hero-stat-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .hero-stat-value {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 6px;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-stat-label {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .hero-stats { grid-template-columns: 1fr; max-width: 360px; }
          .hero-container { padding: 80px 20px; }
        }
      `}</style>

      <section className="hero-root">
        {/* Background */}
        <div className="hero-bg">
          <img src={heroImage} alt="" />
          <div className="hero-bg-overlay" />
        </div>

        {/* Animated blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
          <motion.div
            className="hero-blob-1"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-blob-2"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="hero-container">
          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}
          >
            <div className="hero-banner">
              <span>
                Empowering Businesses with Strength, Backed by Reliability, and
                Grounded in Stability.
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="hero-h1">
              Smarter Tally Solutions
              <br />
              for Growing Businesses
            </h1>
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Streamline operations, boost productivity, and scale faster with
              Tally Connect — trusted by SMEs and enterprises across industries.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              {
                icon: Clock,
                value: "99.9%",
                label: "Uptime",
                gradient: "linear-gradient(135deg, #22D3EE, #3B82F6)",
                iconBg: "rgba(34,211,238,0.15)",
              },
              {
                icon: Zap,
                value: "5 min",
                label: "Automated Data Sync",
                gradient: "linear-gradient(135deg, #A78BFA, #EC4899)",
                iconBg: "rgba(167,139,250,0.15)",
              },
              {
                icon: HeadphonesIcon,
                value: "24/7",
                label: "Support",
                gradient: "linear-gradient(135deg, #FB923C, #EF4444)",
                iconBg: "rgba(251,146,60,0.15)",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="hero-stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div
                  className="hero-stat-icon"
                  style={{ background: stat.iconBg }}
                >
                  <stat.icon
                    size={20}
                    style={{ color: "white", opacity: 0.9 }}
                  />
                </div>
                <div
                  className="hero-stat-value"
                  style={{ backgroundImage: stat.gradient }}
                >
                  {stat.value}
                </div>
                <div className="hero-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}