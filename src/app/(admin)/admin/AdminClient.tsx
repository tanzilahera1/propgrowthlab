"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Table,
  Tag,
  Button,
  Badge,
  Space,
  Select,
  Input,
  Modal,
  Drawer,
  Breadcrumb,
  Progress,
  Avatar,
  Tooltip,
  Switch,
  Form,
  Timeline,
  Dropdown,
  App,
} from "antd";
import type { TableColumnsType, MenuProps } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  KeyOutlined,
  GlobalOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  MenuOutlined,
  CheckCircleOutlined,
  CopyOutlined,
  RiseOutlined,
  DollarOutlined,
  ThunderboltOutlined,
  BellOutlined,
  ApartmentOutlined,
  ArrowRightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownloadOutlined,
  ExperimentOutlined,
  NotificationOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

// ================= DATA MODELS (CRUD & AUDIT READY) =================
export interface LeadItem {
  id: string;
  fullName: string;
  whatsapp: string;
  territory: string;
  propertyType: string;
  budget: string;
  moveIn: string;
  status: "new" | "dispatched" | "closed";
  assignedBroker?: string;
  date: string;
}

export interface SubscriptionItem {
  id: string;
  brokerName: string;
  whatsapp: string;
  territory: string;
  tier: "Silver" | "Gold" | "Platinum";
  quotaDaily: number;
  deliveredToday: number;
  monthlyQuota: number;
  status: "Active" | "Paused";
  nextBilling: string;
}

export interface TemplateSaleItem {
  id: string;
  orderId: string;
  clientName: string;
  email: string;
  templateName: string;
  tier: "Source Code ($19)" | "Turnkey 48h ($199)";
  amount: string;
  licenseKey: string;
  githubInvite: "Active" | "Pending" | "Granted";
  status: "Active" | "Revoked";
  date: string;
}

export interface AgencyPropertyItem {
  id: string;
  propertyId: string;
  name: string;
  ownerName: string;
  territory: string;
  engineDomain: string;
  directGmv: string;
  otaSavings: string;
  directShare: string;
  stripeStatus: "Connected" | "Verified";
  icalStatus: "Healthy (<5m)" | "Synced";
  status: "Active Engine" | "Scaling";
}

export interface EscrowDealItem {
  id: string;
  dealRef: string;
  propertyTitle: string;
  buyerName: string;
  brokerFirm: string;
  territory: string;
  dealValue: string;
  escrowSplit: string;
  status: "Under Contract" | "In Escrow" | "Settled";
  updatedAt: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "Platform Owner" | "Head of Brokerage" | "Lead Dispatcher" | "Finance Auditor";
  territories: string[];
  status: "Active" | "Suspended";
  lastLogin: string;
}

export interface AuditLogItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  tag: string;
  color: string;
}

// Initial Mock Datasets
const INITIAL_LEADS: LeadItem[] = [
  {
    id: "lead-101",
    fullName: "Arthur Pendelton",
    whatsapp: "+44 7911 123456",
    territory: "UK",
    propertyType: "Mayfair Penthouse",
    budget: "£4.5M",
    moveIn: "Q2 2026",
    status: "new",
    date: "10 mins ago",
  },
  {
    id: "lead-102",
    fullName: "Marcus Vance",
    whatsapp: "+1 305 555 0192",
    territory: "USA",
    propertyType: "Miami Waterfront Villa",
    budget: "$3.8M",
    moveIn: "Immediate",
    status: "dispatched",
    assignedBroker: "Harrison Gray & Partners",
    date: "28 mins ago",
  },
  {
    id: "lead-103",
    fullName: "Elena Rostova",
    whatsapp: "+33 6 12 34 56 78",
    territory: "EU",
    propertyType: "French Alps Luxury Chalet",
    budget: "€2.75M",
    moveIn: "Winter 2026",
    status: "new",
    date: "1 hour ago",
  },
  {
    id: "lead-104",
    fullName: "Tariq Al-Mansoor",
    whatsapp: "+971 50 123 4567",
    territory: "UAE",
    propertyType: "Palm Jumeirah Signature Villa",
    budget: "AED 18M",
    moveIn: "Q3 2026",
    status: "dispatched",
    assignedBroker: "Emirates Prime Realty",
    date: "2 hours ago",
  },
  {
    id: "lead-105",
    fullName: "Chloe Zhang",
    whatsapp: "+61 411 234 567",
    territory: "Australia",
    propertyType: "Sydney Harbour Residence",
    budget: "A$5.2M",
    moveIn: "Flexible",
    status: "closed",
    assignedBroker: "Harbour Estates Sydney",
    date: "5 hours ago",
  },
  {
    id: "lead-106",
    fullName: "Liam O'Connor",
    whatsapp: "+1 416 555 0188",
    territory: "Canada",
    propertyType: "Toronto Yorkville Suite",
    budget: "C$2.1M",
    moveIn: "30 Days",
    status: "new",
    date: "7 hours ago",
  },
];

const INITIAL_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    id: "sub-1",
    brokerName: "Harrison Gray & Partners",
    whatsapp: "+1 305 555 0192",
    territory: "USA",
    tier: "Platinum",
    quotaDaily: 10,
    deliveredToday: 7,
    monthlyQuota: 300,
    status: "Active",
    nextBilling: "Nov 01, 2026",
  },
  {
    id: "sub-2",
    brokerName: "London & Prime Estates",
    whatsapp: "+44 7911 123456",
    territory: "UK",
    tier: "Gold",
    quotaDaily: 6,
    deliveredToday: 4,
    monthlyQuota: 180,
    status: "Active",
    nextBilling: "Nov 05, 2026",
  },
  {
    id: "sub-3",
    brokerName: "Alpine Luxe Properties",
    whatsapp: "+33 6 12 34 56 78",
    territory: "EU",
    tier: "Gold",
    quotaDaily: 5,
    deliveredToday: 3,
    monthlyQuota: 150,
    status: "Active",
    nextBilling: "Nov 12, 2026",
  },
  {
    id: "sub-4",
    brokerName: "Emirates Prime Realty",
    whatsapp: "+971 50 123 4567",
    territory: "UAE",
    tier: "Platinum",
    quotaDaily: 12,
    deliveredToday: 8,
    monthlyQuota: 360,
    status: "Active",
    nextBilling: "Nov 18, 2026",
  },
  {
    id: "sub-5",
    brokerName: "Harbour Estates Sydney",
    whatsapp: "+61 411 234 567",
    territory: "Australia",
    tier: "Silver",
    quotaDaily: 3,
    deliveredToday: 2,
    monthlyQuota: 90,
    status: "Active",
    nextBilling: "Nov 22, 2026",
  },
  {
    id: "sub-6",
    brokerName: "Maple Ridge Commercial",
    whatsapp: "+1 416 555 0188",
    territory: "Canada",
    tier: "Silver",
    quotaDaily: 3,
    deliveredToday: 1,
    monthlyQuota: 90,
    status: "Paused",
    nextBilling: "Nov 25, 2026",
  },
];

const INITIAL_TEMPLATES: TemplateSaleItem[] = [
  {
    id: "tmpl-1",
    orderId: "ORD-9412",
    clientName: "Soren Kierkegaard",
    email: "soren@nordicstays.dk",
    templateName: "Direct Stay Turbo Engine",
    tier: "Turnkey 48h ($199)",
    amount: "$199",
    licenseKey: "PGL-TURBO-9412-DK-PRO",
    githubInvite: "Granted",
    status: "Active",
    date: "Oct 28, 2026",
  },
  {
    id: "tmpl-2",
    orderId: "ORD-9410",
    clientName: "Aiko Tanaka",
    email: "aiko@tokyovillas.jp",
    templateName: "Luxury Broker Landing Kit",
    tier: "Source Code ($19)",
    amount: "$19",
    licenseKey: "PGL-LBL-9410-JP-STD",
    githubInvite: "Active",
    status: "Active",
    date: "Oct 27, 2026",
  },
  {
    id: "tmpl-3",
    orderId: "ORD-9398",
    clientName: "David Miller",
    email: "david@alpineescapes.ch",
    templateName: "Direct Stay Turbo Engine",
    tier: "Turnkey 48h ($199)",
    amount: "$199",
    licenseKey: "PGL-TURBO-9398-CH-PRO",
    githubInvite: "Granted",
    status: "Active",
    date: "Oct 26, 2026",
  },
  {
    id: "tmpl-4",
    orderId: "ORD-9382",
    clientName: "Mateo Alvarez",
    email: "mateo@costa-stays.es",
    templateName: "Luxury Broker Landing Kit",
    tier: "Source Code ($19)",
    amount: "$19",
    licenseKey: "PGL-LBL-9382-ES-REV",
    githubInvite: "Pending",
    status: "Revoked",
    date: "Oct 24, 2026",
  },
];

