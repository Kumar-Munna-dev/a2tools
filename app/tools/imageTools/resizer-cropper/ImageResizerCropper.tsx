"use client";

import React, { useState, useCallback, useEffect } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Upload,
  Scissors,
  Download,
  RefreshCw,
  ZoomIn,
  X,
  RotateCw,
  Crop,
  ArrowDownRight,
  Square,
} from "lucide-react";
import ImageDropzone from "@/app/components/ImageDropzone";

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ASPECT_OPTIONS = [
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "Free", value: 0 },
];

export default function ImageResizerCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState("cropped-image");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Upload an image to crop, rotate, and download with ease."
  );

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
    setImageName(file.name.replace(/\.[^/.]+$/, ""));
    setCroppedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(1);
    setStatusMessage("Drag the crop window, adjust zoom, and hit generate when ready.");
  };

  const resetView = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(1);
    setStatusMessage("View reset. Adjust the crop again or generate your image.");
    setCroppedImage(null);
  };

  const clearImage = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setStatusMessage("Upload a new image to crop and download.");
  };

  const showCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) {
      setStatusMessage("Please upload an image and adjust the crop area before generating.");
      return;
    }

    setIsCropping(true);
    setStatusMessage("Processing your image... this may take a moment.");

    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      if (cropped) {
        setCroppedImage(cropped);
        setStatusMessage("Crop ready. Download your optimized image below.");
      } else {
        setStatusMessage("Could not generate the crop. Try a different area or image.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An unexpected error occurred while cropping. Please retry.");
    } finally {
      setIsCropping(false);
    }
  };

  useEffect(() => {
    return () => {
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage);
      }
    };
  }, [croppedImage]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 py-10">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <Square className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">Image Resizer & Cropper</span>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Crop, rotate, and export sharp images instantly</h1>
                <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                  Use this tool to adjust image framing, preserve quality, and download the finished result. Supports modern file types and mobile-friendly editing.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Fast edits</p>
                  <p className="mt-2 text-base">Crop, zoom, and rotate without leaving the browser.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Preview first</p>
                  <p className="mt-2 text-base">See the exact result before you download your image.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-indigo-600 p-6 text-white shadow-2xl">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em]">
                <ArrowDownRight className="h-5 w-5" />
                <span>How it works</span>
              </div>
              <ul className="mt-6 space-y-4 text-sm leading-6">
                <li>1. Upload an image from your device.</li>
                <li>2. Drag to crop, zoom, or rotate the picture.</li>
                <li>3. Generate the final result and download it instantly.</li>
              </ul>
            </div>
          </div>
        </section>

        {!imageSrc ? (
          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
              <h2 className="text-xl font-semibold">Upload your image</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Supported formats: PNG, JPG, WebP, HEIC, HEIF. Max file size 5MB.
              </p>
              <div className="mt-6">
                <ImageDropzone onFileSelect={handleFileChange} />
              </div>
            </div>
            <div className="rounded-[2rem] bg-slate-50 p-6 shadow-inner shadow-slate-200/50 dark:bg-slate-900/80 dark:shadow-slate-800/50">
              <h3 className="text-lg font-semibold">Ready for mobile and desktop</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                This editor is responsive, keyboard accessible, and designed to feel smooth on phones, tablets, and large screens.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-2"><span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500" /> Instant preview updates</p>
                <p className="flex items-center gap-2"><span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500" /> Touch-friendly slider controls</p>
                <p className="flex items-center gap-2"><span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500" /> Safe downloads with a single tap</p>
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 bg-slate-50 px-6 py-4 dark:border-slate-700/70 dark:bg-slate-950">
                  <div>
                    <h2 className="text-xl font-semibold">Crop preview</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Use the controls below to refine your frame.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={clearImage}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <X size={16} /> Remove image
                    </button>
                    <button
                      onClick={resetView}
                      className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                      <RefreshCw size={16} /> Reset controls
                    </button>
                  </div>
                </div>
                <div className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-800">
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
                    objectFit="horizontal-cover"
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
                <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Status</p>
                  <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-200">{statusMessage}</p>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-700/80 dark:bg-slate-950">
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      <span className="inline-flex items-center gap-2 uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400"><Crop size={16} /> Aspect ratio</span>
                      <span className="text-slate-500 dark:text-slate-400">{aspect === 0 ? "Free" : ASPECT_OPTIONS.find((option) => option.value === aspect)?.label}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ASPECT_OPTIONS.map(({ label, value }) => (
                        <button
                          key={label}
                          onClick={() => setAspect(value === 0 ? 0 : value)}
                          className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${aspect === value
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-700/80 dark:bg-slate-950">
                    <div className="flex items-center justify-between gap-3 mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      <span className="inline-flex items-center gap-2 uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400"><ZoomIn size={16} /> Zoom</span>
                      <span>{zoom.toFixed(1)}×</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                      aria-label="Zoom level"
                    />
                  </div>
                  <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-700/80 dark:bg-slate-950">
                    <div className="flex items-center justify-between gap-3 mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      <span className="inline-flex items-center gap-2 uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400"><RotateCw size={16} /> Rotation</span>
                      <span>{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      step={1}
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                      aria-label="Rotation angle"
                    />
                  </div>
                </div>
                <button
                  onClick={showCroppedImage}
                  disabled={isCropping}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCropping ? <RefreshCw className="animate-spin" /> : <Scissors size={18} />}
                  {isCropping ? "Creating image..." : "Generate final image"}
                </button>
              </div>
            </div>

            {croppedImage && (
              <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200/70 dark:bg-slate-900 dark:ring-slate-700/50">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">Download ready</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      Your cropped image is ready to save. The download file will keep your edit in high quality.
                    </p>
                  </div>
                  <a
                    href={croppedImage}
                    download={`${imageName}-cropped.png`}
                    className="inline-flex items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                  >
                    <Download size={18} /> Download image
                  </a>
                </div>
                <div className="mt-6 overflow-hidden rounded-[1.75rem] bg-slate-100 p-4 dark:bg-slate-950">
                  <img
                    src={croppedImage}
                    alt="Cropped and ready image"
                    className="mx-auto max-h-[520px] w-full rounded-3xl object-contain shadow-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CroppedArea,
  rotation = 0
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const rotRad = getRadianAngle(rotation);

  const bBoxWidth = Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height);
  const bBoxHeight = Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return resolve(null);
        resolve(URL.createObjectURL(blob));
      },
      "image/png",
      0.95
    );
  });
}
