import { motion } from 'motion/react';
import { Code, Server, RefreshCw, Palette, Search, Moon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TechnicalDetails() {
  const techStack = [
    {
      icon: Code,
      title: 'React.js Frontend',
      description: 'Modern, responsive UI built with React for seamless user experience',
    },
    {
      icon: Server,
      title: 'Node.js Backend',
      description: 'Robust backend infrastructure for reliable data processing',
    },
    {
      icon: RefreshCw,
      title: 'Auto-Sync Agent',
      description: 'Intelligent agent syncs data from Tally Prime every 2 minutes',
    },
  ];

  const uiFeatures = [
    {
      icon: Moon,
      title: 'Dark & Light Mode',
      description: 'Switch between themes for comfortable viewing',
    },
    {
      icon: Palette,
      title: 'Custom Themes',
      description: 'Personalize your interface with theme options',
    },
    {
      icon: Search,
      title: 'Universal Search',
      description: 'Find anything instantly with powerful search',
    },
  ];

  return (
    <section id="technical" className="relative py-24 md:py-32 overflow-hidden bg-[#EBF5FB]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-6 font-bold">
            <span className="text-[#002855]">Built with</span>
            <br />
            <span className="text-[#00BCD4]">Modern Technology</span>
          </h2>
          <p className="text-[#5A6C7D] text-lg md:text-xl max-w-2xl mx-auto">
            Cutting-edge tech stack ensuring performance, reliability, and scalability
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BCD4] to-[#0066CC] rounded-xl flex items-center justify-center mx-auto mb-6">
                <tech.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#002855] mb-3">{tech.title}</h3>
              <p className="text-[#5A6C7D] leading-relaxed">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        {/* UI Features */}
        <div className="bg-white rounded-3xl border-2 border-[#00BCD4] p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-[#002855] text-center mb-12">
            Enhanced User Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-[#00BCD4] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h4 className="text-lg font-bold text-[#002855] mb-2">{feature.title}</h4>
                <p className="text-[#5A6C7D] text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}