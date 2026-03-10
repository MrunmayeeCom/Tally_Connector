import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "What is Tally Connect?",
      answer:
        "Tally Connect is a powerful web application that seamlessly integrates with Tally Prime software. It provides real-time data visualization, comprehensive analytics, and an intuitive dashboard to help you manage your business data more efficiently.",
    },
    {
      question: "How does the auto-sync feature work?",
      answer:
        "Our intelligent auto-sync agent connects directly with your Tally Prime installation and automatically syncs data every 2 minutes (varies by plan). This ensures your dashboard always displays the most up-to-date information without manual intervention.",
    },
    {
      question: "Can I control what data users can see?",
      answer:
        "Yes! Our advanced role-based access control system allows administrators to define exactly what data each user can access. You can set permissions at the field level, control visibility, and manage user roles with complete flexibility.",
    },
    {
      question: "Is Tally Connect secure?",
      answer:
        "Absolutely. We implement enterprise-grade security measures including role-based access control, encrypted data transmission, secure authentication, and comprehensive audit logs. Your data is protected at every level.",
    },
    {
      question: "What features are available in dark mode?",
      answer:
        "Dark mode is available across the entire application, providing a comfortable viewing experience in low-light conditions. You can switch between light and dark themes instantly, and your preference is saved automatically.",
    },
    {
      question: "Can I customize the dashboard?",
      answer:
        "Yes! The dashboard is fully customizable. You can arrange widgets, choose which metrics to display, apply custom themes, and personalize the interface to match your workflow and preferences.",
    },
    {
      question: "How do I get started with Tally Connect?",
      answer:
        "Getting started is easy! Simply sign up for an account, choose your plan, install our auto-sync agent, and connect it to your Tally Prime installation. Our setup wizard will guide you through the entire process.",
    },
    {
      question: "What happens if the sync fails?",
      answer:
        "Our system includes robust error handling and automatic retry mechanisms. If a sync fails, the system will attempt to reconnect and sync automatically. You'll also receive notifications about any sync issues, and our support team is available 24/7 to help.",
    },
    {
      question: "Can multiple users access the same company data?",
      answer:
        "Yes! Tally Connect is designed for team collaboration. Multiple users can access the same company data simultaneously, with permissions controlled by administrators. Each plan supports different numbers of concurrent users.",
    },
    {
      question: "Is there a mobile version available?",
      answer:
        "Yes! Tally Connect is fully responsive and works seamlessly on mobile devices. You can access your dashboard, view reports, and manage data from anywhere using your smartphone or tablet.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-gray-900 italic">Frequently Asked </span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Tally Connect
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-gray-100 rounded-2xl px-6 border border-gray-200 hover:border-cyan-300 transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-cyan-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}