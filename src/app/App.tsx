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
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

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
    return () => {
      tl.kill()
    }
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
  const [currentPage, setCurrentPage] = useState("home");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
 const [selectedBillingCycle, setSelectedBillingCycle] = useState<"monthly" | "quarterly" | "half-yearly" | "yearly">("monthly");

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

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {loading && <Loader />}
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
    </>
  );
}