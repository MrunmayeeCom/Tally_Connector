import { motion, AnimatePresence } from 'motion/react'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { LucideIcon } from 'lucide-react'
import ReactDOM from 'react-dom'
import {
  ArrowUp, ArrowDown, ArrowRight, ArrowLeft,
  CheckCircle, UserPlus, Settings, Shield,
  Users, HardDrive, Sparkles, Eye, BookOpen,
  FileText, BarChart2, Package, FilePlus,
  Rocket, ShoppingCart, ZoomIn, Bell, Info, X,
  ChevronLeft, ChevronRight, Grid3X3, List,
  AlertTriangle,
} from 'lucide-react'

import TutorialVideo from './TutorialVideo'
import { Footer } from './Footer'
import logoImage from '../../assets/tallylogo.png'
import login_page from './assets1/assets/login_page.png'
import dashboard_page from './assets1/assets/dashboard_page.png'
import add_user from './assets1/assets/add_user.png'
import home_page from './assets1/assets/home_page.png'
import notification_page from './assets1/assets/notification_page.png'
import profile_page from './assets1/assets/profile_page.png'
import ledger_list from './assets1/assets/ledger_list.png'
import voucher_page from './assets1/assets/voucher.png'
import monthly_summary_page from './assets1/assets/monthly_summary_copy.png'
import inventory_page from './assets1/assets/inventory.png'
import view_ledger_details from './assets1/assets/view_ledger_details.png'
import monthly_summary_report from './assets1/assets/monthly_summary_report.png'
import inventory_report from './assets1/assets/inventory_report.png'
import ledger_list_report from './assets1/assets/ledger_list_report.png'
import add_voucher from './assets1/assets/add_voucher.png'
import add_new_bill from './assets1/assets/add_new_bill.png'
import voucher_report from './assets1/assets/voucher_report.png'
import welcome_screen from './assets1/assets/welcome_screen.png'
import quick_links from './assets1/assets/quick_links.png'
import dashboard_export from './assets1/assets/dashboard_export.png'
import order_book from './assets1/assets/order_book.png'
import bulk_configurations from './assets1/assets/bulk_configurations.png'
import bulk_selection from './assets1/assets/bulk_selection.png'
import configuration from './assets1/assets/configuration.png'
import voucher_permissions from './assets1/assets/voucher_permissions.png'
import voucher_selection from './assets1/assets/voucher_selection.png'
import notification_alert from './assets1/assets/notification_alert.png'
import company_selection from './assets1/assets/company_selection.png'
import agent from './assets1/assets/agent.png'
import active from './assets1/assets/active .png'
import error1 from './assets1/assets/error1.png'
import error2 from './assets1/assets/error2.png'
import error3 from './assets1/assets/error3.png'
import error4 from './assets1/assets/error4.png'

const BRAND = {
  primary:   '#06B6D4',
  primaryLt: '#38BDF8',
  primaryDk: '#0891B2',
  accent:    '#7C3AED',
  dark:      '#0F172A',
  mid:       '#1E293B',
  surface:   '#F0FDFF',
  slate:     '#475569',
  muted:     '#94A3B8',
  success:   '#10B981',
  amber:     '#F59E0B',
  border:    'rgba(6,182,212,0.18)',
}

/* ─── TYPES ─── */
type StepDetail = string | { message: string; reason: string }

interface Step {
  number: number
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  image: string
  details: StepDetail[]
}

interface Section {
  sectionId: number
  sectionTitle: string
  sectionTag: string
  sectionDescription: string
  sectionColor: string
  steps: Step[]
}

