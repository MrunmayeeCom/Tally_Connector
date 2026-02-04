import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { UserFeatures } from "./components/UserFeatures";
import { AdminFeatures } from "./components/AdminFeatures";
import { TechnicalDetails } from "./components/TechnicalDetails";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { PricingSection } from "./components/PricingSection";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { LoginModal } from "./components/LoginModal";
import { CheckoutPage } from "./components/CheckoutPage";
import { PaymentSuccess } from "./components/PaymentSuccess";

import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { TermsOfService } from "./components/legal/TermsOfService";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { Security } from "./components/legal/Security";
import { Partners } from "./components/Partners";
import { BecomePartner } from "./components/BecomePartnerPage";

import { Toaster } from "./components/ui/sonner";
import Tutorial_page from "./components/Tutorial_page";

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>("monthly");
  const [pendingCheckout, setPendingCheckout] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // Handle initial URL-based scrolling when component mounts or route changes
  useEffect(() => {
    // Map of routes to section IDs
    const sectionMap: Record<string, string> = {
      '/features': 'features',
      '/pricing': 'pricing',
      '/user-side': 'user-side',
      '/admin-panel': 'admin-panel',
      '/technical': 'technical',
      '/partners': 'partners',
      '/faq': 'faq',
    };

    const sectionId = sectionMap[location.pathname];
    
    if (sectionId) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname]);

  /* ---------------- SCROLL TO PRICING ---------------- */
  const scrollToPricing = () => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const el = document.getElementById("pricing");
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const el = document.getElementById("pricing");
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleAdminLogin = () => {
    if (!pendingCheckout) return;
    
    // Small delay to ensure modal closes and state updates
    setTimeout(() => {
      const planSlug = selectedPlan.toLowerCase().replace(/\s+/g, "-");
      navigate(`/checkout/${planSlug}`);
      setPendingCheckout(false);
    }, 100);
  };

  const handlePlanSelect = (plan: string, cycle: BillingCycle) => {
    setSelectedPlan(plan);
    setBillingCycle(cycle);
    
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    
    if (user) {
      // User is logged in, navigate directly to checkout
      const planSlug = plan.toLowerCase().replace(/\s+/g, "-");
      navigate(`/checkout/${planSlug}`);
    } else {
      // User not logged in, show login modal
      setPendingCheckout(true);
      setLoginModalOpen(true);
    }
  };

  const handleGetStartedClick = () => {
    const el = document.getElementById("pricing");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleLearnMoreClick = () => {
    const el = document.getElementById("features");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  /* ---------------- HOME PAGE ---------------- */

  const HomePage = () => (
    <div className="min-h-screen bg-[#EBF5FB] relative">
      <BackgroundEffects />

      <main className="pt-20">
        <section id="home">
          <Hero
            onGetStartedClick={handleGetStartedClick}
            onLearnMoreClick={handleLearnMoreClick}
          />
        </section>

        <section id="features" className="scroll-mt-24">
          <Features />
        </section>

        <section id="pricing" className="scroll-mt-24">
          <PricingSection onPlanSelect={handlePlanSelect} />
        </section>

        <section id="user-side" className="scroll-mt-24">
          <UserFeatures />
        </section>

        <section id="admin-panel" className="scroll-mt-24">
          <AdminFeatures />
        </section>

        <section id="technical" className="scroll-mt-24">
          <TechnicalDetails />
        </section>

        <section id="partners" className="scroll-mt-24">
          <Partners />
        </section>

        <section id="faq" className="scroll-mt-24">
          <FAQ />
        </section>

        <Footer />
      </main>

      <ScrollToTop />
    </div>
  );

  /* ---------------- ROUTE-BASED BACKGROUND ---------------- */

  const isTutorialPage = location.pathname === "/tutorials";

  /* ---------------- HEADER VISIBILITY ---------------- */

  const hideNavbarRoutes = ["/tutorials"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div
      className={`min-h-screen ${
        isTutorialPage
          ? "bg-gradient-to-br from-cyan-50 via-white to-cyan-100"
          : "bg-[#EBF5FB]"
      }`}
    >
      {/* Navbar */}
      {!hideNavbar && (
        <Navbar onLoginClick={() => setLoginModalOpen(true)} />
      )}

      <Routes>
        {/* Main page - handles all section routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<HomePage />} />
        <Route path="/pricing" element={<HomePage />} />
        <Route path="/user-side" element={<HomePage />} />
        <Route path="/admin-panel" element={<HomePage />} />
        <Route path="/technical" element={<HomePage />} />
        <Route path="/partners" element={<HomePage />} />
        <Route path="/faq" element={<HomePage />} />
        
        {/* Separate pages */}
        <Route path="/become-partner" element={<BecomePartner />} />

        {/* Checkout */}
        <Route
          path="/checkout/:plan"
          element={
            <CheckoutPage
              selectedPlan={selectedPlan}
              initialBillingCycle={billingCycle}
              onBack={() => navigate("/")}
              onProceedToPayment={() => {}}
            />
          }
        />

        {/* Payment Success */}
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* Tutorial Page */}
        <Route path="/tutorials" element={<Tutorial_page />} />

        {/* Legal pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/security" element={<Security />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onAdminLogin={handleAdminLogin}
        onLoginSuccess={() => setLoginModalOpen(false)}
        onNavigateToPricing={scrollToPricing}
      />

      <Toaster />
    </div>
  );
}