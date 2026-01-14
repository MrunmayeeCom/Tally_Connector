import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CheckCircle, Globe, TrendingUp, Users, Award, Briefcase, Target, Zap } from 'lucide-react';
import ApplicationForm from './ApplicationForm';

export function BecomePartner() {


  const partnerBenefits = [
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Unlock new revenue streams with our partner program',
    },
    {
      icon: Users,
      title: 'Training & Certification',
      description: 'Access comprehensive training and certification programs',
    },
    {
      icon: Award,
      title: 'Partner Tiers',
      description: 'Bronze, Silver, and Gold partnership levels',
    },
    {
      icon: Briefcase,
      title: 'Business Support',
      description: 'Dedicated partner success managers',
    },
    {
      icon: Target,
      title: 'Marketing Resources',
      description: 'Co-marketing materials and campaigns',
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: 'Fast-track technical support for partners',
    },
  ];

  const partnerTiers = [
    {
      name: 'Bronze Partner',
      color: 'from-orange-400 to-orange-600',
      requirements: ['Basic certification', '5+ implementations', 'Annual revenue target'],
      benefits: ['Partner badge', 'Marketing materials', 'Technical support'],
    },
    {
      name: 'Silver Partner',
      color: 'from-gray-300 to-gray-500',
      requirements: ['Advanced certification', '15+ implementations', 'Higher revenue target'],
      benefits: ['All Bronze benefits', 'Priority support', 'Co-marketing opportunities'],
    },
    {
      name: 'Gold Partner',
      color: 'from-yellow-400 to-yellow-600',
      requirements: ['Expert certification', '30+ implementations', 'Premium revenue target'],
      benefits: ['All Silver benefits', 'Dedicated success manager', 'Featured listing'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#002855] to-[#0066CC] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become a Tally Connect Partner
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Join our network of trusted partners and grow your business with Tally Connect
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-[#00BCD4] sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex-1 md:flex-none px-8 py-4 text-center bg-white text-[#002855] font-medium border-b-4 border-white">
              Become a partner
            </div>
            <Link
              to="/partners"
              className="flex-1 md:flex-none px-8 py-4 text-center text-white hover:bg-white/10 transition-colors font-medium border-b-4 border-transparent hover:border-white"
            >
              Partner directory
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#EBF5FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#002855] mb-6">
              Partner Benefits & Advantages
            </h2>
            <p className="text-[#5A6C7D] text-lg md:text-xl max-w-3xl mx-auto">
              Join 500+ global partners who are growing their business with Tally Connect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#00BCD4] hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00BCD4] to-[#0066CC] rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#002855] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#5A6C7D]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#002855] mb-6">
              Partnership Tiers
            </h2>
            <p className="text-[#5A6C7D] text-lg md:text-xl max-w-3xl mx-auto">
              Choose the partnership level that matches your business goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {partnerTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-r ${tier.color} text-white py-6 px-8 text-center`}>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-bold text-[#002855] mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {tier.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#5A6C7D] text-sm">
                          <CheckCircle className="text-[#00BCD4] flex-shrink-0 mt-0.5" size={16} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002855] mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#5A6C7D] text-sm">
                          <CheckCircle className="text-[#00BCD4] flex-shrink-0 mt-0.5" size={16} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationForm />

    </div>
  );
}
