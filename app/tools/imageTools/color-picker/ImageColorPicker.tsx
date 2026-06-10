"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Copy, Pipette, Check, RotateCcw, Palette, Crosshair, ImageIcon } from 'lucide-react';
import ImageDropzone from '@/app/components/ImageDropzone';
import InfoDropdown from '@/app/components/InfoDropdown';
import RelatedTools from '@/app/components/RelatedTools';

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
  const [imageReady, setImageReady] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const imageUrlRef = useRef<string | null>(null);
  const imageLoadedRef = useRef(false);

  const hex = rgbToHex(color.r, color.g, color.b);

  const handleUpload = (file: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (imageUrlRef.current) {
      try { URL.revokeObjectURL(imageUrlRef.current); } catch {}
    }
    imageUrlRef.current = url;
    setImage(url);
    imageLoadedRef.current = false;
    setImageReady(false);
  };

  const updateColor = useCallback((clientX: number, clientY: number) => {
    if (!imgRef.current || !canvasRef.current || !imageLoadedRef.current) return;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const rect = img.getBoundingClientRect();

    const x = Math.floor(Math.max(0, Math.min(((clientX - rect.left) / rect.width) * img.naturalWidth, img.naturalWidth - 1)));
    const y = Math.floor(Math.max(0, Math.min(((clientY - rect.top) / rect.height) * img.naturalHeight, img.naturalHeight - 1)));

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
    setPos({ x, y, displayX: clientX - rect.left, displayY: clientY - rect.top });
  }, []);

  const handleImageLoad = useCallback(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    try {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      imageLoadedRef.current = true;
      setImageReady(true);
      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPos({ x: Math.floor(img.naturalWidth / 2), y: Math.floor(img.naturalHeight / 2), displayX: rect.width / 2, displayY: rect.height / 2 });
      requestAnimationFrame(() => updateColor(centerX, centerY));
    } catch (err) {
      imageLoadedRef.current = false;
      setImageReady(false);
    }
  }, [updateColor]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPicking) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateColor(clientX, clientY));
  };

  const saveToHistory = () => {
    if (!history.includes(hex)) setHistory(prev => [hex, ...prev].slice(0, 12));
  };

  const copy = async (text: string, field: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) {
        try { URL.revokeObjectURL(imageUrlRef.current); } catch {}
        imageUrlRef.current = null;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-sm inline-flex">
              <Pipette size={24} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Image Color Picker</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl text-sm md:text-base">
                Upload any image, pick colors by clicking, and instantly convert between HEX, RGB, HSL, and CMYK formats. Completely private and browser-based.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {!image ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-200 dark:border-indigo-800 rounded-3xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Started</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                  Upload an image to begin picking colors. Click or drag to select a file. Supported: <span className="font-semibold">JPG, PNG, WebP, AVIF, GIF (max 10MB)</span>
                </p>
                <ImageDropzone onFileSelect={handleUpload} maxSizeMB={10} />
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                    <div className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">1. Upload</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Select an image file</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                    <div className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">2. Pick</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Click colors to sample</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                    <div className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">3. Convert</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Copy formats instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-sm">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">Picker Canvas</h2>
                <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Click or tap on the image to pick a color. Use Arrow keys to fine-tune your selection. Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-300 dark:border-slate-600 text-xs">Enter</kbd> to save to history.
                </p>
              </div>
              <button
                onClick={() => { setImage(null); setHistory([]); }}
                className="w-full md:w-auto px-5 py-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all flex-shrink-0"
              >
                Upload New Image
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Canvas */}
              <div className="xl:col-span-8">
                <div 
                  className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-crosshair focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  tabIndex={0}
                  aria-label="Image color picker canvas"
                  style={{ touchAction: 'none' }}
                  onKeyDown={(e) => {
                    if (!imgRef.current) return;
                    const step = e.shiftKey ? 10 : 1;
                    const rect = imgRef.current.getBoundingClientRect();
                    let nx = pos.displayX, ny = pos.displayY;
                    if (e.key === 'ArrowLeft') nx = Math.max(0, nx - step);
                    if (e.key === 'ArrowRight') nx = Math.min(rect.width, nx + step);
                    if (e.key === 'ArrowUp') ny = Math.max(0, ny - step);
                    if (e.key === 'ArrowDown') ny = Math.min(rect.height, ny + step);
                    if (nx !== pos.displayX || ny !== pos.displayY) {
                      updateColor(rect.left + nx, rect.top + ny);
                      e.preventDefault();
                    }
                    if (e.key === 'Enter' || e.key === ' ') {
                      saveToHistory();
                      e.preventDefault();
                    }
                  }}
                  onMouseDown={(e) => { setIsPicking(true); updateColor(e.clientX, e.clientY); }}
                  onMouseMove={handleMove}
                  onMouseUp={() => { setIsPicking(false); saveToHistory(); }}
                  onTouchStart={(e) => { setIsPicking(true); updateColor(e.touches[0].clientX, e.touches[0].clientY); }}
                  onTouchMove={handleMove}
                  onTouchEnd={() => { setIsPicking(false); saveToHistory(); }}
                >
                  <img 
                    ref={imgRef} 
                    src={image || undefined} 
                    alt="Image color picker" 
                    onLoad={handleImageLoad}
                    className="w-full max-h-[65vh] select-none pointer-events-none object-contain" 
                  />
                  <canvas ref={canvasRef} className="hidden" aria-hidden />

                  {imageReady && (
                    <div
                      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
                      style={{ left: pos.displayX, top: pos.displayY }}
                    >
                      <div className="relative flex h-6 w-6 items-center justify-center">
                        <span className="absolute inset-0 rounded-full border-2 border-white shadow-lg bg-black/25" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
                      </div>
                    </div>
                  )}

                  {isPicking && (
                    <div 
                      className="absolute pointer-events-none transition-transform duration-75"
                      style={{ 
                        left: pos.displayX, 
                        top: pos.displayY, 
                        transform: 'translate(-50%, -130%)'
                      }}
                    >
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-[3px] border-white shadow-2xl overflow-hidden bg-slate-800 ring-1 ring-black/10">
                        <div 
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `${imgRef.current?.width! * 6}px`,
                            backgroundPosition: `${-pos.displayX * 6 + (window.innerWidth < 768 ? 48 : 64)}px ${-pos.displayY * 6 + (window.innerWidth < 768 ? 48 : 64)}px`,
                            imageRendering: 'pixelated'
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-px bg-white/30" />
                          <div className="h-full w-px bg-white/30" />
                          <div className="w-2 h-2 border-2 border-white rounded-full shadow-black shadow-sm" />
                        </div>
                      </div>
                      <div className="mt-2 bg-white text-black px-2 py-1 rounded text-[10px] font-black text-center shadow-lg">
                        {hex}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Color Panel */}
              <div className="xl:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 md:p-8 rounded-3xl shadow-lg">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="inline-flex h-4 w-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm" style={{ backgroundColor: hex }} />
                    Current Color
                  </h3>
                  <div 
                    className="w-full h-32 md:h-40 rounded-3xl mb-8 shadow-inner border border-slate-200 dark:border-slate-700 flex items-end justify-end p-4 transition-all"
                    style={{ backgroundColor: hex }}
                    role="img"
                    aria-label={`Current color: ${hex}`}
                  >
                    <div className="dark:bg-slate-100 backdrop-blur-md p-2 rounded-lg"><Crosshair size={20}/></div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    {[
                      { label: 'HEX', value: hex },
                      { label: 'RGB', value: `${color.r}, ${color.g}, ${color.b}` },
                      { label: 'HSL', value: rgbToHsl(color.r, color.g, color.b) },
                      { label: 'CMYK', value: rgbToCmyk(color.r, color.g, color.b) }
                    ].map((field) => (
                      <div key={field.label} className="group relative bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 md:p-4 hover:border-indigo-500/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all">
                        <span className="block text-[10px] font-black dark:text-slate-400 uppercase tracking-widest mb-2">{field.label}</span>
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-sm md:text-base font-mono font-bold tracking-tight break-words">{field.value}</span>
                          <button 
                            onClick={() => copy(field.value, field.label)}
                            aria-label={`Copy ${field.label}`}
                            className={`p-2 rounded-lg transition-all flex-shrink-0 ${copiedField === field.label ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                            title={copiedField === field.label ? 'Copied!' : 'Copy'}
                          >
                            {copiedField === field.label ? <Check size={18}/> : <Copy size={18}/>}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* History */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 md:p-8 rounded-3xl shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2 text-lg">
                      <Palette size={18}/> Recent
                    </h3>
                    {history.length > 0 && (
                      <button onClick={() => setHistory([])} aria-label="Clear" className="text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"><RotateCcw size={16}/></button>
                    )}
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 xl:grid-cols-6 gap-3">
                    {history.length > 0 ? (
                      history.map((h, i) => (
                        <button 
                          key={i} 
                          onClick={() => {
                            const r = parseInt(h.slice(1,3), 16);
                            const g = parseInt(h.slice(3,5), 16);
                            const b = parseInt(h.slice(5,7), 16);
                            setColor({r,g,b});
                          }}
                          aria-label={`Apply ${h}`}
                          className="aspect-square rounded-2xl border border-slate-200 dark:border-slate-600 hover:scale-110 hover:border-indigo-500 transition-all shadow-sm"
                          style={{ backgroundColor: h }}
                          title={h}
                        />
                      ))
                    ) : (
                      <p className="col-span-6 text-center text-sm text-slate-500 py-4">No colors yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO & Info Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-slate-50">About Image Color Picker</h2>
            
            <InfoDropdown
              title="🎨 What is an Image Color Picker?"
              content="An image color picker is a tool that allows you to upload any image and extract the exact colors used within it. This is incredibly useful for designers, developers, and artists who need to find specific color codes from reference images, photos, or screenshots without needing complex software."
            />
            <InfoDropdown
              title="🔍 How do I extract a color from an image?"
              content="Simply upload your image (JPG, PNG, WebP, GIF, etc.) using the dropzone. Once the image is loaded, move your cursor or tap anywhere on the image. Click or tap to lock in a color. The tool will instantly display the color's exact HEX, RGB, HSL, and CMYK values for you to copy."
            />
            <InfoDropdown
              title="📋 What color formats are supported?"
              content="This tool automatically converts the extracted color into four standard formats: HEX (e.g., #4F46E5), RGB (e.g., 79, 70, 229), HSL (e.g., 243°, 76%, 59%), and CMYK (e.g., 65%, 69%, 0%, 10%). These formats cover almost all use cases for web design, digital art, and print media."
            />
            <InfoDropdown
              title="🔒 Are my images secure?"
              content="Yes, 100% secure. All image processing and color extraction happen locally within your browser. Your images are never uploaded to our servers, ensuring complete privacy and security for your files."
            />
             <InfoDropdown
              title="📱 Does it work on mobile?"
              content="Absolutely. Our color picker is fully responsive and touch-friendly. You can upload photos directly from your phone's gallery and use touch gestures to pick colors with high precision."
            />
          </div>
          <div className="flex flex-col gap-6">
            <RelatedTools currentTool="Image" />
          </div>
        </div>
      </main>
    </div>
  );
}
