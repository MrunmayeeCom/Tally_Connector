import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ListChecks,
  Receipt,
  FileText,
  Calendar,
  Package,
  Settings,
  Target,
} from "lucide-react";
import bgImage from "../../assets/bimage3a.jpg";

export function UserSideSection() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Interactive Dashboard",
      description:
        "View all your data in beautiful graphs and charts with quick navigation tabs.",
      bullets: [
        "Live real-time visualization",
        "Quick access widgets",
        "Customizable layout",
        "Voucher & Bill Lists",
      ],
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: ListChecks,
      title: "Tally Ledger List",
      description:
        "Complete ledger management with comprehensive party information.",
      bullets: [
        "Party Name & Type",
        "Opening Balance & Outstanding",
        "Due Dates & Reminders",
        "Pending Bills",
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Receipt,
      title: "Voucher Explorer",
      description:
        "Explore and manage all your vouchers in one place with advanced features.",
      bullets: [
        "Date & Voucher Type",
        "Reference & Party Details",
        "Amount & Status Tracking",
        "Narration Fields",
      ],
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: FileText,
      title: "Order Book",
      description:
        "Track all your orders and manage customer/supplier relationships.",
      bullets: [
        "Order Number & Type",
        "Customer/Supplier Info",
        "Amount & Due Dates",
        "Status Monitoring",
      ],
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Calendar,
      title: "Monthly Summary",
      description:
        "Get comprehensive monthly financial insights at a glance.",
      bullets: [
        "Estimate Analysis",
        "Expense Tracking",
        "Profit Calculations",
        "Margin Metrics",
      ],
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description:
        "Complete inventory tracking with detailed stock movements.",
      bullets: [
        "Item Code & Name",
        "Stock Levels (Opening/Closing)",
        "Inward/Outward Tracking",
        "Rate & Value",
      ],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Settings,
      title: "Settings & Profile",
      description:
        "Personalize your experience and manage security.",
      bullets: [
        "Profile Management",
        "Password Security",
        "Company Name Visibility",
        "User Preferences",
      ],
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: Target,
      title: "Smart Features",
      description:
        "Enhanced productivity tools with access across all modules.",
      bullets: [
        "Excel/CSV Export",
        "Advanced Filters",
        "Search Functionality",
        "Custom Themes",
      ],
      color: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <section id="user-side" className="py-24 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/85 to-cyan-900/85"></div>
      </div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-white italic">Everything Users Need</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              at Their Fingertips
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Powerful features designed to make daily operations smooth and
            efficient
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all border border-white/20"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-white/80 text-xs mb-3">
                {feature.description}
              </p>
              <ul className="space-y-1.5">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-xs text-white/90"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} mt-1 flex-shrink-0`}
                    ></div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}