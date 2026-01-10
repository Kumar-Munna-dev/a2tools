 
import React, { useState, useRef, useEffect } from "react";

const ImageFilterTool = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  // Filter States
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setImageURL(URL.createObjectURL(file));
  };

  const resetFilters = () => {
    setGrayscale(0);
    setSepia(0);
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setHueRotate(0);
    setInvert(0);
    setOpacity(100);
  };

  const downloadFinal = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d")!;

    ctx.filter = `
      grayscale(${grayscale}%)
      sepia(${sepia}%)
      blur(${blur}px)
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
      hue-rotate(${hueRotate}deg)
      invert(${invert}%)
      opacity(${opacity}%)
    `;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "filtered-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const filterString = `
    grayscale(${grayscale}%)
    sepia(${sepia}%)
    blur(${blur}px)
    brightness(${brightness}%)
    contrast(${contrast}%)
    saturate(${saturation}%)
    hue-rotate(${hueRotate}deg)
    invert(${invert}%)
    opacity(${opacity}%)
  `;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border">
      <h1 className="text-3xl font-bold text-center mb-6">
        Image Filters & Effects – Apply Photo Filters Online
      </h1>

      {/* Upload */}
      {!imageURL && (
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          className="p-3 border rounded-md w-full"
        />
      )}

      {imageURL && (
        <button
          onClick={() => {
            setImageURL(null);
            fileInputRef.current!.value = "";
          }}
          className="mb-3 px-3 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          Choose New Image
        </button>
      )}

      {imageURL && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Controls */}
          <div className="p-4 bg-gray-50 rounded-xl border space-y-4">
            <h2 className="text-xl font-semibold mb-2">Filter Controls</h2>

            {/* Sliders */}
            <div>
              <p>Grayscale ({grayscale}%)</p>
              <input
                type="range"
                min="0"
                max="100"
                value={grayscale}
                onChange={(e) => setGrayscale(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Sepia ({sepia}%)</p>
              <input
                type="range"
                min="0"
                max="100"
                value={sepia}
                onChange={(e) => setSepia(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Blur ({blur}px)</p>
              <input
                type="range"
                min="0"
                max="10"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Brightness ({brightness}%)</p>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Contrast ({contrast}%)</p>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Saturation ({saturation}%)</p>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Hue Rotate ({hueRotate}°)</p>
              <input
                type="range"
                min="0"
                max="360"
                value={hueRotate}
                onChange={(e) => setHueRotate(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Invert ({invert}%)</p>
              <input
                type="range"
                min="0"
                max="100"
                value={invert}
                onChange={(e) => setInvert(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p>Opacity ({opacity}%)</p>
              <input
                type="range"
                min="10"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Reset Filters
            </button>
          </div>

          {/* Preview */}
          <div className="col-span-2">
            <div className="w-full bg-gray-100 p-3 rounded-lg border flex justify-center">
              <img
                ref={imageRef}
                src={imageURL}
                className="max-w-full rounded-lg shadow-md"
                style={{ filter: filterString }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Download */}
      {imageURL && (
        <>
          <canvas ref={canvasRef} className="hidden"></canvas>
          <button
            onClick={downloadFinal}
            className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download Image
          </button>
        </>
      )}
    </div>
  );
};

export default ImageFilterTool;
