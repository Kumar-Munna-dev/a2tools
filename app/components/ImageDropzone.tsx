"use client";

import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export default function ImageDropzone({
  onFileSelect,
  accept = "image/*",
  maxSizeMB = 5,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return "Only image files allowed";
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `Max file size ${maxSizeMB}MB`;
    }
    return null;
  };

  const handleFile = (file: File) => {
    const err = validateFile(file);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className="w-full "> {/* full screen width */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      {/* Dropzone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
        className={`w-full cursor-pointer rounded-2xl border-2 border-dashed p-10 text-cente transition-all
          ${isDragging ? "border-blue-500 dark:bg-slate-950" : "border-slate-300 dark:bg-slate-900"}
        `}
      >
        {!preview ? (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-10 h-10 text-blue-500" />
            <p className="font-medium">
              Drag & drop image here or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
            <p className="text-sm text-slate-500">
              PNG, JPG, WebP (max {maxSizeMB}MB)
            </p>
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded-xl shadow"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
              }}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}