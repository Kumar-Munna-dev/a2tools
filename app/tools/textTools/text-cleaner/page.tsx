"use client";

import RelatedTools from "@/app/components/RelatedTools";
import { useState } from "react";

export default function TextFormatterCleaner() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  // Utilities
  const removeExtraSpaces = (s: string) => s.replace(/\s{2,}/g, " ").trim();
  const removeLineBreaks = (s: string) => s.replace(/\r?\n+/g, "\n");
  const removeAllLineBreaks = (s: string) => s.replace(/\r?\n+/g, " ");
  const removeHtmlTags = (s: string) => s.replace(/<[^>]*>/g, "");
  const collapseWhitespace = (s: string) => s.replace(/\s+/g, " ").trim();
  const trimText = (s: string) => s.trim();

  // Actions
  const cleanExtraSpaces = () => setText(removeExtraSpaces(text));
  const cleanLineBreaks = () => setText(removeLineBreaks(text));
  const convertToSingleLine = () => setText(removeAllLineBreaks(text));
  const stripHtml = () => setText(removeHtmlTags(text));
  const collapseAll = () => setText(collapseWhitespace(text));
  const trimAll = () => setText(trimText(text));
  const clearAll = () => setText("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied to clipboard");
      setTimeout(() => setMessage(""), 1500);
    } catch (e) {
      setMessage("Copy failed");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-20 flex flex-col mb-5 sm:flex-row">
      <div className="order-2 w-screen bg-white shadow-md rounded-2xl p-6 sm:order-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">Text Formatter / Cleaner</h1>
        <p className="text-sm text-gray-600 text-center mb-4">Remove extra spaces, normalize line breaks, or strip HTML tags quickly.</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full min-h-40 shadow-2xl shadow-white sm:min-h-[220px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          <button onClick={cleanExtraSpaces} className="p-2 bg-blue-600 text-white rounded-lg">Remove Extra Spaces</button>
          <button onClick={cleanLineBreaks} className="p-2 bg-blue-600 text-white rounded-lg">Normalize Line Breaks</button>
          <button onClick={convertToSingleLine} className="p-2 bg-blue-600 text-white rounded-lg">Convert To Single Line</button>
          <button onClick={stripHtml} className="p-2 bg-indigo-600 text-white rounded-lg">Strip HTML Tags</button>
          <button onClick={collapseAll} className="p-2 bg-indigo-600 text-white rounded-lg">Collapse Whitespace</button>
          <button onClick={trimAll} className="p-2 bg-red-500 text-white rounded-lg">Trim</button>
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 text-white rounded-lg">Copy</button>
          <button onClick={downloadTxt} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Download</button>
          <button onClick={clearAll} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Clear</button>

          <div className="ml-auto text-sm text-gray-500 self-center">{message}</div>
        </div>

        <div className="mt-6 text-xs text-gray-500">Tips: Use <code className="bg-gray-100 px-1 rounded">Strip HTML Tags</code> when pasting content from web pages. <br />Use <code className="bg-gray-100 px-1 rounded">Convert To Single Line</code> for CSV or single-line formats.</div>
      </div>
      {/* Here Moblie card */}
      <div className="w-max order-2 flex p-5 items-center justify-center sm:order-1" >
        <RelatedTools currentTool="/tools/textTools/word-counter" />
      </div></div>

  );
}
