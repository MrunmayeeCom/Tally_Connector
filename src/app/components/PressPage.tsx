import { Mail } from "lucide-react";

const highlights = [
  "Real-time financial dashboards and analytics",
  "Voucher and ledger analysis with full drill-down",
  "Secure, verified integration with Tally Prime",
  "Create vouchers and bills directly from the browser",
  "Simplified financial monitoring, reporting, and team access control",
  "Works on any device — desktop, tablet, or phone",
  "Requires a Windows machine running Tally Prime 2.0+",
];

export default function PressPage() {
  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      <div>
        <h1 className="text-3xl font-bold text-blue-900">Press</h1>
        <hr className="border-gray-200 mt-3" />
      </div>

      <div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Welcome to the Tally Connect Press Center. Here you can find the latest news, announcements,
          and media resources related to Tally Connect. Our platform helps businesses using Tally Prime
          gain deeper financial insights through powerful dashboards, analytics, and real-time data
          visualization.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">About Tally Connect</h3>
        <hr className="border-gray-200 mb-4" />
        <p className="text-gray-600 text-sm leading-relaxed">
          Tally Connect is a financial analytics and management platform designed for
          businesses using Tally Prime. By installing the Tally Connect Agent on their
          Windows machine, users can securely connect their accounting data and access
          it from any browser. The platform delivers interactive dashboards, ledger and
          voucher management, inventory tracking, and the ability to create vouchers and
          bills directly — without ever opening Tally Prime. Role-based access controls
          let admins decide exactly what each team member can see.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">Product Highlights</h3>
        <hr className="border-gray-200 mb-4" />
        <ul className="space-y-2">
          {highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">Media Contact</h3>
        <hr className="border-gray-200 mb-4" />
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          For press inquiries, partnerships, or additional information about Tally Connect:
        </p>
        <a href="mailto:info@averlonworld.com" className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm">
          <Mail size={15} />
          info@averlonworld.com
        </a>
      </div>
    </div>
  );
}