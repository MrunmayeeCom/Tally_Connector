"use client";

export default function LicenseAgreementPage() {
  const sections = [
    {
      number: "01",
      title: "Introduction",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      content: (
        <div className="space-y-2">
          <p>This End-User License Agreement (<span className="font-semibold text-[#1e3a8a]">"EULA"</span>) is a legal agreement between you and <span className="font-semibold text-[#1e3a8a]">Averlon Solutions</span>.</p>
          <p>This EULA governs your acquisition and use of our Tally Connect software directly from Averlon Solutions or through an authorized reseller or distributor.</p>
          <p>Please read this EULA carefully before installing or using the software. By installing and/or using the Software, you confirm your acceptance and agree to be bound by this agreement.</p>
          <p>If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity.</p>
        </div>
      ),
    },
    {
      number: "02",
      title: "License Grant",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          <p>Averlon Solutions grants you a <span className="font-semibold text-[#1e3a8a]">non-transferable, non-exclusive license</span> to use the Tally Connect software within your Bitrix24 environment.</p>
          <p className="font-medium text-slate-700">You are permitted to:</p>
          <ul className="space-y-2">
            {[
              "Install and use the Software within your Bitrix24 account",
              "Configure integrations with IndiaMART and supported CRM systems",
              "Use the Software in accordance with your subscription plan",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      number: "03",
      title: "Prohibited Activities",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
      content: (
        <ul className="space-y-2">
          {[
            "Modify, reverse engineer, decompile, or disassemble the Software",
            "Copy, distribute, resell, or commercially exploit the Software",
            "Allow unauthorized third-party access to the Software",
            "Use the Software in violation of applicable laws or regulations",
            "Use the Software in a way that breaches this agreement",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      number: "04",
      title: "Intellectual Property and Ownership",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      content: (
        <div className="space-y-2">
          <p>Averlon Solutions retains <span className="font-semibold text-[#1e3a8a]">full ownership</span> of the Software, including all intellectual property rights, source code, and any updates or modifications.</p>
          <p>This agreement does not grant you ownership of the Software but only a limited right to use it.</p>
        </div>
      ),
    },
    {
      number: "05",
      title: "Third-Party Services",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
        </svg>
      ),
      content: (
        <p>Tally Connect integrates with third-party services including <span className="font-semibold text-[#1e3a8a]">IndiaMART, Bitrix24, Zoho, HubSpot, and Salesforce</span>. Averlon Solutions is not responsible for the availability, accuracy, or performance of these external services.</p>
      ),
    },
    {
      number: "06",
      title: "Termination",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      content: (
        <p>This EULA is effective from the date you first use the Software and continues until terminated. It may terminate immediately if you <span className="font-semibold text-[#1e3a8a]">fail to comply</span> with any terms. Upon termination, you must stop all use of the Software.</p>
      ),
    },
    {
      number: "07",
      title: "Limitation of Liability",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      content: (
        <p>Averlon Solutions shall <span className="font-semibold text-[#1e3a8a]">not be liable</span> for any indirect, incidental, or consequential damages, including loss of data or business interruption, arising from the use of the Software.</p>
      ),
    },
    {
      number: "08",
      title: "Governing Law",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      content: (
        <p>This EULA shall be governed by and construed in accordance with the <span className="font-semibold text-[#1e3a8a]">laws of India</span>.</p>
      ),
    },
    {
      number: "09",
      title: "Company Information",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      content: (
        <div className="space-y-1">
          <p className="font-semibold text-[#1e3a8a]">Averlon Solutions</p>
          <p>5th Floor, Unit No.515, Lodha Supremus II Road No 22, Wagle Estate MIDC, Thane, Maharashtra 400604, India</p>
        </div>
      ),
    },
    {
      number: "10",
      title: "Contact",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      content: (
        <p>Email: <a href="mailto:info@averlonworld.com" className="font-semibold text-blue-600 hover:underline">info@averlonworld.com</a></p>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #faf5ff 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden py-16 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #0e4f6b 50%, #0f172a 100%)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.15)_0%,_transparent_65%)]" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Legal Document
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            End-User License Agreement
          </h1>
          <p className="text-white/60 text-sm">Last updated: March 2026 · Tally Connect by Averlon Solutions</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        {sections.map((section) => (
          <div
            key={section.number}
            className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-blue-600"
                style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
              >
                {section.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-s font-bold text-blue-300" style={{ letterSpacing: "0.1em" }}>
                    {section.number}
                  </span>
                  <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: "linear-gradient(135deg, #0f172a, #0e4f6b)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <p className="text-white/60 text-xs">
            By using Tally Connect, you agree to this End-User License Agreement. · © 2026 Averlon Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}