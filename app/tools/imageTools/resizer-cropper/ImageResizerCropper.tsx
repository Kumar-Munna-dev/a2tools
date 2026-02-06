"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Upload, Scissors, Download, RefreshCw, ZoomIn, X, RotateCw } from "lucide-react";
import ImageDropzone from "@/app/components/ImageDropzone";

export default function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // New Rotation State
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((_un: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

const handleFileChange = (file: File) => {
  const reader = new FileReader();

  reader.onload = () => {
    setImage(reader.result as string);
  };

  reader.readAsDataURL(file);
};


  const showCroppedImage = async () => {
    try {
      setIsCropping(true);
      // Pass rotation to the utility function
      const cropped = await getCroppedImg(image!, croppedAreaPixels!, rotation);
      setCroppedImage(cropped);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-slate-950 dark:text-slate-50 pb-20 mt-20">
      <main className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold dark:text-slate-50 mb-2 tracking-tight">Image Cropper</h1>
          <p className="text-slate-500">Crop, zoom, and rotate your photos for the perfect shot.</p>
        </div>

        {!image ? (
          <div className=" ">
           
           <ImageDropzone onFileSelect={(file) => handleFileChange(file)} />       
           
            
          </div>
        ) : (
          <div className="space-y-6">
            <div className="dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Aspect Ratio Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex gap-2">
                  {[
                    { label: "1:1", value: 1 },
                    { label: "4:3", value: 4 / 3 },
                    { label: "16:9", value: 16 / 9 },
                    { label: "Free", value: 0 },
                  ].map((ratio) => (
                    <button
                      key={ratio.label}
                      onClick={() => setAspect(ratio.value)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        aspect === ratio.value ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => {setRotation(0); setZoom(1)}} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                   <RefreshCw size={14} /> RESET VIEW
                </button>
              </div>

              {/* Cropper Container */}
              <div className="relative h-[300px] md:h-[300px] md:w-full dark:bg-slate-900">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={aspect === 0 ? undefined : aspect}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              {/* Controls Grid */}
              <div className="p-8 dark:bg-slate-950 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Zoom Control */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold dark:text-slate-50 flex items-center gap-2 uppercase tracking-tight">
                      <ZoomIn size={16} className="dark:text-slate-50" /> Zoom
                    </label>
                    <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded dark:text-slate-50">{zoom.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={10}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Rotation Control */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold dark:text-slate-50 flex items-center gap-2 uppercase tracking-tight">
                      <RotateCw size={16} className="dark:text-slate-50" /> Rotation
                    </label>
                    <span className="text-xs font-mono dark:bg-slate-900 px-2 py-1 rounded dark:text-slate-50">{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-8 pb-8 flex gap-3">
                <button onClick={() => setImage(null)} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all border border-slate-200">
                  CANCEL
                </button>
                <button 
                  onClick={showCroppedImage}
                  disabled={isCropping}
                  className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl  transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCropping ? <RefreshCw className="animate-spin" /> : <Scissors size={20} />}
                  GENERATE CROP
                </button>
              </div>
            </div>

            {/* Final Result */}
            {croppedImage && (
              <div className="mt-8 dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-indigo-50 animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-black text-2xl dark:text-slate-50">Success!</h3>
                    <p className="dark:text-slate-400 text-sm">Your image has been cropped and rotated.</p>
                  </div>
                  <a
                    href={croppedImage}
                    download="perfect-crop.jpg"
                    className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-2xl hover:bg-indigo-400 transition-all font-bold "
                  >
                    <Download size={20} /> DOWNLOAD
                  </a>
                </div>
                <div className="dark:bg-slate-900 rounded-2xl overflow-hidden flex justify-center p-4 ring-1 ring-inset ring-slate-200">
                  <img src={croppedImage} alt="Cropped Result" className="max-h-[500px] shadow-2xl rounded-lg" />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}




 const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const rotRad = getRadianAngle(rotation);

  // Calculate bounding box of the rotated image
  const { width: bWidth, height: bHeight } = {
    width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
    height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
  };

  canvas.width = bWidth;
  canvas.height = bHeight;

  // Translate context to center for rotation
  ctx.translate(bWidth / 2, bHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Draw rotated image
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // Set canvas width to final desired crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Paste the cropped image data
  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve(null);
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
}