interface EULAProps {
  onBack: () => void;
}

export function EULA({ onBack }: EULAProps) {
  const sections = [
    {
      title: "1. Agreement Overview",
      content:
        'This End-User License Agreement ("EULA") is a legal agreement between you and Tally Connect. This EULA governs your acquisition and use of the Tally Connect software platform ("Software") — including the web-based business intelligence dashboard and the agent.exe desktop bridge component — whether accessed directly or through an authorized reseller or distributor. Please read this agreement carefully before using the Software. By installing and/or using the Software, you confirm your acceptance of these terms and agree to be bound by this EULA. If you do not agree, do not install or use the Software.',
    },
    {
      title: "2. What is Tally Connect",
      content:
        "Tally Connect is an advanced web-based business intelligence and data management platform built to seamlessly integrate with Tally Prime — India's most widely used accounting software. The platform bridges the gap between Tally Prime's powerful accounting engine and the need for modern, accessible, multi-user, role-based business data visibility. Tally Connect enables businesses to view, analyze, and interact with their Tally data through a clean, secure, and feature-rich web interface without requiring users to directly access the Tally Prime desktop application. The platform follows a four-layer client-server architecture: Tally Prime (data source), agent.exe (desktop bridge), a cloud-hosted Node.js + Express backend, and a React.js web frontend.",
    },
    {
      title: "3. License Grant",
      content:
        "Tally Connect hereby grants you a non-transferable, non-exclusive licence to use the Software solely for your internal business operations in accordance with the terms of this EULA. You are permitted to:",
      list: [
        "Install and use the agent.exe desktop component on your authorized Windows 10, Windows 11, or Windows Server 2016+ machine running Tally Prime 2.0 or higher with HTTP API enabled",
        "Access the web-based dashboard and all features assigned to your role (Admin or Business User) by the system administrator",
        "Synchronize your Tally Prime data — including Ledgers, Vouchers, Bills, Orders, Sales Orders, and Inventory — to the Tally Connect cloud platform",
        "Create vouchers and bills directly from the web interface that are instantly written back to Tally Prime via agent.exe",
        "Invite Business Users within your organization and assign granular page-level, column-level, and row-level data access permissions per user",
        "Manage multiple Tally Prime companies within a single Tally Connect account with fully isolated, company-wise user assignments",
        "Download scheduled monthly financial PDF reports and receive automated notifications for financial events",
      ],
    },
    {
      title: "4. Restrictions",
      content: "You are not permitted to:",
      list: [
        "Edit, alter, modify, adapt, decompile, disassemble, or reverse engineer the Software or any part thereof, including agent.exe, the backend API, or the web frontend",
        "Reproduce, copy, distribute, resell, or otherwise use the Software for any unauthorized commercial purpose",
        "Allow any unauthorized third party to use the Software or access data through your account",
        "Use the Software in any way that breaches any applicable local, national, or international law",
        "Share login credentials, JWT tokens, OTPs, or agent API keys with unauthorized individuals",
        "Attempt to bypass role-based access controls, page-level restrictions, column-level visibility rules, or row-level data selection filters enforced by the platform",
        "Interfere with or disrupt the agent.exe sync process, backend sync queue, PostgreSQL database integrity, or the TDL HTTP API communication with Tally Prime",
        "Activate agent.exe on more devices than permitted by your license key configuration",
        "Use the Software with Tally ERP 9 or any version of Tally Prime below 2.0, as these are not supported",
      ],
    },
    {
      title: "5. License Keys & Device Activation",
      content:
        "Access to the agent.exe desktop component is governed by a license key issued to your administrator account. Each license key specifies a maximum number of authorized devices. The agent.exe registers each installation using a unique device fingerprint, which is validated on every sync operation against the licenses and licensed_devices records. Tally Connect reserves the right to deactivate any device that exceeds the licensed device limit or violates the terms of this EULA. You are responsible for ensuring that agent.exe is only installed and activated on devices within your licensed device allocation.",
    },
    {
      title: "6. Authentication & Security",
      subsections: [
        {
          subtitle: "Password Security",
          content:
            "All user passwords are hashed using bcrypt with a minimum salt factor of 10 and are never stored in plain text. You are responsible for maintaining the confidentiality of your login credentials.",
        },
        {
          subtitle: "JWT Token Authentication",
          content:
            "Access to all protected API endpoints requires a valid signed JWT Bearer Token issued upon successful login with a configurable expiry. Tokens are stateless and attached to all subsequent API requests from the frontend. All endpoints except authentication routes require this token.",
        },
        {
          subtitle: "OTP Verification",
          content:
            "A 6-digit One-Time Password (OTP) is generated and sent to your registered email during Admin registration and whenever user permissions are updated. OTPs are stored with an expiry timestamp to prevent replay attacks. You must not share OTPs with anyone.",
        },
        {
          subtitle: "Role-Based Access Control",
          content:
            "The platform enforces two roles: Admin (full access to all features, users, companies, and data across all companies) and Business User (access restricted to pages, columns, and data rows explicitly permitted by the admin). All permission checks — including page-level access, column-level visibility, and row-level data selection — are enforced server-side on every request and cannot be bypassed from the frontend.",
        },
      ],
    },
    {
      title: "7. Data Synchronization & Ownership",
      content:
        "The agent.exe desktop component connects to Tally Prime via its local TDL HTTP API every 5 minutes, using incremental alter ID tracking to fetch only new or changed records. Extracted data — Ledgers, Vouchers, Voucher Entries, Bills, Orders, Sales Orders, Stock Items, and Inventory — is pushed to the cloud backend over HTTPS and stored in a PostgreSQL 14+ database. The backend processes the sync queue and performs UPSERT and DELETE operations accordingly. All data is partitioned by admin_id and company_guid to enforce strict multi-tenant isolation between companies. You retain full ownership of your business data synchronized from Tally Prime.",
    },
    {
      title: "8. Core Features & Permitted Use",
      content:
        "The Software provides the following core features that you are licensed to use within the scope of your assigned permissions:",
      list: [
        "Admin Dashboard — Total Receivable, Total Payable, Pending and Cleared Bills count and value, Monthly Income vs Expense Chart, and Outstanding Trends Chart",
        "Ledger Management — Ledger list with party name, type, opening balance, outstanding amount, due days; Ledger Detail View with Vouchers, Invoices, Bills, and Ageing tabs; phone, email, GSTIN, and PAN auto-extracted from Tally address fields",
        "Voucher Explorer — View, filter by type (Sales, Purchase, Payment, Receipt, Journal), create, edit, and delete vouchers synced bidirectionally with Tally Prime",
        "Bill Creation — Create bills from the web interface instantly written to Tally Prime via agent.exe, with Bill Created notifications dispatched to permitted users",
        "Order Book — View and filter Sales Orders and Purchase Orders with status tracking and due date monitoring",
        "Monthly Summary — Total Turnover, Total Expenses, Net Profit, Profit Margin, Monthly Comparison, and Trend Analysis charts",
        "Inventory Management — Total Items, Total Stock Value, Low Stock Alerts, Stock Movement; item-level closing stock, rate, and value",
        "Notification Management — Automated alerts for new user creation, user deletion, payment due reminders, low stock, new vouchers, bill creation, and scheduled monthly PDF reports with one-click download",
        "User & Permission Management — Individual and bulk permission controls across page, column, and row level for Dashboard, Ledger, Voucher, Orders, Inventory, and Monthly Summary modules",
        "Multi-Company Management — Fully isolated management of multiple Tally Prime companies under a single admin account with independent per-company user assignments",
        "Global Search & Pagination — Real-time text filtering and configurable pagination (10, 15, 20, 50, or 100 records per page) across all listing pages",
        "Greeting & Welcome Notifications — Personalized Good Morning and Good Night notifications, and a Welcome notification on first login for all Admins and Users",
      ],
    },
    {
      title: "9. Known Limitations",
      content:
        "By using the Software, you acknowledge the following known limitations documented as part of this platform:",
      list: [
        "agent.exe is a Windows-only application, consistent with Tally Prime's Windows-only platform requirement. macOS and Linux are not supported.",
        "Data synchronization occurs every 5 minutes — second-by-second real-time updates are not available between sync cycles.",
        "If Tally Prime is closed or the client machine goes offline, synchronization pauses until connectivity and Tally availability are restored.",
        "The maximum number of agent.exe activations per admin account is strictly governed by the license key configuration and cannot be exceeded.",
        "Custom Tally field extraction depends on consistent client-side Tally field mapping within the client's Tally Prime configuration.",
        "Bulk report generation for very large datasets may introduce server-side processing delays.",
        "The platform supports Tally Prime 2.0 and above only. Tally ERP 9 is not supported without agent modification.",
      ],
    },
    {
      title: "10. Intellectual Property & Ownership",
      content:
        "Tally Connect shall at all times retain ownership of the Software as originally made available to you, including all subsequent updates, patches, and versions. The Software — encompassing the React.js web frontend, Node.js + Express cloud backend, agent.exe desktop bridge, PostgreSQL database schema with 40+ relational tables, RESTful API layer (Base URL: https://api.tallyconnect.com/api/v1), sync queue engine, and all associated intellectual property rights — are and shall remain the property of Tally Connect. Nothing in this EULA transfers any intellectual property rights to you. Tally Connect reserves the right to grant licences to use the Software to third parties.",
    },
    {
      title: "11. Disclaimer of Warranties",
      content:
        'The Software is provided "as is" without warranty of any kind, express or implied. Tally Connect does not warrant that the Software will be error-free, uninterrupted, or free of defects. In particular, Tally Connect does not guarantee the accuracy or completeness of data synchronized from Tally Prime, as synchronization depends on the availability and configuration of Tally Prime and the Windows machine running agent.exe. You assume all risk arising from your use of the Software.',
    },
    {
      title: "12. Limitation of Liability",
      content:
        "To the fullest extent permitted by applicable law, Tally Connect shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including but not limited to loss of profits, business data, business operations, or goodwill — arising out of or in connection with your use of or inability to use the Software. This includes, without limitation, damages resulting from synchronization delays, agent.exe downtime, Tally Prime unavailability, offline client machines, or data access restrictions enforced by the platform's permission system.",
    },
    {
      title: "13. Termination",
      content:
        "This EULA is effective from the date you first use the Software and shall continue until terminated. You may terminate it at any time by discontinuing use and uninstalling all components of the Software, including agent.exe. Tally Connect may terminate this EULA immediately if you fail to comply with any term herein — including unauthorized device activation beyond your license limit, credential or OTP sharing, or attempts to bypass access controls. Upon termination, all licenses granted under this EULA will immediately cease and you agree to stop all access to and use of the Software. Provisions that by their nature survive termination shall remain in full effect.",
    },
    {
      title: "14. Governing Law",
      content:
        "This EULA, and any dispute arising out of or in connection with it, shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts located in India.",
    },
    {
      title: "15. Contact Us",
      content:
        "If you have any questions about this EULA or the Tally Connect Software, please contact us at info@averlonworld.com.",
    },
  ];

  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          End-User License Agreement
        </h1>
        <p className="text-gray-400 text-xs mt-1">Last updated: 24 December, 2025</p>
        <hr className="border-gray-200 mt-3" />
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-base font-bold text-blue-900 mb-3">
            {section.title}
          </h3>
          <hr className="border-gray-200 mb-4" />
          {section.content && (
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {section.content}
            </p>
          )}
          {section.list && (
            <ul className="space-y-2">
              {section.list.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {section.subsections && (
            <div className="space-y-4">
              {section.subsections.map((sub) => (
                <div key={sub.subtitle}>
                  <p className="text-xs font-semibold text-gray-800 mb-1">
                    {sub.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {sub.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}