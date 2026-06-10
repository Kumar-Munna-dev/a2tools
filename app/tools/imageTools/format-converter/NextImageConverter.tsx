"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Upload,
  Download,
  X,
  Image as ImageIcon,
  Zap,
  RotateCw,
  Maximize,
  RefreshCw,
} from "lucide-react";
import ImageDropzone from "@/app/components/ImageDropzone";

type SupportedFormat =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/avif"
  | "image/gif"
  | "image/bmp"
  | "image/x-icon"
  | "image/tiff";

interface FormatOption {
  label: string;
  mime: SupportedFormat;
  ext: string;
  description: string;
}

const FORMATS: FormatOption[] = [
  { label: "JPEG", mime: "image/jpeg", ext: "jpg", description: "Best for photos" },
  { label: "PNG", mime: "image/png", ext: "png", description: "Supports transparency" },
  { label: "WebP", mime: "image/webp", ext: "webp", description: "Modern, smaller files" },
  { label: "AVIF", mime: "image/avif", ext: "avif", description: "Next-gen format" },
  { label: "GIF", mime: "image/gif", ext: "gif", description: "Animated or static" },
  { label: "BMP", mime: "image/bmp", ext: "bmp", description: "Uncompressed" },
  { label: "ICO", mime: "image/x-icon", ext: "ico", description: "Favicon format" },
  { label: "TIFF", mime: "image/tiff", ext: "tiff", description: "High quality archival" },
];

interface ConvertedFile {
  file: File;
  status: "pending" | "success" | "error";
  blob?: Blob;
  error?: string;
}

