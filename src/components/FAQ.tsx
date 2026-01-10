import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What is Tally Connect?',
      answer: 'Tally Connect is a powerful web application that seamlessly integrates with Tally Prime software. It provides real-time data visualization, comprehensive analytics, and an intuitive dashboard to help you manage your business data more efficiently.',
    },
    {
      question: 'How does the auto-sync feature work?',
      answer: 'Our intelligent agent automatically pulls data from your Tally Prime software every 2 minutes. This ensures that your dashboard always displays the most up-to-date information without any manual intervention required.',
    },
    {
      question: 'Can I control what data users can see?',
      answer: 'Yes! Administrators have granular control over field visibility. You can show or hide specific fields for individual users or entire user groups, ensuring data privacy and security based on roles and responsibilities.',
    },
    {
      question: 'Is Tally Connect secure?',
      answer: 'Absolutely. We implement enterprise-grade security measures including role-based access control, encrypted data transmission, and secure authentication. Your data remains protected at all times.',
    },
    {
      question: 'What features are available in dark mode?',
      answer: 'All features are fully functional in both dark and light modes. You can switch between themes at any time, and your preference will be saved. Dark mode is designed to reduce eye strain during extended use.',
    },
    {
      question: 'Can I customize the dashboard?',
      answer: 'Yes, the dashboard is highly customizable. You can arrange widgets, apply filters, choose themes, and use the search functionality to create a personalized view that matches your workflow.',
    },
    {
      question: 'How do I get started with Tally Connect?',
      answer: 'Getting started is easy! Sign up for an account, install our agent software, connect it to your Tally Prime installation, and you\'ll be up and running in minutes. Our support team is available 24/7 to assist you.',
    },
    {
      question: 'What happens if the sync fails?',
      answer: 'Our system includes automatic retry mechanisms and error notifications. If a sync fails, the system will automatically attempt to reconnect. You\'ll be notified of any issues, and our support team can help resolve them quickly.',
    },
    {
      question: 'Can multiple users access the same company data?',
      answer: 'Yes! Multiple users can access the same company data simultaneously. Administrators can assign different roles and permissions to each user, controlling what data they can view and modify.',
    },
    {
      question: 'Is there a mobile version available?',
      answer: 'Yes, Tally Connect is fully responsive and works seamlessly on mobile devices, tablets, and desktops. You can access your data from anywhere, at any time.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-bold">
            <span className="text-[#002855]">Frequently Asked</span>{' '}
            <span className="text-[#00BCD4]">Questions</span>
          </h2>
          <p className="text-[#5A6C7D] text-lg md:text-xl">
            Everything you need to know about Tally Connect
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#00BCD4] transition-colors"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ backgroundColor: '#F5F5F5' }}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
              >
                <span className="text-lg font-bold text-[#002855] pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className="flex-shrink-0 text-[#00BCD4]"
                    size={24}
                  />
                </motion.div>
              </motion.button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-[#5A6C7D] leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#5A6C7D] mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all shadow-md hover:shadow-lg font-medium"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}