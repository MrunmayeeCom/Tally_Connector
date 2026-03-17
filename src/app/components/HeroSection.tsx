import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, HeadphonesIcon } from "lucide-react";
import heroImage from "../../assets/bimage1a.jpg";

export function HeroSection({ goToDemo }: { goToDemo: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-cyan-900/60 to-purple-900/70"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* py-32 → py-24 to reduce top/bottom spacing and pull content up */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Top Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-sm font-semibold text-white">
              Empowering Businesses with Strength, Backed by Reliability, and
              Grounded in Stability.
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-cyan-300 italic">Smarter</span>{" "}
            <span className="text-white">Tally Solutions</span>
            <br />
            <span className="text-white">for Growing Businesses</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Streamline operations, boost productivity, and scale faster with
            Tally Connect — trusted by SMEs and enterprises across industries.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Clock, value: "99.9%", label: "Uptime", color: "from-cyan-400 to-blue-500" },
            { icon: Zap, value: "2 min", label: "Auto Sync", color: "from-purple-400 to-pink-500" },
            { icon: HeadphonesIcon, value: "24/7", label: "Support", color: "from-orange-400 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-white/90 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}