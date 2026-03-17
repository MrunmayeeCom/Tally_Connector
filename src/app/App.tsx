import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LoginModal } from "./components/LoginModal";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { PricingSection } from "./components/PricingSection";
import { UserSideSection } from "./components/UserSideSection";
import { AdminPanelSection } from "./components/AdminPanelSection";
import { TechnicalSection } from "./components/TechnicalSection";
import { PartnersSection } from "./components/PartnersSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import BecomePartner from "./components/BecomePartner";
import { DemoPage } from "./components/DemoPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { CookiePolicy } from "./components/CookiePolicy";
import Tutorial_Page from "./components/Tutorial_Page";
import GDPRCompliance from "./components/GDPR";
import TutorialVideo from "./components/TutorialVideo";
import PressPage from "./components/PressPage";



export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<
    "monthly" | "quarterly" | "half-yearly" | "yearly"
  >("monthly");

  const handleNavigate = (section: string) => {
    setCurrentPage("home");
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  const handleContactClick = () => {
    setCurrentPage("demo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 useEffect(() => {
  const hash = window.location.hash.replace("#", "");
  if (hash === "tutorials") {
    setCurrentPage("tutorials");
  }
}, []);

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      <Header
        onLoginClick={() => setLoginModalOpen(true)}
        onNavigate={handleNavigate}
      />

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onAdminLogin={(type, name) => {
          console.log(type, name);
        }}
      />

      <main>
        
        {currentPage === "home" && (
          <>
            <HeroSection goToDemo={() => setCurrentPage("demo")} />
            <FeaturesSection onKnowMore={() => {
              setCurrentPage("demo");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />
            <PricingSection
              onPlanSelect={(plan, billingCycle) => {
                setLoginModalOpen(true);
              }}
              onContactSales={() => {
                setCurrentPage("demo");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onBuyNow={(plan, billingCycle) => {
                setSelectedPlan(plan);
                setSelectedBillingCycle(billingCycle);
                setCurrentPage("checkout");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <UserSideSection />
            <AdminPanelSection />
            <TechnicalSection />
            <PartnersSection goToPartnerPage={() => setCurrentPage("partner")} />
            <FAQSection />
          </>
        )}

        {currentPage === "partner" && <BecomePartner />}

        {currentPage === "demo" && <DemoPage />}
        {currentPage === "tutorials" && <Tutorial_Page />}

        {currentPage === "privacy" && <PrivacyPolicy onBack={() => { setCurrentPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />}
        {currentPage === "terms" && <TermsOfService onBack={() => { setCurrentPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />}
        {currentPage === "cookies" && <CookiePolicy onBack={() => { setCurrentPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />}
        {currentPage === "gdpr" && <GDPRCompliance />}
        {currentPage === "press" && <PressPage />}

        {currentPage === "checkout" && (
          <CheckoutPage
            selectedPlan={selectedPlan}
            initialBillingCycle={selectedBillingCycle}
            onBack={() => {
              setCurrentPage("home");
              setTimeout(() => {
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }}
            onProceedToPayment={(billingCycle, formData) => {
              console.log("Proceeding to payment", billingCycle, formData);
            }}
          />
        )}
      </main>
      
      <Footer
        onNavigate={handleNavigate}
        onLegalPage={(page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onContact={handleContactClick}
        onPressPage={() => { setCurrentPage("press"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      />
    </div>
  );
}