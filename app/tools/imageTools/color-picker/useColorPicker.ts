import { useState, useRef, useCallback, useEffect } from 'react';

export const rgbToHex = (r: number, g: number, b: number) => 
  "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();

export const rgbToHsl = (r: number, g: number, b: number) => {
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

export const rgbToCmyk = (r: number, g: number, b: number) => {
  let c = 1 - (r / 255), m = 1 - (g / 255), y = 1 - (b / 255), k = Math.min(c, m, y);
  if (k === 1) return '0%, 0%, 0%, 100%';
  c = Math.round(((c - k) / (1 - k)) * 100);
  m = Math.round(((m - k) / (1 - k)) * 100);
  y = Math.round(((y - k) / (1 - k)) * 100);
  k = Math.round(k * 100);
  return `${c}%, ${m}%, ${y}%, ${k}%`;
};

export function useColorPicker() {
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState({ r: 79, g: 70, b: 229 });
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

  const handleMove = (clientX: number, clientY: number) => {
    if (!isPicking) return;
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
    } catch (err) {}
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

  return {
    image, setImage, color, setColor, pos, setPos,
    isPicking, setIsPicking, history, setHistory,
    copiedField, imageReady, imgRef, canvasRef,
    hex, handleUpload, updateColor, handleImageLoad,
    handleMove, saveToHistory, copy
  };
}
