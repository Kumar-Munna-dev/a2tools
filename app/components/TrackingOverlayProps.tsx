
import React from 'react';

interface TrackingOverlayProps {
  progress: number;
  currentStep: string;
}

const TrackingOverlay: React.FC<TrackingOverlayProps> = ({ progress, currentStep }) => {
  return (
    <div className="p-6 rounded-xl border border-slate-200 shadow-lg">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            Device Search 
            <span className="inline-block w-4 h-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">{currentStep}</p>
        </div>
        <span className="text-blue-600 font-bold text-lg">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TrackingOverlay;
