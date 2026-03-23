import { Download, Mail, BarChart2, FileText, Shield, Monitor, Package } from "lucide-react";

const highlights = [
  "Real-time financial dashboards",
  "Voucher and ledger analysis",
  "Secure integration with Tally Prime",
  "Simplified financial monitoring and reporting",
  "Easy installation through the Tally Connect Agent",
];

const mediaResources = [
  { icon: Package, label: "Tally Connect Logo" },
  { icon: Monitor, label: "Product Screenshots" },
  { icon: FileText, label: "Brand Assets" },
  { icon: BarChart2, label: "Product Overview" },
];

export default function PressPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #1e2a4a 0%, #2d2870 50%, #9d2060 100%)",
        fontFamily: "'Inter', sans-serif",
        paddingTop: "80px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .press-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 28px 32px;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .press-card h3 {
          font-size: 17px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 12px;
        }

        .press-card p {
          font-size: 14px;
          color: #475569;
          line-height: 1.75;
          margin: 0;
        }

        .highlight-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #a855f7);
          flex-shrink: 0;
          margin-top: 6px;
        }

        .media-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255,255,255,0.95);
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          cursor: pointer;
          transition: all 0.18s ease;
          text-align: left;
          width: 100%;
        }

        .media-btn:hover {
          background: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .media-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: linear-gradient(135deg, #ec4899, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 12px;
          padding: 28px 32px;
          backdrop-filter: blur(12px);
        }
      `}</style>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Hero banner */}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: "28px 40px",
            textAlign: "center",
            marginBottom: 36,
            backdropFilter: "blur(12px)",
          }}
        >
          <h1
            style={{
              fontSize: 42,
              fontWeight: 700,
              background: "linear-gradient(135deg, #f472b6, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            Press
          </h1>
        </div>

        {/* Welcome intro */}
        <div className="press-card">
          <p>
            Welcome to the Tally Connect Press Center. Here you can find the latest news, announcements,
            and media resources related to Tally Connect. Our platform helps businesses using Tally Prime
            gain deeper financial insights through powerful dashboards, analytics, and real-time data
            visualization.
          </p>
        </div>

        {/* About */}
        <div style={{ margin: "28px 0 16px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0 }}>
            About Tally Connect
          </h2>
        </div>

        <div className="press-card">
          <p>
            Tally Connect is a financial analytics platform designed for businesses using Tally Prime. By
            installing the Tally Connect Agent, users can securely connect their accounting data and
            transform it into interactive dashboards. The platform provides clear insights into financial
            performance, voucher activity, and ledger management, helping businesses make better financial
            decisions.
          </p>
        </div>

        {/* Product Highlights */}
        <div style={{ margin: "28px 0 16px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0 }}>
            Product Highlights
          </h2>
        </div>

        <div className="press-card">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {highlights.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div className="highlight-dot" />
                <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Media Resources */}
        <div style={{ margin: "28px 0 16px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0 }}>
            Media Resources
          </h2>
        </div>

        <div className="press-card">
          <p style={{ marginBottom: 20 }}>
            For media and promotional use, the following resources are available:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {mediaResources.map((item, i) => (
              <button key={i} className="media-btn">
                <span className="media-icon">
                  <item.icon size={16} color="white" strokeWidth={2} />
                </span>
                {item.label}
                <Download size={14} color="#94a3b8" style={{ marginLeft: "auto" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Media Contact */}
        <div style={{ margin: "28px 0 16px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "white", margin: 0 }}>
            Media Contact
          </h2>
        </div>

        <div className="contact-card">
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, margin: "0 0 20px" }}>
            For press inquiries, partnerships, or additional information about Tally Connect:
          </p>
          <a
            href="mailto:info@averlonworld.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 24px",
              background: "linear-gradient(135deg, #ec4899, #a855f7)",
              borderRadius: 10,
              color: "white",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(168,85,247,0.35)",
            }}
          >
            <Mail size={16} />
            info@averlonworld.com
          </a>
        </div>

      </div>
    </div>
  );
}