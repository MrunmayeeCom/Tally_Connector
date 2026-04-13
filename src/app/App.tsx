import { Header } from "./components/Header";
import { LoginModal } from "./components/LoginModal";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { PricingSection } from "./components/PricingSection";
import { UserSideSection } from "./components/UserSideSection";
import { AdminPanelSection } from "./components/AdminPanelSection";
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
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AgentUpdatePopup from "../AgentUpdatePopup";
import { checkAndNotifyOnLogin } from "../agentUpdateService.js";
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Toaster } from "sonner";

// Map URL pathnames to page keys
const PATH_TO_PAGE: Record<string, string> = {
  "/":                "home",
  "/contact":         "demo",
  "/demo":            "demo",
  "/privacy":         "privacy",
  "/terms":           "terms",
  "/cookies":         "cookies",
  "/gdpr":            "gdpr",
  "/partner":         "partner",
  "/tutorials":       "tutorials",
  "/press":           "press",
  "/checkout":        "checkout",
  "/forgot-password": "forgotpassword",
  "/reset-password":  "resetpassword",
};

// Map page keys back to canonical URL paths
const PAGE_TO_PATH: Record<string, string> = {
  home:           "/",
  demo:           "/contact",
  privacy:        "/privacy",
  terms:          "/terms",
  cookies:        "/cookies",
  gdpr:           "/gdpr",
  partner:        "/partner",
  tutorials:      "/tutorials",
  press:          "/press",
  checkout:       "/checkout",
  forgotpassword: "/forgot-password",
  resetpassword:  "/reset-password",
};

function getPageFromPath(pathname: string): string {
  return PATH_TO_PAGE[pathname] ?? "home";
}

