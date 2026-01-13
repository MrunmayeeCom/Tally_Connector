import { motion } from 'motion/react'
import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle,
  UserPlus,
  Settings,
  Shield,
  Users,
  UserCircle,
  CheckCircle2,
  CreditCard,
  HardDrive,
  Play,
  ExternalLink,
} from 'lucide-react'

import { TutorialVideo } from './TutorialVideo'
import { Footer } from './Footer'

import login_page from './assets/login_page.png'
import dashboard_page from './assets/dashboard_page.png'
import user_management_page from './assets/user_management_page.png'
import permission_page from './assets/permission_page.png'

/* ======================
   TUTORIAL DATA
====================== */

const tutorialSections = [
  {
    sectionId: 1,
    sectionTitle: '🧑‍💼1: Admin Registration & License Setup',
    sectionDescription:
      'Initial system onboarding where the Admin registers, activates the license, and securely sets up credentials.',
    steps: [
      {
        number: 1,
        title: 'Admin Registration',
        description:
          'The Admin registers on the Tally Connector portal to initialize the system.',
        icon: UserPlus,
        color: '#2196F3',
        screenshot: login_page,
      },
      {
        number: 2,
        title: 'License Activation',
        description:
          'A valid license is activated to enable dashboard access.',
        icon: CreditCard,
        color: '#4CAF50',
        screenshot: login_page,
      },
      {
        number: 3,
        title: 'Admin Credentials Creation',
        description:
          'Admin ID and password are finalized for secure access.',
        icon: Shield,
        color: '#1976D2',
        screenshot: login_page,
      },
      {
        number: 4,
        title: 'Secure Credential Storage',
        description:
          'Credentials are securely stored with role-based access control.',
        icon: HardDrive,
        color: '#607D8B',
        screenshot: login_page,
      },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: '🖥️ 2: Agent Setup & Authentication',
    sectionDescription:
      'Agent installation and authentication for real-time sync.',
    steps: [
      {
        number: 5,
        title: 'Download Agent',
        description:
          'Admin downloads the Tally Connector Agent from the dashboard.',
        icon: Users,
        color: '#673AB7',
        screenshot: dashboard_page,
      },
      {
        number: 6,
        title: 'Install Agent',
        description:
          'Agent is installed on the system running Tally Prime.',
        icon: Settings,
        color: '#009688',
        screenshot: dashboard_page,
      },
      {
        number: 7,
        title: 'Agent Login',
        description:
          'Agent logs in using Admin credentials.',
        icon: UserCircle,
        color: '#3F51B5',
        screenshot: login_page,
      },
      {
        number: 8,
        title: 'Credential Validation',
        description:
          'Credentials are validated and sync begins.',
        icon: CheckCircle2,
        color: '#4CAF50',
        screenshot: dashboard_page,
      },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: '🔄 3: Data Sync & Login Routing',
    sectionDescription:
      'Data synchronization and login routing.',
    steps: [
      {
        number: 9,
        title: 'Data Synchronization',
        description:
          'Data is synced from Tally Prime to the cloud.',
        icon: HardDrive,
        color: '#0288D1',
        screenshot: dashboard_page,
      },
      {
        number: 10,
        title: 'Login Redirection',
        description:
          'Users are redirected to the login screen.',
        icon: ArrowRight,
        color: '#455A64',
        screenshot: login_page,
      },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: '🔐 4: Role-Based Access Control',
    sectionDescription:
      'Admin-defined permissions control access.',
    steps: [
      {
        number: 11,
        title: 'Admin Dashboard Access',
        description:
          'Admins access analytics and financial insights.',
        icon: Shield,
        color: '#2E7D32',
        screenshot: dashboard_page,
      },
      {
        number: 12,
        title: 'User Management',
        description:
          'Admins manage users and roles.',
        icon: Users,
        color: '#6A1B9A',
        screenshot: user_management_page,
      },
      {
        number: 13,
        title: 'Permission Configuration',
        description:
          'Granular permission control for each user.',
        icon: Settings,
        color: '#EF6C00',
        screenshot: permission_page,
      },
    ],
  },
]

/* ======================
   PAGE
====================== */

export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'white', position: 'relative' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, white, rgb(236, 254, 255), white)', opacity: 0.8 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section with Left-Right Layout */}
        <section style={{ padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '3rem', 
              alignItems: 'center' 
            }}>
              {/* LEFT: Text Content */}
              <div>
                {/* <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={Geotracklogo} alt="GeoTrack Logo" style={{ width: '4rem', height: '4rem', objectFit: 'contain' }} />
                </div> */}
                
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: '1.2' }}>
                  <span style={{ color: 'rgb(6, 182, 212)' }}>Explore Tally</span>{' '}
                  <span style={{ color: 'rgb(30, 41, 59)' }}>with Detailed Step-by-Step Tutorials</span>
                </h1>
                
                <p style={{ fontSize: '1.125rem', color: 'rgb(75, 85, 99)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials covering setup, configuration, and advanced features.
                </p>

                {/* Feature List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(6, 182, 212)', flexShrink: 0 }} />
                      <span style={{ fontSize: '1rem', color: 'rgb(55, 65, 81)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Video Card */}
              <div>
                <div style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  overflow: 'hidden',
                  border: '1px solid rgb(243, 244, 246)'
                }}>
                  {/* Video Placeholder */}
                  <div style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    background: 'linear-gradient(to bottom right, rgb(241, 245, 249), rgb(219, 234, 254), rgb(204, 251, 241))'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <button style={{
                          width: '5rem',
                          height: '5rem',
                          background: 'rgb(6, 182, 212)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                          border: 'none',
                          cursor: 'pointer',
                          margin: '0 auto 1.5rem',
                          transition: 'background 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(8, 145, 178)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgb(6, 182, 212)'}
                        >
                          <Play style={{ width: '2.5rem', height: '2.5rem', color: 'white', marginLeft: '0.25rem' }} fill="white" />
                        </button>
                        <p style={{ marginTop: '1.5rem', color: 'rgb(55, 65, 81)', fontWeight: 500, fontSize: '1.125rem' }}>
                          Getting Started with Tally
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'rgb(107, 114, 128)', marginTop: '0.25rem' }}>
                          Duration: 5:32
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: 'rgb(30, 41, 59)',
                      marginBottom: '0.75rem',
                      fontWeight: 600
                    }}>
                      Welcome to Tally Tutorial
                    </h3>
                    <p style={{
                      color: 'rgb(75, 85, 99)',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      Learn how to set up your account, configure tracking parameters, and start monitoring your assets in just a few minutes.
                    </p>
                    <button style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgb(30, 41, 59)',
                      color: 'white',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgb(15, 23, 42)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgb(30, 41, 59)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                    >
                      Watch Full Tutorial Series
                      <ExternalLink style={{ width: '1.25rem', height: '1.25rem' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorial Cards Section */}
        <section style={{ padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'rgb(30, 41, 59)', marginBottom: '1rem' }}>
                Complete Step-by-Step Tutorial
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'rgb(75, 85, 99)' }}>
                Master Tally with our comprehensive guide covering every feature from sign-up to advanced functionality
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {tutorialSections.map((section) => (
                <div key={section.sectionId}>
                  <div style={{ borderLeft: '4px solid rgb(6, 182, 212)', paddingLeft: '1.5rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', background: 'linear-gradient(to right, rgb(236, 254, 255), transparent)', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'rgb(30, 41, 59)', marginBottom: '0.5rem' }}>
                      {section.sectionTitle}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'rgb(75, 85, 81)' }}>{section.sectionDescription}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {section.steps.map((step) => {
                      const Icon = step.icon;
                      const isHovered = hoveredCard === step.number;

                      return (
                        <div
                          key={step.number}
                          onMouseEnter={() => setHoveredCard(step.number)}
                          onMouseLeave={() => setHoveredCard(null)}
                          style={{
                            position: 'relative',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s',
                            transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                          }}
                        >
                          <img 
                            src={step.screenshot}
                            alt={step.title}
                            style={{
                              width: '100%',
                              height: '260px',
                              objectFit: 'cover',
                              display: 'block',
                              filter: isHovered ? 'blur(4px) brightness(0.3)' : 'none',
                              transition: 'filter 0.3s'
                            }}
                          />
                          
                          {isHovered && (
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(0,0,0,0.85)',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              padding: '2rem',
                              animation: 'fadeIn 0.3s'
                            }}>
                              <div style={{
                              width: '3.5rem',
                              height: '3.5rem',
                              borderRadius: '0.75rem',
                              backgroundColor: step.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '1rem'
                            }}>
                                <Icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                              </div>
                              
                              <h4 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: 'white',
                                marginBottom: '0.75rem'
                              }}>
                                {step.title}
                              </h4>
                              
                              <p style={{
                                fontSize: '1rem',
                                color: 'rgba(255,255,255,0.9)',
                                lineHeight: '1.6'
                              }}>
                                {step.description}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
              <button
                onClick={() => window.location.href = 'https://wonderful-daifuku-546d49.netlify.app'}
                style={{
                  padding: '1rem 2.5rem',
                  background: 'rgb(30, 41, 59)',
                  color: 'white',
                  borderRadius: '0.75rem',
                  border: 'none',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgb(15, 23, 42)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgb(30, 41, 59)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Go to Dashboard
                <ArrowRight style={{ width: '1.5rem', height: '1.5rem' }} />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}