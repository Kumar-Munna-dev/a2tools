"use client";
import React, { useState, useRef } from "react";

const ImageColorPicker: React.FC = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<string>("#ffffff");
  const [rgb, setRgb] = useState<string>("rgb(255, 255, 255)");
  const [hsl, setHsl] = useState<string>("hsl(0, 0%, 100%)");

  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    const url = URL.createObjectURL(file);
    setImageURL(url);
    setError(null);
  };

  const handleColorPick = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, img.width, img.height);

    const pixel = ctx.getImageData(
      (x / rect.width) * img.width,
      (y / rect.height) * img.height,
      1,
      1
    ).data;

    const [r, g, b] = pixel;

    const hex = rgbToHex(r, g, b);
    const hslValue = rgbToHsl(r, g, b);

    setPickedColor(hex);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    setHsl(`hsl(${hslValue})`);
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

  const rgbToHsl = (r: number, g: number, b: number) => {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else if (max === b) h = (r - g) / d + 4;
      h /= 6;
    }

    return `${Math.round(h * 360)}, ${Math.round(
      s * 100
    )}%, ${Math.round(l * 100)}%`;
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const triggerNewImage = () => {
    setImageURL(null);
    setPickedColor("#ffffff");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Color Picker – Pick and Convert Colors Instantly
      </h1>

      {/* Upload Box — Hide After Image Chosen */}
      {!imageURL && (
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Choose an Image
          </label>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="w-full p-2 text-sm border rounded-md file:bg-blue-100 file:px-4 file:py-2 file:rounded-md"
          />
        </div>
      )}

      {/* New Image Button (only when image is selected) */}
      {imageURL && (
        <button
          onClick={triggerNewImage}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
        >
          Choose New Image
        </button>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Image Preview */}
      {imageURL && (
        <div className="mt-2 flex flex-col items-center">
          <p className="text-gray-600 mb-2 text-sm">
            Click anywhere on the image to pick a color
          </p>

          <div className="relative w-full max-w-lg border rounded-lg p-2 bg-gray-50">
            <img
              ref={imgRef}
              src={imageURL}
              onClick={handleColorPick}
              alt="Image"
              className="w-full rounded-lg object-contain cursor-crosshair"
            />
          </div>

          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}

      {/* Color Output */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Picked Color
        </h2>

        <div
          className="w-full h-20 rounded-lg border mb-4"
          style={{ backgroundColor: pickedColor }}
        ></div>

        {/* Output With Copy Buttons */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              <strong>HEX:</strong> {pickedColor}
            </p>
            <button
              onClick={() => copyToClipboard(pickedColor)}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              <strong>RGB:</strong> {rgb}
            </p>
            <button
              onClick={() => copyToClipboard(rgb)}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              <strong>HSL:</strong> {hsl}
            </p>
            <button
              onClick={() => copyToClipboard(hsl)}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageColorPicker;
