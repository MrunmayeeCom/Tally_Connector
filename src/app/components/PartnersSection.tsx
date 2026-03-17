import { motion } from "framer-motion";
import { TrendingUp, GraduationCap, Megaphone, Award } from "lucide-react";

export function PartnersSection({ goToPartnerPage }: { goToPartnerPage: () => void }) {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Access new markets and revenue streams",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: GraduationCap,
      title: "Expert Training",
      description: "Comprehensive partner training programs",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Megaphone,
      title: "Marketing Support",
      description: "Co-marketing opportunities and materials",
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: Award,
      title: "Partner Recognition",
      description: "Bronze, Silver, and Gold partner tiers",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section id="partners" className="py-24 text-white relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#ff0080]"></div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/business-image.avif')" }}
      ></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 italic">
            Find a Tally Connect Partner in your area!
          </h2>
          <p className="text-sm text-white/90 max-w-3xl mx-auto mb-8">
            Connect with certified partners who can help you maximize your Tally
            Connect experience
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPartnerPage}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold text-sm shadow-xl hover:shadow-2xl transition-all"
            >
            Become a partner
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-sm rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              Partner directory
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-4 md:p-5 text-gray-900 mb-8 max-w-3xl mx-auto"
        >
          <h3 className="text-base font-bold mb-4 text-center">
            Tally Connect Partners can help you create and manage your business!
          </h3>
          <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto text-xs">
            Our partners are there to make your Tally Connect experience more
            pleasant and productive – from choosing a subscription plan to
            product implementation, customization, and employee training. Tally
            Connect partners can also help you set up an integration with a
            third-party app or service. Browse our Partner Directory to find a
            Tally Connect partner in your area and contact them directly or use
            the form below to get a price estimate for your Tally Connect
            implementation project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20"
        >
          <h3 className="text-base font-bold mb-6 text-center italic">
            Why Become a Tally Connect Partner?
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold mb-1">{benefit.title}</h4>
                <p className="text-white/90 text-xs">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToPartnerPage}
          className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all text-sm"
        >
        Become a Partner Today
        </motion.button>
        </motion.div>
      </div>
    </section>
  );
}