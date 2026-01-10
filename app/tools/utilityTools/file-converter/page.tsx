"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  File,
  Upload,
  Download,
  RefreshCcw,
  Loader2,
  FileText,
} from "lucide-react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import JSZip from "jszip";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function FileConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [targetFormat, setTargetFormat] = useState("pdf");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
    setConvertedBlob(null);
    setMessage("");
  };

  const handleConvert = async () => {
    if (!file) return setMessage("⚠️ Please select a file first.");
    setProcessing(true);
    setMessage("");

    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let blob: Blob | null = null;

      if (ext === "txt" && targetFormat === "pdf") {
        blob = await convertTxtToPDF(file);
      } else if (ext === "txt" && targetFormat === "docx") {
        blob = await convertTxtToDocx(file);
      } else if (ext === "docx" && targetFormat === "txt") {
        blob = await convertDocxToTxt(file);
      } else {
        throw new Error("Unsupported conversion type.");
      }

      setConvertedBlob(blob);
      setMessage("✅ File converted successfully!");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Conversion failed: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !file) return;
    const nameWithoutExt = file.name.split(".").slice(0, -1).join(".");
    saveAs(convertedBlob, `${nameWithoutExt}.${targetFormat}`);
  };

  const reset = () => {
    setFile(null);
    setConvertedBlob(null);
    setMessage("");
  };

  return (
    <main className="min-h-screen flex justify-center items-start p-3 sm:p-6 bg-linear-to-br from-indigo-100 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg sm:max-w-3xl mt-6 bg-white/80 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 p-5 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <File className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              File Converter – Convert Files Online Easily
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Convert between TXT, DOCX, and PDF formats instantly — works fully offline!
          </p>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center mb-6 border-2 border-gray-500 p-10 rounded-2xl bg-indigo-100 shadow-xl">
          <label className="w-full sm:w-auto cursor-pointer text-center px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition-all">
            <Upload className="h-5 w-5" /> Select File
            <input type="file" onChange={handleFileChange} accept=".txt,.docx" className="hidden" />
          </label>
          {file && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 truncate max-w-full">
              📄 {file.name}
            </p>
          )}
        </div>

        {/* Conversion Options */}
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap mb-6 pt-10 ">
          {["pdf", "docx", "txt"].map((format) => (
            <button
              key={format}
              onClick={() => setTargetFormat(format)}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                targetFormat === format
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              .{format.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          <button
            onClick={handleConvert}
            disabled={processing}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold flex items-center gap-2 active:scale-95 transition-transform"
          >
            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {processing ? "Converting..." : "Convert"}
          </button>

          {convertedBlob && (
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold flex items-center gap-2 active:scale-95 transition-transform"
            >
              <Download className="h-4 w-4" /> Download
            </button>
          )}

          <button
            onClick={reset}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold flex items-center gap-2 active:scale-95 transition-transform"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p
            className={`text-center text-sm sm:text-base font-medium mb-6 ${
              message.startsWith("✅")
                ? "text-green-600 dark:text-green-400"
                : message.startsWith("❌")
                ? "text-red-500 dark:text-red-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {message}
          </p>
        )}

        {/* Info Dropdowns */}
        <div className="space-y-4">
          <InfoDropdown
            title="📘 About File Converter Tool"
            content="Convert between popular document formats directly in your browser. Works offline and ensures your files never leave your device."
          />
          <InfoDropdown
            title="💾 Supported Conversions"
            content="Supports TXT → PDF, TXT → DOCX, and DOCX → TXT. More formats like DOCX → PDF are coming soon!"
          />
          <InfoDropdown
            title="⚙️ Secure Processing"
            content="All conversions happen locally using modern web APIs, ensuring maximum privacy and speed."
          />
          <InfoDropdown
            title="📱 Designed for Mobile"
            content="The layout and controls are optimized for one-hand use, large tap targets, and smooth transitions."
          />
          <InfoDropdown
            title="🌐 Offline Ready"
            content="Once loaded, this converter works without internet — perfect for secure or offline workflows."
          />
        </div>
      </motion.div>
    </main>
  );
}

/* ---------- Conversion Functions ---------- */

// TXT ➡ PDF
async function convertTxtToPDF(file: File): Promise<Blob> {
  const text = await file.text();
  const { PDFDocument, StandardFonts } = await import("pdf-lib");
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  const wrapped = wrapText(text, 80);
  page.drawText(wrapped.join("\n"), {
    x: 50,
    y: page.getHeight() - 50,
    size: fontSize,
    font,
    lineHeight: 14,
  });

  const pdfBytes = await pdfDoc.save();
  const safeBuffer = new Uint8Array(pdfBytes).buffer; // ✅ Safe fix
  return new Blob([safeBuffer], { type: "application/pdf" });
}

// TXT ➡ DOCX
async function convertTxtToDocx(file: File): Promise<Blob> {
  const text = await file.text();
  const doc = new Document({
    sections: [{ properties: {}, children: [new Paragraph({ children: [new TextRun(text)] })] }],
  });
  return await Packer.toBlob(doc);
}

// DOCX ➡ TXT
async function convertDocxToTxt(file: File): Promise<Blob> {
  const data = await file.arrayBuffer();
  const zip = new JSZip();
  const doc = await zip.loadAsync(data);
  const docText = await doc.file("word/document.xml")?.async("string");
  if (!docText) throw new Error("Invalid DOCX file.");
  const plainText = docText.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return new Blob([plainText], { type: "text/plain" });
}

// Helper for text wrapping
function wrapText(text: string, width: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + word).length > width) {
      lines.push(line.trim());
      line = "";
    }
    line += word + " ";
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}
