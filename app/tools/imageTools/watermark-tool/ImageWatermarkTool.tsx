"use client";
import React, { useRef, useState, useEffect } from "react";

const ImageWatermarkTool = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState("Watermark");
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);

  const [opacity, setOpacity] = useState(0.6);
  const [size, setSize] = useState(150);
  const [rotation, setRotation] = useState(0);
  const [textSize, setTextSize] = useState(40);
  const [textColor, setTextColor] = useState("#ffffff");

  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const watermarkRef = useRef<HTMLDivElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setImageURL(URL.createObjectURL(file));
  };

  const handleLogoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setWatermarkImage(URL.createObjectURL(file));
  };

  /** ─➤ DRAG HANDLERS */
  const startDrag = (e: any) => {
    setDragging(true);
    const rect = watermarkRef.current!.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const onDrag = (e: any) => {
    if (!dragging) return;
    const container = e.target.closest(".image-container")?.getBoundingClientRect();
    if (!container) return;

    setPos({
      x: e.clientX - container.left - offset.x,
      y: e.clientY - container.top - offset.y,
    });
  };

  const stopDrag = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  });

  /** ─➤ EXPORT FINAL IMAGE */
  const downloadFinalImage = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const img = imageRef.current;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = opacity;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;

    const finalX = pos.x * scaleX;
    const finalY = pos.y * scaleY;

    ctx.save();
    ctx.translate(finalX, finalY);
    ctx.rotate((rotation * Math.PI) / 180);

    if (watermarkImage) {
      const logo = new Image();
      logo.src = watermarkImage;
      logo.onload = () => {
        ctx.drawImage(logo, 0, 0, size, size * (logo.height / logo.width));
        ctx.restore();

        const link = document.createElement("a");
        link.download = "watermarked.png";
        link.href = canvas.toDataURL();
        link.click();
      };
    } else {
      ctx.font = `${textSize}px sans-serif`;
      ctx.fillStyle = textColor;
      ctx.fillText(watermarkText, 0, 0);

      ctx.restore();

      const link = document.createElement("a");
      link.download = "watermarked.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Watermark Tool – Add Text or Image Watermark Online</h1>

      {/* Upload Image */}
      {!imageURL && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="p-3 border w-full rounded-md"
        />
      )}

      {/* Change Image */}
      {imageURL && (
        <button
          onClick={() => {
            setImageURL(null);
            fileInputRef.current!.value = "";
          }}
          className="mb-4 px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
        >
          Choose New Image
        </button>
      )}

      {imageURL && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Controls */}
          <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
            <button
              onClick={() => logoInputRef.current?.click()}
              className={`w-full py-2 rounded-md ${
                watermarkImage ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Upload Logo
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={logoInputRef}
              onChange={handleLogoUpload}
            />

            {!watermarkImage && (
              <>
                <div>
                  <label className="font-medium">Watermark Text</label>
                  <input
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="font-medium">Text Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-medium">Text Size</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            )}

            <div>
              <label className="font-medium">Opacity</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium">Size</label>
              <input
                type="range"
                min="50"
                max="400"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="font-medium">Rotation</label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Image Preview + Draggable Watermark */}
          <div className="col-span-2">
            <div className="relative image-container inline-block">
              <img
                src={imageURL}
                ref={imageRef}
                className="w-full rounded-lg border"
              />

              {/* Draggable watermark */}
              <div
                ref={watermarkRef}
                onMouseDown={startDrag}
                style={{
                  position: "absolute",
                  top: pos.y,
                  left: pos.x,
                  opacity: opacity,
                  transform: `rotate(${rotation}deg)`,
                  cursor: "grab",
                }}
              >
                {watermarkImage ? (
                  <img
                    src={watermarkImage}
                    style={{
                      width: size,
                    }}
                    className="pointer-events-none select-none"
                  />
                ) : (
                  <span
                    style={{
                      fontSize: textSize,
                      color: textColor,
                      fontWeight: "600",
                    }}
                    className="pointer-events-none select-none"
                  >
                    {watermarkText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download */}
      {imageURL && (
        <>
          <canvas ref={canvasRef} className="hidden"></canvas>

          <button
            onClick={downloadFinalImage}
            className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download Final Image
          </button>
        </>
      )}
    </div>
  );
};

export default ImageWatermarkTool;
