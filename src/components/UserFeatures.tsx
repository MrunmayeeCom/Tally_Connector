import { motion } from 'motion/react';
import { 
  ChartBar, 
  FileText, 
  Package, 
  DollarSign, 
  Settings, 
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';

export function UserFeatures() {
  const userFeatures = [
    {
      icon: ChartBar,
      title: 'Interactive Dashboard',
      description: 'View all your data in beautiful graphs and charts with quick navigation tabs.',
      features: ['Real-time data visualization', 'Quick access widgets', 'Customizable layout'],
    },
    {
      icon: Users,
      title: 'Tally Ledger List',
      description: 'Complete ledger management with comprehensive party information.',
      features: ['Party Name & Type', 'Opening Balance & Outstanding', 'Due Dates & Actions', 'Voucher & Bill Lists'],
    },
    {
      icon: FileText,
      title: 'Voucher Explorer',
      description: 'Explore and manage all your vouchers in one place.',
      features: ['Date & Voucher Type', 'Reference & Party Details', 'Amount & Status Tracking'],
    },
    {
      icon: Package,
      title: 'Order Book',
      description: 'Track all your orders and manage customer/supplier relationships.',
      features: ['Order Number & Type', 'Customer/Supplier Info', 'Amount & Due Dates', 'Status Monitoring'],
    },
    {
      icon: TrendingUp,
      title: 'Monthly Summary',
      description: 'Get comprehensive monthly financial insights at a glance.',
      features: ['Turnover Analysis', 'Expense Tracking', 'Profit Calculations', 'Margin Metrics'],
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Complete inventory tracking with detailed stock movements.',
      features: ['Item Code & Name', 'Stock Levels (Opening/Closing)', 'Inward/Outward Tracking', 'Rate & Value'],
    },
    {
      icon: Settings,
      title: 'Settings & Profile',
      description: 'Personalize your experience and manage security.',
      features: ['Profile Management', 'Password Security', 'Company Name Visibility', 'User Preferences'],
    },
    {
      icon: Clock,
      title: 'Smart Features',
      description: 'Enhanced productivity tools across all modules.',
      features: ['Dark/Light Mode', 'Advanced Filters', 'Search Functionality', 'Custom Themes'],
    },
  ];

  return (
    <section id="user-features" className="relative py-24 md:py-32 overflow-hidden bg-[#EBF5FB]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-6 font-bold">
            <span className="text-[#002855]">Everything Users Need</span>
            <br />
            <span className="text-[#00BCD4]">at Their Fingertips</span>
          </h2>
          <p className="text-[#5A6C7D] text-lg md:text-xl max-w-2xl mx-auto">
            Powerful features designed to make daily operations smooth and efficient
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-[#00BCD4] rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#002855] mb-3">{feature.title}</h3>
              <p className="text-[#5A6C7D] text-sm mb-4 leading-relaxed">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="text-xs text-[#5A6C7D] flex items-start gap-2">
                    <span className="text-[#00BCD4] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}