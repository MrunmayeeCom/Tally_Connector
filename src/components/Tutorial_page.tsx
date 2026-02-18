import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import {
  ArrowUp,
  ArrowDown,
  ArrowRight,
  CheckCircle,
  UserPlus,
  Settings,
  Shield,
  Users,
  HardDrive,
  Sparkles,
  Eye,
  BookOpen,
  FileText,
  BarChart2,
  Package,
  FilePlus,
  Rocket,
  ShoppingCart,
  Info
} from 'lucide-react'

import TutorialVideo from './TutorialVideo'
import { Footer } from './Footer'

import login_page from './assets/login_page.png'
import dashboard_page from './assets/dashboard_page.png'
import user_management_page from './assets/user_management_page.png'
import permission_page from './assets/data_permission_page.png'
import add_user from './assets/add_user.png'
import home_page from './assets/home_page.png'
import notification_page from './assets/notification_page.png'
import profile_page from './assets/profile_page.png'
import ledger_list from './assets/ledger.png'
import voucher_page from './assets/voucher_explorer.png'
import monthly_summary_page from './assets/monthly_summary.png'
import inventory_page from './assets/inventory.png'
import view_ledger_details from './assets/view_ledger_details.png'
import monthly_summary_report from './assets/monthly_summary_report.png'
import inventory_report from './assets/inventory_report.png'
import ledger_list_report from './assets/ledger_list_report.png'
import add_voucher from './assets/new_voucher.png'
import add_new_bill from './assets/add_new_bill.png'
import voucher_report from './assets/voucher_export.png'
import welcome_screen from './assets/welcome_screen.png'
import quick_links from './assets/quick_links.png'
import dashboard_export from './assets/dashboard_summary_report.png'
import order_book from './assets/order_book.png'

/* ======================
   TYPES
====================== */
type TutorialStep = {
  number: number
  title: string
  description: string
  icon: React.ForwardRefExoticComponent<any>
  iconColor: string
  image: string
  details: string[]
}

type TutorialSection = {
  sectionId: number
  sectionTitle: string
  sectionDescription: string
  steps: TutorialStep[]
}

