"use client";
import React, { useEffect, useRef } from 'react';
import { ImageFile, WatermarkConfig } from '../types';

interface Props {
  sourceImage: ImageFile;
  logoImage: ImageFile | null;
  config: WatermarkConfig;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function CanvasPreview({ sourceImage, logoImage, config, canvasRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sourceImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mainImg = new Image();
    mainImg.src = sourceImage.preview;
    mainImg.onload = () => {
      // Set canvas to actual image dimensions
      canvas.width = sourceImage.width;
      canvas.height = sourceImage.height;

      // Draw Base Image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(mainImg, 0, 0);

      // Setup Watermark Style
      ctx.globalAlpha = config.opacity;
      ctx.fillStyle = config.color;
      ctx.font = `${config.fontSize}px ${config.fontFamily}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      const drawWatermark = (x: number, y: number) => {
        ctx.save();
        ctx.translate(x + config.offsetX, y + config.offsetY);
        ctx.rotate((config.rotation * Math.PI) / 180);

        if (config.type === 'text') {
          ctx.fillText(config.text, 0, 0);
        } else if (config.type === 'image' && logoImage) {
          const logoImg = new Image();
          logoImg.src = logoImage.preview;
          const w = logoImage.width * config.scale;
          const h = logoImage.height * config.scale;
          ctx.drawImage(logoImg, -w / 2, -h / 2, w, h);
        }
        ctx.restore();
      };

      // Calculate Positions
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      const pad = config.padding + (config.fontSize / 2);

      if (config.position === 'top-left') { x = pad; y = pad; ctx.textAlign = 'left'; }
      else if (config.position === 'top-right') { x = canvas.width - pad; y = pad; ctx.textAlign = 'right'; }
      else if (config.position === 'bottom-left') { x = pad; y = canvas.height - pad; ctx.textAlign = 'left'; }
      else if (config.position === 'bottom-right') { x = canvas.width - pad; y = canvas.height - pad; ctx.textAlign = 'right'; }
      
      if (config.position === 'tiled') {
        const gap = 200;
        for (let i = 0; i < canvas.width; i += gap) {
          for (let j = 0; j < canvas.height; j += gap) {
            drawWatermark(i, j);
          }
        }
      } else {
        drawWatermark(x, y);
      }
    };
  }, [config, sourceImage, logoImage]);

  return (
    <div ref={containerRef} className="w-full flex justify-center items-center dark:bg-slate-900 rounded-xl overflow-hidden min-h-[300px] p-4">
      <canvas 
        ref={canvasRef} 
        className="max-w-full h-auto shadow-2xl dark:bg-slate-900"
        style={{ maxHeight: '70vh' }}
      />
    </div>
  );
}