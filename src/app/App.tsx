import { useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<
    "monthly" | "quarterly" | "half-yearly" | "yearly"
  >("monthly");

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      <Header
        onLoginClick={() => setLoginModalOpen(true)}
        onNavigate={(section: string) => {
          setCurrentPage("home");
          setTimeout(() => {
            const element = document.getElementById(section);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 200);
        }}
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
            <FeaturesSection onKnowMore={() => setCurrentPage("demo")} />
            <PricingSection
              onPlanSelect={(plan, billingCycle) => {
                setLoginModalOpen(true);
              }}
              onContactSales={() => setCurrentPage("demo")}
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

      <Footer />
    </div>
  );
}