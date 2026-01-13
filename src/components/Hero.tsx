import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onGetStartedClick: () => void;
  onLearnMoreClick: () => void;
}

export function Hero({
  onGetStartedClick,
  onLearnMoreClick,
}: HeroSectionProps){

  return (
    <>
      {/* Navy tagline bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#002855] text-white text-center py-3 mt-16 md:mt-1"
      >
        <p className="text-sm md:text-base font-medium">
          Empowering Businesses with Strength, Backed by Reliability, and Grounded in Stability.
        </p>
      </motion.div>

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#EBF5FB]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mx-auto leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#00BCD4] font-bold"
              >
                Smarter
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#002855] font-bold"
              >
                Tally Solutions
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#002855] font-bold"
              >
                for Growing Businesses
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[#5A6C7D] text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            >
              Streamline operations, boost productivity, and scale faster with
              Tally Connect — trusted by SMEs and enterprises across industries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <motion.button 
                onClick={onGetStartedClick}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 102, 204, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all shadow-md hover:shadow-lg font-medium"
              >
                Get a Demo
              </motion.button>
              <motion.button 
                onClick={onLearnMoreClick}
                whileHover={{ scale: 1.05, backgroundColor: '#F5F5F5' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#002855] rounded-lg border-2 border-[#002855] hover:bg-gray-50 transition-all font-medium"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto"
            >
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '2 min', label: 'Auto Sync' },               
                { value: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="space-y-2 cursor-default"
                >
                  <div className="text-3xl md:text-4xl text-[#00BCD4] font-bold">
                    {stat.value}
                  </div>
                  <div className="text-[#5A6C7D] text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}