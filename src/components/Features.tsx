import { ChartLine, Zap, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export function Features() {
  const features = [
    {
      icon: ChartLine,
      title: 'Real-Time Analytics',
      description: 'Visualize your Tally data with beautiful, interactive dashboards and charts.',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-[#0066CC]',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Auto-sync every 2 minutes ensures your data is always up-to-date.',
      borderColor: 'border-green-300',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-500',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with role-based access control and permissions.',
      borderColor: 'border-orange-300',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-500',
    },
    {
      icon: RefreshCw,
      title: 'Seamless Integration',
      description: 'Connect directly with Tally Prime through our intelligent agent system.',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-500',
    },
  ];

  return (
    <section id="features" className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#002855] mb-4">
            Powerful Features for
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#002855] mb-6">
            Modern Businesses
          </h3>
          <p className="text-[#5A6C7D] text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to manage and analyze your Tally data efficiently
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${feature.bgColor} ${feature.borderColor} border-2 rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <motion.div 
                className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="text-white" size={32} />
              </motion.div>
              <h3 className="text-lg font-bold text-[#002855] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#5A6C7D] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[#5A6C7D] text-lg mb-6">
            Discover how Tally Connect can transform your business
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all shadow-md hover:shadow-lg font-medium"
          >
            Know More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}