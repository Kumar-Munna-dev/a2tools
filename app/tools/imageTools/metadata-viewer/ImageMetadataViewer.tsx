"use client";

import React, { useState } from "react";
import exifr from "exifr";
import {
  Upload,
  Camera,
  Calendar,
  Cpu,
  Maximize,
  MapPin,
  FileText,
  Trash2,
} from "lucide-react";
import ImageDropzone from "@/app/components/ImageDropzone";

interface FileInfo {
  name: string;
  size: string;
  type: string;
  lastModified: string;
}

export default function MetadataInspector() {
  const [image, setImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [exif, setExif] = useState<any>(null);
  const [gps, setGps] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const formatSize = (bytes: number) =>
    (bytes / 1024 / 1024).toFixed(2) + " MB";

  const handleUpload = async (files: File) => {
    const file = files;
    if (!file) return;

    setLoading(true);
    setImage(URL.createObjectURL(file));

    setFileInfo({
      name: file.name,
      size: formatSize(file.size),
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString(),
    });

    try {
      const exifData = await exifr.parse(file);
      const gpsData = await exifr.gps(file);
      setExif(exifData);
      setGps(gpsData);
    } catch (err) {
      console.error("Metadata extraction failed", err);
      setExif(null);
      setGps(null);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setImage(null);
    setFileInfo(null);
    setExif(null);
    setGps(null);
  };

  const megapixels =
    exif?.ExifImageWidth && exif?.ExifImageHeight
      ? (
        (exif.ExifImageWidth * exif.ExifImageHeight) /
        1_000_000
      ).toFixed(1) + " MP"
      : "N/A";

  return (
    <div className=" md:min-h-screen w-full dark:bg-slate-950 px-4 py-10">
      {!image ? (
        <div className="flex items-center justify-center">
          <ImageDropzone onFileSelect={(file) => { handleUpload(file) }} />
        </div>
      ) : (
        <div className=" flex w-full flex-col md:flex-row items-center justify-center">
          {/* Preview */}
          <div className="space-y-4 flex items-center justify-center m-20">
            <img
              src={image}
              alt="Preview"
              className="rounded-3xl shadow md:h-min h-[300px]
          max-w-full
          max-h-full
          object-contain
          transition-all
          duration-300
          "
            />

          </div>

          {/* Metadata */}
          <div className="w-100 space-y-6">
            <button
              onClick={clearAll}
              className="flex w-full items-center justify-center gap-2 rounded-2xl dark:bg-slate-800 py-3 text-sm font-bold text-red-600 hover:bg-red-100 border-1"
            >
              <Trash2 size={16} /> Clear Image
            </button>
            <MetaCard title="File Info" icon={<FileText size={16} />}>
              <Meta label="Name" value={fileInfo?.name} />
              <Meta label="Size" value={fileInfo?.size} />
              <Meta label="Type" value={fileInfo?.type} />
              <Meta label="Modified" value={fileInfo?.lastModified} />
            </MetaCard>

            <MetaCard title="Camera" icon={<Camera size={16} />}>
              <Meta label="Device" value={`${exif?.Make || ""} ${exif?.Model || ""}`} />
              <Meta label="ISO" value={exif?.ISO} />
              <Meta label="Aperture" value={exif?.FNumber ? `f/${exif.FNumber}` : "N/A"} />
              <Meta
                label="Shutter"
                value={
                  exif?.ExposureTime
                    ? `1/${Math.round(1 / exif.ExposureTime)}s`
                    : "N/A"
                }
              />
              <Meta
                label="Captured"
                value={
                  exif?.DateTimeOriginal
                    ? new Date(exif.DateTimeOriginal).toLocaleString()
                    : "N/A"
                }
              />
            </MetaCard>

            <MetaCard title="Image" icon={<Maximize size={16} />}>
              <Meta
                label="Resolution"
                value={
                  exif?.ExifImageWidth
                    ? `${exif.ExifImageWidth} × ${exif.ExifImageHeight}`
                    : "N/A"
                }
              />
              <Meta label="Megapixels" value={megapixels} />
            </MetaCard>

            <MetaCard title="Location" icon={<MapPin size={16} />}>
              {gps ? (
                <>
                  <Meta label="Latitude" value={gps.latitude.toFixed(6)} />
                  <Meta label="Longitude" value={gps.longitude.toFixed(6)} />
                </>
              ) : (
                <p className="text-sm text-slate-400">No GPS data</p>
              )}
            </MetaCard>
          </div>
        </div>
      )}

      {loading && (
        <p className="mt-6 text-center text-sm font-bold text-indigo-600">
          Extracting metadata…
        </p>
      )}
    </div>
  );
}

/* ---------- UI Helpers ---------- */

function MetaCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border dark:bg-slatw-800 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600">
        {icon} {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value?: any }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="dark:text-slate-400">{label}</span>
      <span className="font-bold dark:text-slate-900">
        {value ?? "N/A"}
      </span>
    </div>
  );
}