function Loader() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const poweredRef = useRef<HTMLSpanElement>(null)
  const brandRef   = useRef<HTMLSpanElement>(null)
  const cursorRef  = useRef<HTMLSpanElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)
  const tagRef     = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const POWERED = 'Powered by '
    const BRAND   = 'Averlon'
    if (poweredRef.current) poweredRef.current.textContent = ''
    if (brandRef.current)   brandRef.current.textContent   = ''
    const tl = gsap.timeline()
    tl.fromTo(wrapRef.current, { opacity:0 }, { opacity:1, duration:0.6, ease:'power2.inOut' })
    tl.fromTo(lineRef.current, { scaleX:0  }, { scaleX:1, duration:0.7, ease:'power3.inOut' }, '-=0.7')
    POWERED.split('').forEach(c =>
      tl.call(() => { if (poweredRef.current) poweredRef.current.textContent += c }, [], '+=0.055'))
    tl.call(() => {}, [], '+=0.2')
    BRAND.split('').forEach(c =>
      tl.call(() => { if (brandRef.current) brandRef.current.textContent += c }, [], '+=0.08'))
    tl.fromTo(tagRef.current,  { opacity:0, y:10 }, { opacity:1, y:0, duration:0.6 }, '+=0.25')
    tl.to(cursorRef.current, { opacity:0, duration:0.3, repeat:3, yoyo:true }, '+=0.3')
    tl.to(wrapRef.current,   { opacity:0, duration:0.7, ease:'power2.inOut' }, '+=0.2')
    return () => { tl.kill() }
  }, [])

  return (
    <div ref={wrapRef} style={{
      position:'fixed', inset:0, zIndex:9999, opacity:0,
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      background:'linear-gradient(135deg,#060D1A,#0B1628,#0D1F3C)'
    }}>
      <div style={{ position:'absolute', width:700, height:400, borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(11,94,215,.12),transparent 70%)',
        filter:'blur(20px)', pointerEvents:'none' }} />
      <div style={{ textAlign:'center', padding:'0 24px' }}>
        <div style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",
          fontSize:'clamp(24px,3.5vw,42px)', fontWeight:300,
          letterSpacing:'0.06em', display:'flex',
          alignItems:'center', whiteSpace:'nowrap' }}>
          <span ref={poweredRef} style={{ color:'#475569', letterSpacing:'0.08em' }} />
          <span ref={brandRef} style={{
            background:'linear-gradient(135deg,#93C5FD,#DBEAFE,#fff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            fontWeight:700, letterSpacing:'0.04em' }} />
          <span ref={cursorRef} style={{ display:'inline-block', width:1.5,
            height:'0.9em', background:'#60A5FA', marginLeft:4,
            verticalAlign:'middle', borderRadius:1,
            boxShadow:'0 0 8px rgba(96,165,250,.6)',
            animation:'blink 1.1s ease-in-out infinite' }} />
        </div>
        <div ref={lineRef} style={{ marginTop:16, height:1,
          background:'linear-gradient(90deg,transparent,rgba(147,197,253,.7),transparent)',
          transform:'scaleX(0)', transformOrigin:'center' }} />
        <p ref={tagRef} style={{ marginTop:20, fontSize:13, opacity:0,
          color:'#1E3A5F', letterSpacing:'0.25em', textTransform:'uppercase',
          fontWeight:500, fontFamily:"'Plus Jakarta Sans','Inter',sans-serif" }}>
          Empowering sales teams worldwide
        </p>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(() =>
    getPageFromPath(window.location.pathname)
  );

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<"monthly" | "quarterly" | "half-yearly" | "yearly">("monthly");

  // ── Agent update state ────────────────────────────────────────────────────
  const [agentFileUrl, setAgentFileUrl] = useState<string | null>(null);

  // Listen for login events — only place checkAndNotifyOnLogin is called.
  // The event must be dispatched by your login handler with { detail: { email, name } }.
  // If the middleware says email was already sent, url will be null → no popup.
  useEffect(() => {
    const onLogin = (e: Event) => {
      const { email, name } = (e as CustomEvent<{ email: string; name?: string }>).detail ?? {};
      if (!email) return;
      checkAndNotifyOnLogin({ email, name }).then((url) => {
        if (url) setAgentFileUrl(url);
      });
    };
    window.addEventListener('userLoginStatusChanged', onLogin);
    return () => window.removeEventListener('userLoginStatusChanged', onLogin);
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const targetPath = PAGE_TO_PATH[currentPage] ?? "/";
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (page: string, scrollTop = false) => {
    setCurrentPage(page);
    if (scrollTop) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (section: string) => {
    const pages = ["tutorials", "demo", "partner", "privacy", "terms", "cookies", "gdpr", "press", "checkout"];
    if (pages.includes(section)) {
      navigateTo(section, true);
      return;
    }
    setCurrentPage("home");
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleContactClick = () => navigateTo("demo", true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3200)
    return () => clearTimeout(t)
  }, [])

  // ── Forgot password page — standalone, no Header/Footer ──
  if (currentPage === "forgotpassword") {
    return (
      <ForgotPassword
        onBack={() => {
          navigateTo("home", true);
          setTimeout(() => setLoginModalOpen(true), 100);
        }}
      />
    );
  }

  // ── Reset password page — standalone, no Header/Footer ──
  if (currentPage === "resetpassword") {
    return (
      <ResetPassword
        onBack={() => {
          navigateTo("home", true);
          setTimeout(() => setLoginModalOpen(true), 100);
        }}
      />
    );
  }

  return (
    <>
    <Toaster richColors position="top-right" />56
      {loading && <Loader />}
      <div className="min-h-screen bg-white font-[Inter]">
        <Header
          onLoginClick={() => setLoginModalOpen(true)}
          onNavigate={(section) => {
            const pages = ["tutorials", "demo", "partner", "privacy", "terms", "cookies", "gdpr", "press", "checkout"];
            if (pages.includes(section)) {
              navigateTo(section, true);
            } else {
              handleNavigate(section);
            }
          }}
        />

        <LoginModal
          open={loginModalOpen}
          onOpenChange={setLoginModalOpen}
          onAdminLogin={(type, name) => {
            console.log(type, name);
          }}
          onForgotPassword={() => navigateTo("forgotpassword", true)}
        />

        {/* ── Agent update popup ── */}
        {agentFileUrl && (
          <AgentUpdatePopup
            fileUrl={agentFileUrl}
            onDismiss={() => setAgentFileUrl(null)}
          />
        )}

        <main>
          {currentPage === "home" && (
            <>
              <HeroSection goToDemo={() => navigateTo("demo", true)} />
              <FeaturesSection onKnowMore={() => navigateTo("demo", true)} />
              <PricingSection
                onPlanSelect={(plan, billingCycle) => {
                  setLoginModalOpen(true);
                }}
                onContactSales={() => navigateTo("demo", true)}
                onBuyNow={(plan, billingCycle) => {
                  setSelectedPlan(plan);
                  setSelectedBillingCycle(billingCycle);
                  navigateTo("checkout", true);
                }}
              />
              <UserSideSection />
              <AdminPanelSection />
              <PartnersSection goToPartnerPage={() => navigateTo("partner")} />
              <FAQSection />
            </>
          )}

          {currentPage === "partner"   && <BecomePartner />}
          {currentPage === "demo"      && <DemoPage />}
          {currentPage === "tutorials" && <Tutorial_Page />}
          {currentPage === "privacy"   && <PrivacyPolicy  onBack={() => navigateTo("home", true)} />}
          {currentPage === "terms"     && <TermsOfService onBack={() => navigateTo("home", true)} />}
          {currentPage === "cookies"   && <CookiePolicy   onBack={() => navigateTo("home", true)} />}
          {currentPage === "gdpr"      && <GDPRCompliance onBack={() => navigateTo("home", true)} />}
          {currentPage === "press"     && <PressPage />}

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
          onLegalPage={(page) => navigateTo(page, true)}
          onContact={handleContactClick}
          onPressPage={() => navigateTo("press", true)}
        />
      </div>
    </>
  );
}