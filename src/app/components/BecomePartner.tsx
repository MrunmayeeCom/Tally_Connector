import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, GraduationCap, Award, Briefcase, Target, Zap } from "lucide-react";

export default function BecomePartner() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"become" | "directory">("become");

  const benefits = [
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description:
      "Unlock new recurring revenue streams through implementation services, upselling opportunities, and long-term client partnerships powered by Tally Connect."
  },
  {
    icon: GraduationCap,
    title: "Training & Certification",
    description:
      "Gain access to structured training programs, expert-led sessions, and official certifications to strengthen your technical and consulting capabilities."
  },
  {
    icon: Award,
    title: "Partner Tiers",
    description:
      "Advance through Bronze, Silver, and Gold partnership levels based on performance, unlocking exclusive incentives and recognition."
  },
  {
    icon: Briefcase,
    title: "Business Support",
    description:
      "Receive dedicated success guidance, onboarding assistance, and growth strategy support tailored to your business goals."
  },
  {
    icon: Target,
    title: "Marketing Resources",
    description:
      "Access co-branded marketing materials, campaign support, and promotional opportunities to expand your market presence."
  },
  {
    icon: Zap,
    title: "Priority Support",
    description:
      "Get fast-track technical assistance, priority issue resolution, and direct access to specialized support teams."
  }
];

  return (
  <div className="relative min-h-screen font-[Inter] overflow-hidden">
  
    {/* Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#831843]"></div>

    {/* Content */}
    <div className="relative z-10 pt-24 pb-20">

    {/* HERO SECTION */}
    <div className="text-center px-6 mb-6 flex justify-center">

      <div className="rounded-3xl px-14 py-10 max-w-6xl">

          <h2 className="text-5xl md:text-6xl font-extrabold italic text-gray-200 tracking-wide">
            Become a Tally Connect Partner
          </h2>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join our network of trusted partners and grow your business with Tally Connect
          </p>

        </div>
        </div>
        <div className="mt-6 mb-4 flex justify-center gap-6 flex-wrap">
    </div>

  <div className="max-w-6xl mx-auto px-6 space-y-10">
      {activeTab === "become" && (

    <div className="max-w-7xl mx-auto space-y-10">

      {/* PARTNER ADVANTAGES - GLASS STYLE */}
      <div className="text-center mb-12">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 
                      rounded-2xl px-8 py-6 shadow-xl max-w-6xl mx-auto">

      <h2 className="text-3xl font-semibold text-teal-300 mb-10">
        Partner Advantages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {benefits.map((item, index) => (
        <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        className="bg-white/10 p-4 rounded-xl border border-white/20 text-center backdrop-blur-md">
      <item.icon className="w-8 h-8 mx-auto mb-3 text-teal-300" />

      <h4 className="text-sm font-semibold text-white">
      {item.title}
      </h4>

      <p className="mt-2 text-xs text-gray-300 leading-relaxed">
      {item.description}
      </p>
      </motion.div>
      ))}
    </div>
  </div>
</div>

      {/* TIERS + FORM SECTION */}
      <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-8 items-start">

        {/* LEFT - INTERACTIVE TIERS */}
      <div>
      <div className="text-center mb-6">
      <h2 className="text-3xl md:text-4xl font-semibold">
      <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
      Partnership Tiers
      </span>
      </h2>

      <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>

      <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
      Choose the partnership level that matches your business goals
      </p>
</div>

      <div className="space-y-4 max-w-xl mx-auto">

      {/* GOLD */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 
                rounded-2xl text-white flex overflow-hidden shadow-lg">

        {/* ICON */}
        <div className="w-[35%] flex flex-col items-center justify-center bg-black/10 gap-3">
          <Award className="w-12 h-12 text-white" />
          <h3 className="font-bold text-lg">Gold Partner</h3>
        </div>

        {/* DETAILS */}
        <div className="w-[65%] p-5">

          <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
          <ul className="text-xs space-y-1 mb-3">
            <li>✔ Expert certification</li>
            <li>✔ 30+ implementations</li>
            <li>✔ Premium revenue target</li>
          </ul>

          <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
          <ul className="text-xs space-y-1">
            <li>✔ All Silver benefits</li>
            <li>✔ Dedicated success manager</li>
            <li>✔ Featured listing</li>
          </ul>
        </div>
        </div>

      {/* SILVER */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 
                rounded-2xl text-white flex overflow-hidden shadow-lg">

        <div className="w-[35%] flex flex-col items-center justify-center bg-black/10 gap-3">
          <Target className="w-12 h-12 text-white" />
          <h3 className="font-bold text-lg">Silver Partner</h3>
        </div>

        <div className="w-[65%] p-5">

          <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
          <ul className="text-xs space-y-1 mb-3">
            <li>✔ Advanced certification</li>
            <li>✔ 15+ implementations</li>
            <li>✔ Higher revenue target</li>
          </ul>

          <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
          <ul className="text-xs space-y-1">
            <li>✔ All Bronze benefits</li>
            <li>✔ Priority support</li>
            <li>✔ Co-marketing opportunities</li>
          </ul>
        </div>

      </div>


      {/* BRONZE */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 
                rounded-2xl text-white flex overflow-hidden shadow-lg">

        <div className="w-[35%] flex flex-col items-center justify-center bg-black/10 gap-3">
          <Briefcase className="w-12 h-12 text-white" />
          <h3 className="font-bold text-lg">Bronze Partner</h3>
        </div>

        <div className="w-[65%] p-5">

          <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
          <ul className="text-xs space-y-1 mb-3">
            <li>✔ Basic certification</li>
            <li>✔ 5+ implementations</li>
            <li>✔ Annual revenue target</li>
          </ul>

          <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
          <ul className="text-xs space-y-1">
            <li>✔ Partner badge</li>
            <li>✔ Marketing materials</li>
            <li>✔ Technical support</li>
          </ul>
        </div>

      </div>
      </div>
      </div>

        {/* RIGHT - FORM */}
        <div className="bg-white text-black rounded-3xl p-10 shadow-2xl">

          <h2 className="text-2xl font-semibold mb-8 text-center">
            Partner Application Form
          </h2>

          <form className="grid grid-cols-2 gap-4">

        {/* Company Info */}
        <input placeholder="Company Name *" className="border text-sm p-3 rounded-lg col-span-2" />
        <input placeholder="Contact Person *" className="border text-sm p-3 rounded-lg col-span-2" />

        <input type="email" placeholder="Email *" className="border text-sm p-3 rounded-lg" />
        <input placeholder="Phone *" className="border text-sm p-3 rounded-lg" />

        <input placeholder="Website" className="border text-sm p-3 rounded-lg col-span-2" />

        <input placeholder="Country *" className="border text-sm p-3 rounded-lg" />
        <input placeholder="City *" className="border text-sm p-3 rounded-lg" />

        {/* NEW FIELDS */}

        {/* Business Type */}
        <select className="border text-sm p-3 rounded-lg col-span-2">
        <option>Business Type *</option>
        <option>Technology</option>
        <option>Healthcare</option>
        <option>Finance</option>
        <option>Consulting</option>
        <option>Reseller</option>
        <option>Other</option>
        </select>

        {/* Years in Business */}
        <select className="border text-sm p-3 rounded-lg">
        <option>Years in Business *</option>
        <option>0–1 years</option>
        <option>1–3 years</option>
        <option>3–5 years</option>
        <option>5–10 years</option>
        <option>10+ years</option>
        </select>

        {/* Employees */}
        <select className="border text-sm p-3 rounded-lg">
          <option>Employees *</option>
          <option>1–10</option>
          <option>11–50</option>
          <option>51–200</option>
          <option>201–500</option>
          <option>500+</option>
        </select>

        {/* Existing Clients */}
        <input placeholder="Existing Clients" className="border text-sm p-3 rounded-lg" />

        {/* Join As */}
        <select className="border text-sm p-3 rounded-lg">
          <option>Join As *</option>
          <option>Channel Partner</option>
          <option>Distributor</option>
        </select>

        {/* Why Partner */}
        <textarea
          placeholder="Why do you want to become a partner? *"
          className="border text-sm p-3 rounded-lg col-span-2 h-24"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
        >
          Submit Application
        </button>

    </form>
    
      </div>
      </div>
    </div>

      )}
      {activeTab === "directory" && (

      <div className="space-y-16">

        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Tally Connect Partners can help you create and manage your business!
          </h2>

          <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our partners are there to make your Tally Connect experience more pleasant and productive – 
            from choosing a subscription plan to product implementation, customization, and employee training. 
            Tally Connect partners can also help you set up an integration with a third-party app or service. 
            Browse our Partner Directory to find a Tally Connect partner in your area and contact them directly 
            or use the form below to get a price estimate for your Tally Connect implementation project.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 
                        rounded-3xl px-10 py-12 shadow-2xl text-center">

          <h3 className="text-3xl font-semibold text-teal-300 mb-12">
            Why Become a Tally Connect Partner?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            <div>
              <h4 className="text-white font-semibold">Grow Your Business</h4>
              <p className="text-gray-300 text-sm mt-2">
                Access new markets and revenue streams
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">Expert Training</h4>
              <p className="text-gray-300 text-sm mt-2">
                Comprehensive partner training programs
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">Marketing Support</h4>
              <p className="text-gray-300 text-sm mt-2">
                Co-marketing opportunities and materials
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">Partner Recognition</h4>
              <p className="text-gray-300 text-sm mt-2">
                Bronze, Silver, and Gold partner tiers
              </p>
            </div>

          </div>
        </div>

      </div>
)}
    </div>
    </div>
    </div>
  );
}