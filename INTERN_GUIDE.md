# A2Tools - Developer & Intern Onboarding Guide

Welcome to the **A2Tools** project! This document is designed specifically to help new developers and interns understand how this project is built, how the architecture works, and how to easily add or modify tools.

---

## 1. Project Overview

A2Tools is a fast, responsive, and SEO-friendly toolkit application built with **Next.js 14+ (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

The site is divided into categories:
- **Calculator Tools**
- **Image Tools**
- **Text Tools**
- **Utility Tools**

Everything runs completely **client-side** in the user's browser, meaning we don't need a backend database to process images or run calculations. This makes the app incredibly fast and completely private for the users!

---

## 2. Architecture & File Structure

Here is how the project is organized:

```
a2tools/
├── app/
│   ├── components/       # Reusable UI parts (e.g., ToolLayout, SeoMeta, ImageDropzone)
│   ├── data/             # Contains `toolsData.tsx` (the central registry for all tools)
│   ├── tools/            # The actual tools! Divided by category.
│   │   ├── calculatorTools/
│   │   ├── imageTools/
│   │   ├── textTools/
│   │   └── utilityTools/
│   ├── page.tsx          # The homepage
│   └── layout.tsx        # The main site wrapper (Nav, Footer, etc.)
├── public/               # Static assets (images, icons, etc.)
└── package.json          # Project dependencies (npm install)
```

---

## 3. Core Concepts You Must Know

### A. The `<ToolLayout />` Component
Every single tool you create MUST be wrapped in the `<ToolLayout>` component. 
This wrapper automatically provides:
- The breadcrumb navigation at the top (Home > Tools > Image Tools > Your Tool)
- The Title and Description of the tool
- The "Related Tools" sidebar on the right side of the screen
- The layout structure (responsive grid)

### B. The `<SeoMeta />` Component
Every tool needs its own Next.js Page metadata. Instead of rewriting complex SEO tags manually, we use `SeoMeta` in the `page.tsx` of each tool to automatically generate Meta Tags, OpenGraph (Facebook/Twitter cards), and rich Schema markup for Google search.

---

## 4. How to Create a New Tool (Step-by-Step)

Let's say you want to create a new tool called "Meme Generator" under Image Tools.

### Step 1: Create the Folder
Create a folder named `meme-generator` inside `app/tools/imageTools/`.

### Step 2: Create the Tool Component (`MemeGenerator.tsx`)
Create the React component that actually does the work. Always start with `"use client";` because tools require browser interactivity.

```tsx
"use client";
import React, { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function MemeGenerator() {
  return (
    <ToolLayout
      title="Meme Generator"
      description="Create funny memes instantly."
      toolType="ImageTool"
      categoryPath="/tools/imageTools"
      categoryName="Image Tools"
    >
      {/* YOUR TOOL UI GOES HERE */}
      <div className="p-10 text-center">
         <h1>My Awesome Tool UI</h1>
      </div>
    </ToolLayout>
  );
}
```

### Step 3: Create the Page Wrapper (`page.tsx`)
Next.js App Router requires a `page.tsx` file to route the URL. This file handles SEO and renders your component.

```tsx
import type { Metadata } from "next";
import MemeGenerator from "./MemeGenerator";
import SeoMeta from "@/app/components/SeoMeta";

// Next.js static metadata
export const metadata: Metadata = {
  title: "Meme Generator - Free Tool | A2Tool",
  description: "Create funny memes instantly online.",
  // ... add OpenGraph & keywords here
};

export default function Page() {
  return (
    <>
      <SeoMeta
        title="Meme Generator"
        description="Create funny memes instantly online."
        url="https://a2tool.com/tools/imageTools/meme-generator/"
        toolType="WebApplication"
      />
      <MemeGenerator />
    </>
  );
}
```

### Step 4: Register the Tool in `toolsData.tsx`
For your tool to show up in the sidebar and homepage, you must add it to the global list.
Open `app/data/toolsData.tsx` and find the `imageTools` array:

```tsx
export const imageTools: Tool[] = [
  // ... other tools ...
  {
    title: "Meme Generator",
    description: "Create funny memes instantly.",
    icon: <ImageIcon className="w-5 h-5" />, // Import an icon from lucide-react
    href: "/tools/imageTools/meme-generator",
  },
];
```

---

## 5. Standard Practices for Interns

1. **Icons:** We use `lucide-react` for all icons. You can find them at [lucide.dev](https://lucide.dev/).
2. **Styling:** Use **Tailwind CSS**. Never write custom CSS files unless strictly necessary.
3. **No Backend APIs:** All calculations and file manipulations (like images/PDFs) must be done in the browser using JavaScript/Canvas/Blobs to protect user privacy.
4. **Testing:** Run `npm run dev` to start the local server and verify your tool works. Always ensure there are no red squiggly TypeScript errors before pushing code.

Welcome to the team! If you follow these guidelines, the codebase will remain clean, fast, and easy to maintain.
