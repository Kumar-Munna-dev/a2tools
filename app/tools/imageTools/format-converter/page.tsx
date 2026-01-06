"use client";

import React, { useRef, useState } from "react";

type SupportedClientFormat =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/gif"
  | "image/bmp"
  | "image/x-icon";

const CLIENT_FORMATS: { label: string; mime: SupportedClientFormat; ext: string }[] = [
  { label: "JPEG (.jpg/.jpeg)", mime: "image/jpeg", ext: "jpg" },
  { label: "PNG (.png)", mime: "image/png", ext: "png" },
  { label: "WebP (.webp)", mime: "image/webp", ext: "webp" },
  { label: "GIF (.gif) — static export (first frame)", mime: "image/gif", ext: "gif" },
  { label: "BMP (.bmp)", mime: "image/bmp", ext: "bmp" },
  { label: "ICO (.ico)", mime: "image/x-icon", ext: "ico" },
];

const EXT_HINTS = `
Note: The browser-only converter handles common raster formats (jpg, png, webp, gif, bmp, ico).
For vector/complex/rare formats (pdf, svg, eps, ai, psd, heic, raw etc.) you'll need a server-side conversion or 3rd-party service. This UI shows those as "server-only" and will upload to /api/convert if you enable server conversion.
`;

export default function NextImageConverter() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<SupportedClientFormat>(
    "image/jpeg"
  );
  const [quality, setQuality] = useState(0.85);
  const [width, setWidth] = useState<number | "auto">("auto");
  const [height, setHeight] = useState<number | "auto">("auto");
  const [keepAspect, setKeepAspect] = useState(true);
  const [rotate, setRotate] = useState(0); // degrees
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(EXT_HINTS);

  function handleFiles(selected: FileList | null) {
    if (!selected) return;
    const arr = Array.from(selected);
    setFiles((prev) => [...prev, ...arr]);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  async function fileToImageBitmap(file: File): Promise<ImageBitmap> {
    // createImageBitmap does a good job for many formats
    const blob = file;
    // For animated GIF we will still get an bitmap for first frame in most browsers
    return await createImageBitmap(blob as Blob);
  }

  function computeSize(
    imgW: number,
    imgH: number,
    targetW: number | "auto",
    targetH: number | "auto",
    keepAspectRatio: boolean
  ) {
    if (targetW === "auto" && targetH === "auto") return { w: imgW, h: imgH };
    if (keepAspectRatio) {
      if (targetW === "auto") {
        const ratio = targetH as number / imgH;
        return { w: Math.round(imgW * ratio), h: targetH as number };
      }
      if (targetH === "auto") {
        const ratio = (targetW as number) / imgW;
        return { w: targetW as number, h: Math.round(imgH * ratio) };
      }
      // both defined — fit into target box preserving aspect
      const rw = (targetW as number) / imgW;
      const rh = (targetH as number) / imgH;
      const r = Math.min(rw, rh);
      return { w: Math.round(imgW * r), h: Math.round(imgH * r) };
    }
    // non-aspect forced
    return {
      w: targetW === "auto" ? imgW : (targetW as number),
      h: targetH === "auto" ? imgH : (targetH as number),
    };
  }

  async function convertSingle(file: File): Promise<Blob | { server: true; info: any } | null> {
    // Determine whether conversion can be done client-side
    const mime = file.type;
    const clientMimeList = CLIENT_FORMATS.map((f) => f.mime);
    // Browser conversion supported for many raster inputs — attempt for most image/* types
    if (!mime.startsWith("image/") || mime === "image/svg+xml") {
      // treat svg as server-only if vector->raster or raster->vector needed
      return { server: true, info: { reason: "format-not-supported-client" } };
    }

    try {
      const imgBitmap = await fileToImageBitmap(file);
      const sourceW = imgBitmap.width;
      const sourceH = imgBitmap.height;
      const { w, h } = computeSize(sourceW, sourceH, width, height, keepAspect);

      // create canvas
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      // apply transforms
      ctx.save();
      // move to center for rotation
      ctx.translate(w / 2, h / 2);
      if (rotate !== 0) ctx.rotate((rotate * Math.PI) / 180);
      const scaleX = flipH ? -1 : 1;
      const scaleY = flipV ? -1 : 1;
      ctx.scale(scaleX, scaleY);
      // draw image centered
      ctx.drawImage(imgBitmap, -w / 2, -h / 2, w, h);
      ctx.restore();

      // determine output mime
      const outMime = outputFormat;
      // default quality only applicable to lossy formats (jpeg, webp)
      const q = Math.max(0.01, Math.min(1, quality));

      return await new Promise<Blob | null>((res, rej) => {
        // For PNG and BMP and GIF browsers will ignore quality param
        canvas.toBlob(
          (blob) => {
            if (!blob) return rej(new Error("Conversion failed"));
            res(blob);
          },
          outMime as any,
          q
        );
      });
    } catch (err) {
      console.error(err);
      return { server: true, info: { reason: "client-conversion-error", err } };
    }
  }

  async function processAndDownload() {
    if (files.length === 0) return setMessage("No files selected");
    setProcessing(true);
    setMessage("Processing...");
    const results: { file: File; blob?: Blob; server?: boolean; info?: any }[] = [];

    for (const f of files) {
      // attempt client-side conversion
      const res = await convertSingle(f);
      if (res === null) {
        results.push({ file: f, server: true, info: { reason: "null-result" } });
        continue;
      }
      if ((res as any).server) {
        // mark server-needed
        results.push({ file: f, server: true, info: (res as any).info });
        continue;
      }
      results.push({ file: f, blob: res as Blob });
    }

    // For client-converted blobs, create download links
    for (const r of results) {
      if (r.blob) {
        const ext = CLIENT_FORMATS.find((c) => c.mime === outputFormat)?.ext || "bin";
        const name = `${r.file.name.replace(/\.[^.]+$/, "")}.${ext}`;
        const url = URL.createObjectURL(r.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    }

    // If any server work required, notify user with instructions or attempt upload
    const serverNeeded = results.filter((r) => r.server);
    if (serverNeeded.length > 0) {
      setMessage(
        `Some files require server-side conversion (vector/complex formats or conversion failed client-side). ${serverNeeded.length} file(s). Implement /api/convert to handle formats: svg/pdf/eps/ai/psd/heic/raw.`
      );
      // Optionally auto-upload to /api/convert (commented out). You can implement server conversion using sharp, imagemagick, or cloud services.
      // await uploadToServer(serverNeeded.map(s => s.file));
    } else {
      setMessage("Done — downloaded converted files.");
    }

    setProcessing(false);
  }

  async function uploadToServer(list: File[]) {
    // Example server upload helper — requires /api/convert endpoint on your Next.js app.
    const form = new FormData();
    list.forEach((f) => form.append("files", f));
    form.append("format", outputFormat);
    form.append("quality", String(quality));
    form.append("width", String(width));
    form.append("height", String(height));
    const resp = await fetch("/api/convert", { method: "POST", body: form });
    if (!resp.ok) throw new Error("Server conversion failed");
    const blob = await resp.blob();
    // returns a single blob (zip recommended server-side for multiple)
    return blob;
  }

  function clearAll() {
    setFiles([]);
    setMessage(EXT_HINTS);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Next.js Image Converter (client-side)</h1>
      <p className="text-sm text-gray-600 mb-4">{EXT_HINTS}</p>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="border-2 border-dashed border-gray-300 rounded p-4 mb-4"
      >
        <div className="flex items-center gap-4">
          <input
            ref={inputRef}
            type="file"
            onChange={(e) => handleFiles(e.target.files)}
            multiple
            accept="image/*,application/pdf,application/postscript,application/illustrator,application/vnd.adobe.photoshop"
            className="hidden"
            id="fileinput"
          />
          <label htmlFor="fileinput" className="btn bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            Choose files
          </label>
          <button
            onClick={() => inputRef.current?.click()}
            className="px-3 py-2 bg-gray-100 rounded"
          >
            Browse
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-2 bg-red-50 text-red-700 rounded"
          >
            Clear
          </button>
        </div>
        <p className="text-xs mt-2 text-gray-500">Or drag & drop files here (multiple allowed)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <label className="block text-sm">Output format</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as SupportedClientFormat)}
            className="w-full p-2 border rounded"
          >
            {CLIENT_FORMATS.map((f) => (
              <option key={f.mime} value={f.mime}>
                {f.label}
              </option>
            ))}
            <optgroup label="Server-only formats">
              <option value="server/pdf">PDF (server)</option>
              <option value="server/svg">SVG (server/vector)</option>
              <option value="server/eps">EPS (server)</option>
              <option value="server/ai">AI (server)</option>
              <option value="server/psd">PSD (server)</option>
              <option value="server/heic">HEIC/HEIF (server)</option>
              <option value="server/raw">RAW camera files (server)</option>
            </optgroup>
          </select>

          <div>
            <label className="block text-sm">Quality ({Math.round(quality * 100)}%)</label>
            <input
              type="range"
              min={1}
              max={100}
              value={Math.round(quality * 100)}
              onChange={(e) => setQuality(Number(e.target.value) / 100)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">Applies to JPG / WebP (lossy). PNG/BMP/GIF ignore quality.</p>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm">Width (px or auto)</label>
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value === "auto" ? "auto" : Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm">Height (px or auto)</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value === "auto" ? "auto" : Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} />
              <span className="text-sm text-gray-700">Keep aspect ratio</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={flipH} onChange={(e) => setFlipH(e.target.checked)} />
              <span className="text-sm text-gray-700">Flip horizontal</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={flipV} onChange={(e) => setFlipV(e.target.checked)} />
              <span className="text-sm text-gray-700">Flip vertical</span>
            </label>
          </div>

          <div className="mt-2">
            <label className="block text-sm">Rotate (deg)</label>
            <input
              type="number"
              value={rotate}
              onChange={(e) => setRotate(Number(e.target.value))}
              className="w-28 p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="border p-2 rounded h-64 overflow-auto">
            <h3 className="font-medium">Selected files</h3>
            {files.length === 0 && <p className="text-sm text-gray-500">No files yet</p>}
            <ul className="mt-2 space-y-2">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-xs text-gray-500">
                      {f.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(f)}
                          alt={f.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="p-1">{f.name.split(".").pop()}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm">{f.name}</div>
                      <div className="text-xs text-gray-500">{Math.round(f.size / 1024)} KB — {f.type || "n/a"}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFiles((prev) => prev.filter((x) => x !== f))}
                      className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded"
                    >
                      Remove
                    </button>
                    <a
                      href={URL.createObjectURL(f)}
                      download={f.name}
                      className="px-2 py-1 text-xs bg-gray-50 rounded"
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <button
              onClick={processAndDownload}
              disabled={processing || files.length === 0}
              className={`w-full py-2 rounded text-white ${processing ? "bg-gray-400" : "bg-blue-600"}`}
            >
              {processing ? "Processing..." : "Convert & Download"}
            </button>
            <button
              onClick={() => alert("Implement server-side /api/convert to support server-only formats. See README in the component comments.")}
              className="w-full py-2 rounded border"
            >
              Convert server-only formats (server required)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded bg-gray-50 text-sm text-gray-700">
        <strong>Message:</strong>
        <div className="mt-2 whitespace-pre-wrap">{message}</div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <p className="mb-1">Tips:</p>
        <ul className="list-disc pl-4">
          <li>Browser conversions use an HTML canvas — high-quality raster formats are supported client-side.</li>
          <li>
            For PSD / AI / EPS / PDF / HEIC / RAW you will need server-side tools like <code>sharp</code>, <code>imagemagick</code>, <code>libvips</code>,
            or cloud conversion APIs. Implement a Next.js API route (/api/convert) to accept files and return a converted ZIP or single file.
          </li>
          <li>Animated GIFs will be exported as static images (first frame). Use dedicated libraries for full animated exports.
          </li>
          <li>ICO generation may not be perfect from canvas — consider using a server-side ico generator for multi-size icons.</li>
        </ul>
      </div>
    </div>
  );
}
