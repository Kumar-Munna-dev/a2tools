"use client";

import { useEffect, useMemo, useState } from "react";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE_MB = 10;
const DEFAULT_MAX_WIDTH = 1920;
const DEFAULT_QUALITY = 0.8;

const isHeicFile = (file: File) => {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.(heic|heif)$/i.test(file.name)
  );
};

const convertHeicFile = async (file: File) => {
  const module = await import("heic2any");
  const heic2any = module.default || module;
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.85 });
  const blob = Array.isArray(result) ? result[0] : result;
  return new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
    type: "image/jpeg",
  });
};

export default function useImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [maxWidth, setMaxWidth] = useState(DEFAULT_MAX_WIDTH);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const savingsPercent = useMemo(() => {
    if (!file || !compressedFile) return 0;
    return Math.round(((file.size - compressedFile.size) / file.size) * 100);
  }, [file, compressedFile]);

  const validateFile = (targetFile: File) => {
    const supportedFormats = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    if (!targetFile.type.startsWith("image/")) {
      return "Only image files are supported.";
    }

    if (
      !supportedFormats.includes(targetFile.type) &&
      !/\.(heic|heif)$/i.test(targetFile.name)
    ) {
      return "Please upload JPG, PNG, WebP, HEIC, or HEIF images.";
    }

    if (targetFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Maximum file size is ${MAX_FILE_SIZE_MB}MB.`;
    }

    return null;
  };

  const reset = () => {
    setFile(null);
    setCompressedFile(null);
    setError(null);
    setPreviewUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
    setCompressedUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
  };

  const runCompression = async (targetFile: File) => {
    setLoading(true);
    setError(null);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: maxWidth,
      useWebWorker: true,
      initialQuality: quality,
    };

    try {
      const blob = await imageCompression(targetFile, options);
      const resultFile = new File([blob], targetFile.name, { type: blob.type || targetFile.type });
      setCompressedFile(resultFile);
      setCompressedUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return URL.createObjectURL(resultFile);
      });
    } catch (err) {
      console.error(err);
      setError(
        "Unable to compress this image. Try a JPG, PNG, or WebP file, or lower the file size."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (targetFile: File) => {
    const validationError = validateFile(targetFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const normalizedFile = isHeicFile(targetFile)
      ? await convertHeicFile(targetFile)
      : targetFile;

    setFile(normalizedFile);
    setPreviewUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(normalizedFile);
    });
    await runCompression(normalizedFile);
  };

  const handleApplySettings = async () => {
    if (!file) return;
    await runCompression(file);
  };

  const downloadCompressedImage = () => {
    if (!compressedFile) return;

    const downloadUrl = URL.createObjectURL(compressedFile);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `a2tool-compressed-${compressedFile.name}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [previewUrl, compressedUrl]);

  return {
    file,
    compressedFile,
    previewUrl,
    compressedUrl,
    loading,
    quality,
    maxWidth,
    error,
    savingsPercent,
    formatSize,
    setQuality,
    setMaxWidth,
    handleFileChange,
    handleApplySettings,
    downloadCompressedImage,
    reset,
  };
}
