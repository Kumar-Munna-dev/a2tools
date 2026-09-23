"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  RefreshCw,
  Image as ImageIcon,
  Square,
  FileImage,
  Palette,
  LayoutTemplate,
} from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import ImageDropzone from "@/app/components/ImageDropzone";

export default function RoundCorners() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState("rounded-image");
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  
  // Settings
  const [radiusPercentage, setRadiusPercentage] = useState<number>(10); // 0 to 50
  const [outputType, setOutputType] = useState("image/png");

  // Output
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    const nameWithoutExt = file.name.split('.').slice(0, -1).join('.') || 'image';
    setImageName(nameWithoutExt);
    setCroppedImage(null);

    // Get dimensions
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = url;
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    if (r > w / 2) r = w / 2;
    if (r > h / 2) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const handleGenerate = async () => {
    if (!imageSrc) return;

    try {
      setIsProcessing(true);
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("No 2d context");

      canvas.width = image.width;
      canvas.height = image.height;

      // Ensure transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate pixel radius from percentage (max 50%)
      const minDimension = Math.min(canvas.width, canvas.height);
      const pixelRadius = (minDimension * (radiusPercentage / 100));

      // Clip the canvas with rounded rectangle
      drawRoundRect(ctx, 0, 0, canvas.width, canvas.height, pixelRadius);
      ctx.clip();

      // Draw original image into the clipped region
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL(outputType, 1.0);
      setCroppedImage(base64Image);
    } catch (e) {
      console.error(e);
      alert("Error generating rounded corners.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const ext = outputType === "image/webp" ? "webp" : "png";
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `${imageName}-rounded.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setRadiusPercentage(10);
  };

  const PRESETS = [
    { label: "Slight", value: 5, radiusClass: "rounded-md" },
    { label: "Medium", value: 15, radiusClass: "rounded-xl" },
    { label: "Large", value: 25, radiusClass: "rounded-3xl" },
    { label: "Pill / Circle", value: 50, radiusClass: "rounded-full" },
  ];

  return (
    <ToolLayout
      title="Round Corners on Image"
      description="Easily soften your photos by adding smooth rounded corners with absolute transparency."
      toolType="ImageTool"
      categoryPath="/tools/imageTools"
      categoryName="Image Tools"
    >
      {!imageSrc ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-3xl shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-cyan-400 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
            <Square size={40} className="stroke-[2.5px] text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">Round Image Corners</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Upload an image to add beautifully smooth rounded corners and export with a transparent background.
          </p>
          <div className="max-w-xl mx-auto">
            <ImageDropzone onFileSelect={handleImageUpload} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Main Column: Workspace */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
              
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-indigo-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Live Preview</span>
                </div>
                {imageDimensions.width > 0 && (
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold tracking-wide">
                    {imageDimensions.width} x {imageDimensions.height}px
                  </span>
                )}
              </div>

              <div className="relative h-[50vh] sm:h-[65vh] w-full bg-[url(/checkerboard.png)] dark:bg-slate-950 flex items-center justify-center p-8 overflow-hidden inner-shadow">
                {/* CSS Based Live Preview */}
                <div 
                  className="relative max-w-full max-h-full flex items-center justify-center shadow-2xl transition-all duration-300 ring-1 ring-slate-900/5 dark:ring-white/10" 
                  style={{ borderRadius: `${radiusPercentage}%`, overflow: 'hidden' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imageSrc} 
                    alt="Preview" 
                    className="object-contain max-w-full max-h-full block transition-all duration-300"
                  />
                </div>
              </div>

              {/* Integrated Toolbar */}
              <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Fine-tune Corner Radius</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-lg">{radiusPercentage}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 shrink-0 border-2 border-slate-300 dark:border-slate-600 rounded-sm" />
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={radiusPercentage}
                    onChange={(e) => setRadiusPercentage(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 shadow-inner"
                  />
                  <div className="w-6 h-6 shrink-0 border-2 border-indigo-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Output */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-500" />
                Radius Presets
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {PRESETS.map((preset) => {
                  const isSelected = radiusPercentage === preset.value;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => setRadiusPercentage(preset.value)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-sm"
                          : "border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center mb-3">
                        <div className={`w-full h-full border-[3px] shadow-sm transition-all duration-300 ${preset.radiusClass} ${isSelected ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-500/20' : 'border-slate-300 dark:border-slate-600'}`} />
                      </div>
                      <span className={`text-sm font-bold text-center leading-tight ${isSelected ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <FileImage className="w-5 h-5 text-indigo-500" />
                Export Settings
              </h3>

              <div className="space-y-4 pt-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Image Format</label>
                <select
                  value={outputType}
                  onChange={(e) => setOutputType(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-sm"
                >
                  <option value="image/png">PNG (Transparent Background)</option>
                  <option value="image/webp">WebP (Transparent Background)</option>
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Note:</span> JPEG does not support transparency. PNG or WebP guarantees the space outside your rounded corners remains invisible.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-bold text-lg transition-transform active:scale-95 shadow-md shadow-indigo-500/25 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {isProcessing ? <RefreshCw className="animate-spin w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
                  Apply Rounded Corners
                </button>
                <button
                  onClick={resetAll}
                  className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors border border-transparent"
                >
                  Upload New Image
                </button>
              </div>
            </div>

            {croppedImage && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center justify-center gap-2">
                  <FileImage className="w-5 h-5 text-green-500" />
                  Result Ready!
                </h3>
                
                <div className="mx-auto mb-6 flex justify-center p-4 rounded-2xl bg-[url(/checkerboard.png)] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={croppedImage} alt="Rounded preview" className="max-w-[180px] max-h-[220px] w-auto h-auto object-contain drop-shadow-md" />
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg transition-transform active:scale-95 shadow-md shadow-green-500/25 flex items-center justify-center gap-2"
                >
                  <Download className="w-6 h-6" />
                  Download Image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
