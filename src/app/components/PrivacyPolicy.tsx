interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information that you provide directly to us when using Tally Connect, including your name, email address, company information, and usage data. We also automatically collect certain information about your device and how you interact with our services.",
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to:",
      list: [
        "Provide, maintain, and improve our services",
        "Process transactions and send related information",
        "Send technical notices and support messages",
        "Respond to your comments and questions",
        "Monitor and analyze trends and usage",
      ],
    },
    {
      title: "3. Data Security",
      content: "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever fully secure or error-free.",
    },
    {
      title: "4. Data Sharing",
      content: "We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service.",
    },
    {
      title: "5. Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information. To exercise these rights, please contact us at info@averlonworld.com.",
    },
    {
      title: "6. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at info@averlonworld.com.",
    },
  ];

  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      <div>
        <h1 className="text-3xl font-bold text-blue-900">Privacy Policy</h1>
        <p className="text-gray-400 text-xs mt-1">Last updated: December 24, 2025</p>
        <hr className="border-gray-200 mt-3" />
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-base font-bold text-blue-900 mb-3">{section.title}</h3>
          <hr className="border-gray-200 mb-4" />
          {section.content && (
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{section.content}</p>
          )}
          {section.list && (
            <ul className="space-y-2">
              {section.list.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}