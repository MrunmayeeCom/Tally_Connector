import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate: (page: 'privacy' | 'terms' | 'cookies' | 'security') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative py-8 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#5A6C7D] text-sm text-center md:text-left">
            © 2025 Tally Connector. All rights reserved.
          </p>
          <p className="ttext-[#00BCD4] hover:text-[#0066CC] text-medium text-center md:text-center">
            Powered by Averlon.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
            <button 
              onClick={() => onNavigate('privacy')} 
              className="hover:text-accent transition-all duration-300 hover:scale-110"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate('terms')} 
              className="hover:text-accent transition-all duration-300 hover:scale-110"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => onNavigate('cookies')} 
              className="hover:text-accent transition-all duration-300 hover:scale-110"
            >
              Cookie Policy
            </button>
            <button 
              onClick={() => onNavigate('security')} 
              className="hover:text-accent transition-all duration-300 hover:scale-110"
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}