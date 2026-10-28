export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  propertyType: string;
  location: string;
  flag: string;
  duration: string;
  heroImage: string;
  badge: string;
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  executiveSummary: string;
  clientQuote: string;
  clientAuthor: string;
  clientRole: string;
  challenges: {
    title: string;
    description: string;
  }[];
  solutions: {
    title: string;
    description: string;
  }[];
  techStack: string[];
  keyOutcomes: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "serena-bali-villas",
    title: "Serena Cliffside Villas",
    subtitle: "Scaling direct guest bookings from 14% to 68% and eliminating $52,400 in annual OTA commission bleed.",
    propertyType: "Luxury 5-Key Cliffside Villa Estate",
    location: "Uluwatu, Bali, Indonesia",
    flag: "🇮🇩",
    duration: "6 Months",
    heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
    badge: "Direct Booking Engine",
    metrics: [
      { label: "Direct Booking Share", value: "68%", sublabel: "+385% increase from 14%" },
      { label: "OTA Fees Saved", value: "$52,400", sublabel: "Retained directly by owner" },
      { label: "Page Load Speed", value: "0.38s", sublabel: "Sub-second Next.js engine" },
      { label: "Average Stay Value", value: "$4,250", sublabel: "+22% RevPAR increase" },
    ],
    executiveSummary:
      "Serena Cliffside Villas is a 5-suite ultra-luxury private sanctuary perched above Uluwatu's surf breaks. Despite near 80% occupancy, over $4,000 to $5,000 every month was evaporating in intermediary fees to Airbnb and Booking.com. PropGrowth Lab engineered an institutional direct booking engine, automated VIP WhatsApp concierge routing, and tailored high-net-worth guest acquisition funnels, fundamentally reclaiming margin control.",
    clientQuote:
      "Before PropGrowth Lab, Airbnb and Booking.com were taking over $4,000 every month from our hard-earned villa revenue. Within 90 days of launching our direct booking engine, high-net-worth guests began booking direct on WhatsApp and Stripe with zero hesitation. Our calendar is thriving, and our net profit margin surged.",
    clientAuthor: "Made Wardana",
    clientRole: "Managing Director · Serena Hospitality",
    challenges: [
      {
        title: "Excessive OTA Intermediary Bleed",
        description:
          "OTA commission fees between 18% and 22% were silently stripping away more than $50,000 each year that could otherwise fund staff retention and capital expansion.",
      },
      {
        title: "Zero Guest Data Ownership",
        description:
          "OTAs masked guest email addresses and contact information, preventing the villa team from running seasonal re-booking campaigns or creating VIP loyalty member perks.",
      },
      {
        title: "Slow, Outdated Legacy CMS",
        description:
          "Their previous WordPress booking site took 4.2 seconds to load on mobile connections, causing 65%+ bounce rates among discerning affluent international travelers.",
      },
    ],
    solutions: [
      {
        title: "Sub-Second Next.js Direct Booking Engine",
        description:
          "Engineered a lightning-fast React 19 + Next.js platform with instant iCal calendar two-way synchronization to prevent double-bookings while accepting Stripe deposits in seconds.",
      },
      {
        title: "Instant Luxury WhatsApp Concierge",
        description:
          "Configured a pre-populated WhatsApp reservation desk with 90-second SLA response triggers, handling custom chef itineraries, private helicopter transfers, and villa buyouts.",
      },
      {
        title: "High-Ticket Guest Acquisition Funnel",
        description:
          "Deployed laser-targeted Meta campaigns targeting affluent Australian and European travelers searching for private luxury Bali retreats, driving traffic directly into the booking engine.",
      },
    ],
    techStack: ["Next.js 16 App Router", "Tailwind CSS v4", "Stripe Connect", "WhatsApp Business API", "iCal Dual-Sync"],
    keyOutcomes: [
      "Direct booking revenue grew from $11,000/mo to $48,000/mo within two quarters.",
      "Completely bypassed OTA commission on 68% of guest stays.",
      "Customer lifetime value increased by 31% via automated return-guest WhatsApp perks.",
    ],
  },
  {
    slug: "horizon-chalet-alps",
    title: "Chalet Horizon",
    subtitle: "Generating $180,000 in direct winter season GMV with zero intermediary commissions and automated concierge routing.",
    propertyType: "Private 7-Bedroom Ski Chalet",
    location: "Zermatt, Swiss Alps",
    flag: "🇨🇭",
    duration: "4 Months (Peak Winter)",
    heroImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    badge: "Alpine Luxury Portal",
    metrics: [
      { label: "Direct Winter GMV", value: "$180,000", sublabel: "Zero commission deducted" },
      { label: "Direct Booking Share", value: "79%", sublabel: "Up from 22% prior winter" },
      { label: "Concierge Response", value: "<90 sec", sublabel: "WhatsApp automated routing" },
      { label: "Repeat Guest Retention", value: "41%", sublabel: "VIP seasonal early-access" },
    ],
    executiveSummary:
      "Chalet Horizon is a premier 7-bedroom ski-in/ski-out chalet in Zermatt commanding $1,500 to $2,800/night. Relying on luxury holiday aggregators meant sacrificing up to $15,000 monthly in platform cuts. PropGrowth Lab designed a high-converting digital showroom featuring 3D virtual walkthroughs, direct wire/crypto payment rails, and an automated private guest re-booking loop.",
    clientQuote:
      "Ski guests booking multi-thousand dollar weekly stays demand instant, bespoke concierge service. PropGrowth Lab built us an ultra-luxury digital presence that matches our physical property. Our peak winter weeks were fully booked direct before December even arrived.",
    clientAuthor: "Christian Sommer",
    clientRole: "Host & Principal Owner · Chalet Horizon",
    challenges: [
      {
        title: "Massive Commission Cuts on High Tickets",
        description:
          "When a guest books a 7-night winter buyout for $18,000, paying a 15–20% aggregator fee felt punitive for a boutique property that provides 100% of the hospitality.",
      },
      {
        title: "Complex Multi-Tier Guest Requests",
        description:
          "Affluent alpine travelers require private ski instructors, helicopter airport pick-ups from Zurich/Geneva, and in-chalet private chefs—requests that generic OTA forms cannot handle.",
      },
      {
        title: "Pre-Season Booking Window Drop-off",
        description:
          "Failing to engage previous winter guests early resulted in empty weeks during prime January powder conditions before last-minute discounted OTA fills.",
      },
    ],
    solutions: [
      {
        title: "Interactive 3D Walkthrough & Floorplans",
        description:
          "Integrated sub-second Matterport 3D digital twins and room-by-room floorplans allowing guests to preview mountain views and ski lockers before committing.",
      },
      {
        title: "Bespoke Multi-Currency Payment Rails",
        description:
          "Enabled split deposits via Stripe, SEPA bank transfers, and wire invoices for corporate ski retreats with zero transaction friction.",
      },
      {
        title: "Automated VIP Alumni Priority Window",
        description:
          "Launched a private WhatsApp VIP early-access campaign giving previous year guests a 72-hour priority reservation window before public calendar release.",
      },
    ],
    techStack: ["Next.js 16 App Router", "Tailwind CSS v4", "Matterport SDK", "Stripe Corporate", "Resend CRM Engine"],
    keyOutcomes: [
      "$180,000 in gross booking value captured directly with zero OTA intermediary deductions.",
      "Winter season reached 96% occupancy across peak holiday dates.",
      "Over 40% of winter reservations locked in by repeating guests via private WhatsApp dispatch.",
    ],
  },
  {
    slug: "villa-marbella-resort",
    title: "The Palms Villa Estate",
    subtitle: "360° paid guest acquisition and luxury booking funnel scaling direct annual occupancy to 92% across all seasons.",
    propertyType: "Mediterranean 8-Suite Luxury Estate",
    location: "Golden Mile, Marbella, Spain",
    flag: "🇪🇸",
    duration: "8 Months",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    badge: "Full Growth Retainer",
    metrics: [
      { label: "Annual Direct Occupancy", value: "92%", sublabel: "Consistent across shoulder months" },
      { label: "OTA Commission Saved", value: "$76,800", sublabel: "Annual net cash savings" },
      { label: "Paid Ad ROAS", value: "7.8x", sublabel: "Direct return on media spend" },
      { label: "Mobile Conversion Rate", value: "4.9%", sublabel: "3.1x above industry average" },
    ],
    executiveSummary:
      "The Palms Villa Estate is an 8-suite luxury compound in Marbella's Golden Mile. Despite strong peak summer demand, shoulder seasons experienced steep revenue drops due to OTA algorithmic downranking. PropGrowth Lab implemented our Full Growth ($697/mo) engine: bespoke Next.js direct portal, targeted Meta luxury ads in high-wealth European corridors, and automated high-ticket WhatsApp lead nurturing.",
    clientQuote:
      "We were skeptical about running paid advertising for a luxury villa until PropGrowth Lab deployed their growth system. Our calendar is booked 6 months ahead, shoulder season vacancy is eliminated, and we retain 100% direct relationships with every guest.",
    clientAuthor: "Elena Ruiz",
    clientRole: "Managing Director · The Palms Marbella",
    challenges: [
      {
        title: "Severe Shoulder-Season Revenue Cliffs",
        description:
          "During October–April, OTAs drastically cut organic visibility unless owners agree to steep 30–40% last-minute promotional discounts.",
      },
      {
        title: "High Paid Traffic Drop-off on Generic Sites",
        description:
          "Previous ad campaigns directed clicks to slow generic landing pages without localized currency, instant checkout, or social proof, burning ad budget with zero ROI.",
      },
      {
        title: "Manual Inefficient Inquiry Follow-ups",
        description:
          "Inquiries through email contact forms took 6 to 12 hours to receive a response, by which time high-intent luxury vacationers had already booked rival properties.",
      },
    ],
    solutions: [
      {
        title: "Full-Funnel High-Net-Worth Paid Acquisition",
        description:
          "Architected Meta & Google campaigns specifically targeting golf groups, family reunions, and executive remote work retreats across London, Munich, and Stockholm.",
      },
      {
        title: "Frictionless Mobile-First Apple Pay Checkout",
        description:
          "Crafted a mobile-optimized reservation experience with 1-tap Apple Pay / Google Pay split deposits and real-time live availability calendar.",
      },
      {
        title: "15-Minute Lead Recovery Automation",
        description:
          "Deployed intelligent SMS and WhatsApp sequence re-engaging uncompleted booking sessions within 15 minutes, recovering 28% of abandoned checkouts.",
      },
    ],
    techStack: ["Next.js 16 App Router", "Tailwind CSS v4", "Meta Ads CAPI", "Stripe Elements", "Twilio / WhatsApp API"],
    keyOutcomes: [
      "Achieved sustained 92% occupancy across entire 12-month calendar cycle.",
      "Delivered a verified 7.8x return on paid media spend across $320k in direct bookings.",
      "Eliminated $76,800 in third-party platform commissions in year one.",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}

