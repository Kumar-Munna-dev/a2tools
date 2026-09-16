"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Copy, RefreshCw, ExternalLink } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ Mobile-safe copy function
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shortUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shortUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert("❌ Copy failed. Please copy manually.");
    }
  };

  // 🔗 Shorten URL using TinyURL API
  const shortenUrl = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const data = await response.text();
      setShortUrl(data);
    } catch (err) {
      alert("❌ Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUrl("");
    setShortUrl("");
  };

  return (

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50"
      >
        <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <h1 className="text-2xl font-bold text-center mb-6 flex justify-center items-center gap-2">
          URL Shortener – Shorten Long Links Instantly
        </h1>

        {/* Input Box */}
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            className="w-full p-3 pr-10 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <Link2 className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={shortenUrl}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            <RefreshCw className="h-4 w-4" />
            {loading ? "Shortening..." : "Shorten URL"}
          </button>

          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 rounded-lg border"
          >
            <p className=" text-sm mb-2 font-semibold">
              Shortened URL:
            </p>
            <div className="flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-medium underline break-all flex items-center gap-1"
              >
                {shortUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={handleCopy}
                className="p-2 rounded-md  hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 transition"
              >
                {copied ? "✅ Copied!" : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        )}

        {/* SEO Description */}
        <div className="mt-8 border-t border-gray-300 dark:border-slate-700 pt-4 text-sm leading-relaxed">
          <h2 className="font-semibold mb-2">📖 About URL Shortener Tool</h2>
          <p>
            The <strong>URL Shortener Tool</strong> allows you to instantly
            convert long and complex URLs into short, easy-to-share links. 
            Perfect for social media, marketing, and quick sharing.
          </p>
          <p className="mt-2">
            It’s completely free, secure, and works directly in your browser 
            without storing any personal data. Create short links in seconds!
          </p>
        </div>

        {/* 🔽 Info Dropdowns for SEO */}
        <div className="mt-10 space-y-6">
          <InfoDropdown
            title="🔗 What Is a URL Shortener Tool?"
            content="A URL shortener converts long web addresses into short, easy-to-share links. It’s ideal for simplifying links used on social media, emails, and printed materials, making them cleaner and more user-friendly."
          />

          <InfoDropdown
            title="⚙️ How Does a URL Shortener Work?"
            content="When you shorten a link, the tool creates a redirect from the short URL to your original link. This process is handled instantly using a redirect service like TinyURL or Bitly, without altering your destination page."
          />

          <InfoDropdown
            title="🌍 Why Use a URL Shortener?"
            content="Short URLs are perfect for social media, online ads, and SMS sharing. They look professional, save space, and make tracking user engagement easier for marketers and businesses."
          />

          <InfoDropdown
            title="🔒 Is It Safe to Shorten URLs?"
            content="Yes, shortening URLs is completely safe. Our tool uses secure HTTPS connections, and no data is stored on servers. It simply generates a redirect link that points to your destination."
          />

          <InfoDropdown
            title="💡 Advantages of Free Online URL Shortener"
            content="Our online shortener is free, fast, and reliable. It works instantly without registration or ads, giving you a lightweight and privacy-friendly solution for your daily link sharing needs."
          />

          <InfoDropdown
            title="📈 SEO Benefits of Short Links"
            content="While shortened URLs don’t directly boost SEO, they improve click-through rates by making links more appealing. Custom branded short links also enhance brand trust and readability."
          />
        </div>

        </div>

      {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Utility" />
      </div>
      </motion.div>

  );
}
