"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Plus,
  Download,
  Trash2,
  Type,
  Image as ImageIcon,
  Settings2,
  Move,
  Eye,
  Github,
  Maximize2,
  RefreshCw,
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (!canvasRef.current) return;
    setIsExporting(true);

    // Small delay to show feedback if needed, but usually instant
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `watermarked-${sourceImage?.file.name || 'image'}.png`;
      link.href = canvasRef.current!.toDataURL('image/png', 1.0);
      link.click();
      setIsExporting(false);
    }, 100);
  };

  const resetAll = () => {
    setSourceImage(null);
    setLogoImage(null);
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <div className="mt-20 flex flex-col h-screen dark:bg-slate-950 overflow-hidden ">


      <main className="flex-1 flex overflow-hidden">
        {/* Workspace Area */}
        <div className="flex-1 relative flex items-center justify-center md: dark:bg-slate-800 ">
          {!sourceImage ? (
            <div className="max-w-xl w-full">
              <ImageDropzone
                onFileSelect={(file) => handleImageUpload(file, 'source')}
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto">
                    <LayoutGrid className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-medium dark:text-slate-800">Batch Ready</h3>
                  <p className="text-xs text-slate-500">Fast processing for high-res images</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto">
                    <Maximize2 className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-medium dark:text-slate-800">Full Resolution</h3>
                  <p className="text-xs text-slate-500">No compression during watermarking</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto">
                    <Settings2 className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-medium dark:text-slate-800">Pro Controls</h3>
                  <p className="text-xs text-slate-500">Fine-tune every single pixel</p>
                </div>
              </div>
            </div>
          ) : (
            <div className=' ' >
              <div className="w-full flex items-center justify-center overflow-auto shadow-2xl shadow-cyan-950">
                <CanvasPreview
                  sourceImage={sourceImage}
                  logoImage={logoImage}
                  config={config}
                  canvasRef={canvasRef}
                />
              </div>
              <div className='flex h-100 w-full items-center justify-center custom-scrollbar  not-sr-only md:sr-only'>

                <Sidebar
                  config={config}
                  setConfig={setConfig}
                  logoImage={logoImage}
                  onLogoUpload={(file) => handleImageUpload(file,'logo')}
                  onRemoveLogo={() => setLogoImage(null)}
                  onDownload={downloadImage}
                  isExporting={isExporting}
                />
              </div>
            </div>

          )}
        </div>

        {/* Controls Sidebar */}
        <div className='flex sr-only md:not-sr-only'>{sourceImage && (
          <Sidebar
            config={config}
            setConfig={setConfig}
            logoImage={logoImage}
            onLogoUpload={(file) => handleImageUpload(file, 'logo')}
            onRemoveLogo={() => setLogoImage(null)}
            onDownload={downloadImage}
            isExporting={isExporting}
          />
        )}</div>
      </main>
    </div>
  );
}


