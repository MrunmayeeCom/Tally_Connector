import { Shield, Eye, Lock, UserCheck, FileCheck, Heart } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Data Security",
    description: "Tally Connect implements strong security practices to protect financial and business data from unauthorized access.",
  },
  {
    icon: Eye,
    title: "Transparent Data Usage",
    description: "We clearly inform users about what data is collected and how it is used to provide analytics and dashboard insights.",
  },
  {
    icon: Lock,
    title: "Limited Data Access",
    description: "Only the necessary data required to generate financial analysis and dashboards is accessed.",
  },
  {
    icon: UserCheck,
    title: "User Control",
    description: "Users maintain control over their data and can disconnect the Tally Connect Agent at any time.",
  },
  {
    icon: FileCheck,
    title: "Responsible Data Handling",
    description: "All data is handled in accordance with applicable data protection and privacy standards.",
  },
];

export default function GDPRCompliance() {
  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      <div>
        <h1 className="text-3xl font-bold text-blue-900">GDPR Compliance</h1>
        <hr className="border-gray-200 mt-3" />
      </div>

      <div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Tally Connect is committed to protecting the privacy and security of user data. Our platform follows
          industry best practices to ensure that all information processed through Tally Connect is handled
          responsibly and securely.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          When users connect their Tally Prime data through the Tally Connect Agent, the platform ensures
          that financial and accounting information is transmitted and processed with appropriate safeguards.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">Our Data Protection Principles</h3>
        <hr className="border-gray-200 mb-4" />
        <div className="space-y-6">
          {principles.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5 w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <item.icon size={14} color="white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">Commitment to Privacy</h3>
        <hr className="border-gray-200 mb-4" />
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Tally Connect continuously works to maintain high standards of data protection and privacy to
          ensure that business financial information remains secure and confidential.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          For more details about how we handle user data, please refer to our Privacy Policy.
        </p>
      </div>
    </div>
  );
}