 
import React, { useRef, useState } from "react";

const ImageMetadataViewer = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [cleanImage, setCleanImage] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageURL(URL.createObjectURL(file));

    const arrayBuffer = await file.arrayBuffer();
    const dataView = new DataView(arrayBuffer);

    const exif = extractEXIF(dataView);
    setMetadata(exif);

    removeEXIF(file);
  };

  // REMOVE EXIF BY REDRAWING
  const removeEXIF = (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const cleaned = canvas.toDataURL("image/jpeg", 1.0);
      setCleanImage(cleaned);
    };
  };

  // ----- EXIF PARSER -----
  const extractEXIF = (dataView: DataView) => {
    let offset = 2;
    while (offset < dataView.byteLength) {
      if (dataView.getUint16(offset) === 0x4578) {
        return {
          note: "Basic EXIF detection only. (Advanced version available)",
        };
      }
      offset++;
    }
    return null;
  };

  const downloadCleanImage = () => {
    if (!cleanImage) return;
    const link = document.createElement("a");
    link.href = cleanImage;
    link.download = "cleaned-image.jpg";
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border">
      <h1 className="text-3xl font-bold text-center mb-6">
        Metadata Viewer – View Image & File Metadata Online
      </h1>

      {/* Upload */}
      {!imageURL && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileRef}
          className="p-3 border rounded-md w-full"
        />
      )}

      {/* Change image */}
      {imageURL && (
        <button
          onClick={() => {
            fileRef.current!.value = "";
            setImageURL(null);
            setMetadata(null);
            setCleanImage(null);
          }}
          className="mb-5 px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
        >
          Choose New Image
        </button>
      )}

      {/* Layout */}
      {imageURL && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Preview */}
          <div className="bg-gray-100 rounded-lg border p-3 flex justify-center">
            <img
              ref={imgRef}
              src={imageURL}
              className="max-w-full rounded-md shadow"
              alt="uploaded"
            />
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-3">EXIF Metadata</h2>

            {!metadata && (
              <p className="text-gray-500">No EXIF metadata found.</p>
            )}

            {metadata && (
              <div className="text-sm text-gray-800 space-y-2">
                <div className="border-b pb-2">
                  {metadata.note || "EXIF parsed successfully"}
                </div>
              </div>
            )}

            {cleanImage && (
              <button
                onClick={downloadCleanImage}
                className="w-full mt-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Download Without EXIF
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hidden Canvas FIXED HERE */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default ImageMetadataViewer;
