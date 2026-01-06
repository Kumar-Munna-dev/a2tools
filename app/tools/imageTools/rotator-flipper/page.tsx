'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type CropShape = 'rectangle' | 'circle' | 'triangle';

export default function ImageResizerCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cropShape, setCropShape] = useState<CropShape>('rectangle');
  const [cropPos, setCropPos] = useState({ x: 100, y: 100 });
  const [cropSize, setCropSize] = useState({ w: 200, h: 200 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggingCrop, setDraggingCrop] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave() {
    setIsDragging(false);
  }

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    if ('touches' in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    } else {
      return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
    }
  };

  const isInsideCrop = (x: number, y: number) => {
    if (cropShape === 'circle') {
      const dx = x - (cropPos.x + cropSize.w / 2);
      const dy = y - (cropPos.y + cropSize.h / 2);
      const r = cropSize.w / 2;
      return dx * dx + dy * dy <= r * r;
    } else if (cropShape === 'triangle') {
      // simple bounding box for triangle
      return x >= cropPos.x && x <= cropPos.x + cropSize.w && y >= cropPos.y && y <= cropPos.y + cropSize.h;
    } else {
      return x >= cropPos.x && x <= cropPos.x + cropSize.w && y >= cropPos.y && y <= cropPos.y + cropSize.h;
    }
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { x, y } = getPointerPos(e);

    if (x >= cropPos.x + cropSize.w - 10 && x <= cropPos.x + cropSize.w + 10 && y >= cropPos.y + cropSize.h - 10 && y <= cropPos.y + cropSize.h + 10) {
      setResizing(true);
      setResizeCorner('br');
      return;
    }

    if (isInsideCrop(x, y)) {
      setDraggingCrop(true);
      setDragOffset({ x: x - cropPos.x, y: y - cropPos.y });
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { x, y } = getPointerPos(e);

    if (draggingCrop) {
      setCropPos({ x: x - dragOffset.x, y: y - dragOffset.y });
    }

    if (resizing && resizeCorner === 'br') {
      setCropSize({ w: Math.max(20, x - cropPos.x), h: Math.max(20, y - cropPos.y) });
    }
  };

  const handlePointerUp = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDraggingCrop(false);
    setResizing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      const parentWidth = canvas.parentElement?.clientWidth || 800;
      const parentHeight = canvas.parentElement?.clientHeight || 600;
      const scale = Math.min(parentWidth / img.width, parentHeight / img.height, 1);
      canvas.width = img.width * scale * window.devicePixelRatio;
      canvas.height = img.height * scale * window.devicePixelRatio;
      canvas.style.width = `${img.width * scale}px`;
      canvas.style.height = `${img.height * scale}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate((img.width * scale) / 2, (img.height * scale) / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255,0,0,0.2)';

      switch(cropShape){
        case 'rectangle': ctx.fillRect(cropPos.x, cropPos.y, cropSize.w, cropSize.h); ctx.strokeRect(cropPos.x, cropPos.y, cropSize.w, cropSize.h); break;
        case 'circle': ctx.beginPath(); ctx.arc(cropPos.x + cropSize.w/2, cropPos.y + cropSize.h/2, cropSize.w/2, 0, Math.PI*2); ctx.fill(); ctx.stroke(); break;
        case 'triangle': ctx.beginPath(); ctx.moveTo(cropPos.x + cropSize.w/2, cropPos.y); ctx.lineTo(cropPos.x, cropPos.y + cropSize.h); ctx.lineTo(cropPos.x + cropSize.w, cropPos.y + cropSize.h); ctx.closePath(); ctx.fill(); ctx.stroke(); break;
      }
      ctx.fillStyle = 'blue';
      ctx.fillRect(cropPos.x + cropSize.w - 5, cropPos.y + cropSize.h - 5, 10, 10);
      ctx.restore();
    };
  }, [imageSrc, zoom, rotation, cropPos, cropSize, cropShape]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;
    tempCanvas.width = cropSize.w;
    tempCanvas.height = cropSize.h;

    if (cropShape === 'rectangle') {
      ctx.drawImage(canvas, cropPos.x, cropPos.y, cropSize.w, cropSize.h, 0, 0, cropSize.w, cropSize.h);
    } else {
      ctx.save();
      ctx.beginPath();
      if(cropShape==='circle') ctx.arc(cropSize.w/2, cropSize.h/2, cropSize.w/2, 0, Math.PI*2);
      else if(cropShape==='triangle'){ctx.moveTo(cropSize.w/2,0);ctx.lineTo(0,cropSize.h);ctx.lineTo(cropSize.w,cropSize.h);ctx.closePath();}
      ctx.clip();
      ctx.drawImage(canvas, cropPos.x, cropPos.y, cropSize.w, cropSize.h, 0,0,cropSize.w,cropSize.h);
      ctx.restore();
    }

    tempCanvas.toBlob((blob)=>{if(!blob) return; const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'cropped-image.png'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);},'image/png');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Image Resizer & Cropper with Shapes & Drag/Resize</h2>
        <div onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave} className={`border-2 rounded-lg p-6 mb-6 flex items-center justify-center flex-col gap-3 ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'}`}> 
          <p className="text-sm text-gray-600">Click to upload or drag & drop an image</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
          <button onClick={() => inputRef.current?.click()} className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Choose image</button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gray-50 border rounded-lg p-4 flex items-center justify-center">
            { !imageSrc ? <div className="text-gray-400">No image loaded</div> : 
              <canvas ref={canvasRef} className="rounded w-full h-auto" 
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              />
            }
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Zoom: {zoom.toFixed(2)}x</label>
              <input type="range" min={0.1} max={4} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Rotation: {rotation}°</label>
              <input type="range" min={0} max={360} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Crop Shape</label>
              <select value={cropShape} onChange={(e) => setCropShape(e.target.value as CropShape)} className="w-full border rounded px-3 py-2">
                <option value="rectangle">Rectangle</option>
                <option value="circle">Circle</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setZoom(1); setRotation(0); setCropPos({x:100,y:100}); setCropSize({w:200,h:200}); }} className="flex-1 px-3 py-2 rounded border">Reset</button>
              <button onClick={handleDownload} className="flex-1 px-3 py-2 rounded bg-green-600 text-white">Download</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
