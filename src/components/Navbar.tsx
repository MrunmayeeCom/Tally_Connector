import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  scrolled?: boolean;
  onLoginClick: () => void;
}

export function Navbar({ scrolled, onLoginClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [hasAnyPlan, setHasAnyPlan] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
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

  useEffect(() => {
    checkLoginStatus();
    
    // Listen for login status changes
    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('userLoginStatusChanged', handleLoginStatusChange);
    window.addEventListener('storage', handleLoginStatusChange);
    
    return () => {
      window.removeEventListener('userLoginStatusChanged', handleLoginStatusChange);
      window.removeEventListener('storage', handleLoginStatusChange);
    };
  }, []);

  const checkLoginStatus = async () => {
    const userStr = localStorage.getItem("user");
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserEmail(user.email);
        setUserName(user.name || user.email.split("@")[0]);
        setIsLoggedIn(true);
        
        // Check for active license
        await checkActiveLicense(user.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setHasActiveLicense(false);
      setHasAnyPlan(false);
    }
  };

  const checkActiveLicense = async (email: string) => {
    try {
      console.log('[Navbar] Checking active license for:', email);
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=695902cfc240b17f16c3d716`,
        {
          headers: {
            "x-api-key": "my-secret-key-123",
          },
        }
      );

      console.log('[Navbar] License check response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('[Navbar] License check response data:', data);
        
        // Check if activeLicense exists and status is 'active'
        const hasLicense = data.activeLicense && data.activeLicense.status === 'active';
        console.log('[Navbar] Has active license:', hasLicense);
        setHasActiveLicense(hasLicense);
        
        // Check if user has any plan (active or not)
        const hasPlan = !!data.activeLicense;
        console.log('[Navbar] Has any plan:', hasPlan);
        setHasAnyPlan(hasPlan);
      } else {
        console.log('[Navbar] License check failed - response not ok');
        setHasActiveLicense(false);
        setHasAnyPlan(false);
      }
    } catch (error) {
      console.error("[Navbar] Error checking active license:", error);
      setHasActiveLicense(false);
      setHasAnyPlan(false);
    }
  };

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

  const handleLoginButtonClick = () => {
    if (!isLoggedIn) {
      // Not logged in - open login modal
      onLoginClick();
    } else if (hasActiveLicense) {
      // Logged in with active license - go to dashboard
      window.open("https://tally-connect-frontend.onrender.com", "_blank");
    } else {
      // Logged in without license - go to pricing
      scrollToSection("pricing");
    }
    setMobileMenuOpen(false);
  };

  const getLoginButtonText = () => {
    if (!isLoggedIn) {
      return "Login";
    } else if (hasActiveLicense) {
      return "Dashboard";
    } else if (hasAnyPlan) {
      // User has a plan but it's not active (expired/cancelled)
      return "Upgrade";
    } else {
      // User is logged in but has never had a plan
      return "Get Started";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setHasActiveLicense(false);
    setHasAnyPlan(false);
    setUserEmail("");
    setUserName("");
    window.dispatchEvent(new Event('userLoginStatusChanged'));
    setMobileMenuOpen(false);
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
            
            {isLoggedIn && (
              <span className="text-[#002855] text-sm">
                {userName}
              </span>
            )}
            
            <button
              onClick={handleLoginButtonClick}
              className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all font-medium"
            >
              {getLoginButtonText()}
            </button>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-[#002855] hover:text-[#00BCD4] transition-colors font-medium"
              >
                Logout
              </button>
            )}
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
              
              {isLoggedIn && (
                <div className="text-[#002855] text-sm py-2">
                  Logged in as: {userName}
                </div>
              )}
              
              <button
                onClick={handleLoginButtonClick}
                className="w-full px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all font-medium text-center"
              >
                {getLoginButtonText()}
              </button>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-[#002855] hover:text-[#00BCD4] transition-colors py-2 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}