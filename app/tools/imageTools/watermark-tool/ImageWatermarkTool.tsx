"use client";

import React, { useState, useRef } from 'react';
import {
  Settings2,
  Maximize2,
  LayoutGrid
} from 'lucide-react';
import { ImageFile, WatermarkConfig } from '@/app/types';
import Sidebar from '@/app/components/Sidebar';
import CanvasPreview from '@/app/components/CanvasPreview';
import ImageDropzone from '@/app/components/ImageDropzone';

const DEFAULT_CONFIG: WatermarkConfig = {
  type: 'text',
  text: 'WATERMARK',
  fontSize: 40,
  fontFamily: 'Arial',
  color: '#ffffff',
  opacity: 0.5,
  position: 'center',
  padding: 20,
  rotation: 0,
  scale: 0.2,
  offsetX: 0,
  offsetY: 0
};

export default function App() {
  const [sourceImage, setSourceImage] = useState<ImageFile | null>(null);
  const [logoImage, setLogoImage] = useState<ImageFile | null>(null);
  const [config, setConfig] = useState<WatermarkConfig>(DEFAULT_CONFIG);
  const [isExporting, setIsExporting] = useState(false);
  
  // FIX: Use null! to satisfy strict TypeScript RefObject requirements
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const handleImageUpload = (file: File, type: 'source' | 'logo') => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const imageFile: ImageFile = {
          file,
          preview: event.target?.result as string,
          width: img.width,
          height: img.height,
        };

        if (type === 'source') {
          setSourceImage(imageFile);
        } else {
          setLogoImage(imageFile);
          setConfig(prev => ({ ...prev, type: 'image' }));
        }
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const downloadImage = () => {
    if (!canvasRef.current || !sourceImage) return;
    setIsExporting(true);

    try {
      const link = document.createElement('a');
      const originalName = sourceImage.file.name.split('.')[0];
      link.download = `watermarked-${originalName}.png`;
      link.href = canvasRef.current.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-950 dark:text-slate-50 overflow-x-hidden">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden pt-20">
        
        {/* Workspace Area */}
        <div className="flex-1 relative flex items-center justify-center  p-4 overflow-auto">
          {!sourceImage ? (
            <div className="max-w-xl w-full px-4">
              <ImageDropzone
                onFileSelect={(file) => handleImageUpload(file, 'source')}
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg shadow-sm flex items-center justify-center mx-auto">
                    <LayoutGrid className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-medium text-sm">Batch Ready</h3>
                  <p className="text-xs ">Fast processing for high-res images</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10  rounded-lg shadow-sm flex items-center justify-center mx-auto">
                    <Maximize2 className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-medium text-sm">Full Resolution</h3>
                  <p className="text-xs ">No compression during watermarking</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg shadow-sm flex items-center justify-center mx-auto">
                    <Settings2 className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-medium text-sm">Pro Controls</h3>
                  <p className="text-xs">Fine-tune every single pixel</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full max-w-full">
              <div className="w-full flex items-center justify-center shadow-2xl rounded-lg overflow-hidden border dark:border-slate-800">
                <CanvasPreview
                  sourceImage={sourceImage}
                  logoImage={logoImage}
                  config={config}
                  canvasRef={canvasRef}
                />
              </div>
              
              {/* Mobile Sidebar (Visible only on small screens) */}
              <div className="w-full mt-6 md:hidden">
                <Sidebar
                  config={config}
                  setConfig={setConfig}
                  logoImage={logoImage}
                  onLogoUpload={(file) => handleImageUpload(file, 'logo')}
                  onRemoveLogo={() => setLogoImage(null)}
                  onDownload={downloadImage}
                  isExporting={isExporting}
                />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar (Visible only on md+ screens) */}
        {sourceImage && (
          <aside className="hidden md:flex w-80 border-l dark:bg-slate-950 overflow-y-auto">
            <Sidebar
              config={config}
              setConfig={setConfig}
              logoImage={logoImage}
              onLogoUpload={(file) => handleImageUpload(file, 'logo')}
              onRemoveLogo={() => setLogoImage(null)}
              onDownload={downloadImage}
              isExporting={isExporting}
            />
          </aside>
        )}
      </main>
    </div>
  );
}