import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CheckCircle, Globe, TrendingUp, Users, Award, Briefcase, Target, Zap } from 'lucide-react';

export function BecomePartner() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    city: '',
    businessType: '',
    yearsInBusiness: '',
    numberOfEmployees: '',
    existingClients: '',
    certifications: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#002855] to-[#0066CC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Partner Application Form
            </h2>
            <p className="text-white/90 text-lg md:text-xl">
              Fill out the form below and our team will get back to you within 24-48 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="Your Country"
                  />
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="Your City"
                  />
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                  >
                    <option value="">Select Type</option>
                    <option value="reseller">Reseller</option>
                    <option value="consultant">Consultant</option>
                    <option value="integrator">System Integrator</option>
                    <option value="trainer">Trainer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Years in Business *
                  </label>
                  <select
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                  >
                    <option value="">Select Range</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Number of Employees *
                  </label>
                  <select
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                  >
                    <option value="">Select Range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#002855] font-medium mb-2">
                    Existing Clients
                  </label>
                  <input
                    type="text"
                    name="existingClients"
                    value={formData.existingClients}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors"
                    placeholder="Number of clients"
                  />
                </div>

                
              </div>

              <div>
                <label className="block text-[#002855] font-medium mb-2">
                  Why do you want to become a partner? *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00BCD4] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your interest in becoming a partner..."
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-10 py-4 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all shadow-md hover:shadow-lg font-medium text-lg"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
