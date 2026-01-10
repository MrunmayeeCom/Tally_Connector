import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Cookie Policy
        </h1>
        
        <div className="prose prose-cyan max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: December 24, 2025
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. What Are Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Keep you signed in</li>
              <li>Understand how you use our service</li>
              <li>Remember your preferences</li>
              <li>Improve our service performance</li>
              <li>Analyze site traffic and usage patterns</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Types of Cookies We Use
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="leading-relaxed">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Preference Cookies</h3>
                <p className="leading-relaxed">
                  These cookies allow the website to remember choices you make and provide enhanced features and personalization.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Managing Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website and prevent you from enjoying all features.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about our use of cookies, please contact us at cookies@trackon.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
