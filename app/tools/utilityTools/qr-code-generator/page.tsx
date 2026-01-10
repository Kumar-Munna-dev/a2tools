 

import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Download } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://A2tool.com");
const handleCopy = async () => {
  try {
    // Try the modern Clipboard API (supported in most mobile browsers)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      alert("✅ Text copied to clipboard!");
    } else {
      // Fallback for older mobile browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("✅ Text copied (fallback method)!");
    }
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    alert("❌ Copy not supported on this device. Please copy manually.");
  }
};


  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div
        
        className=" full w mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
      >
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          QR Code Generator – Create QR Codes Instantly
        </h1>

        {/* Input Field */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter text or URL to generate QR code..."
        />

        {/* Generated QR */}
        <div className="mt-4 flex justify-center">
          <QRCodeCanvas
            id="qr-gen"
            value={text || " "}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition"
          >
            <Copy className="h-4 w-4" /> Copy Text
          </button>
          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Download className="h-4 w-4" /> Download QR
          </button>
        </div>

        {/* SEO Intro Text */}
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <h2 className="font-semibold mb-2">📖 About QR Code Generator Tool</h2>
          <p>
            This <strong>QR Code Generator</strong> lets you instantly create
            scannable QR codes for links, messages, or any text. Perfect for
            sharing URLs, business cards, Wi-Fi access, or payment details.
          </p>
          <p className="mt-2">
            It’s completely free, fast, and works offline — your data stays
            secure on your device. Create QR codes anytime, anywhere.
          </p>
        </div>

        {/* 🔽 SEO Dropdown Section */}
        <div className="mt-10 space-y-6">
          <InfoDropdown
            title="🔳 What Is a QR Code Generator and How Does It Work?"
            content="A QR code generator is an online tool that instantly converts text, links, or payment information into a scannable QR code. When scanned, it opens the embedded data instantly. Our QR Code Generator works fully offline and ensures your data remains private."
          />

          <InfoDropdown
            title="📱 How Does a QR Code Scanner Work?"
            content="A QR code scanner uses your device’s camera to read and decode QR codes. It extracts embedded details like links, contacts, or UPI information and displays them instantly. Our online scanner works locally and never uploads your data to a server."
          />

          <InfoDropdown
            title="💡 Benefits of Using a QR Code Generator and Scanner Tool"
            content="QR codes simplify sharing links, menus, tickets, and digital payments. Our free QR tools let you generate and scan codes instantly on any device — secure, fast, and without installing any app."
          />

          <InfoDropdown
            title="⚙️ Types of Information You Can Encode in a QR Code"
            content="You can encode website URLs, text, Wi-Fi credentials, phone numbers, UPI payment links, or event details. QR codes are flexible, easy to use, and ideal for contactless sharing across industries."
          />

          <InfoDropdown
            title="🔒 Is It Safe to Use an Online QR Code Generator or Scanner?"
            content="Yes ✅ — our QR tools are completely secure. They process everything inside your browser without saving or sending data externally, ensuring 100% privacy."
          />

          <InfoDropdown
            title="🌍 Why Choose Our Free QR Code Tools?"
            content="Our tools are designed for simplicity, speed, and reliability. They are mobile-friendly, SEO-optimized, and privacy-focused. Generate or scan any QR code instantly, safely, and for free."
          />
        </div>
      </div>
    </main>
  );
}
