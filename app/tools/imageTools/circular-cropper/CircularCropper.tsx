"use client";

import React, { useState, useCallback, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Download,
  RefreshCw,
  ZoomIn,
  RotateCw,
  Image as ImageIcon,
  Palette,
  Circle,
  FileImage,
} from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import ImageDropzone from "@/app/components/ImageDropzone";

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function CircularCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState("circular-image");
  
  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);

  // Custom Size State
  const [enableCustomSize, setEnableCustomSize] = useState(false);
  const [targetSize, setTargetSize] = useState<number>(500);

  // Settings
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [addBorder, setAddBorder] = useState(false);
  const [borderColor, setBorderColor] = useState("#4f46e5");
  const [borderWidth, setBorderWidth] = useState(10);

  // Output
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
    if (!enableCustomSize) {
      setTargetSize(pixels.width); // Keep input synced if not forced
    }
  }, [enableCustomSize]);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    const nameWithoutExt = file.name.split('.').slice(0, -1).join('.') || 'image';
    setImageName(nameWithoutExt);
    setCroppedImage(null);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getRadianAngle = (degreeValue: number) => {
    return (degreeValue * Math.PI) / 180;
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsCropping(true);
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("No 2d context");

      // Intermediate canvas to handle rotation
      const maxSize = Math.max(image.width, image.height);
      const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
      
      const intermediateCanvas = document.createElement("canvas");
      const iCtx = intermediateCanvas.getContext("2d");
      if (!iCtx) throw new Error("No 2d context");

      intermediateCanvas.width = safeArea;
      intermediateCanvas.height = safeArea;
      iCtx.translate(safeArea / 2, safeArea / 2);
      iCtx.rotate(getRadianAngle(rotation));
      iCtx.translate(-safeArea / 2, -safeArea / 2);
      iCtx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
      );

      // Set final dimensions based on toggle
      const finalSize = enableCustomSize ? targetSize : croppedAreaPixels.width;

      canvas.width = finalSize;
      canvas.height = finalSize;

      // Ensure background is fully transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the circular clip path
      ctx.beginPath();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2;
      
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      // Draw the cropped portion from the rotated safe area onto the final canvas (scaled if custom size is used)
      ctx.drawImage(
        intermediateCanvas,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - croppedAreaPixels.x) * -1,
        Math.round(0 - safeArea / 2 + image.height * 0.5 - croppedAreaPixels.y) * -1,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        finalSize,
        finalSize
      );

      // Add border if requested (scales based on finalSize)
      if (addBorder) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - borderWidth / 2, 0, Math.PI * 2, true);
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = borderColor;
        ctx.stroke();
      }

      const base64Image = canvas.toDataURL(outputFormat);
      setCroppedImage(base64Image);
    } catch (e) {
      console.error(e);
      alert("Error cropping image");
    } finally {
      setIsCropping(false);
    }
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const ext = outputFormat === "image/webp" ? "webp" : "png";
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `${imageName}-circular.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setZoom(1);
    setRotation(0);
    setAddBorder(false);
    setEnableCustomSize(false);
  };

  return (
    <ToolLayout
      title="Circular Image Cropper"
      description="Crop your images into perfect circles. Ideal for profile pictures, avatars, and logos."
      toolType="ImageTool"
      categoryPath="/tools/imageTools"
      categoryName="Image Tools"
    >
      {!imageSrc ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm text-center">
          <Circle size={48} className="mx-auto text-indigo-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Create Circular Avatars</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Upload an image to crop it into a perfect circle with a transparent background.</p>
          <ImageDropzone onFileSelect={handleImageUpload} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Main Column: Workspace */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-inner relative h-[50vh] sm:h-[60vh] w-full flex items-center justify-center">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ZoomIn className="w-5 h-5 text-indigo-500" />
                Adjust View
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <span>Zoom</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{Math.round(zoom * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <span>Rotation</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{rotation}°</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Output */}
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-500" />
                Styling & Export
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Output Format</label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="image/png">PNG (Transparent Background)</option>
                    <option value="image/webp">WebP (Transparent Background)</option>
                  </select>
                </div>
                
                {/* NEW: Custom Size Option */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={enableCustomSize}
                      onChange={(e) => setEnableCustomSize(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Resize Final Output (px)</span>
                  </label>
                  
                  {enableCustomSize && (
                    <div className="space-y-4 pl-8 border-l-2 border-indigo-100 dark:border-indigo-900 ml-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                          Diameter ({Math.round(targetSize)}px)
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={4000}
                          value={Math.round(targetSize)}
                          onChange={(e) => setTargetSize(Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={10}
                            max={4000}
                            value={Math.round(targetSize)}
                            onChange={(e) => setTargetSize(Number(e.target.value))}
                            className="w-24 p-2 text-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
                          />
                          <span className="text-sm text-slate-500 font-mono">px</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={addBorder}
                      onChange={(e) => setAddBorder(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Add Circular Border</span>
                  </label>
                  
                  {addBorder && (
                    <div className="space-y-4 pl-8 border-l-2 border-indigo-100 dark:border-indigo-900 ml-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Border Color</label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="color"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="w-10 h-10 rounded cursor-pointer border-none p-0"
                          />
                          <span className="text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">{borderColor}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                          Border Thickness ({borderWidth}px)
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={50}
                          value={borderWidth}
                          onChange={(e) => setBorderWidth(Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={handleCrop}
                  disabled={isCropping}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-transform active:scale-95 shadow-sm disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {isCropping ? <RefreshCw className="animate-spin w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  Generate Avatar
                </button>
                <button
                  onClick={resetAll}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-transform active:scale-95 border border-slate-200 dark:border-slate-700"
                >
                  Start Over
                </button>
              </div>
            </div>

            {croppedImage && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center justify-center gap-2">
                  <FileImage className="w-5 h-5 text-green-500" />
                  Result Ready
                </h3>
                
                <div className={`mx-auto mb-6 flex justify-center p-4 rounded-xl ${outputFormat === 'image/png' || outputFormat === 'image/webp' ? 'bg-[url(/checkerboard.png)] dark:bg-slate-800 border border-slate-200 dark:border-slate-700' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={croppedImage} alt="Cropped preview" className="max-w-[200px] max-h-[200px] w-auto h-auto object-contain rounded-full shadow-md" />
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
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