/* ======================
   TUTORIAL DATA
====================== */
const tutorialSections: TutorialSection[] = [
  {
    sectionId: 1,
    sectionTitle: '1: Admin Registration & License Setup',
    sectionDescription:
      'Initial system onboarding where the Admin registers, activates the license, and securely sets up credentials.',
    steps: [
      {
        number: 1,
        title: 'Admin Registration, License Activation & Credential Setup',
        description:
          'The Admin completes registration, license activation, and secure credential setup to access the dashboard.',
        icon: Shield,
        iconColor: '#4F46E5',
        image: login_page,
        details: [
          'Admin registration & license activation',
          'User/Admin login toggle',
          'Email & password authentication',
          'Forgot Password recovery option',
        ],
      },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: '2: Agent Setup & Authentication',
    sectionDescription:
      'Agent installation and authentication for real-time synchronization.',
    steps: [
      {
        number: 2,
        title: 'Welcome to Tally Connect',
        description:
          'After registration, a Welcome modal confirms your dashboard. It highlights key features — ledger & voucher overview, user management, and real-time activity tracking.',
        icon: Rocket,
        iconColor: '#DB2777',
        image: welcome_screen,
        details: [
          'Quick overview of ledgers & vouchers',
          'Send invites & manage users easily',
          'Track activity in real-time',
          "Click \"Let's Go!\" to enter the dashboard",
        ],
      },
      {
        number: 3,
        title: 'Agent Download, Installation & Authentication',
        description:
          'The Admin downloads, installs, and authenticates the desktop agent to enable secure real-time data synchronization.',
        icon: Users,
        iconColor: '#0F766E',
        image: dashboard_page,
        details: [
          'Download & install desktop agent',
          'Login with Admin ID & password',
          'Tally Connect confirms active sync',
          'Access Denied if credentials are invalid',
        ],
      },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: '3: Data Sync & Dashboard',
    sectionDescription: 'Data synchronization and dashboard overview.',
    steps: [
      {
        number: 4,
        title: 'Data Synchronization',
        description:
          'Financial data including ledgers, vouchers, inventory, and reports are securely synchronized from Tally Prime to the cloud dashboard.',
        icon: HardDrive,
        iconColor: '#D97706',
        image: home_page,
        details: [
          'Agent pulls data from Tally Prime',
          'Ledgers, vouchers, inventory & orders synced',
          'Live KPIs on Dashboard Overview',
          'Income vs Expense, Payables, Receivables charts auto-updated & populated',
        ],
      },
      {
        number: 5,
        title: 'Quick Links & Upcoming Due Dates',
        description:
          'The dashboard provides Quick Links for instant navigation to Ledger List, Voucher Explorer, Order Book, and Inventory. The Upcoming Due Dates panel lists all pending payments with party name, amount, due date, and days left.',
        icon: HardDrive,
        iconColor: '#2563EB',
        image: quick_links,
        details: [
          'Quick Links: Ledger List, Voucher Explorer, Order Book, Inventory',
          'Upcoming Due Dates with party & amount',
          'Days left indicator for each due payment',
          'View All to see complete due dates list',
        ],
      },
      {
        number: 6,
        title: 'Dashboard Summary Report',
        description:
          'Export a full Dashboard Summary Report in PDF showing Total Receivables, Payables, Pending & Cleared Bills, month-wise Income vs Expense, outstanding ledgers, and upcoming due payments.',
        icon: FileText,
        iconColor: '#16A34A',
        image: dashboard_export,
        details: [
          'Total Receivables, Payables, Pending & Cleared Bills',
          'Month-wise Income, Expense & Net table',
          'Outstanding balances per ledger',
          'Upcoming due dates with party, amount & days left',
        ],
      },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: '4: Ledger Management',
    sectionDescription:
      'View, manage, and export all party ledgers with detailed transaction history and bill tracking.',
    steps: [
      {
        number: 7,
        title: 'Ledger List',
        description:
          'View and manage all party ledgers with their type, opening balance, outstanding amount, and due days. Filter, search, and export data as CSV or PDF.',
        icon: BookOpen,
        iconColor: '#7C3AED',
        image: ledger_list,
        details: [
          'View all party ledgers with balances',
          'Filter by All / Debit / Credit',
          'Search by party name',
          'Export as CSV or PDF',
          'View Details for individual ledger breakdown',
        ],
      },
      {
        number: 8,
        title: 'Ledger Account Details',
        description:
          'Click "View Details" on any ledger to see a full breakdown including Account Type, Opening Balance, Total Debit, and Total Credit. Tabs for Vouchers, Invoices, Bills, and Ageing provide a complete transaction history.',
        icon: BookOpen,
        iconColor: '#DC2626',
        image: view_ledger_details,
        details: [
          'Account Type, Opening Balance, Total Debit & Credit',
          'Vouchers tab with date, type, ref no & amounts',
          'Invoices, Bills & Ageing tabs',
          'Print or Export ledger details',
        ],
      },
      {
        number: 9,
        title: 'Add New Bill',
        description:
          'From the Ledger List, click "+ Add Bill" to open the Add New Bill modal. Fill in the Ledger (Party), Bill Number, Bill Date, Due Date, and Amount, then save.',
        icon: FilePlus,
        iconColor: '#0891B2',
        image: add_new_bill,
        details: [
          'Search and select ledger/party',
          'Enter Bill Number, Bill Date & Due Date',
          'Set Amount and Save Bill',
        ],
      },
      {
        number: 10,
        title: 'Ledger List Report',
        description:
          'Export a clean PDF report of all party ledgers showing Party Name, Type, Opening Balance, Outstanding, and Due Days for offline reference or sharing.',
        icon: FileText,
        iconColor:'#EA580C',
        image: ledger_list_report,
        details: [
          'All party ledgers in a printable format',
          'Columns: Party Name, Type, Opening Balance, Outstanding, Due Days',
          'Auto-generated from current ledger data',
        ],
      },
    ],
  },
  {
    sectionId: 5,
    sectionTitle: '5: Voucher Management',
    sectionDescription:
      'Explore, create, and export all financial transactions including sales, purchases, payments, and journals.',
    steps: [
      {
        number: 11,
        title: 'Voucher Explorer',
        description:
          'Explore all financial transactions including Sales, Purchase, Payment, Receipt, and Journal vouchers. Filter by type, date range, and status, or create new vouchers directly.',
        icon: FileText,
        iconColor: '#9333EA',
        image: voucher_page,
        details: [
          'Filter by Sales, Purchase, Payment, Receipt, Journal',
          'Search by reference number or party',
          'Date range and status filters',
          'Create new vouchers directly',
          'Export list or delete entries',
        ],
      },
      {
        number: 12,
        title: 'New Voucher',
        description:
          'Click "+ New Voucher" in the Voucher Explorer to create a transaction. Select the voucher type, set the date, search the ledger, choose Debit or Credit, and enter the amount.',
        icon: FilePlus,
        iconColor: '#0D9488',
        image: add_voucher,
        details: [
          'Select voucher type & date',
          'Search and link a ledger',
          'Set Debit or Credit with amount',
          '+ Add Line for multi-entry vouchers',
          'Save Voucher to record the transaction',
        ],
      },
      {
        number: 13,
        title: 'Voucher List Report',
        description:
          'Export a complete Voucher List Report showing all transactions with Date, Type, Reference Number, Party, Amount, and Status for offline review or record-keeping.',
        icon: FileText,
        iconColor: '#B45309',
        image: voucher_report,
        details: [
          'All voucher types: Sales, Purchase, Receipt, Payment, Debit Note',
          'Columns: Date, Type, Ref No, Party, Amount & Status',
          'Auto-generated from current voucher data',
        ],
      },
    ],
  },
  {
    sectionId: 6,
    sectionTitle: '6: Order Book Management',
    sectionDescription: 'Track and manage all sales and purchase orders in one place.',
    steps: [
      {
        number: 14,
        title: 'Order Book',
        description:
          'The Sales & Purchase Order Book tracks all orders in one place. Filter by All, Sales, or Purchase, and search by order number or customer.',
        icon: ShoppingCart,
        iconColor: '#1D4ED8',
        image: order_book,
        details: [
          'Filter by All / Sales / Purchase',
          'Search by order number or customer',
          'Columns: Order No, Type, Date, Status, Customer/Supplier, Amount, Due Date',
          'Export full order list',
        ],
      },
    ],
  },
  {
    sectionId: 7,
    sectionTitle: '7: Monthly Summary',
    sectionDescription:
      'Analyze month-wise financial performance with interactive charts, KPIs, and exportable reports.',
    steps: [
      {
        number: 15,
        title: 'Monthly Summary',
        description:
          'Get a month-wise financial performance overview with KPIs for Turnover, Expense, Profit, and Margin, along with interactive charts and a detailed breakdown table.',
        icon: BarChart2,
        iconColor: '#BE185D',
        image: monthly_summary_page,
        details: [
          'KPIs: Turnover, Expense, Profit & Margin',
          'Monthly Turnover vs Expense bar chart',
          'Profit Trend line chart',
          'Month-wise breakdown table',
          'Export full report as PDF',
        ],
      },
      {
        number: 16,
        title: 'Monthly Summary Report',
        description:
          'Export the Monthly Summary Report as a PDF showing month-wise Turnover, Expense, Profit, and Margin % for the full year at a glance.',
        icon: BarChart2,
        iconColor: '#15803D',
        image: monthly_summary_report,
        details: [
          'Month-wise: Turnover, Expense, Profit & Margin %',
          'Full year overview in a single report',
          'Auto-calculated from synced voucher data',
        ],
      },
    ],
  },
  {
    sectionId: 8,
    sectionTitle: '8: Inventory Management',
    sectionDescription:
      'Track stock levels, monitor low-stock alerts, and export detailed inventory reports.',
    steps: [
      {
        number: 17,
        title: 'Inventory Management',
        description:
          "Track all stock items with opening, inward, outward, closing stock, rate, and total value. Filter for low-stock items and export inventory data.",
        icon: Package,
        iconColor: '#6D28D9',
        image: inventory_page,
        details: [
          'Total Items, Stock Value & Low Stock KPIs',
          'Item-level: Opening, Inward, Outward, Closing',
          'Search by item name or code',
          'Filter to show Low Stock Only',
          'Export inventory data',
        ],
      },
      {
        number: 18,
        title: 'Inventory Report',
        description:
          "Export a detailed Inventory Report showing each item's code, name, opening stock, inward, outward, closing stock, rate, and total value for offline analysis.",
        icon: Package,
        iconColor: '#C2410C',
        image: inventory_report,
        details: [
          'Item Code, Item Name & stock movement',
          'Opening, Inward, Outward & Closing Stock',
          'Rate & total Value per item',
        ],
      },
    ],
  },
  {
    sectionId: 9,
    sectionTitle: '9: Role-Based Access Control',
    sectionDescription:
      'Admins define and manage user roles, permissions, and dashboard access to ensure secure and controlled system usage.',
    steps: [
      {
        number: 19,
        title: 'User Management Dashboard',
        description:
          'Admin access the User Management panel to view all registered users along with their roles, permissions, and account status for centralized user oversight.',
        icon: Users,
        iconColor: '#3699A1',
        image: user_management_page,
        details: [
          'View all users with name & email',
          'Search & Bulk Selection available',
          'Configure or delete individual users',
          'Exit Admin to return to dashboard',
        ],
      },
      {
        number: 20,
        title: 'Create New User',
        description:
          'Admin click "Create User" to open the Create New User modal. Admins fill in the employee full name, email address, company name and assign a temporary password to create a new user profile.',
        icon: UserPlus,
        iconColor: '#166534',
        image: add_user,
        details: [
          'Add new user profiles',
          'Basic employee information setup',
          'Temporary credential assignment',
          'User appears in management list',
        ],
      },
      {
        number: 21,
        title: 'Dashboard & Data Permissions Configuration',
        description:
          'The permission configuration panel lists all available pages. Admins select a page category and use toggle controls on the right panel to grant or restrict access to specific data items.',
        icon: Settings,
        iconColor: '#86198F',
        image: permission_page,
        details: [
          'Left panel: all configurable page sections',
          'Right panel: item-level toggle switches',
          'Enable / disable specific ledgers, vouchers, inventory',
          'Search & pagination for large datasets',
          '"Unselect All" to revoke all access quickly',
        ],
      },
    ],
  },
  {
    sectionId: 10,
    sectionTitle: '10: Settings — Profile & Notifications',
    sectionDescription:
      'Admins and users can manage their account profile information and configure notification preferences from the Settings panel.',
    steps: [
      {
        number: 22,
        title: 'Profile Information',
        description:
          'In Settings > Profile, users can update their account details including avatar, username, and email. The Role field is displayed for reference but can only be changed by an administrator.',
        icon: Users,
        iconColor: '#92400E',
        image: profile_page,
        details: [
          'Change Avatar photo',
          'Update Username & Email',
          'Role is read-only (admin-assigned)',
          'Save Changes to apply updates',
        ],
      },
      {
        number: 23,
        title: 'Notification Preferences',
        description:
          'In Settings > Notifications, users control which system events trigger alerts. Each notification type can be independently enabled or disabled using a checkbox.',
        icon: Settings,
        iconColor: '#1E40AF',
        image: notification_page,
        details: [
          'New User Created alerts',
          'User Deleted alerts',
          'Payment Due Reminders',
          'Low Stock Alerts',
          'New Voucher & Bill Created alerts',
        ],
      },
    ],
  },
]

/* ======================
   FLOATING NAV BUTTONS
====================== */
type FloatingNavButtonProps = {
  onScrollToTop: () => void
  onScrollToBottom: () => void
  showTop: boolean
  showBottom: boolean
}

const FloatingNavButtons = ({
  onScrollToTop,
  onScrollToBottom,
  showTop,
  showBottom,
}: FloatingNavButtonProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        right: '2rem',
        bottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onScrollToTop}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(29, 78, 216))',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 8px 24px rgba(59, 130, 246, 0.4), 0 0 0 4px rgba(59, 130, 246, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            />
            <ArrowUp color="white" size={28} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBottom && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onScrollToBottom}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgb(6, 182, 212), rgb(13, 148, 136))',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 8px 24px rgba(6, 182, 212, 0.4), 0 0 0 4px rgba(6, 182, 212, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            />
            <ArrowDown color="white" size={28} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ======================
   SCROLLING STORY STEP
