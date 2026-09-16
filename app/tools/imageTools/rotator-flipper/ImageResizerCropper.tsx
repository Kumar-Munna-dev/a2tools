"use client";
import React, { useState, useRef, useCallback } from 'react';
import { TransformState, ImageData } from '@/app/types';
import {
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Download,
  Trash,
  ImagePlus,
  RefreshCw
} from 'lucide-react';


const INITIAL_TRANSFORM: TransformState = {
  rotation: 0,
  flipH: false,
  flipV: false,
  scale: 1
};

export default function App() {
  const [image, setImage] = useState<ImageData | null>(null);
  const [transform, setTransform] = useState<TransformState>(INITIAL_TRANSFORM);
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setImage({
          url,
          name: file.name,
          type: file.type,
          width: img.width,
          height: img.height
        });
        setTransform(INITIAL_TRANSFORM);
      };
      img.src = url;
    }
  };

  const handleRotate = (dir: 'cw' | 'ccw') => {
    setTransform(prev => ({
      ...prev,
      rotation: (prev.rotation + (dir === 'cw' ? 90 : -90)) % 360
    }));
  };

  const handleFlip = (dir: 'h' | 'v') => {
    setTransform(prev => ({
      ...prev,
      flipH: dir === 'h' ? !prev.flipH : prev.flipH,
      flipV: dir === 'v' ? !prev.flipV : prev.flipV
    }));
  };

  const resetTransforms = () => setTransform(INITIAL_TRANSFORM);

  const clearImage = () => {
    if (image?.url) URL.revokeObjectURL(image.url);
    setImage(null);
    setTransform(INITIAL_TRANSFORM);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadImage = useCallback(async () => {
    if (!image) return;
    setIsExporting(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image.url;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const isRotated90 = Math.abs(transform.rotation % 180) === 90;
    canvas.width = isRotated90 ? img.height : img.width;
    canvas.height = isRotated90 ? img.width : img.height;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(transform.flipH ? -1 : 1, transform.flipV ? -1 : 1);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    const link = document.createElement('a');
    link.download = `pixelrotate-${image.name}`;
    link.href = canvas.toDataURL(image.type || 'image/png', 0.95);
    link.click();
    setIsExporting(false);
  }, [image, transform]);

  return (
    <div className="min-h-screen  flex flex-col dark:bg-slate-950 dark:text-slate-50 selection:bg-indigo-500 selection:text-white">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 dark:bg-slate-950 relative flex items-center justify-center p-4 md:p-12 overflow-auto">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(#475569 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
          />

          {!image ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="max-w-md w-full aspect-square border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-indigo-500/50 hover:bg-slate-900/40 transition-all group"
            >
              <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ImagePlus className="w-10 h-10 text-slate-500 group-hover:text-indigo-400" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-slate-300">Click to upload an image</p>
                <p className="text-sm text-slate-500 mt-1">Supports PNG, JPG, WebP up to 25MB</p>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className="shadow-2xl shadow-black/50 transition-all duration-300 ease-out flex items-center justify-center"
                style={{
                  transform: `rotate(${transform.rotation}deg) scaleX(${transform.flipH ? -1 : 1}) scaleY(${transform.flipV ? -1 : 1})`,
                }}
              >
                <img
                  src={image.url}
                  alt="Preview"
                  className="max-h-[70vh] max-w-full rounded-sm object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        {image && (
          <aside className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 dark:bg-slate-900/50 backdrop-blur-xl p-6 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2">
                {image && (
                  <button
                    onClick={downloadImage}
                    disabled={isExporting}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Download'}</span>
                  </button>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 px-4 py-2 rounded-lg font-medium transition-all active:scale-95 border border-slate-700"
                >
                  <ImagePlus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Image</span>
                </button>
              </div>
              <h3 className="text-xs font-bold dark:text-slate-50 uppercase tracking-widest mb-4">Transform</h3>
              <div className="grid grid-cols-2 gap-3">
                <ControlButton
                  icon={<RotateCcw />}
                  label="Rotate Left"
                  onClick={() => handleRotate('ccw')}
                />
                <ControlButton
                  icon={<RotateCw />}
                  label="Rotate Right"
                  onClick={() => handleRotate('cw')}
                />
                <ControlButton
                  icon={<FlipHorizontal />}
                  label="Flip Horizontal"
                  active={transform.flipH}
                  onClick={() => handleFlip('h')}
                />
                <ControlButton
                  icon={<FlipVertical />}
                  label="Flip Vertical"
                  active={transform.flipV}
                  onClick={() => handleFlip('v')}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold dark:text-slate-50 uppercase tracking-widest mb-4">Stats</h3>
              <div className="dark:bg-slate-950/50 rounded-xl p-4 space-y-3 text-sm border border-slate-800">
                <StatRow label="Rotation" value={`${transform.rotation}°`} />
                <StatRow label="Flipped H" value={transform.flipH ? 'Yes' : 'No'} />
                <StatRow label="Flipped V" value={transform.flipV ? 'Yes' : 'No'} />
                <StatRow label="Resolution" value={`${image.width} × ${image.height}`} />
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button
                onClick={resetTransforms}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl font-medium transition-all active:scale-95 border border-slate-700"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Defaults
              </button>
              <button
                onClick={clearImage}
                className="w-full flex items-center bg-slate-800 justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-700 py-3 rounded-xl font-medium transition-all active:scale-95"
              >
                <Trash className="w-4 h-4" />
                Remove Image
              </button>
            </div>

          </aside>
        )}
      </main>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

     
    </div>
  );
}

// Sub-components for cleaner structure
interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all active:scale-95 ${active
        ? 'dark:bg-indigo-600/20 border-indigo-500 text-indigo-400'
        : 'dark:bg-slate-800/40 border-slate-900 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-200'
      }`}
  >
    {icon}
    <span className="text-[10px] font-semibold uppercase tracking-tight">{label}</span>
  </button>
);

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="dark:text-slate-50">{label}</span>
    <span className="font-mono dark:text-slate-100">{value}</span>
  </div>
);
