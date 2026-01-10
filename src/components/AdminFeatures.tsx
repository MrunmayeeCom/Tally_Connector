import { motion } from 'motion/react';
import { Shield, Users, Eye, Edit, Trash2, UserPlus } from 'lucide-react';

export function AdminFeatures() {
  const adminCapabilities = [
    {
      icon: UserPlus,
      title: 'User Management',
      description: 'Create and manage users with ease',
      items: ['Add new users', 'Assign roles & permissions', 'Set email & password'],
    },
    {
      icon: Eye,
      title: 'Field Visibility Control',
      description: 'Control what users can see',
      items: ['Show/hide fields per user', 'Role-based visibility', 'Custom field permissions'],
    },
    {
      icon: Edit,
      title: 'User Editing',
      description: 'Modify user details anytime',
      items: ['Update user information', 'Change roles', 'Reset passwords'],
    },
    {
      icon: Trash2,
      title: 'User Removal',
      description: 'Remove users when needed',
      items: ['Delete user accounts', 'Revoke access instantly', 'Maintain audit logs'],
    },
  ];

  return (
    <section id="admin-features" className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl mb-6 font-bold">
            <span className="text-[#002855]">Powerful Admin</span>
            <br />
            <span className="text-[#00BCD4]">Control Center</span>
          </h2>
          <p className="text-[#5A6C7D] text-lg md:text-xl max-w-2xl mx-auto">
            Complete control over users, permissions, and data visibility
          </p>
        </div>

        {/* Admin Overview Card */}
        <div className="bg-gradient-to-br from-[#EBF5FB] to-white rounded-3xl border-2 border-[#00BCD4] p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-[#0066CC] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={40} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#002855] mb-3">
                Complete Administrative Control
              </h3>
              <p className="text-[#5A6C7D] text-lg leading-relaxed">
                Manage your entire team with role-based access control. Control who sees what, 
                manage permissions, and maintain complete security across your organization.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCapabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow hover:border-[#00BCD4]"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#00BCD4] to-[#0066CC] rounded-xl flex items-center justify-center mb-4">
                <capability.icon className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#002855] mb-2">{capability.title}</h3>
              <p className="text-[#5A6C7D] text-sm mb-4">{capability.description}</p>
              <ul className="space-y-2">
                {capability.items.map((item, i) => (
                  <li key={i} className="text-xs text-[#5A6C7D] flex items-start gap-2">
                    <span className="text-[#00BCD4] mt-0.5">✓</span>
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