const tutorialSections: Section[] = [
  {
    sectionId: 1,
    sectionTitle: 'Admin Registration & Licence Setup',
    sectionTag: 'Section 01',
    sectionDescription: 'The Admin registers the organisation and activates the product licence to unlock the platform for the entire team.',
    sectionColor: '#E05C8A',
    steps: [
      {
        number: 1,
        title: 'Admin Registration, Licence Activation & Login',
        description: 'Register your organisation and activate the product licence to provision the full platform for your team. Select your role on the Login screen, enter your credentials, and click the appropriate login button to access your workspace.',
        icon: Shield,
        iconColor: '#E05C8A',
        image: login_page,
        details: [
          'Register the organisation and activate the product licence from the setup wizard',
          'Toggle between User and Admin roles using the role selector on the Login page',
          'Enter your Email and Password, then click "User Login" or "Admin Login"',
          'Use "Forgot Password?" to initiate instant, self-service account recovery',
        ],
      },
      {
        number: 2,
        title: 'Welcome to Tally Connect',
        description: 'The Welcome screen confirms your workspace is fully configured and ready for use. Review the available modules and click "Let\'s Go!" to navigate directly to the Dashboard.',
        icon: Rocket,
        iconColor: '#5B6AD0',
        image: welcome_screen,
        details: [
          'Confirms your account is active and all platform modules are available',
          'Previews core modules: Ledger List, Voucher Explorer, Order Book, and Inventory',
          'Click "Let\'s Go!" to proceed immediately to the main Dashboard',
        ],
      },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: 'Agent Setup & Authentication',
    sectionTag: 'Section 02',
    sectionDescription: 'Install the desktop agent, sign in with your Admin credentials, and select a Tally company to start syncing data.',
    sectionColor: '#2D8A7E',
    steps: [
      {
        number: 3,
        title: 'Agent Installation & Authentication',
        description: 'Install agent.exe on the Windows machine running Tally Prime, then enter your Admin email and password. A successful login authenticates the connection and begins automatic data sync.',
        icon: Users,
        iconColor: '#2D8A7E',
        image: agent,
        details: [
          'Install agent.exe on the Windows machine running Tally Prime',
          'Enter your Admin email and password when prompted in the agent terminal',
          'Successful auth confirms your Plan, Sync Interval, and detected companies',
          'Data pull begins only after a company is selected in the web app',
        ],
      },
      {
        number: 4,
        title: 'Open the Company Selector',
        description: 'In the web app, click "Select Company" in the top navigation to view all Tally companies detected by the agent. No data is pulled until you select one.',
        icon: HardDrive,
        iconColor: '#F59E0B',
        image: company_selection,
        details: [
          'Click "Select Company" in the top navigation bar to open the dropdown',
          'All companies detected from Tally Prime are listed with their initial avatar',
          '"0 of N companies selected" is shown until a selection is made',
        ],
      },
      {
        number: 5,
        title: 'Activate the Selected Company',
        description: 'Click a company name to activate it. All modules instantly reload with data scoped to the chosen company.',
        icon: HardDrive,
        iconColor: '#9B59B6',
        image: active,
        details: [
          'The active company is highlighted with "Active now" in green and a checkmark',
          'The navbar updates to display the active company name',
          'All modules reload immediately with that company\'s data',
        ],
      },
    ],
  },

  {
    sectionId: 2.1,
    sectionTitle: 'Agent Error Troubleshooting',
    sectionTag: 'Section 2.1',
    sectionDescription: 'Common errors you may see in the agent terminal — what each message means and exactly how to resolve it.',
    sectionColor: '#DC2626',
    steps: [
      {
        number: 1,
        title: 'Error: No Active Licence',
        description: 'The agent posts login credentials and immediately receives a 403 rejection. No data sync can begin until this is resolved.',
        icon: AlertTriangle,
        iconColor: '#DC2626',
        image: error1,
        details: [
          { message: 'HTTP 403 — "No active license found. Please purchase a plan."', reason: 'Admin account exists but no licence has been activated or purchased yet — log in as Admin, go to Billing, activate a plan, then re-run agent.exe.' },
          { message: 'Agent login failed immediately — no sync was started.', reason: 'The platform stays fully locked until a valid licence is linked, so no data can flow until this is resolved.' },
        ],
      },
      {
        number: 2,
        title: 'Error: Company Already Registered',
        description: 'Authentication succeeds but the sync fails with a 500 error when the agent tries to register the Tally company.',
        icon: AlertTriangle,
        iconColor: '#EA580C',
        image: error2,
        details: [
          { message: 'HTTP 500 — "Request failed with status 500" on POST /company/create', reason: 'This Tally company GUID is already registered under a different Admin — each company can only belong to one account.' },
          { message: 'Login passed ✅ but sync failed immediately after authentication.', reason: 'Use the original Admin account that registered this company, or ask them to remove it before re-running agent.exe.' },
        ],
      },
      {
        number: 3,
        title: 'Error: Invalid Credentials',
        description: 'The agent is rejected at the login step because the email or password entered in the terminal does not match any Admin account.',
        icon: AlertTriangle,
        iconColor: '#D97706',
        image: error3,
        details: [
          { message: 'HTTP 401 — "Invalid credentials"', reason: 'The email or password entered does not match any Admin account — check for typos, confirm you\'re using the correct account, or use "Forgot Password?" on the web app to reset.' },
          { message: 'Agent login failed before any sync could begin.', reason: 'This usually happens after a recent password change — update credentials in the terminal and re-run agent.exe.' },
        ],
      },
      {
        number: 4,
        title: 'Error: Backend Not Reachable',
        description: 'The agent gets no response at all — status and data are both undefined. The target server address is unreachable.',
        icon: AlertTriangle,
        iconColor: '#7C3AED',
        image: error4,
        details: [
          { message: 'Status: undefined · Data: undefined on POST localhost:4000/auth/login', reason: 'The agent config is pointing at a local address — no server is running there. Open the config file and update the API URL to the live production server.' },
          { message: 'Agent failed with zero response — the request never reached the server.', reason: 'Either the backend is currently offline, or the URL is misconfigured. Verify the server is running, then re-run agent.exe.' },
        ],
      },
      {
        number: 5,
        title: 'Success: Agent Running Correctly',
        description: 'When everything is configured correctly the agent authenticates, detects Tally companies, and begins streaming ledger data into the terminal.',
        icon: CheckCircle,
        iconColor: '#16A34A',
        image: active,
        details: [
          { message: ' Agent authenticated as: your-email@domain.com', reason: 'Credentials accepted and licence verified — the agent is fully connected to the server.' },
          { message: 'Companies detected · Active company selected · STEP 1: syncLedgers started', reason: 'Agent found Tally Prime, selected the active company, and began pulling data automatically.' },
          { message: 'Ledger Pull: <Party Name> streaming in terminal', reason: 'Live data is flowing from Tally Prime in real time — keep the terminal open while the agent is running.' },
        ],
      },
    ],
  },

  {
    sectionId: 3,
    sectionTitle: 'Dashboard Overview',
    sectionTag: 'Section 03',
    sectionDescription: 'The Dashboard delivers live KPIs, trend charts, quick navigation links, and upcoming due dates — all sourced directly from Tally Prime.',
    sectionColor: '#C17D2A',
    steps: [
      {
        number: 6,
        title: 'Dashboard — Live KPIs & Charts',
        description: 'The Dashboard provides a real-time financial snapshot with KPI cards for Receivables, Payables, Pending Bills, and Cleared Bills. Monthly Income vs Expense bar charts and Outstanding Trends give you complete visibility at a glance.',
        icon: HardDrive,
        iconColor: '#C17D2A',
        image: home_page,
        details: [
          'KPI cards: Total Receivables, Total Payables, Pending Bills, and Cleared Bills',
          'Monthly Income vs Expense bar chart — hover any bar for a detailed breakdown',
          'Outstanding Trends chart tracks balances across all party accounts',
          '"Export Report" downloads a complete PDF snapshot of the current dashboard',
        ],
      },
      {
        number: 7,
        title: 'Quick Links & Upcoming Due Dates',
        description: 'Quick Links gives you single-click access to every core module directly from the Dashboard. The Upcoming Due Dates panel lists pending payments with party name, amount, and days remaining so nothing is missed.',
        icon: HardDrive,
        iconColor: '#4A7FD4',
        image: quick_links,
        details: [
          'Quick Links navigate instantly to: Ledger List, Voucher Explorer, Order Book, and Inventory',
          'Due Dates panel shows party name, outstanding amount, due date, and days remaining',
          'Click "View All" to expand the full list of upcoming scheduled payments',
        ],
      },
      {
        number: 8,
        title: 'Dashboard Summary Report',
        description: 'Click "Export Report" to generate a structured PDF of your key financial metrics for the selected period. The report includes monthly income and expense breakdowns, outstanding party balances, and the full upcoming payments schedule.',
        icon: FileText,
        iconColor: '#3A9E6F',
        image: dashboard_export,
        details: [
          'Summary section: Total Receivables, Payables, Pending Bills, and Cleared Bills',
          'Month-wise breakdown: Income, Expense, and Net figures for the full period',
          'Outstanding balance per party and a complete upcoming payments schedule',
        ],
      },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: 'Ledger Management',
    sectionTag: 'Section 04',
    sectionDescription: 'View all party ledgers, drill into transaction histories, record manual bills, and export professional audit-ready reports.',
    sectionColor: '#7B5EA7',
    steps: [
      {
        number: 9,
        title: 'Ledger List',
        description: 'The Ledger List displays all party ledgers with their type, opening balance, outstanding amount, and overdue days in one consolidated view. Filter by ledger type, search by party name, and export or drill into any record directly from the toolbar.',
        icon: BookOpen,
        iconColor: '#7B5EA7',
        image: ledger_list,
        details: [
          'Columns: Party Name, Type, Opening Balance, Outstanding Amount, and Due Days',
          'Filter by All / Debit / Credit — search by party name with real-time results',
          'Click "+ Add Bill" on any row to record a manual bill against that ledger',
          'Click "View Details" to open a full transaction breakdown for any party',
        ],
      },
      {
        number: 10,
        title: 'Ledger Account Details',
        description: 'The Account Details view presents a complete summary and itemised transaction history for any selected party. Switch between Vouchers, Invoices, Bills, and Ageing tabs for a thorough ledger analysis.',
        icon: BookOpen,
        iconColor: '#C95C5C',
        image: view_ledger_details,
        details: [
          'Summary: Account Type, Opening Balance, Total Debit, and Total Credit',
          'Vouchers tab: Date, Type, Reference Number, Debit, and Credit columns',
          'Additional tabs for Invoices, Bills, and Ageing analysis',
          'Print or export the full ledger detail directly from this view',
        ],
      },
      {
        number: 11,
        title: 'Add New Bill',
        description: 'Click "+ Add Bill" to manually record a bill against any ledger by entering the reference, dates, and amount. The entry is reflected immediately in the ledger history upon saving.',
        icon: FilePlus,
        iconColor: '#2E8FAD',
        image: add_new_bill,
        details: [
          'Use "Search ledger…" to find and select the target party',
          'Enter the Bill Number, Bill Date, and Payment Due Date',
          'Set the Amount and click "Save Bill" — or "Cancel" to discard',
        ],
      },
      {
        number: 12,
        title: 'Ledger List Report',
        description: 'Export a formatted PDF of all party ledgers including their balances and overdue day counts. The report is print-ready and designed for audits, compliance reviews, or sharing with stakeholders.',
        icon: FileText,
        iconColor: '#D4714A',
        image: ledger_list_report,
        details: [
          'Columns: Party Name, Type, Opening Balance, Outstanding Amount, and Due Days',
          'All party ledgers presented in a clean, structured, print-ready layout',
          'Export the PDF directly from the Ledger List page toolbar',
        ],
      },
    ],
  },
  {
    sectionId: 5,
    sectionTitle: 'Voucher Management',
    sectionTag: 'Section 05',
    sectionDescription: 'Explore, create, and export all financial transactions — Sales, Purchase, Payment, Receipt, and Journal vouchers — from a single interface.',
    sectionColor: '#A855A0',
    steps: [
      {
        number: 13,
        title: 'Voucher Explorer',
        description: 'The Voucher Explorer consolidates all financial transactions in a single, filterable view with type, reference, party, amount, and status columns. Filter by voucher type, search by reference number or party name, and export or create vouchers directly from the toolbar.',
        icon: FileText,
        iconColor: '#A855A0',
        image: voucher_page,
        details: [
          'Columns: Date, Type, Reference No., Party Name, Amount, and Status',
          'Filter by: All / Sales / Purchase / Payment / Receipt / Journal',
          'Search by reference number or party name for instant, real-time results',
          '"Export List" and "+ New Voucher" are accessible from the toolbar',
        ],
      },
      {
        number: 14,
        title: 'Create New Voucher',
        description: 'Click "+ New Voucher", select the type and date, link a ledger, choose Debit or Credit, and enter the amount before saving. Use "+ Add Line" to include multiple entries for complex vouchers such as journal postings.',
        icon: FilePlus,
        iconColor: '#2A9D8F',
        image: add_voucher,
        details: [
          'Select the voucher type and set the transaction date from the form header',
          'Use "Search ledger…" to find and link the relevant ledger account',
          'Choose Debit or Credit and enter the amount for each line item',
          'Click "+ Add Line" for multi-line entries, then "Save Voucher" to confirm',
        ],
      },
      {
        number: 15,
        title: 'Voucher List Report',
        description: 'Export a structured PDF of all vouchers showing Date, Type, Reference Number, Party, Amount, and Status for the selected period. The report spans all transaction types and is ready for submission or archiving.',
        icon: FileText,
        iconColor: '#A07840',
        image: voucher_report,
        details: [
          'Columns: Date, Type, Reference No., Party Name, Amount, and Status',
          'Covers all types: Sales, Purchase, Receipt, Payment, and Debit Note',
          'Export directly from the Voucher Explorer toolbar',
        ],
      },
    ],
  },
  {
    sectionId: 6,
    sectionTitle: 'Order Book',
    sectionTag: 'Section 06',
    sectionDescription: 'Track all Sales and Purchase orders with real-time status, amounts, and due dates in one unified view.',
    sectionColor: '#3D6DB5',
    steps: [
      {
        number: 16,
        title: 'Sales & Purchase Order Book',
        description: 'The Order Book tracks all Sales and Purchase orders with their status, party details, order amount, and due date in a single view. Filter by order type, search by order number or party, and export the full order list at any time.',
        icon: ShoppingCart,
        iconColor: '#3D6DB5',
        image: order_book,
        details: [
          'Columns: Order No., Type, Date, Status, Party Name, Amount, and Due Date',
          'Filter by: All / Sales Orders / Purchase Orders',
          'Search by order number or customer/supplier name for instant results',
          '"Export List" downloads the complete order list as a formatted report',
        ],
      },
    ],
  },
  {
    sectionId: 7,
    sectionTitle: 'Monthly Summary',
    sectionTag: 'Section 07',
    sectionDescription: 'Analyse month-wise financial performance with KPI cards, trend charts, and a detailed tabular breakdown for the full year.',
    sectionColor: '#C2547A',
    steps: [
      {
        number: 17,
        title: 'Monthly Summary of Vouchers',
        description: 'The Monthly Summary provides a high-level financial performance view with KPI cards for Turnover, Expense, Profit, and Margin percentage. A bar chart and profit trend line complement the month-wise breakdown table displayed below.',
        icon: BarChart2,
        iconColor: '#C2547A',
        image: monthly_summary_page,
        details: [
          'KPI cards: Total Turnover, Total Expense, Net Profit, and Profit Margin %',
          'Monthly Turnover vs Expense bar chart for side-by-side period comparison',
          'Profit Trend line chart tracking performance trajectory across the full year',
          'Month-wise table: Turnover, Expense, Profit, and Margin % per calendar month',
        ],
      },
      {
        number: 18,
        title: 'Monthly Summary Report',
        description: 'Export a clean, consolidated PDF showing all 12 months with Turnover, Expense, Profit, and Margin percentage in one structured table. Ideal for management reviews, board presentations, or formal financial records.',
        icon: BarChart2,
        iconColor: '#3B8C5A',
        image: monthly_summary_report,
        details: [
          'Columns: Month, Total Turnover, Total Expense, Net Profit, and Margin %',
          'All 12 months consolidated in a single, print-ready summary table',
          'Export via "Export Report" on the Monthly Summary page toolbar',
        ],
      },
    ],
  },
  {
    sectionId: 8,
    sectionTitle: 'Inventory Management',
    sectionTag: 'Section 08',
    sectionDescription: 'Monitor all stock items, receive low-stock alerts, and export detailed inventory reports for accurate and timely stock control.',
    sectionColor: '#6B4FC4',
    steps: [
      {
        number: 19,
        title: 'Inventory Overview',
        description: 'The Inventory module displays all stock items with opening, inward, outward, and closing quantities alongside unit rate and total value. KPI cards surface Total Items, Stock Value, Low Stock Alerts, and Stock Movement at a glance.',
        icon: Package,
        iconColor: '#6B4FC4',
        image: inventory_page,
        details: [
          'KPI cards: Total Items, Total Stock Value, Low Stock Alerts, and Stock Movement',
          'Columns: Item Code, Name, Opening, Inward, Outward, Closing, Rate, and Value',
          'Search by item name or code — apply "Low Stock Only" filter for rapid triage',
          '"Export" downloads the complete inventory list as a structured report',
        ],
      },
      {
        number: 20,
        title: 'Inventory Report',
        description: 'Export a formatted PDF of all stock items showing quantity movements, unit rate, and total value per item. Suitable for supplier reviews, stock audits, or internal inventory management records.',
        icon: Package,
        iconColor: '#B55A35',
        image: inventory_report,
        details: [
          'Columns: Item Code, Name, Opening, Inward, Outward, Closing, Rate, and Value',
          'All stock items presented in a structured, print-ready format',
          'Export directly from the Inventory page toolbar',
        ],
      },
    ],
  },
  {
    sectionId: 9,
    sectionTitle: 'User Management & Permissions',
    sectionTag: 'Section 09',
    sectionDescription: 'Create user accounts and precisely control which columns and data records each user can access — for individual accounts or in bulk.',
    sectionColor: '#3A8C96',
    steps: [
      {
        number: 21,
        title: 'User Management Overview',
        description: 'The User Management panel lists all registered users with their name and email address. Each user card provides direct options to configure permissions, resend login credentials, or remove platform access.',
        icon: Users,
        iconColor: '#3A8C96',
        image: configuration,
        details: [
          'Lists all registered users with their full name and email address',
          '"Configure" opens the permissions panel for that specific user',
          '"Send Invite" resends login credentials to the selected user\'s email',
          'The delete icon removes access; "Exit Admin" returns to the main dashboard',
        ],
      },
      {
        number: 22,
        title: 'Create a New User',
        description: 'Click "+ Create User", fill in the Full Name, Email, Company, and a temporary password, then click "Create" to provision the account immediately. An invitation is sent automatically to the new user.',
        icon: UserPlus,
        iconColor: '#4A7A54',
        image: add_user,
        details: [
          'Enter the user\'s Full Name, Email address, and assigned Company',
          'Set a temporary password for the user\'s first-time login',
          'Click "Create" to provision the account and dispatch an invitation email',
        ],
      },
      {
        number: 23,
        title: 'Column Visibility — Single User',
        description: 'Open Configure for a user, select a Layout tab for the target module, and toggle individual columns on or off to control what that user sees. Click "Save" to apply the visibility settings immediately.',
        icon: Settings,
        iconColor: '#8B4A9C',
        image: voucher_permissions,
        details: [
          'Layout tabs cover: Ledgers, Vouchers, Orders, and Inventory modules',
          'Vouchers: toggle Date, Type, Ref No., Party, Amount, Status, and Actions',
          'Ledgers: toggle Party Name, Type, Opening Balance, Outstanding, and Due Days',
          'Toggle any column OFF to hide it from the user — click "Save" to apply',
        ],
      },
      {
        number: 24,
        title: 'Data Record Visibility — Single User',
        description: 'Open Configure for a user, select a Selection tab, and toggle individual records on or off to restrict which data that user can view. Click "Save" to apply the record-level access settings immediately.',
        icon: Settings,
        iconColor: '#5A6FAD',
        image: voucher_selection,
        details: [
          'Selection tabs cover: Ledger, Voucher, Order, and Inventory modules',
          'Each tab lists all available records — Vouchers displayed as "Party • Type"',
          'Toggle any record OFF to hide it entirely from this user\'s view',
          '"Select All" grants full access; records are paginated at 10 per page',
        ],
      },
      {
        number: 25,
        title: 'Bulk User Selection',
        description: 'Tick the checkbox on any user card to activate Bulk Selection mode for batch configuration. The action button updates dynamically to "Bulk Configure (N)" reflecting the exact number of users currently selected.',
        icon: Users,
        iconColor: '#3A8C96',
        image: bulk_selection,
        details: [
          'Tick any user card\'s checkbox to enter bulk selection mode',
          'The action button updates to "Bulk Configure (N)" dynamically',
          'N reflects the exact number of currently selected user accounts',
          'Uncheck all selections or click "Cancel" to exit bulk mode',
        ],
      },
      {
        number: 26,
        title: 'Bulk Configuration',
        description: 'Click "Bulk Configure (N)" to open the bulk settings panel, then select a Layout or Selection tab to configure visibility. Click "Apply to N Users" to push identical settings to all selected accounts simultaneously.',
        icon: Settings,
        iconColor: '#5A7A8C',
        image: bulk_configurations,
        details: [
          'Layout tab: configure column visibility for all selected users at once',
          'Selection tab: configure record-level visibility for all selected users at once',
          '"Apply to N Users" pushes the configured settings to every selected account',
          '"Cancel" exits the panel without saving any changes',
        ],
      },
    ],
  },
  {
    sectionId: 11,
    sectionTitle: 'Settings',
    sectionTag: 'Section 10',
    sectionDescription: 'Update your profile details and manage notification preferences to stay informed on platform events that matter to you.',
    sectionColor: '#8A5C3A',
    steps: [
      {
        number: 27,
        title: 'Profile Settings',
        description: 'Navigate to Settings › Profile to update your avatar, display name, and email address as needed. Your role is read-only and set by the administrator — click "Save Changes" to persist any edits you make.',
        icon: Users,
        iconColor: '#8A5C3A',
        image: profile_page,
        details: [
          'Update your profile avatar, display name, and email address',
          'The Role field is read-only and assigned by the system administrator',
          'Sidebar tabs: Profile, Notifications, Billing, and Logout',
          'Click "Save Changes" to persist your updates immediately',
        ],
      },
      {
        number: 28,
        title: 'Notification Preferences',
        description: 'Navigate to Settings › Notifications and toggle each alert category on or off to customise your notification stream. Control precisely which system events generate a notification — from new user creation to low stock warnings.',
        icon: Settings,
        iconColor: '#4A5FA8',
        image: notification_page,
        details: [
          'Toggle: New User Created and User Deleted alerts',
          'Toggle: Payment Due Reminders and Low Stock warnings',
          'Toggle: New Voucher Created and New Bill Created alerts',
        ],
      },
      {
        number: 29,
        title: 'Notification Bell & Activity Feed',
        description: 'Click the bell icon in the top navigation to open the notifications panel and review recent platform activity. Each entry shows the event type, description, and timestamp — click "Clear all" to dismiss all notifications at once.',
        icon: Bell,
        iconColor: '#6A4FC4',
        image: notification_alert,
        details: [
          'Bell badge displays the current unread notification count',
          'Each entry shows: event type, description, and exact timestamp',
          'Event types: Bill Created, User Deleted, Voucher Created, Low Stock, Payment Due',
          '"Clear all" dismisses every notification from the activity feed at once',
        ],
      },
    ],
  },
]

const ALL_STEPS = tutorialSections.flatMap(s => s.steps)
const TOTAL_STEPS = ALL_STEPS.length

/* ─── ZOOM MODAL ─── */
interface ZoomModalProps { show: boolean; onClose: () => void; step: Step; isMobile: boolean }
const ZoomModal = ({ show, onClose, step, isMobile }: ZoomModalProps) => {
  useEffect(() => {
    if (!show) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [show, onClose])

  if (!step) return null

  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="zoom-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '1.5rem',
          }}
        >
          <motion.div
            key="zoom-panel"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(10,15,30,0.95)',
              borderRadius: '24px', padding: '2rem',
              width: '100%', maxWidth: '1100px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1.25rem',
              position: 'relative', cursor: 'default',
              boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${step.iconColor}25`,
              border: `1px solid ${step.iconColor}20`,
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close zoom"
              style={{
                position: 'absolute', top: '14px', right: '14px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            >
              <X size={16} strokeWidth={2.5} />
            </button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '5px 14px 5px 5px', borderRadius: 999,
              background: `${step.iconColor}18`, border: `1px solid ${step.iconColor}35`,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step.iconColor, color: '#fff',
                display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700,
              }}>
                {step.number}
              </div>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{step.title}</span>
            </div>
            <img
              src={step.image} alt={step.title}
              style={{
                maxWidth: '100%', maxHeight: '78vh',
                objectFit: 'contain', borderRadius: '12px',
                display: 'block', margin: '0 auto',
                border: `2px solid ${step.iconColor}25`,
              }}
            />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', margin: 0 }}>
              {isMobile ? 'Tap outside to close' : 'Click outside or press Esc to close'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/* ─── INDEX SIDEBAR ─── */
interface IndexSidebarProps { activeGlobalIdx: number; onJump: (idx: number) => void; isMobile?: boolean; isOpen: boolean; onToggle: () => void; footerOffset: number }
const IndexSidebar = ({ activeGlobalIdx, onJump, isOpen, onToggle, footerOffset }: IndexSidebarProps) => {
  const SIDEBAR_W = 272

  const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
    const map: Record<number, boolean> = {}
    tutorialSections.forEach(s => { map[s.sectionId] = false })
    const active = tutorialSections.find(s =>
      s.steps.some((st: TutorialStep) => ALL_STEPS.findIndex((x: TutorialStep) => x.number === st.number) === activeGlobalIdx)
    )
    if (active) map[active.sectionId] = true
    return map
  })

  const toggleSection = (id: number) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <>
      {isOpen && (
        <motion.div
          animate={{ x: isOpen ? 0 : -SIDEBAR_W }}
          initial={false}
          transition={{ type: 'spring', stiffness: 340, damping: 34 }}
          style={{
            position: 'fixed', left: 0, top: 0, bottom: footerOffset,
            width: `${SIDEBAR_W}px`, zIndex: 500,
            background: '#ffffff', borderRight: '1px solid #E8F4F8',
            boxShadow: '6px 0 32px rgba(6,182,212,0.07), 2px 0 8px rgba(0,0,0,0.04)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          <div style={{
            background: `linear-gradient(135deg, ${BRAND.primary}08, ${BRAND.primaryLt}05)`,
            padding: '1rem 1rem 0.85rem 1.1rem', borderBottom: '1px solid #EEF7FB',
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDk})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 3px 10px ${BRAND.primary}40`, flexShrink: 0,
              }}>
                <List size={13} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: BRAND.dark, fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>Tutorial Index</div>
                <div style={{ fontSize: '10px', color: BRAND.muted, marginTop: '2px', fontFamily: '"Inter", sans-serif' }}>{tutorialSections.length} sections · {ALL_STEPS.length} steps</div>
              </div>
            </div>
            <motion.button
              onClick={onToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              <ChevronLeft size={14} color={BRAND.muted} strokeWidth={2.5} />
            </motion.button>
          </div>

          <div style={{ padding: '0.7rem 1.1rem 0.65rem', borderBottom: '1px solid #F0F7FA', flexShrink: 0, background: '#FAFCFE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: BRAND.muted, fontFamily: '"Inter", sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Progress</span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: BRAND.primary, fontFamily: '"Inter", sans-serif', background: `${BRAND.primary}12`, padding: '1px 7px', borderRadius: '999px', border: `1px solid ${BRAND.primary}25` }}>{activeGlobalIdx + 1} / {ALL_STEPS.length}</span>
            </div>
            <div style={{ height: '5px', background: '#EEF2F7', borderRadius: '5px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${((activeGlobalIdx + 1) / ALL_STEPS.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                style={{ height: '100%', background: `linear-gradient(to right, ${BRAND.primary}, ${BRAND.primaryLt})`, borderRadius: '5px', boxShadow: `0 0 6px ${BRAND.primary}50` }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0.5rem 0 1rem' }}>
            <style>{`.sb-sec-btn:hover{background:rgba(6,182,212,0.04)!important}.sb-step-btn:hover{background:rgba(6,182,212,0.05)!important}`}</style>
            {tutorialSections.map((section, secIdx) => {
              const secFirstIdx = ALL_STEPS.findIndex((s: any)=> s.number === section.steps[0].number)
              const isSectionActive = activeGlobalIdx >= secFirstIdx && activeGlobalIdx < secFirstIdx + section.steps.length
              const isExpanded = !!openSections[section.sectionId]
              const completedInSection = section.steps.filter((st: any) => ALL_STEPS.findIndex(x => x.number === st.number) < activeGlobalIdx).length
              const sectionColor = (section as any).sectionColor || BRAND.primary
              return (
                <div key={section.sectionId} style={{ marginBottom: '2px' }}>
                  <button
                    className="sb-sec-btn"
                    onClick={() => toggleSection(section.sectionId)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.5rem 0.9rem 0.5rem 0.8rem',
                      background: isSectionActive ? `${sectionColor}07` : 'transparent',
                      borderLeft: `3px solid ${isSectionActive ? sectionColor : 'transparent'}`,
                      border: 'none', borderLeftStyle: 'solid', cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.18s ease, border-color 0.18s ease',
                    }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                      background: isSectionActive ? `linear-gradient(135deg, ${sectionColor}, ${sectionColor}bb)` : '#EEF2F7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isSectionActive ? `0 2px 6px ${sectionColor}40` : 'none',
                      transition: 'all 0.22s ease',
                    }}>
                      <span style={{ fontSize: '8px', fontWeight: 800, color: isSectionActive ? 'white' : BRAND.muted, fontFamily: '"Inter", sans-serif' }}>{String(secIdx + 1).padStart(2, '0')}</span>
                    </div>
                    <span style={{ flex: 1, fontSize: '10.5px', fontWeight: 700, color: isSectionActive ? sectionColor : '#64748B', fontFamily: '"Inter", sans-serif', lineHeight: 1.25, letterSpacing: '0.01em', transition: 'color 0.18s ease' }}>{section.sectionTitle}</span>
                    {completedInSection > 0 && (
                      <span style={{ fontSize: '8.5px', fontWeight: 700, color: sectionColor, background: `${sectionColor}12`, padding: '1px 5px', borderRadius: '999px', border: `1px solid ${sectionColor}25`, flexShrink: 0, fontFamily: '"Inter", sans-serif' }}>{completedInSection}/{section.steps.length}</span>
                    )}
                    <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.18 }} style={{ display: 'flex', flexShrink: 0 }}>
                      <ChevronRight size={11} color={isSectionActive ? sectionColor : '#94A3B8'} strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="sec-steps"
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ margin: '2px 0.6rem 4px 1.7rem', borderLeft: `1.5px solid ${sectionColor}25` }}>
                          {section.steps.map((step, stepLocalIdx) => {
                            const stepIdx = ALL_STEPS.findIndex((s: any)=> s.number === step.number)
                            const isActive = stepIdx === activeGlobalIdx
                            const isPast = stepIdx < activeGlobalIdx
                            const isLast = stepLocalIdx === section.steps.length - 1
                            return (
                              <motion.button
                                key={step.number}
                                className="sb-step-btn"
                                onClick={() => onJump(stepIdx)}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.55rem',
                                  padding: '0.38rem 0.6rem 0.38rem 0.85rem',
                                  background: isActive ? `linear-gradient(90deg, ${step.iconColor}10, transparent)` : 'transparent',
                                  border: 'none', cursor: 'pointer', textAlign: 'left',
                                  borderRadius: '0 8px 8px 0', position: 'relative',
                                  transition: 'background 0.15s ease', marginBottom: isLast ? 0 : '1px',
                                }}
                              >
                                {isActive && (
                                  <div style={{ position: 'absolute', left: '-1px', top: '18%', bottom: '18%', width: '2.5px', borderRadius: '0 2px 2px 0', background: step.iconColor, boxShadow: `0 0 5px ${step.iconColor}70` }} />
                                )}
                                <div style={{
                                  width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                                  background: isActive ? step.iconColor : isPast ? `${step.iconColor}15` : '#F1F5F9',
                                  border: isActive ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}50` : '1.5px solid #DDE4EE',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  boxShadow: isActive ? `0 2px 8px ${step.iconColor}45` : 'none', transition: 'all 0.2s ease',
                                }}>
                                  {isPast ? (
                                    <CheckCircle size={11} color={step.iconColor} strokeWidth={2.5} />
                                  ) : (
                                    <span style={{ fontSize: '8px', fontWeight: 800, color: isActive ? 'white' : '#94A3B8', fontFamily: '"Inter", sans-serif' }}>{step.number}</span>
                                  )}
                                </div>
                                <span style={{
                                  flex: 1, fontSize: '11.5px',
                                  fontWeight: isActive ? 650 : isPast ? 500 : 450,
                                  color: isActive ? BRAND.dark : isPast ? '#4B5563' : '#94A3B8',
                                  lineHeight: 1.3, fontFamily: '"Inter", sans-serif',
                                  transition: 'color 0.15s ease', whiteSpace: 'nowrap',
                                  overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>{step.title}</span>
                                {isActive && (
                                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: step.iconColor, flexShrink: 0, boxShadow: `0 0 4px ${step.iconColor}80` }} />
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </>
  )
}


/* ─── STEP CARD ─── */
interface StepCardProps { step: Step; isMobile: boolean; isTablet: boolean; globalIdx: number; canPrev: boolean; canNext: boolean; onPrev: () => void; onNext: () => void; setGlobalIdx: (i: number) => void }
const StepCard = ({ step, isMobile, isTablet, globalIdx, canPrev, canNext, onPrev, onNext, setGlobalIdx }: StepCardProps) => {
  const [showZoom, setShowZoom] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const Icon = step.icon

  const isPortrait = [dashboard_export, monthly_summary_report].includes(step.image)
  const isModal    = [add_new_bill, add_voucher, add_user, welcome_screen].includes(step.image)

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          width: '100%',
          borderRadius: isMobile ? '20px' : '28px',
          overflow: 'hidden',
          background: 'white',
          border: `1.5px solid ${step.iconColor}22`,
          boxShadow: `0 16px 64px ${step.iconColor}14, 0 4px 16px rgba(0,0,0,0.06)`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: '5px', background: `linear-gradient(90deg, ${step.iconColor}, ${step.iconColor}60, transparent)`, flexShrink: 0 }} />
        {/* Mobile prev/next */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '10px 14px', borderBottom: `1px solid ${step.iconColor}18`, background: 'rgba(248,250, 252,0.8)', flexShrink: 0}}>
          <motion.button onClick={onPrev} disabled={!canPrev} whileHover={canPrev ? { scale: 1.04}: {}} whileTap={canPrev ? {scale: 0.97}: {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem 0.8rem', background: canPrev ? `linear-gradient(135deg, ${BRAND.mid}, #334155)` : 'rgba(0,0,0,0.04)', color: canPrev ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px',fontSize: '12px', fontWeight: 600, cursor: canPrev ? 'pointer' : 'not-allowed', fontFamily: '"Inter",sans-serif', boxShadow: canPrev ? '0 4px 14px rgba(15,23,42,0.22)' : 'none', flexShrink: 0 }}>
            <ChevronLeft size={15} strokeWidth={2.5} />
            </motion.button> 
            <div style = {{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',overflow: 'hidden' }}>
              {ALL_STEPS.map((_: TutorialStep, i: number) => {
                const distance = Math.abs(i - globalIdx)
                if (distance > 4) return null
                const isActive = i === globalIdx
                const isNear = distance === 1
                return (
                  <motion.button key={i} onClick={() => { setIsUserNavigation(true); setGlobalIdx(i) }} animate={{ width: isActive ? 30 : isNear ? 14 : 7, height: 6, opacity: isActive ? 1 : isNear ? 0.6 : 0.28, backgroundColor: isActive ? step.iconColor : isNear ? `${step.iconColor}90` : '#cbd5e1' }} transition={{ duration: 0.25, ease: 'easeInOut' }} style={{ borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }} />
              )
              })}
             </div>
                <motion.button onClick={onNext} disabled={!canNext} whileHover={canNext ? {scale: 0.97 }: {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem 0.8rem', background: canNext ? `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`: 'rgba(0,0,0,0.04)', color: canNext ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 600, cursor: canNext ? 'pointer': 'not-allowed', fontFamily: '"Inter",sans-serif', boxShadow: canNext ? `0 4px 18px ${step.iconColor}45`:'none', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                  {canNext && (<motion.div animate={{ x: ['-100%', '120%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear'}} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent)', pointerEvents: 'none' }}  />)}
                  <ChevronRight size={15} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1}} />
                  </motion.button>  
            </div>
      )}
        {/* Main body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          flex: 1,
          minHeight: isMobile ? 'auto' : '540px',
        }}>

          {/* LEFT: IMAGE PANEL */}
          <div style={{
            position: 'relative',
            background: `linear-gradient(145deg, ${step.iconColor}0D 0%, ${step.iconColor}05 60%, #f8fafc 100%)`,
            borderRight: isMobile ? 'none' : `1px solid ${step.iconColor}14`,
            borderBottom: isMobile ? `1px solid ${step.iconColor}14` : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '2.5rem 1.5rem 1.5rem' : '2rem 2.5rem',
            overflow: 'hidden',
            minHeight: isMobile ? '240px' : 'auto',
          }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: `radial-gradient(circle, ${step.iconColor}18, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: `radial-gradient(circle, ${step.iconColor}0E, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Step badge */}
            <div style={{
              position: 'absolute', top: '1.1rem', left: '1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '4px 11px 4px 5px',
              background: 'rgba(255,255,255,0.88)',
              border: `1.5px solid ${step.iconColor}35`,
              borderRadius: '999px', zIndex: 2,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '9px', fontWeight: 800, color: 'white',
                fontFamily: '"Inter", sans-serif',
                boxShadow: `0 2px 8px ${step.iconColor}40`, flexShrink: 0,
              }}>
                {step.number}
              </div>
              <span style={{ fontSize: '9.5px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Step {step.number} / {TOTAL_STEPS}
              </span>
            </div>

            {/* Zoom button */}
            <motion.button
              onClick={() => setShowZoom(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: 'absolute', top: '1.1rem', right: '1.1rem',
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 11px 5px 8px',
                background: 'rgba(255,255,255,0.88)',
                border: `1.5px solid ${step.iconColor}30`,
                borderRadius: '999px', cursor: 'pointer', zIndex: 2,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                transition: 'all 0.18s ease',
              }}
            >
              <ZoomIn size={12} color={step.iconColor} strokeWidth={2.5} />
              {!isMobile && (
                <span style={{ fontSize: '9.5px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Zoom</span>
              )}
            </motion.button>

            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <img
                src={step.image}
                alt={step.title}
                onLoad={() => setImgLoaded(true)}
                style={{
                  maxWidth: isPortrait ? (isMobile ? '200px' : '270px') : isModal ? (isMobile ? '260px' : '380px') : '100%',
                  maxHeight: isMobile ? '240px' : isTablet ? '380px' : '460px',
                  width: 'auto', height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  display: 'block', margin: '0 auto',
                  border: `1.5px solid rgba(0,0,0,0.06)`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)`,
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                onClick={() => setShowZoom(true)}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${step.iconColor}28, rgba(0,0,0,0.45))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'zoom-in',
                  backdropFilter: 'blur(3px)',
                  WebkitBackdropFilter: 'blur(3px)',
                }}
              >
                <div style={{
                  background: 'rgba(0,0,0,0.62)',
                  borderRadius: '50%', padding: '14px',
                  border: `2.5px solid ${step.iconColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 24px rgba(0,0,0,0.4)`,
                }}>
                  <ZoomIn size={26} color={step.iconColor} strokeWidth={2} />
                </div>
              </motion.div>
            </div>

            <p style={{ marginTop: '1rem', marginBottom: 0, color: `${step.iconColor}70`, fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', textAlign: 'center' }}>
              {isMobile ? 'Tap image to zoom' : 'Hover & click to zoom'}
            </p>
          </div>

          {/* RIGHT: CONTENT PANEL */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: isMobile ? '1.1rem' : '1.4rem',
            padding: isMobile ? '2rem 1.75rem 1.75rem' : '3rem 3.25rem 2.75rem',
          }}>
            {/* Icon + title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: isMobile ? '44px' : '50px', height: isMobile ? '44px' : '50px',
                borderRadius: '13px',
                background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 20px ${step.iconColor}40`, flexShrink: 0,
              }}>
                <Icon size={isMobile ? 20 : 24} color="white" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingTop: '3px' }}>
                <h3 style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '15px' : isTablet ? '17px' : '19px', fontWeight: 700, color: BRAND.dark, lineHeight: 1.28, margin: 0 }}>
                  {step.title}
                </h3>
                <div style={{ marginTop: '8px', height: '3px', width: '40px', background: `linear-gradient(to right, ${step.iconColor}, transparent)`, borderRadius: '2px' }} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${step.iconColor}25, transparent)`, marginTop: '-0.4rem' }} />

            {/* Description */}
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: isMobile ? '12.5px' : '13.5px',
              color: BRAND.slate, lineHeight: 1.7, margin: 0,
              padding: '1.1rem 1.3rem',
              background: `linear-gradient(135deg, ${step.iconColor}07, ${step.iconColor}03)`,
              borderRadius: '12px',
              border: `1px solid ${step.iconColor}16`,
            }}>
              {step.description}
            </p>

            {/* Key points header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ height: '2px', width: '18px', background: step.iconColor, borderRadius: '2px' }} />
              <span style={{ fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: step.iconColor, fontFamily: '"Inter", sans-serif' }}>Key points</span>
              <div style={{ height: '1.5px', flex: 1, background: `linear-gradient(to right, ${step.iconColor}30, transparent)`, borderRadius: '2px' }} />
            </div>

            {/* Detail bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {step.details.map((detail, i) => {
                const isObj = typeof detail === 'object' && detail !== null
                const detailObj = detail as { message: string; reason: string }

                if (isObj) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      style={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${step.iconColor}18` }}
                    >
                      <div style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                        padding: '0.5rem 0.9rem 0.45rem',
                        background: `linear-gradient(135deg, ${step.iconColor}08, ${step.iconColor}03)`,
                        borderLeft: `3px solid ${step.iconColor}`,
                      }}>
                        <span style={{
                          fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: 'white',
                          background: step.iconColor,
                          padding: '2px 6px', borderRadius: '4px',
                          flexShrink: 0, marginTop: '2px', lineHeight: 1.4,
                          fontFamily: '"Inter", sans-serif',
                        }}>
                          Message
                        </span>
                        <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#111827', lineHeight: 1.55, fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>
                          {detailObj.message}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                        padding: '0.4rem 0.9rem 0.5rem',
                        background: 'rgba(248,250,252,0.9)',
                        borderLeft: `3px solid ${step.iconColor}35`,
                      }}>
                        <span style={{
                          fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: step.iconColor,
                          background: `${step.iconColor}14`,
                          border: `1px solid ${step.iconColor}35`,
                          padding: '2px 6px', borderRadius: '4px',
                          flexShrink: 0, marginTop: '2px', lineHeight: 1.4,
                          fontFamily: '"Inter", sans-serif',
                        }}>
                          Reason
                        </span>
                        <span style={{ fontSize: isMobile ? '10.5px' : '11.5px', color: '#4B5563', lineHeight: 1.55, fontFamily: '"Inter", sans-serif' }}>
                          {detailObj.reason}
                        </span>
                      </div>
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
                      padding: '0.6rem 0.9rem',
                      background: i % 2 === 0 ? `linear-gradient(135deg, ${step.iconColor}08, ${step.iconColor}03)` : 'rgba(248,250,252,0.7)',
                      borderRadius: '10px',
                      borderLeft: `3px solid ${step.iconColor}${i % 2 === 0 ? '' : '55'}`,
                    }}
                  >
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                      background: `${step.iconColor}18`, border: `1.5px solid ${step.iconColor}45`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
                    }}>
                      <CheckCircle size={10} color={step.iconColor} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: isMobile ? '11.5px' : '12.5px', color: '#374151', lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>
                      {detail}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Prev / Next */}
                   {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.25rem', borderTop: `1px solid ${step.iconColor}18`, flexShrink: 0 }}>
                <motion.button onClick={onPrev} disabled={!canPrev} whileHover={canPrev ? { scale: 1.04 } : {}} whileTap={canPrev ? { scale: 0.97 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: isMobile ? '0.5rem 0.8rem' : '0.55rem 1rem', background: canPrev ? `linear-gradient(135deg, ${BRAND.mid}, #334155)` : 'rgba(0,0,0,0.04)', color: canPrev ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 600, cursor: canPrev ? 'pointer' : 'not-allowed', fontFamily: '"Inter", sans-serif', boxShadow: canPrev ? '0 4px 14px rgba(15,23,42,0.22)' : 'none', transition: 'all 0.2s ease', flexShrink: 0 }}>
                  <ChevronLeft size={15} strokeWidth={2.5} />
                  {!isMobile && 'Previous'}
                </motion.button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', overflow: 'hidden' }}>
                {ALL_STEPS.map((_: TutorialStep, i: number) => {
                  const distance = Math.abs(i - globalIdx)
                  if (distance > 4) return null
                  const isActive = i === globalIdx
                  const isNear = distance === 1
                  return (
                    <motion.button key={i} onClick={() => { setIsUserNavigation(true); setGlobalIdx(i) }} animate={{ width: isActive ? 30 : isNear ? 14 : 7, height: 6, opacity: isActive ? 1 : isNear ? 0.6 : 0.28, backgroundColor: isActive ? step.iconColor : isNear ? `${step.iconColor}90` : '#cbd5e1' }} transition={{ duration: 0.25, ease: 'easeInOut' }} style={{ borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }} />
                  )
                })}
              </div>
              <motion.button onClick={onNext} disabled={!canNext} whileHover={canNext ? { scale: 1.04 } : {}} whileTap={canNext ? { scale: 0.97 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: isMobile ? '0.5rem 0.8rem' : '0.55rem 1rem', background: canNext ? `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)` : 'rgba(0,0,0,0.04)', color: canNext ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 600, cursor: canNext ? 'pointer' : 'not-allowed', fontFamily: '"Inter", sans-serif', boxShadow: canNext ? `0 4px 18px ${step.iconColor}45` : 'none', transition: 'all 0.2s ease', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                {canNext && (<motion.div animate={{ x: ['-100%', '120%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)', pointerEvents: 'none' }} />)}
                {!isMobile && <span style={{ position: 'relative', zIndex: 1 }}>Next</span>}
                <ChevronRight size={15} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
              </motion.button>
            </div>
            )}
          </div>
        </div>
      </motion.div>

      <ZoomModal show={showZoom} onClose={() => setShowZoom(false)} step={step} isMobile={isMobile} />
    </>
  )
}
/* ─── PROGRESS BAR ─── */
interface ProgressBarProps { current: number; total: number; color: string }
const ProgressBar = ({ current, total, color }: ProgressBarProps) => (
  <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
    <motion.div
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      style={{ height: '100%', background: `linear-gradient(to right, ${color}, ${color}99)`, borderRadius: '4px', boxShadow: `0 0 8px ${color}60` }}
    />
  </div>
)