====================== */
type ScrollingStoryStepProps = {
  step: TutorialStep
  isMobile: boolean
  isTablet: boolean
  stepIndex: number
  totalSteps: number
}

const ScrollingStoryStep = ({
  step,
  isMobile,
  isTablet,
  stepIndex,
  totalSteps,
}: ScrollingStoryStepProps) => {
  const stepRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const popRef = useRef<HTMLDivElement>(null)

  // ── orientation detection (same pattern as MeetHub) ──────────────────────
  const [orientation, setOrientation] = useState<'landscape' | 'portrait' | 'square'>(
    'landscape'
  )
  const [showPopup, setShowPopup] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (stepRef.current) observer.observe(stepRef.current)
    return () => {
      if (stepRef.current) observer.unobserve(stepRef.current)
    }
  }, [])

  // Mobile popup: close on outside click or scroll threshold
  useEffect(() => {
    if (!isMobile) return
    let lastScrollY = window.scrollY
    const scrollThreshold = 50

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        showPopup &&
        imageRef.current &&
        popRef.current &&
        !imageRef.current.contains(event.target as Node) &&
        !popRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false)
      }
    }
    const handleScroll = () => {
      if (showPopup) {
        const delta = Math.abs(window.scrollY - lastScrollY)
        if (delta > scrollThreshold) setShowPopup(false)
      }
    }
    if (showPopup) {
      lastScrollY = window.scrollY
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      window.addEventListener('scroll', handleScroll, true)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [showPopup, isMobile])

  const imageOnLeft = step.number % 2 === 1

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    imageOnLeft ? [-80, 0, 0, -80] : [80, 0, 0, 80]
  )
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 1, 1, 0]
  )
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92])
  const textX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    imageOnLeft ? [80, 0, 0, 80] : [-80, 0, 0, -80]
  )
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 1, 1, 0]
  )

  const Icon = step.icon

  // Export list reports (ledger_list_report, voucher_report, inventory_report) → square
  const isSquareExport = [
    ledger_list_report,
    voucher_report,
    inventory_report,
  ].includes(step.image)

  // Portrait PDF reports (dashboard_export, monthly_summary_report) → portrait
  const isPortraitExport = [
    dashboard_export,
    monthly_summary_report,
  ].includes(step.image)

  const isModal = [add_new_bill, add_voucher, add_user, welcome_screen].includes(step.image)

  // landscape: full-width screenshots (dashboards, list views)
  const landscapeWidth = isModal
    ? (isMobile ? '320px' : isTablet ? '420px' : '500px')
    : (isMobile ? '380px' : isTablet ? '500px' : '600px')

  // square: export lists and any 1:1 ratio images
  const squareSize = isSquareExport
    ? (isMobile ? '100%' : isTablet ? '100%' : '100%')
    : isModal
      ? (isMobile ? '380px' : isTablet ? '480px' : '580px')
      : (isMobile ? '440px' : isTablet ? '560px' : '660px')

  const portraitHeight = isPortraitExport
  ? (isMobile ? '420px' : isTablet ? '500px' : '560px')
  : isModal
    ? (isMobile ? '440px' : isTablet ? '540px' : '640px')
    : (isMobile ? '380px' : isTablet ? '460px' : '540px')

