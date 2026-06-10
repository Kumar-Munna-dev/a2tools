"use client";

import React, { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export default function ImageDropzone({
  onFileSelect,
  accept = "image/png,image/jpeg,image/webp,image/heic,image/heif",
  maxSizeMB = 5,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return "Only image files are supported.";
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `Max file size is ${maxSizeMB}MB.`;
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
    setPreview((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });
    onFileSelect(file);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

      <div
        role="button"
        tabIndex={0}
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
        className={`w-full cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-200 ${isDragging ? "border-blue-500 bg-slate-100 dark:border-blue-600 dark:bg-slate-900" : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950"}`}
      >
        {!preview ? (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-10 h-10 text-blue-500" />
            <p className="font-medium text-slate-900 dark:text-slate-100">
              Drag & drop an image or <span className="text-blue-600 underline">browse</span>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              PNG, JPG, WebP, HEIC, HEIF - max {maxSizeMB}MB
            </p>
          </div>
        ) : (
          <div className="relative inline-block">
            <img src={preview} alt="Selected image preview" loading="lazy" decoding="async" className="max-h-40 rounded-3xl object-contain shadow-sm" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreview((previous) => {
                  if (previous) URL.revokeObjectURL(previous);
                  return null;
                });
              }}
              className="absolute -top-3 -right-3 rounded-full bg-red-500 p-2 text-white shadow-lg"
              aria-label="Remove selected image"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-red-600 dark:text-red-300">{error}</p>}
    </div>
  );
}
