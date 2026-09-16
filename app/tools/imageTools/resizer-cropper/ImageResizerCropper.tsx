"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Scissors,
  Download,
  RefreshCw,
  ZoomIn,
  RotateCw,
  Crop,
  Settings2,
  CheckCircle2,
  FileImage,
  Loader2,
  Lock,
  Unlock,
  MousePointer2,
} from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import ImageDropzone from "@/app/components/ImageDropzone";

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

interface OutputOptions {
  format?: string;
  targetWidth?: number;
  targetHeight?: number;
  targetKb?: number;
}

const ASPECT_OPTIONS = [
  { label: "Free", value: 0 },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:4", value: 3 / 4 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

const FORMAT_OPTIONS = [
  { label: "JPEG", value: "image/jpeg", ext: "jpg" },
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "WebP", value: "image/webp", ext: "webp" },
];

export default function ImageResizerCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState("cropped-image");
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [naturalDimensions, setNaturalDimensions] = useState<{w: number, h: number} | null>(null);

  // Modes
  const [cropMode, setCropMode] = useState<"rect" | "polygon">("rect");

  // Rect Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);

  // Polygon Cropper State
  const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);
  const [isPolygonClosed, setIsPolygonClosed] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Output State
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [finalFileSize, setFinalFileSize] = useState<number | null>(null);
  const [finalDimensions, setFinalDimensions] = useState<{ w: number; h: number } | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  // Resize Settings
  const [enableResize, setEnableResize] = useState(false);
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [lockResizeAspect, setLockResizeAspect] = useState(true);

  // Compression Settings
  const [enableTargetSize, setEnableTargetSize] = useState(false);
  const [targetKb, setTargetKb] = useState<number>(100);
  const [outputFormat, setOutputFormat] = useState("image/jpeg");

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
    if (!enableResize) {
      setTargetWidth(pixels.width);
      setTargetHeight(pixels.height);
    }
  }, [enableResize]);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setOriginalSize(file.size / 1024);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      const img = new Image();
      img.onload = () => setNaturalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    setImageName(file.name.replace(/\.[^/.]+$/, ""));
    resetView();
  };

  const handleFileChange = (file: File) => {
    processFile(file);
  };

  const resetView = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(0);
    setEnableResize(false);
    setCroppedImage(null);
    setFinalFileSize(null);
    setFinalDimensions(null);
    setPolygonPoints([]);
    setIsPolygonClosed(false);
  };

  const clearImage = () => {
    setImageSrc(null);
    setNaturalDimensions(null);
    resetView();
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (lockResizeAspect) {
      if (cropMode === "rect" && croppedAreaPixels && croppedAreaPixels.width > 0) {
        const ratio = croppedAreaPixels.height / croppedAreaPixels.width;
        setTargetHeight(Math.round(w * ratio));
      } else if (cropMode === "polygon" && polygonPoints.length > 2) {
        const minX = Math.min(...polygonPoints.map(p => p.x));
        const maxX = Math.max(...polygonPoints.map(p => p.x));
        const minY = Math.min(...polygonPoints.map(p => p.y));
        const maxY = Math.max(...polygonPoints.map(p => p.y));
        const ratio = (maxY - minY) / (maxX - minX);
        setTargetHeight(Math.round(w * ratio));
      }
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (lockResizeAspect) {
      if (cropMode === "rect" && croppedAreaPixels && croppedAreaPixels.height > 0) {
        const ratio = croppedAreaPixels.width / croppedAreaPixels.height;
        setTargetWidth(Math.round(h * ratio));
      } else if (cropMode === "polygon" && polygonPoints.length > 2) {
        const minX = Math.min(...polygonPoints.map(p => p.x));
        const maxX = Math.max(...polygonPoints.map(p => p.x));
        const minY = Math.min(...polygonPoints.map(p => p.y));
        const maxY = Math.max(...polygonPoints.map(p => p.y));
        const ratio = (maxX - minX) / (maxY - minY);
        setTargetWidth(Math.round(h * ratio));
      }
    }
  };

  // Polygon Drawing Logic
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPolygonClosed || !svgRef.current) return;

    const svgElement = svgRef.current;
    const pt = svgElement.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    
    // Transform screen coordinate to SVG's coordinate system (which perfectly matches the image natural dimensions thanks to viewBox)
    const svgP = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
    
    const newPoint = { x: svgP.x, y: svgP.y };

    // Check if clicking near the first point to close the polygon
    if (polygonPoints.length > 2) {
      const firstPoint = polygonPoints[0];
      const dist = Math.sqrt(Math.pow(firstPoint.x - newPoint.x, 2) + Math.pow(firstPoint.y - newPoint.y, 2));
      // Distance threshold in natural pixels (adapt based on zoom if needed, but 20px is okay for most)
      if (dist < (naturalDimensions ? Math.max(naturalDimensions.w, naturalDimensions.h) * 0.05 : 20)) {
        setIsPolygonClosed(true);
        
        // Auto-calculate width/height for resize toggles
        const minX = Math.min(...polygonPoints.map(p => p.x));
        const maxX = Math.max(...polygonPoints.map(p => p.x));
        const minY = Math.min(...polygonPoints.map(p => p.y));
        const maxY = Math.max(...polygonPoints.map(p => p.y));
        if (!enableResize) {
          setTargetWidth(Math.round(maxX - minX));
          setTargetHeight(Math.round(maxY - minY));
        }
        return;
      }
    }

    setPolygonPoints([...polygonPoints, newPoint]);
  };

  const generateCrop = async () => {
    if (!imageSrc) return;
    if (cropMode === "rect" && !croppedAreaPixels) return;
    if (cropMode === "polygon" && (!isPolygonClosed || polygonPoints.length < 3)) {
      alert("Please draw and close a polygon shape first.");
      return;
    }

    setIsCropping(true);
    try {
      const result = await getCroppedImg(
        imageSrc, 
        cropMode === "rect" ? croppedAreaPixels! : null, 
        cropMode === "rect" ? rotation : 0, 
        {
          format: outputFormat,
          targetKb: enableTargetSize ? targetKb : undefined,
          targetWidth: enableResize ? targetWidth : undefined,
          targetHeight: enableResize ? targetHeight : undefined,
        },
        cropMode === "polygon" ? polygonPoints : null
      );
      
      if (result) {
        setCroppedImage(result.url);
        setFinalFileSize(result.sizeKb);
        setFinalDimensions({ w: result.width, h: result.height });
        
        setTimeout(() => {
          document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while cropping the image.");
    } finally {
      setIsCropping(false);
    }
  };

  useEffect(() => {
    return () => {
      if (croppedImage) URL.revokeObjectURL(croppedImage);
    };
  }, [croppedImage]);

  const currentExt = FORMAT_OPTIONS.find((f) => f.value === outputFormat)?.ext ?? "jpg";

  return (
      <ToolLayout
      title="Image Resizer & Cropper"
      description="Standard rectangular crop or Freeform Polygon (Lasso) cutout. Compress and resize images instantly in your browser."
      toolType="Image"
      categoryPath="/tools/imageTools"
      categoryName="Image Tools"
      howToUse={[
        "Click or drag to upload an image file (JPEG, PNG, WebP).",
        "Select your crop mode: standard Rectangular crop or Polygon Lasso.",
        "Adjust aspect ratio, zoom, and rotation if using the rectangular mode.",
        "Set your desired output dimensions (width and height in pixels).",
        "Optionally, set a target file size in KB to automatically compress the image.",
        "Click 'Apply & Preview' to process the image, then hit Download."
      ]}
      features={[
        "Completely private client-side processing (no server uploads)",
        "Advanced Polygon Lasso crop for freeform shape cutouts",
        "Precise pixel resizing with aspect-ratio locking",
        "Intelligent image compression to meet strict KB limits",
        "Support for modern formats like WebP alongside JPEG and PNG"
      ]}
      faqs={[
        { question: "How do I resize an image to exact dimensions?", answer: "Enable the 'Resize Output' toggle, enter your exact width and height in pixels, and uncheck the aspect ratio lock if you want exact measurements regardless of distortion." },
        { question: "Can I compress an image to under 100 KB?", answer: "Yes! Check the 'Target File Size' option and enter 100. The tool automatically adjusts JPEG/WebP quality to ensure the file stays below your limit." },
        { question: "Is my image uploaded to a server?", answer: "No. All cropping, resizing, and compression runs entirely in your browser using local processing. Your image never leaves your device." }
      ]}
    >
      <div className="space-y-8">
        {!imageSrc && (
          <ImageDropzone onFileSelect={handleFileChange} accept="image/*" maxSizeMB={20} />
        )}

        {imageSrc && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Canvas & Preview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 gap-4">
                  <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1 rounded-lg">
                    <button 
                      onClick={() => setCropMode("rect")}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition ${cropMode === "rect" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}`}
                    >
                      <Crop size={16} /> Rect
                    </button>
                    <button 
                      onClick={() => setCropMode("polygon")}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition ${cropMode === "polygon" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}`}
                    >
                      <MousePointer2 size={16} /> Polygon (Lasso)
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    {cropMode === "polygon" && polygonPoints.length > 0 && !isPolygonClosed && (
                      <button onClick={() => { setIsPolygonClosed(true); setTargetWidth(0); setTargetHeight(0); }} className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400 hover:bg-indigo-100 transition">
                        Finish Shape
                      </button>
                    )}
                    <button onClick={resetView} className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      Reset
                    </button>
                    <button onClick={clearImage} className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="relative h-[60vh] min-h-[400px] w-full bg-slate-100 dark:bg-slate-950/50 flex items-center justify-center overflow-hidden">
                  {cropMode === "rect" ? (
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      rotation={rotation}
                      aspect={aspect === 0 ? undefined : aspect}
                      onCropChange={setCrop}
                      onRotationChange={setRotation}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  ) : (
                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                      <div className="relative max-w-full max-h-full" style={{ aspectRatio: naturalDimensions ? `${naturalDimensions.w}/${naturalDimensions.h}` : 'auto', height: '100%' }}>
                        <img 
                          src={imageSrc} 
                          alt="Polygon Crop" 
                          className="w-full h-full object-contain pointer-events-none select-none" 
                          draggable={false}
                        />
                        {naturalDimensions && (
                          <svg
                            ref={svgRef}
                            viewBox={`0 0 ${naturalDimensions.w} ${naturalDimensions.h}`}
                            preserveAspectRatio="xMidYMid meet"
                            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                            onClick={handleSvgClick}
                          >
                            {/* Draw background dimming for outside polygon */}
                            {isPolygonClosed && (
                              <path 
                                d={`M 0 0 L ${naturalDimensions.w} 0 L ${naturalDimensions.w} ${naturalDimensions.h} L 0 ${naturalDimensions.h} Z M ${polygonPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} Z`}
                                fill="rgba(0,0,0,0.5)"
                                fillRule="evenodd"
                                pointerEvents="none"
                              />
                            )}

                            {/* Draw points and lines */}
                            {polygonPoints.length > 0 && (
                              <polyline
                                points={polygonPoints.map(p => `${p.x},${p.y}`).join(" ")}
                                fill={isPolygonClosed ? "transparent" : "none"}
                                stroke="#4f46e5"
                                strokeWidth={Math.max(naturalDimensions.w, naturalDimensions.h) * 0.005}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            
                            {/* Draw connecting line to close if closed */}
                            {isPolygonClosed && polygonPoints.length > 2 && (
                              <line
                                x1={polygonPoints[polygonPoints.length - 1].x}
                                y1={polygonPoints[polygonPoints.length - 1].y}
                                x2={polygonPoints[0].x}
                                y2={polygonPoints[0].y}
                                stroke="#4f46e5"
                                strokeWidth={Math.max(naturalDimensions.w, naturalDimensions.h) * 0.005}
                              />
                            )}

                            {/* Draw points */}
                            {polygonPoints.map((p, i) => (
                              <circle 
                                key={i} 
                                cx={p.x} 
                                cy={p.y} 
                                r={Math.max(naturalDimensions.w, naturalDimensions.h) * 0.01} 
                                fill={i === 0 && !isPolygonClosed ? "#f43f5e" : "#ffffff"} 
                                stroke="#4f46e5"
                                strokeWidth={Math.max(naturalDimensions.w, naturalDimensions.h) * 0.003}
                              />
                            ))}
                          </svg>
                        )}
                        {!isPolygonClosed && polygonPoints.length === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-slate-900/80 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur shadow-lg">
                              Click on the image to trace a shape
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Section */}
              {croppedImage && (
                <div id="result-section" className="rounded-2xl border border-green-200 bg-green-50/50 p-6 shadow-sm dark:border-green-900/50 dark:bg-green-900/10 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-green-800 dark:text-green-400">
                        <CheckCircle2 size={20} />
                        Image Ready!
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                          {finalDimensions?.w} × {finalDimensions?.h} px
                        </span>
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                          {finalFileSize?.toFixed(1)} KB
                        </span>
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                          {currentExt}
                        </span>
                      </div>
                    </div>
                    <a
                      href={croppedImage}
                      download={`${imageName}-edited.${currentExt}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-green-700 transition"
                    >
                      <Download size={18} />
                      Download Image
                    </a>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 border border-slate-200 dark:border-slate-800" style={{ background: 'repeating-conic-gradient(rgba(128,128,128,0.1) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px' }}>
                    <img src={croppedImage} alt="Final Cropped Result" className="max-h-[400px] object-contain shadow-lg rounded-md" />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Tools & Settings */}
            <aside className="space-y-6">
              
              {/* Aspect Ratio - Only show in Rect mode */}
              {cropMode === "rect" && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-all">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 uppercase tracking-wider">
                    <Crop size={16} className="text-indigo-500" /> Aspect Ratio
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {ASPECT_OPTIONS.map(({ label, value }) => (
                      <button
                        key={label}
                        onClick={() => setAspect(value)}
                        className={`px-3 py-2 text-sm font-semibold rounded-lg border transition-all ${
                          aspect === value
                            ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Adjustments (Zoom, Rotate) - Only show in Rect mode */}
              {cropMode === "rect" && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-6 transition-all">
                  <div className="space-y-3">
                    <label className="flex justify-between text-sm font-bold text-slate-800 dark:text-slate-100">
                      <span className="flex items-center gap-2"><ZoomIn size={16} className="text-indigo-500" /> Zoom</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{zoom.toFixed(1)}x</span>
                    </label>
                    <input type="range" min={1} max={10} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full accent-indigo-600" />
                  </div>
                  <div className="space-y-3">
                    <label className="flex justify-between text-sm font-bold text-slate-800 dark:text-slate-100">
                      <span className="flex items-center gap-2"><RotateCw size={16} className="text-indigo-500" /> Rotate</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{rotation}°</span>
                    </label>
                    <input type="range" min={0} max={360} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full accent-indigo-600" />
                  </div>
                </div>
              )}

              {/* Resize & Compress */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-6 transition-all">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                  <Settings2 size={16} className="text-indigo-500" /> Export Settings
                </h3>

                {/* Resize */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Resize Output</span>
                    <input type="checkbox" checked={enableResize} onChange={(e) => setEnableResize(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                  </label>
                  {enableResize && (
                    <div className="flex items-center gap-3">
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-slate-500">WIDTH (PX)</label>
                        <input type="number" value={targetWidth} onChange={(e) => handleWidthChange(Number(e.target.value))} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                      </div>
                      <button onClick={() => setLockResizeAspect(!lockResizeAspect)} className="mt-5 p-2 text-slate-400 hover:text-indigo-500 transition">
                        {lockResizeAspect ? <Lock size={16} /> : <Unlock size={16} />}
                      </button>
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-slate-500">HEIGHT (PX)</label>
                        <input type="number" value={targetHeight} onChange={(e) => handleHeightChange(Number(e.target.value))} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Compression limit */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Target File Size</span>
                    <input type="checkbox" checked={enableTargetSize} onChange={(e) => setEnableTargetSize(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                  </label>
                  {enableTargetSize && (
                    <div className="flex items-center gap-3">
                      <input type="number" value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                      <span className="text-sm font-bold text-slate-500">KB Max</span>
                    </div>
                  )}
                </div>

                {/* Format Selection */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-3 gap-2">
                    {FORMAT_OPTIONS.map((fmt) => (
                      <button
                        key={fmt.value}
                        onClick={() => setOutputFormat(fmt.value)}
                        className={`px-2 py-2 text-xs font-bold rounded-lg border transition-all ${
                          outputFormat === fmt.value
                            ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={generateCrop}
                  disabled={isCropping}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {isCropping ? (
                    <><Loader2 size={18} className="animate-spin" /> Processing...</>
                  ) : (
                    <><Scissors size={18} /> Apply & Preview</>
                  )}
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

// ─── Canvas Helpers ─────────────────────────────────────────────────────────

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });

function getRadianAngle(deg: number) {
  return (deg * Math.PI) / 180;
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CroppedArea | null,
  rotation = 0,
  options: OutputOptions = {},
  polygonPoints: Point[] | null = null
): Promise<{ url: string; sizeKb: number; width: number; height: number } | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  if (polygonPoints && polygonPoints.length > 2) {
    // POLYGON (LASSO) CROP MODE
    const minX = Math.min(...polygonPoints.map(p => p.x));
    const maxX = Math.max(...polygonPoints.map(p => p.x));
    const minY = Math.min(...polygonPoints.map(p => p.y));
    const maxY = Math.max(...polygonPoints.map(p => p.y));

    canvas.width = maxX - minX;
    canvas.height = maxY - minY;

    // Optional: fill background for JPEG (which doesn't support transparency)
    if (options.format === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw the polygon path
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x - minX, polygonPoints[0].y - minY);
    for (let i = 1; i < polygonPoints.length; i++) {
      ctx.lineTo(polygonPoints[i].x - minX, polygonPoints[i].y - minY);
    }
    ctx.closePath();
    ctx.clip();

    // Draw the image offset by the bounding box
    ctx.drawImage(image, -minX, -minY);
  } else if (pixelCrop) {
    // STANDARD RECTANGLE CROP MODE
    const rotRad = getRadianAngle(rotation);
    const bW = Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height);
    const bH = Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height);

    // Create a temporary canvas for the rotated image
    const rotCanvas = document.createElement("canvas");
    rotCanvas.width = bW;
    rotCanvas.height = bH;
    const rotCtx = rotCanvas.getContext("2d");
    if (!rotCtx) return null;

    if (options.format === "image/jpeg") {
      rotCtx.fillStyle = "#ffffff";
      rotCtx.fillRect(0, 0, rotCanvas.width, rotCanvas.height);
    }

    rotCtx.translate(bW / 2, bH / 2);
    rotCtx.rotate(rotRad);
    rotCtx.translate(-image.width / 2, -image.height / 2);
    rotCtx.imageSmoothingEnabled = true;
    rotCtx.imageSmoothingQuality = "high";
    rotCtx.drawImage(image, 0, 0);

    const data = rotCtx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(data, 0, 0);
  } else {
    return null; // Both null, shouldn't happen
  }

  // --- RESIZE LOGIC ---
  let finalCanvas = canvas;
  if (options.targetWidth && options.targetHeight) {
    finalCanvas = document.createElement("canvas");
    finalCanvas.width = options.targetWidth;
    finalCanvas.height = options.targetHeight;
    const fc = finalCanvas.getContext("2d");
    if (fc) {
      if (options.format === "image/jpeg") {
        fc.fillStyle = "#ffffff";
        fc.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
      }
      fc.imageSmoothingEnabled = true;
      fc.imageSmoothingQuality = "high";
      fc.drawImage(canvas, 0, 0, options.targetWidth, options.targetHeight);
    }
  }

  // --- EXPORT LOGIC ---
  const format = options.format || "image/jpeg";
  const toBlob = (c: HTMLCanvasElement, fmt: string, q: number): Promise<Blob | null> =>
    new Promise((res) => c.toBlob(res, fmt, q));

  let blob: Blob | null = null;

  if (options.targetKb && (format === "image/jpeg" || format === "image/webp")) {
    const target = options.targetKb * 1024;
    let minQ = 0.1, maxQ = 1.0, q = 0.9;
    for (let i = 0; i < 8; i++) {
      blob = await toBlob(finalCanvas, format, q);
      if (!blob) break;
      if (blob.size <= target && blob.size >= target * 0.85) break;
      if (blob.size > target) maxQ = q; else minQ = q;
      q = (minQ + maxQ) / 2;
    }
    if (blob && blob.size > target) {
      let scale = 0.9;
      while (blob && blob.size > target && scale > 0.1) {
        const sc = document.createElement("canvas");
        sc.width = Math.max(1, Math.floor(finalCanvas.width * scale));
        sc.height = Math.max(1, Math.floor(finalCanvas.height * scale));
        const sCtx = sc.getContext("2d");
        if (sCtx) {
          if (format === "image/jpeg") { sCtx.fillStyle = "#ffffff"; sCtx.fillRect(0, 0, sc.width, sc.height); }
          sCtx.drawImage(finalCanvas, 0, 0, sc.width, sc.height);
          blob = await toBlob(sc, format, minQ);
        }
        scale -= 0.15;
      }
    }
  } else {
    blob = await toBlob(finalCanvas, format, 0.95);
  }

  if (!blob) return null;
  return { 
    url: URL.createObjectURL(blob), 
    sizeKb: blob.size / 1024,
    width: finalCanvas.width,
    height: finalCanvas.height 
  };
}