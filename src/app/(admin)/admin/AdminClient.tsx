"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  Tag,
  Button,
  Card,
  Row,
  Col,
  Statistic,
  Tabs,
  Badge,
  Space,
  Select,
  Input,
  Modal,
  App,
} from "antd";
import type { TableColumnsType } from "antd";
import {
  Layers,
  TrendingUp,
  Building2,
  Users,
  Search,
  CheckCircle,
  Clock,
  Send,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// ================= DUMMY STATE DATA =================
interface LeadItem {
  key: string;
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

interface SubscriptionItem {
  key: string;
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

interface OrderItem {
  key: string;
  orderId: string;
  clientName: string;
  projectDomain: string;
  templateName: string;
  orderType: "Turnkey 48h" | "Source Code";
  amount: string;
  slaRemaining: string;
  stage: "Domain & DNS" | "Stripe Config" | "Deployed Live" | "Delivered";
  status: "In Progress" | "Completed";
}

interface PartnerItem {
  key: string;
  agentName: string;
  territory: string;
  dealsClosed: number;
  grossCommission: string;
  agentEarnings: string;
  platformCut: string;
  split: string;
  status: "Active" | "Pending Review";
}

const INITIAL_LEADS: LeadItem[] = [
  {
    key: "1",
    id: "LEAD-9041",
    fullName: "Marcus Weber",
    whatsapp: "+1 305 892 4402",
    territory: "Miami, USA",
    propertyType: "3-Bed Ocean Villa",
    budget: "$4,600 / mo",
    moveIn: "Under 30 days",
    status: "new",
    date: "10 mins ago",
  },
  {
    key: "2",
    id: "LEAD-9040",
    fullName: "Tariq Al-Kuwari",
    whatsapp: "+974 5512 8899",
    territory: "Doha & Dubai, GCC",
    propertyType: "The Pearl Luxury Penthouse",
    budget: "$5,800 / mo",
    moveIn: "Immediate",
    status: "dispatched",
    assignedBroker: "Al-Mirqab Real Estate (Gold)",
    date: "45 mins ago",
  },
  {
    key: "3",
    id: "LEAD-9039",
    fullName: "Elena Rostova",
    whatsapp: "+44 7911 334112",
    territory: "London, UK",
    propertyType: "Kensington Luxury Apartment",
    budget: "£4,200 / mo",
    moveIn: "15 days",
    status: "dispatched",
    assignedBroker: "Mayfair Prime Realty (Silver)",
    date: "2 hours ago",
  },
  {
    key: "4",
    id: "LEAD-9038",
    fullName: "Julian Vance",
    whatsapp: "+61 411 123 456",
    territory: "Sydney, Australia",
    propertyType: "Harbour View Residence",
    budget: "A$4,500 / mo",
    moveIn: "Under 30 days",
    status: "new",
    date: "3 hours ago",
  },
];

const INITIAL_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    key: "1",
    brokerName: "Funchal Prime Estates",
    whatsapp: "+351 912 888 777",
    territory: "Madeira, Portugal",
    tier: "Gold",
    quotaDaily: 5,
    deliveredToday: 3,
    monthlyQuota: 150,
    status: "Active",
    nextBilling: "Nov 15, 2026",
  },
  {
    key: "2",
    brokerName: "Al-Mirqab Real Estate",
    whatsapp: "+974 5511 2233",
    territory: "Doha, Qatar",
    tier: "Gold",
    quotaDaily: 5,
    deliveredToday: 5,
    monthlyQuota: 150,
    status: "Active",
    nextBilling: "Nov 18, 2026",
  },
  {
    key: "3",
    brokerName: "Apex Horizon Realty",
    whatsapp: "+971 50 998 8776",
    territory: "Dubai Marina, UAE",
    tier: "Silver",
    quotaDaily: 2,
    deliveredToday: 2,
    monthlyQuota: 60,
    status: "Active",
    nextBilling: "Nov 22, 2026",
  },
];

const INITIAL_ORDERS: OrderItem[] = [
  {
    key: "1",
    orderId: "PGL-ORD-881",
    clientName: "David Silva (Easy Rental Hub)",
    projectDomain: "easyrentalhub.com",
    templateName: "Property Brokerage Multi-Listing",
    orderType: "Turnkey 48h",
    amount: "$199",
    slaRemaining: "18h 30m remaining",
    stage: "Stripe Config",
    status: "In Progress",
  },
  {
    key: "2",
    orderId: "PGL-ORD-880",
    clientName: "Villa Funchal Retreat",
    projectDomain: "funchalretreat.com",
    templateName: "Luxury Villa Direct-Booking Engine",
    orderType: "Turnkey 48h",
    amount: "$199",
    slaRemaining: "Delivered in 28h",
    stage: "Delivered",
    status: "Completed",
  },
  {
    key: "3",
    orderId: "PGL-ORD-879",
    clientName: "Nordic Nomad Stays",
    projectDomain: "Direct Download",
    templateName: "Nomad Coliving Hub",
    orderType: "Source Code",
    amount: "$27",
    slaRemaining: "Instant",
    stage: "Delivered",
    status: "Completed",
  },
];

const INITIAL_PARTNERS: PartnerItem[] = [
  {
    key: "1",
    agentName: "Sofia Martins (Lic. 19042)",
    territory: "Madeira, Portugal",
    dealsClosed: 4,
    grossCommission: "$9,600",
    agentEarnings: "$7,200 (75%)",
    platformCut: "$2,400 (25%)",
    split: "75 / 25",
    status: "Active",
  },
  {
    key: "2",
    agentName: "Hamad Al-Thani Real Estate",
    territory: "Doha, Qatar",
    dealsClosed: 3,
    grossCommission: "QAR 66,000",
    agentEarnings: "QAR 49,500 (75%)",
    platformCut: "QAR 16,500 (25%)",
    split: "75 / 25",
    status: "Active",
  },
];

export function AdminClient() {
  const { message } = App.useApp();
  const [mounted, setMounted] = useState(false);
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [territoryFilter, setTerritoryFilter] = useState<string>("all");
  const [dispatchModalVisible, setDispatchModalVisible] = useState(false);
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDispatch = (lead: LeadItem) => {
    setActiveLead(lead);
    setDispatchModalVisible(true);
  };

  const confirmDispatch = (brokerName: string) => {
    if (!activeLead) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.key === activeLead.key
          ? { ...l, status: "dispatched", assignedBroker: `${brokerName} (Assigned)` }
          : l
      )
    );
    message.success(`Lead successfully dispatched to ${brokerName} via WhatsApp!`);
    setDispatchModalVisible(false);
  };

  const filteredLeads =
    territoryFilter === "all"
      ? leads
      : leads.filter((l) => l.territory.toLowerCase().includes(territoryFilter.toLowerCase()));

  // ================= TABLE COLUMNS =================
  const leadColumns: TableColumnsType<LeadItem> = [
    {
      title: "Lead ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="font-mono font-semibold text-slate-800">{text}</span>,
    },
    {
      title: "Prospect / Contact",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div>
          <div className="font-bold text-slate-900">{record.fullName}</div>
          <div className="text-xs text-slate-500 font-mono">{record.whatsapp}</div>
        </div>
      ),
    },
    {
      title: "Territory",
      dataIndex: "territory",
      key: "territory",
      render: (text) => (
        <Tag color={text.includes("Doha") ? "purple" : text.includes("Madeira") ? "cyan" : "blue"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Requirement & Budget",
      dataIndex: "budget",
      key: "budget",
      render: (_, record) => (
        <div>
          <div className="font-medium text-slate-800 text-xs">{record.propertyType}</div>
          <div className="text-xs font-bold text-emerald-600 font-mono">{record.budget}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        if (status === "new") {
          return <Badge status="processing" text={<span className="font-bold text-amber-600">New Inquiry</span>} />;
        }
        return (
          <div>
            <Badge status="success" text={<span className="text-emerald-700 font-semibold">Dispatched</span>} />
            {record.assignedBroker && (
              <div className="text-[11px] text-slate-400 mt-0.5">{record.assignedBroker}</div>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space orientation="horizontal" size="small">
          {record.status === "new" ? (
            <Button
              type="primary"
              size="small"
              className="bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-md"
              onClick={() => handleDispatch(record)}
            >
              <Send className="w-3 h-3 mr-1 inline" />
              Dispatch Lead
            </Button>
          ) : (
            <Button size="small" disabled className="text-xs rounded-md">
              Dispatched
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const orderColumns: TableColumnsType<OrderItem> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span className="font-mono font-bold text-slate-800">{text}</span>,
    },
    {
      title: "Client & Domain",
      dataIndex: "clientName",
      key: "clientName",
      render: (_, record) => (
        <div>
          <div className="font-bold text-slate-900">{record.clientName}</div>
          <div className="text-xs text-emerald-600 font-mono font-semibold">{record.projectDomain}</div>
        </div>
      ),
    },
    {
      title: "Template System",
      dataIndex: "templateName",
      key: "templateName",
      render: (text) => <span className="text-xs font-medium text-slate-700">{text}</span>,
    },
    {
      title: "Type & Fee",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <div>
          <span className="font-bold text-slate-900">{record.amount}</span>
          <span className="text-xs text-slate-400 block">{record.orderType}</span>
        </div>
      ),
    },
    {
      title: "48-Hour SLA Timer",
      dataIndex: "slaRemaining",
      key: "slaRemaining",
      render: (text, record) => (
        <Tag color={record.status === "Completed" ? "green" : "warning"} className="font-mono text-xs">
          <Clock className="w-3 h-3 mr-1 inline" />
          {text}
        </Tag>
      ),
    },
    {
      title: "Deployment Stage",
      dataIndex: "stage",
      key: "stage",
      render: (stage) => <Tag color="blue">{stage}</Tag>,
    },
  ];

  const subColumns: TableColumnsType<SubscriptionItem> = [
    {
      title: "Broker Organization",
      dataIndex: "brokerName",
      key: "brokerName",
      render: (_, record) => (
        <div>
          <div className="font-bold text-slate-900">{record.brokerName}</div>
          <div className="text-xs text-slate-500 font-mono">{record.whatsapp}</div>
        </div>
      ),
    },
    {
      title: "Territory",
      dataIndex: "territory",
      key: "territory",
      render: (text) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: "Plan Tier",
      dataIndex: "tier",
      key: "tier",
      render: (tier) => (
        <Tag color={tier === "Gold" ? "gold" : "blue"} className="font-bold">
          {tier} ({tier === "Gold" ? "5/day" : "2/day"})
        </Tag>
      ),
    },
    {
      title: "Today Quota",
      key: "quota",
      render: (_, record) => (
        <div className="font-mono font-semibold">
          <span className={record.deliveredToday >= record.quotaDaily ? "text-emerald-600 font-bold" : "text-amber-600"}>
            {record.deliveredToday}
          </span>
          <span className="text-slate-400"> / {record.quotaDaily} leads</span>
        </div>
      ),
    },
    {
      title: "Next Renewal",
      dataIndex: "nextBilling",
      key: "nextBilling",
      render: (text) => <span className="text-xs text-slate-600 font-mono">{text}</span>,
    },
  ];

  const partnerColumns: TableColumnsType<PartnerItem> = [
    {
      title: "Partner Agent",
      dataIndex: "agentName",
      key: "agentName",
      render: (text) => <span className="font-bold text-slate-900">{text}</span>,
    },
    {
      title: "Territory",
      dataIndex: "territory",
      key: "territory",
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Deals Closed",
      dataIndex: "dealsClosed",
      key: "dealsClosed",
      render: (val) => <span className="font-bold text-slate-900 font-mono">{val} Deals</span>,
    },
    {
      title: "Gross Commission",
      dataIndex: "grossCommission",
      key: "grossCommission",
      render: (val) => <span className="font-mono font-semibold text-slate-800">{val}</span>,
    },
    {
      title: "Agent Payout (75%)",
      dataIndex: "agentEarnings",
      key: "agentEarnings",
      render: (val) => <span className="font-mono font-bold text-emerald-600">{val}</span>,
    },
    {
      title: "PropGrowth Cut (25%)",
      dataIndex: "platformCut",
      key: "platformCut",
      render: (val) => <span className="font-mono font-bold text-purple-600">{val}</span>,
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-emerald-400 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Loading Operations Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white py-4 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">
            PG
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white m-0 leading-tight">
              Prop<span className="text-amber-400">Growth</span> <span className="text-slate-400 font-semibold">Lab</span> · Enterprise Operations Center
            </h1>
            <p className="text-[11px] text-slate-400 font-mono m-0">
              Worldwide Territory & Lead Dispatch Management Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/">
            <Button size="small" className="bg-slate-800 text-slate-200 border-slate-700 hover:text-white rounded-md text-xs">
              <ExternalLink className="w-3 h-3 mr-1 inline" />
              Public Portal
            </Button>
          </Link>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        </div>
      </header>

      {/* Main Container */}
      <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* ================= KPI CARDS ================= */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-2xl border border-slate-200 shadow-xs bg-white">
              <Statistic
                title={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Active Subscriptions</span>}
                value={18}
                suffix={<span className="text-xs text-slate-400 font-normal">Brokers</span>}
                styles={{ content: { color: "#00B686", fontWeight: "900", fontFamily: "monospace" } }}
              />
              <p className="text-[11px] text-slate-500 mt-2 m-0">$7,480 / month recurring quota revenue</p>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-2xl border border-slate-200 shadow-xs bg-white">
              <Statistic
                title={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Daily Leads Dispatched</span>}
                value={38}
                suffix={<span className="text-xs text-slate-400 font-normal">/ 45 Target</span>}
                styles={{ content: { color: "#F59E0B", fontWeight: "900", fontFamily: "monospace" } }}
              />
              <p className="text-[11px] text-slate-500 mt-2 m-0">84% quota fulfilled today</p>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-2xl border border-slate-200 shadow-xs bg-white">
              <Statistic
                title={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Turnkey 48h Deliveries</span>}
                value={3}
                suffix={<span className="text-xs text-slate-400 font-normal">In Flight</span>}
                styles={{ content: { color: "#3B82F6", fontWeight: "900", fontFamily: "monospace" } }}
              />
              <p className="text-[11px] text-slate-500 mt-2 m-0">Includes Easy Rental Hub ($199 SLA)</p>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="rounded-2xl border border-slate-200 shadow-xs bg-white">
              <Statistic
                title={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Co-Broker Revenue Split</span>}
                value={"$18,900"}
                styles={{ content: { color: "#8B5CF6", fontWeight: "900", fontFamily: "monospace" } }}
              />
              <p className="text-[11px] text-slate-500 mt-2 m-0">Platform 25% share: $4,725</p>
            </Card>
          </Col>
        </Row>

        {/* ================= OPERATIONAL TABS ================= */}
        <Card className="rounded-2xl border border-slate-200 shadow-xs bg-white p-2">
          <Tabs
            defaultActiveKey="leads"
            items={[
              {
                key: "leads",
                label: (
                  <span className="font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Daily Lead Dispatcher
                  </span>
                ),
                children: (
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 m-0">Incoming Inquiries</h3>
                        <p className="text-xs text-slate-500 m-0">
                          Route pre-screened tenant & buyer leads to registered territory brokers
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Select
                          value={territoryFilter}
                          onChange={setTerritoryFilter}
                          className="w-48 text-xs"
                          options={[
                            { value: "all", label: "All Territories (Worldwide)" },
                            { value: "usa", label: "USA (Miami / NY / LA)" },
                            { value: "uk", label: "UK (London & Prime)" },
                            { value: "canada", label: "Canada (Toronto / Van)" },
                            { value: "australia", label: "Australia (Sydney / Melb)" },
                            { value: "europe", label: "Europe (Portugal / Spain)" },
                            { value: "uae", label: "UAE & GCC (Dubai / Doha)" },
                          ]}
                        />
                      </div>
                    </div>

                    <Table
                      columns={leadColumns}
                      dataSource={filteredLeads}
                      pagination={{ pageSize: 5 }}
                      scroll={{ x: 800 }}
                    />
                  </div>
                ),
              },
              {
                key: "turnkey",
                label: (
                  <span className="font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Turnkey 48h Orders & Client Systems
                  </span>
                ),
                children: (
                  <div className="space-y-4 pt-2">
                    <div className="pb-3 border-b border-slate-100">
                      <h3 className="text-base font-bold text-slate-900 m-0">Turnkey Deployments & Code Purchases</h3>
                      <p className="text-xs text-slate-500 m-0">
                        Tracks 48-Hour delivery SLA for client projects like Easy Rental Hub
                      </p>
                    </div>

                    <Table
                      columns={orderColumns}
                      dataSource={INITIAL_ORDERS}
                      pagination={{ pageSize: 5 }}
                      scroll={{ x: 800 }}
                    />
                  </div>
                ),
              },
              {
                key: "subscriptions",
                label: (
                  <span className="font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    Broker Quota Subscriptions
                  </span>
                ),
                children: (
                  <div className="space-y-4 pt-2">
                    <div className="pb-3 border-b border-slate-100">
                      <h3 className="text-base font-bold text-slate-900 m-0">Active Broker Quota Ledgers</h3>
                      <p className="text-xs text-slate-500 m-0">
                        Daily delivery status and billing cycles across global Tier-1 partner territories (USA, UK, EU, UAE)
                      </p>
                    </div>

                    <Table
                      columns={subColumns}
                      dataSource={INITIAL_SUBSCRIPTIONS}
                      pagination={{ pageSize: 5 }}
                      scroll={{ x: 800 }}
                    />
                  </div>
                ),
              },
              {
                key: "cobroker",
                label: (
                  <span className="font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                    <Users className="w-4 h-4 text-purple-600" />
                    Co-Broker Commission Ledger
                  </span>
                ),
                children: (
                  <div className="space-y-4 pt-2">
                    <div className="pb-3 border-b border-slate-100">
                      <h3 className="text-base font-bold text-slate-900 m-0">Partner Agent Closing Network</h3>
                      <p className="text-xs text-slate-500 m-0">
                        70/30 commission splits and escrow payout verification
                      </p>
                    </div>

                    <Table
                      columns={partnerColumns}
                      dataSource={INITIAL_PARTNERS}
                      pagination={{ pageSize: 5 }}
                      scroll={{ x: 800 }}
                    />
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>

      {/* ================= DISPATCH LEAD MODAL ================= */}
      <Modal
        title={
          <div className="font-bold text-slate-900 text-sm">
            Dispatch Lead to Active Territory Subscriber
          </div>
        }
        open={dispatchModalVisible}
        onCancel={() => setDispatchModalVisible(false)}
        footer={null}
      >
        {activeLead && (
          <div className="py-3 space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900 text-sm">{activeLead.fullName}</p>
              <p className="text-slate-500 font-mono">{activeLead.whatsapp}</p>
              <div className="mt-2 text-slate-700">
                <strong>Property:</strong> {activeLead.propertyType} ({activeLead.budget})
              </div>
              <div className="text-slate-700">
                <strong>Territory:</strong> {activeLead.territory} · <strong>Move-in:</strong> {activeLead.moveIn}
              </div>
            </div>

            <div>
              <p className="font-bold text-slate-800 mb-2">Select Active Broker to Receive WhatsApp Ping:</p>
              <div className="space-y-2">
                {INITIAL_SUBSCRIPTIONS.filter((s) =>
                  s.territory.toLowerCase().includes(activeLead.territory.split(",")[0].toLowerCase())
                ).map((sub) => (
                  <div
                    key={sub.key}
                    onClick={() => confirmDispatch(sub.brokerName)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{sub.brokerName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Quota Today: {sub.deliveredToday}/{sub.quotaDaily} Delivered
                      </p>
                    </div>
                    <Button size="small" type="primary" className="bg-emerald-600 font-bold text-xs rounded-md">
                      Dispatch
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminClient;
