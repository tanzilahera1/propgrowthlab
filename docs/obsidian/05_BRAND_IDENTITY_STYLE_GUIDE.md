# 🎨 PROP GROWTH LAB: ব্র্যান্ড আইডেন্টিটি ও স্টাইল গাইড

> **ডকুমেন্ট উদ্দেশ্য:** এই ফাইলে **Prop Growth Lab**-এর ভিজ্যুয়াল ব্র্যান্ড আইডেন্টিটি, কালার প্যালেট, টাইপোগ্রাফি, লোগো স্পেসিফিকেশন এবং কম্পোনেন্ট ডিজাইন প্রিন্সিপাল বিস্তারিতভাবে লিপিবদ্ধ করা হয়েছে।

---

## ১. কোর ডিজাইন দর্শন (Aesthetic Philosophy)

Prop Growth Lab-এর ডিজাইন আর্কিটেকচার সাধারণ বা জেনেরিক টেমপ্লেট থেকে সম্পূর্ণ আলাদা:
* **আল্ট্রা-লাক্সারি হসপিটালিটি অনুভূতি:** শীতল নীল বা সস্তা লাউড রঙের বদলে উষ্ণ লাক্সারি স্টোন ও গোল্ডেন অ্যাম্বারের আবহ।
* **হাই ট্রাস্ট ও মিনিমালিজম:** পরিপাটি হোয়াইটস্পেস, সূক্ষ্ম কাঁচের মতো বর্ডার (Subtle Glassmorphism), এবং প্রিমিয়াম কনট্রাস্ট।
* **মাইক্রো-ইন্টার‍্যাকশন:** মসৃণ হোভার ইফেক্ট, গ্রেডিয়েন্ট গ্লো এবং দ্রুতগতির প্রতিক্রিয়াশীল অভিজ্ঞতা।

---

## ২. অফিশিয়াল কালার প্যালেট (Color Palette & Tokens)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROP GROWTH LAB COLOR PALETTE                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
【১. Warm Stone Linen】           【২. Radiant Amber Glow】         【৩. Deep Obsidian Charcoal】
(প্রিমিয়াম ক্যানভাস ব্যাকগ্রাউন্ড)  (প্রাইমারি অ্যাকশন ও এক্সেন্ট)    (ডার্ক সেকশন ও টেক্সট কনট্রাস্ট)
#fbfbfa / #f7f5f0               #d97706 / #f59e0b / #b45309      #1c1917 / #0c0a09
```

### কালার টোকেন ম্যাট্রিক্স:
* **Background Canvas (Light):** `#fbfbfa` (Warm Stone White) ও `#f7f5f0` (Soft Linen).
* **Primary Accent (Brand Glow):**
  - **Base Amber:** `#d97706` (Primary interactive buttons, highlights)
  - **Light Amber:** `#f59e0b` (Gradient stop, hover highlights)
  - **Dark Amber:** `#b45309` (Active state, deep borders)
* **Dark Surfaces (Footer & Pre-Footer):**
  - **Header/Footer Gradient:** `from-[#181206] via-[#120e07] to-stone-950`
  - **Deep Charcoal Card:** `#1c1917` with subtle amber ambient glow.
* **Text Hierarchy:**
  - **Primary Text:** `#0c0a09` (Deep Stone Black)
  - **Muted Text:** `#78716c` (Stone 500)
  - **Dark Mode Primary Text:** `#fafaf9` (Stone 50)

---

## ৩. লোগো স্পেসিফিকেশন ও আইকন স্ট্যান্ডার্ড

* **লোগো ফাইল পাথ:** `public/logo.png`
* **ওপেনগ্রাফ ব্যানার:** `public/og.png` (1200x630px)
* **লোগো গ্রেডিয়েন্ট স্পেসিফিকেশন:**
  - **কালার ১:** `#d97706` (Solid Rich Amber)
  - **কালার ২:** `#f59e0b` (Bright Gold Amber)
  - **গ্রেডিয়েন্ট কোণ (Angle):** 135 ডিগ্রি (Linear Gradient from Top-Left to Bottom-Right)
* **সাইজিং রুলস:**
  - Favicon: `32x32px`
  - Apple Touch Icon: `180x180px`
  - PWA Web Manifest: `192x192px` এবং `512x512px`
  - নেভিগেশন বার লোগো হাইট: `36px` বা `40px`

---

## ৪. টাইপোগ্রাফি সিস্টেম (Typography System)

আমরা Google Fonts-এর আধুনিক Geist ফন্ট ফ্যামিলি ব্যবহার করি:
* **Body & UI Font:** `Geist Sans` (`--font-geist-sans`) — পরিষ্কার, ক্রিস্প এবং আধুনিক স্ক্রিন রিডাবিলিটি।
* **Numerical & Data Font:** `Geist Mono` (`--font-geist-mono`) — মেট্রিক্স, পরিসংখ্যান, কোড এবং আর্থিক হিসাবের জন্য।
* **হেডিং হায়ারার্কি:**
  - `H1`: Bold 4xl / 5xl, ট্র্যাকিং টাইট (`tracking-tight`), হাই-কনভার্সন স্টেটমেন্ট।
  - `H2`: Semi-bold 2xl / 3xl, পরিষ্কার সেকশন টাইটেল।
  - `Body`: Regular 16px / 18px, লাইন-হাইট `leading-relaxed`।

---

## ৫. ইউআই কম্পোনেন্ট ডিজাইন নীতিমালা

1. **বাটন (Buttons):**
   - প্রাইমারি বাটন: Radiant Amber সলিড ব্যাকগ্রাউন্ড (`bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-500/20`).
   - সেকেন্ডারি বাটন: স্টোন বর্ডারযুক্ত লিঙ্ক বা আউটলাইন বাটন (`border border-stone-200 bg-white hover:bg-stone-50`).
2. **ভ্যালু কার্ডস (Value Cards):**
   - রাউন্ডেড কর্নার: `rounded-2xl`
   - বর্ডার: অতি সূক্ষ্ম `border border-stone-200/80`
   - হোভার ইফেক্ট: `hover:shadow-lg hover:border-amber-300/80 transition-all duration-300`
3. **ফর্ম ইনপুটস (Form Controls):**
   - হাইট: `h-11` বা `h-12` (মোবাইলে সহজে ট্যাপ করার জন্য)
   - ফোকাস রিং: `focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600`

---
*সর্বশেষ আপডেট: ২৮ অক্টোবর ২০২৬ | Prop Growth Lab Brand Guidelines*
