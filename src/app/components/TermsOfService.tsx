interface TermsOfServiceProps {
  onBack: () => void;
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function Note({
  type,
  title,
  body,
}: {
  type: "warn" | "info" | "rust";
  title: string;
  body: string;
}) {
  const styles = {
    warn: "bg-amber-50 border-amber-500 text-amber-900",
    info: "bg-blue-50 border-blue-600 text-blue-900",
    rust: "bg-red-50 border-red-700 text-red-900",
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

function BulletList({ items }: { items: string[] }) {
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

function SubHeading({ title }: { title: string }) {
  return (
    <h4 className="text-sm font-semibold text-gray-800 mb-2 mt-5 flex items-center gap-2">
      <span className="w-0.5 h-4 bg-blue-400 rounded-full flex-shrink-0" />
      {title}
    </h4>
  );
}

function Para({ html }: { html: string }) {
  return (
    <p
      className="text-gray-600 text-sm leading-relaxed mb-3"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Terms of Service</h1>
        <p className="text-gray-400 text-xs mt-1">
          Effective: 30 May 2026 &nbsp;·&nbsp; Version 1.0 &nbsp;·&nbsp;
          Jurisdiction: Mumbai, Maharashtra, India &nbsp;·&nbsp; Contact:{" "}
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
          Applies to:{" "}
          <strong className="text-gray-700">
            All Customers, Admins &amp; Users
          </strong>
        </span>
        <span>
          Governed by:{" "}
          <strong className="text-gray-700">
            Laws of India · Indian Contract Act 1872 · IT Act 2000 · DPDP Act
            2023
          </strong>
        </span>
      </div>

      {/* ── Top warning ── */}
      <Note
        type="warn"
        title="Important — Please Read Carefully"
        body="These Terms of Service constitute a legally binding agreement. By accessing, installing, or using any component of Tally Connect, you confirm you have read, understood, and unconditionally agree to be bound by all provisions herein. If you do not agree, you must immediately cease all use and uninstall all associated software."
      />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 · ACCEPTANCE OF TERMS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          1. Acceptance of Terms
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Formation of a Binding Agreement" />
        <Para html="These Terms of Service (&ldquo;Terms&rdquo;), together with our Privacy Policy and any executed Order Form or Data Processing Agreement, constitute a legally binding contract between you and the operator of Tally Connect (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) under the Indian Contract Act, 1872. Acceptance is confirmed when you perform any of the following actions:" />
        <BulletList
          items={[
            "Click &ldquo;I Agree&rdquo;, &ldquo;Accept&rdquo;, or a similar confirmation during onboarding or setup",
            "Complete organisation registration or account creation",
            "Install or activate the Tally Connect Agent software (agent.exe) on any device",
            "Access the Tally Connect web dashboard or API",
            "Make payment for any subscription plan",
            "Authorise a user account within the platform",
          ]}
        />

        <SubHeading title="Eligibility" />
        <Para html="By accepting these Terms, you represent and warrant that:" />
        <BulletList
          items={[
            "You are at least 18 years of age and have the legal capacity to enter into binding contracts under applicable law",
            "If you are acting on behalf of an organisation, you hold the authority to bind that organisation — such as a director, officer, or authorised signatory",
            "All registration and account information provided is accurate, complete, and current",
            "Your use of the platform complies with all applicable laws in your jurisdiction",
          ]}
        />

        <SubHeading title="Changes to These Terms" />
        <Para html="We reserve the right to update these Terms at any time. For material changes, we will provide at least <strong>15 days' advance notice</strong> via email to the registered account address and an in-app notification. Continued use of Tally Connect after the effective date of any revision constitutes your acceptance of the updated Terms. All prior versions are archived and available on request at info@averlonworld.com." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 · DESCRIPTION OF SERVICE
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          2. Description of Service
        </h3>
        <hr className="border-gray-200 mb-4" />
        <Para html="Tally Connect is a cloud-based, business-to-business (B2B) Software-as-a-Service (SaaS) integration and workflow automation platform. It is designed exclusively for lawful commercial use by organisations that use Tally ERP accounting software and wish to connect their accounting data with CRM, employee management, and operational tools." />

        <SubHeading title="Tally ERP Data Integration" />
        <Para html="The platform synchronises business data from Tally Prime and Tally ERP systems — including ledgers, vouchers, inventory records, sales and purchase data, and trial balance information — into the Tally Connect dashboard for reporting, visualisation, and operational review. The Agent software (agent.exe) installed on the Customer's local machine facilitates this data exchange via authorised API communication." />

        <SubHeading title="CRM and Client Management" />
        <Para html="Manage and organise client and customer databases enriched with data drawn from Tally ledgers. Features include client visit logging, meeting records, notes, and contact history linked directly to accounting counterparties." />

        <SubHeading title="Expense Tracking and Reporting" />
        <Para html="Field agents and employees can record work-related travel expenses including route details, transport mode, amounts, and receipt uploads. Data is exportable for integration with accounting or payroll systems." />

        <SubHeading title="Document Storage and File Management" />
        <Para html="Upload, store, organise, and share business documents, meeting attachments, and financial reports. Storage is subject to subscription plan limits and governed by the data handling terms herein." />

        <SubHeading title="Analytics and Reporting" />
        <Para html="Administrators access organisation-wide dashboards covering financial summaries, client activity, employee performance, and expense analytics drawn from synchronised Tally data and platform-generated activity records." />
        <Note
          type="info"
          title="Read-Only Data Principle"
          body="Tally Connect reads and displays data from your connected Tally system. The platform does not create, modify, or delete data within Tally ERP. All financial data remains in your Tally system; Tally Connect is an interface and reporting layer only."
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 · TALLY INTEGRATION DISCLAIMER
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          3. Tally Integration Disclaimer
        </h3>
        <hr className="border-gray-200 mb-4" />
        <Note
          type="rust"
          title="Independent Platform — Not Affiliated with Tally Solutions"
          body="Tally Connect is an independent software integration platform. It is not affiliated with, endorsed by, sponsored by, or otherwise connected to Tally Solutions Pvt. Ltd. in any official capacity."
        />

        <SubHeading title="Trademark Notice" />
        <Para html='"Tally", "Tally Prime", "TallyERP", and associated product names are registered trademarks of <strong>Tally Solutions Pvt. Ltd.</strong> These marks are used in these Terms and in the platform solely for the purpose of identifying the third-party software with which Tally Connect integrates, and no trademark licence is claimed or implied.' />

        <SubHeading title="Integration Method" />
        <Para html="Tally Connect integrates with Tally ERP systems through authorised, documented data exchange mechanisms including the Tally ODBC interface and XML-based API requests. The integration operates entirely on the Customer's locally deployed Tally installation via the Agent software. We do not access Tally's cloud infrastructure, internal systems, or source code." />

        <SubHeading title="No Liability for Tally System Issues" />
        <Para html="The accuracy, completeness, and integrity of data displayed in Tally Connect depends entirely on the data maintained in the Customer's own Tally system. Tally Connect shall not be liable for:" />
        <BulletList
          items={[
            "Data discrepancies, errors, or omissions originating within the Tally ERP system",
            "Synchronisation failures caused by changes to Tally software, ODBC configurations, or network conditions",
            "Any accounting, tax, or financial decisions made based on data displayed by the platform",
            "Compatibility issues arising from Tally version upgrades or configuration changes made without notice",
          ]}
        />

        <SubHeading title="Customer Responsibilities for Integration" />
        <Para html="The Customer is solely responsible for ensuring that: (a) Tally ODBC Server is properly enabled and configured; (b) the Agent software is installed on a machine with network access to the Tally database; (c) the integration credentials and middleware token are kept secure; and (d) Tally data is accurate and regularly maintained." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 · ACCOUNT & ADMINISTRATION
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          4. Account &amp; Administration
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Organisation Account Model" />
        <Para html="Each subscribing organisation constitutes a single Customer account. The individual who purchases the subscription or completes registration becomes the primary <strong>Administrator</strong> for that organisation. Tally Connect does not provide public or self-registration for general users — all user accounts are created and controlled by the Administrator." />

        <SubHeading title="Administrator Responsibilities" />
        <Para html="The Administrator is the Customer's designated point of control for the platform and is responsible for:" />
        <BulletList
          items={[
            "Creating, managing, and deactivating user accounts within the organisation",
            "Assigning roles, modules, permissions, and data visibility to each user",
            "Ensuring all users are informed of and comply with these Terms and applicable law",
            "Revoking access promptly for departed employees, role changes, or suspected misuse",
            "Configuring and maintaining the Tally integration and Agent software",
            "Maintaining the security of Administrator credentials and API keys",
          ]}
        />

        <SubHeading title="Account Security" />
        <Para html="You are wholly responsible for all activities conducted under your account. This includes activities by authorised users, as well as unauthorised activities resulting from credential compromise where you failed to implement reasonable security measures. If you suspect any unauthorised access or security incident, notify us immediately at info@averlonworld.com." />

        <SubHeading title="Agent Software (agent.exe) Activation" />
        <Para html="The Agent software is licensed to the Customer for installation on designated machines that host or have network access to the Tally ERP system. The Agent is activated using a device fingerprint and licence key tied to the Customer's subscription. Each licence key may be activated on a limited number of devices as specified in the subscription plan. Installing the Agent on additional devices without an upgraded licence constitutes a breach of these Terms." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 · EMPLOYEE MONITORING DISCLOSURE
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          5. Employee Monitoring Disclosure
        </h3>
        <hr className="border-gray-200 mb-4" />
        <Note
          type="warn"
          title="Mandatory Employer Obligation"
          body="The Digital Personal Data Protection Act 2023, the Information Technology Act 2000, and applicable Indian labour law require employers to disclose monitoring practices to employees before deployment. This section sets out both the nature of monitoring available through Tally Connect and the obligations of the Customer as employer."
        />

        <SubHeading title="Customer's Obligations Before Enabling Monitoring" />
        <Para html="Before enabling any monitoring feature, the Customer (as employer and Data Controller) must:" />
        <BulletList
          items={[
            "Provide written notice to all affected employees describing: what data is collected, at what frequency, who can access it, for how long it is retained, and the specific business purposes for which it will be used",
            "Obtain documented, explicit consent from each employee where required under the DPDP Act 2023 or applicable labour law, and retain signed consent records",
            "Update the organisation's Employee Handbook, IT Acceptable Use Policy, or equivalent workplace policy to disclose GeoTrack/Tally Connect monitoring",
            "Restrict monitoring to working hours unless a separate, explicit, and lawful basis exists for out-of-hours tracking",
            "Inform employees of their right to access, correct, and request deletion of their personal data",
            "Obtain independent legal advice to confirm compliance with all applicable labour, privacy, and surveillance laws",
          ]}
        />

        <SubHeading title="Prohibited Monitoring Practices" />
        <Para html="The Customer must not use Tally Connect's monitoring features to:" />
        <BulletList
          items={[
            "Track employees without their knowledge or without legally required consent",
            "Monitor personal, off-duty time without a separate explicit and lawful basis",
            "Discriminate against any individual based on a protected characteristic",
            "Retaliate against employees who exercise their data rights or lawfully object to monitoring",
            "Use location data as the sole basis for disciplinary action without corroborating evidence",
            "Continue tracking an individual after their employment or engagement has ended",
          ]}
        />

        <SubHeading title="Tally Connect's Role" />
        <Para html="Tally Connect is a technology tool. We do not make employment decisions, do not advise on the lawfulness of monitoring practices, and bear no liability for any employment dispute, regulatory penalty, or legal claim arising from the Customer's deployment of monitoring features. All such responsibility rests exclusively with the Customer." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 · USER RESPONSIBILITIES
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          6. User Responsibilities
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Individual User Obligations" />
        <BulletList
          items={[
            "Provide accurate, truthful information at registration and throughout use of the platform",
            "Keep login credentials confidential; do not share passwords or session tokens with others",
            "Use the platform only for legitimate, authorised business purposes within the scope of your role",
            "Report suspected security incidents or credential compromise immediately to your Administrator and to info@averlonworld.com",
            "Comply with your employer's internal policies governing use of Tally Connect",
            "Verify the accuracy of Tally data before relying on it for business, financial, or tax decisions",
          ]}
        />

        <SubHeading title="Customer (Organisation) Obligations" />
        <BulletList
          items={[
            "Ensure all users are properly informed of and have consented to platform features, including monitoring where enabled",
            "Maintain accurate user account records and revoke access promptly for departed or role-changed employees",
            "Comply with all applicable laws — including the IT Act 2000, DPDP Act 2023, GST Act, and applicable labour legislation — in all jurisdictions where the platform is deployed",
            "Maintain the accuracy and integrity of data entered into or synchronised through the platform",
            "Implement the Agent software on systems meeting the technical requirements and keeping it updated",
            "Export and retain all data required for statutory or audit purposes before cancelling a subscription",
            "Not exceed the user count, device activations, or data storage limits of the subscribed plan",
          ]}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 · ACCEPTABLE USE POLICY
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          7. Acceptable Use Policy
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Permitted Uses" />
        <Para html="Tally Connect may be used solely for:" />
        <BulletList
          items={[
            "Reading, displaying, and analysing data from the Customer's own Tally system",
            "Internal business reporting, financial review, and operational decision-making",
            "Document and file storage directly related to business operations",
          ]}
        />

        <SubHeading title="Strictly Prohibited Activities" />
        <Para html="You must not use Tally Connect, the Agent software, or any associated API to:" />
        <BulletList
          items={[
            "Reverse engineer, decompile, disassemble, or attempt to extract the source code of any platform component including the Agent (agent.exe), web dashboard, or backend APIs",
            "Circumvent, disable, or interfere with device fingerprint verification, licence key authentication, or any other access control mechanism",
            "Access, display, or export data belonging to any organisation other than your own",
            "Share, sublicense, or resell access to the platform or any of its features to third parties",
            "Use the platform to build a competing product, or to benchmark the platform for competitive disclosure without prior written consent",
            "Upload, store, or transmit illegal, defamatory, obscene, or harassing content",
            "Upload personally identifiable government documents (Aadhaar, PAN, passports), biometric data, or sensitive health records except where strictly required for a defined, disclosed business purpose",
            "Introduce viruses, malware, ransomware, or any malicious code into the platform or Agent software",
            "Conduct automated scanning, probing, or security testing of Tally Connect infrastructure without prior written authorisation",
            "Use the platform in connection with any fraudulent, deceptive, or unlawful activity — including tax evasion, financial misrepresentation, or misuse of accounting data",
            "Violate any applicable Indian or international law, including the IT Act 2000, DPDP Act 2023, GST regulations, or Companies Act",
          ]}
        />

        <SubHeading title="Financial Data Accuracy Disclaimer" />
        <Note
          type="rust"
          title="Accounting Accuracy — User Responsibility"
          body="Tally Connect is a data integration and display layer. It does not verify, validate, or certify the accuracy of any financial data. Users are solely responsible for verifying all data before making accounting, tax, audit, or business decisions. Tally Connect is not a licensed accounting service and does not provide financial, tax, or legal advice."
        />

        <SubHeading title="Tax Filing Disclaimer" />
        <Para html="Data displayed through Tally Connect is derived from your Tally ERP system and is presented for informational purposes only. You are solely responsible for the accuracy of your tax filings, GST returns, and statutory submissions. Tally Connect shall not be liable for any tax penalties, audit findings, or regulatory action arising from errors in data displayed or exported through the platform." />

        <SubHeading title="Backup Responsibility" />
        <Para html="Tally Connect does not serve as a backup or archival system for your Tally ERP data. You must maintain independent, regular backups of your Tally database and all business data in accordance with your statutory obligations and business continuity requirements." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 · SUBSCRIPTION, PAYMENT & REFUNDS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          8. Subscription, Payment &amp; Refunds
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Subscription Model" />
        <Para html="Tally Connect is offered on a subscription basis. Access to the platform, the Agent software, and all associated features is contingent on an active, paid subscription. Subscription parameters — including the number of users, device activations, enabled modules, and data retention period — are as specified in the selected plan or any executed Order Form." />

        <SubHeading title="Fees and Payment" />
        <BulletList
          items={[
            "All subscription fees are payable in Indian Rupees (INR) in advance, exclusive of applicable taxes (GST, TDS, etc.)",
            "Accepted payment methods include bank transfer, UPI, card payments via our payment gateway, or invoicing for enterprise plans",
            "The Customer is responsible for all applicable taxes, duties, and government levies on subscription fees",
            "Prices may be revised with <strong>30 days' advance notice</strong> prior to a renewal period",
          ]}
        />

        <SubHeading title="Billing and Renewal" />
        <BulletList
          items={[
            "Subscriptions renew automatically at the end of each billing cycle unless cancelled in writing before the renewal date",
            "Renewal invoices are issued at least 7 days before the renewal date",
            "Failure to pay within <strong>7 days</strong> of the invoice due date constitutes a material breach and may result in service suspension",
          ]}
        />

        <SubHeading title="Refund and Cancellation Policy" />
        <BulletList
          items={[
            "Subscriptions are <strong>non-refundable once activated</strong>, including partial months or unused periods after cancellation",
            "Cancellation may be submitted at any time in writing to info@averlonworld.com",
            "Service continues until the last day of the current paid billing cycle after cancellation",
            "In the event that Tally Connect terminates the service without cause, a pro-rata refund for the unused subscription period will be issued",
            "Trial periods, if offered, are non-renewable and convert to paid subscriptions at expiry unless cancelled",
          ]}
        />

        <SubHeading title="Suspension for Non-Payment" />
        <Para html="Where payment is overdue by more than 7 days, Tally Connect may suspend access to the platform with 3 days' written notice. Suspension does not relieve the Customer of outstanding payment obligations. Data is retained during a suspension period of up to 30 days. After 30 days of suspension without payment, the account may be terminated and data permanently deleted." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9 · SOFTWARE LICENCE
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          9. Software Licence Agreement
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Scope of Licence" />
        <Para html="Subject to compliance with these Terms and timely payment of subscription fees, Tally Connect grants the Customer a <strong>limited, non-exclusive, non-transferable, non-sublicensable, revocable licence</strong> to:" />
        <BulletList
          items={[
            "Install and operate the Agent software (agent.exe) on the number of devices permitted under the active subscription plan",
            "Access the Tally Connect web dashboard through supported browsers during the subscription term",
            "Access the Tally Connect API for integration purposes within authorised rate limits",
            "Use official documentation and training materials for internal purposes only",
          ]}
        />

        <SubHeading title="Licence Restrictions" />
        <Para html="This licence expressly does not permit you to:" />
        <BulletList
          items={[
            "Copy, reproduce, modify, or create derivative works of any software component",
            "Decompile, reverse engineer, disassemble, or otherwise attempt to derive the source code of the Agent, dashboard, or backend",
            "Distribute, sublicense, rent, lease, or resell the software to third parties",
            "Remove, disable, or bypass the device fingerprint or licence key activation system",
            "Install the Agent on more devices than the subscribed activation limit",
            "Transfer the licence to another organisation without prior written consent",
          ]}
        />

        <SubHeading title="Device Activation and Fingerprinting" />
        <Para html="The Agent software is tied to a specific device via hardware fingerprinting for licence enforcement and security purposes. The device fingerprint collected includes hardware identifiers that uniquely identify the installation environment but does not constitute personal data. Attempting to spoof, replicate, or manipulate device fingerprints is a material breach of these Terms." />

        <SubHeading title="Software Updates" />
        <Para html="We may issue updates, patches, or new versions of the Agent or platform at any time. Updates may be applied automatically or require manual installation. You agree not to use outdated versions that have been superseded by a security-critical update. We are not liable for security incidents arising from use of deprecated software versions." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10 · INTELLECTUAL PROPERTY
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          10. Intellectual Property Rights
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Platform Ownership" />
        <Para html="All right, title, and interest in and to the Tally Connect platform — including all software code, algorithms, database schemas, user interface designs, visual elements, documentation, trademarks, and brand assets — belong exclusively to the Company and its licensors. These Terms do not transfer any ownership rights to the Customer. Tally Connect's protected intellectual property includes, without limitation:" />
        <BulletList
          items={[
            "Agent software (agent.exe) source code, binaries, and configuration logic",
            "Web dashboard and mobile application code, layouts, and interaction patterns",
            "Backend API architecture, data synchronisation algorithms, and processing logic",
            "Database schemas, data models, stored procedures, and query logic",
            "The 'Tally Connect' name, logo, trademarks, and all associated brand identity materials",
            "All documentation, user guides, API specifications, and training content",
            "Proprietary integration protocols and Tally ODBC communication methods",
          ]}
        />

        <SubHeading title="Customer Data Ownership" />
        <Para html="The Customer retains full ownership of all data submitted to or synchronised through Tally Connect, including Tally ERP data, client records, employee activity data, expense records, and uploaded documents (&ldquo;Customer Data&rdquo;). Tally Connect claims no intellectual property interest in Customer Data. By using the platform, the Customer grants us a limited licence to store, process, and transmit Customer Data solely to provide the Service, and to generate fully anonymised, aggregated statistics for platform improvement. This licence ends when the Customer's data is deleted per the retention policy." />

        <SubHeading title="Feedback and Suggestions" />
        <Para html="Any suggestions, feature requests, or feedback submitted to us regarding the platform (&ldquo;Feedback&rdquo;) becomes our property upon submission. We may freely use and implement Feedback without obligation to credit, notify, or compensate the submitter." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 11 · DISCLAIMER OF WARRANTIES
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          11. Disclaimer of Warranties
        </h3>
        <hr className="border-gray-200 mb-4" />
        <Note
          type="rust"
          title="As-Is Basis — No Warranty"
          body={`THE PLATFORM, AGENT SOFTWARE, AND ALL ASSOCIATED SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.`}
        />

        <SubHeading title="Specific Disclaimers" />
        <Para html="Tally Connect expressly disclaims all warranties, including but not limited to:" />
        <BulletList
          items={[
            "Merchantability, fitness for a particular purpose, or non-infringement",
            "The accuracy, completeness, reliability, or currency of any financial data synchronised from Tally ERP",
            "Uninterrupted, error-free, or secure operation of the platform or Agent software",
            "The suitability of platform data for accounting, tax filing, audit, payroll, or legal purposes",
            "Compatibility with all versions of Tally Prime or Tally ERP software",
          ]}
        />
        <Para html="The Customer acknowledges that all use of the platform and reliance on displayed data is at the Customer's own risk and discretion." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 12 · LIMITATION OF LIABILITY
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          12. Limitation of Liability
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Exclusion of Consequential Damages" />
        <Para html="To the maximum extent permitted by applicable law, Tally Connect and its officers, directors, employees, agents, licensors, and service providers shall not be liable for any:" />
        <BulletList
          items={[
            "Indirect, incidental, special, exemplary, punitive, or consequential damages",
            "Business or financial loss arising from reliance on data displayed or exported by the platform",
            "Accounting errors, tax penalties, GST liabilities, or audit findings connected to synchronised Tally data",
            "Loss of profits, revenue, goodwill, business opportunity, or anticipated savings",
            "Data loss, corruption, or breach arising from third-party infrastructure failures",
            "Employment disputes, regulatory penalties, or employee claims arising from use of monitoring features",
            "Service interruptions, downtime, or technical failures — including those caused by Tally system changes, network issues, or third-party outages",
          ]}
        />

        <SubHeading title="Aggregate Liability Cap" />
        <Para html="Tally Connect's total cumulative liability to the Customer for all claims arising under or related to these Terms — under any theory of law — shall not exceed the <strong>total subscription fees actually paid by the Customer in the twelve (12) calendar months immediately preceding the event giving rise to the claim</strong>." />

        <SubHeading title="Exceptions" />
        <Para html="Nothing in these Terms limits Tally Connect's liability for: (a) death or personal injury caused by our proven negligence; (b) fraud or fraudulent misrepresentation; or (c) any liability that cannot be excluded or limited under mandatory applicable law." />

        <SubHeading title="Customer Indemnification" />
        <Para html="The Customer agrees to indemnify, defend, and hold harmless Tally Connect and its personnel from all third-party claims, liabilities, damages, losses, and costs (including reasonable legal fees) arising from:" />
        <BulletList
          items={[
            "Violation of these Terms by the Customer or any User",
            "Misuse of platform data for accounting, tax, or financial misrepresentation",
            "Unlawful employee monitoring or failure to obtain legally required consent",
            "Employment disputes or regulatory actions related to platform use",
            "Infringement of any third-party intellectual property, privacy, or data rights",
            "Any claim by an employee, client, regulator, or authority arising from the Customer's deployment of the platform",
          ]}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 13 · DATA OWNERSHIP & PORTABILITY
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          13. User Data Ownership &amp; Portability
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Your Data Belongs to You" />
        <Para html="The Customer retains full and exclusive ownership of all Customer Data — including Tally ERP financial records, client data, employee activity records, expense data, and uploaded documents — at all times. Tally Connect processes this data solely as a service provider acting on your instructions. We assert no ownership, control, or intellectual property interest in your data beyond what is necessary to provide the platform." />

        <SubHeading title="Data Export Rights" />
        <Para html="The Customer has the right to export all Customer Data at any time during an active subscription, in the following formats: CSV, JSON, Excel (.xlsx), and PDF (for reports). Data export is available via:" />
        <BulletList
          items={[
            "Self-service dashboard export — available for all data categories from the Administrator panel",
            "API-based export — for programmatic access to data via authenticated GET endpoints",
            "Bulk export request — contact info@averlonworld.com for a complete data dump; delivery within 5 business days",
          ]}
        />
        <Note
          type="info"
          title="Export Before Cancellation"
          body="We strongly recommend exporting all required data — including financial records, client databases, and employee activity logs — before cancelling your subscription. After termination, Customer Data is retained for 30 days to allow export, then permanently deleted."
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 14 · AUDIT LOGS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          14. Audit Logs, Data History &amp; Rollback
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Audit Log Policy" />
        <Para html="Tally Connect maintains system-level audit logs recording administrator actions, user logins, data exports, permission changes, and significant data modifications. These logs are maintained for security, compliance, and dispute resolution purposes." />
        <BulletList
          items={[
            "<strong>Who can access logs:</strong> System administrators (Tally Connect operations team) for platform security and compliance; Customer Administrators for activity within their organisation, subject to the permissions granted in their subscription plan",
            "<strong>Retention period:</strong> System audit logs are retained for 12 months from the date of generation, then permanently deleted",
            "<strong>Customer audit rights:</strong> Customers on enterprise plans may request an audit log extract for their organisation. Submit requests to info@averlonworld.com",
          ]}
        />

        <SubHeading title="Data Delete History and Rollback" />
        <Para html="Where the platform maintains delete history or rollback capabilities, these are provided as a convenience feature within the retention window. Tally Connect does not guarantee the availability of rollback for any specific data item and is not liable for the irreversible loss of data deleted outside the rollback window. Customers requiring guaranteed data archival must maintain independent backups." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 15 · TERMINATION
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          15. Suspension &amp; Termination
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Termination by the Customer" />
        <Para html="The Customer may cancel the subscription at any time by written notice to info@averlonworld.com. Cancellation takes effect at the end of the current paid billing cycle. No refund is issued for the unused period. The Customer should export all required data before the cancellation date." />

        <SubHeading title="Termination or Suspension by Tally Connect" />
        <Para html="We may suspend or terminate access to the platform, with written notice, if:" />
        <BulletList
          items={[
            "The Customer materially breaches these Terms and does not cure the breach within 10 days of written notice",
            "Payment is overdue by more than 7 days after the due date",
            "Continued provision of the service would violate applicable law or a regulatory requirement",
            "The Customer's use poses a security, legal, or reputational risk to Tally Connect or other customers",
            "The Agent software is installed on more devices than licensed, or the licence key is misused",
          ]}
        />
        <Para html="In the case of an emergency security threat or illegal activity, suspension may occur immediately without prior notice, with notice provided as soon as practicable thereafter." />

        <SubHeading title="Effect of Termination" />
        <BulletList
          items={[
            "All access credentials are immediately revoked; the dashboard and API cease to function",
            "The Agent software licence is invalidated and the software will cease to operate",
            "Customer Data is retained for <strong>30 days</strong> from the effective termination date to allow data export",
            "After 30 days, all Customer Data is permanently and irreversibly deleted from all our systems",
            "Termination does not waive any outstanding payment obligations or accrued rights",
          ]}
        />

        <SubHeading title="Surviving Provisions" />
        <Para html="Sections 3 (Tally Disclaimer), 11 (Intellectual Property), 12 (Warranties), 13 (Limitation of Liability), 17 (Governing Law), and any clause which by its nature should survive, continue in full force and effect after termination." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 16 · GOVERNING LAW
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          16. Governing Law &amp; Jurisdiction
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Applicable Law" />
        <Para html="These Terms are governed by and construed exclusively in accordance with the laws of the Republic of India, including the Indian Contract Act 1872, the Information Technology Act 2000 and rules thereunder (including the IT (SPDI) Rules 2011), the Digital Personal Data Protection Act 2023, the Consumer Protection Act 2019, and all applicable central and state legislation." />

        <SubHeading title="Exclusive Jurisdiction" />
        <Para html="All disputes, controversies, or claims arising out of or in connection with these Terms — including their formation, validity, breach, or termination — shall be subject to the <strong>exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India</strong>. Both parties irrevocably submit to this jurisdiction and waive any objection to venue in Mumbai." />

        <SubHeading title="Dispute Resolution Process" />
        <ol className="space-y-2 mb-3 list-none">
          {[
            [
              "Direct Resolution",
              "The aggrieved party provides written notice to the other party. Both parties attempt good-faith resolution within 30 calendar days.",
            ],
            [
              "Mediation",
              "If unresolved after 30 days, either party may initiate non-binding mediation before a mutually agreed mediator in Mumbai. Costs are shared equally.",
            ],
            [
              "Litigation",
              "If mediation fails or is not agreed within 15 days of a mediation request, either party may commence court proceedings in Mumbai, Maharashtra.",
            ],
          ].map(([step, desc], i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-gray-600"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>
                <strong>{step}:</strong> {desc}
              </span>
            </li>
          ))}
        </ol>
        <Para html="Nothing in this section prevents Tally Connect from seeking immediate injunctive or equitable relief from any competent court to protect intellectual property rights, confidential information, or to prevent irreparable harm." />

        <SubHeading title="Language" />
        <Para html="These Terms are executed in English. Any translation provided for convenience shall not affect interpretation. The English version prevails in all cases of discrepancy." />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 17 · GENERAL PROVISIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <h3 className="text-base font-bold text-blue-900 mb-3">
          17. General Provisions
        </h3>
        <hr className="border-gray-200 mb-4" />

        <SubHeading title="Force Majeure" />
        <Para html="Neither party is liable for delay or failure to perform obligations (other than payment obligations) resulting from causes beyond their reasonable control, including natural disasters, pandemics, government actions, power outages, internet infrastructure failures, or third-party platform outages. If such an event continues for more than 60 consecutive days, either party may terminate affected services without liability." />

        <SubHeading title="Entire Agreement" />
        <Para html="These Terms, together with the Privacy Policy, any executed Order Form, Data Processing Agreement, and Service Level Agreement, constitute the entire agreement between the Customer and Tally Connect and supersede all prior or contemporaneous representations and communications, whether oral or written." />

        <SubHeading title="Severability" />
        <Para html="If any provision is found invalid or unenforceable, it shall be modified to the minimum extent necessary; all other provisions remain in full effect." />

        <SubHeading title="No Waiver" />
        <Para html="Failure to enforce any provision does not constitute a waiver. Any waiver must be in writing and signed by an authorised representative." />

        <SubHeading title="Relationship of Parties" />
        <Para html="These Terms do not create an employment relationship, partnership, joint venture, or agency between the parties. Each party acts as an independent contractor." />

        <SubHeading title="Assignment" />
        <Para html="The Customer may not assign these Terms without prior written consent. Tally Connect may assign in connection with a merger, acquisition, or sale of business assets, provided the assignee assumes all obligations." />

        <SubHeading title="Contact" />
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            ["Customer Support", "info@averlonworld.com"],
            ["Phone", "+91 9892440788"],
          ].map(([label, val]) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3"
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
        <p className="text-xs text-gray-400 font-mono mt-3">
          Registered Address: Averlon Enterprise Solutions Private Limited, 5th
          Floor, Lodha Supremus - II, Phase - II, Unit No. A-515, Road No. 22,
          Wagle Industrial Estate, Thane West, 400604, Mumbai, Maharashtra,
          India
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-gray-200 pt-6 text-center">
        <p className="text-xs text-gray-400 font-mono">
          © 2026 Tally Connect. All rights reserved. &nbsp;·&nbsp; Governed by
          the laws of India &nbsp;·&nbsp; Jurisdiction: Courts of Mumbai,
          Maharashtra &nbsp;·&nbsp;{" "}
          <a href="info@averlonworld.com" className="text-blue-600 underline">
            info@averlonworld.com
          </a>
        </p>
        <p className="text-xs text-gray-400 font-mono mt-1">
          Tally Connect is an independent platform. "Tally" and "Tally Prime"
          are registered trademarks of Tally Solutions Pvt. Ltd. Tally Connect
          is not affiliated with or endorsed by Tally Solutions Pvt. Ltd.
        </p>
      </div>
    </div>
  );
}
