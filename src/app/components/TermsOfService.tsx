interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Tally Connector, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "2. Use License",
      content: "Permission is granted to access and use Tally Connect for your internal business purposes under the plan you have subscribed to. Under this license you may not:",
      list: [
        "Modify or copy the materials",
        "Resell or sublicense access to any third party",
        "Attempt to decompile or reverse engineer any software",
        "Remove any copyright or other proprietary notations",
        "Transfer your account credentials to another person",
      ],
    },
    {
      title: "3. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      title: "4. Service Modifications",
      content: "We reserve the right to modify or discontinue the service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.",
    },
    {
      title: "5. Limitation of Liability",
      content: "In no event shall Tally Connector or its suppliers be liable for any damages arising out of the use or inability to use our services, even if we have been notified of the possibility of such damages.",
    },
    {
      title: "6. Governing Law",
      content: "These terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.",
    },
    {
      title: "7. Contact Information",
      content: "Questions about the Terms of Service should be sent to us at info@averlonworld.com.",
    },
  ];

  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      <div>
        <h1 className="text-3xl font-bold text-blue-900">Terms of Service</h1>
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