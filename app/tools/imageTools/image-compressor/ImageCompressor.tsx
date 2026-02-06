"use client";

import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import {
  Upload,
  Download,
  RefreshCw,
  Settings2,
  Image as ImageIcon,
  Zap,
  Loader2,
  SlidersHorizontal
} from 'lucide-react';
import ImageDropzone from '@/app/components/ImageDropzone';

export default function ProfessionalCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Customization States
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const runCompression = async (targetFile: File) => {
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1, // Target size
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
        initialQuality: quality,
      };

      const blob = await imageCompression(targetFile, options);
      const newFile = new File([blob], targetFile.name, { type: targetFile.type });
      setCompressedFile(newFile);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file: File) => {
    const selected = file;
    if (selected) {
      setFile(selected);
      runCompression(selected);
    }
  };

  // Re-compress when settings change
  const handleApplySettings = () => {
    if (file) runCompression(file);
  };

  return (
    <div className="min-h-screen mt-20 dark:bg-[slate-950 dark:text-slate-50 font-sans">

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="w-full items-center justify-center">

          {/* Main Workspace */}
          <div className="lg:col-span-8 order-1 lg:order-2 mb-6">
            {!file ? (
              <div className="group relative">
              </div>
            ) : (
              <div className="dark:bg-slate-900 rounded-[2.5rem] border dark:border-slate-300 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* File Info Header */}
                <div className="p-6 dark:border-slate-800 flex items-center justify-between dark:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Compressed Preview"
                        className="w-10 h-10 object-fill rounded-xl mx-auto"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold dark:text-slate-400 truncate max-w-[150px] md:max-w-xs">{file.name}</p>
                      <p className="text-xs dark:text-slate-400 font-medium">Original: {formatSize(file.size)}</p>
                    </div>
                  </div>
                  <button onClick={() => { setFile(null); setCompressedFile(null); }} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <RefreshCw size={20} />
                  </button>
                </div>

                {/* Comparison & Result */}
                <div className="p-8">
                  {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center space-y-4 ">
                      <Loader2 className="animate-spin text-blue-600" size={40} />
                      <p className="text-sm font-bold text-slate-500 animate-pulse">Processing Pixels...</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-12 ">
                        {/* Stats Circle */}
                        <div className="relative w-40 h-40 rounded-full border-8 dark:border-slate-400 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Savings</span>
                          <span className="text-3xl font-black text-blue-600">
                            {compressedFile ? Math.round(((file.size - compressedFile.size) / file.size) * 100) : 0}%
                          </span>
                        </div>

                        <div className="flex-1 space-y-4 w-full">
                          <div className="flex justify-between items-center p-4 dark:bg-slate-800 rounded-2xl border border-slate-400">
                            <span className="text-sm font-bold dark:text-slate-400">New Size</span>
                            <span className="text-lg font-black dark:text-slate-400">{compressedFile ? formatSize(compressedFile.size) : '...'}</span>
                          </div>
                          <div className="flex justify-between items-center p-4 dark:bg-emerald-50 rounded-2xl border border-slate-400">
                            <span className="text-sm font-bold text-emerald-600">Optimization</span>
                            <span className="text-lg font-black text-emerald-700">Ready</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (!compressedFile) return;
                          const link = document.createElement('a');
                          link.href = URL.createObjectURL(compressedFile);
                          link.download = `minified_${file.name}`;
                          link.click();
                        }}
                        className="w-full py-5 p-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                      >
                        <Download size={20} />
                        DOWNLOAD COMPRESSED IMAGE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {!file ? (<div><ImageDropzone onFileSelect={(file) => handleFileChange(file)} /></div>) : (

            /* Settings Sidebar (Customize) */
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <div className="dark:bg-slate-900 p-6 rounded-3xl border border-slate-400 shadow-sm">
                <div className="flex items-center gap-2 mb-6 dark:text-slate-800">
                  <Settings2 size={18} className="text-blue-600" />
                  <h2 className="font-bold">Customize</h2>
                </div>

                <div className="space-y-8">
                  {/* Quality Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-500 uppercase">Quality</label>
                      <span className="text-sm font-bold text-blue-600">{Math.round(quality * 100)}%</span>
                    </div>
                    <input
                      type="range" min="0.1" max="1.0" step="0.1" value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-400 rounded-lg appearance-auto cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span>Smallest Size</span>
                      <span>Best Quality</span>
                    </div>
                  </div>

                  {/* Dimension Limit */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase">Max Dimensions</label>
                    <select
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(Number(e.target.value))}
                      className="w-full p-3 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 ring-blue-500/20 outline-none"
                    >
                      <option value={800}>800px (Thumbnail)</option>
                      <option value={1200}>1200px (Web Content)</option>
                      <option value={1920}>1920px (Full HD)</option>
                      <option value={3840}>3840px (Original 4K)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleApplySettings}
                    disabled={!file || loading}
                    className="w-full py-3 bg-indigo-500 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                  >
                    <SlidersHorizontal size={16} />
                    Apply Settings
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}