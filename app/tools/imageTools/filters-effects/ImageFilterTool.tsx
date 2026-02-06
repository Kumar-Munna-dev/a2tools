"use client";

import React, { useState, useRef } from 'react';
import {
  Upload, Download, Undo2, Sun, Contrast,
  Droplets, Wind, Sparkles, Image as ImageIcon,
  Zap, Layers, Sliders, X
} from 'lucide-react';

// Define Presets (Multiple effects in one click)
const PRESETS = [
  { name: 'Natural', filter: 'brightness(100%) contrast(100%) saturate(100%) sepia(0%) grayscale(0%) blur(0px) hue-rotate(0deg)' },
  { name: 'Noir', filter: 'brightness(110%) contrast(120%) saturate(0%) sepia(0%) grayscale(100%) blur(0px) hue-rotate(0deg)' },
  { name: 'Vintage', filter: 'brightness(90%) contrast(100%) saturate(80%) sepia(50%) grayscale(0%) blur(0px) hue-rotate(0deg)' },
  { name: 'Dramatic', filter: 'brightness(120%) contrast(150%) saturate(130%) sepia(0%) grayscale(0%) blur(0px) hue-rotate(0deg)' },
  { name: 'Cyberpunk', filter: 'brightness(110%) contrast(110%) saturate(150%) sepia(0%) grayscale(0%) blur(0px) hue-rotate(180deg)' },
  { name: 'Ethereal', filter: 'brightness(120%) contrast(90%) saturate(90%) sepia(0%) grayscale(0%) blur(2px) hue-rotate(0deg)' },
];

export default function ImageEffects() {
  const [image, setImage] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState('Natural');

  // Manual Control States
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [blur, setBlur] = useState(0);
  const [hue, setHue] = useState(0);

  const imgRef = useRef<HTMLImageElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setActivePreset(preset.name);
    // Parse the filter string to update sliders (Simplified logic)
    if (preset.name === 'Natural') {
      setBrightness(100); setContrast(100); setSaturation(100); setSepia(0); setBlur(0); setHue(0);
    } else if (preset.name === 'Noir') {
      setBrightness(110); setContrast(120); setSaturation(0); setSepia(0); setBlur(0); setHue(0);
    } else if (preset.name === 'Vintage') {
      setBrightness(90); setContrast(100); setSaturation(80); setSepia(50); setBlur(0); setHue(0);
    }
    // Add logic for other presets as needed
  };

  const getFilterString = () => {
    return `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) sepia(${sepia}%) blur(${blur}px) hue-rotate(${hue}deg)`;
  };

  const downloadImage = () => {
    if (!imgRef.current) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    if (ctx) {
      ctx.filter = getFilterString();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = 'edited-photo.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="mt-20 min-h-screen dark:bg-slate-950 dark:text-slate-50 font-sans">

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!image ? (
          <div className="max-w-xl mx-auto mt-20">
            <label className="flex flex-col items-center justify-center h-80 bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={28} />
              </div>
              <h3 className="text-lg font-bold">Upload a Photo</h3>
              <p className="text-slate-400 text-sm mt-1">Start applying professional filters</p>
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left: Presets Sidebar */}
            <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
              <div className="dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap size={14} className="dark:text-slate-400" /> Quick Presets
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  {PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => applyPreset(p)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold transition-all text-left ${activePreset === p.name
                        ? 'bg-indigo-600 text-white '
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: Image Preview */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="dark:bg-slate-800 p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">

                {/* Image Container */}
                <div className="flex items-center justify-center h-[300px] md:h-[500px]">
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Editor"
                    style={{ filter: getFilterString() }}
                    className="
          max-w-full
          max-h-full
          object-contain
          rounded-2xl
          transition-all
          duration-300
          select-none
        "
                  />
                </div>

              </div>
            </div>


            {/* Right: Manual Adjustments */}
            <div className="lg:col-span-3 space-y-6 order-3">
              <div className="dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Sliders size={14} className="text-indigo-600" /> Fine-Tune
                </h3>

                <div className="space-y-6">
                  <ControlSlider label="Brightness" icon={<Sun size={14} />} val={brightness} set={setBrightness} max={200} />
                  <ControlSlider label="Contrast" icon={<Contrast size={14} />} val={contrast} set={setContrast} max={200} />
                  <ControlSlider label="Saturation" icon={<Droplets size={14} />} val={saturation} set={setSaturation} max={200} />
                  <ControlSlider label="Sepia" icon={<Layers size={14} />} val={sepia} set={setSepia} max={100} />
                  <ControlSlider label="Hue Rotate" icon={<Wind size={14} />} val={hue} set={setHue} max={360} />
                </div>

                <button
                  onClick={() => applyPreset(PRESETS[0])}
                  className="w-full mt-8 py-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest border-t border-slate-100 pt-6"
                >
                  <Undo2 size={16} /> Reset All
                </button>
                {image && (
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all "
                  >
                    <Download size={18} /> Export
                  </button>
                )}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

// Sub-component for Sliders
function ControlSlider({ label, icon, val, set, max }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
          {icon} {label}
        </label>
        <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{val}</span>
      </div>
      <input
        type="range" min="0" max={max} value={val}
        onChange={(e) => set(parseInt(e.target.value))}
        className="w-full h-1.5  bg-slate-100 rounded-lg appearance-auto cursor-pointer accent-indigo-600"
      />
    </div>
  );
}