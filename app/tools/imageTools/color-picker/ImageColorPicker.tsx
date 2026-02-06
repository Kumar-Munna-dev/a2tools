"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Copy, Pipette, Check, RotateCcw, Palette, X, Crosshair, ImageIcon } from 'lucide-react';
import ImageDropzone from '@/app/components/ImageDropzone';

// Color conversion utilities
const rgbToHex = (r: number, g: number, b: number) => 
  "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
};

const rgbToCmyk = (r: number, g: number, b: number) => {
  let c = 1 - (r / 255), m = 1 - (g / 255), y = 1 - (b / 255), k = Math.min(c, m, y);
  if (k === 1) return '0%, 0%, 0%, 100%';
  c = Math.round(((c - k) / (1 - k)) * 100);
  m = Math.round(((m - k) / (1 - k)) * 100);
  y = Math.round(((y - k) / (1 - k)) * 100);
  k = Math.round(k * 100);
  return `${c}%, ${m}%, ${y}%, ${k}%`;
};

export default function AdvancedColorPicker() {
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState({ r: 79, g: 70, b: 229 }); // Default Indigo
  const [pos, setPos] = useState({ x: 0, y: 0, displayX: 0, displayY: 0 });
  const [isPicking, setIsPicking] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hex = rgbToHex(color.r, color.g, color.b);

  const handleUpload = (file:File) => {
    const files = file;
    if (files) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(files);
    }
  };

  const updateColor = useCallback((clientX: number, clientY: number) => {
    if (!imgRef.current || !canvasRef.current) return;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const rect = img.getBoundingClientRect();

    // Calculate internal coordinates
    const x = Math.max(0, Math.min(((clientX - rect.left) / rect.width) * img.naturalWidth, img.naturalWidth - 1));
    const y = Math.max(0, Math.min(((clientY - rect.top) / rect.height) * img.naturalHeight, img.naturalHeight - 1));

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
    setPos({ x, y, displayX: clientX - rect.left, displayY: clientY - rect.top });
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPicking) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    updateColor(clientX, clientY);
  };

  const saveToHistory = () => {
    if (!history.includes(hex)) setHistory(prev => [hex, ...prev].slice(0, 12));
  };

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-20 min-h-screen dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-indigo-500/30">

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {!image ? (
  <ImageDropzone onFileSelect={handleUpload} />
) : (
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          
          {/* Workspace Area */}
          <div className="xl:col-span-8 space-y-6">
            {!image ? (
              <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[3rem] dark:bg-slate-900/30">
                <ImageIcon size={64} className="text-slate-700 mb-6" />
                <h2 className="text-2xl font-bold text-slate-400">No Image Loaded</h2>
              </div>
            ) : (
              <div 
                className="relative dark:bg-slate-900 rounded-2xl border dark:border-slate-400 overflow-hidden shadow-2xl touch-none"
                onMouseDown={(e) => { setIsPicking(true); updateColor(e.clientX, e.clientY); }}
                onMouseMove={handleMove}
                onMouseUp={() => { setIsPicking(false); saveToHistory(); }}
                onTouchStart={(e) => { setIsPicking(true); updateColor(e.touches[0].clientX, e.touches[0].clientY); }}
                onTouchMove={handleMove}
                onTouchEnd={() => { setIsPicking(false); saveToHistory(); }}
              >
                <img 
                  ref={imgRef} 
                  src={image} 
                  alt="Editor" 
                  className="w-full h-100 select-none pointer-events-none object-contain" 
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Loupe (Magnifier) - Offsets above finger on mobile */}
                {isPicking && (
                  <div 
                    className="absolute pointer-events-none transition-transform duration-75"
                    style={{ 
                      left: pos.displayX, 
                      top: pos.displayY, 
                      transform: 'translate(-50%, -140%)' // Keeps loupe above your finger
                    }}
                  >
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-800">
                      {/* Zoomed Content */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: `${imgRef.current?.width! * 6}px`, // 6x Zoom
                          backgroundPosition: `${-pos.displayX * 6 + (window.innerWidth < 768 ? 48 : 64)}px ${-pos.displayY * 6 + (window.innerWidth < 768 ? 48 : 64)}px`,
                          imageRendering: 'pixelated'
                        }}
                      />
                      {/* Crosshair */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-px bg-white/30" />
                        <div className="h-full w-px bg-white/30" />
                        <div className="w-2 h-2 border-2 border-white rounded-full shadow-black shadow-sm" />
                      </div>
                    </div>
                    {/* Color Preview Badge */}
                    <div className="mt-2 bg-white text-black px-2 py-1 rounded text-[10px] font-black text-center shadow-lg">
                      {hex}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Color Details Panel */}
          <div className="xl:col-span-4 space-y-6">
            <div className="dark:bg-slate-900 border dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
              <div 
                className="w-full h-32 rounded-3xl mb-8 shadow-inner border dark:border-slate-400 flex items-end justify-end p-4 transition-colors"
                style={{ backgroundColor: hex }}
              >
                <div className="dark:bg-slate-100 backdrop-blur-md p-2 rounded-lg"><Crosshair size={20}/></div>
              </div>

              <div className="grid gap-4">
                {[
                  { label: 'HEX', value: hex },
                  { label: 'RGB', value: `${color.r}, ${color.g}, ${color.b}` },
                  { label: 'HSL', value: rgbToHsl(color.r, color.g, color.b) },
                  { label: 'CMYK', value: rgbToCmyk(color.r, color.g, color.b) }
                ].map((field) => (
                  <div key={field.label} className="group relative dark:bg-slate-800/50 border border-slate-400 rounded-2xl p-4 hover:border-indigo-500/50 transition-all">
                    <span className="block text-[10px] font-black dark:text-slate-400 uppercase tracking-widest mb-1">{field.label}</span>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-mono font-bold tracking-tight">{field.value}</span>
                      <button 
                        onClick={() => copy(field.value, field.label)}
                        className={`p-2 rounded-lg transition-all ${copiedField === field.label ? 'text-emerald-400' : 'text-slate-500 hover:bg-slate-700'}`}
                      >
                        {copiedField === field.label ? <Check size={18}/> : <Copy size={18}/>}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Palette History */}
            <div className="dark:bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2 uppercase tracking-tighter text-slate-400">
                  <Palette size={18}/> Palette History
                </h3>
                <button onClick={() => setHistory([])} className="text-slate-600 hover:text-red-400"><RotateCcw size={16}/></button>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {history.map((h, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      const r = parseInt(h.slice(1,3), 16);
                      const g = parseInt(h.slice(3,5), 16);
                      const b = parseInt(h.slice(5,7), 16);
                      setColor({r,g,b});
                    }}
                    className="aspect-square rounded-lg border border-white/5 hover:scale-110 transition-transform shadow-lg"
                    style={{ backgroundColor: h }}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>)}
      </main>
    </div>
  );
}