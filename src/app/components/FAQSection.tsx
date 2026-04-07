import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function FAQSection() {
  const faqs = [
  {
    question: "What is Tally Connect?",
    answer:
      "Tally Connect is a web app that connects to your Tally Prime and turns your accounting data into easy-to-read dashboards and reports. Instead of opening Tally every time you need a number, just open Tally Connect from any browser — on your phone, laptop, or desktop.",
  },
  {
    question: "How does the auto-sync work?",
    answer:
      "A small background app runs on the Windows computer where Tally is installed. Every 5 minutes it quietly picks up any new entries or changes from Tally and sends them to your Tally Connect dashboard. You don't have to do anything — it just stays current on its own.",
  },
  {
    question: "Can I control what my team members are allowed to see?",
    answer:
      "Yes, and in quite a lot of detail. As the admin, you can choose which sections of the app each person can open, which columns they see in each table, and even which specific parties, transactions, or items they're allowed to view. You can update any of this at any time.",
  },
  {
    question: "Is my financial data safe?",
    answer:
      "Yes. Every account is protected with a verified login — no one can access your data without going through the right steps. You control exactly who sees what. Every action taken on the platform is logged, and your sync app is recognized by your device so nothing unauthorized can connect to your Tally.",
  },
  {
    question: "Can I manage more than one company?",
    answer:
      "Absolutely. You can connect multiple Tally companies to a single Tally Connect account. Each company's data is kept completely separate, and you can give different team members access to different companies — with different rules for each.",
  },
  {
    question: "How do I get the sync app set up?",
    answer:
      "After signing up, you download a small app and install it on the Windows computer where Tally Prime is running. You enter your registered email, activate your license, and that's it — your data starts syncing automatically. Note: this setup app works on Windows only, since Tally Prime itself is a Windows application.",
  },
  {
    question: "How do I get started?",
    answer:
      "Create an account, verify your email, pick a plan, and install the sync app on your Tally machine. Your dashboard fills up on its own after the first sync — usually within a few minutes. The whole setup takes less than 10 minutes.",
  },
  {
    question: "Can I create vouchers and bills without opening Tally?",
    answer:
      "Yes! You can create, edit, and delete vouchers and bills directly from Tally Connect. Whatever you submit gets pushed straight into Tally Prime automatically — no need to open the desktop app at all.",
  },
  {
    question: "What if my internet or Tally goes offline?",
    answer:
      "No problem. The sync simply pauses while Tally or your internet is unavailable and picks up right where it left off once things are back online. You can always check when the last successful sync happened from your dashboard.",
  },
  {
    question: "Can multiple people be logged in at the same time?",
    answer:
      "Yes. Multiple team members can use Tally Connect at the same time, each seeing only what you've permitted them to see. There's no clash or conflict — everyone gets their own view of the data.",
  },
  {
    question: "Can I use Tally Connect on my phone?",
    answer:
      "Yes, the app works on any phone or tablet browser — no install needed. The sync app does need to stay running on a Windows computer in the background, but you can check your dashboard, browse reports, and manage things from anywhere.",
  },
];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .faq-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(160deg, #F0FDF4 0%, #F0F9FF 50%, #EFF6FF 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }
        .faq-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #059669, #0EA5E9, #1A56DB);
        }

        .faq-container {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 1;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .faq-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #059669;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .faq-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .faq-title span { color: #1A56DB; }
        .faq-subtitle {
          font-size: 0.95rem;
          color: #64748B;
          line-height: 1.7;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .faq-item-wrap {
          background: white;
          border: 1.5px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .faq-item-wrap:hover {
          border-color: #BFDBFE;
          box-shadow: 0 4px 16px rgba(26,86,219,0.06);
        }
        .faq-item-wrap[data-state="open"] {
          border-color: #93C5FD;
          box-shadow: 0 4px 20px rgba(26,86,219,0.09);
        }

        @media (max-width: 640px) {
          .faq-container { padding: 0 20px; }
          .faq-root { padding: 60px 0; }
        }
      `}</style>

      <section id="faq" className="faq-root">
        <div className="faq-container">
          <motion.div
            className="faq-header"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="faq-eyebrow">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              FAQ
            </div>
            <h2 className="faq-title">
              Frequently Asked <span>Questions</span>
            </h2>
            <p className="faq-subtitle">Everything you need to know about Tally Connect</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="faq-list">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="faq-item-wrap"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-none px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed text-sm pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
}