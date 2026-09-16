"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  RefreshCcw,
  Download,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  Zap
} from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";
import RelatedTools from "@/app/components/RelatedTools";

const SUPPORTED_FORMATS = ["png", "jpeg", "webp"];

export default function FileConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState("png");
  const [status, setStatus] = useState<"idle" | "converting" | "completed" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("idle");
      setResultUrl(null);
      setProgress(0);
    }
  };

  const convertFile = async () => {
    if (!file) return;

    setStatus("converting");
    setProgress(10);

    try {
      // Simulated progress for UX
      const interval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 10 : prev));
      }, 100);

      // Conversion Logic (Browser-side using Canvas)
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);

          const mimeType = `image/${targetFormat}`;
          const convertedDataUrl = canvas.toDataURL(mimeType, 0.9);

          clearInterval(interval);
          setProgress(100);
          setResultUrl(convertedDataUrl);
          setStatus("completed");
        };
      };
    } catch (error) {
      setStatus("error");
    }
  };

  const downloadFile = () => {
    if (!resultUrl || !file) return;
    const link = document.createElement("a");
    const fileName = file.name.split(".")[0];
    link.href = resultUrl;
    link.download = `${fileName}.${targetFormat}`;
    link.click();
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setResultUrl(null);
    setProgress(0);
  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" flex flex-col items-center gap-10 sm:p-6 sm:flex-row sm:items-start dark:bg-slate-950 dark:text-slate-50"
    >
      <div className="flex flex-col gap-5 p-5 w-screen order-2 sm:order-2">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Converter Card */}
          <div className="rounded-[2.5rem] shadow-xl border border-slate-200 p-8 md:p-12 text-center">
            <h1 className="text-3xl font-black mb-2">
              Ultimate File Converter
            </h1>
            <p className="mb-10">
              Secure, fast, and 100% browser-side conversion.
            </p>

            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group cursor-pointer border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] p-16 hover:border-blue-500 transition-all"
              >
                <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload size={40} />
                  </div>
                  <p className="text-xl font-bold ">Drop file here or click to upload</p>
                  <p className="text-sm mt-2">Supports PNG, JPG, WEBP (Max 10MB)</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* File Info Card */}
                <div className="flex items-center justify-between p-6 rounded-3xl border border-slate-100 dark:border-slate-700 text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600  rounded-2xl">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-bold  truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs  uppercase font-bold">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button onClick={reset} className="p-2 dark:hover:bg-slate-200 rounded-full transition-colors">
                    <X size={20} className="dark:text-slate-100" />
                  </button>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center border rounded-2xl p-5 justify-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="font-bold uppercase text-xs">Convert to</span>
                    <div className="relative">
                      <select
                        value={targetFormat}
                        onChange={(e) => setTargetFormat(e.target.value)}
                        className="appearance-none border-2 border-slate-200 px-6 py-3 pr-12 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all uppercase"
                      >
                        {SUPPORTED_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 drak:text-slate-100 pointer-events-none" size={18} />
                    </div>
                  </div>

                  {status === "idle" && (
                    <button onClick={convertFile} className="bg-indigo-600 hover:bg-indigo-400 text-white px-10 py-3.5 rounded-2xl font-bold transition-all flex items-center gap-2">
                      <RefreshCcw size={20} /> Convert Now
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                {status === "converting" && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Completion State */}
                {status === "completed" && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 rounded-[2rem] border dark:border-slate-200">
                    <div className="flex flex-col items-center gap-4">
                      <div className="dark:ext-slate-100 p-3 rounded-full shadow-sm">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-xl font-bold">Conversion Complete!</h3>
                      <button onClick={downloadFile} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all">
                        <Download size={20} /> Download Result
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-3xl p-6 border dark:border-slate-200 ">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-500" /> Pro Features
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl h-fit text-amber-600">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Instant Conversion</p>
                  <p className="text-xs text-slate-400 ">Optimized algorithms for lightning-fast results.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl h-fit text-blue-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Zero Uploads</p>
                  <p className="text-xs text-slate-400">Your files never leave your device.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
          {/* SEO Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoDropdown title="Is my data safe?" content="Yes. Unlike other converters, this tool works entirely in your browser. Your files are never uploaded to any server, meaning your privacy is 100% protected." />
            <InfoDropdown title="Supported formats" content="Currently, we support high-quality conversion between PNG, JPEG, and WEBP formats. Support for PDFs and Documents is coming soon!" />
          </div>
        </div>


      </div>
      {/* Here Moblie card */}
      <div className="order-2  sm:order-1">
        <RelatedTools currentTool="Utility" />
      </div>
    </motion.div>

  );
}