const portraitWidth = isPortraitExport
  ? (isMobile ? '300px' : isTablet ? '360px' : '400px')
  : 'auto'

  return (
    <div
      ref={stepRef}
      style={{
        minHeight: isMobile ? '85vh' : '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        animate={
          isInView
            ? {
                background: [
                  `radial-gradient(circle at ${imageOnLeft ? '20%' : '80%'} 50%, ${step.iconColor}08, transparent 60%)`,
                  `radial-gradient(circle at ${imageOnLeft ? '30%' : '70%'} 60%, ${step.iconColor}12, transparent 70%)`,
                  `radial-gradient(circle at ${imageOnLeft ? '20%' : '80%'} 50%, ${step.iconColor}08, transparent 60%)`,
                ],
              }
            : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Progress indicator line */}
      <div
        style={{
          position: 'absolute',
          left: isMobile ? '1rem' : '3rem',
          top: 0,
          bottom: 0,
          width: '2px',
          background:
            'linear-gradient(to bottom, transparent, rgba(203, 213, 225, 0.3), transparent)',
          zIndex: 0,
        }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(to bottom, ${step.iconColor}, ${step.iconColor}80)`,
            transformOrigin: 'top',
          }}
        />
      </div>

      <div
        style={{
          maxWidth: '1300px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
          {/* Image Side */}
        <motion.div
          style={{
            x: isMobile ? 0 : imageX,
            scale: imageScale,
            opacity: imageOpacity,
            order: isMobile ? 1 : imageOnLeft ? 1 : 2,
            position: 'relative',
            background: `linear-gradient(135deg, ${step.iconColor}05, ${step.iconColor}02)`,
            borderRadius: '32px',
            padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
          }}
        >
          {/* Animated floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: step.iconColor,
                top: `${20 + i * 15}%`,
                left: imageOnLeft ? `${10 + i * 5}%` : `${80 - i * 5}%`,
                filter: 'blur(1px)',
                zIndex: 0,
                boxShadow: `0 0 20px ${step.iconColor}`,
              }}
            />
          ))}

          {/* Rotating gradient ring */}
          <motion.div
            animate={isInView ? { rotate: [0, 360], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, ${step.iconColor}20, transparent, ${step.iconColor}20)`,
              filter: 'blur(30px)',
              zIndex: -1,
            }}
          />

          {/* Pulsing glow */}
          <motion.div
            animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              height: '90%',
              borderRadius: '30px',
              background: `radial-gradient(circle, ${step.iconColor}15, transparent 70%)`,
              filter: 'blur(40px)',
              zIndex: -1,
            }}
          />

          <motion.div
            whileHover={{ scale: 1.02, rotate: imageOnLeft ? -2 : 2 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'relative',
              minHeight: isMobile ? '280px' : '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem':'1.5rem 2rem',            
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '28px',
                background: `linear-gradient(135deg, ${step.iconColor}08, ${step.iconColor}05)`,
                zIndex: -1,
              }}
            />

            {/* ── THE IMAGE – orientation-aware sizing ── */}
            <motion.img
              ref={imageRef}
              src={step.image}
              alt={step.title}
              onLoad={(e) => {
                const img = e.currentTarget as HTMLImageElement
                if (img.naturalWidth === img.naturalHeight) setOrientation('square')
                else if (img.naturalWidth > img.naturalHeight) setOrientation('landscape')
                else setOrientation('portrait')
              }}
              whileHover={{ scale: 1.03, rotateY: 5, rotateX: 5 }}
              onMouseEnter={() => !isMobile && setShowPopup(true)}
              onMouseLeave={() => !isMobile && setShowPopup(false)}
              onClick={() => { if (isMobile) setShowPopup(!showPopup) }}
              style={{
                // Apply sizing based on category overrides
                width: isPortraitExport
                  ? portraitWidth
                  : isSquareExport
                    ? squareSize
                    : orientation === 'landscape'
                      ? landscapeWidth
                      : orientation === 'square'
                        ? squareSize
                        : 'auto',
                height: isPortraitExport
                  ? portraitHeight
                  : isSquareExport
                    ? squareSize
                    : orientation === 'portrait'
                      ? portraitHeight
                      : orientation === 'square'
                        ? squareSize
                        : 'auto',
                maxWidth: isSquareExport ? '100%' : '100%',
                maxHeight: isSquareExport 
                  ? (isMobile ? '500px' : '700px')
                  : isPortraitExport
                    ? (isMobile ? '100%' : isTablet ? '100%' : '100%')
                    : (isMobile ? '400px' : isTablet ? '480px' : '560px'),
                margin: '0 auto',
                display: 'block',
                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.18))',
                borderRadius: '20px',
                cursor: 'pointer',
                border: `3px solid ${step.iconColor}40`,
                transformStyle: 'preserve-3d',
                objectFit: isPortraitExport ? 'fill':'contain',
                transition: 'width 240ms ease, height 240ms ease',
              }}
            />

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${step.iconColor}20, ${step.iconColor}10)`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                backdropFilter: 'blur(2px)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye
                  color="white"
                  size={48}
                  strokeWidth={2.5}
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                />
              </motion.div>
            </motion.div>

            {/* Corner accents */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '48px',
                height: '48px',
                borderTop: `2px solid ${step.iconColor}`,
                borderLeft: `2px solid ${step.iconColor}`,
                borderRight: 'none',
                borderBottom: 'none',
                borderRadius: '12px 0 0 0',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '48px',
                height: '48px',
                borderBottom: `2px solid ${step.iconColor}`,
                borderRight: `2px solid ${step.iconColor}`,
                borderLeft: 'none',
                borderTop: 'none',
                borderRadius: '0 0 12px 0',
              }}
            />
          </motion.div>

          {/* ── POPUP ── */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  position: isMobile ? 'relative' : 'absolute',
                  bottom: isMobile ? 'auto' : '-30px',
                  top: isMobile ? 'auto' : 'auto',
                  left: isMobile ? '0' : imageOnLeft ? '0' : 'auto',
                  right: isMobile ? '0' : imageOnLeft ? 'auto' : '0',
                  width: isMobile ? 'auto' : '320px',
                  maxWidth: isMobile ? 'none' : '320px',
                  marginTop: isMobile ? '1.5rem' : '0',
                  background: 'linear-gradient(135deg, rgb(15, 23, 42), rgb(30, 41, 59))',
                  borderRadius: '1.5rem',
                  padding: isMobile ? '1.5rem' : '1.75rem',
                  boxShadow:
                    '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), 0 0 30px rgba(59,130,246,0.3)',
                  color: 'white',
                  zIndex: 1000,
                  pointerEvents: isMobile ? 'auto' : 'none',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${step.iconColor}40`,
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', top: '10px', right: '10px' }}
                >
                  <Sparkles color={step.iconColor} size={20} />
                </motion.div>

                {/* Step badge */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '-26px',
                    left: '-26px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: step.iconColor,
                    boxShadow: `0 0 0 6px ${step.iconColor}99, 0 12px 25px rgba(0,0,0,0.35)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'white',
                    zIndex: 20,
                  }}
                >
                  {step.number}
                </motion.div>

                <div
                  ref={popRef}
                  style={{
                    width: isMobile ? '3rem' : '3.5rem',
                    height: isMobile ? '3rem' : '3.5rem',
                    borderRadius: '1rem',
                    background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}dd)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: `0 8px 20px ${step.iconColor}40`,
                  }}
                >
                  <Icon color="white" size={isMobile ? 20 : 24} strokeWidth={2.5} />
                </div>

                <h4
                  style={{
                    fontSize: isMobile ? '1.1rem' : '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                    fontFamily: '"Poppins", sans-serif',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h4>

                <p
                  style={{
                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.6,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── TEXT SIDE ── */}
        <motion.div
          style={{
            x: isMobile ? 0 : textX,
            opacity: textOpacity,
            order: isMobile ? 2 : imageOnLeft ? 2 : 1,
            position: 'relative',
            marginLeft: !isMobile && imageOnLeft ? '2rem' : '0',
            marginRight: !isMobile && !imageOnLeft ? '2rem' : '0',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(248,250,252,0.55))',
              padding: isMobile ? '1.3rem' : '1.6rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.35), 0 25px 60px rgba(0,0,0,0.18), 0 10px 25px rgba(0,0,0,0.12)',
              backdropFilter: 'blur(14px) saturate(120%)',
              WebkitBackdropFilter: 'blur(14px) saturate(120%)',
              position: 'relative',
              width: '100%',
              maxWidth: isMobile ? '100%' : '500px',
            }}
          >
            {/* Animated corner decoration */}
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: `conic-gradient(from 0deg, ${step.iconColor}15, transparent, ${step.iconColor}15)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
              }}
            />

            {/* Header row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 360 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{
                    width: isMobile ? '56px' : '64px',
                    height: isMobile ? '56px' : '64px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}dd)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 12px 28px ${step.iconColor}40, 0 0 20px ${step.iconColor}20`,
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
                  <Icon
                    color="white"
                    size={isMobile ? 28 : 32}
                    strokeWidth={2.5}
                    style={{
                      position: 'relative',
                      zIndex: 3,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '16px',
                      border: `2px solid ${step.iconColor}`,
                      zIndex: 1,
                    }}
                  />
                </motion.div>

                <div>
                  <div
                    style={{
                      fontSize: isMobile ? '0.75rem' : '0.8rem',
                      fontWeight: 700,
                      color: step.iconColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Step {step.number} of {totalSteps}
                  </div>
                  <div
                    style={{
                      width: '60px',
                      height: '3px',
                      background: `linear-gradient(to right, ${step.iconColor}, transparent)`,
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>

              {/* Step number badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: isMobile ? '52px' : '64px',
                  height: isMobile ? '52px' : '64px',
                  borderRadius: '16px',
                  background: step.iconColor,
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: isMobile ? '22px' : '28px',
                  fontWeight: 800,
                  color: 'white',
                  boxShadow: `0 0 0 2px white, 0 8px 20px ${step.iconColor}, 0 18px 40px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.5)`,
                }}
              >
                {step.number}
              </motion.div>
            </div>

            {/* Title */}
            <h4
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: isMobile ? '18px' : isTablet ? '22px' : '26px',
                fontWeight: 700,
                color: 'rgb(20, 47, 83)',
                lineHeight: 1.3,
                marginBottom: '0.8rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {step.title}
            </h4>

            {/* Details */}
            {step.details && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.details.map((detail: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      padding: '0.6rem 0.85rem',
                      background: `linear-gradient(90deg, ${step.iconColor}08, transparent)`,
                      borderRadius: '12px',
                      borderLeft: `4px solid ${step.iconColor}`,
                      boxShadow: `0 2px 8px ${step.iconColor}10`,
                    }}
                  >
                    <CheckCircle
                      size={18}
                      color={step.iconColor}
                      style={{ marginTop: '2px', flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: isMobile ? '12px' : '13px',
                        color: 'rgb(100, 116, 139)',
                        lineHeight: 1.5,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '116px' } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                height: '4px',
                background: step.iconColor,
                marginTop: '0.5rem',
                borderRadius: '10px',
                boxShadow: `0 3px 12px ${step.iconColor}, 0 6px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)`,
                position: 'relative',
                zIndex: 10,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

/* ======================
   TUTORIAL PAGE
====================== */
export default function TutorialPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [showTopButton, setShowTopButton] = useState(false)
  const [showBottomButton, setShowBottomButton] = useState(true)

  useEffect(() => {
    const link = document.createElement('link')
    link.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      * { box-sizing: border-box; }
      html, body { overflow-x: hidden; width: 100%; margin: 0; padding: 0; }
      body { overflow-y: auto; }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      setShowTopButton(scrollTop > 300)
      setShowBottomButton(scrollTop < scrollHeight - clientHeight - 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

  const totalSteps = tutorialSections.reduce((acc, s) => acc + s.steps.length, 0)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e0f7fa 0%, #ffffff 40%, #ffffff 100%)',
        position: 'relative',
        fontFamily: '"Inter", sans-serif',
        width: '100%',
      }}
    >
      {!isMobile && (
        <FloatingNavButtons
          onScrollToTop={scrollToTop}
          onScrollToBottom={scrollToBottom}
          showTop={showTopButton}
          showBottom={showBottomButton}
        />
      )}

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(224,247,250,0.3) 0%, rgba(255,255,255,0) 50%)',
            opacity: 0.6,
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* ── HERO ── */}
        <section
          style={{
            padding: isMobile ? '2rem 1rem' : isTablet ? '2.5rem 1.5rem' : '3rem 1.5rem',
            minHeight: isMobile ? 'auto' : '500px',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              width: '100%',
              padding: isMobile ? '0 0.5rem' : '0 1.5rem',
            }}
          >
            <div
              style={{
                display: isMobile ? 'flex' : 'grid',
                flexDirection: isMobile ? 'column' : undefined,
                gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr' : '1.1fr 0.9fr',
                gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                alignItems: isMobile ? 'start' : 'center',
              }}
            >
              {isMobile && (
                <motion.div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1.25rem',
                  }}
                >
                  <TutorialVideo />
                </motion.div>
              )}

              <div
                style={{ maxWidth: isMobile ? '100%' : '650px', marginTop: isMobile ? '0' : '-2.5rem' }}
              >
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px',
                    fontWeight: 700,
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    lineHeight: isMobile ? '38px' : isTablet ? '46px' : '58px',
                    letterSpacing: '-0.025em',
                  }}
                >
                  <span style={{ color: 'rgb(6, 182, 212)', fontWeight: 900 }}>
                    Explore Tally Connect
                  </span>{' '}
                  <span style={{ color: '#0F172A' }}>
                    with Detailed Step-by-Step Tutorials
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: 400,
                    color: '#475569',
                    marginTop: '-0.75rem',
                    marginBottom: '1.5rem',
                    lineHeight: isMobile ? '22px' : '26px',
                  }}
                >
                  Learn how to manage your finances, sync data from Tally Prime, and leverage
                  powerful reporting tools with comprehensive step-by-step tutorials.
                </motion.p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                    >
                      <div
                        style={{
                          width: isMobile ? '1.75rem' : '2.25rem',
                          height: isMobile ? '1.75rem' : '2.25rem',
                          borderRadius: '0.5rem',
                          background: 'rgba(6,182,212,0.15)',
                          border: '2px solid rgb(6,182,212)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle
                          style={{
                            width: isMobile ? '1rem' : '1.25rem',
                            height: isMobile ? '1rem' : '1.25rem',
                            color: 'rgb(6,182,212)',
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: isMobile ? '14px' : '16px',
                          fontWeight: 500,
                          color: '#475569',
                          lineHeight: isMobile ? '22px' : '26px',
                        }}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <motion.div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '4rem',
                  }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <TutorialVideo />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION HEADER ── */}
        <section
          style={{
            padding: isMobile ? '2.5rem 1rem 1.5rem' : '3rem 1.5rem 2rem',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              textAlign: 'center',
              padding: isMobile ? '0 0.5rem' : '0 1.5rem',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: isMobile ? '28px' : isTablet ? '34px' : '40px',
                fontWeight: 700,
                color: 'rgb(20,47,83)',
                marginBottom: '0.75rem',
                lineHeight: isMobile ? '36px' : isTablet ? '42px' : '48px',
              }}
            >
              Complete Step-by-Step Guide
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: isMobile ? '15px' : '17px',
                color: '#475569',
                margin: '0 auto',
                lineHeight: isMobile ? '23px' : '26px',
                fontWeight: 400,
              }}
            >
              Master Tally Connect with our comprehensive guide covering every feature from
              sign-up to advanced functionality
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: isMobile ? '0.65rem 1rem' : '0.75rem 1.25rem',
                margin: '1.25rem auto 0',
                maxWidth: 'fit-content',
                background:
                  'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(59,130,246,0.12))',
                border: '1.5px solid rgba(6,182,212,0.35)',
                borderRadius: '999px',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow:
                  '0 6px 20px rgba(6,182,212,0.18), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '2.25rem' : '2.5rem',
                  height: isMobile ? '2.25rem' : '2.5rem',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(6,182,212,0.4), rgba(6,182,212,0.25))',
                  backdropFilter: 'blur(15px)',
                  border: '1.5px solid rgba(6,182,212,0.5)',
                  boxShadow:
                    '0 4px 12px rgba(6,182,212,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(6,182,212,0.4), transparent 70%)',
                    filter: 'blur(6px)',
                  }}
                />
                <Info
                  size={isMobile ? 18 : 20}
                  color="#06B6D4"
                  strokeWidth={2.5}
                  style={{ position: 'relative', zIndex: 1 }}
                />
              </motion.div>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: isMobile ? '0.875rem' : isTablet ? '0.9375rem' : '1rem',
                  color: '#0e7490',
                  fontWeight: 600,
                  position: 'relative',
                  zIndex: 1,
                  textShadow: '0 1px 3px rgba(255,255,255,0.9)',
                  letterSpacing: '-0.01em',
                }}
              >
                {isMobile ? 'Tap cards for details' : 'Hover over cards to highlight the steps'}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── STEPS ── */}
        <section style={{ background: '#f0fdff', position: 'relative' }}>
          {tutorialSections.map((section, sectionIndex) => {
            const sectionStepStart = tutorialSections
              .slice(0, sectionIndex)
              .reduce((acc, s) => acc + s.steps.length, 0)

            return (
              <div
                key={section.sectionId}
                style={{
                  position: 'relative',
                  paddingTop: sectionIndex === 0 ? '2rem' : '4rem',
                  paddingBottom: '2rem',
                }}
              >
                {/* Section header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{
                    padding: isMobile ? '2rem 1rem 1rem' : '2.5rem 2rem 1.5rem',
                    textAlign: 'center',
                    maxWidth: '900px',
                    margin: '0 auto',
                    position: 'relative',
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: isMobile ? '250px' : '400px',
                      height: isMobile ? '250px' : '400px',
                      background: `radial-gradient(circle, ${section.steps[0].iconColor}12, transparent 70%)`,
                      borderRadius: '50%',
                      filter: 'blur(50px)',
                      zIndex: 0,
                    }}
                  />
                  <h2
                    style={{
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: isMobile ? '24px' : isTablet ? '28px' : '32px',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      position: 'relative',
                      zIndex: 1,
                      background: 'linear-gradient(135deg, rgb(20,47,83), rgb(71,85,105))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {section.sectionTitle}
                  </h2>
                  <p
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      color: '#64748b',
                      lineHeight: '1.6',
                      fontSize: isMobile ? '14px' : '16px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {section.sectionDescription}
                  </p>
                </motion.div>

                {section.steps.map((step, stepIndex) => (
                  <ScrollingStoryStep
                    key={step.number}
                    step={step}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    stepIndex={sectionStepStart + stepIndex}
                    totalSteps={totalSteps}
                  />
                ))}
              </div>
            )
          })}
        </section>

        {/* ── CTA ── */}
        <div
          style={{
            padding: isMobile
              ? '3rem 1.25rem 4rem'
              : isTablet
                ? '4rem 2.5rem 5rem'
                : '5rem 3rem 6rem',
            textAlign: 'center',
            background: 'linear-gradient(to bottom, #f0fbff, #f8fafc)',
          }}
        >
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.location.href = 'https://tally-connect-yu2q.onrender.com'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: isMobile ? '1rem 2rem' : isTablet ? '1.125rem 3rem' : '1.25rem 3.5rem',
              background: 'linear-gradient(135deg, rgb(30,41,59), rgb(15,23,42))',
              color: 'white',
              borderRadius: '1rem',
              border: 'none',
              fontSize: isMobile ? '1rem' : '1.125rem',
              fontWeight: 700,
              lineHeight: 1.3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              whiteSpace: 'nowrap',
              width: isMobile ? '100%' : 'auto',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              margin: '0 auto',
              zIndex: 100,
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>Go to Dashboard</span>
            <ArrowRight
              style={{
                width: isMobile ? '1.4rem' : '1.6rem',
                height: isMobile ? '1.4rem' : '1.6rem',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </motion.button>
        </div>

        <Footer />
      </div>
    </div>
  )
}