import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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
      content: "If you have questions about our use of cookies, please contact us at cookies@tallyconnector.com.",
    },
  ];

  return (
    <>
      <div className="fixed top-20 left-6 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white hover:text-pink-300 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </motion.div>
      </div>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a] via-[#2d2870] to-[#9d2060]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-5 text-center shadow-2xl w-full mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-pink-300 tracking-tight">
              Cookie Policy
            </h1>
          </motion.div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gray-100 p-5 rounded-xl shadow-md border border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-2 hover:border-pink-500 transition-all duration-300"
              >
                <h3 className="font-semibold text-base text-gray-900 mb-2">{section.title}</h3>
                {section.content && (
                  <p className="text-xs text-gray-600 leading-relaxed">{section.content}</p>
                )}
                {section.list && (
                  <ul className="space-y-1.5 mt-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.subsections && (
                  <div className="space-y-3 mt-2">
                    {section.subsections.map((sub) => (
                      <div key={sub.subtitle}>
                        <p className="text-xs font-semibold text-gray-800 mb-1">{sub.subtitle}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 right-6 text-sm text-white font-medium"
        >
          Last updated: December 24, 2025.
        </motion.p>
      </div>
    </>
  );
}