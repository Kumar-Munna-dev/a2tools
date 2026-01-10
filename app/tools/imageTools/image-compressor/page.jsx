 
import React, { useState, useRef } from "react";
import Image from "next/image";
import { max } from "mathjs";
import RelatedTools from "@/app/components/RelatedTools";
const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [resizeWidth, setResizeWidth] = useState(null);
  const [resizeHeight, setResizeHeight] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      setSelectedFile(file);
      setOriginalSize(file.size);
      setError(null);
      setCompressedImage(null);
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.src = URL.createObjectURL(selectedFile);
      await new Promise((resolve) => (img.onload = resolve));

      let width = img.width;
      let height = img.height;

      // Apply resizing if specified
      if (resizeWidth && resizeHeight) {
        width = resizeWidth;
        height = resizeHeight;
      } else if (resizeWidth) {
        height = (resizeWidth / img.width) * img.height;
        width = resizeWidth;
      } else if (resizeHeight) {
        width = (resizeHeight / img.height) * img.width;
        height = resizeHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL(
        `image/${outputFormat}`,
        compressionQuality
      );

      // Convert data URL to blob to get size
      const response = await fetch(compressedDataUrl);
      const blob = await response.blob();
      setCompressedSize(blob.size);

      setCompressedImage(compressedDataUrl);
      URL.revokeObjectURL(img.src);
    } catch (err) {
      setError("Error compressing image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressedImage = () => {
    if (!compressedImage) return;
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed-image.${outputFormat}`;
    link.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col w-screen items-center justify-center bg-white rounded-lg shadow-md mt-20 sm:flex-row sm:items-start">

      <div className="flex flex-col m-5 order-1 w-screen bg-white rounded-lg shadow-md p-10 sm:order-2">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Image Compressor – Compress Images Without Losing Quality
        </h1>

        {/* File Input */}
        <div className="mb-4 border-blue-600 rounded-2xl border-2 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {/* Preview */}
        {selectedFile && (
          <div className="flex flex-col items-center justify-center max-w-2xl mb-4">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="SelectedFile Preview"
              className="rounded-md border"
              width={300}
              height={300}
            />
            <div>{selectedFile.name}</div>
          </div>
        )}

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compression Quality
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={compressionQuality}
              onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600">
              {Math.round(compressionQuality * 100)}%
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Output Format
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
        </div>

        {/* Resize Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resize Width (px)
            </label>
            <input
              type="number"
              value={resizeWidth || ""}
              onChange={(e) =>
                setResizeWidth(e.target.value ? parseInt(e.target.value) : null)
              }
              placeholder="Optional"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resize Height (px)
            </label>
            <input
              type="number"
              value={resizeHeight || ''}
              onChange={(e) =>
                setResizeHeight(e.target.value ? parseInt(e.target.value) : null)
              }
              placeholder="Optional"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Compress Button */}
        <button
          onClick={compressImage}
          disabled={!selectedFile || isProcessing}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${!selectedFile || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isProcessing ? "Compressing..." : "Compress Image"}
        </button>

        {/* Results */}
        {compressedImage && (
          <div className="mt-6  ">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Compression Result
            </h2>
            <div className="flex flex-col md:flex-col gap-4 items-center justify-center">
              <div className="flex-1 order-2 sm:order-2">
                <p className="text-sm text-gray-600">
                  Original Size: {formatFileSize(originalSize)}
                </p>
                <p className="text-sm text-gray-600">
                  Compressed Size: {formatFileSize(compressedSize)}
                </p>
                <p className="text-sm text-gray-600">
                  Size Reduction:{" "}
                  {originalSize > 0
                    ? Math.round(
                      ((originalSize - compressedSize) / originalSize) * 100
                    )
                    : 0}
                  %
                </p>
              </div>
              <div className="flex-1 order-1 items-center justify-center md:order-1">
                <Image
                  src={compressedImage}
                  alt="Compressed Image"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <button
                  onClick={downloadCompressedImage}
                  className="mt-2 w-75 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Download Compressed Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex order-2 justify-center sm:order-1">  {/* Here Moblie card */}
        <div className="w-max order-2 flex p-5 items-center justify-center sm:order-1" >
          <RelatedTools currentTool="/tools/textTools/word-counter" />
        </div></div>
    </div>
  );
};

export default ImageCompressor;
