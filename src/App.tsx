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

/* ---------------- SCROLL HANDLER ---------------- */

function SectionRedirect({ sectionId }: { sectionId: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (!el) return;

        const yOffset = -80;
        const y =
          el.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }, [navigate, sectionId]);

  return null;
}

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

  const handleAdminLogin = () => {
    if (!pendingCheckout) return;
    const planSlug = selectedPlan.toLowerCase().replace(/\s+/g, "-");
    navigate(`/checkout/${planSlug}`);
    setPendingCheckout(false);
  };

  const handlePlanSelect = (plan: string, cycle: BillingCycle) => {
    setSelectedPlan(plan);
    setBillingCycle(cycle);
    setPendingCheckout(true);
    setLoginModalOpen(true);
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

        <section id="faq" className="scroll-mt-24">
          <FAQ />
        </section>

        <section id="partners" className="scroll-mt-24">
          <Partners />
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
        {/* Main page */}
        <Route path="/" element={<HomePage />} />

        {/* SEO-friendly virtual routes */}
        <Route path="/features" element={<SectionRedirect sectionId="features" />} />
        <Route path="/pricing" element={<SectionRedirect sectionId="pricing" />} />
        <Route path="/user-side" element={<SectionRedirect sectionId="user-side" />} />
        <Route path="/admin-panel" element={<SectionRedirect sectionId="admin-panel" />} />
        <Route path="/technical" element={<SectionRedirect sectionId="technical" />} />
        <Route path="/faq" element={<SectionRedirect sectionId="faq" />} />
        <Route path="/partners" element={<SectionRedirect sectionId="partners" />} />
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
      />

      <Toaster />
    </div>
  );
}