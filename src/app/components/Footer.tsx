import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

interface FooterProps {
  onNavigate?: (id: string) => void;
  onLegalPage?: (page: string) => void;
  onContact?: () => void;
}

export function Footer({ onNavigate, onLegalPage, onContact }: FooterProps) {
  const productLinks = [
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "User Side", id: "user-side" },
    { label: "Admin Panel", id: "admin-panel" },
    { label: "Technical", id: "technical" },
  ];

  const companyLinks = ["About Us", "Careers", "Blog", "Press", "Contact"];
  const resourceLinks = ["Documentation", "API Reference", "Tutorials", "Community", "Support"];

  const legalLinks = [
    { label: "Privacy Policy", page: "privacy" },
    { label: "Terms of Service", page: "terms" },
    { label: "Cookie Policy", page: "cookies" },
    { label: "GDPR", page: null },
    { label: "Compliance", page: null },
  ];

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
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <div className="w-2 h-2 rounded-full bg-[#002855]"></div>
              </div>
              <span className="font-bold text-xl">Tally Connect</span>
            </motion.div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering businesses with strength, backed by reliability, and grounded in stability.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>support@tallyconnect.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-cyan-500" />
                <span>9892440788</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate?.(link.id)}
                    className="text-gray-400 hover:text-cyan-500 transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  {link === "Contact" ? (
                    <button
                      onClick={() => { onContact?.(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="text-gray-400 hover:text-cyan-500 transition-colors text-sm text-left"
                    >
                      {link}
                    </button>
                  ) : (
                    <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors text-sm">
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  {link.page ? (
                    <button
                      onClick={() => onLegalPage?.(link.page!)}
                      className="text-gray-400 hover:text-cyan-500 transition-colors text-sm text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors text-sm">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
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