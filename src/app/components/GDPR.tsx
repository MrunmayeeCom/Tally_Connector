import { Shield, Eye, Lock, UserCheck, FileCheck, Heart } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Tally Connect implements strong security practices to protect financial and business data from unauthorized access.",
  },
  {
    icon: Eye,
    title: "Transparent Data Usage",
    description:
      "We clearly inform users about what data is collected and how it is used to provide analytics and dashboard insights.",
  },
  {
    icon: Lock,
    title: "Limited Data Access",
    description:
      "Only the necessary data required to generate financial analysis and dashboards is accessed.",
  },
  {
    icon: UserCheck,
    title: "User Control",
    description:
      "Users maintain control over their data and can disconnect the Tally Connect Agent at any time.",
  },
  {
    icon: FileCheck,
    title: "Responsible Data Handling",
    description:
      "All data is handled in accordance with applicable data protection and privacy standards.",
  },
];

export default function GDPRCompliance() {
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

        .gdpr-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 28px 32px;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .gdpr-card h3 {
          font-size: 17px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .gdpr-card p {
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
          margin: 0;
        }

        .icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #ec4899, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
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
            GDPR Compliance
          </h1>
        </div>

        {/* Intro card 1 */}
        <div className="gdpr-card">
          <p>
            Tally Connect is committed to protecting the privacy and security of user data. Our platform
            follows industry best practices to ensure that all information processed through Tally Connect
            is handled responsibly and securely.
          </p>
        </div>

        {/* Intro card 2 */}
        <div className="gdpr-card">
          <p>
            When users connect their Tally Prime data through the Tally Connect Agent, the platform ensures
            that financial and accounting information is transmitted and processed with appropriate safeguards.
          </p>
        </div>

        {/* Section heading */}
        <div style={{ margin: "32px 0 20px" }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "white",
              margin: 0,
            }}
          >
            Our Data Protection Principles
          </h2>
        </div>

        {/* Principle cards */}
        {principles.map((item, index) => (
          <div className="gdpr-card" key={index}>
            <h3>
              <span className="icon-wrap">
                <item.icon size={16} color="white" strokeWidth={2} />
              </span>
              {item.title}
            </h3>
            <p>{item.description}</p>
          </div>
        ))}

        {/* Commitment card */}
        <div className="gdpr-card" style={{ marginTop: 32 }}>
          <h3>
            <span className="icon-wrap">
              <Heart size={16} color="white" strokeWidth={2} />
            </span>
            Commitment to Privacy
          </h3>
          <p>
            Tally Connect continuously works to maintain high standards of data protection and privacy to
            ensure that business financial information remains secure and confidential.
          </p>
          <p style={{ marginTop: 12 }}>
            For more details about how we handle user data, please refer to our{" "}
            <a
              href="/privacy-policy"
              style={{ color: "#a855f7", fontWeight: 500, textDecoration: "none" }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

      </div>
    </div>
  );
}