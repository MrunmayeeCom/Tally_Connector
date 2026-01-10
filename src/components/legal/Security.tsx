import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileCheck } from 'lucide-react';

export function Security() {
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
          Security
        </h1>
        
        <div className="prose prose-cyan max-w-none">
          <p className="text-gray-600 mb-8">
            Your security is our top priority. Learn about our comprehensive approach to protecting your data.
          </p>
          
          <section className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Shield className="text-cyan-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Data Encryption
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  All data transmitted between your browser and our servers is encrypted using industry-standard SSL/TLS protocols. Your sensitive information is encrypted both in transit and at rest using AES-256 encryption.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Lock className="text-cyan-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Access Controls
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement strict access controls to ensure that only authorized personnel can access your data. Our security measures include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Multi-factor authentication for all accounts</li>
                  <li>Role-based access control (RBAC)</li>
                  <li>Regular access audits and reviews</li>
                  <li>Automatic session timeout after inactivity</li>
                  <li>IP whitelisting options for enterprise customers</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Eye className="text-cyan-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Monitoring & Detection
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our systems are monitored 24/7 for suspicious activity. We use advanced intrusion detection systems and maintain comprehensive logs to quickly identify and respond to potential security threats.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <FileCheck className="text-cyan-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Compliance & Certifications
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Trackon is committed to maintaining the highest security standards and complying with relevant regulations:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>SOC 2 Type II certified</li>
                  <li>GDPR compliant</li>
                  <li>Regular third-party security audits</li>
                  <li>Annual penetration testing</li>
                  <li>Data Privacy Framework adherence</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Incident Response
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We have a comprehensive incident response plan in place. In the unlikely event of a security incident, our team will act immediately to contain the issue, investigate the root cause, and notify affected users in accordance with applicable laws.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Backups
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is automatically backed up multiple times daily to secure, geographically distributed data centers. We maintain encrypted backups for disaster recovery purposes with a 30-day retention period.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Responsible Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you discover a security vulnerability in our system, please report it to security@trackon.com. We appreciate responsible disclosure and will work with you to address any issues promptly.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Questions?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our security practices, please contact our security team at security@trackon.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