const INITIAL_AGENCY_PROPERTIES: AgencyPropertyItem[] = [
  {
    id: "agency-1",
    propertyId: "PGL-PROP-01",
    name: "Serena Bali Villas",
    ownerName: "Ketut Aris / Serena Group",
    territory: "Bali / SE Asia",
    engineDomain: "stay.serenabali.com",
    directGmv: "$340,000",
    otaSavings: "$61,200",
    directShare: "84%",
    stripeStatus: "Verified",
    icalStatus: "Healthy (<5m)",
    status: "Active Engine",
  },
  {
    id: "agency-2",
    propertyId: "PGL-PROP-02",
    name: "Horizon Chalet Alps",
    ownerName: "Christian Sommer",
    territory: "Swiss Alps",
    engineDomain: "chalethorizon.com",
    directGmv: "$180,000",
    otaSavings: "$32,400",
    directShare: "79%",
    stripeStatus: "Verified",
    icalStatus: "Healthy (<5m)",
    status: "Active Engine",
  },
  {
    id: "agency-3",
    propertyId: "PGL-PROP-03",
    name: "Villa Marbella Resort",
    ownerName: "Sofia Benitez",
    territory: "Costa del Sol, Spain",
    engineDomain: "marbellavillaluxe.es",
    directGmv: "$210,000",
    otaSavings: "$37,800",
    directShare: "76%",
    stripeStatus: "Connected",
    icalStatus: "Synced",
    status: "Scaling",
  },
];

const INITIAL_ESCROW_DEALS: EscrowDealItem[] = [
  {
    id: "deal-1",
    dealRef: "ESC-8921",
    propertyTitle: "Biscayne Bay Ultra Villa",
    buyerName: "Family Office Alpha",
    brokerFirm: "Harrison Gray & Partners",
    territory: "USA (Miami)",
    dealValue: "$4,250,000",
    escrowSplit: "70% Owner ($2.97M) / 30% Lab ($1.27M)",
    status: "In Escrow",
    updatedAt: "Today, 11:20 AM",
  },
  {
    id: "deal-2",
    dealRef: "ESC-8904",
    propertyTitle: "Kensington Gate Manor",
    buyerName: "Venture Partners UK",
    brokerFirm: "London & Prime Estates",
    territory: "UK (London)",
    dealValue: "£3,800,000",
    escrowSplit: "70% Owner (£2.66M) / 30% Lab (£1.14M)",
    status: "Under Contract",
    updatedAt: "Yesterday",
  },
  {
    id: "deal-3",
    dealRef: "ESC-8877",
    propertyTitle: "St. Moritz Ski Chalet",
    buyerName: "Geneva Capital Ltd",
    brokerFirm: "Alpine Luxe Properties",
    territory: "EU (Switzerland)",
    dealValue: "€3,100,000",
    escrowSplit: "70% Owner (€2.17M) / 30% Lab (€930K)",
    status: "Settled",
    updatedAt: "3 days ago",
  },
  {
    id: "deal-4",
    dealRef: "ESC-8850",
    propertyTitle: "Palm Hills Mansion",
    buyerName: "Sheikh Al-Nayhan Holding",
    brokerFirm: "Emirates Prime Realty",
    territory: "UAE (Dubai)",
    dealValue: "AED 16,500,000",
    escrowSplit: "70% Owner (11.55M) / 30% Lab (4.95M)",
    status: "In Escrow",
    updatedAt: "5 days ago",
  },
];

const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: "usr-1",
    name: "Alexander Cole",
    email: "alexander@propgrowthlab.com",
    role: "Platform Owner",
    territories: ["Global (All Territories)"],
    status: "Active",
    lastLogin: "Active Now",
  },
  {
    id: "usr-2",
    name: "Sarah Jenkins",
    email: "sarah.j@propgrowthlab.com",
    role: "Head of Brokerage",
    territories: ["USA", "Canada"],
    status: "Active",
    lastLogin: "18 mins ago",
  },
  {
    id: "usr-3",
    name: "Oliver Wright",
    email: "oliver.w@propgrowthlab.com",
    role: "Lead Dispatcher",
    territories: ["UK", "EU"],
    status: "Active",
    lastLogin: "1 hour ago",
  },
  {
    id: "usr-4",
    name: "Fatima Al-Sayed",
    email: "fatima@propgrowthlab.com",
    role: "Finance Auditor",
    territories: ["UAE", "Australia"],
    status: "Active",
    lastLogin: "Yesterday",
  },
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "log-1",
    title: "Lead Dispatched to Miami Partner",
    detail: "Marcus Vance ($3.8M) routed to Harrison Gray & Partners via WhatsApp router.",
    time: "28 mins ago",
    tag: "DISPATCH",
    color: "blue",
  },
  {
    id: "log-2",
    title: "Commercial Turnkey License Issued",
    detail: "ORD-9412 key generated for Nordic Stays ApS (Denmark).",
    time: "4 hours ago",
    tag: "LICENSE",
    color: "gold",
  },
  {
    id: "log-3",
    title: "70/30 Escrow Contract Executed",
    detail: "Biscayne Bay Ultra Villa ($4.25M) placed into verified escrow account.",
    time: "Today, 11:20 AM",
    tag: "ESCROW",
    color: "green",
  },
  {
    id: "log-4",
    title: "Daily Lead Quota Synchronized",
    detail: "All 6 broker territories cleared at 00:00 UTC with zero dropped requests.",
    time: "Yesterday",
    tag: "SYSTEM",
    color: "purple",
  },
];