export default function NextImageConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const previewsRef = React.useRef<string[]>([]);
  const [outputFormat, setOutputFormat] = useState<SupportedFormat>("image/webp");
  const [quality, setQuality] = useState(85);
  const [width, setWidth] = useState<number | "">(0);
  const [height, setHeight] = useState<number | "">(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [rotate, setRotate] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [converted, setConverted] = useState<ConvertedFile[]>([]);
  const [statusMessage, setStatusMessage] = useState(
    "Upload images to convert. Supports batch processing with quality, resize, and rotation controls."
  );

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      setFiles([file]);
      setStatusMessage(`Selected: ${file.name}`);
    } else {
      setStatusMessage("Please select a valid image file.");
    }
  };

  const addMoreFiles = (file: File) => {
    if (file.type.startsWith("image/")) {
      setFiles((prev) => [...prev, file]);
    }
  };

  const removeFile = (_index: number) => {
    // single-file mode: clear everything
    previewsRef.current.forEach((u) => {
      try {
        URL.revokeObjectURL(u);
      } catch {}
    });
    previewsRef.current = [];
    setPreviews([]);
    setFiles([]);
    setStatusMessage("File removed. Upload a new image to convert.");
  };

  const clearAll = () => {
    setFiles([]);
    setConverted([]);
    setStatusMessage("Cleared. Upload new images to convert.");
  };

  function computeSize(
    imgW: number,
    imgH: number,
    targetW: number,
    targetH: number,
    keepAspectRatio: boolean
  ): { w: number; h: number } {
    if (targetW === 0 && targetH === 0) return { w: imgW, h: imgH };
    if (keepAspectRatio) {
      if (targetW === 0) {
        const ratio = targetH / imgH;
        return { w: Math.round(imgW * ratio), h: targetH };
      }
      if (targetH === 0) {
        const ratio = targetW / imgW;
        return { w: targetW, h: Math.round(imgH * ratio) };
      }
      const rw = targetW / imgW;
      const rh = targetH / imgH;
      const r = Math.min(rw, rh);
      return { w: Math.round(imgW * r), h: Math.round(imgH * r) };
    }
    return {
      w: targetW === 0 ? imgW : targetW,
      h: targetH === 0 ? imgH : targetH,
    };
  }

  async function convertSingle(file: File): Promise<Blob | null> {
    try {
      const imgBitmap = await createImageBitmap(file);
      const sourceW = imgBitmap.width;
      const sourceH = imgBitmap.height;

      const targetW = width === "" ? 0 : width;
      const targetH = height === "" ? 0 : height;
      const { w, h } = computeSize(sourceW, sourceH, targetW, targetH, keepAspect);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Canvas context not available");

      ctx.save();
      ctx.translate(w / 2, h / 2);
      if (rotate !== 0) ctx.rotate((rotate * Math.PI) / 180);
      const scaleX = flipH ? -1 : 1;
      const scaleY = flipV ? -1 : 1;
      ctx.scale(scaleX, scaleY);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imgBitmap, -w / 2, -h / 2, w, h);
      ctx.restore();

      return new Promise<Blob | null>((res, rej) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return rej(new Error("Blob creation failed"));
            res(blob);
          },
          outputFormat,
          quality / 100
        );
      });
    } catch (error) {
      console.error("Conversion error:", error);
      throw error;
    }
  }

  async function processAndDownload() {
    if (files.length === 0) {
      setStatusMessage("No files selected. Please upload images first.");
      return;
    }

    setProcessing(true);
    setStatusMessage("Converting images...");
    const results: ConvertedFile[] = [];

    for (const file of files) {
      try {
        const blob = await convertSingle(file);
        if (blob) {
          results.push({ file, status: "success", blob });
        } else {
          results.push({ file, status: "error", error: "Conversion returned null" });
        }
      } catch (error) {
        results.push({
          file,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    setConverted(results);

    const successCount = results.filter((r) => r.status === "success").length;
    const errorCount = results.filter((r) => r.status === "error").length;

    if (successCount > 0) {
      setStatusMessage(
        `Converted ${successCount} file(s)${errorCount > 0 ? ` (${errorCount} failed)` : ""}. Click download buttons below.`
      );
    } else {
      setStatusMessage(`Conversion failed for all files. Please try again.`);
    }

    setProcessing(false);
  }

  const downloadFile = (result: ConvertedFile) => {
    if (!result.blob) return;

    const formatOpt = FORMATS.find((f) => f.mime === outputFormat);
    const ext = formatOpt?.ext || "bin";
    const name = `${result.file.name.replace(/\.[^.]+$/, "")}.${ext}`;

    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // cleanup converted blobs' object URLs if we created any elsewhere
    return () => {
      previewsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      previewsRef.current = [];
    };
  }, []);

  // Generate preview URLs whenever files change
  useEffect(() => {
    // revoke old previews
    previewsRef.current.forEach((u) => {
      try {
        URL.revokeObjectURL(u);
      } catch {}
    });
    const urls = files.map((f) => (f.type.startsWith("image/") ? URL.createObjectURL(f) : ""));
    previewsRef.current = urls;
    setPreviews(urls);

    return () => {
      urls.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      previewsRef.current = [];
    };
  }, [files]);

  const selectedFormat = FORMATS.find((f) => f.mime === outputFormat);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 py-10">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <ImageIcon className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">Image Format Converter</span>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Convert images between multiple formats instantly</h1>
                <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                  Convert JPG, PNG, WebP, AVIF, GIF, BMP, ICO, and TIFF formats. Adjust quality, resize, rotate, and flip images without quality loss.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">8 formats</p>
                  <p className="mt-2 text-base">Support for all popular image formats</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Full control</p>
                  <p className="mt-2 text-base">Quality, size, rotation, flip options</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-indigo-600 p-6 text-white shadow-2xl">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em]">
                <Zap className="h-5 w-5" />
                <span>How it works</span>
              </div>
              <ul className="mt-6 space-y-4 text-sm leading-6">
                <li>1. Upload an image in any format.</li>
                <li>2. Select output format and adjust settings.</li>
                <li>3. Convert and download instantly.</li>
              </ul>
            </div>
          </div>
        </section>

        {files.length === 0 ? (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
              <h2 className="text-xl font-semibold">Upload your image</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Supports JPG, PNG, WebP, AVIF, GIF, BMP, ICO, TIFF. Max 10MB per file.
              </p>
              <div className="mt-6">
                <ImageDropzone onFileSelect={handleFileSelect} maxSizeMB={10} />
              </div>
            </div>
            <div className="rounded-[2rem] bg-slate-50 p-6 shadow-inner shadow-slate-200/50 dark:bg-slate-900/80 dark:shadow-slate-800/50">
              <h3 className="text-lg font-semibold">Supported formats</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Convert your images to any modern format with full quality control.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {FORMATS.map((fmt) => (
                  <div key={fmt.mime} className="text-sm">
                    <p className="font-semibold text-slate-900 dark:text-slate-50">{fmt.label}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{fmt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
                      {previews[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previews[0]} alt={files[0]?.name || "preview"} className="w-full h-96 object-contain bg-black/5" />
                      ) : (
                        <div className="h-96 flex items-center justify-center p-6">
                          <ImageIcon className="h-12 w-12 text-indigo-500" />
                        </div>
                      )}
                    </div>
                    <div className="w-full mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold truncate">{files[0]?.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{files[0] ? `${(files[0].size / 1024 / 1024).toFixed(2)} MB` : ""}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => removeFile(0)}
                          className="rounded-2xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900"
                        >
                          Remove
                        </button>
                        <button
                          onClick={clearAll}
                          className="rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <button
                        onClick={processAndDownload}
                        disabled={processing || files.length === 0}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {processing ? (
                          <>
                            <RefreshCw className="animate-spin" /> Converting...
                          </>
                        ) : (
                          <>
                            <Zap size={18} /> Convert image
                          </>
                        )}
                      </button>
                    </div>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{statusMessage}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
                <h3 className="text-lg font-semibold mb-4">Adjust & Export</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Output format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value as SupportedFormat)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 bg-white dark:bg-slate-950"
                    >
                      {FORMATS.map((f) => (
                        <option key={f.mime} value={f.mime}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Quality: {quality}%</label>
                    <input type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" min={0} value={width} onChange={(e) => setWidth(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Width (px)" className="rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 bg-white dark:bg-slate-950" />
                    <input type="number" min={0} value={height} onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Height (px)" className="rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 bg-white dark:bg-slate-950" />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} className="rounded" />
                      <span className="text-sm">Keep aspect</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={flipH} onChange={(e) => setFlipH(e.target.checked)} className="rounded" />
                      <span className="text-sm">Flip H</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={flipV} onChange={(e) => setFlipV(e.target.checked)} className="rounded" />
                      <span className="text-sm">Flip V</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Rotate: {rotate}°</label>
                    <input type="range" min={0} max={360} step={15} value={rotate} onChange={(e) => setRotate(Number(e.target.value))} className="w-full" />
                  </div>
                </div>
              </div>
            </div>

            {converted.length > 0 && (
              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
                <h2 className="text-xl font-semibold mb-6">Conversion results</h2>
                <div className="grid gap-4">
                  {converted.map((result, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${
                        result.status === "success"
                          ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
                          : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{result.file.name}</p>
                        <p className={`text-sm ${
                          result.status === "success"
                            ? "text-green-700 dark:text-green-200"
                            : "text-red-700 dark:text-red-200"
                        }`}>
                          {result.status === "success" ? "Converted successfully" : result.error}
                        </p>
                      </div>
                      {result.status === "success" && result.blob && (
                        <button
                          onClick={() => downloadFile(result)}
                          className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
                        >
                          <Download size={16} /> Download
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
