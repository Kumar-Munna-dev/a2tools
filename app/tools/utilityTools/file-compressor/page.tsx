"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Upload,
  Download,
  Trash2,
  File,
  Archive,
  Loader2,
  FolderOpen,
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function FileCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setMessage("");
  };

  // Remove single file
  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  // Compress files
  const handleCompress = async () => {
    if (files.length === 0) {
      setMessage("⚠️ Please select at least one file.");
      return;
    }

    setCompressing(true);
    setMessage("");

    try {
      const zip = new JSZip();
      for (const file of files) {
        const data = await file.arrayBuffer();
        zip.file(file.name, data);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "compressed_files.zip");
      setMessage("✅ ZIP file created and downloaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Compression failed. Try again.");
    } finally {
      setCompressing(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center p-3 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl relative bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 overflow-hidden"
      >
        {/* Top Gradient Glow */}
        <div className="absolute inset-0 bg-linear-to-tr from-blue-300/10 via-purple-300/10 to-pink-300/10 blur-3xl -z-10" />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <Archive className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              File Compressor – Compress Files Online Without Quality Loss
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Compress multiple files into a single ZIP archive securely — right
            in your browser.
          </p>
        </div>

        {/* File Upload */}
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
            <Upload className="h-5 w-5" /> Select Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* File List */}
        {files.length > 0 ? (
          <motion.div
            layout
            className="mb-6 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/70 p-4 max-h-64 overflow-y-auto shadow-inner"
          >
            <ul className="space-y-2">
              {files.map((file, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex justify-between items-center bg-white/80 dark:bg-gray-700/60 p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all"
                >
                  <div className="flex items-center gap-2 truncate">
                    <File className="h-4 w-4 text-blue-500" />
                    <span className="truncate max-w-[200px] sm:max-w-[300px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(file.name)}
                    className="text-red-500 hover:text-red-600"
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 py-10 mb-6">
            <FolderOpen className="h-10 w-10 mb-2 text-gray-400" />
            <p>No files selected yet.</p>
          </div>
        )}

        {/* Compress Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleCompress}
            disabled={compressing}
            className={`px-8 py-3 text-lg rounded-full font-semibold text-white flex items-center gap-2 shadow-md transition-all ${
              compressing
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
            }`}
          >
            {compressing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Create ZIP
              </>
            )}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`text-center text-sm font-medium mb-6 ${
              message.startsWith("✅")
                ? "text-green-600 dark:text-green-400"
                : message.startsWith("❌")
                ? "text-red-500 dark:text-red-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Info Section */}
        <div className="space-y-4">
          <InfoDropdown
            title="🗜️ About File Compressor Tool"
            content="This advanced file compressor lets you create ZIP archives entirely in your browser — no upload, no server use. Perfect for privacy and quick file sharing."
          />
          <InfoDropdown
            title="💾 Supported File Types"
            content="All file types are supported — from images, documents, and code files to videos and audio. ZIP compression keeps your data intact while reducing size."
          />
          <InfoDropdown
            title="📱 Works Anywhere"
            content="Fully responsive and mobile-friendly — you can compress files directly on Android, iPhone, or any desktop browser."
          />
          <InfoDropdown
            title="⚡ Secure & Private"
            content="All processing is local and offline using JSZip. Your files never leave your device, ensuring 100% privacy."
          />
          <InfoDropdown
            title="🌐 Offline Support"
            content="Once loaded, this tool works even without an internet connection — perfect for local compression tasks."
          />
          <InfoDropdown
            title="🚀 Why ZIP?"
            content="ZIP format efficiently compresses and combines files into one convenient package, making it easier to store, send, and back up data."
          />
        </div>
      </motion.div>
    </main>
  );
}
