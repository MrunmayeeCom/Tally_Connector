import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information that you provide directly to us when using Tally Connector, including your name, email address, company information, and usage data. We also automatically collect certain information about your device and how you interact with our services.",
    },
    {
      title: "2. How We Use Your Information",
      content: null,
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
              Privacy Policy
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
                  <ul className="space-y-1.5 mt-1">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
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