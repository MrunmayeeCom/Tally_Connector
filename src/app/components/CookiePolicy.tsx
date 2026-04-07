interface CookiePolicyProps {
  onBack: () => void;
}

export function CookiePolicy({ onBack }: CookiePolicyProps) {
  const sections = [
    {
      title: "1. What Are Cookies",
      content: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.",
    },
    {
      title: "2. How We Use Cookies",
      content: "We use cookies to:",
      list: [
        "Keep you signed in",
        "Understand how you use our service",
        "Remember your preferences",
        "Improve our service performance",
        "Analyze site traffic and usage patterns",
      ],
    },
    {
      title: "3. Types of Cookies We Use",
      subsections: [
        { subtitle: "Essential Cookies", content: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas." },
        { subtitle: "Analytics Cookies", content: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously." },
        { subtitle: "Preference Cookies", content: "These cookies allow the website to remember choices you make and provide enhanced features and personalization." },
      ],
    },
    {
      title: "4. Managing Cookies",
      content: "Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website and prevent you from enjoying all features.",
    },
    {
      title: "5. Updates to This Policy",
      content: 'We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.',
    },
    {
      title: "6. Contact Us",
      content: "If you have questions about our use of cookies, please contact us at info@averlonworld.com.",
    },
  ];

  return (
    <div className="bg-white min-h-screen px-10 pt-24 pb-8 space-y-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      <div>
        <h1 className="text-3xl font-bold text-blue-900">Cookie Policy</h1>
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
          {section.subsections && (
            <div className="space-y-4">
              {section.subsections.map((sub) => (
                <div key={sub.subtitle}>
                  <p className="text-xs font-semibold text-gray-800 mb-1">{sub.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{sub.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}