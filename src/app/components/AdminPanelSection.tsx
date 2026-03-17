import { motion } from "framer-motion";
import { ShieldCheck, Users, Eye, Edit, Trash2 } from "lucide-react";
import bgImage from "../../assets/bimage2a.jpg";
export function AdminPanelSection() {
  const adminFeatures = [
    {
      icon: Users,
      title: "User Management",
      description: "Create and manage users with ease",
      bullets: [
        "Add new users",
        "Assign roles & permissions",
        "Set email & password",
      ],
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Eye,
      title: "Field Visibility Control",
      description: "Control what users can see",
      bullets: [
        "Visibility rules per user",
        "Role-based visibility",
        "Custom field permissions",
      ],
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Edit,
      title: "User Editing",
      description: "Modify user details anytime",
      bullets: ["Update user information", "Change roles", "Reset passwords"],
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: Trash2,
      title: "User Removal",
      description: "Remove users when needed",
      bullets: [
        "Delete user records",
        "Transfer access instantly",
        "Maintain audit logs",
      ],
      color: "from-red-500 to-rose-600",
    },
  ];

  return (
    <section id="admin-panel" className="py-24 relative overflow-hidden">
      {/* Bold white divider line separating User Side and Admin Panel */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white z-20" />
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-cyan-900/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-white italic">Powerful Admin</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Control Center
            </span>
          </h2>
          <p className="text-sm text-white/90 max-w-3xl mx-auto">
            Complete control over users, permissions, and data visibility
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-6 border-2 border-cyan-300/30"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Complete Administrative Control
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Manage your entire team with role-based access control. Control
                who sees what, manage permissions, and maintain complete
                security across your organization.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all border border-white/20"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-white/80 text-xs mb-3">
                {feature.description}
              </p>
              <ul className="space-y-1.5">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-xs text-white/90"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} mt-1 flex-shrink-0`}
                    ></div>
                    <span>{bullet}</span>
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