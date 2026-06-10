"use client";

import {
  Download,
  RefreshCw,
  Settings2,
  SlidersHorizontal,
  Zap,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import ImageDropzone from "@/app/components/ImageDropzone";
import useImageCompressor from "./useImageCompressor";

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/30 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Image compressor</p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Compress images faster with better quality.</h1>
              <p className="max-w-3xl text-slate-600 dark:text-slate-300 leading-7">
                Upload JPG, PNG, or WEBP files and reduce file size without losing clarity. Choose the quality level and maximum dimensions you want, then download the optimized image instantly.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Instant compression</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">Fast browser-side optimization</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Safe & private</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">Files stay in your browser</p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-slate-100/80 p-6 text-slate-700 dark:bg-slate-800/85 dark:text-slate-200">
              <div className="flex items-center gap-3 text-blue-600">
                <Zap size={20} />
                <p className="font-semibold">Smooth performance</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Compression happens entirely in the browser using a lightweight worker for quick results. Your images are never uploaded to a server.
              </p>
              <div className="mt-6 space-y-4 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <ImageIcon size={18} className="text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium">Supports JPG, PNG, WEBP</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw size={18} className="text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium">Live preview and download</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.95fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="space-y-6">
              {error ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                  {error}
                </div>
              ) : null}

              {!file ? (
                <ImageDropzone onFileSelect={handleFileChange} accept="image/*" maxSizeMB={10} />
              ) : (
                <div className="space-y-6">
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Selected image</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{file.name}</p>
                      </div>
                      <button
                        onClick={reset}
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-blue-400"
                      >
                        <RefreshCw size={18} />
                        Reset
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Original size: {formatSize(file.size)}</p>
                  </div>

                  <div className="relative">
                    {loading ? (
                      <div className="pointer-events-none absolute inset-0 z-10 rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-12 text-center shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-950/90">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Compressing your image...</p>
                      </div>
                    ) : null}

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Original preview</p>
                        {previewUrl ? (
                          <img src={previewUrl} alt="Original image preview" loading="lazy" decoding="async" className="mt-4 w-full max-h-48 rounded-3xl object-contain" />
                        ) : (
                          <div className="mt-4 h-44 rounded-3xl bg-slate-100 dark:bg-slate-900" />
                        )}
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Compressed preview</p>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{savingsPercent}% saved</span>
                        </div>
                        {compressedUrl ? (
                          <img src={compressedUrl} alt="Compressed image preview" loading="lazy" decoding="async" className="mt-4 w-full max-h-48 rounded-3xl object-contain" />
                        ) : (
                          <div className="mt-4 h-44 rounded-3xl bg-slate-100 dark:bg-slate-900" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Estimated size</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {compressedFile ? formatSize(compressedFile.size) : "-"}
                      </p>
                    </div>
                    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Quality</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{Math.round(quality * 100)}%</p>
                    </div>
                  </div>

                  <button
                    onClick={downloadCompressedImage}
                    disabled={!compressedFile || loading}
                    className="w-full rounded-3xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Download size={18} />
                      Download compressed image
                    </span>
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                <Settings2 size={18} className="text-blue-600" />
                <div>
                  <p className="text-sm font-semibold">Compression settings</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Adjust quality and dimensions before downloading.</p>
                </div>
              </div>

              <div className="space-y-6 mt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">Quality</label>
                    <span className="text-sm font-semibold text-blue-600">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(event) => setQuality(parseFloat(event.target.value))}
                    className="w-full cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">Max dimension</label>
                  <select
                    value={maxWidth}
                    onChange={(event) => setMaxWidth(Number(event.target.value))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value={800}>800px - Thumbnail</option>
                    <option value={1200}>1200px - Web use</option>
                    <option value={1920}>1920px - Full HD</option>
                    <option value={3840}>3840px - High resolution</option>
                  </select>
                </div>

                <button
                  disabled={!file || loading}
                  onClick={handleApplySettings}
                  className="w-full rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <SlidersHorizontal size={16} />
                    Recompress image
                  </span>
                </button>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Why use this tool?</p>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                <li>� Works entirely in your browser with no uploads.</li>
                <li>� Keeps visual quality while reducing file size.</li>
                <li>� Responsive design for desktop and mobile use.</li>
                <li>� Simple controls for quality and max dimensions.</li>
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
