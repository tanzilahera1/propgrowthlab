export interface TerritoryData {
  id: string;
  name: string;
  shortName: string;
  country: string;
  flag: string;
  currency: string;
  currencyCode: string;
  slotsRemaining: number;
  totalBrokers: number;
  avgDealSize: string;
  avgSaleCommission: string;
  activeLeadsMonthly: string;
  cities: string[];
  keyDistricts: string[];
  starterPrice: number;
  goldPrice: number;
  platinumPrice: number;
  description: string;
  leadVolumeBreakdown: {
    tenantsPct: string;
    buyersPct: string;
    corporatePct: string;
  };
  sampleRecentLeads: {
    role: string;
    budget: string;
    location: string;
    verifiedTime: string;
  }[];
}

export const TERRITORIES_DATA: TerritoryData[] = [
  {
    id: "usa",
    name: "USA (Miami, New York, Los Angeles)",
    shortName: "United States",
    country: "USA",
    flag: "🇺🇸",
    currency: "$",
    currencyCode: "USD",
    slotsRemaining: 3,
    totalBrokers: 8,
    avgDealSize: "$4,200 / mo",
    avgSaleCommission: "$24,500",
    activeLeadsMonthly: "450+",
    cities: ["Miami", "New York", "Los Angeles", "Austin", "Scottsdale"],
    keyDistricts: ["Brickell & South Beach", "Manhattan & Brooklyn", "Beverly Hills & West Hollywood"],
    starterPrice: 99,
    goldPrice: 199,
    platinumPrice: 499,
    description: "Prime residential & high-ticket luxury rental dispatches across Tier-1 US metropolitan corridors.",
    leadVolumeBreakdown: {
      tenantsPct: "48%",
      buyersPct: "37%",
      corporatePct: "15%",
    },
    sampleRecentLeads: [
      { role: "Executive Relocation", budget: "$7,500/mo", location: "Brickell, Miami", verifiedTime: "12m ago" },
      { role: "Cash Buyer · 3BR Penthouse", budget: "$1.85M", location: "Tribeca, NYC", verifiedTime: "34m ago" },
      { role: "Luxury Lease · Villa", budget: "$12,000/mo", location: "Beverly Hills, LA", verifiedTime: "1h ago" },
    ],
  },
  {
    id: "uk",
    name: "UK (London & Prime Home Counties)",
    shortName: "United Kingdom",
    country: "UK",
    flag: "🇬🇧",
    currency: "£",
    currencyCode: "GBP",
    slotsRemaining: 2,
    totalBrokers: 6,
    avgDealSize: "£3,100 / mo",
    avgSaleCommission: "£18,200",
    activeLeadsMonthly: "320+",
    cities: ["London", "Surrey", "Manchester", "Edinburgh", "Cotswolds"],
    keyDistricts: ["Mayfair & Kensington", "Canary Wharf & City", "Richmond & Chelsea"],
    starterPrice: 79,
    goldPrice: 159,
    platinumPrice: 399,
    description: "High-net-worth tenant and corporate buyer acquisitions across Central London and affluent commuter zones.",
    leadVolumeBreakdown: {
      tenantsPct: "52%",
      buyersPct: "33%",
      corporatePct: "15%",
    },
    sampleRecentLeads: [
      { role: "Corporate Director · 2BR", budget: "£4,500/mo", location: "Kensington, London", verifiedTime: "8m ago" },
      { role: "HNW Cash Investor", budget: "£1.2M", location: "Richmond upon Thames", verifiedTime: "45m ago" },
      { role: "Tech Founder · Luxury Flat", budget: "£5,200/mo", location: "Canary Wharf, London", verifiedTime: "2h ago" },
    ],
  },
  {
    id: "canada",
    name: "Canada (Toronto & Vancouver)",
    shortName: "Canada",
    country: "Canada",
    flag: "🇨🇦",
    currency: "C$",
    currencyCode: "CAD",
    slotsRemaining: 2,
    totalBrokers: 5,
    avgDealSize: "C$3,200 / mo",
    avgSaleCommission: "C$22,000",
    activeLeadsMonthly: "280+",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    keyDistricts: ["Yorkville & Financial District", "Yaletown & West Vancouver", "Ville-Marie & Westmount"],
    starterPrice: 135,
    goldPrice: 269,
    platinumPrice: 679,
    description: "Pre-screened executive relocation and investor acquisitions across GTA and Greater Vancouver hubs.",
    leadVolumeBreakdown: {
      tenantsPct: "50%",
      buyersPct: "35%",
      corporatePct: "15%",
    },
    sampleRecentLeads: [
      { role: "Biotech Executive · Condo", budget: "C$4,800/mo", location: "Yorkville, Toronto", verifiedTime: "19m ago" },
      { role: "Detached Waterfront Buyer", budget: "C$2.4M", location: "West Vancouver", verifiedTime: "52m ago" },
      { role: "Medical Professional Lease", budget: "C$3,600/mo", location: "Downtown Montreal", verifiedTime: "1h ago" },
    ],
  },
  {
    id: "australia",
    name: "Australia (Sydney & Melbourne)",
    shortName: "Australia",
    country: "Australia",
    flag: "🇦🇺",
    currency: "A$",
    currencyCode: "AUD",
    slotsRemaining: 2,
    totalBrokers: 6,
    avgDealSize: "A$3,400 / mo",
    avgSaleCommission: "A$26,000",
    activeLeadsMonthly: "310+",
    cities: ["Sydney", "Melbourne", "Brisbane", "Gold Coast", "Perth"],
    keyDistricts: ["Eastern Suburbs & CBD", "South Yarra & Toorak", "Main Beach & Broadbeach"],
    starterPrice: 149,
    goldPrice: 299,
    platinumPrice: 749,
    description: "High-intent coastal luxury buyers, penthouses, and premium long-let executive tenants.",
    leadVolumeBreakdown: {
      tenantsPct: "45%",
      buyersPct: "42%",
      corporatePct: "13%",
    },
    sampleRecentLeads: [
      { role: "Harbourfront Apartment Lease", budget: "A$1,800/wk", location: "Point Piper, Sydney", verifiedTime: "14m ago" },
      { role: "Pre-approved House Buyer", budget: "A$2.8M", location: "Toorak, Melbourne", verifiedTime: "39m ago" },
      { role: "Coastal Penthouse Buyer", budget: "A$1.95M", location: "Main Beach, Gold Coast", verifiedTime: "3h ago" },
    ],
  },
  {
    id: "europe",
    name: "EU (Portugal, Spain, France)",
    shortName: "European Union",
    country: "Europe",
    flag: "🇪🇺",
    currency: "€",
    currencyCode: "EUR",
    slotsRemaining: 3,
    totalBrokers: 7,
    avgDealSize: "€2,600 / mo",
    avgSaleCommission: "€19,500",
    activeLeadsMonthly: "380+",
    cities: ["Lisbon / Algarve", "Marbella / Madrid", "Paris / French Riviera", "Milan", "Mallorca"],
    keyDistricts: ["Cascais & Quinta do Lago", "Golden Mile Marbella", "8th Arrondissement Paris"],
    starterPrice: 89,
    goldPrice: 179,
    platinumPrice: 449,
    description: "Golden Visa, luxury villa buyers, digital nomad executives, and premium holiday-let investors.",
    leadVolumeBreakdown: {
      tenantsPct: "44%",
      buyersPct: "46%",
      corporatePct: "10%",
    },
    sampleRecentLeads: [
      { role: "Golden Visa Villa Buyer", budget: "€850,000", location: "Cascais, Portugal", verifiedTime: "6m ago" },
      { role: "Luxury Summer Lease", budget: "€6,500/mo", location: "Golden Mile, Marbella", verifiedTime: "28m ago" },
      { role: "Expat Tech Executive", budget: "€3,200/mo", location: "Lisbon City Center", verifiedTime: "1h ago" },
    ],
  },
  {
    id: "uae",
    name: "UAE & GCC (Dubai & Abu Dhabi)",
    shortName: "UAE & GCC",
    country: "UAE",
    flag: "🇦🇪",
    currency: "$",
    currencyCode: "USD",
    slotsRemaining: 2,
    totalBrokers: 9,
    avgDealSize: "$4,800 / mo",
    avgSaleCommission: "$32,000",
    activeLeadsMonthly: "520+",
    cities: ["Dubai", "Abu Dhabi", "Doha", "Ras Al Khaimah"],
    keyDistricts: ["Palm Jumeirah & Downtown Dubai", "Dubai Hills & DIFC", "Saadiyat Island Abu Dhabi"],
    starterPrice: 99,
    goldPrice: 199,
    platinumPrice: 499,
    description: "Global ultra-high-net-worth investors, off-plan villa buyers, and VIP executive rentals.",
    leadVolumeBreakdown: {
      tenantsPct: "38%",
      buyersPct: "52%",
      corporatePct: "10%",
    },
    sampleRecentLeads: [
      { role: "Off-Plan Villa Investor", budget: "$1.4M", location: "Dubai Hills Estate", verifiedTime: "4m ago" },
      { role: "Penthouse Annual Lease", budget: "$80,000/yr", location: "Palm Jumeirah, Dubai", verifiedTime: "22m ago" },
      { role: "Crypto Founder Relocation", budget: "$7,000/mo", location: "DIFC, Dubai", verifiedTime: "1h ago" },
    ],
  },
];

export function getTerritoryById(id: string): TerritoryData | undefined {
  return TERRITORIES_DATA.find((t) => t.id.toLowerCase() === id.toLowerCase());
}

export function getAllTerritoryIds(): string[] {
  return TERRITORIES_DATA.map((t) => t.id);
}

