import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  scrolled?: boolean;
  onLoginClick: () => void;
}

export function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Features', href: 'features', id: 'features' },
    { label: 'Pricing', href: 'pricing', id: 'pricing' },
    { label: 'User Side', href: 'user-features', id: 'user-features' },
    { label: 'Admin Panel', href: 'admin-features', id: 'admin-features' },
    { label: 'Technical', href: 'technical', id: 'technical' },
    { label: 'Partners', href: 'partners', id: 'partners' },
    { label: 'FAQ', href: 'faq', id: 'faq' },

  ];

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    scrollToSection(item.id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#00BCD4]"></div>
                <div className="w-2 h-2 rounded-full bg-[#0066CC]"></div>
                <div className="w-2 h-2 rounded-full bg-[#002855]"></div>
              </div>
              <span className="text-[#002855] font-bold text-xl md:text-2xl">
                Tally Connect
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-[#002855] hover:text-[#00BCD4] transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('faq')}
              className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all font-medium"
            >
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#002855]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left text-[#002855] hover:text-[#00BCD4] transition-colors py-2 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollToSection("partners");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-[#002855] hover:text-[#00BCD4] transition-colors py-2 font-medium"
              >
                Partners
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="w-full px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all font-medium"
              >
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}