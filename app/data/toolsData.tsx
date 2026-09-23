/**
 * ==========================================
 * A2TOOLS CENTRAL REGISTRY (INTERN GUIDE)
 * ==========================================
 * 
 * INTERN NOTE: 
 * This file is the "brain" of the website's navigation. 
 * Whenever you create a new tool, you MUST add it to the correct array below.
 * This automatically makes the tool appear on the homepage, in the sidebars, and in the "Related Tools" sections.
 * 
 * Instructions for adding a new tool:
 * 1. Import a relevant icon from 'lucide-react'.
 * 2. Find the correct category array (e.g., utilityTools, imageTools).
 * 3. Add an object with title, description, icon, and href.
 */

import React from "react";
import {
  FileArchive,
  Lock,
  QrCode,
  Code,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Palette,
  Ruler,
  Shield,
  Link as LinkIcon,
  KeyRound,
  Hash,
  ClipboardCheck,
  Volume2,
  Mic,
  Scissors,
  Image,
  Circle,
  Instagram,
  Square,
  Phone,
  Building,
  Download,
} from "lucide-react";

export interface ToolItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

/* ================================
   🧩 UTILITY TOOLS
================================ */
export const utilityTools: ToolItem[] = [
{
  title: "Phone Number Location Tracker",
  description: "Find phone number location, country, state, and telecom operator details online for free.",
  icon: <Phone className="w-5 h-5" />,
  href: "/tools/utilityTools/phone-number",
},

  {
    title: "Password Generator",
    description: "Generate strong, secure passwords with strength meter.",
    icon: <Lock className="w-5 h-5" />,
    href: "/tools/utilityTools/password-generator",
  },
  {
    title: "EMI Calculator",
    description: "Calculate monthly loan installments easily and accurately.",
    icon: <DollarSign className="w-5 h-5" />,
    href: "/tools/utilityTools/emi-calculator",
  },
  {
    title: "Password Strength Checker",
    description: "Test the strength of your password.",
    icon: <KeyRound className="w-5 h-5" />,
    href: "/tools/utilityTools/password-strength-checker",
  },
  {
    title: "QR Code Generator & Scanner",
    description: "Create and scan QR codes with customizations.",
    icon: <QrCode className="w-5 h-5" />,
    href: "/tools/utilityTools/qr-code-generator",
  },
  {
    title: "URL Shortener",
    description: "Shorten long URLs with history.",
    icon: <LinkIcon className="w-5 h-5" />,
    href: "/tools/utilityTools/url-shortener",
  },
  {
    title: "Online Notepad",
    description: "Quick and simple auto-saving online notepad.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/utilityTools/online-notepad",
  },
  {
    title: "Unit Converter",
    description: "Convert between various units of measurement.",
    icon: <Ruler className="w-5 h-5" />,
    href: "/tools/utilityTools/unit-converter",
  },
  {
    title: "Currency Converter",
    description: "Real-time exchange rate conversions.",
    icon: <DollarSign className="w-5 h-5" />,
    href: "/tools/utilityTools/currency-converter",
  },
  {
    title: "Stopwatch & Timer",
    description: "Measure time or set a countdown.",
    icon: <Clock className="w-5 h-5" />,
    href: "/tools/utilityTools/stopwatch-timer",
  },
  {
    title: "Date & Time Tools",
    description: "Calculate date differences and check timezones.",
    icon: <Calendar className="w-5 h-5" />,
    href: "/tools/utilityTools/date-time-tools",
  },
  {
    title: "Epoch/Timestamp Converter",
    description: "Convert UNIX timestamps to human-readable dates.",
    icon: <Hash className="w-5 h-5" />,
    href: "/tools/utilityTools/epoch-converter",
  },
  {
    title: "Base64 Encoder / Decoder",
    description: "Encode to and decode from Base64.",
    icon: <Code className="w-5 h-5" />,
    href: "/tools/utilityTools/base64-encoder-decoder",
  },
  {
    title: "JSON Formatter & Validator",
    description: "Format, validate, and beautify JSON data.",
    icon: <Code className="w-5 h-5" />,
    href: "/tools/utilityTools/json-formatter",
  },
  {
    title: "HTML/CSS/JS Minifier",
    description: "Minify code to reduce file size.",
    icon: <Code className="w-5 h-5" />,
    href: "/tools/utilityTools/code-minifier",
  },
  {
    title: "JSON to CSV Converter",
    description: "Convert between JSON and CSV formats.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/utilityTools/json-to-csv",
  },
  {
    title: "Color Converter & Picker",
    description: "Convert HEX, RGB, HSL and pick colors.",
    icon: <Palette className="w-5 h-5" />,
    href: "/tools/utilityTools/color-converter-picker",
  },
  {
    title: "Text Encryption/Decryption",
    description: "Securely encrypt and decrypt text.",
    icon: <Shield className="w-5 h-5" />,
    href: "/tools/utilityTools/text-encrypt-decrypt",
  },
  {
    title: "File Compressor (ZIP)",
    description: "Create a ZIP file from multiple files.",
    icon: <FileArchive className="w-5 h-5" />,
    href: "/tools/utilityTools/file-compressor",
  },
  {
    title: "File Converter",
    description: "Convert between document formats like TXT, DOCX, PDF.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/utilityTools/file-converter",
  },
];

