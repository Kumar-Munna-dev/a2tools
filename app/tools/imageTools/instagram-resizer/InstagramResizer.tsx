"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Download,
  RefreshCw,
  ZoomIn,
  Instagram,
  FileImage,
  Crop,
  Settings,
} from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import ImageDropzone from "@/app/components/ImageDropzone";

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const IG_FORMATS = [
  { id: "square", label: "Square Post", aspect: 1, width: 1080, height: 1080 },
  { id: "portrait", label: "Portrait Post", aspect: 4 / 5, width: 1080, height: 1350 },
  { id: "landscape", label: "Landscape Post", aspect: 1.91 / 1, width: 1080, height: 566 },
  { id: "story", label: "Story / Reels", aspect: 9 / 16, width: 1080, height: 1920 },
  { id: "profile", label: "Profile Picture", aspect: 1, width: 320, height: 320 },
];

export default function InstagramResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState("instagram-image");
  
  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);

  // Settings
  const [selectedFormatId, setSelectedFormatId] = useState("square");
  const [outputType, setOutputType] = useState("image/jpeg");

  // Output
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const activeFormat = IG_FORMATS.find(f => f.id === selectedFormatId) || IG_FORMATS[0];

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

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

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsCropping(true);
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("No 2d context");

      // Set canvas to the exact Instagram required dimensions
      canvas.width = activeFormat.width;
      canvas.height = activeFormat.height;

      // Ensure white background for JPEG transparent source images
      if (outputType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Draw the cropped area, scaled exactly to the canvas size
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Save at very high quality for social media
      const base64Image = canvas.toDataURL(outputType, 0.95);
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
    const ext = outputType === "image/jpeg" ? "jpg" : "png";
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `${imageName}-ig-${activeFormat.id}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setZoom(1);
  };

  return (
    <ToolLayout
      title="Resize Image for Instagram"
      description="Crop and resize your photos to the perfect dimensions for Instagram Posts, Stories, Reels, and Profile Pictures."
      toolType="ImageTool"
      categoryPath="/tools/imageTools"
      categoryName="Image Tools"
    >
      {!imageSrc ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-3xl shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
            <Instagram size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">Perfect Instagram Sizes</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Upload an image to magically crop and resize it for IG Posts, Stories, Reels, or Profile Pics without losing quality.
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
                  <Crop className="w-5 h-5 text-pink-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Canvas Preview</span>
                </div>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 rounded-full text-xs font-bold tracking-wide">
                  {activeFormat.width} x {activeFormat.height}px
                </span>
              </div>

              <div className="relative h-[50vh] sm:h-[65vh] w-full bg-[url(/checkerboard.png)] dark:bg-slate-950 flex items-center justify-center">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={activeFormat.aspect}
                  showGrid={true}
                  cropShape={activeFormat.id === 'profile' ? 'round' : 'rect'}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              {/* Integrated Toolbar */}
              <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-4">
                <ZoomIn className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <span className="text-sm font-semibold text-slate-500 w-12 text-right shrink-0">{Math.round(zoom * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Output */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-500" />
                Choose Format
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {IG_FORMATS.map((format, index) => {
                  const isSelected = selectedFormatId === format.id;
                  
                  // Calculate exact dimensions to fit perfectly in a 32x32px bounding box
                  const boxStyle = format.aspect >= 1 
                    ? { width: '32px', height: `${32 / format.aspect}px` }
                    : { height: '32px', width: `${32 * format.aspect}px` };

                  return (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormatId(format.id)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                        index === IG_FORMATS.length - 1 ? 'col-span-2' : ''
                      } ${
                        isSelected
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-500/10 shadow-sm"
                          : "border-slate-100 dark:border-slate-800 hover:border-pink-200 dark:hover:border-pink-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      {/* Visual Aspect Ratio Box */}
                      <div className="w-12 h-12 flex items-center justify-center mb-2">
                        <div 
                          style={boxStyle} 
                          className={`border-[3px] shadow-sm transition-colors ${
                            format.id === 'profile' ? 'rounded-full' : 'rounded-sm'
                          } ${
                            isSelected 
                              ? 'border-pink-500 bg-pink-100 dark:bg-pink-500/20' 
                              : 'border-slate-300 dark:border-slate-600'
                          }`} 
                        />
                      </div>
                      
                      <span className={`text-sm font-bold text-center leading-tight ${isSelected ? 'text-pink-700 dark:text-pink-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {format.label}
                      </span>
                      <span className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-pink-500 dark:text-pink-300' : 'text-slate-400'}`}>
                        {format.width}x{format.height}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Export Quality</label>
                <select
                  value={outputType}
                  onChange={(e) => setOutputType(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                >
                  <option value="image/jpeg">JPEG (Best for Instagram)</option>
                  <option value="image/png">PNG (Lossless Quality)</option>
                </select>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={handleCrop}
                  disabled={isCropping}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg transition-transform active:scale-95 shadow-md shadow-pink-500/25 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {isCropping ? <RefreshCw className="animate-spin w-6 h-6" /> : <Crop className="w-6 h-6" />}
                  Crop & Resize
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
                  Ready for Instagram!
                </h3>
                
                <div className={`mx-auto mb-6 flex justify-center p-4 rounded-2xl ${outputType === 'image/png' ? 'bg-[url(/checkerboard.png)] dark:bg-slate-950 border border-slate-200 dark:border-slate-800' : 'bg-slate-50 dark:bg-slate-950'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={croppedImage} alt="Cropped preview" className={`max-w-[180px] max-h-[220px] w-auto h-auto object-contain shadow-lg ${activeFormat.id === 'profile' ? 'rounded-full' : 'rounded-lg'}`} />
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
