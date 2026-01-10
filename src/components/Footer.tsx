import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#5A6C7D] text-sm text-center md:text-left">
            © 2025 Trackon. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-[#00BCD4] hover:text-[#0066CC] transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service" 
              className="text-[#00BCD4] hover:text-[#0066CC] transition-colors font-medium"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookie-policy" 
              className="text-[#00BCD4] hover:text-[#0066CC] transition-colors font-medium"
            >
              Cookie Policy
            </Link>
            <Link 
              to="/security" 
              className="text-[#00BCD4] hover:text-[#0066CC] transition-colors font-medium"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}