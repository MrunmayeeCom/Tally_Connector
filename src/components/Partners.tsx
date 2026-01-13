import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Award, Users, TrendingUp, Target, CheckCircle, Globe } from 'lucide-react';

export function Partners() {
  const partnerCards = [
    {
      name: 'IZAAP Technologies Private Limited',
      badge: 'GOLD',
      location: 'CHENNAI, IN',
      description: 'An award-winning Tally Connect Gold Partner with over 10 years of expertise in consultation, customization, API integration, mobile apps integration, to enhance your digital experience.',
      icons: ['✓', '👥', '🏆'],
    },
    {
      name: 'Corporate Intellect Solutions',
      badge: 'GOLD',
      location: 'DELHI, MUMBAI, BANGALORE, GUJRAT, HYDERABAD, IN',
      description: 'CIS is a proficient IT Consulting empowering organizations with expert guidance and customized Tally Connect solutions, driving efficient digital transformations to achieve their business goals',
      icons: ['✓', '👥', '🏆'],
    },
    {
      name: 'Rajlaxmi Solutions Private Limited',
      badge: 'GOLD',
      location: 'MUMBAI, DELHI, BANGALORE, CHENNAI, HYDERABAD, KOLKATTA, IN',
      description: 'Expert Tally Connect partner providing comprehensive business solutions and training services across multiple cities in India.',
      icons: ['✓', '👥', '🏆'],
    },
    {
      name: 'All CAD Services Private Limited',
      badge: 'GOLD',
      location: 'JAIPUR, CHENNAI, DUBAI, SHARJAH, ABU DHABI, IN, DUBAI, ABU DHABI',
      description: 'Global Tally Connect solutions provider with presence in India and UAE, offering innovative business management services.',
      icons: ['✓', '👥', '🏆'],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Access new markets and revenue streams',
    },
    {
      icon: Users,
      title: 'Expert Training',
      description: 'Comprehensive partner training programs',
    },
    {
      icon: Target,
      title: 'Marketing Support',
      description: 'Co-marketing opportunities and materials',
    },
    {
      icon: Award,
      title: 'Partner Recognition',
      description: 'Bronze, Silver, and Gold partner tiers',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#00BCD4] to-[#0066CC] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find a Tally Connect Partner in your area!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Connect with certified partners who can help you maximize your Tally Connect experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-[#00BCD4] sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Link
              to="/become-partner"
              className="flex-1 md:flex-none px-8 py-4 text-center text-white hover:bg-white/10 transition-colors font-medium border-b-4 border-transparent hover:border-white"
            >
              Become a partner
            </Link>
            <button
              type="button"
              onClick={() =>
                document.getElementById("partners")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex-1 md:flex-none px-8 py-4 text-center bg-white text-[#002855] font-medium border-b-4 border-white"
            >
              Partner directory
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#002855] mb-6">
              Tally Connect Partners can help you create and manage your business!
            </h2>
            <p className="text-[#5A6C7D] text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Our partners are there to make your Tally Connect experience more pleasant and productive – from choosing a subscription plan to product implementation, customization, and employee training. Tally Connect partners can also help you set up an integration with a third-party app or service. Browse our Partner Directory to find a Tally Connect partner in your area and contact them directly or use the form below to get a price estimate for your Tally Connect implementation project.
            </p>
          </motion.div>

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {partnerCards.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:border-[#00BCD4]"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#002855] flex-1">
                    {partner.name}
                  </h3>
                  <div className="flex gap-2 ml-4">
                    {partner.icons.map((icon, i) => (
                      <div key={i} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="inline-block px-4 py-1 bg-yellow-400 text-[#002855] font-bold text-sm rounded">
                    {partner.badge}
                  </span>
                  <p className="text-[#5A6C7D] text-sm mt-2">{partner.location}</p>
                </div>
                <p className="text-[#5A6C7D] leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#EBF5FB] to-white rounded-3xl p-8 md:p-12 border-2 border-[#00BCD4]"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#002855] text-center mb-12">
              Why Become a Tally Connect Partner?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00BCD4] to-[#0066CC] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-[#002855] mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-[#5A6C7D] text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/become-partner"
              className="inline-block px-10 py-4 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all shadow-md hover:shadow-lg font-medium text-lg"
            >
              Become a Partner Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