/* ================================
   ✍️ TEXT TOOLS
================================ */
export const textTools: ToolItem[] = [
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and reading time.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/textTools/word-counter",
  },
  {
    title: "Text Case Converter",
    description: "Convert text to uppercase, lowercase, and more.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/textTools/text-case-converter",
  },
  {
    title: "Text Formatter / Cleaner",
    description: "Remove extra spaces, line breaks, or HTML tags.",
    icon: <ClipboardCheck className="w-5 h-5" />,
    href: "/tools/textTools/text-cleaner",
  },
  {
    title: "Text to Speech (TTS)",
    description: "Convert your text into natural-sounding speech.",
    icon: <Volume2 className="w-5 h-5" />,
    href: "/tools/textTools/text-to-speech",
  },
  {
    title: "Speech to Text",
    description: "Transcribe your voice into text in real-time.",
    icon: <Mic className="w-5 h-5" />,
    href: "/tools/textTools/speech-to-text",
  },
];


/* ================================
   🧮 CALCULATOR TOOLS
================================ */
export const calculatorTools: ToolItem[] = [
  {
    title: "Basic Calculator",
    description: "A simple calculator for everyday use.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/calculatorTools/basic-calculator",
  },
  {
    title: "Scientific Calculator",
    description: "Advanced calculator for scientific use.",
    icon: <KeyRound className="w-5 h-5" />,
    href: "/tools/calculatorTools/scientific-calculator",
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages, tips, and fractions easily.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/calculatorTools/percentage-calculator",
  },
  {
    title: "GST / VAT Calculator",
    description: "Calculate Goods and Services Tax quickly.",
    icon: <Building className="w-5 h-5" />,
    href: "/tools/calculatorTools/gst-vat-calculator",
  },
  {
    title: "Discount Calculator",
    description: "Find final prices after applying discounts.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/calculatorTools/discount-calculator",
  },
  {
    title: "EMI Calculator",
    description: "Calculate Equated Monthly Installments for loans.",
    icon: <DollarSign className="w-5 h-5" />,
    href: "/tools/calculatorTools/emi-calculator",
  },
  {
    title: "Age Calculator",
    description: "Find your exact age in years, months, and days.",
    icon: <Calendar className="w-5 h-5" />,
    href: "/tools/calculatorTools/age-calculator",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index easily.",
    icon: <Image className="w-5 h-5" />,
    href: "/tools/calculatorTools/bmi-calculator",
  },
];

/* ================================
   🖼️ IMAGE TOOLS
================================ */
export const imageTools: ToolItem[] = [
  {
    title: "Image Compressor",
    description: "Compress images without losing quality.",
    icon: <Image className="w-5 h-5" />,
    href: "/tools/imageTools/image-compressor",
  },
  {
    title: "Image Resizer & Cropper",
    description: "Resize and crop images to any dimension.",
    icon: <Scissors className="w-5 h-5" />,
    href: "/tools/imageTools/resizer-cropper",
  },
  {
    title: "Circular Image Cropper",
    description: "Crop images into perfect circles.",
    icon: <Circle className="w-5 h-5" />,
    href: "/tools/imageTools/circular-cropper",
  },
  {
    title: "Instagram Image Resizer",
    description: "Perfect sizes for IG Posts & Stories.",
    icon: <Instagram className="w-5 h-5" />,
    href: "/tools/imageTools/instagram-resizer",
  },
  {
    title: "Round Corners on Image",
    description: "Add smooth rounded edges to photos.",
    icon: <Square className="w-5 h-5" />,
    href: "/tools/imageTools/round-corners",
  },
  {
    title: "Convert Image Formats",
    description: "Convert between JPG, PNG, WebP, and more.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/imageTools/format-converter",
  },
  {
    title: "Image Color Picker",
    description: "Pick colors from any image.",
    icon: <Palette className="w-5 h-5" />,
    href: "/tools/imageTools/color-picker",
  },
  {
    title: "Image Rotator & Flipper",
    description: "Rotate and flip your images easily.",
    icon: <Image className="w-5 h-5" />,
    href: "/tools/imageTools/rotator-flipper",
  },
  {
    title: "Image Watermark Tool",
    description: "Add watermark text or logos to images.",
    icon: <Image className="w-5 h-5" />,
    href: "/tools/imageTools/watermark-tool",
  },
  {
    title: "Image Filters & Effects",
    description: "Apply filters like sepia, blur, grayscale, etc.",
    icon: <Image className="w-5 h-5" />,
    href: "/tools/imageTools/filters-effects",
  },
  
  {
    title: "Image Metadata Viewer",
    description: "View or remove EXIF data from images.",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/imageTools/metadata-viewer",
  },
];
