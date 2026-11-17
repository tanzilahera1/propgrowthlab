export type CascaderOption = {
  value: string;
  label: string;
  children?: CascaderOption[];
  "aria-label"?: string;
  "data-title"?: string;
  badge?: string;
  territoryCode?: string;
  coordinator?: string;
};

// ============================================================================
// GEOGRAPHIC DATA STRUCTURE FOR QATAR & INTERNATIONAL RENTAL HUBS
// (Country > Municipality > Area)
// ============================================================================
export interface AreaData {
  name: string;
  territoryCode?: string;
  isPopular?: boolean;
}

export interface MunicipalityData {
  name: string;
  areas: AreaData[];
}

export interface CountryGeographyData {
  countryName: string;
  countryCode: string;
  flag: string;
  municipalities: MunicipalityData[];
}

// ----------------------------------------------------------------------------
// QATAR: ALL 8 OFFICIAL MUNICIPALITIES & VERIFIED EXPATS/RENTAL AREAS
// ----------------------------------------------------------------------------
export const QATAR_GEOGRAPHY: CountryGeographyData = {
  countryName: "Qatar",
  countryCode: "QA",
  flag: "🇶🇦",
  municipalities: [
    {
      name: "Doha",
      areas: [
        { name: "Madinat Khalifa North", territoryCode: "QA-DOH-KHN-01", isPopular: true },
        { name: "Madinat Khalifa South", territoryCode: "QA-DOH-KHS-01", isPopular: true },
        { name: "Dafna (West Bay)", territoryCode: "QA-DOH-DAF-01", isPopular: true },
        { name: "Bin Omran", territoryCode: "QA-DOH-BOM-01", isPopular: true },
        { name: "Al Sadd", territoryCode: "QA-DOH-SAD-01", isPopular: true },
        { name: "Najma", territoryCode: "QA-DOH-NAJ-01", isPopular: true },
        { name: "Mansoura", territoryCode: "QA-DOH-MAN-01", isPopular: true },
        { name: "Bin Mahmoud", territoryCode: "QA-DOH-MAH-01", isPopular: true },
        { name: "Old Airport (Al Matar Al Qadeem)", territoryCode: "QA-DOH-AIR-01", isPopular: true },
        { name: "Al Duhail South", territoryCode: "QA-DOH-DUH-01", isPopular: true },
        { name: "The Pearl-Qatar", territoryCode: "QA-DOH-PRL-01", isPopular: true },
        { name: "Musheireb (Downtown)", territoryCode: "QA-DOH-MSH-01" },
        { name: "Al Hilal", territoryCode: "QA-DOH-HIL-01" },
        { name: "Umm Ghuwailina", territoryCode: "QA-DOH-UGH-01" },
        { name: "Al Salata & Corniche", territoryCode: "QA-DOH-SLT-01" },
        { name: "Ras Abu Aboud", territoryCode: "QA-DOH-RAA-01" },
        { name: "Al Riffa", territoryCode: "QA-DOH-RIF-01" },
        { name: "West Bay Lagoon (Legtaifiya)", territoryCode: "QA-DOH-LEG-01" },
      ],
    },
    {
      name: "Al Wakrah",
      areas: [
        { name: "Al Wakrah City Center", territoryCode: "QA-WAK-CTY-01", isPopular: true },
        { name: "Al Wukair (Ezdan Villages)", territoryCode: "QA-WAK-WUK-01", isPopular: true },
        { name: "Barwa City", territoryCode: "QA-WAK-BRW-01", isPopular: true },
        { name: "Barwa Village", territoryCode: "QA-WAK-BRV-01" },
        { name: "Mesaieed Residential", territoryCode: "QA-WAK-MSD-01" },
      ],
    },
  ],
};

// ----------------------------------------------------------------------------
// PORTUGAL: MADEIRA & LISBON STRUCTURE (Extensible for International Rollout)
// ----------------------------------------------------------------------------
export const PORTUGAL_GEOGRAPHY: CountryGeographyData = {
  countryName: "Portugal",
  countryCode: "PT",
  flag: "🇵🇹",
  municipalities: [
    {
      name: "Funchal (Madeira)",
      areas: [
        { name: "Lido / São Martinho", territoryCode: "PT-MAD-LID-01", isPopular: true },
        { name: "Sé (Historic Center)", territoryCode: "PT-MAD-SE-01", isPopular: true },
        { name: "Ajuda Tourist Zone", territoryCode: "PT-MAD-AJU-01" },
        { name: "Monte", territoryCode: "PT-MAD-MNT-01" },
        { name: "Santa Maria Maior", territoryCode: "PT-MAD-SMM-01" },
      ],
    },
    {
      name: "Calheta (Madeira)",
      areas: [
        { name: "Arco da Calheta", territoryCode: "PT-MAD-CAL-01", isPopular: true },
        { name: "Calheta Marina & Beach", territoryCode: "PT-MAD-CMB-01" },
        { name: "Estreito da Calheta", territoryCode: "PT-MAD-EDC-01" },
      ],
    },
    {
      name: "Ponta do Sol (Madeira)",
      areas: [
        { name: "Digital Nomad Village", territoryCode: "PT-MAD-PDS-01", isPopular: true },
        { name: "Madalena do Mar", territoryCode: "PT-MAD-MDM-01" },
      ],
    },
    {
      name: "Santa Cruz (Madeira)",
      areas: [
        { name: "Caniço de Baixo", territoryCode: "PT-MAD-CNC-01", isPopular: true },
        { name: "Garajau", territoryCode: "PT-MAD-GAR-01" },
        { name: "Santa Cruz Center", territoryCode: "PT-MAD-STC-01" },
      ],
    },
    {
      name: "Lisbon Region",
      areas: [
        { name: "Baixa / Chiado", territoryCode: "PT-LIS-BXC-01" },
        { name: "Cascais & Estoril", territoryCode: "PT-LIS-CAS-01" },
        { name: "Parque das Nações", territoryCode: "PT-LIS-PDN-01" },
      ],
    },
  ],
};

// ----------------------------------------------------------------------------
// UAE: DUBAI & NORTHERN EMIRATES (Extensible)
// ----------------------------------------------------------------------------
export const UAE_GEOGRAPHY: CountryGeographyData = {
  countryName: "United Arab Emirates",
  countryCode: "AE",
  flag: "🇦🇪",
  municipalities: [
    {
      name: "Dubai",
      areas: [
        { name: "Deira (Naif & Al Rigga)", territoryCode: "AE-DXB-DEI-01", isPopular: true },
        { name: "Bur Dubai (Al Fahidi & Mankhool)", territoryCode: "AE-DXB-BUR-01", isPopular: true },
        { name: "Al Barsha (Near Mall of Emirates)", territoryCode: "AE-DXB-BAR-01", isPopular: true },
        { name: "International City", territoryCode: "AE-DXB-INT-01", isPopular: true },
        { name: "Business Bay & Downtown", territoryCode: "AE-DXB-BBY-01" },
        { name: "Dubai Marina & JLT", territoryCode: "AE-DXB-MAR-01" },
        { name: "Jumeirah Village Circle (JVC)", territoryCode: "AE-DXB-JVC-01" },
        { name: "Al Karama", territoryCode: "AE-DXB-KAR-01" },
      ],
    },
    {
      name: "Abu Dhabi",
      areas: [
        { name: "Corniche & Downtown", territoryCode: "AE-AUH-CRN-01" },
        { name: "Al Reem Island", territoryCode: "AE-AUH-REM-01" },
        { name: "Yas Island", territoryCode: "AE-AUH-YAS-01" },
      ],
    },
    {
      name: "Sharjah",
      areas: [
        { name: "Al Majaz Waterfront", territoryCode: "AE-SHJ-MJZ-01" },
        { name: "Al Nahda (Dubai Border)", territoryCode: "AE-SHJ-NHD-01" },
      ],
    },
  ],
};

// Map of all country geographies for fast retrieval
export const ALL_COUNTRY_GEOGRAPHIES: Record<string, CountryGeographyData> = {
  QA: QATAR_GEOGRAPHY,
  PT: PORTUGAL_GEOGRAPHY,
  AE: UAE_GEOGRAPHY,
};

// ============================================================================
// 2-LAYER DEPENDENT SELECTS ARCHITECTURE (Municipality > Numbered Districts)
// ============================================================================
export interface DistrictOption {
  name: string;
  serialNumber: string; // e.g. "01", "02", ... "75"
  fullName: string;     // e.g. "01. Al Jasrah"
  territoryCode?: string;
  isPopular?: boolean;
}

export interface MunicipalityGroup {
  name: string;
  nameAr?: string;
  districts: DistrictOption[];
}

