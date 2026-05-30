interface PrivacyPolicyProps {
  onBack: () => void;
}

// ─── Shared primitives (same as ToS) ─────────────────────────────────────────

function PPNote({
  type,
  title,
  body,
}: {
  type: "warn" | "info" | "rust" | "ok";
  title: string;
  body: string;
}) {
  const styles = {
    warn: "bg-amber-50 border-amber-500 text-amber-900",
    info: "bg-blue-50 border-blue-600 text-blue-900",
    rust: "bg-red-50 border-red-700 text-red-900",
    ok: "bg-green-50 border-green-600 text-green-900",
  };
  return (
    <div
      className={`border-l-4 rounded-md p-4 my-4 text-sm leading-relaxed ${styles[type]}`}
    >
      <strong className="block mb-1 font-semibold">{title}</strong>
      {body}
    </div>
  );
}

function PPBulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

function PPSubHeading({ title }: { title: string }) {
  return (
    <h4 className="text-sm font-semibold text-gray-800 mb-2 mt-5 flex items-center gap-2">
      <span className="w-0.5 h-4 bg-blue-400 rounded-full flex-shrink-0" />
      {title}
    </h4>
  );
}

function PPPara({ html }: { html: string }) {
  return (
    <p
      className="text-gray-600 text-sm leading-relaxed mb-3"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function PPTable({ heads, rows }: { heads: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-blue-900 text-white">
            {heads.map((h) => (
              <th key={h} className="text-left px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-3 py-2 border-t border-gray-100 align-top"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Privacy Policy</h1>
        <p className="text-gray-400 text-xs mt-1">
          Effective: 30 May 2026 &nbsp;·&nbsp; Version 1.0 &nbsp;·&nbsp;
          Compliance: DPDP Act 2023 · IT Act 2000 &nbsp;·&nbsp; Contact Support:
          info@averlonworld.com
        </p>
        <hr className="border-gray-200 mt-3" />
      </div>

      {/* ── Stamp ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-xs text-gray-500 font-mono flex flex-wrap gap-x-6 gap-y-1">
        <span>
          Last Updated: <strong className="text-gray-700">30 May 2026</strong>
        </span>
        <span>
          Privacy Officer:{" "}
          <strong className="text-gray-700">info@averlonworld.com</strong>
        </span>
        <span>
          Controller/Processor:{" "}
          <strong className="text-gray-700">
            Customer = Data Controller · Tally Connect = Data Processor
          </strong>
        </span>
      </div>

      <PPPara
        html={`Tally Connect (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates a SaaS integration platform connecting Tally ERP systems with CRM, employee tracking, and workflow tools. This Privacy Policy describes how we collect, use, store, share, and protect personal and business data when you use our platform.`}
      />
      <PPPara
        html={`In this policy, &ldquo;Customer&rdquo; is the organisation that subscribes to Tally Connect; &ldquo;User&rdquo; or &ldquo;you&rdquo; refers to individuals who use the platform (employees, administrators, field agents). The Customer is the <strong>Data Controller</strong>; Tally Connect acts as a <strong>Data Processor</strong> on the Customer's instructions.`}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 · DATA WE COLLECT
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          1. Data We Collect
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="We collect only the data required to deliver and operate the platform. Below is a complete, categorised breakdown:" />

        <PPSubHeading title="Account and Identity Data" />
        <PPBulletList
          items={[
            "Full name, email address, job title, department, and organisational role — provided at registration",
            "Password (stored as a bcrypt hash; plaintext passwords are never stored or transmitted post-login)",
            "Organisation name, company registration details, and subscription configuration",
            "Administrator-assigned roles, module permissions, and data visibility settings",
          ]}
        />

        <PPSubHeading title="Tally ERP Financial and Business Data" />
        <PPBulletList
          items={[
            "Ledger records and account names (Sundry Debtors, Creditors, etc.) from Tally Prime via the Agent software",
            "Voucher data including sales invoices, purchase bills, journal entries, and payment records",
            "Inventory item names and stock quantities (where synchronised)",
            "Trial balance, balance sheet, and profit and loss data (where synchronised)",
            "Company name, financial year configuration, and Tally company GUID",
          ]}
        />
        <PPNote
          type="info"
          title="Read-Only Principle"
          body="Tally Connect reads financial data from your Tally system for display and reporting only. We do not create, modify, or delete data in your Tally ERP. All source financial data remains within your own infrastructure."
        />

        <PPSubHeading title="Client and Contact Data" />
        <PPBulletList
          items={[
            "Business name, address, city, state, PIN code, and country",
            "Contact email and phone number (where provided)",
            "Tally ERP ledger reference (GUID) for integrated accounts",
            "Notes, status, and activity history",
          ]}
        />

        <PPSubHeading title="Device and Technical Data" />
        <PPBulletList
          items={[
            "Device fingerprint (hardware identifiers) — collected by the Agent software for licence verification only",
            "Operating system version, application version, and IP address",
            "Session authentication tokens (JWT — cryptographically signed, 7-day expiry)",
            "System and application error logs, API request metadata",
          ]}
        />

        <PPSubHeading title="Communication and Support Data" />
        <PPBulletList
          items={[
            "Emails and messages sent to our support, legal, or privacy team",
            "Bug reports, feature requests, and feedback submitted through the platform or by email",
          ]}
        />

        <PPNote
          type="warn"
          title="Sensitive Data — Do Not Upload"
          body="Tally Connect is not designed to process sensitive personal data. Do not upload Aadhaar numbers, PAN cards, passport copies, complete bank account credentials, medical records, biometric data, or any other category of sensitive personal data as defined under the IT (SPDI) Rules 2011 or the DPDP Act 2023 — unless you have a specific, documented, and lawful basis for doing so and have notified us accordingly."
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 · HOW WE USE DATA
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          2. How We Use Your Data
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="We process data only for the purposes described below. We do not use your data for advertising, and we do not sell it to any third party under any circumstances." />
        <PPTable
          heads={["Purpose", "Data Used"]}
          rows={[
            [
              "Providing core platform functionality — Tally data sync, dashboard, reporting",
              "Financial Data, Account Data, Device Data",
            ],
            [
              "CRM and client management features",
              "Client and Contact Data, Meeting Records",
            ],
            [
              "Employee activity tracking and field workforce management (where enabled)",
              "Location Data, Activity Records, Expense Data",
            ],
            [
              "User authentication and session management",
              "Account Data, Device Data",
            ],
            [
              "Licence verification and Agent software activation",
              "Device Fingerprint, Licence Key",
            ],
            [
              "Organisation-wide analytics and reports for Administrators",
              "All Customer Data (aggregated)",
            ],
            [
              "Processing subscription payments",
              "Billing details (handled by payment gateway)",
            ],
            [
              "Security monitoring, abuse detection, and incident response",
              "Technical Data, Audit Logs",
            ],
            [
              "Customer support and issue resolution",
              "Communication Data, Account Data",
            ],
            [
              "Legal compliance and regulatory obligations",
              "All relevant data",
            ],
            [
              "Platform improvement (anonymised and aggregated data only)",
              "De-identified usage statistics — no personal data",
            ],
          ]}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 · LEGAL BASIS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          3. Legal Basis for Processing
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="We process personal data on one or more of the following legal bases, consistent with the Digital Personal Data Protection Act 2023 (India) and, where applicable, the EU General Data Protection Regulation (GDPR):" />
        <PPTable
          heads={[
            "Processing Activity",
            "Legal Basis (DPDP Act 2023)",
            "GDPR Equivalent (if applicable)",
          ]}
          rows={[
            [
              "Delivering the contracted SaaS service",
              "Contractual necessity — subscription agreement",
              "Art. 6(1)(b) — Contract performance",
            ],
            [
              "Tally data synchronisation",
              "Contractual necessity / Customer instruction",
              "Art. 6(1)(b) — Contract performance",
            ],
            [
              "User account management and authentication",
              "Contractual necessity",
              "Art. 6(1)(b) — Contract performance",
            ],
            [
              "Security monitoring and audit logging",
              "Legitimate interests — platform security and integrity",
              "Art. 6(1)(f) — Legitimate interests",
            ],
            [
              "Legal compliance and regulatory reporting",
              "Legal obligation",
              "Art. 6(1)(c) — Legal obligation",
            ],
            [
              "Platform improvement using anonymised data",
              "Legitimate interests — product development",
              "Art. 6(1)(f) — Legitimate interests",
            ],
          ]}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 · DATA RETENTION
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          4. Data Retention Policy
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="We retain data only for as long as necessary to fulfil the purpose for which it was collected, subject to statutory obligations. The following retention schedules apply:" />
        <PPTable
          heads={["Data Category", "Retention Period", "Basis / Reason"]}
          rows={[
            [
              "Tally ERP Synced Financial Data (cached)",
              "Duration of subscription",
              "Service delivery; data cleared on account termination",
            ],
            [
              "Expense Records (financial entries)",
              "7 years",
              "Statutory requirement — GST Act, Income Tax Act, Companies Act 2013",
            ],
            [
              "Expense Receipt Images",
              "7 years",
              "Financial audit and reimbursement compliance",
            ],
            [
              "Client / CRM Data (active subscription)",
              "Duration of subscription",
              "Service delivery",
            ],
            [
              "Client Data (post-termination)",
              "30-day grace period",
              "Customer data export window; deleted automatically after expiry",
            ],
            [
              "User Account Data",
              "Account lifetime + 90 days",
              "Account management and audit trail",
            ],
            [
              "Device Fingerprint (licence verification)",
              "Duration of active licence",
              "Licence enforcement; deleted on licence cancellation",
            ],
            [
              "System Audit Logs",
              "12 months",
              "Security monitoring and incident response",
            ],
            [
              "Support Communications",
              "3 years",
              "Dispute resolution and quality assurance",
            ],
            [
              "Payment and Billing Records",
              "7 years",
              "GST compliance, statutory financial record-keeping",
            ],
          ]}
        />
        <PPPara html="After the applicable retention period, data is permanently and irreversibly deleted or de-identified. Customers with industry-specific statutory retention requirements may contact info@averlonworld.com to discuss customised arrangements." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 · DATA SHARING
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          5. Data Sharing &amp; Third Parties
        </h3>
        <hr className="border-gray-200 mb-4" />

        <PPSubHeading title="We Do Not Sell Your Data" />
        <PPPara html="Tally Connect does not sell, rent, share, or disclose your personal or financial data to any third party for commercial, advertising, or profiling purposes. Our data sharing is limited strictly to what is necessary to operate the platform." />

        <PPSubHeading title="Authorised Sharing" />
        <PPPara html="We share data only in the following circumstances:" />
        <PPBulletList
          items={[
            "<strong>The Customer (Data Controller)</strong> as required to provide the Service — all Customer Data remains accessible to and controllable by the Customer",
            "<strong>Legal demands</strong> — where required by a court order, government authority, regulatory body, or law enforcement. Where legally permitted, we will notify the Customer before disclosure",
            "<strong>Business transfer</strong> — in the event of a merger, acquisition, or sale of assets, Customer Data is transferred under the same privacy protections, with advance notice to affected Customers",
          ]}
        />

        <PPSubHeading title="Tally Solutions Pvt. Ltd." />
        <PPPara html="Data synchronised from Tally Prime originates from the Customer's own locally deployed Tally installation. Tally Connect does not share any Customer data with Tally Solutions Pvt. Ltd. and does not interact with Tally's cloud services or corporate infrastructure. Any relationship between the Customer and Tally Solutions is entirely independent of Tally Connect." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 · DATA SECURITY
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          6. Data Security Measures
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="We implement industry-standard technical and organisational security controls to protect your data, consistent with Rule 8 of the IT (SPDI) Rules 2011 and DPDP Act 2023 obligations:" />
        <PPTable
          heads={["Security Control", "Implementation"]}
          rows={[
            [
              "Encryption in Transit",
              "All communications between the Agent, mobile app, web dashboard, and backend APIs use HTTPS / TLS 1.2 or higher. HTTP requests are automatically redirected to HTTPS.",
            ],
            [
              "Encryption at Rest",
              "Sensitive data fields and uploaded files in cloud storage are encrypted at rest using AES-256 or equivalent industry-standard encryption. Database backups are also encrypted.",
            ],
            [
              "Password Security",
              "User passwords are hashed using bcrypt with a minimum of 10 salt rounds. Plaintext passwords are never stored, logged, or transmitted after initial submission over HTTPS.",
            ],
            [
              "Authentication",
              "JSON Web Tokens (JWT) with cryptographic signing and 7-day automatic expiry. Every API request is validated. Admin-level actions require elevated authentication checks.",
            ],
            [
              "Role-Based Access Control (RBAC)",
              "Users can only access data and modules explicitly permitted by the Administrator. No cross-organisation data access is possible.",
            ],
            [
              "SQL Injection Prevention",
              "All database interactions use parameterised queries. Input is validated and sanitised at the API layer before any database operation.",
            ],
            [
              "Agent Software Security",
              "The Agent (agent.exe) communicates with the backend using a shared middleware token over HTTPS. Device fingerprint verification prevents unauthorised use on unlicensed machines.",
            ],
            [
              "Audit Logging",
              "All Administrator actions, data exports, permission changes, and significant data events are logged with User ID, timestamp, IP address, and action detail. Logs retained for 12 months.",
            ],
            [
              "Database Security",
              "Database hosted on a private, network-isolated environment with least-privilege application credentials. Regular automated encrypted backups with tested restore procedures.",
            ],
            [
              "File Storage Security",
              "Uploaded files stored in access-controlled cloud storage with signed, time-limited URLs. Direct URL guessing is not possible.",
            ],
          ]}
        />
        <PPNote
          type="warn"
          title="Security Limitation Notice"
          body="While we implement industry-standard controls, no system can guarantee absolute security against all threats. Tally Connect cannot warrant that the platform will be free from all vulnerabilities or breaches. We are not liable for security incidents arising from: third-party infrastructure failures; zero-day vulnerabilities; or the Customer's failure to maintain secure credentials and device configurations."
        />

        <PPSubHeading title="Data Breach Response" />
        <PPPara html="In the event of a confirmed personal data breach that is likely to pose a risk to the rights and freedoms of individuals, Tally Connect will:" />
        <PPBulletList
          items={[
            "Notify affected Customers without undue delay and within the timeframe prescribed by applicable law",
            "Notify the Data Protection Board of India or other competent regulatory authority where required by the DPDP Act 2023",
            "Provide a written incident report describing the nature of the breach, data affected, likely consequences, and remedial measures taken",
            "Work cooperatively with the Customer to manage, contain, and remediate the incident",
          ]}
        />

        <PPSubHeading title="Your Security Responsibilities" />
        <PPBulletList
          items={[
            "Keep your login credentials, API keys, and middleware tokens confidential at all times",
            "Implement strong password policies for all users (minimum 8 characters; rotation every 90 days recommended)",
            "Ensure devices running the Agent software are protected with OS-level security updates and access controls",
            "Revoke platform access immediately for departed employees or compromised credentials",
            "Report suspected security incidents to security@tallyconnect.in without delay",
          ]}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 · YOUR RIGHTS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          7. Your Privacy Rights
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="Under the Digital Personal Data Protection Act 2023 and applicable Indian law, you have the following rights as a data principal. These rights are exercisable directly with Tally Connect or, in the first instance, through your employer (Customer) as Data Controller." />
        <PPTable
          heads={["Right", "What It Means", "How to Exercise", "Timeline"]}
          rows={[
            [
              "Right of Access",
              "Receive a copy of the personal data we hold about you",
              "Email info@averlonworld.com with identity verification, or request via your Administrator",
              "Within 30 days",
            ],
            [
              "Right to Correction",
              "Have inaccurate, incomplete, or outdated personal data corrected",
              "Contact your Administrator directly, or email info@averlonworld.com",
              "Within 30 days",
            ],
            [
              "Right to Erasure",
              "Request deletion of personal data where there is no overriding legal basis for continued retention",
              "Email info@averlonworld.com (note: statutory retention periods apply to financial and consent records)",
              "Within 30 days",
            ],
            [
              "Right to Withdraw Consent",
              "Withdraw consent to location tracking at any time without penalty",
              "Toggle off in app settings, revoke Android location permission, or contact Administrator",
              "Immediate",
            ],
            [
              "Right to Data Portability",
              "Receive your data in a standard, machine-readable format (CSV, JSON, Excel)",
              "Use the Administrator dashboard export function, or email support@tallyconnect.in for bulk export",
              "Within 30 days",
            ],
            [
              "Right to Grievance Redressal",
              "Lodge a complaint about data processing practices and receive a resolution",
              "Email info@averlonworld.com — acknowledged within 3 business days, resolved within 30 days",
              "30 days to resolve",
            ],
            [
              "Right to Nominate",
              "Nominate another person to exercise rights on your behalf in case of death or incapacity",
              "Submit a written nomination form to info@averlonworld.com",
              "Within 30 days",
            ],
          ]}
        />
        <PPNote
          type="info"
          title="Two-Party Data Relationship"
          body="Tally Connect processes your data as a Data Processor, acting under instructions from your employer (the Customer as Data Controller). For most rights requests, your employer is the primary point of contact. You may also contact us directly at info@averlonworld.com and we will coordinate with the Customer to fulfil your request as required by law."
        />

        <PPSubHeading title="Escalation to Regulatory Authority" />
        <PPPara html="If you are not satisfied with our response to a grievance, you may escalate your complaint to the <strong>Data Protection Board of India</strong> once the adjudicatory framework under the DPDP Act 2023 is formally operational, or to any other competent authority under applicable law." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 · CROSS-BORDER TRANSFERS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          8. Cross-Border Data Transfers
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="Tally Connect's operations are headquartered in India. However, certain third-party processors may process data in servers located outside India. Where such international transfers occur, Tally Connect ensures the following safeguards are in place:" />
        <PPBulletList
          items={[
            "Transfers are made only to countries or processors providing an adequate level of data protection",
            "Standard Contractual Clauses (SCCs) are in place with processors such as Google, under their Data Processing Terms",
            "All third-party processors are bound by Data Processing Agreements requiring them to handle data consistent with this Privacy Policy and applicable Indian law",
            "As DPDP Act 2023 rules on cross-border data transfers are formally notified by the Government of India, Tally Connect will update its transfer mechanisms to comply with any country-specific restrictions or adequacy requirements",
            "Where the Customer is subject to data localisation requirements for financial or regulated data, Tally Connect will assist in configuring India-region hosting options where technically available",
          ]}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9 · CHILDREN'S PRIVACY
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          9. Children&apos;s Privacy
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="Tally Connect is a business-to-business enterprise platform designed exclusively for use by organisations and their adult employees. The platform is not intended for, directed at, or accessible to individuals under 18 years of age. We do not knowingly collect personal data from children. If we become aware that data of a person under 18 has been submitted to the platform, we will delete it promptly and notify the relevant Customer Administrator." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10 · COOKIES & DEVICE DATA
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          10. Cookies &amp; Device Data
        </h3>
        <hr className="border-gray-200 mb-4" />

        <PPSubHeading title="Web Dashboard Cookies" />
        <PPPara html="The Tally Connect web dashboard uses strictly necessary cookies and local session storage to maintain authenticated sessions and user preferences. We do not use tracking cookies, advertising cookies, or third-party analytics that profile individual users. Session cookies expire when the browser is closed or after 7 days of inactivity." />

        <PPSubHeading title="Agent Software — Local Data" />
        <PPPara html="The Agent software (agent.exe) stores configuration data and a local queue cache on the host machine. This includes: connection settings for the Tally ODBC Server, the authenticated middleware token (encrypted), and a local buffer queue for data pending transmission. This local data is not accessible to any party other than the authorised Customer Administrator and is deleted upon Agent uninstallation." />

        <PPSubHeading title="Device Fingerprinting" />
        <PPPara html="The Agent uses hardware-based device fingerprinting solely for software licence verification purposes. The fingerprint data is not linked to any personally identifiable information, is not shared with third parties, and is retained only for the duration of the active licence." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 11 · POLICY CHANGES
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          11. Changes to This Privacy Policy
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="We may update this Privacy Policy from time to time to reflect changes in our data practices, new platform features, or applicable legal requirements. When we make material changes, we will:" />
        <PPBulletList
          items={[
            "Post the updated policy with a revised &ldquo;Last Updated&rdquo; date at the top of this page",
            "Send an email notification to the registered Administrator address at least <strong>15 days</strong> before the changes take effect",
            "Display an in-app banner for changes requiring re-acknowledgement of consent",
          ]}
        />
        <PPPara html="Continued use of Tally Connect after the effective date of any revision constitutes acceptance of the updated policy. All prior versions are archived and available on request at info@averlonworld.com." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 12 · CONTACT & GRIEVANCES
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          12. Contact Us &amp; Grievance Redressal
        </h3>
        <hr className="border-gray-200 mb-4" />
        <PPPara html="For any questions, concerns, or requests relating to this Privacy Policy or your personal data, please contact our designated Privacy Officer:" />

        <div className="grid grid-cols-2 gap-3 mt-2 mb-6 items-start">
          {[
            ["Contact Support", "info@averlonworld.com"],
            ["Phone", "+91 9892440788"],
            [
              "Registered Address",
              "Averlon Enterprise Solutions Private Limited ,5th Floor, Lodha Supremus - II, Phase - II, Unit No. A-515, Road No. 22, Wagle Industrial Estate, Thane West, 400604, Mumbai, Maharashtra, India",
            ],
          ].map(([label, val]) => (
            <div
              key={label}
              className={`bg-white border border-gray-200 rounded-lg px-4 py-3 ${label === "Registered Address" ? "col-span-2" : ""}`}
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-1">
                {label}
              </p>
              <p className="text-sm text-blue-800 font-medium font-mono">
                {val}
              </p>
            </div>
          ))}
        </div>

        <PPPara html="All privacy requests and grievances are acknowledged within <strong>3 business days</strong> and resolved within <strong>30 calendar days</strong>. Where a request cannot be fulfilled (for example, due to a statutory retention obligation), we will provide a written explanation of the reason." />

        <PPNote
          type="info"
          title="Data Protection Board of India"
          body="Where required under the DPDP Act 2023, unresolved grievances may be escalated to the Data Protection Board of India. Details of the Board's complaint procedure will be published once the adjudicatory framework is formally notified by the Government of India."
        />
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-gray-200 pt-6 text-center">
        <p className="text-xs text-gray-400 font-mono">
          © 2026 Tally Connect. All rights reserved. &nbsp;·&nbsp; Governed by
          the laws of India &nbsp;·&nbsp; Jurisdiction: Courts of Mumbai,
          Maharashtra &nbsp;·&nbsp;{" "}
          <a
            href="mailto:info@averlonworld.com"
            className="text-blue-600 underline"
          >
            info@averlonworld.com
          </a>
        </p>
        <p className="text-xs text-gray-400 font-mono mt-1">
          Tally Connect is an independent platform. &ldquo;Tally&rdquo; and
          &ldquo;Tally Prime&rdquo; are registered trademarks of Tally Solutions
          Pvt. Ltd. Tally Connect is not affiliated with or endorsed by Tally
          Solutions Pvt. Ltd.
        </p>
      </div>
    </div>
  );
}