/* ─── MAIN PAGE ─── */
export default function TutorialPage() {
  const [isMobile,    setIsMobile]    = useState(false)
  const [isTablet,    setIsTablet]    = useState(false)
  const [globalIdx,   setGlobalIdx]   = useState(0)
  const [viewMode,    setViewMode]    = useState<'step' | 'overview'>('step')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const footerRef  = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef<boolean>(true)
  const [footerOffset, setFooterOffset] = useState(0)
  const [isUserNavigation, setIsUserNavigation] = useState(false)
  const currentStep    = ALL_STEPS[globalIdx]
  const currentSection = tutorialSections.find(s => s.steps.some(st => st.number === currentStep.number))
  const canPrev = globalIdx > 0
  const canNext = globalIdx < TOTAL_STEPS - 1
  const prev = useCallback(() => { if (canPrev) setGlobalIdx(i => i - 1) }, [canPrev])
  const next = useCallback(() => { if (canNext) setGlobalIdx(i => i + 1) }, [canNext])
  
  const handleStepClick = (idx: number) => {
    setGlobalIdx(idx)
    setIsUserNavigation(true)

    if(viewMode === 'overview') {
      setTimeout(() => {
        const card = document.getElementById(`overview-step-${idx}`)
        card?.scrollIntoView({behavior: 'smooth', block: 'center'})
      }, 50)
    }
  }
  
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
  const updateOffset = () => {
    const siteFooter = document.querySelector('footer') as HTMLElement | null;
    if (!siteFooter) return;
    const footerRect = siteFooter.getBoundingClientRect();
    setFooterOffset(Math.max(0, window.innerHeight - footerRect.top));
  };
  updateOffset();
  window.addEventListener('scroll', updateOffset, { passive: true });
  window.addEventListener('resize', updateOffset);
  return () => {
    window.removeEventListener('scroll', updateOffset);
    window.removeEventListener('resize', updateOffset);
  };
}, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [next, prev])

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    link.rel  = 'stylesheet'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.innerHTML = `*{box-sizing:border-box}html,body{overflow-x:hidden;width:100%;margin:0;padding:0}body{overflow-y:auto}`
    document.head.appendChild(style)

    // ── HIDE SITE NAVBAR WHILE TUTORIAL PAGE IS MOUNTED ──
    const navStyle = document.createElement('style')
    navStyle.id = 'tutorial-hide-navbar'
    navStyle.innerHTML = `nav, header { display: none !important; }`
    document.head.appendChild(navStyle)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
      const ns = document.getElementById('tutorial-hide-navbar')
      if (ns) document.head.removeChild(ns)
    }
  }, [])

  useEffect(() => {
    const fn = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024) }
    fn(); window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    setSidebarOpen(!isMobile && !isTablet)
  },[isMobile,isTablet])

  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!isUserNavigation) return
    if (!contentRef.current) return
    
    const stickyNav = document.querySelector('[data-sticky-nav]') as HTMLElement | null
    const navHeight = stickyNav ? stickyNav.getBoundingClientRect().height : 72
    const elementTop = contentRef.current.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementTop - navHeight - 20,
      behavior: 'smooth'
    })
    setIsUserNavigation(false)
  }, [globalIdx])

  return (
    <div style={{ minHeight: '100vh', fontFamily: '"Inter", sans-serif', background: 'linear-gradient(180deg, #ecfeff 0%, #f8fafc 30%, #ffffff 100%)', position: 'relative', width: '100%', overflowX: 'hidden' }}>

      <IndexSidebar
        activeGlobalIdx={globalIdx}
        onJump={handleStepClick}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
        isMobile={isMobile}
        footerOffset={footerOffset}
      />

      <motion.div
        animate={{ marginLeft: (!isMobile && sidebarOpen) ? 272 : 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
      >

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? '2rem 1rem' : isTablet ? '2.5rem 1.5rem' : '3rem 1.5rem', minHeight: isMobile ? 'auto' : '500px', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <div style={{ display: isMobile ? 'flex' : 'grid', flexDirection: isMobile ? 'column' : undefined, gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem', alignItems: isMobile ? 'start' : 'center' }}>

              {/* Logo (mobile top) */}
              {isMobile && (
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }} style={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
                  <img src={logoImage} alt="Tally Logo" style={{ width: '6rem', height: 'auto', objectFit: 'contain' }} />
                </motion.div>
              )}

              {isMobile && (
                <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
                  <TutorialVideo />
                </motion.div>
              )}

              <div style={{ maxWidth: isMobile ? '100%' : '650px', marginTop: isMobile ? '0' : '-2.5rem' }}>
                {/* Logo (desktop) */}
                {!isMobile && (
                  <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                    <img src={logoImage} alt="Tally Logo" style={{ width: isTablet ? '6rem' : '8rem', height: 'auto', objectFit: 'contain' }} />
                  </motion.div>
                )}

                <motion.h1
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px', fontWeight: 700, marginTop: '1rem', marginBottom: '1rem', lineHeight: isMobile ? '38px' : isTablet ? '46px' : '58px', letterSpacing: '-0.025em' }}
                >
                  <span style={{ color: BRAND.primary, fontWeight: 900 }}>Explore Tally Connect</span>{' '}
                  <span style={{ color: BRAND.dark }}>with Detailed Step-by-Step Tutorials</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '14px' : '16px', fontWeight: 400, color: BRAND.slate, marginTop: '-0.75rem', marginBottom: '1.5rem', lineHeight: isMobile ? '22px' : '26px' }}
                >
                Learn how to manage your finances, sync data from Tally Prime, and leverage powerful reporting tools with comprehensive step-by-step tutorials.
                </motion.p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {['Quick start guides for instant setup', 'Advanced analytics walkthroughs', 'How it works steps for smooth onboarding'].map((feature, idx) => (
                    <motion.div key={feature} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: isMobile ? '1.75rem' : '2.25rem', height: isMobile ? '1.75rem' : '2.25rem', borderRadius: '0.5rem', background: `${BRAND.primary}18`, border: `2px solid ${BRAND.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle style={{ width: isMobile ? '1rem' : '1.25rem', height: isMobile ? '1rem' : '1.25rem', color: BRAND.primary }} />
                      </div>
                      <span style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '14px' : '16px', fontWeight: 500, color: BRAND.slate, lineHeight: isMobile ? '22px' : '26px' }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4rem' }} animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <TutorialVideo />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION HEADER ── */}
        <section style={{ padding: isMobile ? '2.5rem 1rem 1.5rem' : '3rem 1.5rem 2rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '28px' : isTablet ? '34px' : '40px', fontWeight: 700, color: 'rgb(20,47,83)', marginBottom: '0.75rem', lineHeight: isMobile ? '36px' : isTablet ? '42px' : '48px' }}>
              Complete Step-by-Step Guide
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '15px' : '17px', color: BRAND.slate, margin: '0 auto', lineHeight: isMobile ? '23px' : '26px', fontWeight: 400 }}>
              Master Tally Connect with our comprehensive guide covering every feature from sign-up to advanced functionality
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: isMobile ? '0.65rem 1rem' : '0.75rem 1.25rem', margin: '1.25rem auto 0', maxWidth: 'fit-content', background: `linear-gradient(135deg, ${BRAND.primary}10, rgba(59,130,246,0.10))`, border: `1.5px solid ${BRAND.primary}30`, borderRadius: '999px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: `0 4px 12px ${BRAND.primary}12, inset 0 1px 0 rgba(255,255,255,0.6)` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '2rem' : '2.25rem', height: isMobile ? '2rem' : '2.25rem', borderRadius: '8px', background: `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)`, border: `1.5px solid ${BRAND.primary}40`, boxShadow: `0 2px 8px ${BRAND.primary}20, inset 0 -2px 0 ${BRAND.primary}30`, flexShrink: 0 }}>
                <ArrowLeft size={isMobile ? 14 : 16} color={BRAND.primaryDk} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '0.875rem' : isTablet ? '0.9375rem' : '1rem', color: BRAND.primaryDk, fontWeight: 600, letterSpacing: '-0.01em' }}>
                {isMobile ? 'Use buttons to navigate steps' : 'Use arrow keys to navigate between steps'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '2rem' : '2.25rem', height: isMobile ? '2rem' : '2.25rem', borderRadius: '8px', background: `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)`, border: `1.5px solid ${BRAND.primary}40`, boxShadow: `0 2px 8px ${BRAND.primary}20, inset 0 -2px 0 ${BRAND.primary}30`, flexShrink: 0 }}>
                <ArrowRight size={isMobile ? 14 : 16} color={BRAND.primaryDk} strokeWidth={2.5} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STICKY NAV ── */}
        <div data-sticky-nav style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(248,250,252,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0.75rem 1rem' : '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
              <motion.button
                onClick={() => setSidebarOpen(o => !o)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '5px 12px 5px 7px', background: sidebarOpen ? `linear-gradient(135deg, ${BRAND.primary}18, rgba(56,189,248,0.12))` : 'linear-gradient(135deg, rgba(15,23,42,0.06), rgba(15,23,42,0.03))', border: `1.5px solid ${sidebarOpen ? BRAND.primary + '45' : 'rgba(0,0,0,0.1)'}`, borderRadius: '999px', backdropFilter: 'blur(10px)', cursor: 'pointer', flexShrink: 0, transition: 'all 0.22s ease' }}
              >
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', flexShrink: 0, background: sidebarOpen ? `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)` : 'linear-gradient(135deg, rgba(15,23,42,0.1), rgba(15,23,42,0.06))', border: `1.5px solid ${sidebarOpen ? BRAND.primary + '40' : 'rgba(0,0,0,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1px' }}>
  {sidebarOpen ? (
    <>
      <ChevronLeft size={11} color={BRAND.primaryDk} strokeWidth={2.5} />
      <div style={{ width: '1.5px', height: '10px', borderRadius: '2px', background: BRAND.primaryDk }} />
    </>
  ) : (
    <>
      <div style={{ width: '1.5px', height: '10px', borderRadius: '2px', background: BRAND.slate }} />
      <ChevronRight size={11} color={BRAND.slate} strokeWidth={2.5} />
    </>
  )}
</div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: sidebarOpen ? BRAND.primaryDk : BRAND.slate, fontFamily: '"Inter", sans-serif', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>
                  {sidebarOpen ? 'Hide index' : 'Tutorial Index'}
                </span>
              </motion.button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentStep?.iconColor, boxShadow: `0 0 8px ${currentStep?.iconColor}60` }} />
              {!isMobile && (
                <span style={{ fontSize: '12px', fontWeight: 600, color: BRAND.slate, whiteSpace: 'nowrap', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentSection?.sectionTitle}
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <ProgressBar current={globalIdx} total={TOTAL_STEPS} color={currentStep?.iconColor || BRAND.primary} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: BRAND.slate, whiteSpace: 'nowrap', flexShrink: 0, fontFamily: '"Inter", sans-serif' }}>
              {globalIdx + 1} / {TOTAL_STEPS}
            </span>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {[{ id: 'step', Icon: List, label: 'Step view' }, { id: 'overview', Icon: Grid3X3, label: 'Overview' }].map(({ id, Icon: Ic, label }) => {
                  const active = viewMode === id
                  return (
                    <motion.button key={id} onClick={() => setViewMode(id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '5px 11px 5px 7px', background: active ? `linear-gradient(135deg, ${BRAND.primary}18, rgba(56,189,248,0.12))` : 'linear-gradient(135deg, rgba(15,23,42,0.05), rgba(15,23,42,0.02))', border: `1.5px solid ${active ? BRAND.primary + '45' : 'rgba(0,0,0,0.09)'}`, borderRadius: '999px', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    >
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0, background: active ? `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)` : 'linear-gradient(135deg, rgba(15,23,42,0.09), rgba(15,23,42,0.05))', border: `1.5px solid ${active ? BRAND.primary + '40' : 'rgba(0,0,0,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic size={12} color={active ? BRAND.primaryDk : BRAND.slate} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: active ? BRAND.primaryDk : BRAND.slate, fontFamily: '"Inter", sans-serif', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>{label}</span>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── STEP VIEW ── */}
        {viewMode === 'step' && (
          <section style={{ padding: isMobile ? '1.5rem 1rem 2.5rem' : isTablet ? '2.5rem 2rem 3.5rem' : '3rem 3.5rem 4.5rem', minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '1rem' : '1.5rem', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            <div ref={contentRef} style={{ scrollMarginTop: '90px', width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`section-${currentSection?.sectionId}`}
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  style={{ textAlign: 'center', width: '100%', maxWidth: '700px' }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '4px 14px', borderRadius: '999px', marginBottom: '0.6rem', background: `${currentSection?.sectionColor}14`, border: `1.5px solid ${currentSection?.sectionColor}35` }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentSection?.sectionColor, boxShadow: `0 0 6px ${currentSection?.sectionColor}80` }} />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: currentSection?.sectionColor, fontFamily: '"Inter", sans-serif' }}>
                      {currentSection?.sectionTag} — {currentSection?.sectionTitle}
                    </span>
                  </div>
                  <p style={{ fontSize: isMobile ? '13px' : '14px', color: BRAND.muted, margin: 0, lineHeight: 1.65, fontFamily: '"Inter", sans-serif' }}>
                    {currentSection?.sectionDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ width: '100%', maxWidth: '1160px' }}>
              <AnimatePresence mode="wait">
                <StepCard
                  key={globalIdx}
                  step={currentStep}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  globalIdx={globalIdx}
                  canPrev={canPrev}
                  canNext={canNext}
                  onPrev={prev}
                  onNext={next}
                  setGlobalIdx={handleStepClick}
                />
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* ── OVERVIEW GRID ── */}
        {viewMode === 'overview' && (
          <section style={{
            padding: isMobile ? '1.5rem 1rem 3rem' : '2.5rem 3rem 4rem',
            maxWidth: '1280px', margin: '0 auto',
            background: 'linear-gradient(180deg, #f0f9ff 0%, #f8fafc 40%, #ffffff 100%)'
          }}>
            {tutorialSections.map((section, secIdx) => (
              <motion.div
                key={section.sectionId}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ marginBottom: isMobile ? '3.5rem' : '5rem' }}
              >
                {/* ── SECTION HEADER ── */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  marginBottom: '2rem',
                  paddingBottom: '1.25rem',
                  borderBottom: `2px solid rgba(0,0,0,0.07)`,
                }}>
                  <div style={{
                    width: '5px', height: '44px', borderRadius: '4px', flexShrink: 0,
                    background: `linear-gradient(180deg, ${section.sectionColor}, ${section.sectionColor}55)`,
                    boxShadow: `0 2px 8px ${section.sectionColor}40`,
                  }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <h3 style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: 700, color: BRAND.dark, margin: 0, lineHeight: 1.2,
                      }}>{section.sectionTitle}</h3>
                      <span style={{
                        fontSize: '11px', color: BRAND.muted,
                        fontFamily: '"Inter", sans-serif', flexShrink: 0,
                        background: 'rgba(0,0,0,0.04)', padding: '2px 9px',
                        borderRadius: '999px', border: '1px solid rgba(0,0,0,0.08)',
                      }}>
                        {section.steps.length} {section.steps.length === 1 ? 'step' : 'steps'}
                      </span>
                    </div>
                    {!isMobile && (
                      <p style={{
                        fontSize: '12.5px', color: BRAND.muted, margin: '5px 0 0',
                        fontFamily: '"Inter", sans-serif', lineHeight: 1.5,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        maxWidth: '580px', whiteSpace: 'nowrap',
                      }}>
                        {section.sectionDescription}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '7px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.09em',
                      textTransform: 'uppercase', color: BRAND.slate,
                      background: 'rgba(0,0,0,0.05)',
                      border: '1.5px solid rgba(0,0,0,0.09)',
                      padding: '4px 11px', borderRadius: '999px',
                      fontFamily: '"Inter", sans-serif',
                    }}>{section.sectionTag}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', color: BRAND.muted, fontFamily: '"Inter", sans-serif' }}>
                        {section.steps.filter(st => ALL_STEPS.findIndex(s => s.number === st.number) < globalIdx).length}/{section.steps.length} done
                      </span>
                      <div style={{ width: '80px', height: '5px', background: 'rgba(0,0,0,0.07)', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '5px',
                          background: `linear-gradient(to right, ${section.sectionColor}, ${section.sectionColor}aa)`,
                          width: `${(section.steps.filter(st => ALL_STEPS.findIndex(s => s.number === st.number) < globalIdx).length / section.steps.length) * 100}%`,
                          transition: 'width 0.4s ease',
                        }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: isMobile ? '1.25rem' : '1.5rem',
                }}>
                  {section.steps.map((step, stepLocalIdx) => {
                    const stepGlobalIdx = ALL_STEPS.findIndex(s => s.number === step.number)
                    const Icon = step.icon
                    const isPast    = stepGlobalIdx < globalIdx
                    const isCurrent = stepGlobalIdx === globalIdx

                    return (
                      <motion.button
                        key={step.number}
                        id={`overview-step-${stepGlobalIdx}`}
                        onClick={() => { handleStepClick(stepGlobalIdx) }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: stepLocalIdx * 0.04, ease: 'easeOut' }}
                        whileHover={{ y: -6, boxShadow: `0 20px 48px ${step.iconColor}28, 0 4px 12px rgba(0,0,0,0.08)`, transition: { duration: 0.18 } }}
                        whileTap={{ scale: 0.985, transition: { duration: 0.1 } }}
                        style={{
                          display: 'flex', flexDirection: 'column',
                          borderRadius: '20px', textAlign: 'left',
                          background: isPast ? `linear-gradient(160deg, ${step.iconColor}06, #f8fafc)` : 'white',
                          borderTop: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`,
                          borderRight: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`,
                          borderBottom: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`,
                          borderLeft: `6px solid ${step.iconColor}`,
                          cursor: 'pointer',
                          boxShadow: isCurrent
                            ? `0 8px 32px ${step.iconColor}25, 0 0 0 4px ${step.iconColor}10`
                            : '0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                          minHeight: isMobile ? 'auto' : '240px',
                        }}
                      >
                        <div style={{ padding: isMobile ? '1.5rem 1.5rem 1.5rem 1.25rem' : '1.75rem 1.75rem 1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{
                              width: '32px', height: '32px', borderRadius: '50%',
                              background: isPast ? '#10B981' : isCurrent ? step.iconColor : `${step.iconColor}15`,
                              border: isPast || isCurrent ? 'none' : `2px solid ${step.iconColor}50`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: isCurrent ? `0 3px 10px ${step.iconColor}50` : 'none',
                              transition: 'all 0.2s ease', flexShrink: 0,
                            }}>
                              {isPast
                                ? <CheckCircle size={15} color="white" strokeWidth={2.5} />
                                : <span style={{ fontSize: '11px', fontWeight: 800, color: isCurrent ? 'white' : step.iconColor, fontFamily: '"Inter", sans-serif' }}>{step.number}</span>
                              }
                            </div>
                            {isCurrent && (
                              <div style={{
                                display: 'flex', alignItems: 'center', gap: '5px',
                                padding: '4px 10px', borderRadius: '999px',
                                background: `${step.iconColor}12`,
                                border: `1.5px solid ${step.iconColor}40`,
                              }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: step.iconColor, boxShadow: `0 0 5px ${step.iconColor}90` }} />
                                <span style={{ fontSize: '10px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif' }}>Current</span>
                              </div>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{
                              width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                              boxShadow: isPast ? 'none' : `0 4px 14px ${step.iconColor}35`,
                              background: isPast ? `${step.iconColor}15` : `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'background 0.2s ease',
                            }}>
                              <Icon size={19} color={isPast ? step.iconColor : 'white'} strokeWidth={2.5} />
                            </div>
                            <span style={{
                              fontSize: isMobile ? '14px' : '15px',
                              fontWeight: 700, color: isPast ? BRAND.slate : BRAND.dark,
                              fontFamily: '"Poppins", sans-serif',
                              lineHeight: 1.3, paddingTop: '3px',
                            }}>{step.title}</span>
                          </div>

                          <p style={{
                            fontSize: isMobile ? '12px' : '13px', color: BRAND.slate, lineHeight: 1.65,
                            fontFamily: '"Inter", sans-serif', margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical' as const,
                            overflow: 'hidden',
                          }}>
                            {step.description}
                          </p>

                          <div style={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '0.65rem',
                            borderTop: `1px solid rgba(0,0,0,0.06)`,
                            marginTop: 'auto',
                          }}>
                            <span style={{ fontSize: '11.5px', color: BRAND.muted, fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>
                              {step.details.length} key {step.details.length === 1 ? 'point' : 'points'}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: step.iconColor }}>
                              <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: '"Inter", sans-serif' }}>
                                {isPast ? 'Review' : 'Open'}
                              </span>
                              <ArrowRight size={12} strokeWidth={2.5} />
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </section>
        )}
      </motion.div>

      {/* ── CTA ── */}
      <div style={{ padding: isMobile ? '2.5rem 1.25rem 3rem' : '1rem 1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 40%, #eef2ff 100%)', borderTop: '1px solid rgba(99,179,237,0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-40px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(99,179,237,0.35)', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: '#0369a1', marginBottom: '1.25rem', letterSpacing: '0.03em', boxShadow: '0 2px 8px rgba(99,179,237,0.15)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 2px rgba(34,197,94,0.3)' }} />
          All systems ready
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '24px' : '34px', fontWeight: 700, color: BRAND.dark, marginBottom: '0.65rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Ready to get started?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontSize: '15px', color: BRAND.slate, maxWidth: '380px', margin: '0 auto 1.75rem', lineHeight: 1.65 }}>
          You've covered the essentials. Head to the Dashboard to put Tally Connect to work.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <motion.button
            onClick={() => window.location.href = 'https://tally-connect-yu2q.onrender.com'}
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 16px 40px rgba(15,23,42,0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: isMobile ? '1rem 2rem' : '1.05rem 2.4rem', background: `linear-gradient(135deg, ${BRAND.dark} 0%, #1e3a5f 50%, ${BRAND.mid} 100%)`, color: 'white', borderRadius: '14px', border: 'none', fontSize: isMobile ? '15px' : '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 28px rgba(15,23,42,0.28), 0 0 0 1px rgba(255,255,255,0.08) inset', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden', letterSpacing: '-0.01em' }}
          >
            <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)', pointerEvents: 'none' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>Go to Dashboard</span>
            <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative', zIndex: 1, display: 'flex' }}>
              <ArrowRight size={18} strokeWidth={2.5} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* ── FLOATING SCROLL BUTTONS ── */}
      {!isMobile && (
        <div style={{ position: 'fixed', right: '1.5rem', bottom: '2rem', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 400 }}>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.93 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            title="Back to top"
            style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDk})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px ${BRAND.primary}55, 0 2px 6px rgba(0,0,0,0.12)` }}
          >
            <ArrowUp size={20} color="white" strokeWidth={2.5} />
          </motion.button>
          <motion.button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            whileHover={{ scale: 1.12, y: 2 }} whileTap={{ scale: 0.93 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            title="Go to Dashboard"
            style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, #0e7490, ${BRAND.primaryDk})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px rgba(8,145,178,0.5), 0 2px 6px rgba(0,0,0,0.12)` }}
          >
            <ArrowDown size={20} color="white" strokeWidth={2.5} />
          </motion.button>
        </div>
      )}

      {/*<div ref={footerRef}>
        <Footer />
      </div>*/}
    </div>
  )
}