export default function AdminClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { message, modal } = App.useApp();

  // URL Query Synced Tab State (e.g. /admin?tab=leads)
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTabState] = useState<string>(initialTab);

  // Sync tab with URL without full page reload
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    const newUrl = tab === "overview" ? "/admin" : `/admin?tab=${tab}`;
    router.replace(newUrl, { scroll: false });
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== activeTab) {
      setActiveTabState(tabParam);
    } else if (!tabParam && activeTab !== "overview") {
      setActiveTabState("overview");
    }
  }, [searchParams]);

  // Desktop Sider Collapsible State
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Authenticated Session
  const { data: session } = useSession();
  const currentUser = session?.user;
  const currentUserName = currentUser?.name || "Alexander Cole";
  const currentUserEmail = currentUser?.email || "alexander@propgrowthlab.com";
  const currentUserRole = currentUser?.role || "Platform Owner";
  const currentUserInitial = currentUserName.slice(0, 2).toUpperCase();

  // Datasets
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(INITIAL_SUBSCRIPTIONS);
  const [templates, setTemplates] = useState<TemplateSaleItem[]>(INITIAL_TEMPLATES);
  const [agencyProperties] = useState<AgencyPropertyItem[]>(INITIAL_AGENCY_PROPERTIES);
  const [escrowDeals] = useState<EscrowDealItem[]>(INITIAL_ESCROW_DEALS);
  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  // Filters
  const [selectedTerritory, setSelectedTerritory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [selectedLeadForDispatch, setSelectedLeadForDispatch] = useState<LeadItem | null>(null);
  const [addLicenseModalOpen, setAddLicenseModalOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Forms
  const [leadForm] = Form.useForm();
  const [licenseForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const [broadcastForm] = Form.useForm();

  // Keyboard shortcut listener (Ctrl+B and Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setCollapsed((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ----------------- CEO & OPS HANDLERS -----------------
  const handleSimulateInboundLead = () => {
    const mockInboundPool: LeadItem[] = [
      {
        id: `lead-${Date.now().toString().slice(-4)}`,
        fullName: "Sheikh Hamdan Al-Falasi",
        whatsapp: "+971 52 987 6543",
        territory: "UAE",
        propertyType: "Dubai Hills Mansion",
        budget: "AED 24M",
        moveIn: "Immediate Cash",
        status: "new",
        date: "Just now",
      },
      {
        id: `lead-${Date.now().toString().slice(-4)}`,
        fullName: "Sebastian von Berg",
        whatsapp: "+41 79 123 4567",
        territory: "EU",
        propertyType: "Zermatt Ski Lodge",
        budget: "CHF 4.1M",
        moveIn: "Next 60 Days",
        status: "new",
        date: "Just now",
      },
      {
        id: `lead-${Date.now().toString().slice(-4)}`,
        fullName: "Victoria Sterling",
        whatsapp: "+1 310 555 0177",
        territory: "USA",
        propertyType: "Beverly Hills Compound",
        budget: "$6.5M",
        moveIn: "Q3 2026",
        status: "new",
        date: "Just now",
      },
    ];

    const randomLead = mockInboundPool[leads.length % mockInboundPool.length];
    setLeads((prev) => [randomLead, ...prev]);

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        title: "Inbound Webhook Simulated",
        detail: `${randomLead.fullName} (${randomLead.territory}) ingested into live queue with budget ${randomLead.budget}.`,
        time: "Just now",
        tag: "WEBHOOK",
        color: "gold",
      },
      ...prev,
    ]);

    message.success({
      content: `⚡ Webhook Ingestion: New Lead "${randomLead.fullName}" (${randomLead.territory}) queued!`,
      duration: 3.5,
    });
  };

  const handleExportCsv = () => {
    const headers = [
      "ID",
      "Full Name",
      "WhatsApp",
      "Territory",
      "Property Intent",
      "Budget",
      "Move-In",
      "Status",
      "Assigned Broker",
      "Date",
    ];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.whatsapp}"`,
      `"${l.territory}"`,
      `"${l.propertyType}"`,
      `"${l.budget}"`,
      `"${l.moveIn}"`,
      `"${l.status}"`,
      `"${l.assignedBroker || "Unassigned"}"`,
      `"${l.date}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `PropGrowth-Leads-Audit-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Executive Leads CSV exported successfully!");
  };

  const handleBroadcastAlert = (values: any) => {
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        title: "CEO Broadcast Sent to All Brokers",
        detail: `Notice: "${values.message}" broadcasted across all 6 active markets.`,
        time: "Just now",
        tag: "BROADCAST",
        color: "red",
      },
      ...prev,
    ]);
    broadcastForm.resetFields();
    setBroadcastModalOpen(false);
    message.success("High-priority alert transmitted to all licensed broker channels!");
  };

  // ----------------- CRUD HANDLERS -----------------
  const handleCreateLead = (values: any) => {
    const newLead: LeadItem = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      fullName: values.fullName,
      whatsapp: values.whatsapp,
      territory: values.territory,
      propertyType: values.propertyType,
      budget: values.budget,
      moveIn: values.moveIn || "Within 30 Days",
      status: "new",
      date: "Just now",
    };
    setLeads([newLead, ...leads]);
    leadForm.resetFields();
    setAddLeadModalOpen(false);

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        title: "Lead Manually Logged",
        detail: `${newLead.fullName} (${newLead.territory}) registered with budget ${newLead.budget}.`,
        time: "Just now",
        tag: "LEAD_IN",
        color: "blue",
      },
      ...prev,
    ]);

    message.success(`Lead for ${newLead.fullName} logged into live stream!`);
  };

  const handleOpenDispatch = (lead: LeadItem) => {
    setSelectedLeadForDispatch(lead);
    setDispatchModalOpen(true);
  };

  const handleConfirmDispatch = (brokerName: string) => {
    if (!selectedLeadForDispatch) return;
    setLeads(
      leads.map((l) =>
        l.id === selectedLeadForDispatch.id
          ? { ...l, status: "dispatched", assignedBroker: brokerName }
          : l
      )
    );
    setDispatchModalOpen(false);

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        title: "Lead Dispatched",
        detail: `${selectedLeadForDispatch.fullName} dispatched to ${brokerName}.`,
        time: "Just now",
        tag: "DISPATCH",
        color: "blue",
      },
      ...prev,
    ]);

    message.success(`Lead "${selectedLeadForDispatch.fullName}" routed to ${brokerName}!`);
  };

  const handleDeleteLead = (leadId: string, leadName: string) => {
    modal.confirm({
      title: "Confirm Lead Deletion",
      content: `Are you sure you want to permanently remove lead "${leadName}"?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setLeads(leads.filter((l) => l.id !== leadId));
        message.info(`Lead "${leadName}" removed from repository.`);
      },
    });
  };

  const handleCreateLicense = (values: any) => {
    const newLicense: TemplateSaleItem = {
      id: `tmpl-${Date.now().toString().slice(-4)}`,
      orderId: `ORD-${(Date.now() % 8999) + 1000}`,
      clientName: values.clientName,
      email: values.email,
      templateName: values.templateName,
      tier: values.tier,
      amount: values.tier.includes("199") ? "$199" : "$19",
      licenseKey: `PGL-${values.templateName.substring(0, 3).toUpperCase()}-${
        (Date.now() % 8999) + 1000
      }-KEY`,
      githubInvite: "Granted",
      status: "Active",
      date: "Today",
    };
    setTemplates([newLicense, ...templates]);
    licenseForm.resetFields();
    setAddLicenseModalOpen(false);
    message.success(`License Key generated for ${newLicense.clientName}!`);
  };

  const handleRevokeLicense = (licenseId: string) => {
    modal.confirm({
      title: "Revoke License Key",
      content: "This will invalidate the repository access for this client key.",
      okText: "Revoke Key",
      okType: "danger",
      cancelText: "Keep Active",
      onOk: () => {
        setTemplates(
          templates.map((t) =>
            t.id === licenseId ? { ...t, status: "Revoked" } : t
          )
        );
        message.warning("License key revoked.");
      },
    });
  };

  const handleToggleSubscription = (subId: string) => {
    setSubscriptions(
      subscriptions.map((s) =>
        s.id === subId
          ? { ...s, status: s.status === "Active" ? "Paused" : "Active" }
          : s
      )
    );
    message.info("Broker subscription status updated.");
  };

  const handleCreateUser = (values: any) => {
    const newUser: AdminUserItem = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: values.name,
      email: values.email,
      role: values.role,
      territories: values.territories || ["Global"],
      status: "Active",
      lastLogin: "Never",
    };
    setAdminUsers([...adminUsers, newUser]);
    userForm.resetFields();
    setAddUserModalOpen(false);
    message.success(`Administrator ${newUser.name} added to security roster!`);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    modal.confirm({
      title: "Revoke Administrator Access",
      content: `Are you sure you want to remove administrator permissions for "${userName}"?`,
      okText: "Revoke Access",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setAdminUsers(adminUsers.filter((u) => u.id !== userId));
        message.info(`Access revoked for ${userName}.`);
      },
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard!");
  };

  // ----------------- FILTERED DATA -----------------
  const filteredLeads = leads.filter((l) => {
    const matchTerritory =
      selectedTerritory === "All" || l.territory === selectedTerritory;
    const matchSearch =
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.propertyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.territory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTerritory && matchSearch;
  });

  // ----------------- SIDEBAR MENU ITEMS -----------------
  const menuItems: MenuProps["items"] = [
    {
      key: "overview",
      icon: <DashboardOutlined className="text-base" />,
      label: "Overview Studio",
    },
    {
      type: "divider",
    },
    {
      key: "leads",
      icon: <ThunderboltOutlined className="text-base" />,
      label: (
        <span className="flex items-center justify-between w-full">
          <span>Leads Dispatch</span>
          <Badge
            count={leads.filter((l) => l.status === "new").length}
            className="site-badge"
            style={{ backgroundColor: "#d97706" }}
          />
        </span>
      ),
    },
    {
      key: "subscriptions",
      icon: <ApartmentOutlined className="text-base" />,
      label: (
        <span className="flex items-center justify-between w-full">
          <span>Broker Quotas</span>
          <Badge
            count={subscriptions.length}
            style={{ backgroundColor: "#f1f5f9", color: "#475569", boxShadow: "none" }}
          />
        </span>
      ),
    },
    {
      key: "templates",
      icon: <KeyOutlined className="text-base" />,
      label: (
        <span className="flex items-center justify-between w-full">
          <span>Licenses & Code</span>
          <Badge
            count={templates.length}
            style={{ backgroundColor: "#f1f5f9", color: "#475569", boxShadow: "none" }}
          />
        </span>
      ),
    },
    {
      key: "agency",
      icon: <GlobalOutlined className="text-base" />,
      label: (
        <span className="flex items-center justify-between w-full">
          <span>Direct Stay Fleet</span>
          <Badge
            count={agencyProperties.length}
            style={{ backgroundColor: "#f1f5f9", color: "#475569", boxShadow: "none" }}
          />
        </span>
      ),
    },
    {
      key: "deals",
      icon: <DollarOutlined className="text-base" />,
      label: (
        <span className="flex items-center justify-between w-full">
          <span>70/30 Escrow Deals</span>
          <Badge
            count={escrowDeals.length}
            style={{ backgroundColor: "#f1f5f9", color: "#475569", boxShadow: "none" }}
          />
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "users",
      icon: <TeamOutlined className="text-base" />,
      label: (
        <span className="flex items-center justify-between w-full">
          <span>Admin & RBAC</span>
          <Badge
            count={adminUsers.length}
            style={{ backgroundColor: "#f1f5f9", color: "#475569", boxShadow: "none" }}
          />
        </span>
      ),
    },
  ];

  // ----------------- USER PROFILE DROPDOWN MENU -----------------
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div className="py-1">
          <div className="font-bold text-slate-900 text-xs">{currentUserName}</div>
          <div className="text-[11px] text-amber-600 font-mono">{currentUserEmail}</div>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: "Admin & RBAC Settings",
      onClick: () => setActiveTab("users"),
    },
    {
      key: "dashboard",
      icon: <ExportOutlined />,
      label: <Link href="/dashboard">Switch to Client Portal</Link>,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined className="text-red-500" />,
      danger: true,
      label: "Sign Out",
      onClick: async () => {
        message.loading("Signing out...", 1);
        await signOut({ callbackUrl: "/login" });
      },
    },
  ];

  // ----------------- DESKTOP LEADS TABLE COLUMNS -----------------
  const leadColumns: TableColumnsType<LeadItem> = [
    {
      title: "Prospect / Client",
      dataIndex: "fullName",
      key: "fullName",
      render: (name: string, record: LeadItem) => (
        <div className="min-w-0">
          <div className="font-semibold text-slate-900 truncate">{name}</div>
          <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
            <span>{record.whatsapp}</span>
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined className="text-slate-400 hover:text-slate-600 text-xs" />}
              onClick={() => copyToClipboard(record.whatsapp)}
              className="h-5 w-5 p-0"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Territory",
      dataIndex: "territory",
      key: "territory",
      render: (territory: string) => (
        <Tag color="gold" className="font-semibold font-mono text-xs">
          {territory}
        </Tag>
      ),
    },
    {
      title: "Property & Budget",
      dataIndex: "propertyType",
      key: "propertyType",
      render: (propType: string, record: LeadItem) => (
        <div>
          <div className="text-slate-800 text-sm font-medium">{propType}</div>
          <div className="text-xs font-semibold text-emerald-600 font-mono mt-0.5">
            Budget: {record.budget}
          </div>
        </div>
      ),
    },
    {
      title: "Timeline",
      dataIndex: "moveIn",
      key: "moveIn",
      render: (timeline: string) => (
        <span className="text-xs text-slate-600 font-medium">{timeline}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: LeadItem) => {
        if (status === "new") {
          return (
            <Tag color="warning" className="font-semibold text-xs animate-pulse">
              NEW INFLOW
            </Tag>
          );
        }
        if (status === "dispatched") {
          return (
            <div>
              <Tag color="processing" className="font-semibold text-xs">
                DISPATCHED
              </Tag>
              <div className="text-[11px] text-slate-500 truncate max-w-[140px] mt-0.5">
                {record.assignedBroker}
              </div>
            </div>
          );
        }
        return (
          <Tag color="success" className="font-semibold text-xs">
            DEAL CLOSED
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_: any, record: LeadItem) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<ArrowRightOutlined />}
            onClick={() => handleOpenDispatch(record)}
            className="bg-amber-600 hover:bg-amber-500 text-xs font-medium"
          >
            Dispatch
          </Button>
          <a
            href={`https://wa.me/${record.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Hello ${record.fullName}, this is PropGrowth Lab dispatch regarding your ${record.territory} property enquiry.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="small" className="text-xs text-emerald-700 border-emerald-300 hover:bg-emerald-50">
              WhatsApp
            </Button>
          </a>
          <Button
            danger
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteLead(record.id, record.fullName)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 w-full max-w-full overflow-x-hidden">
      {/* ================= DESKTOP SIDEBAR (COLLAPSIBLE / HIDEABLE) ================= */}
      <aside className="hidden lg:block shrink-0">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(val) => setCollapsed(val)}
          width={240}
          collapsedWidth={76}
          trigger={null}
          theme="light"
          className="border-r border-slate-200 h-screen sticky top-0 overflow-y-auto flex flex-col justify-between"
        >
          <div>
            {/* Brand Header */}
            <div
              className={`py-4 border-b border-slate-100 flex items-center transition-all ${
                collapsed ? "justify-center px-2" : "justify-between px-5"
              }`}
            >
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-sm shadow-xs shrink-0">
                  P
                </div>
                {!collapsed && (
                  <div>
                    <span className="font-bold text-slate-900 tracking-tight text-sm block leading-none">
                      PropGrowth
                    </span>
                    <span className="text-[10px] text-amber-600 uppercase tracking-widest font-mono font-semibold">
                      Admin Studio
                    </span>
                  </div>
                )}
              </Link>
              {!collapsed && (
                <Tag color="gold" className="text-[10px] m-0 font-mono font-bold">
                  v1.2
                </Tag>
              )}
            </div>

            {/* Sider Menu */}
            <div className="py-2">
              <Menu
                mode="inline"
                selectedKeys={[activeTab]}
                onClick={(e) => setActiveTab(e.key)}
                items={menuItems}
                className="border-none"
              />
            </div>
          </div>

          {/* Sider Bottom Status Area (Zero Redundant Buttons) */}
          <div className="p-3 border-t border-slate-100">
            {!collapsed ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>6 Engines Live</span>
                </div>
                <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                  Real-time WhatsApp & Stripe webhook router.
                </p>
                <Link
                  href="/dashboard"
                  className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  Client Portal <ArrowRightOutlined className="text-[9px]" />
                </Link>
              </div>
            ) : (
              <div className="flex justify-center py-1">
                <Tooltip title="6 Direct Engines Active" placement="right">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <GlobalOutlined className="text-sm" />
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </Sider>
      </aside>

      {/* ================= MOBILE DRAWER NAVIGATION ================= */}
      <Drawer
        placement="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        size={280}
        title={
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-xs">
              P
            </div>
            <span className="font-bold text-slate-900 text-sm">PropGrowth Studio</span>
          </div>
        }
      >
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={(e) => {
            setActiveTab(e.key);
            setMobileDrawerOpen(false);
          }}
          items={menuItems}
          className="border-none"
        />
        <div className="mt-8 pt-4 border-t border-slate-100">
          <Link
            href="/dashboard"
            className="flex items-center justify-between text-xs font-semibold text-amber-700 p-2.5 rounded-lg bg-amber-50"
          >
            <span>Visit Client Dashboard</span>
            <ArrowRightOutlined />
          </Link>
        </div>
      </Drawer>

      {/* ================= MAIN WORKSPACE AREA ================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Semantic Header Bar (Bulletproof Responsive Layout with Zero Overlap/Collision) */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 w-full max-w-full overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {/* Mobile/Tablet Hamburger Trigger (Strictly Hidden on Desktop) */}
            <div className="lg:hidden shrink-0">
              <Button
                type="text"
                icon={<MenuOutlined className="text-lg text-slate-700" />}
                onClick={() => setMobileDrawerOpen(true)}
                className="p-1 h-8 w-8 flex items-center justify-center"
              />
            </div>

            {/* Desktop-Only Toggle Sidebar Button (Strictly Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block shrink-0">
              <Tooltip title={collapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}>
                <Button
                  type="text"
                  icon={
                    collapsed ? (
                      <MenuUnfoldOutlined className="text-base text-slate-700" />
                    ) : (
                      <MenuFoldOutlined className="text-base text-slate-700" />
                    )
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  className="p-1 h-8 w-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                />
              </Tooltip>
            </div>

            {/* Mobile & Middle/Tablet Title (< lg: Clean, Compact, Never Collides) */}
            <div className="lg:hidden font-bold text-slate-800 text-xs sm:text-sm truncate">
              <span className="capitalize">
                {activeTab === "overview" ? "Executive Summary" : activeTab}
              </span>
            </div>

            {/* Desktop Breadcrumb (>= lg only) */}
            <div className="hidden lg:block shrink-0">
              <Breadcrumb
                items={[
                  { title: <span onClick={() => setActiveTab("overview")} className="cursor-pointer">Studio</span> },
                  {
                    title: (
                      <span className="capitalize font-semibold text-slate-800">
                        {activeTab === "overview" ? "Executive Summary" : activeTab}
                      </span>
                    ),
                  },
                ]}
                className="text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Mobile Quick Search Button (< md only: Zero Tooltip Popup on Touch) */}
            <div className="md:hidden shrink-0">
              <Button
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => setCommandPaletteOpen(true)}
                size="small"
                className="text-slate-600 flex items-center justify-center h-8 w-8"
              />
            </div>

            {/* Tablet & Desktop Search Input (>= md: Zero Hover Tooltip, Clean Inline Placeholder) */}
            <div className="hidden md:block shrink-0">
              <Input
                prefix={<SearchOutlined className="text-slate-400 text-xs" />}
                suffix={
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                    Ctrl+K
                  </span>
                }
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setCommandPaletteOpen(true)}
                className="w-32 lg:w-40 xl:w-48 text-xs h-8 cursor-pointer"
                readOnly
              />
            </div>

            {/* Test Ingest Webhook (Ultra-wide 2xl screens only; primary button is in Executive Command Toolbar) */}
            <div className="hidden 2xl:block shrink-0">
              <Tooltip title="Simulate Inbound High-Intent Lead">
                <Button
                  size="small"
                  icon={<ExperimentOutlined className="text-amber-600" />}
                  onClick={handleSimulateInboundLead}
                  className="flex items-center gap-1 text-xs font-semibold border-amber-300 text-amber-800 hover:bg-amber-50 h-8"
                >
                  <span>⚡ Test Lead</span>
                </Button>
              </Tooltip>
            </div>

            {/* Quick Add Button (Sleek, Slim & Proportionate across Mobile, Tablet & Desktop) */}
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined className="text-[11px]" />}
              onClick={() => {
                if (activeTab === "templates") {
                  setAddLicenseModalOpen(true);
                } else if (activeTab === "users") {
                  setAddUserModalOpen(true);
                } else {
                  setAddLeadModalOpen(true);
                }
              }}
              className="bg-amber-600 hover:bg-amber-500 text-[11px] sm:text-xs font-medium h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg shadow-2xs shrink-0 flex items-center justify-center gap-1"
            >
              <span className="hidden sm:inline">
                {activeTab === "templates"
                  ? "Issue License"
                  : activeTab === "users"
                  ? "Add User"
                  : "New Lead"}
              </span>
              <span className="sm:hidden font-medium">New</span>
            </Button>

            <Tooltip title="Platform Notifications">
              <Badge dot color="#d97706">
                <Button
                  shape="circle"
                  icon={<BellOutlined />}
                  size="small"
                  className="text-slate-600 h-8 w-8 flex items-center justify-center shrink-0"
                />
              </Badge>
            </Tooltip>

            {/* Executive Profile Dropdown */}
            <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="bottomRight">
              <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 cursor-pointer hover:opacity-85 transition-opacity shrink-0">
                <Avatar
                  size={28}
                  style={{ backgroundColor: "#0f172a", color: "#f59e0b" }}
                  className="font-bold text-xs ring-1 ring-amber-400/40 shrink-0"
                >
                  {currentUserInitial}
                </Avatar>
                <div className="hidden 2xl:flex flex-col text-left leading-none">
                  <span className="text-xs font-semibold text-slate-800">{currentUserName}</span>
                  <span className="text-[10px] text-amber-700 font-mono font-medium mt-0.5">
                    {currentUserRole}
                  </span>
                </div>
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Semantic Main Content (Active Tab Rendered with 0ms Latency) */}
        <main className="flex-1 p-3 sm:p-5 lg:p-7 max-w-7xl w-full mx-auto space-y-4 sm:space-y-5 overflow-x-hidden">
          {/* ================= TAB 1: OVERVIEW DASHBOARD ================= */}
          {activeTab === "overview" && (
            <section className="space-y-4 sm:space-y-5">
              {/* Executive Hero Stat Cards (MOBILE: 2 COLUMNS (xs={12})) */}
              <Row gutter={[10, 10]}>
                <Col xs={12} sm={12} lg={6}>
                  <Card
                    className="shadow-xs border-slate-200 hover:border-amber-300 transition-all h-full"
                    styles={{ body: { padding: "12px" } }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono truncate">
                        Active Inflow
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-amber-50 flex items-center justify-center text-amber-600 text-xs shrink-0">
                        <ThunderboltOutlined />
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                        {leads.length} Leads
                      </div>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-600 font-semibold mt-0.5 sm:mt-1 truncate">
                        <RiseOutlined />
                        <span>+18.4% WoW</span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={12} sm={12} lg={6}>
                  <Card
                    className="shadow-xs border-slate-200 hover:border-emerald-300 transition-all h-full"
                    styles={{ body: { padding: "12px" } }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono truncate">
                        Direct GMV
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs shrink-0">
                        <DollarOutlined />
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                        $730,000
                      </div>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-600 font-semibold mt-0.5 sm:mt-1 truncate">
                        <span>Zero OTA Fee</span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={12} sm={12} lg={6}>
                  <Card
                    className="shadow-xs border-slate-200 hover:border-blue-300 transition-all h-full"
                    styles={{ body: { padding: "12px" } }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono truncate">
                        Broker Quota
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 text-xs shrink-0">
                        <TeamOutlined />
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                        {subscriptions.filter((s) => s.status === "Active").length} / 6
                      </div>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-blue-600 font-semibold mt-0.5 sm:mt-1 truncate">
                        <span>Max 2-3 per mkt</span>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={12} sm={12} lg={6}>
                  <Card
                    className="shadow-xs border-slate-200 hover:border-purple-300 transition-all h-full"
                    styles={{ body: { padding: "12px" } }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono truncate">
                        Routing Speed
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-purple-50 flex items-center justify-center text-purple-600 text-xs shrink-0">
                        <CheckCircleOutlined />
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                        &lt; 90 sec
                      </div>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-purple-600 font-semibold mt-0.5 sm:mt-1 truncate">
                        <span>WhatsApp Hook</span>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* Territory Performance Matrix (MOBILE: 2 COLUMNS (xs={12})) */}
              <Card
                className="shadow-xs border-slate-200"
                styles={{ body: { padding: "14px 16px" } }}
              >
                <div className="flex items-start sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                  <div className="min-w-0 pr-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                      Territory Real-Time Pipeline
                    </span>
                    <p className="text-[11px] text-slate-500 font-normal m-0 truncate">
                      Live lead delivery quotas & exclusive market allocations
                    </p>
                  </div>
                  <Button
                    size="small"
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-semibold text-amber-700 shrink-0"
                  >
                    Leads &rarr;
                  </Button>
                </div>

                <Row gutter={[10, 10]}>
                  {["USA", "UK", "Canada", "Australia", "EU", "UAE"].map((market) => {
                    const marketLeads = leads.filter((l) => l.territory === market);
                    const marketSub = subscriptions.find((s) => s.territory === market);
                    return (
                      <Col xs={12} sm={8} lg={4} key={market}>
                        <article className="p-3 sm:p-4 rounded-xl border border-slate-200/90 bg-white hover:border-amber-300 transition-all h-full flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                {market}
                              </span>
                              <Tag
                                color={marketSub?.status === "Active" ? "gold" : "default"}
                                className="m-0 text-[9px] sm:text-[10px] px-1 py-0 font-mono"
                              >
                                {marketSub?.status === "Active" ? "Active" : "Open"}
                              </Tag>
                            </div>
                            <div className="mt-2 space-y-1 text-[11px] sm:text-xs">
                              <div className="flex justify-between text-slate-500">
                                <span>Leads:</span>
                                <span className="font-semibold text-slate-900">
                                  {marketLeads.length}
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-500">
                                <span className="truncate">Broker:</span>
                                <span className="font-semibold text-slate-800 truncate max-w-[70px] sm:max-w-[110px]">
                                  {marketSub?.brokerName.split(" ")[0] || "None"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="pt-2 mt-2 border-t border-slate-100">
                            <Progress
                              percent={
                                marketSub
                                  ? Math.round((marketSub.deliveredToday / marketSub.quotaDaily) * 100)
                                  : 0
                              }
                              size="small"
                              strokeColor="#d97706"
                            />
                          </div>
                        </article>
                      </Col>
                    );
                  })}
                </Row>
              </Card>

              {/* Two-Column Bottom Grid: Live Inflow Queue + System Audit Trail */}
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                  <Card
                    title={
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            Recent Inbound Queue
                          </span>
                          <Tag color="cyan">Live Feed</Tag>
                        </div>
                        <Button
                          size="small"
                          icon={<ExperimentOutlined className="text-amber-600" />}
                          onClick={handleSimulateInboundLead}
                          className="text-xs font-semibold border-amber-300 text-amber-800 hover:bg-amber-50 h-7"
                        >
                          Simulate Lead
                        </Button>
                      </div>
                    }
                    className="shadow-xs border-slate-200 h-full"
                  >
                    <div className="space-y-3">
                      {leads.slice(0, 4).map((lead) => (
                        <article
                          key={lead.id}
                          className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Avatar
                              style={{ backgroundColor: "#fffbeb", color: "#b45309" }}
                              className="font-bold border border-amber-200 shrink-0 text-xs"
                            >
                              {lead.fullName.charAt(0)}
                            </Avatar>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-slate-900 text-xs truncate">
                                  {lead.fullName}
                                </span>
                                <Tag color="gold" className="text-[9px] m-0 px-1 py-0 font-mono">
                                  {lead.territory}
                                </Tag>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate m-0 mt-0.5">
                                {lead.propertyType} • {lead.budget}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleOpenDispatch(lead)}
                              className="bg-amber-600 hover:bg-amber-500 text-xs h-7"
                            >
                              Dispatch
                            </Button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={10}>
                  <Card
                    title={
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-1.5">
                          <HistoryOutlined className="text-slate-600" />
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            Operations Audit Log
                          </span>
                        </div>
                        <Button
                          size="small"
                          icon={<NotificationOutlined />}
                          onClick={() => setBroadcastModalOpen(true)}
                          className="text-xs text-slate-700 hover:text-slate-900 h-7"
                        >
                          Broadcast
                        </Button>
                      </div>
                    }
                    className="shadow-xs border-slate-200 h-full"
                  >
                    <Timeline
                      items={auditLogs.map((log) => ({
                        color: log.color,
                        content: (
                          <div className="text-xs">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-slate-800">{log.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 m-0 mt-0.5 leading-relaxed">
                              {log.detail}
                            </p>
                          </div>
                        ),
                      }))}
                    />
                  </Card>
                </Col>
              </Row>
            </section>
          )}

          {/* ================= TAB 2: LEADS MANAGEMENT (CRUD) ================= */}
          {activeTab === "leads" && (
            <section className="space-y-4">
              {/* Filter & Action Toolbar */}
              <Card className="shadow-xs border-slate-200" styles={{ body: { padding: "12px 16px" } }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-600">Filter Territory:</span>
                    <Select
                      value={selectedTerritory}
                      onChange={(val) => setSelectedTerritory(val)}
                      style={{ width: 140 }}
                      size="small"
                      options={[
                        { value: "All", label: "All Territories" },
                        { value: "USA", label: "USA" },
                        { value: "UK", label: "UK" },
                        { value: "Canada", label: "Canada" },
                        { value: "Australia", label: "Australia" },
                        { value: "EU", label: "EU" },
                        { value: "UAE", label: "UAE" },
                      ]}
                    />
                    <Tag color="blue" className="text-xs m-0">
                      {filteredLeads.length} Matches
                    </Tag>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      icon={<DownloadOutlined />}
                      size="small"
                      onClick={handleExportCsv}
                      className="text-xs flex-1 sm:flex-initial"
                    >
                      Export CSV
                    </Button>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setAddLeadModalOpen(true)}
                      className="bg-amber-600 hover:bg-amber-500 text-xs font-semibold flex-1 sm:flex-initial"
                    >
                      Add New Prospect
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Clean Intentional Gap & Responsive Lead Cards Grid (Mobile: 1, Tablet: 2, Laptop: 3, Desktop: 4) */}
              <div className="pt-2">
                <Row gutter={[14, 14]}>
                  {filteredLeads.map((lead) => (
                    <Col xs={24} sm={12} lg={8} xl={6} key={lead.id}>
                      <article className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-amber-300 transition-colors h-full flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-1.5">
                            <div className="min-w-0 pr-1">
                              <span className="font-bold text-slate-900 text-sm block truncate" title={lead.fullName}>
                                {lead.fullName}
                              </span>
                              <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                                <span className="truncate">{lead.whatsapp}</span>
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<CopyOutlined className="text-xs text-slate-400 hover:text-slate-600" />}
                                  onClick={() => copyToClipboard(lead.whatsapp)}
                                  className="h-4 w-4 p-0 shrink-0"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <Tag color="gold" className="text-[10px] m-0 font-mono font-semibold px-1 py-0">
                                {lead.territory}
                              </Tag>
                              {lead.status === "new" ? (
                                <Tag color="warning" className="text-[10px] font-semibold m-0 px-1 py-0">
                                  NEW
                                </Tag>
                              ) : lead.status === "dispatched" ? (
                                <Tag color="processing" className="text-[10px] font-semibold m-0 px-1 py-0">
                                  ROUTED
                                </Tag>
                              ) : (
                                <Tag color="success" className="text-[10px] font-semibold m-0 px-1 py-0">
                                  CLOSED
                                </Tag>
                              )}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                            <div className="flex justify-between items-center gap-1">
                              <span className="text-slate-500 text-[11px]">Property:</span>
                              <span className="font-semibold text-slate-800 text-right truncate text-[11px] max-w-[130px]">
                                {lead.propertyType}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500 text-[11px]">Budget:</span>
                              <span className="font-bold text-emerald-600 font-mono text-xs">{lead.budget}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500 text-[11px]">Move-in:</span>
                              <span className="text-slate-700 text-[11px]">{lead.moveIn}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-1.5 pt-2 mt-1 border-t border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <Button
                              type="primary"
                              size="small"
                              onClick={() => handleOpenDispatch(lead)}
                              className="bg-amber-600 hover:bg-amber-500 text-xs font-semibold px-2.5 h-7"
                            >
                              Dispatch
                            </Button>
                            <a
                              href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="small" className="text-xs text-emerald-700 border-emerald-300 px-2 h-7 hover:bg-emerald-50">
                                WhatsApp
                              </Button>
                            </a>
                          </div>

                          <Button
                            danger
                            type="text"
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteLead(lead.id, lead.fullName)}
                            className="h-7 w-7 p-0 flex items-center justify-center text-slate-400 hover:text-red-500"
                          />
                        </div>
                      </article>
                    </Col>
                  ))}
                </Row>
              </div>
            </section>
          )}

          {/* ================= TAB 3: BROKER SUBSCRIPTIONS ================= */}
          {activeTab === "subscriptions" && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 m-0">
                    Licensed Broker Subscriptions & Daily Quotas
                  </h2>
                  <p className="text-xs text-slate-500 m-0">
                    Contracted lead routing streams with 100% replacement guarantee
                  </p>
                </div>
              </div>

              <Row gutter={[16, 16]}>
                {subscriptions.map((sub) => (
                  <Col xs={24} md={12} key={sub.id}>
                    <article className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                              {sub.brokerName}
                            </span>
                            <Tag color="gold" className="text-xs font-mono">
                              {sub.territory}
                            </Tag>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{sub.whatsapp}</span>
                        </div>
                        <Tag
                          color={sub.tier === "Platinum" ? "purple" : sub.tier === "Gold" ? "gold" : "blue"}
                          className="font-bold text-xs"
                        >
                          {sub.tier.toUpperCase()} TIER
                        </Tag>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-600">Daily Quota Delivery:</span>
                          <span className="text-slate-900 font-bold font-mono">
                            {sub.deliveredToday} / {sub.quotaDaily} Leads Today
                          </span>
                        </div>
                        <Progress
                          percent={Math.round((sub.deliveredToday / sub.quotaDaily) * 100)}
                          strokeColor="#d97706"
                        />
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-500">Monthly Target: </span>
                          <span className="font-bold text-slate-800 font-mono">
                            {sub.monthlyQuota} leads
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Status:</span>
                          <Switch
                            checked={sub.status === "Active"}
                            onChange={() => handleToggleSubscription(sub.id)}
                            checkedChildren="Active"
                            unCheckedChildren="Paused"
                            className="bg-slate-300"
                          />
                        </div>
                      </div>
                    </article>
                  </Col>
                ))}
              </Row>
            </section>
          )}

          {/* ================= TAB 4: COMMERCIAL LICENSES ================= */}
          {activeTab === "templates" && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h2 className="text-base font-bold text-slate-900 m-0">
                    Commercial License Key Repository
                  </h2>
                  <p className="text-xs text-slate-500 m-0">
                    PropGrowth verified turnkey licenses and GitHub repository grants
                  </p>
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setAddLicenseModalOpen(true)}
                  className="bg-amber-600 hover:bg-amber-500 text-xs font-semibold self-start sm:self-auto"
                >
                  Issue License
                </Button>
              </div>

              <Row gutter={[14, 14]}>
                {templates.map((tmpl) => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={tmpl.id}>
                    <article className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-amber-300 transition-colors h-full flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="min-w-0 pr-1">
                            <span className="font-bold text-slate-900 text-sm block truncate" title={tmpl.clientName}>
                              {tmpl.clientName}
                            </span>
                            <span className="text-xs text-slate-500 block truncate" title={tmpl.email}>
                              {tmpl.email}
                            </span>
                          </div>
                          <Tag
                            color={tmpl.status === "Active" ? "success" : "error"}
                            className="text-[10px] font-semibold m-0 px-1 py-0 shrink-0"
                          >
                            {tmpl.status}
                          </Tag>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                          <div className="flex justify-between items-center gap-1">
                            <span className="text-slate-500 text-[11px]">Product:</span>
                            <span className="font-semibold text-slate-800 text-right truncate text-[11px] max-w-[130px]" title={tmpl.templateName}>
                              {tmpl.templateName}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-[11px]">Tier:</span>
                            <span className="font-semibold text-slate-800 text-[11px]">
                              {tmpl.tier.replace(/\s*\(\$[\d]+\)/, "")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-[11px]">Value:</span>
                            <span className="font-bold text-emerald-600 font-mono text-xs">
                              {tmpl.amount}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100/80">
                            <span className="text-slate-500 text-[11px]">Key:</span>
                            <span className="font-mono text-[10px] font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[140px]" title={tmpl.licenseKey}>
                              {tmpl.licenseKey}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
                        <Button
                          size="small"
                          icon={<CopyOutlined className="text-xs" />}
                          onClick={() => copyToClipboard(tmpl.licenseKey)}
                          className="text-xs font-medium h-7 px-2.5"
                        >
                          Copy Key
                        </Button>
                        {tmpl.status === "Active" && (
                          <Button
                            danger
                            type="text"
                            size="small"
                            onClick={() => handleRevokeLicense(tmpl.id)}
                            className="text-xs h-7 text-red-600 hover:text-red-700 p-0"
                          >
                            Revoke Key
                          </Button>
                        )}
                      </div>
                    </article>
                  </Col>
                ))}
              </Row>
            </section>
          )}

          {/* ================= TAB 5: AGENCY FLEET ================= */}
          {activeTab === "agency" && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 m-0">
                    Direct Stay Booking Engines Portfolio
                  </h2>
                  <p className="text-xs text-slate-500 m-0">
                    Active luxury villas & boutique chalets operating on custom booking subdomains
                  </p>
                </div>
              </div>

              <Row gutter={[14, 14]}>
                {agencyProperties.map((prop) => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={prop.id}>
                    <article className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-emerald-300 transition-colors h-full flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="min-w-0 pr-1">
                            <span className="font-bold text-slate-900 text-sm block truncate" title={prop.name}>
                              {prop.name}
                            </span>
                            <div className="text-xs text-slate-500 mt-0.5 truncate">
                              Owner: <span className="text-slate-700 font-medium">{prop.ownerName}</span>
                            </div>
                          </div>
                          <Tag color="cyan" className="text-[10px] font-semibold m-0 px-1.5 py-0 shrink-0">
                            {prop.status}
                          </Tag>
                        </div>

                        <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-1.5 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-emerald-900 font-medium text-[11px]">Direct GMV:</span>
                            <span className="font-bold text-emerald-700 font-mono text-xs">
                              {prop.directGmv}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-emerald-900 font-medium text-[11px]">OTA Saved:</span>
                            <span className="font-bold text-emerald-800 font-mono text-xs">
                              +{prop.otaSavings}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-emerald-100">
                            <span className="text-emerald-900 font-medium text-[11px]">Direct Share:</span>
                            <span className="font-bold text-emerald-800 text-xs">{prop.directShare}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 mt-1 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">iCal: {prop.icalStatus}</span>
                        <Tag color="success" className="m-0 text-[10px] font-medium px-1.5 py-0">
                          Stripe {prop.stripeStatus}
                        </Tag>
                      </div>
                    </article>
                  </Col>
                ))}
              </Row>
            </section>
          )}

          {/* ================= TAB 6: 70/30 ESCROW DEALS ================= */}
          {activeTab === "deals" && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 m-0">
                    70/30 Performance Escrow Pipeline
                  </h2>
                  <p className="text-xs text-slate-500 m-0">
                    Direct partner luxury transactions held in legal escrow
                  </p>
                </div>
              </div>

              <Row gutter={[14, 14]}>
                {escrowDeals.map((deal) => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={deal.id}>
                    <article className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-amber-300 transition-colors h-full flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="min-w-0 pr-1">
                            <span className="font-bold text-slate-900 text-sm block truncate" title={deal.propertyTitle}>
                              {deal.propertyTitle}
                            </span>
                            <div className="text-xs text-slate-500 mt-0.5 truncate">
                              Buyer: <span className="text-slate-700 font-medium">{deal.buyerName}</span>
                            </div>
                            <div className="text-[11px] font-mono font-medium text-amber-700 mt-0.5">
                              {deal.territory}
                            </div>
                          </div>
                          <Tag
                            color={deal.status === "Settled" ? "success" : deal.status === "In Escrow" ? "gold" : "processing"}
                            className="text-[10px] font-semibold m-0 px-1.5 py-0 shrink-0"
                          >
                            {deal.status}
                          </Tag>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-[11px]">Contract Value:</span>
                            <span className="font-bold text-slate-900 font-mono text-xs">{deal.dealValue}</span>
                          </div>
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-slate-500 text-[11px] shrink-0">Escrow Split:</span>
                            <span className="font-semibold text-amber-700 text-[10px] text-right leading-tight break-words max-w-[150px]">
                              {deal.escrowSplit}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-slate-100/80">
                            <span className="text-slate-500 text-[11px] shrink-0">Broker:</span>
                            <span className="text-slate-700 text-[11px] truncate max-w-[130px] font-medium" title={deal.brokerFirm}>
                              {deal.brokerFirm}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-400 font-mono">{deal.dealRef}</span>
                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          {deal.updatedAt || "Verified"}
                        </span>
                      </div>
                    </article>
                  </Col>
                ))}
              </Row>
            </section>
          )}

          {/* ================= TAB 7: USERS & RBAC ================= */}
          {activeTab === "users" && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h2 className="text-base font-bold text-slate-900 m-0">
                    Platform Team & Role-Based Access Control
                  </h2>
                  <p className="text-xs text-slate-500 m-0">
                    System administrators, lead dispatchers, and territorial quotas managers
                  </p>
                </div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setAddUserModalOpen(true)}
                  className="bg-amber-600 hover:bg-amber-500 text-xs font-semibold self-start sm:self-auto h-8 px-3"
                >
                  Add Team Member
                </Button>
              </div>

              <Row gutter={[14, 14]}>
                {adminUsers.map((usr) => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={usr.id}>
                    <article className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-amber-300 transition-colors h-full flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Avatar
                              style={{ backgroundColor: "#0f172a", color: "#f59e0b" }}
                              className="font-bold shrink-0 text-xs"
                              size={36}
                            >
                              {usr.name.charAt(0)}
                            </Avatar>
                            <div className="min-w-0 pr-1">
                              <span className="font-bold text-slate-900 text-sm block truncate" title={usr.name}>
                                {usr.name}
                              </span>
                              <span className="text-[11px] text-slate-500 block truncate" title={usr.email}>
                                {usr.email}
                              </span>
                            </div>
                          </div>
                          <Tag
                            color={
                              usr.role === "Platform Owner"
                                ? "gold"
                                : usr.role === "Head of Brokerage"
                                ? "blue"
                                : "cyan"
                            }
                            className="text-[10px] font-semibold m-0 px-1.5 py-0 shrink-0"
                          >
                            {usr.role}
                          </Tag>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Territorial Access:</span>
                            <span className="font-semibold text-slate-700">
                              {usr.territories.length} Region{usr.territories.length > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 flex-wrap">
                            {usr.territories.map((t) => (
                              <Tag key={t} className="m-0 text-[10px] bg-white border-slate-200 text-slate-700 px-1.5 py-0">
                                {t}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500">
                          Active: <span className="text-slate-700 font-medium">{usr.lastLogin}</span>
                        </span>
                        {usr.role !== "Platform Owner" ? (
                          <Button
                            danger
                            type="text"
                            size="small"
                            onClick={() => handleDeleteUser(usr.id, usr.name)}
                            className="text-[11px] h-6 px-1.5 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Revoke
                          </Button>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            Root
                          </span>
                        )}
                      </div>
                    </article>
                  </Col>
                ))}
              </Row>
            </section>
          )}
        </main>

        {/* Semantic Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-4 sm:px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
          <span>&copy; 2026 PropGrowth Lab. Enterprise Operations Center.</span>
          <div className="flex items-center gap-3 font-medium">
            <Link href="/dashboard" className="text-amber-700 hover:underline">
              Switch to Client Dashboard
            </Link>
            <span>•</span>
            <span className="text-emerald-600">Zero-Wastage SLA Guaranteed</span>
          </div>
        </footer>
      </div>

      {/* ================= MODAL: ADD NEW PROSPECT ================= */}
      <Modal
        title="Add Verified Lead Prospect"
        open={addLeadModalOpen}
        onCancel={() => setAddLeadModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={leadForm}
          layout="vertical"
          onFinish={handleCreateLead}
          initialValues={{ territory: "USA", moveIn: "Within 30 Days" }}
        >
          <Form.Item
            name="fullName"
            label="Prospect Full Name"
            rules={[{ required: true, message: "Prospect name required" }]}
          >
            <Input placeholder="e.g. Richard Hendricks" />
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="territory"
                label="Target Territory"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { value: "USA", label: "USA" },
                    { value: "UK", label: "UK" },
                    { value: "Canada", label: "Canada" },
                    { value: "Australia", label: "Australia" },
                    { value: "EU", label: "EU" },
                    { value: "UAE", label: "UAE" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="whatsapp"
                label="WhatsApp Phone"
                rules={[{ required: true, message: "Phone required" }]}
              >
                <Input placeholder="+1 555 123 4567" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="propertyType"
                label="Property Intent"
                rules={[{ required: true, message: "Property type required" }]}
              >
                <Input placeholder="e.g. Waterfront Penthouse" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="budget"
                label="Verified Budget"
                rules={[{ required: true, message: "Budget required" }]}
              >
                <Input placeholder="e.g. $3.5M" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="moveIn" label="Timeline / Move-In">
            <Input placeholder="e.g. Q3 2026 / Immediate" />
          </Form.Item>

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={() => setAddLeadModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-600 hover:bg-amber-500 font-semibold"
            >
              Confirm & Ingest Lead
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ================= MODAL: DISPATCH LEAD ================= */}
      <Modal
        title="Dispatch Lead to Contracted Territory Broker"
        open={dispatchModalOpen}
        onCancel={() => setDispatchModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        {selectedLeadForDispatch && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-1">
              <div className="font-bold text-slate-900 text-sm">
                {selectedLeadForDispatch.fullName}
              </div>
              <div className="text-slate-600">
                Territory:{" "}
                <Tag color="gold" className="font-mono text-xs">
                  {selectedLeadForDispatch.territory}
                </Tag>
              </div>
              <div className="text-slate-600">
                Property: {selectedLeadForDispatch.propertyType} • Budget:{" "}
                <span className="font-bold text-emerald-700">
                  {selectedLeadForDispatch.budget}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                Select Active Broker in {selectedLeadForDispatch.territory}:
              </span>
              <div className="space-y-2">
                {subscriptions
                  .filter(
                    (s) =>
                      s.territory === selectedLeadForDispatch.territory &&
                      s.status === "Active"
                  )
                  .map((broker) => (
                    <div
                      key={broker.id}
                      onClick={() => handleConfirmDispatch(broker.brokerName)}
                      className="p-3 rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          {broker.brokerName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Quota: {broker.deliveredToday} / {broker.quotaDaily} today
                        </div>
                      </div>
                      <Button
                        type="primary"
                        size="small"
                        className="bg-amber-600 hover:bg-amber-500 text-xs"
                      >
                        Route Now
                      </Button>
                    </div>
                  ))}
                {subscriptions.filter(
                  (s) =>
                    s.territory === selectedLeadForDispatch.territory &&
                    s.status === "Active"
                ).length === 0 && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
                    No active broker in this market. Lead will be queued.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ================= MODAL: ISSUE LICENSE ================= */}
      <Modal
        title="Issue Commercial License"
        open={addLicenseModalOpen}
        onCancel={() => setAddLicenseModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={licenseForm}
          layout="vertical"
          onFinish={handleCreateLicense}
          initialValues={{
            templateName: "Direct Stay Turbo Engine",
            tier: "Turnkey 48h ($199)",
          }}
        >
          <Form.Item
            name="clientName"
            label="Client / Company Name"
            rules={[{ required: true, message: "Client name required" }]}
          >
            <Input placeholder="e.g. Nordic Stays ApS" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Client Contact Email"
            rules={[{ required: true, type: "email", message: "Valid email required" }]}
          >
            <Input placeholder="client@domain.com" />
          </Form.Item>

          <Form.Item name="templateName" label="Product / Solution">
            <Select
              options={[
                { value: "Direct Stay Turbo Engine", label: "Direct Stay Turbo Engine" },
                { value: "Luxury Broker Landing Kit", label: "Luxury Broker Landing Kit" },
              ]}
            />
          </Form.Item>

          <Form.Item name="tier" label="License Tier">
            <Select
              options={[
                { value: "Source Code ($19)", label: "Source Code License ($19)" },
                { value: "Turnkey 48h ($199)", label: "Turnkey 48-Hour Setup ($199)" },
              ]}
            />
          </Form.Item>

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={() => setAddLicenseModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-600 hover:bg-amber-500 font-semibold"
            >
              Generate Key & Access
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ================= MODAL: ADD USER / ADMIN ================= */}
      <Modal
        title="Add Platform Administrator"
        open={addUserModalOpen}
        onCancel={() => setAddUserModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleCreateUser}
          initialValues={{ role: "Lead Dispatcher", territories: ["USA"] }}
        >
          <Form.Item
            name="name"
            label="Administrator Name"
            rules={[{ required: true, message: "Name required" }]}
          >
            <Input placeholder="e.g. Rachel Adams" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Corporate Email"
            rules={[{ required: true, type: "email", message: "Valid email required" }]}
          >
            <Input placeholder="name@propgrowthlab.com" />
          </Form.Item>

          <Form.Item name="role" label="System Role">
            <Select
              options={[
                { value: "Platform Owner", label: "Platform Owner (Full Access)" },
                { value: "Head of Brokerage", label: "Head of Brokerage" },
                { value: "Lead Dispatcher", label: "Lead Dispatcher" },
                { value: "Finance Auditor", label: "Finance Auditor" },
              ]}
            />
          </Form.Item>

          <Form.Item name="territories" label="Territory Scope">
            <Select
              mode="multiple"
              options={[
                { value: "Global (All Territories)", label: "Global (All Territories)" },
                { value: "USA", label: "USA" },
                { value: "UK", label: "UK" },
                { value: "Canada", label: "Canada" },
                { value: "Australia", label: "Australia" },
                { value: "EU", label: "EU" },
                { value: "UAE", label: "UAE" },
              ]}
            />
          </Form.Item>

          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={() => setAddUserModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-600 hover:bg-amber-500 font-semibold"
            >
              Grant Access
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ================= MODAL: CEO BROADCAST ALERT ================= */}
      <Modal
        title="Broadcast Emergency / Priority Notice to All Brokers"
        open={broadcastModalOpen}
        onCancel={() => setBroadcastModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form form={broadcastForm} layout="vertical" onFinish={handleBroadcastAlert}>
          <Form.Item
            name="message"
            label="Broadcast Announcement"
            rules={[{ required: true, message: "Message is required" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="e.g. Priority: 3 new verified high-net-worth buyers active in Miami & London. Check quota availability."
            />
          </Form.Item>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-3">
            This notice will be transmitted instantly to WhatsApp & Telegram channels of all 6 active broker partners.
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setBroadcastModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold"
            >
              Transmit Broadcast
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ================= MODAL: COMMAND PALETTE ================= */}
      <Modal
        title="Quick Search & Actions"
        open={commandPaletteOpen}
        onCancel={() => setCommandPaletteOpen(false)}
        footer={null}
        destroyOnHidden
        width={600}
      >
        <div className="space-y-3">
          <Input
            prefix={<SearchOutlined className="text-slate-400" />}
            placeholder="Type a command or search prospects, brokers, deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm h-10"
            autoFocus
          />

          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider px-1">
            Quick Navigation & Actions
          </div>

          <div className="space-y-1">
            <div
              onClick={() => {
                setActiveTab("leads");
                setCommandPaletteOpen(false);
              }}
              className="p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <ThunderboltOutlined className="text-amber-600" />
                <span className="font-semibold text-slate-900">Go to Leads Dispatch Queue</span>
              </div>
              <Tag color="gold">Leads</Tag>
            </div>

            <div
              onClick={() => {
                handleSimulateInboundLead();
                setCommandPaletteOpen(false);
              }}
              className="p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <ExperimentOutlined className="text-purple-600" />
                <span className="font-semibold text-slate-900">Simulate Real Inbound Lead Webhook</span>
              </div>
              <Tag color="purple">Action</Tag>
            </div>

            <div
              onClick={() => {
                handleExportCsv();
                setCommandPaletteOpen(false);
              }}
              className="p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <DownloadOutlined className="text-emerald-600" />
                <span className="font-semibold text-slate-900">Export Complete Financial & Lead CSV</span>
              </div>
              <Tag color="green">Export</Tag>
            </div>

            <div
              onClick={() => {
                setActiveTab("subscriptions");
                setCommandPaletteOpen(false);
              }}
              className="p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <ApartmentOutlined className="text-blue-600" />
                <span className="font-semibold text-slate-900">Inspect Broker Quotas & Capacity</span>
              </div>
              <Tag color="blue">Quotas</Tag>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
