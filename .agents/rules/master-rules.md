---
trigger: always_on
---

# 🏢 PROPGROWTH LAB: MASTER ARCHITECTURE & CODING RULES (v2.0)
> **ডকুমেন্ট উদ্দেশ্য:** এই ফাইলটি **PropGrowth Lab** প্ল্যাটফর্মের কারিগরি স্ট্যাক, হাইব্রিড UI স্ট্যান্ডার্ড, রুট গ্রুপিং আইসোলেশন, রেসপন্সিভ ডিজাইন, নেভবার প্রোটোকল, এনিমেশন এবং ক্লিন কোডিংয়ের একক নির্ভরযোগ্য উৎস (Single Source of Truth)। সকল এআই এজেন্ট ও ডেভেলপারের জন্য এই নিয়মাবলী পুঙ্খানুপুঙ্খভাবে অনুসরণ করা অলঙ্ঘনীয়।

---

## 📑 সূচিপত্র (Table of Contents)
1. [১. কোর বিজনেস ও ল্যাঙ্গুয়েজ/থিম স্ট্যান্ডার্ড](#১-কোর-বিজনেস-ও-ল্যাঙ্গুয়েজথিম-স্ট্যান্ডার্ড)
2. [২. অলঙ্ঘনীয় রুট গ্রুপ আইসোলেশন (Route Group Isolation)](#২-অলঙ্ঘনীয়-রুট-গ্রুপ-আইসোলেশন-route-group-isolation)
3. [৩. ১০০% Server Component `page.tsx` + Sibling `*Client.tsx` স্ট্যান্ডার্ড](#৩-১০০-server-component-pagetsx--sibling-clienttsx-স্ট্যান্ডার্ড)
4. [৪. নেক্সট-জেএস কোর কম্পোনেন্ট রুলস (Link, Image, Form)](#৪-নেক্সট-জেএস-কোর-কম্পোনেন্ট-রুলস-link-image-form)
5. [৫. অটো-হাইডিং স্মার্ট নেভবার ও অ্যাক্টিভ ইন্ডিকেটর স্ট্যান্ডার্ড](#৫-অটো-হাইডিং-স্মার্ট-নেভবার-ও-অ্যাক্টিভ-ইন্ডিকেটর-স্ট্যান্ডার্ড)
6. [৬. এনিমেশন ও সিএসএস স্ট্যান্ডার্ড (No Globals.css Modification)](#৬-এনিমেশন-ও-সিএসএস-স্ট্যান্ডার্ড-no-globalscss-modification)
7. [৭. জিরো নেটিভ ফর্ম এলিমেন্টস নীতি (Zero Native Select/Date Policy)](#৭-জিরো-নেটিভ-ফর্ম-এলিমেন্টস-নীতি-zero-native-selectdate-policy)
8. [৮. Ant Design 6 আধুনিক এন্টারপ্রাইজ রুলস (Zero Console Warnings)](#৮-ant-design-6-আধুনিক-এন্টারপ্রাইজ-রুলস-zero-console-warnings)
9. [৯. পরিবেশ ভেরিয়েবল ও নোটিফিকেশন ইঞ্জিন (.env.local)](#৯-পরিবেশ-ভেরিয়েবল-ও-নোটিফিকেশন-ইঞ্জিন-envlocal)
10. [১০. সার্বজনীন রেসপন্সিভ পিল ট্যাববার স্ট্যান্ডার্ড (Universal Standalone Pill TabBar)](#১০-সার্বজনীন-রেসপন্সিভ-পিল-ট্যাববার-স্ট্যান্ডার্ড-universal-standalone-responsive-pill-tabbar-specification)

---
 
## ১. কোর বিজনেস ও ল্যাঙ্গুয়েজ/থিম স্ট্যান্ডার্ড

- **১০০% ইংরেজি ভাষা (Strictly English Only):**  
  - প্ল্যাটফর্মে কোনো দ্বিভাষিক বা বাংলা সুইচিং থাকবে না।
  - সমস্ত UI টেক্সট, হেডার, ফর্ম, মেটাডাটা ও বোতাম শতভাগ আন্তর্জাতিক প্রফেশনাল ইংরেজিতে লিখিত হবে।
- **একক সুসংহত থিম (Single Unified Theme, No Theme Toggle):**  
  - কোনো ডার্ক/লাইট মোড সুইচিং বোতাম বা অতিরিক্ত জটিলতা থাকবে না।
  - প্ল্যাটফর্মটি একটি একক, সুসংহত, প্রিমিয়াম এন্টারপ্রাইজ লাক্সারি থিমে পরিচালিত হবে:
    - **কোর ব্যাকগ্রাউন্ড:** আল্ট্রা-ক্লিন পিওর হোয়াইট (`#FFFFFF`) এবং সফট অফ-হোয়াইট/স্যান্ড সারফেস (`#F8FAFC`)।
    - **প্রাইমারি ব্র্যান্ড কালার:** ডিপ মিডনাইট অবসিডিয়ান/নেভি (`#1A2536` / `#0F172A`)।
    - **হাই-গ্রোথ অ্যাকসেন্ট:** ভাইব্র্যান্ট এমারেল্ড টিল (`#00B686` / `#10B981`)।
    - **লাক্সারি নিউট্রাল:** এলিগ্যান্ট ওয়ার্ম টাউপ/ব্রোঞ্জ (`#7A6D63`)।

---

## ২. অলঙ্ঘনীয় রুট গ্রুপ আইসোলেশন (Route Group Isolation)

```
┌──────────────────────────────────────────────────────────────┐
│                    Next.js 16.4.3 (App Router)               │
│                    React 19.3.0 + React Compiler             │
│                    Tailwind CSS v4 + Turbopack               │
│                    Node.js v24.22.1 (Latest LTS)             │
└──────────────────────────────┬───────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│   পাবলিক ও ক্লায়েন্ট ইন্টারফেস    │    │      অ্যাডমিন ও সিআরএম প্যানেল     │
│       src/app/(public)       │    │       src/app/(admin)        │
│                              │    │                              │
│   ★ shadcn/ui (Base UI)      │    │   ★ Ant Design 6 (AntD)      │
│   ★ Nova Preset + Lucide     │    │   ★ @ant-design/nextjs-registry  │
│   ★ Tailwind CSS v4          │    │   ★ লিড ডিসপ্যাচ ও কোটা হাব      │
│   ★ সাব-সেকেন্ড পেজ লোড ও     │    │   ★ এজেন্সির MRR লেজার ও         │
│     আল্ট্রা-প্রিমিয়াম লুক      │    │     এন্টারপ্রাইজ ডাটা টেবিল   │
└──────────────────────────────┘    └──────────────────────────────┘
```

- **`(public)` রুট গ্রুপ:**  
  - শুধুমাত্র `shadcn/ui` (Base UI primitive, Nova preset, Lucide icons, Tailwind v4) ব্যবহার করতে হবে।
  - **কঠোর নিষেধাজ্ঞা:** Ant Design-এর কোনো ফাইল, সিএসএস বা কম্পোনেন্ট কখনোই পাবলিক রুটে ইমপোর্ট করা যাবে না!
- **`(admin)` রুট গ্রুপ:**  
  - শুধুমাত্র Ant Design (`antd`) ব্যবহার করবে, যা `@ant-design/nextjs-registry` (`AntdRegistry`) দ্বারা সম্পূর্ণ আইসোলেটেড থাকবে।

---

## ৩. ১০০% Server Component `page.tsx` + Sibling `*Client.tsx` স্ট্যান্ডার্ড

### এর সুস্পষ্ট অর্থ ও মেকানিজম:
Next.js 16 App Router-এ সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO), ক্রলিং এবং ফাস্ট পেজ লোডের জন্য প্রতি পেজের রুট ফাইল `page.tsx`-কে **১০০% Server Component (RSC)** হতে হবে। কোনো `page.tsx`-এ কখনোই `"use client"` থাকবে না।

কিন্তু যে পেজে ইউজার ইন্টার‍্যাকশন রয়েছে (যেমন: স্টেট, বাটন ক্লিক, ফর্ম ফিল্ড, ড্রপডাউন, মোডাল, ক্যালকুলেটর), সেই ক্লায়েন্ট লজিকগুলোকে একই ডিরেক্টরিতে একটি **সিবলিং ক্লায়েন্ট কম্পোনেন্টে** রাখা হবে।

### ফোল্ডার নেম অনুসারে সিবলিং কম্পোনেন্টের নামকরণের বাধ্যতামূলক নিয়ম:

| রুট ডিরেক্টরি | সার্ভার পেজ (১০০% RSC) | সিবলিং ক্লায়েন্ট কম্পোনেন্ট | ক্লায়েন্ট ফাংশন নাম |
| :--- | :--- | :--- | :--- |
| **`app/(public)/`** (হোমপেজ) | `page.tsx` | `HomeClient.tsx` | `export function HomeClient()` |
| **`app/(public)/templates/`** | `page.tsx` | `TemplatesClient.tsx` | `export function TemplatesClient()` |
| **`app/(public)/agency/`** | `page.tsx` | `AgencyClient.tsx` | `export function AgencyClient()` |
| **`app/(public)/leads/`** | `page.tsx` | `LeadsClient.tsx` | `export function LeadsClient()` |
| **`app/(public)/partners/`** | `page.tsx` | `PartnersClient.tsx` | `export function PartnersClient()` |
| **`app/(admin)/admin/`** | `page.tsx` | `AdminClient.tsx` | `export function AdminClient()` |

**সার্ভার `page.tsx`-এর স্ট্যান্ডার্ড প্যাটার্ন:**
```tsx
import type { Metadata } from "next";
import { TemplatesClient } from "./TemplatesClient";

export const metadata: Metadata = {
  title: "Turnkey PropTech Templates & Web Systems",
  description: "Browse and deploy blazing-fast Next.js direct booking engines and broker portals.",
};

export default function TemplatesPage() {
  // সার্ভার ডেটা ফেচিং বা সরাসরি ক্লায়েন্ট রেন্ডারিং
  return <TemplatesClient />;
}
```

---

## ৪. নেক্সট-জেএস কোর কম্পোনেন্ট রুলস (Link, Image, Form)

1. **কখনোই কাঁচা `<a>` ট্যাগ নয় ➔ সর্বদা Next.js `<Link>`:**
   - ইন্টারনাল রাউটিংয়ের জন্য কখনোই HTML-এর সাধারণ `<a>` ট্যাগ ব্যবহার করা যাবে না। বাধ্যতামূলকভাবে `next/link` এর `<Link href="...">` ব্যবহার করতে হবে যাতে ক্লায়েন্ট-সাইড সফট নেভিগেশন ও প্রি-ফেচিং বজায় থাকে।
2. **কখনোই কাঁচা `<img>` ট্যাগ নয় ➔ সর্বদা Next.js `<Image>`:**
   - ছবির জন্য কাঁচা `<img>` সম্পূর্ণ নিষিদ্ধ। সর্বদা `next/image` এর `<Image src="..." alt="..." width={...} height={...} priority={...} />` ব্যবহার করতে হবে।
   - এটি ব্রাউজার ভেদে WebP/AVIF কম্প্রেশন, লেজি লোডিং এবং CLS (Cumulative Layout Shift) রোধ করে।
3. **সার্ভার কম্পোনেন্ট ফর্মে Next.js `<Form>` কম্পোনেন্ট:**
   - Server Component-এ কোনো সার্চ ফর্ম বা গেট-মেথড ফর্ম থাকলে HTML `<form>` এর বদলে Next.js 15/16 এর ডেডিকেটেড `import Form from 'next/form'` ব্যবহার করতে হবে, যা ফর্ম সাবমিশনে স্বয়ংক্রিয় প্রিক্যাশিং ও পেজ রিলোড ছাড়া রেজাল্ট প্রদর্শন করে।
4. **সিম্যান্টিক HTML ট্যাগ ব্যবহার:**
   - অতিরিক্ত জেনেরিক `<div>`-এর পরিবর্তে সঠিক সিম্যান্টিক ট্যাগ ব্যবহার করতে হবে: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`।

---

## ৫. অটো-হাইডিং স্মার্ট নেভবার ও অ্যাক্টিভ ইন্ডিকেটর স্ট্যান্ডার্ড

1. **Auto-Hiding Scroll Behavior:**
   - ব্যবহারকারী যখন পৃষ্ঠার **নিচের দিকে স্ক্রল করবে**, নেভবারটি মসৃণভাবে ওপরের দিকে স্লাইড হয়ে হাইড হবে (`-translate-y-full transition-transform duration-300`)।
   - ব্যবহারকারী স্ক্রল সামান্য **ওপরের দিকে তোলা মাত্রই** নেভবারটি তাৎক্ষণিকভাবে দৃশ্যমান হয়ে ফিরে আসবে (`translate-y-0`)।
   - পেজের একদম শীর্ষে (`scrollY <= 20`) থাকা অবস্থায় নেভবারটি সবসময় দৃশ্যমান থাকবে।
2. **Active Section Indicator (ScrollSpy):**
   - পৃষ্ঠার বিভিন্ন সেকশন (`#templates`, `#agency`, `#leads`, `#network`) বা রুটের বর্তমান অবস্থানের ওপর ভিত্তি করে নেভবারে অ্যাক্টিভ পিল/ইন্ডিকেটর হাইলাইট হবে।
3. **সিঙ্গেল-লাইন ব্র্যান্ডিং ও জিরো-কলিশন গ্যারান্টি:**
   - লোগোর নামের নিচে কোনো ২য় লাইন বা ট্যাগলাইন থাকবে না। লোগো ইমেজ (`/logo.png`) এবং টেক্সট একক অনুভূমিক লাইনে থাকবে।
   - মোবাইলে স্ক্রিনের প্রস্থে যাতে কোনো বোতামের সাথে ওভারল্যাপ না হয়, সেজন্য স্লিম প্রোফাইল (`h-16`) এবং ফ্রস্টেড গ্লাস ব্যাকড্রপ (`backdrop-blur-xl bg-white/80 border-b border-slate-100 shadow-xs`) বজায় থাকবে।

---

## ৬. এনিমেশন ও সিএসএস স্ট্যান্ডার্ড (No Globals.css Modification)

1. **Tailwind Built-in Utilities ও CSS-Only Motion:**
   - কোনো ভারী এক্সটার্নাল এনিমেশন লাইব্রেরি নয়; Tailwind v4-এর বিল্ট-ইন ইউটিলিটি দিয়ে সাবটল এবং মসৃণ মোশন নিশ্চিত করতে হবে:
     - হোভারে স্কেল: `hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`
     - ফেড ও স্লাইড: `transition-opacity duration-300`, `animate-in fade-in`
2. **Do NOT Modify `globals.css` (কঠোর অলঙ্ঘনীয় নিয়ম):**
   - কোনো নির্দিষ্ট কম্পোনেন্টের জন্য কাস্টম সিএসএস লেখার প্রয়োজনে কখনোই `src/styles/globals.css` মডিফাই করা যাবে না।
   - কাস্টম সিএসএসের প্রয়োজন হলে সেই নির্দিষ্ট কম্পোনেন্টের পাশে **CSS Modules** (`styles.module.css` বা `[ComponentName].module.css`) ব্যবহার করতে হবে।
   - `globals.css` শুধুমাত্র কোর থিম ভেরিয়েবল এবং Tailwind ডিরেক্টিভের জন্য সংরক্ষিত থাকবে।

---

## ৭. জিরো নেটিভ ফর্ম এলিমেন্টস নীতি (Zero Native Select/Date Policy)

1. **ব্রাউজার নেটিভ `<select>` শতভাগ নিষিদ্ধ:**
   - ড্রপডাউনের জন্য শুধুমাত্র এবং বাধ্যতামূলকভাবে Shadcn UI-এর `@/components/ui/select` (`Select, SelectTrigger, SelectValue, SelectContent, SelectItem`) ব্যবহার করতে হবে।
2. **ব্রাউজার নেটিভ `<input type="date">` শতভাগ নিষিদ্ধ:**
   - তারিখ নির্বাচনের জন্য বাধ্যতামূলকভাবে Shadcn UI-এর `@/components/ui/popover` + ক্যালেন্ডার ডেটপিকার ব্যবহার করতে হবে।
3. **টাইপ-সেফ ফর্ম ভ্যালিডেশন:**
   - সমস্ত ফর্ম হ্যান্ডলিংয়ে `react-hook-form` এবং `zod` (`@hookform/resolvers/zod`) ব্যবহার করতে হবে।

---

## ৮. Ant Design 6 আধুনিক এন্টারপ্রাইজ রুলস (Zero Console Warnings)

অ্যাডমিন প্যানেলে কনসোল ওয়ার্নিং সম্পূর্ণ রোধ করতে আধুনিক AntD v6 প্রপস ব্যবহার করতে হবে:
- **`Card`:** সর্বদা `variant="borderless"` অথবা `variant="outlined"` ব্যবহার করতে হবে (`bordered={false}` নিষিদ্ধ)।
- **`Statistic`:** সর্বদা `styles={{ content: { ... } }}` ব্যবহার করতে হবে (`valueStyle` নিষিদ্ধ)।
- **`Modal`:** সর্বদা `destroyOnHidden` ব্যবহার করতে হবে (`destroyOnClose` নিষিদ্ধ)।
- **`Drawer`:** সর্বদা `size="default" | "large"` ব্যবহার করতে হবে (`width` নিষিদ্ধ)।
- **SSR Hydration Guard:** AntD ক্লায়েন্ট কম্পোনেন্টে সবসময় `mounted` গার্ড নিশ্চিত করতে হবে:
  ```tsx
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Skeleton active />;
  ```
- **ডেস্কটপ টেবিল নো-র‍্যাপ প্রোটেকশন:** টেবিল কলামে `whiteSpace: "nowrap"` এবং ফিক্সড উইডথ দিয়ে কলামের কন্টেন্ট ভেঙে নিচে নামা (vertical squishing) রোধ করতে হবে।

---

## ৯. পরিবেশ ভেরিয়েবল ও নোটিফিকেশন ইঞ্জিন (.env.local)

আমাদের `.env.local` ফাইলে লাইভ প্রোডাকশন ক্রিডেনশিয়ালস সংরক্ষিত রয়েছে:
- **`TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID`:**  
  প্ল্যাটফর্মে যেকোনো নতুন টেন্যান্ট লিড, ব্রোকার সাবস্ক্রিপশন বা টার্নকি সাইট অর্ডার আসা মাত্রই সার্ভার অ্যাকশন থেকে স্বয়ংক্রিয়ভাবে সরাসরি আপনার টেলিগ্রামে ইনস্ট্যান্ট পুশ অ্যালার্ট পাঠাবে।
- **`DISCORD_WEBHOOK_URL`:**  
  টিম ম্যানেজমেন্ট ও রিয়েল-টাইম ডিসপ্যাচের জন্য প্রতিটি ইভেন্ট ডিসকর্ড চ্যানেলে অটো-লগ হবে।
- **`MONGODB_URI`:**  
  আমাদের ক্লাস্টার `propgrowthlabcluster` কানেকশনের জন্য প্রস্তুত। `src/lib/mongodb.ts` এ কানেকশন ক্যাশিং নিশ্চিত করতে হবে।

---

## ১০. সার্বজনীন রেসপন্সিভ পিল ট্যাববার স্ট্যান্ডার্ড (Universal Standalone Responsive Pill TabBar Specification)

এই সেকশনটি সম্পূর্ণ **স্বাধীন ও স্বয়ংসম্পূর্ণ (Standalone)**। যেকোনো নতুন পেজ বা প্রজেক্টে (যেখানে কোনো নেভবার থাকুক বা না থাকুক) ক্যাটাগরি, ফিল্টার বা সেগমেন্টেড ট্যাববার তৈরি করার সময় এই স্পেসিফিকেশন হুবহু অনুসরণ করতে হবে।

---

### ১. ডিভাইস ভেদে রেসপন্সিভ বিহেভিয়ার (Device-Specific UX Behaviors):

| ডিভাইস ক্যাটাগরি | স্ক্রিন সাইজ | নির্ধারিত ট্যাববার আচরণ ও রেসপন্সিভ মেকানিজম |
| :--- | :--- | :--- |
| **📱 মোবাইল (Mobile)** | `< 640px` | • ট্যাব কখনোই ২য় লাইনে র‍্যাপ হবে না বা গ্রিডে ভাঙবে না (`whitespace-nowrap flex-nowrap`)।<br>• ১০০% স্মুথ ফ্লুইড অনুভূমিক স্ক্রল (`overflow-x-auto no-scrollbar scroll-smooth`)।<br>• ডানে অতিরিক্ত ট্যাব আছে বোঝাতে ডান প্রান্তে সফট ফেড ও ভাসমান অ্যারো বাটন ভেসে উঠবে।<br>• নিচে/উপরে সহায়ক কাউন্টার টেক্সট থাকবে (যেমন: `X items across Y categories · Scroll or use arrows`)। |
| **💻 মিডেল / ট্যাবলেট (Tablet)** | `640px – 1024px` | • স্ক্রিন উইডথ অনুযায়ী ফ্লুইড কনটেইনার হিসেবে বসবে। ট্যাবের সংখ্যা বেশি হলে সেন্টারিং বাগ ছাড়া বাম প্রান্ত থেকে স্ক্রলযোগ্য থাকবে।<br>• ভাসমান `<` ও `>` বোতামে সিঙ্গেল ট্যাপে ±240px স্মুথ ড্রাইভ করবে।<br>• ব্রাউজারের কোনো স্ক্রলবার দৃশ্যমান থাকবে না (`[&::-webkit-scrollbar]:hidden [scrollbar-width:none]`)। |
| **🖥️ ডেস্কটপ ও লার্জ স্ক্রিন (Desktop)** | `> 1024px` | • সমস্ত ট্যাব একক সারিতে সুবিন্যস্তভাবে প্রদর্শিত হবে।<br>• অতিরিক্ত উপাদান না থাকলে গ্রেডিয়েন্ট ফেড মাস্ক ও অ্যারো বোতাম স্বয়ংক্রিয়ভাবে সম্পূর্ণ অদৃশ্য (`opacity-0 pointer-events-none`) থাকবে। |

---

### ২. কোর জ্যামিতি ও স্টাইলিং স্ট্যান্ডার্ড (Independent Geometry & Design System):

1. **ফুল পিল জ্যামিতি (Strict `rounded-full` Geometry):**
   - আউটার কন্টেইনার (`TabsList`) এবং ভেতরের প্রতিটি ট্যাব (`TabsTrigger`) বাধ্যতামূলকভাবে **`rounded-full`** হতে হবে (কোনো `rounded-xl`, `rounded-2xl` বা স্কয়ার কর্নার সম্পূর্ণ নিষিদ্ধ)।
2. **আরামদায়ক উচ্চতা ও প্যাডিং (Comfortable Touch & Click Targets):**
   - `TabsList` কন্টেইনার: **`!h-auto min-h-[48px] p-1.5`**
   - প্রতিটি `TabsTrigger` বাটন: **`h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold shrink-0 whitespace-nowrap`**
3. **একটিভ ও ইন-একটিভ স্টেট কন্ট্রাস্ট:**
   - **একটিভ স্টেট:** ডার্ক ব্যাকগ্রাউন্ড, হোয়াইট টেক্সট, সফট শ্যাডো এবং বোল্ড ফন্ট:  
     `data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full`
   - **ইন-একটিভ স্টেট:** পরিচ্ছন্ন নিউট্রাল টেক্সট ও সাবটল হোভার ডার্কেনিং:  
     `text-stone-600 hover:text-stone-900 transition-all cursor-pointer`

---

### ৩. অলঙ্ঘনীয় ৩টি টেকনিক্যাল বাগ প্রিভেনশন রুলস (Critical Pitfalls Checklist):

- ⚠️ **Bug 1: Flex-Center Negative Margin Cutoff (অলঙ্ঘনীয় `!justify-start`):**  
  Shadcn UI-এর `TabsList`-এ বাই-ডিফল্ট `justify-center` থাকে। স্ক্রলযোগ্য ট্যাবে কন্টেন্টের দৈর্ঘ্য স্ক্রিন ছাড়িয়ে গেলে `justify-center`-এর কারণে ব্রাউজার উপাদানগুলোকে সেন্টারিং করতে গিয়ে নেগেটিভ কোঅর্ডিনেটে ঠেলে প্রথম আইটেমের বাম পাশ কেটে ফেলে (যেমন: `All Systems` কেটে `ems` হওয়া)।  
  ➔ **সমাধান:** `TabsList`-এ অবশ্যই **`!justify-start items-center`** দিতে হবে।
- ⚠️ **Bug 2: Height-8 Squished Pills (অলঙ্ঘনীয় `!h-auto min-h-[48px]`):**  
  Shadcn UI-এর `TabsList`-এ বাই-ডিফল্ট `h-8` (32px) থাকে, যা ভেতরের ট্যাব বাটনকে চ্যাপ্টা করে ফেলে।  
  ➔ **সমাধান:** `TabsList`-এ **`!h-auto min-h-[48px]`** এবং ট্র্রিগারে **`h-9`** দিতে হবে।
- ⚠️ **Bug 3: Zero Affordance (অতিরিক্ত ট্যাব অদৃশ্য থাকা রোধে ফেড ও অ্যারো):**  
  ইউজার স্ক্রিন দেখে যেন কখনোই বিভ্রান্ত না হয় যে বাইরে আর কোনো অপশন নেই।  
  ➔ **সমাধান:** দুই প্রান্তে ডায়নামিক গ্রেডিয়েন্ট ফেড ও রাউন্ডেড শ্যাডো অ্যারো বাটন থাকতে হবে।

---

### ৪. সম্পূর্ণ সেলফ-কন্টেইন্ড প্রোডাকশন কোড (Plug & Play Copy-Paste):

যেকোনো ফাইলে এই ট্যাববারটি সরাসরি ইমপ্লিমেন্ট করতে নিচের সম্পূর্ণ কোডটি ব্যবহার করতে হবে:

```tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function StandalonePillTabBar({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: { id: string; label: string; count?: number }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // স্ক্রল পজিশন পর্যবেক্ষণ (বাম ও ডানে অতিরিক্ত ট্যাব আছে কিনা)
  const checkTabsScroll = useCallback(() => {
    if (tabsListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkTabsScroll, 60);
    window.addEventListener("resize", checkTabsScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkTabsScroll);
    };
  }, [checkTabsScroll]);

  // এক ক্লিকে মসৃণ স্ক্রল
  const handleScrollTabs = (direction: "left" | "right") => {
    if (tabsListRef.current) {
      const offset = direction === "left" ? -240 : 240;
      tabsListRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setTimeout(checkTabsScroll, 320);
    }
  };

  return (
    <div className="relative w-full lg:w-auto max-w-full">
      {/* বাম পাশের গ্রেডিয়েন্ট ফেড ও স্ক্রল বাটন */}
      <div
        className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pl-1 pr-6 bg-gradient-to-r from-[#fbfbfa] via-[#fbfbfa]/95 to-transparent transition-opacity duration-200 pointer-events-none rounded-l-full ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => handleScrollTabs("left")}
          className="pointer-events-auto w-7 h-7 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* কোর পিল ট্যাববার */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full lg:w-auto">
        <TabsList
          ref={tabsListRef}
          onScroll={checkTabsScroll}
          className="bg-stone-100/90 p-1.5 rounded-full w-full lg:w-auto flex flex-nowrap overflow-x-auto gap-1 border border-stone-200/90 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth !justify-start items-center !h-auto min-h-[48px]"
        >
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="shrink-0 whitespace-nowrap h-9 px-4 sm:px-4.5 text-xs sm:text-[12.5px] font-semibold data-[state=active]:bg-stone-900 data-[state=active]:text-white data-[state=active]:shadow-xs data-[state=active]:font-bold rounded-full transition-all cursor-pointer hover:text-stone-900"
            >
              {cat.label} {cat.count !== undefined ? `(${cat.count})` : ""}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ডান পাশের গ্রেডিয়েন্ট ফেড ও স্ক্রল বাটন */}
      <div
        className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pr-1 pl-6 bg-gradient-to-l from-[#fbfbfa] via-[#fbfbfa]/95 to-transparent transition-opacity duration-200 pointer-events-none rounded-r-full ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => handleScrollTabs("right")}
          className="pointer-events-auto w-7 h-7 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

---
*ডকুমেন্ট সংরক্ষিত হলো: অক্টোবর ২০২৬ | PropGrowth Lab Master Architecture Rules v2.0*
