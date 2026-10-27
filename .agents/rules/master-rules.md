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
*ডকুমেন্ট সংরক্ষিত হলো: অক্টোবর ২০২৬ | PropGrowth Lab Master Architecture Rules v2.0*