export function createNumberedDistricts(names: string[], codePrefix: string): DistrictOption[] {
  return names.map((name, index) => {
    const num = String(index + 1).padStart(2, "0");
    const codePart = name.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase();
    return {
      name,
      serialNumber: num,
      fullName: `${num}. ${name}`,
      territoryCode: `${codePrefix}-${codePart}-${num}`,
      isPopular: [
        "Madinat Khalifa North",
        "Madinat Khalifa South",
        "Dafna",
        "Al Sadd",
        "Najma",
        "Al Mansoura",
        "Old Airport",
        "Al Gharrafa",
        "Ain Khaled",
      ].includes(name),
    };
  });
}

// ----------------------------------------------------------------------------
// QATAR LAYER 1 & LAYER 2: MUNICIPALITIES & NUMBERED DOHA AREAS
// Priority Areas 01-06 (Coordinator Core Zones) followed by comprehensive list
// ----------------------------------------------------------------------------
export const DOHA_RAW_DISTRICTS: string[] = [
  "Madinat Khalifa North",
  "Madinat Khalifa South",
  "Al Gharrafa",
  "Al Duhail",
  "Dafna",
  "Bin Omran",
  "Al Jasrah",
  "Al Bidda",
  "Mohamed Bin Jasim",
  "Msheireb",
  "Al Najada",
  "Barahat Al Asmakh",
  "Al Asmakh",
  "Al Eshraq",
  "Al Souq",
  "Wadi Al Sail",
  "Rumeilah",
  "Al Jadayel",
  "Al Salata",
  "Al Mirqab",
  "North Al Hitmi",
  "Fereej Abdel Aziz",
  "Al Doha Al Jadeeda",
  "Old Al Ghanim",
  "Al Rufaa",
  "Old Al Hitmi",
  "As Salatah Al Jadidah",
  "Fereej Bin Dirham",
  "Al Mansoura",
  "Najma",
  "Umm Ghuwailina",
  "Al Khulaifat",
  "Al Hitmi",
  "Doha Port",
  "Fereej Bin Mahmoud",
  "Rawdat Al Khail",
  "Al Muntazah",
  "Nuaija",
  "Al Hilal",
  "Old Airport",
  "Al Thumama",
  "Ras Abu Aboud",
  "Al Mirqab Al Jadid",
  "Fereej Al Nasr",
  "Fereej Al Soudan - Part",
  "Al Sadd",
  "Al Mirqab Al Jadid (Zone 39)",
  "Fereej Al Amir",
  "Luaib",
  "Muraikh",
  "Baaya",
  "Mehairja",
  "Al Waab",
  "Al Aziziya",
  "New Fereej Al Ghanim",
  "Fereej Al Murra",
  "Fereej Al Manaseer",
  "Bu Sidra",
  "Muaither",
  "Al Sailiya",
  "Al Mearad",
  "Fereej Al Asiri",
  "New Fereej Al Khulaifat",
  "Bu Samra",
  "Al Maamoura",
  "Abu Hamour",
  "Mesaimeer",
  "Ain Khaled",
  "Umm Al Seneem",
  "North Doha",
  "Al Jassamiya",
  "Al Markhiya",
  "Umm Lekhba",
  "Al Messila",
  "Al Jabor",
  "Hazm Al Markhiya",
  "Jeryan Nejaima",
  "Wadi Al Banat",
];

export const QATAR_MUNICIPALITIES: MunicipalityGroup[] = [
  {
    name: "Doha",
    districts: createNumberedDistricts(DOHA_RAW_DISTRICTS, "QA-DOH"),
  },
  {
    name: "Al Wakrah",
    districts: createNumberedDistricts(
      [
        "Al Wakrah City Center",
        "Al Wakrah Old Souq & Corniche",
        "Ezdan Oasis (Wukair)",
        "Al Wukair Expat Community",
        "Al Meshaf",
        "Barwa City",
        "Mesaieed Industrial City",
        "Ras Bufontas Free Zone",
        "Al Wakra Hospital Area",
        "Al Janoub Stadium District",
      ],
      "QA-WAK"
    ),
  },
];

// ----------------------------------------------------------------------------
// PORTUGAL LAYER 1 & LAYER 2: CONCELHOS & NUMBERED FREGUESIAS
// ----------------------------------------------------------------------------
export const PORTUGAL_MUNICIPALITIES: MunicipalityGroup[] = [
  {
    name: "Funchal",
    districts: createNumberedDistricts(
      [
        "Sé (City Center)",
        "São Martinho (Lido / Forum)",
        "Santa Maria Maior (Old Town)",
        "São Pedro",
        "Santo António",
        "Monte",
        "Imaculado Coração de Maria",
        "São Gonçalo",
        "Santa Luzia",
        "São Roque",
      ],
      "PT-FNC"
    ),
  },
  {
    name: "Santa Cruz",
    districts: createNumberedDistricts(
      [
        "Santa Cruz Center",
        "Caniço (Reis Magos / Garajau)",
        "Gaula",
        "Camacha",
        "Santo António da Serra",
      ],
      "PT-SCR"
    ),
  },
  {
    name: "Calheta",
    districts: createNumberedDistricts(
      [
        "Calheta Beach & Marina",
        "Arco da Calheta",
        "Paul do Mar",
        "Jardim do Mar",
        "Prazeres",
        "Ponta do Pargo",
      ],
      "PT-CAL"
    ),
  },
  {
    name: "Câmara de Lobos",
    districts: createNumberedDistricts(
      [
        "Câmara de Lobos Center & Bay",
        "Estreito de Câmara de Lobos",
        "Curral das Freiras",
        "Quinta Grande",
        "Jardim da Serra",
      ],
      "PT-CDL"
    ),
  },
  {
    name: "Machico",
    districts: createNumberedDistricts(
      [
        "Machico Bay & Sand Beach",
        "Caniçal (Fisherman's Village)",
        "Porto da Cruz (Surf Hub)",
        "Santo António da Serra",
        "Água de Pena",
      ],
      "PT-MCH"
    ),
  },
  {
    name: "Ponta do Sol",
    districts: createNumberedDistricts(
      [
        "Ponta do Sol Center & Nomad Village",
        "Madalena do Mar",
        "Canhas",
      ],
      "PT-PDS"
    ),
  },
];

// ----------------------------------------------------------------------------
// UAE LAYER 1 & LAYER 2: DUBAI SECTORS & NUMBERED DISTRICTS
// ----------------------------------------------------------------------------
export const UAE_MUNICIPALITIES: MunicipalityGroup[] = [
  {
    name: "Bur Dubai & Old Dubai",
    districts: createNumberedDistricts(
      [
        "Bur Dubai Center",
        "Al Karama",
        "Oud Metha",
        "Al Mankhool",
        "Al Jafiliya",
        "Al Fahidi Heritage",
      ],
      "AE-BUR"
    ),
  },
  {
    name: "New Dubai / Marina & JLT",
    districts: createNumberedDistricts(
      [
        "Dubai Marina",
        "Jumeirah Lake Towers (JLT)",
        "Jumeirah Beach Residence (JBR)",
        "Barsha Heights (TECOM)",
        "Al Barsha 1 (Mall of Emirates)",
        "The Greens & Views",
        "Dubai Media City",
        "Dubai Internet City",
        "Jumeirah Village Circle (JVC)",
        "Jumeirah Village Triangle (JVT)",
      ],
      "AE-MAR"
    ),
  },
  {
    name: "Business Bay & Downtown",
    districts: createNumberedDistricts(
      [
        "Downtown Dubai (Burj Khalifa)",
        "Business Bay Canal District",
        "DIFC (Financial Centre)",
        "Sheikh Zayed Road Towers",
        "City Walk & Al Wasl",
      ],
      "AE-BBY"
    ),
  },
  {
    name: "Deira & Coastal",
    districts: createNumberedDistricts(
      [
        "Deira City Centre & Clocktower",
        "Al Rigga & Al Muraqqabat",
        "Port Saeed",
        "Al Nahda & Al Qusais",
        "Al Mamzar Coastal",
      ],
      "AE-DEI"
    ),
  },
  {
    name: "Dubai South & Expo City",
    districts: createNumberedDistricts(
      [
        "Expo City Dubai",
        "Dubai South Residential City",
        "Al Furjan",
        "Discovery Gardens",
      ],
      "AE-SOU"
    ),
  },
];

// Builder function producing the standard Cascader Option tree:
// Country (e.g. Qatar) > Municipality (e.g. Doha) > Area (e.g. Madinat Khalifa North)
export function buildCountryCascaderOptions(geo: CountryGeographyData): CascaderOption[] {
  return [
    {
      value: geo.countryName,
      label: `${geo.flag} ${geo.countryName}`,
      children: geo.municipalities.map((m) => ({
        value: m.name,
        label: m.name,
        children: m.areas.map((a) => ({
          value: a.name,
          label: a.name,
          territoryCode: a.territoryCode,
        })),
      })),
    },
  ];
}

export interface ZoneCluster {
  id: string;
  name: string;
  coordinatorTitle: string;
  anchorLocation: string;
  radiusKm: number;
  zones: string[];
}

