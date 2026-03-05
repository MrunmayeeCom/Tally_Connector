import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "User Side", "Admin Panel", "Technical"],
    Company: ["About Us", "Careers", "Blog", "Press", "Contact"],
    Resources: ["Documentation", "API Reference", "Tutorials", "Community", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Compliance"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { icon: Facebook, href: "#", color: "hover:text-blue-700" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              </div>
              <span className="font-bold text-xl">Tally Connect</span>
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering businesses with strength, backed by reliability, and
              grounded in stability.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>support@tallyconnect.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-cyan-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-500 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Tally Connect. All rights reserved. Powered by Averlon.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`text-gray-400 ${social.color} transition-colors`}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
