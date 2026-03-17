import { motion } from "framer-motion";
import { Code2, Database, RefreshCw, Moon, Palette, Search } from "lucide-react";

export function TechnicalSection() {
  const techFeatures = [
    {
      icon: Code2,
      title: "React.js Frontend",
      description:
        "Modern, responsive UI built with React for seamless user experience",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Database,
      title: "Node.js Backend",
      description:
        "Robust backend infrastructure for reliable data processing",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: RefreshCw,
      title: "Auto-Sync Agent",
      description:
        "Intelligent agent syncs data from Tally Prime every 2 minutes",
      color: "from-purple-500 to-pink-600",
    },
  ];

  const userExperience = [
    {
      icon: Moon,
      title: "Dark & Light Mode",
      description: "Switch between themes for comfortable viewing",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: Palette,
      title: "Custom Themes",
      description: "Personalize your interface with theme options",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Search,
      title: "Universal Search",
      description: "Find anything instantly with powerful search",
      color: "from-teal-500 to-cyan-600",
    },
  ];

  return (
    <section id="technical" className="py-12 bg-gradient-to-br from-gray-50 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-gray-900 italic">Built with</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Modern Technology
            </span>
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
            Cutting-edge tech stack ensuring performance, reliability, and
            scalability
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 md:p-8 mb-0 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-center italic">
              Enhanced User Experience
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              {userExperience.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-bold mb-1">{feature.title}</h4>
                  <p className="text-white/90 text-xs">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}