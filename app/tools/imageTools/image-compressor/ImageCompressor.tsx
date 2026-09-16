"use client";

import React, { useState } from "react";
import {
  Download,
  RefreshCw,
  Settings2,
  SlidersHorizontal,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import ImageDropzone from "@/app/components/ImageDropzone";
import useImageCompressor from "./useImageCompressor";
import ToolLayout from "@/app/components/ToolLayout";

export default function ImageCompressor() {
  const {
    file,
    compressedFile,
    previewUrl,
    compressedUrl,
    loading,
    quality,
    maxWidth,
    error,
    savingsPercent,
    formatSize,
    setQuality,
    setMaxWidth,
    handleFileChange,
    handleApplySettings,
    downloadCompressedImage,
    reset,
  } = useImageCompressor();

  // Local state for immediate typing in inputs before applying
  const [localQuality, setLocalQuality] = useState(Math.round(quality * 100));
  const [localWidth, setLocalWidth] = useState(maxWidth);

  // Sync back to hook state when applied
  const applyNewSettings = () => {
    setQuality(localQuality / 100);
    setMaxWidth(localWidth);
    setTimeout(() => {
      handleApplySettings();
    }, 0);
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Upload JPG, PNG, or WEBP files and reduce file size without losing clarity instantly in your browser."
      toolType="Image"
    >
      <div className="space-y-8">
        {/* Error State */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        ) : null}

        {/* Upload State */}
        {!file ? (
          <ImageDropzone onFileSelect={handleFileChange} accept="image/*" maxSizeMB={10} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Previews */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Original size: {formatSize(file.size)}</p>
                </div>
                <button
                  onClick={reset}
                  className="mt-3 md:mt-0 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <RefreshCw size={16} />
                  Start Over
                </button>
              </div>

              <div className="relative">
                {loading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-slate-50/80 backdrop-blur-sm dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                    <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">Compressing image...</p>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-3">Original</p>
                    {previewUrl ? (
                      <img src={previewUrl} alt="Original" className="w-full max-h-56 rounded-lg object-contain bg-slate-100 dark:bg-slate-900" />
                    ) : (
                      <div className="h-56 rounded-lg bg-slate-100 dark:bg-slate-900 animate-pulse" />
                    )}
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">Compressed</p>
                      {savingsPercent > 0 && (
                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400">{savingsPercent}% Smaller</span>
                      )}
                    </div>
                    {compressedUrl ? (
                      <img src={compressedUrl} alt="Compressed" className="w-full max-h-56 rounded-lg object-contain bg-slate-100 dark:bg-slate-900" />
                    ) : (
                      <div className="h-56 rounded-lg bg-slate-100 dark:bg-slate-900 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={downloadCompressedImage}
                disabled={!compressedFile || loading}
                className="w-full rounded-xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Compressed Image ({compressedFile ? formatSize(compressedFile.size) : "-"})
              </button>
            </div>

            {/* Right: Controls */}
            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-slate-100">
                  <Settings2 size={18} className="text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold">Settings</h3>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                      Quality (%)
                      <span className="text-indigo-600 dark:text-indigo-400">{localQuality}%</span>
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={localQuality}
                        onChange={(e) => setLocalQuality(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={localQuality}
                        onChange={(e) => setLocalQuality(Number(e.target.value))}
                        className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-center text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                      Max Width (px)
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="10000"
                      value={localWidth}
                      onChange={(e) => setLocalWidth(Number(e.target.value))}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    disabled={loading || (localQuality === Math.round(quality * 100) && localWidth === maxWidth)}
                    onClick={applyNewSettings}
                    className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white flex items-center justify-center gap-2"
                  >
                    <SlidersHorizontal size={16} />
                    Apply Changes
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
