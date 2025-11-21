import React, { useEffect, useRef } from 'react';

interface ChinaMapBaseProps {
  onMapLoad?: (map: any) => void;
  className?: string;
}

const ChinaMapBase: React.FC<ChinaMapBaseProps> = ({ onMapLoad, className }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && (window as any).L) {
      const L = (window as any).L;
      
      // Initialize map centered on China
      // Coordinates roughly center of Tang Dynasty activity
      const map = L.map(mapContainerRef.current, {
        center: [33.0, 110.0], 
        zoom: 5,
        zoomControl: false,
        attributionControl: false
      });

      // Add a minimal, artistic tile layer (CartoDB Positron)
      // Using 'light_all' for a cleaner look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add Zoom Control to bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      mapInstanceRef.current = map;

      if (onMapLoad) {
        onMapLoad(map);
      }
    }

    // Fix for map not rendering correctly when container starts hidden or animates in
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 100);

    return () => {
        clearTimeout(timer);
      // Cleanup handled by ref check to avoid double init in React 18 strict mode
    };
  }, []);

  return <div ref={mapContainerRef} className={`w-full h-full ${className}`} style={{ zIndex: 0 }} />;
};

export default ChinaMapBase;