export interface CityConfig {
  slug: string;
  name: string;
  countryName: string;
  countryCode: string;
  divisionOrState: string;
  districtOrCity: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  defaultPhoneCode: string;
  heroHeadline: string;
  heroSubheadline: string;
  popularAreas: string[];
  clusters?: ZoneCluster[];
  municipalities?: MunicipalityGroup[];
  cascaderOptions?: CascaderOption[];
  budgetPresets: { label: string; value: string }[];
  roomTypes: { id: string; label: string; icon: string; desc: string }[];
  tagline: string;
  moverPromoText: string;
}

export const CITY_CONFIGS: Record<string, CityConfig> = {
  doha: {
    slug: "doha",
    name: "Doha",
    countryName: "Qatar",
    countryCode: "QA",
    divisionOrState: "Doha Municipality",
    districtOrCity: "Doha",
    flag: "🇶🇦",
    currency: "QAR",
    currencySymbol: "QAR",
    defaultPhoneCode: "+974",
    heroHeadline: "Find Verified Rooms & Bedspaces in Doha",
    heroSubheadline:
      "Direct room listings near Metro stations in Madinat Khalifa, Dafna, Gharrafa, Najma & Al Sadd. Zero middleman harassment, anti-fraud protected tickets.",
    municipalities: QATAR_MUNICIPALITIES,
    popularAreas: [
      "Madinat Khalifa North",
      "Madinat Khalifa South",
      "Al Gharrafa",
      "Al Duhail",
      "Dafna (West Bay)",
      "Bin Omran",
      "Najma (Near Metro)",
      "Mansoura (B-Ring Road)",
      "Al Sadd (Metro & Sports Club)",
      "Bin Mahmoud (C-Ring)",
      "Old Airport (Al Matar Al Qadeem)",
      "The Pearl-Qatar (Porto Arabia / Marina)",
      "Lusail Marina District",
    ],
    clusters: [
      {
        id: "khalifa_westbay",
        name: "West Bay & Khalifa",
        coordinatorTitle: "Zone 30-38 Coordinator Territory",
        anchorLocation: "Madinat Khalifa North",
        radiusKm: 12,
        zones: [
          "Madinat Khalifa North",
          "Madinat Khalifa South",
          "Al Gharrafa",
          "Al Duhail",
          "Dafna (West Bay)",
          "Bin Omran",
        ],
      },
      {
        id: "central_metro",
        name: "Central Metro Hub",
        coordinatorTitle: "Zone 22-26 Central Metro Coordinator",
        anchorLocation: "Al Sadd Metro Station",
        radiusKm: 8,
        zones: [
          "Najma (Near Metro)",
          "Mansoura (B-Ring Road)",
          "Al Sadd (Metro & Sports Club)",
          "Bin Mahmoud (C-Ring)",
          "Old Airport (Al Matar Al Qadeem)",
        ],
      },
      {
        id: "pearl_lusail",
        name: "The Pearl & Lusail",
        coordinatorTitle: "Zone 66 Coastal Coordinator",
        anchorLocation: "Porto Arabia Marina",
        radiusKm: 15,
        zones: [
          "The Pearl-Qatar (Porto Arabia)",
          "The Pearl-Qatar (Viva Bahriya)",
          "Lusail Marina District",
          "Fox Hills Lusail",
        ],
      },
    ],
    cascaderOptions: [
      {
        value: "Doha Municipality",
        label: "Doha Municipality (Division)",
        children: [
          {
            value: "West Bay & North District",
            label: "West Bay & North District (District)",
            children: [
              {
                value: "Madinat Khalifa North",
                label: "Madinat Khalifa North (Upazila)",
                children: [
                  { value: "Zone 34 (Dahl Al Hamam Area)", label: "Zone 34 (Dahl Al Hamam Area)", territoryCode: "QA-DOH-KHN-34" },
                  { value: "Al Shamal Road Access", label: "Al Shamal Road Access", territoryCode: "QA-DOH-KHN-SHM" },
                  { value: "Executive Villa Partitions", label: "Executive Villa Partitions", territoryCode: "QA-DOH-KHN-VIL" },
                ],
              },
              {
                value: "Madinat Khalifa South",
                label: "Madinat Khalifa South (Upazila)",
                children: [
                  { value: "Zone 32 (Al Jazira Al Arabiya)", label: "Zone 32 (Al Jazira Al Arabiya)", territoryCode: "QA-DOH-KHS-32" },
                  { value: "Khalifa Town Center St", label: "Khalifa Town Center St", territoryCode: "QA-DOH-KHS-TOW" },
                ],
              },
              {
                value: "Al Gharrafa",
                label: "Al Gharrafa (Upazila)",
                children: [
                  { value: "Thani Bin Jassim St (Q-Mall)", label: "Thani Bin Jassim St (Q-Mall)", territoryCode: "QA-DOH-GHA-QML" },
                  { value: "Al Gharrafa Stadium Area", label: "Al Gharrafa Stadium Area", territoryCode: "QA-DOH-GHA-STD" },
                ],
              },
              {
                value: "Al Duhail",
                label: "Al Duhail (Upazila)",
                children: [
                  { value: "Al Duhail North (Landmark Mall)", label: "Al Duhail North (Landmark Mall)", territoryCode: "QA-DOH-DUH-LND" },
                  { value: "Lekhwiya Sports Complex Area", label: "Lekhwiya Sports Complex Area", territoryCode: "QA-DOH-DUH-LEK" },
                ],
              },
              {
                value: "Dafna (West Bay)",
                label: "Dafna / West Bay (Upazila)",
                children: [
                  { value: "West Bay Financial Towers", label: "West Bay Financial Towers", territoryCode: "QA-DOH-DAF-TOW" },
                  { value: "Diplomatic Quarter & Corniche", label: "Diplomatic Quarter & Corniche", territoryCode: "QA-DOH-DAF-DIP" },
                ],
              },
              {
                value: "Bin Omran",
                label: "Bin Omran (Upazila)",
                children: [
                  { value: "Hamad Medical City Area", label: "Hamad Medical City Area", territoryCode: "QA-DOH-BOM-HMC" },
                  { value: "Al Yarmouk Commercial St", label: "Al Yarmouk Commercial St", territoryCode: "QA-DOH-BOM-YAR" },
                ],
              },
            ],
          },
          {
            value: "Central Metro District",
            label: "Central Metro District (District)",
            children: [
              {
                value: "Najma",
                label: "Najma (Upazila)",
                children: [
                  { value: "Najma Metro Red Line", label: "Najma Metro Red Line (Hot Expat Hub)", territoryCode: "QA-DOH-NAJ-MET" },
                  { value: "Al Hilal Commercial St", label: "Al Hilal Commercial St", territoryCode: "QA-DOH-NAJ-HIL" },
                ],
              },
              {
                value: "Mansoura",
                label: "Mansoura (Upazila)",
                children: [
                  { value: "Al Mansoura Metro Green Line", label: "Al Mansoura Metro Green Line", territoryCode: "QA-DOH-MAN-MET" },
                  { value: "B-Ring Road Commercial St", label: "B-Ring Road Commercial St", territoryCode: "QA-DOH-MAN-BRG" },
                ],
              },
              {
                value: "Al Sadd",
                label: "Al Sadd (Upazila)",
                children: [
                  { value: "Al Sadd Metro & Sports Club", label: "Al Sadd Metro & Sports Club", territoryCode: "QA-DOH-SAD-MET" },
                  { value: "Joaan Station / C-Ring", label: "Joaan Station / C-Ring", territoryCode: "QA-DOH-SAD-JOA" },
                ],
              },
              {
                value: "Bin Mahmoud",
                label: "Bin Mahmoud (Upazila)",
                children: [
                  { value: "Bin Mahmoud Gold Line Metro", label: "Bin Mahmoud Gold Line Metro", territoryCode: "QA-DOH-MAH-MET" },
                  { value: "Badriya Signal Stays", label: "Badriya Signal Stays", territoryCode: "QA-DOH-MAH-BAD" },
                ],
              },
              {
                value: "Old Airport",
                label: "Old Airport (Upazila)",
                children: [
                  { value: "Al Matar Al Qadeem / D-Ring", label: "Al Matar Al Qadeem / D-Ring", territoryCode: "QA-DOH-AIR-MAT" },
                  { value: "Old Airport Commercial St", label: "Old Airport Commercial St", territoryCode: "QA-DOH-AIR-COM" },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Al Daayen Municipality",
        label: "Al Daayen Municipality (Division)",
        children: [
          {
            value: "The Pearl & Lusail District",
            label: "The Pearl & Lusail District (District)",
            children: [
              {
                value: "The Pearl-Qatar",
                label: "The Pearl-Qatar (Upazila)",
                children: [
                  { value: "Porto Arabia Towers & Marina", label: "Porto Arabia Towers & Marina", territoryCode: "QA-DOH-PRT-01" },
                  { value: "Viva Bahriya Beachfront", label: "Viva Bahriya Beachfront Towers", territoryCode: "QA-DOH-VIV-01" },
                  { value: "Qanat Quartier Canal Stays", label: "Qanat Quartier Canal Stays", territoryCode: "QA-DOH-QAN-01" },
                ],
              },
              {
                value: "Lusail City",
                label: "Lusail City (Upazila)",
                children: [
                  { value: "Lusail Marina District", label: "Lusail Marina Promenade & Metro", territoryCode: "QA-DOH-LUS-MAR" },
                  { value: "Fox Hills Residential District", label: "Fox Hills Residential District", territoryCode: "QA-DOH-FOX-RES" },
                ],
              },
            ],
          },
        ],
      },
    ],
    budgetPresets: [
      { label: "1000", value: "1000 QAR / mo" },
      { label: "1100", value: "1100 QAR / mo" },
      { label: "1200", value: "1200 QAR / mo" },
      { label: "1300", value: "1300 QAR / mo" },
      { label: "1400", value: "1400 QAR / mo" },
      { label: "1500", value: "1500 QAR / mo" },
      { label: "1600", value: "1600 QAR / mo" },
      { label: "1800", value: "1800 QAR / mo" },
      { label: "2000", value: "2000 QAR / mo" },
      { label: "2200", value: "2200 QAR / mo" },
      { label: "2500", value: "2500 QAR / mo" },
      { label: "3000+", value: "3000+ QAR / mo" },
    ],
    roomTypes: [
      { id: "single_room", label: "Single Room", icon: "🚪", desc: "Private room with shared kitchen & hall" },
      { id: "master_room", label: "Master Bedroom", icon: "👑", desc: "Attached private bathroom & balcony" },
      { id: "bedspace", label: "Executive Bedspace", icon: "🛏️", desc: "Clean partition for working professionals" },
      { id: "studio_1bhk", label: "Studio / 1BHK", icon: "🏢", desc: "Self-contained flat with hall & kitchen" },
    ],
    tagline: "Qatar Living & Metro Line Coordinator Network",
    moverPromoText: "Doha Metro & Ring Road luggage transfer van with 20% discount on closed tickets.",
  },
  qatar: {
    slug: "qatar",
    name: "Doha & Lusail",
    countryName: "Qatar",
    countryCode: "QA",
    divisionOrState: "Doha Municipality",
    districtOrCity: "Doha",
    flag: "🇶🇦",
    currency: "QAR",
    currencySymbol: "QAR",
    defaultPhoneCode: "+974",
    heroHeadline: "Qatar Expat & Room Rental Lead Portal",
    heroSubheadline:
      "Looking for verified rooms, partitions, and flats in Doha, Lusail, or Al Rayyan? Get connected with trusted agents with zero advance scams.",
    municipalities: QATAR_MUNICIPALITIES,
    popularAreas: [
      "Najma (Near Metro)",
      "Mansoura",
      "Al Sadd",
      "Bin Mahmoud",
      "Old Airport",
      "The Pearl-Qatar",
      "Lusail City",
    ],
    cascaderOptions: [
      {
        value: "Doha Municipality",
        label: "Doha Municipality (Division)",
        children: [
          {
            value: "West Bay & North District",
            label: "West Bay & North District (District)",
            children: [
              {
                value: "Madinat Khalifa North",
                label: "Madinat Khalifa North (Upazila)",
                children: [
                  { value: "Zone 34 (Dahl Al Hamam Area)", label: "Zone 34 (Dahl Al Hamam Area)", territoryCode: "QA-DOH-KHN-34" },
                  { value: "Al Shamal Road Access", label: "Al Shamal Road Access", territoryCode: "QA-DOH-KHN-SHM" },
                  { value: "Executive Villa Partitions", label: "Executive Villa Partitions", territoryCode: "QA-DOH-KHN-VIL" },
                ],
              },
              {
                value: "Madinat Khalifa South",
                label: "Madinat Khalifa South (Upazila)",
                children: [
                  { value: "Zone 32 (Al Jazira Al Arabiya)", label: "Zone 32 (Al Jazira Al Arabiya)", territoryCode: "QA-DOH-KHS-32" },
                  { value: "Khalifa Town Center St", label: "Khalifa Town Center St", territoryCode: "QA-DOH-KHS-TOW" },
                ],
              },
              {
                value: "Al Gharrafa",
                label: "Al Gharrafa (Upazila)",
                children: [
                  { value: "Thani Bin Jassim St (Q-Mall)", label: "Thani Bin Jassim St (Q-Mall)", territoryCode: "QA-DOH-GHA-QML" },
                  { value: "Al Gharrafa Stadium Area", label: "Al Gharrafa Stadium Area", territoryCode: "QA-DOH-GHA-STD" },
                ],
              },
              {
                value: "Al Duhail",
                label: "Al Duhail (Upazila)",
                children: [
                  { value: "Al Duhail North (Landmark Mall)", label: "Al Duhail North (Landmark Mall)", territoryCode: "QA-DOH-DUH-LND" },
                  { value: "Lekhwiya Sports Complex Area", label: "Lekhwiya Sports Complex Area", territoryCode: "QA-DOH-DUH-LEK" },
                ],
              },
              {
                value: "Dafna (West Bay)",
                label: "Dafna / West Bay (Upazila)",
                children: [
                  { value: "West Bay Financial Towers", label: "West Bay Financial Towers", territoryCode: "QA-DOH-DAF-TOW" },
                  { value: "Diplomatic Quarter & Corniche", label: "Diplomatic Quarter & Corniche", territoryCode: "QA-DOH-DAF-DIP" },
                ],
              },
              {
                value: "Bin Omran",
                label: "Bin Omran (Upazila)",
                children: [
                  { value: "Hamad Medical City Area", label: "Hamad Medical City Area", territoryCode: "QA-DOH-BOM-HMC" },
                  { value: "Al Yarmouk Commercial St", label: "Al Yarmouk Commercial St", territoryCode: "QA-DOH-BOM-YAR" },
                ],
              },
            ],
          },
          {
            value: "Central Metro District",
            label: "Central Metro District (District)",
            children: [
              {
                value: "Najma",
                label: "Najma (Upazila)",
                children: [
                  { value: "Najma Metro Red Line", label: "Najma Metro Red Line (Hot Expat Hub)", territoryCode: "QA-DOH-NAJ-MET" },
                  { value: "Al Hilal Commercial St", label: "Al Hilal Commercial St", territoryCode: "QA-DOH-NAJ-HIL" },
                ],
              },
              {
                value: "Mansoura",
                label: "Mansoura (Upazila)",
                children: [
                  { value: "Al Mansoura Metro Green Line", label: "Al Mansoura Metro Green Line", territoryCode: "QA-DOH-MAN-MET" },
                  { value: "B-Ring Road Commercial St", label: "B-Ring Road Commercial St", territoryCode: "QA-DOH-MAN-BRG" },
                ],
              },
              {
                value: "Al Sadd",
                label: "Al Sadd (Upazila)",
                children: [
                  { value: "Al Sadd Metro & Sports Club", label: "Al Sadd Metro & Sports Club", territoryCode: "QA-DOH-SAD-MET" },
                  { value: "Joaan Station / C-Ring", label: "Joaan Station / C-Ring", territoryCode: "QA-DOH-SAD-JOA" },
                ],
              },
              {
                value: "Bin Mahmoud",
                label: "Bin Mahmoud (Upazila)",
                children: [
                  { value: "Bin Mahmoud Gold Line Metro", label: "Bin Mahmoud Gold Line Metro", territoryCode: "QA-DOH-MAH-MET" },
                  { value: "Badriya Signal Stays", label: "Badriya Signal Stays", territoryCode: "QA-DOH-MAH-BAD" },
                ],
              },
              {
                value: "Old Airport",
                label: "Old Airport (Upazila)",
                children: [
                  { value: "Al Matar Al Qadeem / D-Ring", label: "Al Matar Al Qadeem / D-Ring", territoryCode: "QA-DOH-AIR-MAT" },
                  { value: "Old Airport Commercial St", label: "Old Airport Commercial St", territoryCode: "QA-DOH-AIR-COM" },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Al Daayen Municipality",
        label: "Al Daayen Municipality (Division)",
        children: [
          {
            value: "The Pearl & Lusail District",
            label: "The Pearl & Lusail District (District)",
            children: [
              {
                value: "The Pearl-Qatar",
                label: "The Pearl-Qatar (Upazila)",
                children: [
                  { value: "Porto Arabia Towers & Marina", label: "Porto Arabia Towers & Marina", territoryCode: "QA-DOH-PRT-01" },
                  { value: "Viva Bahriya Beachfront", label: "Viva Bahriya Beachfront Towers", territoryCode: "QA-DOH-VIV-01" },
                  { value: "Qanat Quartier Canal Stays", label: "Qanat Quartier Canal Stays", territoryCode: "QA-DOH-QAN-01" },
                ],
              },
              {
                value: "Lusail City",
                label: "Lusail City (Upazila)",
                children: [
                  { value: "Lusail Marina District", label: "Lusail Marina Promenade & Metro", territoryCode: "QA-DOH-LUS-MAR" },
                  { value: "Fox Hills Residential District", label: "Fox Hills Residential District", territoryCode: "QA-DOH-FOX-RES" },
                ],
              },
            ],
          },
        ],
      },
    ],
    budgetPresets: [
      { label: "1000", value: "1000 QAR / mo" },
      { label: "1100", value: "1100 QAR / mo" },
      { label: "1200", value: "1200 QAR / mo" },
      { label: "1300", value: "1300 QAR / mo" },
      { label: "1400", value: "1400 QAR / mo" },
      { label: "1500", value: "1500 QAR / mo" },
      { label: "1600", value: "1600 QAR / mo" },
      { label: "1800", value: "1800 QAR / mo" },
      { label: "2000", value: "2000 QAR / mo" },
      { label: "2200", value: "2200 QAR / mo" },
      { label: "2500", value: "2500 QAR / mo" },
      { label: "3000+", value: "3000+ QAR / mo" },
    ],
    roomTypes: [
      { id: "single_room", label: "Single Room", icon: "🚪", desc: "Private room with shared kitchen & hall" },
      { id: "master_room", label: "Master Bedroom", icon: "👑", desc: "Attached private bathroom & balcony" },
      { id: "bedspace", label: "Executive Bedspace", icon: "🛏️", desc: "Clean partition for working professionals" },
      { id: "studio_1bhk", label: "Studio / 1BHK", icon: "🏢", desc: "Self-contained flat with hall & kitchen" },
    ],
    tagline: "Nationwide Qatar Verified Rental Network",
    moverPromoText: "Priority Doha & Lusail shifting van dispatch available upon request.",
  },
  madeira: {
    slug: "madeira",
    name: "Madeira Island",
    countryName: "Portugal",
    countryCode: "PT",
    divisionOrState: "Madeira Autonomous Region (RAM)",
    districtOrCity: "Funchal",
    flag: "🇵🇹",
    currency: "EUR",
    currencySymbol: "€",
    defaultPhoneCode: "+351",
    heroHeadline: "Find Verified Rooms & Co-Living in Madeira",
    heroSubheadline:
      "Ocean-view stays and flexible room rentals in Funchal, Calheta, and Ponta do Sol. Tailored for expats, digital nomads & relocating professionals.",
    municipalities: PORTUGAL_MUNICIPALITIES,
    popularAreas: [
      "Funchal (Lido / São Martinho)",
      "Funchal (Sé / Historic Center)",
      "Calheta (Arco da Calheta)",
      "Ponta do Sol (Digital Nomad Village)",
      "Santa Cruz (Caniço / Garajau)",
      "Machico & Ribeira Brava",
    ],
    cascaderOptions: [
      {
        value: "Doha Municipality",
        label: "Doha Municipality (Division)",
        children: [
          {
            value: "West Bay & North District",
            label: "West Bay & North District (District)",
            children: [
              {
                value: "Madinat Khalifa North",
                label: "Madinat Khalifa North (Upazila)",
                children: [
                  { value: "Zone 34 (Dahl Al Hamam Area)", label: "Zone 34 (Dahl Al Hamam Area)", territoryCode: "QA-DOH-KHN-34" },
                  { value: "Al Shamal Road Access", label: "Al Shamal Road Access", territoryCode: "QA-DOH-KHN-SHM" },
                  { value: "Executive Villa Partitions", label: "Executive Villa Partitions", territoryCode: "QA-DOH-KHN-VIL" },
                ],
              },
              {
                value: "Madinat Khalifa South",
                label: "Madinat Khalifa South (Upazila)",
                children: [
                  { value: "Zone 32 (Al Jazira Al Arabiya)", label: "Zone 32 (Al Jazira Al Arabiya)", territoryCode: "QA-DOH-KHS-32" },
                  { value: "Khalifa Town Center St", label: "Khalifa Town Center St", territoryCode: "QA-DOH-KHS-TOW" },
                ],
              },
              {
                value: "Al Gharrafa",
                label: "Al Gharrafa (Upazila)",
                children: [
                  { value: "Thani Bin Jassim St (Q-Mall)", label: "Thani Bin Jassim St (Q-Mall)", territoryCode: "QA-DOH-GHA-QML" },
                  { value: "Al Gharrafa Stadium Area", label: "Al Gharrafa Stadium Area", territoryCode: "QA-DOH-GHA-STD" },
                ],
              },
              {
                value: "Al Duhail",
                label: "Al Duhail (Upazila)",
                children: [
                  { value: "Al Duhail North (Landmark Mall)", label: "Al Duhail North (Landmark Mall)", territoryCode: "QA-DOH-DUH-LND" },
                  { value: "Lekhwiya Sports Complex Area", label: "Lekhwiya Sports Complex Area", territoryCode: "QA-DOH-DUH-LEK" },
                ],
              },
              {
                value: "Dafna (West Bay)",
                label: "Dafna / West Bay (Upazila)",
                children: [
                  { value: "West Bay Financial Towers", label: "West Bay Financial Towers", territoryCode: "QA-DOH-DAF-TOW" },
                  { value: "Diplomatic Quarter & Corniche", label: "Diplomatic Quarter & Corniche", territoryCode: "QA-DOH-DAF-DIP" },
                ],
              },
              {
                value: "Bin Omran",
                label: "Bin Omran (Upazila)",
                children: [
                  { value: "Hamad Medical City Area", label: "Hamad Medical City Area", territoryCode: "QA-DOH-BOM-HMC" },
                  { value: "Al Yarmouk Commercial St", label: "Al Yarmouk Commercial St", territoryCode: "QA-DOH-BOM-YAR" },
                ],
              },
            ],
          },
          {
            value: "Central Metro District",
            label: "Central Metro District (District)",
            children: [
              {
                value: "Najma",
                label: "Najma (Upazila)",
                children: [
                  { value: "Najma Metro Red Line", label: "Najma Metro Red Line (Hot Expat Hub)", territoryCode: "QA-DOH-NAJ-MET" },
                  { value: "Al Hilal Commercial St", label: "Al Hilal Commercial St", territoryCode: "QA-DOH-NAJ-HIL" },
                ],
              },
              {
                value: "Mansoura",
                label: "Mansoura (Upazila)",
                children: [
                  { value: "Al Mansoura Metro Green Line", label: "Al Mansoura Metro Green Line", territoryCode: "QA-DOH-MAN-MET" },
                  { value: "B-Ring Road Commercial St", label: "B-Ring Road Commercial St", territoryCode: "QA-DOH-MAN-BRG" },
                ],
              },
              {
                value: "Al Sadd",
                label: "Al Sadd (Upazila)",
                children: [
                  { value: "Al Sadd Metro & Sports Club", label: "Al Sadd Metro & Sports Club", territoryCode: "QA-DOH-SAD-MET" },
                  { value: "Joaan Station / C-Ring", label: "Joaan Station / C-Ring", territoryCode: "QA-DOH-SAD-JOA" },
                ],
              },
              {
                value: "Bin Mahmoud",
                label: "Bin Mahmoud (Upazila)",
                children: [
                  { value: "Bin Mahmoud Gold Line Metro", label: "Bin Mahmoud Gold Line Metro", territoryCode: "QA-DOH-MAH-MET" },
                  { value: "Badriya Signal Stays", label: "Badriya Signal Stays", territoryCode: "QA-DOH-MAH-BAD" },
                ],
              },
              {
                value: "Old Airport",
                label: "Old Airport (Upazila)",
                children: [
                  { value: "Al Matar Al Qadeem / D-Ring", label: "Al Matar Al Qadeem / D-Ring", territoryCode: "QA-DOH-AIR-MAT" },
                  { value: "Old Airport Commercial St", label: "Old Airport Commercial St", territoryCode: "QA-DOH-AIR-COM" },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Al Daayen Municipality",
        label: "Al Daayen Municipality (Division)",
        children: [
          {
            value: "The Pearl & Lusail District",
            label: "The Pearl & Lusail District (District)",
            children: [
              {
                value: "The Pearl-Qatar",
                label: "The Pearl-Qatar (Upazila)",
                children: [
                  { value: "Porto Arabia Towers & Marina", label: "Porto Arabia Towers & Marina", territoryCode: "QA-DOH-PRT-01" },
                  { value: "Viva Bahriya Beachfront", label: "Viva Bahriya Beachfront Towers", territoryCode: "QA-DOH-VIV-01" },
                  { value: "Qanat Quartier Canal Stays", label: "Qanat Quartier Canal Stays", territoryCode: "QA-DOH-QAN-01" },
                ],
              },
              {
                value: "Lusail City",
                label: "Lusail City (Upazila)",
                children: [
                  { value: "Lusail Marina District", label: "Lusail Marina Promenade & Metro", territoryCode: "QA-DOH-LUS-MAR" },
                  { value: "Fox Hills Residential District", label: "Fox Hills Residential District", territoryCode: "QA-DOH-FOX-RES" },
                ],
              },
            ],
          },
        ],
      },
    ],
    budgetPresets: [
      { label: "Under €500", value: "Under €500 / mo" },
      { label: "€500 – €750", value: "€500 – €750 / mo" },
      { label: "€750 – €1,000", value: "€750 – €1,000 / mo" },
      { label: "€1,000 – €1,400", value: "€1,000 – €1,400 / mo" },
      { label: "€1,400 – €1,800", value: "€1,400 – €1,800 / mo" },
      { label: "€1,800 – €2,500", value: "€1,800 – €2,500 / mo" },
    ],
    roomTypes: [
      { id: "quarto", label: "Private Bedroom (Quarto)", icon: "🌊", desc: "Bright room with work desk & WiFi" },
      { id: "suite", label: "En-Suite Room (Suíte)", icon: "👑", desc: "Private bedroom with attached bathroom" },
      { id: "studio_t0", label: "Studio T0 (Estúdio)", icon: "🏡", desc: "Self-contained flat with kitchenette" },
      { id: "t1_flat", label: "1-Bedroom Flat (T1)", icon: "🏢", desc: "Full apartment (Quarto + Sala + Kitchen)" },
    ],
    tagline: "Autonomous Region of Madeira Digital Nomad & Expat Network",
    moverPromoText: "Island luggage transport van & airport pickup discounts available.",
  },
  portugal: {
    slug: "portugal",
    name: "Portugal",
    countryName: "Portugal",
    countryCode: "PT",
    divisionOrState: "Madeira Autonomous Region (RAM)",
    districtOrCity: "Funchal",
    flag: "🇵🇹",
    currency: "EUR",
    currencySymbol: "€",
    defaultPhoneCode: "+351",
    heroHeadline: "Verified Long-Term Stays in Portugal & Madeira",
    heroSubheadline:
      "Browse rooms, digital nomad co-living, and apartments across Madeira and Lisbon. Anti-scam verified host network.",
    municipalities: PORTUGAL_MUNICIPALITIES,
    popularAreas: [
      "Funchal (São Martinho)",
      "Funchal (Sé)",
      "Calheta",
      "Ponta do Sol",
      "Caniço",
      "Cascais & Estoril",
    ],
    cascaderOptions: [
      {
        value: "Doha Municipality",
        label: "Doha Municipality (Division)",
        children: [
          {
            value: "West Bay & North District",
            label: "West Bay & North District (District)",
            children: [
              {
                value: "Madinat Khalifa North",
                label: "Madinat Khalifa North (Upazila)",
                children: [
                  { value: "Zone 34 (Dahl Al Hamam Area)", label: "Zone 34 (Dahl Al Hamam Area)", territoryCode: "QA-DOH-KHN-34" },
                  { value: "Al Shamal Road Access", label: "Al Shamal Road Access", territoryCode: "QA-DOH-KHN-SHM" },
                  { value: "Executive Villa Partitions", label: "Executive Villa Partitions", territoryCode: "QA-DOH-KHN-VIL" },
                ],
              },
              {
                value: "Madinat Khalifa South",
                label: "Madinat Khalifa South (Upazila)",
                children: [
                  { value: "Zone 32 (Al Jazira Al Arabiya)", label: "Zone 32 (Al Jazira Al Arabiya)", territoryCode: "QA-DOH-KHS-32" },
                  { value: "Khalifa Town Center St", label: "Khalifa Town Center St", territoryCode: "QA-DOH-KHS-TOW" },
                ],
              },
              {
                value: "Al Gharrafa",
                label: "Al Gharrafa (Upazila)",
                children: [
                  { value: "Thani Bin Jassim St (Q-Mall)", label: "Thani Bin Jassim St (Q-Mall)", territoryCode: "QA-DOH-GHA-QML" },
                  { value: "Al Gharrafa Stadium Area", label: "Al Gharrafa Stadium Area", territoryCode: "QA-DOH-GHA-STD" },
                ],
              },
              {
                value: "Al Duhail",
                label: "Al Duhail (Upazila)",
                children: [
                  { value: "Al Duhail North (Landmark Mall)", label: "Al Duhail North (Landmark Mall)", territoryCode: "QA-DOH-DUH-LND" },
                  { value: "Lekhwiya Sports Complex Area", label: "Lekhwiya Sports Complex Area", territoryCode: "QA-DOH-DUH-LEK" },
                ],
              },
              {
                value: "Dafna (West Bay)",
                label: "Dafna / West Bay (Upazila)",
                children: [
                  { value: "West Bay Financial Towers", label: "West Bay Financial Towers", territoryCode: "QA-DOH-DAF-TOW" },
                  { value: "Diplomatic Quarter & Corniche", label: "Diplomatic Quarter & Corniche", territoryCode: "QA-DOH-DAF-DIP" },
                ],
              },
              {
                value: "Bin Omran",
                label: "Bin Omran (Upazila)",
                children: [
                  { value: "Hamad Medical City Area", label: "Hamad Medical City Area", territoryCode: "QA-DOH-BOM-HMC" },
                  { value: "Al Yarmouk Commercial St", label: "Al Yarmouk Commercial St", territoryCode: "QA-DOH-BOM-YAR" },
                ],
              },
            ],
          },
          {
            value: "Central Metro District",
            label: "Central Metro District (District)",
            children: [
              {
                value: "Najma",
                label: "Najma (Upazila)",
                children: [
                  { value: "Najma Metro Red Line", label: "Najma Metro Red Line (Hot Expat Hub)", territoryCode: "QA-DOH-NAJ-MET" },
                  { value: "Al Hilal Commercial St", label: "Al Hilal Commercial St", territoryCode: "QA-DOH-NAJ-HIL" },
                ],
              },
              {
                value: "Mansoura",
                label: "Mansoura (Upazila)",
                children: [
                  { value: "Al Mansoura Metro Green Line", label: "Al Mansoura Metro Green Line", territoryCode: "QA-DOH-MAN-MET" },
                  { value: "B-Ring Road Commercial St", label: "B-Ring Road Commercial St", territoryCode: "QA-DOH-MAN-BRG" },
                ],
              },
              {
                value: "Al Sadd",
                label: "Al Sadd (Upazila)",
                children: [
                  { value: "Al Sadd Metro & Sports Club", label: "Al Sadd Metro & Sports Club", territoryCode: "QA-DOH-SAD-MET" },
                  { value: "Joaan Station / C-Ring", label: "Joaan Station / C-Ring", territoryCode: "QA-DOH-SAD-JOA" },
                ],
              },
              {
                value: "Bin Mahmoud",
                label: "Bin Mahmoud (Upazila)",
                children: [
                  { value: "Bin Mahmoud Gold Line Metro", label: "Bin Mahmoud Gold Line Metro", territoryCode: "QA-DOH-MAH-MET" },
                  { value: "Badriya Signal Stays", label: "Badriya Signal Stays", territoryCode: "QA-DOH-MAH-BAD" },
                ],
              },
              {
                value: "Old Airport",
                label: "Old Airport (Upazila)",
                children: [
                  { value: "Al Matar Al Qadeem / D-Ring", label: "Al Matar Al Qadeem / D-Ring", territoryCode: "QA-DOH-AIR-MAT" },
                  { value: "Old Airport Commercial St", label: "Old Airport Commercial St", territoryCode: "QA-DOH-AIR-COM" },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Al Daayen Municipality",
        label: "Al Daayen Municipality (Division)",
        children: [
          {
            value: "The Pearl & Lusail District",
            label: "The Pearl & Lusail District (District)",
            children: [
              {
                value: "The Pearl-Qatar",
                label: "The Pearl-Qatar (Upazila)",
                children: [
                  { value: "Porto Arabia Towers & Marina", label: "Porto Arabia Towers & Marina", territoryCode: "QA-DOH-PRT-01" },
                  { value: "Viva Bahriya Beachfront", label: "Viva Bahriya Beachfront Towers", territoryCode: "QA-DOH-VIV-01" },
                  { value: "Qanat Quartier Canal Stays", label: "Qanat Quartier Canal Stays", territoryCode: "QA-DOH-QAN-01" },
                ],
              },
              {
                value: "Lusail City",
                label: "Lusail City (Upazila)",
                children: [
                  { value: "Lusail Marina District", label: "Lusail Marina Promenade & Metro", territoryCode: "QA-DOH-LUS-MAR" },
                  { value: "Fox Hills Residential District", label: "Fox Hills Residential District", territoryCode: "QA-DOH-FOX-RES" },
                ],
              },
            ],
          },
        ],
      },
    ],
    budgetPresets: [
      { label: "Under €500", value: "Under €500 / mo" },
      { label: "€500 – €750", value: "€500 – €750 / mo" },
      { label: "€750 – €1,000", value: "€750 – €1,000 / mo" },
      { label: "€1,000 – €1,400", value: "€1,000 – €1,400 / mo" },
      { label: "€1,400 – €1,800", value: "€1,400 – €1,800 / mo" },
      { label: "€1,800 – €2,500", value: "€1,800 – €2,500 / mo" },
    ],
    roomTypes: [
      { id: "quarto", label: "Private Bedroom (Quarto)", icon: "🚪", desc: "Bright room with work desk & WiFi" },
      { id: "suite", label: "En-Suite Room (Suíte)", icon: "👑", desc: "Private bedroom with attached bathroom" },
      { id: "studio_t0", label: "Studio T0 (Estúdio)", icon: "🏡", desc: "Self-contained flat with kitchenette" },
      { id: "t1_flat", label: "1-Bedroom Flat (T1)", icon: "🏢", desc: "Full apartment (Quarto + Sala + Kitchen)" },
    ],
    tagline: "Portugal Relocation & Expat Housing Hub",
    moverPromoText: "Reliable moving vans across Funchal and regional districts.",
  },
  dubai: {
    slug: "dubai",
    name: "Dubai",
    countryName: "United Arab Emirates",
    countryCode: "AE",
    divisionOrState: "Dubai",
    districtOrCity: "Dubai",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "AED",
    defaultPhoneCode: "+971",
    heroHeadline: "Find Verified Rooms & Partitions in Dubai",
    heroSubheadline:
      "Metro-friendly executive rooms, partitions, and master bedrooms in Deira, Bur Dubai, Al Barsha & International City. Anti-cheat verified tickets.",
    municipalities: UAE_MUNICIPALITIES,
    popularAreas: [
      "Deira (Al Rigga / Union Metro)",
      "Bur Dubai (Al Fahidi / Meena Bazaar)",
      "Al Barsha 1 (Mall of the Emirates)",
      "International City (France & China Clusters)",
      "Business Bay & Downtown Fringe",
      "Palm Jumeirah & Marina",
    ],
    cascaderOptions: [
      {
        value: "Doha Municipality",
        label: "Doha Municipality (Division)",
        children: [
          {
            value: "West Bay & North District",
            label: "West Bay & North District (District)",
            children: [
              {
                value: "Madinat Khalifa North",
                label: "Madinat Khalifa North (Upazila)",
                children: [
                  { value: "Zone 34 (Dahl Al Hamam Area)", label: "Zone 34 (Dahl Al Hamam Area)", territoryCode: "QA-DOH-KHN-34" },
                  { value: "Al Shamal Road Access", label: "Al Shamal Road Access", territoryCode: "QA-DOH-KHN-SHM" },
                  { value: "Executive Villa Partitions", label: "Executive Villa Partitions", territoryCode: "QA-DOH-KHN-VIL" },
                ],
              },
              {
                value: "Madinat Khalifa South",
                label: "Madinat Khalifa South (Upazila)",
                children: [
                  { value: "Zone 32 (Al Jazira Al Arabiya)", label: "Zone 32 (Al Jazira Al Arabiya)", territoryCode: "QA-DOH-KHS-32" },
                  { value: "Khalifa Town Center St", label: "Khalifa Town Center St", territoryCode: "QA-DOH-KHS-TOW" },
                ],
              },
              {
                value: "Al Gharrafa",
                label: "Al Gharrafa (Upazila)",
                children: [
                  { value: "Thani Bin Jassim St (Q-Mall)", label: "Thani Bin Jassim St (Q-Mall)", territoryCode: "QA-DOH-GHA-QML" },
                  { value: "Al Gharrafa Stadium Area", label: "Al Gharrafa Stadium Area", territoryCode: "QA-DOH-GHA-STD" },
                ],
              },
              {
                value: "Al Duhail",
                label: "Al Duhail (Upazila)",
                children: [
                  { value: "Al Duhail North (Landmark Mall)", label: "Al Duhail North (Landmark Mall)", territoryCode: "QA-DOH-DUH-LND" },
                  { value: "Lekhwiya Sports Complex Area", label: "Lekhwiya Sports Complex Area", territoryCode: "QA-DOH-DUH-LEK" },
                ],
              },
              {
                value: "Dafna (West Bay)",
                label: "Dafna / West Bay (Upazila)",
                children: [
                  { value: "West Bay Financial Towers", label: "West Bay Financial Towers", territoryCode: "QA-DOH-DAF-TOW" },
                  { value: "Diplomatic Quarter & Corniche", label: "Diplomatic Quarter & Corniche", territoryCode: "QA-DOH-DAF-DIP" },
                ],
              },
              {
                value: "Bin Omran",
                label: "Bin Omran (Upazila)",
                children: [
                  { value: "Hamad Medical City Area", label: "Hamad Medical City Area", territoryCode: "QA-DOH-BOM-HMC" },
                  { value: "Al Yarmouk Commercial St", label: "Al Yarmouk Commercial St", territoryCode: "QA-DOH-BOM-YAR" },
                ],
              },
            ],
          },
          {
            value: "Central Metro District",
            label: "Central Metro District (District)",
            children: [
              {
                value: "Najma",
                label: "Najma (Upazila)",
                children: [
                  { value: "Najma Metro Red Line", label: "Najma Metro Red Line (Hot Expat Hub)", territoryCode: "QA-DOH-NAJ-MET" },
                  { value: "Al Hilal Commercial St", label: "Al Hilal Commercial St", territoryCode: "QA-DOH-NAJ-HIL" },
                ],
              },
              {
                value: "Mansoura",
                label: "Mansoura (Upazila)",
                children: [
                  { value: "Al Mansoura Metro Green Line", label: "Al Mansoura Metro Green Line", territoryCode: "QA-DOH-MAN-MET" },
                  { value: "B-Ring Road Commercial St", label: "B-Ring Road Commercial St", territoryCode: "QA-DOH-MAN-BRG" },
                ],
              },
              {
                value: "Al Sadd",
                label: "Al Sadd (Upazila)",
                children: [
                  { value: "Al Sadd Metro & Sports Club", label: "Al Sadd Metro & Sports Club", territoryCode: "QA-DOH-SAD-MET" },
                  { value: "Joaan Station / C-Ring", label: "Joaan Station / C-Ring", territoryCode: "QA-DOH-SAD-JOA" },
                ],
              },
              {
                value: "Bin Mahmoud",
                label: "Bin Mahmoud (Upazila)",
                children: [
                  { value: "Bin Mahmoud Gold Line Metro", label: "Bin Mahmoud Gold Line Metro", territoryCode: "QA-DOH-MAH-MET" },
                  { value: "Badriya Signal Stays", label: "Badriya Signal Stays", territoryCode: "QA-DOH-MAH-BAD" },
                ],
              },
              {
                value: "Old Airport",
                label: "Old Airport (Upazila)",
                children: [
                  { value: "Al Matar Al Qadeem / D-Ring", label: "Al Matar Al Qadeem / D-Ring", territoryCode: "QA-DOH-AIR-MAT" },
                  { value: "Old Airport Commercial St", label: "Old Airport Commercial St", territoryCode: "QA-DOH-AIR-COM" },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Al Daayen Municipality",
        label: "Al Daayen Municipality (Division)",
        children: [
          {
            value: "The Pearl & Lusail District",
            label: "The Pearl & Lusail District (District)",
            children: [
              {
                value: "The Pearl-Qatar",
                label: "The Pearl-Qatar (Upazila)",
                children: [
                  { value: "Porto Arabia Towers & Marina", label: "Porto Arabia Towers & Marina", territoryCode: "QA-DOH-PRT-01" },
                  { value: "Viva Bahriya Beachfront", label: "Viva Bahriya Beachfront Towers", territoryCode: "QA-DOH-VIV-01" },
                  { value: "Qanat Quartier Canal Stays", label: "Qanat Quartier Canal Stays", territoryCode: "QA-DOH-QAN-01" },
                ],
              },
              {
                value: "Lusail City",
                label: "Lusail City (Upazila)",
                children: [
                  { value: "Lusail Marina District", label: "Lusail Marina Promenade & Metro", territoryCode: "QA-DOH-LUS-MAR" },
                  { value: "Fox Hills Residential District", label: "Fox Hills Residential District", territoryCode: "QA-DOH-FOX-RES" },
                ],
              },
            ],
          },
        ],
      },
    ],
    budgetPresets: [
      { label: "Under 1,200 AED", value: "Under 1,200 AED / mo" },
      { label: "1,200 – 1,600 AED", value: "1,200 – 1,600 AED / mo" },
      { label: "1,600 – 2,000 AED", value: "1,600 – 2,000 AED / mo" },
      { label: "2,000 – 2,500 AED", value: "2,000 – 2,500 AED / mo" },
      { label: "2,500 – 3,200 AED", value: "2,500 – 3,200 AED / mo" },
      { label: "3,200 – 4,000 AED", value: "3,200 – 4,000 AED / mo" },
    ],
    roomTypes: [
      { id: "single_room", label: "Single Room", icon: "🚪", desc: "Full private bedroom with shared kitchen" },
      { id: "master_room", label: "Master Bedroom", icon: "👑", desc: "Attached bath in luxury tower (Chiller Free)" },
      { id: "partition", label: "Executive Partition", icon: "🧱", desc: "Clean, quiet partition with window" },
      { id: "studio_1bhk", label: "Studio / 1BHK Flat", icon: "🏢", desc: "Full private apartment with hall" },
    ],
    tagline: "UAE RERA-Compliant Community Rental Engine",
    moverPromoText: "Dubai pickup van & luggage relocation service with 15% voucher.",
  },
  uae: {
    slug: "uae",
    name: "United Arab Emirates",
    countryName: "United Arab Emirates",
    countryCode: "AE",
    divisionOrState: "Dubai",
    districtOrCity: "Dubai",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "AED",
    defaultPhoneCode: "+971",
    heroHeadline: "UAE Verified Room Rental & Relocation Hub",
    heroSubheadline:
      "Connecting tenants with vetted room providers across Dubai, Abu Dhabi & Sharjah. Direct WhatsApp matching with anti-fraud protection.",
    municipalities: UAE_MUNICIPALITIES,
    popularAreas: [
      "Dubai - Deira",
      "Dubai - Bur Dubai",
      "Dubai - Al Barsha",
      "Dubai - International City",
      "Dubai - Palm Jumeirah",
    ],
    cascaderOptions: [
      {
        value: "Doha Municipality",
        label: "Doha Municipality (Division)",
        children: [
          {
            value: "West Bay & North District",
            label: "West Bay & North District (District)",
            children: [
              {
                value: "Madinat Khalifa North",
                label: "Madinat Khalifa North (Upazila)",
                children: [
                  { value: "Zone 34 (Dahl Al Hamam Area)", label: "Zone 34 (Dahl Al Hamam Area)", territoryCode: "QA-DOH-KHN-34" },
                  { value: "Al Shamal Road Access", label: "Al Shamal Road Access", territoryCode: "QA-DOH-KHN-SHM" },
                  { value: "Executive Villa Partitions", label: "Executive Villa Partitions", territoryCode: "QA-DOH-KHN-VIL" },
                ],
              },
              {
                value: "Madinat Khalifa South",
                label: "Madinat Khalifa South (Upazila)",
                children: [
                  { value: "Zone 32 (Al Jazira Al Arabiya)", label: "Zone 32 (Al Jazira Al Arabiya)", territoryCode: "QA-DOH-KHS-32" },
                  { value: "Khalifa Town Center St", label: "Khalifa Town Center St", territoryCode: "QA-DOH-KHS-TOW" },
                ],
              },
              {
                value: "Al Gharrafa",
                label: "Al Gharrafa (Upazila)",
                children: [
                  { value: "Thani Bin Jassim St (Q-Mall)", label: "Thani Bin Jassim St (Q-Mall)", territoryCode: "QA-DOH-GHA-QML" },
                  { value: "Al Gharrafa Stadium Area", label: "Al Gharrafa Stadium Area", territoryCode: "QA-DOH-GHA-STD" },
                ],
              },
              {
                value: "Al Duhail",
                label: "Al Duhail (Upazila)",
                children: [
                  { value: "Al Duhail North (Landmark Mall)", label: "Al Duhail North (Landmark Mall)", territoryCode: "QA-DOH-DUH-LND" },
                  { value: "Lekhwiya Sports Complex Area", label: "Lekhwiya Sports Complex Area", territoryCode: "QA-DOH-DUH-LEK" },
                ],
              },
              {
                value: "Dafna (West Bay)",
                label: "Dafna / West Bay (Upazila)",
                children: [
                  { value: "West Bay Financial Towers", label: "West Bay Financial Towers", territoryCode: "QA-DOH-DAF-TOW" },
                  { value: "Diplomatic Quarter & Corniche", label: "Diplomatic Quarter & Corniche", territoryCode: "QA-DOH-DAF-DIP" },
                ],
              },
              {
                value: "Bin Omran",
                label: "Bin Omran (Upazila)",
                children: [
                  { value: "Hamad Medical City Area", label: "Hamad Medical City Area", territoryCode: "QA-DOH-BOM-HMC" },
                  { value: "Al Yarmouk Commercial St", label: "Al Yarmouk Commercial St", territoryCode: "QA-DOH-BOM-YAR" },
                ],
              },
            ],
          },
          {
            value: "Central Metro District",
            label: "Central Metro District (District)",
            children: [
              {
                value: "Najma",
                label: "Najma (Upazila)",
                children: [
                  { value: "Najma Metro Red Line", label: "Najma Metro Red Line (Hot Expat Hub)", territoryCode: "QA-DOH-NAJ-MET" },
                  { value: "Al Hilal Commercial St", label: "Al Hilal Commercial St", territoryCode: "QA-DOH-NAJ-HIL" },
                ],
              },
              {
                value: "Mansoura",
                label: "Mansoura (Upazila)",
                children: [
                  { value: "Al Mansoura Metro Green Line", label: "Al Mansoura Metro Green Line", territoryCode: "QA-DOH-MAN-MET" },
                  { value: "B-Ring Road Commercial St", label: "B-Ring Road Commercial St", territoryCode: "QA-DOH-MAN-BRG" },
                ],
              },
              {
                value: "Al Sadd",
                label: "Al Sadd (Upazila)",
                children: [
                  { value: "Al Sadd Metro & Sports Club", label: "Al Sadd Metro & Sports Club", territoryCode: "QA-DOH-SAD-MET" },
                  { value: "Joaan Station / C-Ring", label: "Joaan Station / C-Ring", territoryCode: "QA-DOH-SAD-JOA" },
                ],
              },
              {
                value: "Bin Mahmoud",
                label: "Bin Mahmoud (Upazila)",
                children: [
                  { value: "Bin Mahmoud Gold Line Metro", label: "Bin Mahmoud Gold Line Metro", territoryCode: "QA-DOH-MAH-MET" },
                  { value: "Badriya Signal Stays", label: "Badriya Signal Stays", territoryCode: "QA-DOH-MAH-BAD" },
                ],
              },
              {
                value: "Old Airport",
                label: "Old Airport (Upazila)",
                children: [
                  { value: "Al Matar Al Qadeem / D-Ring", label: "Al Matar Al Qadeem / D-Ring", territoryCode: "QA-DOH-AIR-MAT" },
                  { value: "Old Airport Commercial St", label: "Old Airport Commercial St", territoryCode: "QA-DOH-AIR-COM" },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Al Daayen Municipality",
        label: "Al Daayen Municipality (Division)",
        children: [
          {
            value: "The Pearl & Lusail District",
            label: "The Pearl & Lusail District (District)",
            children: [
              {
                value: "The Pearl-Qatar",
                label: "The Pearl-Qatar (Upazila)",
                children: [
                  { value: "Porto Arabia Towers & Marina", label: "Porto Arabia Towers & Marina", territoryCode: "QA-DOH-PRT-01" },
                  { value: "Viva Bahriya Beachfront", label: "Viva Bahriya Beachfront Towers", territoryCode: "QA-DOH-VIV-01" },
                  { value: "Qanat Quartier Canal Stays", label: "Qanat Quartier Canal Stays", territoryCode: "QA-DOH-QAN-01" },
                ],
              },
              {
                value: "Lusail City",
                label: "Lusail City (Upazila)",
                children: [
                  { value: "Lusail Marina District", label: "Lusail Marina Promenade & Metro", territoryCode: "QA-DOH-LUS-MAR" },
                  { value: "Fox Hills Residential District", label: "Fox Hills Residential District", territoryCode: "QA-DOH-FOX-RES" },
                ],
              },
            ],
          },
        ],
      },
    ],
    budgetPresets: [
      { label: "Under 1,200 AED", value: "Under 1,200 AED / mo" },
      { label: "1,200 – 1,600 AED", value: "1,200 – 1,600 AED / mo" },
      { label: "1,600 – 2,000 AED", value: "1,600 – 2,000 AED / mo" },
      { label: "2,000 – 2,500 AED", value: "2,000 – 2,500 AED / mo" },
      { label: "2,500 – 3,200 AED", value: "2,500 – 3,200 AED / mo" },
      { label: "3,200 – 4,000 AED", value: "3,200 – 4,000 AED / mo" },
    ],
    roomTypes: [
      { id: "single_room", label: "Single Room", icon: "🚪", desc: "Full private bedroom with shared kitchen" },
      { id: "master_room", label: "Master Bedroom", icon: "👑", desc: "Attached bath in luxury tower (Chiller Free)" },
      { id: "partition", label: "Executive Partition", icon: "🧱", desc: "Clean, quiet partition with window" },
      { id: "studio_1bhk", label: "Studio / 1BHK Flat", icon: "🏢", desc: "Full private apartment with hall" },
    ],
    tagline: "Emirates Verified Living Network",
    moverPromoText: "Instant mover assistance available across all Emirates.",
  },
};

export function getAllRentalCitySlugs(): string[] {
  return Object.keys(CITY_CONFIGS);
}

export function getRentalCityConfig(slug: string): CityConfig | undefined {
  return CITY_CONFIGS[slug.toLowerCase()];
}

