import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, Download, LogOut, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  onLoginClick: () => void;
  onNavigate: (page: string) => void;
}

export function Header({ onLoginClick, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [hasAnyPlan, setHasAnyPlan] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "User Side", id: "user-side" },
    { label: "Admin Panel", id: "admin-panel" },
    { label: "Technical", id: "technical" },
    { label: "Partners", id: "partners" },
    { label: "FAQ", id: "faq" },
  ];

  useEffect(() => {
    checkLoginStatus();
    const handleLoginStatusChange = () => checkLoginStatus();
    window.addEventListener("userLoginStatusChanged", handleLoginStatusChange);
    window.addEventListener("storage", handleLoginStatusChange);
    return () => {
      window.removeEventListener("userLoginStatusChanged", handleLoginStatusChange);
      window.removeEventListener("storage", handleLoginStatusChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkLoginStatus = async () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserEmail(user.email);
        setUserName(user.name || user.email.split("@")[0]);
        setIsLoggedIn(true);
        await checkActiveLicense(user.email);
      } catch {
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
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=695902cfc240b17f16c3d716`,
        { headers: { "x-api-key": "my-secret-key-123" } }
      );
      if (response.ok) {
        const data = await response.json();
        setHasActiveLicense(data.activeLicense?.status === "active");
        setHasAnyPlan(!!data.activeLicense);
      } else {
        setHasActiveLicense(false);
        setHasAnyPlan(false);
      }
    } catch {
      setHasActiveLicense(false);
      setHasAnyPlan(false);
    }
  };

  const handleDashboardClick = () => {
    window.open("https://tally-connect-yu2q.onrender.com", "_blank");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleDownloadAgent = () => {
    const link = document.createElement("a");
    link.href = "/DownloadAgent.zip";
    link.download = "DownloadAgent.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleTutorialsClick = () => {
    window.location.href = "/#tutorials";
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setHasActiveLicense(false);
    setHasAnyPlan(false);
    setUserEmail("");
    setUserName("");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("userLoginStatusChanged"));
  };

  const getLoginButtonText = () => {
    if (hasActiveLicense) return "Dashboard";
    if (hasAnyPlan) return "Upgrade";
    return "Get Started";
  };

  const handleLoginButtonClick = () => {
    if (hasActiveLicense) {
      handleDashboardClick();
    } else {
      onNavigate("pricing");
    }
  };

  const getUserInitials = () => {
    if (!userName) return "U";
    return userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer w-40 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          onClick={() => { onNavigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-[#002855]"></div>
          </div>
          <span className="font-bold text-base text-gray-900">Tally Connect</span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 ml-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-xs font-medium text-gray-700 hover:text-cyan-600 transition-colors relative group cursor-pointer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center justify-end w-40 flex-shrink-0">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm shadow-md border-2 border-transparent hover:border-cyan-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getUserInitials()}
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {getUserInitials()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{userName}</p>
                          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      {hasActiveLicense && (
                        <>
                          <button
                            onClick={handleDashboardClick}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <LayoutDashboard size={18} className="text-blue-600 flex-shrink-0" />
                            <span className="font-medium text-sm">Dashboard</span>
                          </button>
                          <button
                            onClick={handleDownloadAgent}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <Download size={18} className="text-cyan-600 flex-shrink-0" />
                            <span className="font-medium text-sm">Download Agent</span>
                          </button>

                          {/* ── Watch Tutorials ── */}
                          <button
                            onClick={handleTutorialsClick}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <BookOpen size={18} className="text-blue-600 flex-shrink-0" />
                            <span className="font-medium text-sm">Watch Tutorials</span>
                          </button>

                          <div className="my-2 border-t border-gray-100" />
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                      >
                        <LogOut size={18} className="flex-shrink-0" />
                        <span className="font-medium text-sm">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={onLoginClick}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-gray-700 hover:text-cyan-600 transition-colors py-2 font-medium text-xs"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 border-t border-gray-200 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleLoginButtonClick}
                      className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-sm text-center"
                    >
                      {getLoginButtonText()}
                    </button>

                    {hasActiveLicense && (
                      <>
                        <button
                          onClick={handleDashboardClick}
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-gray-800 border border-blue-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </button>
                        <button
                          onClick={handleDownloadAgent}
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-gray-800 border border-cyan-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                        >
                          <Download size={16} />
                          Download Agent
                        </button>

                        {/* ── Watch Tutorials (mobile) ── */}
                        <button
                          onClick={handleTutorialsClick}
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-gray-800 border border-blue-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                        >
                          <BookOpen size={16} />
                          Watch Tutorials
                        </button>
                      </>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-red-600 border border-red-500 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-sm text-center"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}