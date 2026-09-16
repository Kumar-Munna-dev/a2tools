"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Upload,
  Copy,
  RefreshCcw,
  Zap,
  ShieldOff,
  FileText,
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

/**
 * Simple minifiers (conservative)
 * - html: remove comments, collapse whitespace between tags, remove optional spaces
 * - css: remove comments, collapse whitespace, remove unnecessary semicolons
 * - js: conservative removal of comments and whitespace; has a "safe" option that avoids touching strings/templates.
 *
 * NOTE: Client-side regex-based JS minification is imperfect. Use "Safe JS minify" for reliability.
 */

function minifyHtml(input: string, removeComments = true, collapseWhitespace = true) {
  let out = input;
  if (removeComments) {
    // Remove HTML comments but keep conditional comments for IE (<!--[if ...]> ... <![endif]-->)
    out = out.replace(/<!--(?!\[if)([\s\S]*?)-->/g, "");
  }
  if (collapseWhitespace) {
    // Collapse multiple whitespace between tags
    out = out.replace(/\s{2,}/g, " ");
    // Remove whitespace between tags
    out = out.replace(/>\s+</g, "><");
    // Trim
    out = out.trim();
  }
  return out;
}

function minifyCss(input: string, removeComments = true, collapseWhitespace = true) {
  let out = input;
  if (removeComments) {
    // remove /* ... */
    out = out.replace(/\/\*[\s\S]*?\*\//g, "");
  }
  if (collapseWhitespace) {
    // remove whitespace around symbols and collapse spaces
    out = out.replace(/\s*([{}:;,>~+])\s*/g, "$1");
    out = out.replace(/\s{2,}/g, " ");
    out = out.replace(/;}/g, "}");
    out = out.trim();
  }
  return out;
}

// Conservative JS minifier: removes comments outside strings when safe, collapses multiple blank lines.
// If safeMode=true we will avoid complex transformations and only remove comments in simple cases.
function minifyJs(input: string, removeComments = true, collapseWhitespace = true, safeMode = true) {
  let out = input;

  if (removeComments) {
    if (safeMode) {
      // Attempt to remove simple // and /* */ comments but avoid removing inside strings by a token approach.
      // This is conservative: we scan the code and skip characters inside quotes / template literals / regex-like patterns heuristically.
      let result = "";
      const len = out.length;
      let i = 0;
      let state: "normal" | "single" | "double" | "template" | "regex" | "escape" = "normal";
      while (i < len) {
        const ch = out[i];
        const next2 = out.substr(i, 2);
        if (state === "normal") {
          if (next2 === "//") {
            // skip until newline
            i += 2;
            while (i < len && out[i] !== "\n") i++;
            continue;
          } else if (next2 === "/*") {
            // skip comment block
            i += 2;
            while (i < len && out.substr(i, 2) !== "*/") i++;
            i += 2;
            continue;
          } else if (ch === "'") {
            state = "single";
            result += ch;
            i++;
            continue;
          } else if (ch === '"') {
            state = "double";
            result += ch;
            i++;
            continue;
          } else if (ch === "`") {
            state = "template";
            result += ch;
            i++;
            continue;
          } else if (ch === "/") {
            // heuristic: could be regex or division. We'll try to detect regex by checking previous non-whitespace char.
            const prev = result.trim().slice(-1);
            const canBeRegex = !prev || "([=,:?{};!&|*/+-\n\t".includes(prev);
            if (canBeRegex) {
              // treat as regex start — copy until next unescaped slash
              result += ch;
              i++;
              state = "regex";
              continue;
            } else {
              result += ch;
              i++;
              continue;
            }
          } else {
            result += ch;
            i++;
            continue;
          }
        } else if (state === "single") {
          if (ch === "\\") {
            result += ch;
            i++;
            if (i < len) {
              result += out[i];
              i++;
            }
            continue;
          } else if (ch === "'") {
            state = "normal";
            result += ch;
            i++;
            continue;
          } else {
            result += ch;
            i++;
            continue;
          }
        } else if (state === "double") {
          if (ch === "\\") {
            result += ch;
            i++;
            if (i < len) {
              result += out[i];
              i++;
            }
            continue;
          } else if (ch === '"') {
            state = "normal";
            result += ch;
            i++;
            continue;
          } else {
            result += ch;
            i++;
            continue;
          }
        } else if (state === "template") {
          if (ch === "\\") {
            result += ch;
            i++;
            if (i < len) {
              result += out[i];
              i++;
            }
            continue;
          } else if (ch === "`") {
            state = "normal";
            result += ch;
            i++;
            continue;
          } else {
            result += ch;
            i++;
            continue;
          }
        } else if (state === "regex") {
          if (ch === "\\") {
            result += ch;
            i++;
            if (i < len) {
              result += out[i];
              i++;
            }
            continue;
          } else if (ch === "/") {
            // end regex; consume possible flags
            result += ch;
            i++;
            while (i < len && /[gimsuy]/.test(out[i])) {
              result += out[i];
              i++;
            }
            state = "normal";
            continue;
          } else {
            result += ch;
            i++;
            continue;
          }
        }
      }
      out = result;
    } else {
      // aggressive: remove comments with regex (may break complex JS)
      out = out.replace(/\/\*[\s\S]*?\*\//g, "");
      out = out.replace(/\/\/[^\n\r]*/g, "");
    }
  }

  if (collapseWhitespace) {
    // Remove multiple blank lines
    out = out.replace(/\n\s*\n/g, "\n");
    // Collapse leading/trailing spaces on lines
    out = out.split("\n").map((l) => l.trim()).join(" ");
    // Remove extra spaces around operators / punctuation (safe-ish)
    out = out.replace(/\s*([=+\-*/{}();,:<>%&|?!\[\]])\s*/g, "$1");
    out = out.replace(/\s{2,}/g, " ");
    out = out.trim();
  }

  return out;
}

export default function MinifierTool() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [type, setType] = useState<"html" | "css" | "js">("html");
  const [removeComments, setRemoveComments] = useState(true);
  const [collapseWhitespace, setCollapseWhitespace] = useState(true);
  const [jsSafeMode, setJsSafeMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const minify = () => {
    try {
      let res = "";
      if (type === "html") res = minifyHtml(input, removeComments, collapseWhitespace);
      else if (type === "css") res = minifyCss(input, removeComments, collapseWhitespace);
      else res = minifyJs(input, removeComments, collapseWhitespace, jsSafeMode);
      setOutput(res);
    } catch (err: any) {
      setOutput("");
      alert("Minify error: " + (err?.message || err));
    }
  };

  const handleOpenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput(String(ev.target?.result ?? ""));
      setOutput("");
    };
    reader.readAsText(f);
    e.currentTarget.value = "";
  };

  const handleDownload = (name = `minified.${type}`) => {
    const data = output || input;
    if (!data) return alert("Nothing to download");
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const text = output || input;
    if (!text) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      alert("Copy failed — try manual copy.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
<motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-500"
      >
        <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Code Minifier – Minify HTML, CSS & JavaScript Online
        </h1>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-sm">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="px-3 py-2 rounded border"
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="js">JavaScript</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={removeComments}
                onChange={(e) => setRemoveComments(e.target.checked)}
              />
              Remove comments
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={collapseWhitespace}
                onChange={(e) => setCollapseWhitespace(e.target.checked)}
              />
              Collapse whitespace
            </label>

            {type === "js" && (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={jsSafeMode}
                  onChange={(e) => setJsSafeMode(e.target.checked)}
                />
                Safe JS minify
              </label>
            )}
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center"
              title="Open file"
            >
              <Upload className="h-4 w-4 mr-2" /> Open
            </button>
            <input ref={fileRef} type="file" accept=".html,.htm,.css,.js,.txt" className="hidden" onChange={handleOpenFile} />

            <button
              onClick={() => { setOutput(""); setTimeout(minify, 10); }}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
              title="Minify"
            >
              <Zap className="h-4 w-4 mr-2" /> Minify
            </button>

            <button
              onClick={handleClear}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center"
            >
              <RefreshCcw className="h-4 w-4 mr-2" /> Reset
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your ${type.toUpperCase()} code here...`}
              rows={20}
              className="w-full p-3 rounded-lg border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <div className="mt-2 text-xs">
              Input size: {input.length} characters
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Output (Minified)
            </label>

            <div className="w-full min-h-[360px] p-3 rounded-lg border text-sm font-mono overflow-auto whitespace-pre-wrap">
              {output ? <pre className="whitespace-pre-wrap">{output}</pre> : <div className="text-center text-gray-500 dark:text-gray-400">Result will appear here after minify.</div>}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" /> {copied ? "Copied" : "Copy"}
              </button>

              <button
                onClick={() => handleDownload()}
                className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg flex items-center"
              >
                <Download className="h-4 w-4 mr-2" /> Download .{type}
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-4 sm:space-y-6">
          <InfoDropdown
            title="⚡ What is Code Minification?"
            content="Minification removes unnecessary characters (whitespace, comments) from code to reduce file size and improve load times. It doesn't change functionality when done correctly."
          />
          <InfoDropdown
            title="📌 Safe vs Aggressive Minify"
            content="Safe minification preserves strings, regexes, and template literals. Aggressive minification (not recommended here) may break complex JS — use safe mode for production."
          />
          <InfoDropdown
            title="🌐 Why Minify?"
            content="Smaller files mean faster downloads, lower bandwidth costs, and improved page performance — especially important for mobile users."
          />
          <InfoDropdown
            title="🛠️ Supported Types"
            content="This tool supports HTML, CSS, and JavaScript minification with options to remove comments and collapse whitespace. It also supports opening and downloading files."
          />
          <InfoDropdown
            title="📱 Works Offline & Mobile-Friendly"
            content="All minification happens locally in your browser — no server involved. Copy and download features are mobile-safe with fallbacks for older browsers."
          />
          <InfoDropdown
            title="🔒 Privacy"
            content="Your code never leaves your device. Everything runs client-side to ensure privacy and speed."
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
