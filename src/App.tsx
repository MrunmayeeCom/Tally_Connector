import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { TermsOfService } from "./components/legal/TermsOfService";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { Security } from "./components/legal/Security";
import { Partners } from "./components/Partners";
import { BecomePartner } from "./components/BecomePartnerPage";

/* -------------------- Layout -------------------- */

function MainLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar scrolled={scrolled} />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* -------------------- Pages -------------------- */

function HomePage() {
  return (
    <div className="bg-[#EBF5FB]">
      <Hero />
      <Features />
      <UserFeatures />
      <AdminFeatures />
      <PricingSection/>
      <TechnicalDetails />
      <FAQ />
    </div>
  );
}

function PartnersPage() {
  return (
    <div className="bg-white">
      <Partners />
    </div>
  );
}

function BecomePartnerPage() {
  return (
    <div className="bg-white">
      <BecomePartner />
    </div>
  );
}

/* -------------------- App -------------------- */

export default function App() {
  const location = useLocation();

  // Scroll to section when navigating with state
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document
          .getElementById(location.state.scrollTo)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/partners"
        element={
          <MainLayout>
            <PartnersPage />
          </MainLayout>
        }
      />

      <Route
        path="/become-partner"
        element={
          <MainLayout>
            <BecomePartnerPage />
          </MainLayout>
        }
      />

      {/* Legal pages */}
      <Route
        path="/privacy-policy"
        element={
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        }
      />

      <Route
        path="/terms-of-service"
        element={
          <MainLayout>
            <TermsOfService />
          </MainLayout>
        }
      />

      <Route
        path="/cookie-policy"
        element={
          <MainLayout>
            <CookiePolicy />
          </MainLayout>
        }
      />

      <Route
        path="/security"
        element={
          <MainLayout>
            <Security />
          </MainLayout>
        }
      />
    </Routes>
  );
}
