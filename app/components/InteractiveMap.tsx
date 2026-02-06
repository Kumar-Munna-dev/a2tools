
import React, { useEffect, useRef } from 'react';

interface InteractiveMapProps {
  lat: number;
  lng: number;
  zoom?: number;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ lat, lng, zoom = 13 }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // @ts-ignore
    const L = window.L;
    if (!L) return;

    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView([lat, lng], zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(leafletMapRef.current);
      
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      L.marker([lat, lng], { icon }).addTo(leafletMapRef.current);
    } else {
      leafletMapRef.current.setView([lat, lng], zoom);
      // Remove old markers and add new one
      leafletMapRef.current.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          leafletMapRef.current.removeLayer(layer);
        }
      });
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.marker([lat, lng], { icon }).addTo(leafletMapRef.current);
    }

    return () => {
      // Cleanup not strictly necessary here as we keep the ref
    };
  }, [lat, lng, zoom]);

  return (
    <div className="w-full h-full relative border border-gray-200 rounded-lg overflow-hidden shadow-inner">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="backdrop-blur px-3 py-1 rounded shadow-sm text-xs font-medium border border-gray-200">
           Status: Device Connected
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;






