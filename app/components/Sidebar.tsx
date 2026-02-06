import React from "react";
import {
  Type,
  Image as ImageIcon,
  Download,
  Trash2,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize,
} from "lucide-react";
import { WatermarkConfig, ImageFile, WatermarkPosition } from "../types";

interface SidebarProps {
  config: WatermarkConfig;
  setConfig: React.Dispatch<React.SetStateAction<WatermarkConfig>>;
  logoImage: ImageFile | null;
  onLogoUpload: (file: File) => void; // ✅ FIXED
  onRemoveLogo: () => void;
  onDownload: () => void;
  isExporting: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  config,
  setConfig,
  logoImage,
  onLogoUpload,
  onRemoveLogo,
  onDownload,
  isExporting,
}) => {
  const positions: { id: WatermarkPosition; icon: React.ReactNode; label: string }[] =
    [
      { id: "top-left", icon: <AlignLeft className="w-4 h-4 rotate-180" />, label: "Top Left" },
      { id: "top-right", icon: <AlignRight className="w-4 h-4 rotate-180" />, label: "Top Right" },
      { id: "center", icon: <AlignCenter className="w-4 h-4" />, label: "Center" },
      { id: "bottom-left", icon: <AlignLeft className="w-4 h-4" />, label: "Bottom Left" },
      { id: "bottom-right", icon: <AlignRight className="w-4 h-4" />, label: "Bottom Right" },
      { id: "custom", icon: <Maximize className="w-4 h-4" />, label: "Custom" },
      {
        id: "tiled",
        icon: (
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-current rounded-full" />
            <div className="w-1.5 h-1.5 bg-current rounded-full" />
          </div>
        ),
        label: "Tiled",
      },
    ];

  const updateConfig = (updates: Partial<WatermarkConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <aside className="w-100 md:border-l shadow-[0px_-10px_15px_-3px_rgba(0,0,0,0.1)]  dark:bg-slate-950 flex flex-col h-full overflow-hidden">
      <div className="p-2 space-y-8 overflow-y-auto overflow-x-hidden flex-1 justify-center items-center">

        {/* Watermark Mode */}
        <section className="space-y-3">
          <label className="text-xs font-bold dark:text-slate-400 uppercase tracking-widest">
            Watermark Mode
          </label>
          <div className="grid grid-cols-2 p-1 dark:bg-slate-300  rounded-xl">
            <button
              onClick={() => updateConfig({ type: "text" })}
              className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg ${config.type === "text"
                ? "bg-slate-100 text-indigo-600 shadow-sm"
                : "dark:text-slate-500 hover:text-slate-700"
                }`}
            >
              <Type className="w-4 h-4" />
              Text
            </button>
            <button
              onClick={() => updateConfig({ type: "image" })}
              className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg ${config.type === "image"
                ? "bg-slate-100 text-indigo-600 shadow-sm"
                : "dark:text-slate-500 hover:text-slate-700"
                }`}
            >
              <ImageIcon className="w-4 h-4" />
              Logo
            </button>
          </div>
        </section>

        {/* TEXT CONFIG */}
        {config.type === "text" && (
          <section className="space-y-5">
            <input
              type="text"
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              className="l px-4 py-3 rounded-xl border dark:bg-slate-900"
            />

            <div className="grid grid-cols-2 ">
              <div>
                color
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) => updateConfig({ color: e.target.value })}
                  className="flex pl-2 pr-2 border rounded-2xl"
                />
              </div>
              <div>
                size <input
                  type="number"
                  value={config.fontSize}
                  onChange={(e) =>
                    updateConfig({ fontSize: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

            </div>
          </section>
        )}

        {/* IMAGE CONFIG */}
        {config.type === "image" && (
          <section className="space-y-5">
            {logoImage ? (
              <div className="relative p-3 border-2 border-indigo-100 rounded-xl bg-indigo-50/30">
                <img
                  src={logoImage.preview}
                  className="max-h-24 mx-auto rounded-lg object-contain"
                  alt="Logo"
                />
                <button
                  onClick={onRemoveLogo}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer">
                <ImageIcon className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] text-slate-500">Upload logo</span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onLogoUpload(file);
                  }}
                />
              </label>
            )}

            <input
              type="range"
              min="0.05"
              max="1"
              step="0.01"
              value={config.scale}
              onChange={(e) =>
                updateConfig({ scale: parseFloat(e.target.value) })
              }
            />
          </section>
        )}

        {/* POSITION + OFFSETS */}
        <section className="space-y-6 pt-6 border-t ">
          <div className="grid grid-cols-4 gap-2 ">
            {positions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => updateConfig({ position: pos.id })}
                className={`h-10 rounded-lg border ${config.position === pos.id
                  ? "bg-indigo-500 border-indigo-200 dark:text-slate-800"
                  : "border-slate-400 dark:text-slate-100"
                  }`}
              >
                {pos.icon}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <Move className="w-3.5 h-3.5" />
              Fine-tuning Offsets
            </div>

            <input
              type="range"
              min="-1000"
              max="1000"
              value={config.offsetX}
              onChange={(e) =>
                updateConfig({ offsetX: parseInt(e.target.value) })
              }
            />
            <input
              type="range"
              min="-1000"
              max="1000"
              value={config.offsetY}
              onChange={(e) =>
                updateConfig({ offsetY: parseInt(e.target.value) })
              }
            />


          </div>
        </section>

        {/* OPACITY & ROTATION */}
        <section className="space-y-4 pt-6 border-t">
          <div>
            OPACITY
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={config.opacity}
            onChange={(e) =>
              updateConfig({ opacity: parseFloat(e.target.value) })
            }
          />
          <div>
            ROTATION
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            value={config.rotation}
            onChange={(e) =>
              updateConfig({ rotation: parseInt(e.target.value) })
            }
          />
          <div className="flex border rounded-2xl p-4 text-slate-50 bg-indigo-500 items-center justify-center ">
            <button
              onClick={() => updateConfig({ offsetX: 0, offsetY: 0 })}

            >
              Reset Offsets
            </button>
          </div>

        </section>
      </div>

      {/* DOWNLOAD */}
      <div className="p-6 border-t">
        <button
          onClick={onDownload}
          disabled={isExporting}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl"
        >
          {isExporting ? "Exporting…" : "Download Results"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
