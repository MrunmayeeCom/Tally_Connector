import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  scrolled?: boolean;
  onLoginClick: () => void;
}

export function Navbar({ scrolled, onLoginClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [hasAnyPlan, setHasAnyPlan] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Features', href: 'features', id: 'features' },
    { label: 'Pricing', href: 'pricing', id: 'pricing' },
    { label: 'User Side', href: 'user-side', id: 'user-side' },
    { label: 'Admin Panel', href: 'admin-panel', id: 'admin-panel' },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const scrollToSection = (sectionId: string, href: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      
      // After navigation, update URL and scroll
      setTimeout(() => {
        window.history.pushState({}, '', `/${href}`);
        
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Update URL without navigation - URL stays permanently
      window.history.pushState({}, '', `/${href}`);
      
      // Scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    scrollToSection(item.id, item.href);
  };

  const handleDashboardClick = () => {
    window.open("https://tally-connect-frontend.onrender.com", "_blank");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const getLoginButtonText = () => {
    if (hasActiveLicense) {
      return "Dashboard";
    } else if (hasAnyPlan) {
      return "Upgrade";
    } else {
      return "Get Started";
    }
  };

  const handleLoginButtonClick = () => {
    if (hasActiveLicense) {
      handleDashboardClick();
    } else {
      scrollToSection("pricing", "pricing");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setHasActiveLicense(false);
    setHasAnyPlan(false);
    setUserEmail("");
    setUserName("");
    setDropdownOpen(false);
    window.dispatchEvent(new Event('userLoginStatusChanged'));
    setMobileMenuOpen(false);
  };

  // Get user initials
  const getUserInitials = () => {
    if (!userName) return "U";
    return userName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        <div className="flex items-center h-16 md:h-20">
          {/* Logo */}
          <div onClick={() => {
            window.history.pushState({}, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
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
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-[#002855] hover:text-[#00BCD4] transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side - User dropdown or Login */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0066CC] to-[#004C99] flex items-center justify-center text-white font-semibold text-sm hover:scale-105 transition-transform border-2 border-transparent hover:border-[#00BCD4] shadow-md"
                  >
                    {getUserInitials()}
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        {/* Dropdown Header */}
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066CC] to-[#004C99] flex items-center justify-center text-white font-semibold flex-shrink-0">
                              {getUserInitials()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#002855] text-base truncate">
                                {userName}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {userEmail}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Dropdown Body */}
                        <div className="p-2">
                          {/* Only show Dashboard button if user has active license */}
                          {hasActiveLicense && (
                            <>
                              <button
                                onClick={handleDashboardClick}
                                className="w-full flex items-center gap-3 px-4 py-3 text-[#002855] hover:bg-gray-50 rounded-lg transition-colors text-left"
                              >
                                <LayoutDashboard size={20} className="flex-shrink-0" />
                                <span className="font-medium">Dashboard</span>
                              </button>

                              <div className="my-2 border-t border-gray-100"></div>
                            </>
                          )}

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                          >
                            <LogOut size={20} className="flex-shrink-0" />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all font-medium"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              className="text-[#002855]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
              
              {isLoggedIn ? (
                <>
                  <div className="pt-3 pb-2 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066CC] to-[#004C99] flex items-center justify-center text-white font-semibold text-sm">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#002855] text-sm truncate">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLoginButtonClick}
                    className="w-full px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all font-medium text-center"
                  >
                    {getLoginButtonText()}
                  </button>

                  {/* Only show Dashboard button in mobile if user has active license */}
                  {hasActiveLicense && (
                    <button
                      onClick={handleDashboardClick}
                      className="w-full flex items-center justify-center gap-2 px-6 py-2 text-[#002855] border border-[#0066CC] rounded-lg hover:bg-gray-50 transition-all font-medium"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-all font-medium"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="w-full px-6 py-2 bg-[#0066CC] text-white rounded-lg hover:bg-[#004C99] transition-all font-medium text-center"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}