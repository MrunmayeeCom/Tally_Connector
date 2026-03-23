import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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
      content: "Permission is granted to temporarily access Tally Connector for personal, non-commercial transitory viewing only. Under this license you may not:",
      list: [
        "Modify or copy the materials",
        "Use the materials for any commercial purpose",
        "Attempt to decompile or reverse engineer any software",
        "Remove any copyright or other proprietary notations",
        "Transfer the materials to another person",
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
              Terms of Service
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