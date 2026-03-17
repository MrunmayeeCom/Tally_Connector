import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, RefreshCw } from "lucide-react";

// Added onKnowMore prop
interface FeaturesSectionProps {
  onKnowMore?: () => void;
}

export function FeaturesSection({ onKnowMore }: FeaturesSectionProps) {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description:
        "Visualize your Tally data with beautiful, interactive dashboards and charts.",
      bullets: [
        "Live real-time visualization",
        "Quick access widgets",
        "Customizable layout",
        "Voucher & Bill Lists",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Auto-sync every 2 minutes ensures your data is always up-to-date.",
      bullets: [
        "Opening Balance & Outstanding",
        "Due Dates & Reminders",
        "Pending Bills",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with role-based access control and permissions.",
      bullets: [
        "Reference & Party Details",
        "Amount & Status Tracking",
        "Narration Fields",
      ],
      color: "from-orange-500 to-amber-500",
      bgColor: "from-orange-50 to-amber-50",
    },
    {
      icon: RefreshCw,
      title: "Seamless Integration",
      description:
        "Connect directly with Tally Prime through our intelligent agent system.",
      bullets: [
        "Profile Management",
        "Advanced Filters",
        "Search Functionality",
        "Custom Themes",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
  ];

  return (
    <>
    <section id="features" className="pt-24 pb-10 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-gray-900 italic">Powerful Features for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage and analyze your Tally data
            efficiently
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative rounded-3xl p-6 bg-gradient-to-br ${feature.bgColor} border border-gray-200 shadow-lg hover:shadow-2xl transition-all overflow-hidden group`}
            >
              <div className="relative z-10">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} mt-1.5`}
                      ></div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-600 mb-6">
            Discover how Tally Connect can transform your business
          </p>
          <motion.button
            onClick={onKnowMore}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            Know More
          </motion.button>
        </motion.div>
      </div>

    </section>
    {/* Divider between Features and Pricing — outside section so it sits flush */}
    <hr className="border-t-2 border-black" />
    </>
  );
}