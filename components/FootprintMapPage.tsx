import React, { useState, useEffect, useRef } from 'react';
import ChinaMapBase from './ChinaMapBase';

interface FootprintMapPageProps {
  onBack: () => void;
}

// Chronological journey with years
const journey = [
  { year: 701, name: '碎叶城 (出生)', lat: 42.87, lng: 75.35 }, 
  { year: 705, name: '江油 (随父迁徙)', lat: 31.78, lng: 104.73 },
  { year: 720, name: '成都 (游历)', lat: 30.67, lng: 104.07 },
  { year: 724, name: '峨眉山 (辞亲远游)', lat: 29.56, lng: 103.48 },
  { year: 725, name: '渝州 (出蜀)', lat: 29.56, lng: 106.55 },
  { year: 726, name: '扬州 (散金三十万)', lat: 32.39, lng: 119.42 },
  { year: 727, name: '安陆 (成家)', lat: 31.43, lng: 113.75 },
  { year: 742, name: '长安 (奉诏入京)', lat: 34.22, lng: 108.96 },
  { year: 744, name: '洛阳 (遇杜甫)', lat: 34.62, lng: 112.45 },
  { year: 745, name: '济宁 (寓居)', lat: 35.41, lng: 116.59 },
  { year: 753, name: '宣城 (独坐敬亭山)', lat: 30.95, lng: 118.75 },
  { year: 757, name: '九江 (入幕永王)', lat: 29.71, lng: 115.98 },
  { year: 759, name: '白帝城 (流放遇赦)', lat: 31.04, lng: 109.58 },
  { year: 761, name: '金陵 (抱病)', lat: 32.04, lng: 118.78 },
  { year: 762, name: '当涂 (终老)', lat: 31.55, lng: 118.48 },
];

const FootprintMapPage: React.FC<FootprintMapPageProps> = ({ onBack }) => {
  const [map, setMap] = useState<any>(null);
  const [currentYear, setCurrentYear] = useState(701);
  const markersLayerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const currentMarkerRef = useRef<any>(null);

  // Update map based on year
  useEffect(() => {
    if (!map || !(window as any).L) return;
    const L = (window as any).L;

    // Initialize layers if not existing
    if (!markersLayerRef.current) {
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    // Filter path up to current year
    const currentPath = journey.filter(p => p.year <= currentYear);
    if (currentPath.length === 0) return;

    const latLngs = currentPath.map(p => [p.lat, p.lng]);
    const currentPoint = currentPath[currentPath.length - 1];

    // Draw/Update Polyline
    if (polylineRef.current) {
      polylineRef.current.setLatLngs(latLngs);
    } else {
      polylineRef.current = L.polyline(latLngs, {
        color: '#2563eb', // Blue-600
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 10',
        lineCap: 'round'
      }).addTo(map);
    }

    // Update current location marker
    if (currentMarkerRef.current) {
      currentMarkerRef.current.setLatLng([currentPoint.lat, currentPoint.lng]);
      currentMarkerRef.current.setTooltipContent(`${currentPoint.year}年: ${currentPoint.name}`);
    } else {
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#2563eb;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px #2563eb;'></div>",
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      
      currentMarkerRef.current = L.marker([currentPoint.lat, currentPoint.lng], { icon }).addTo(map);
      currentMarkerRef.current.bindTooltip(`${currentPoint.year}年: ${currentPoint.name}`, {
        permanent: true,
        direction: 'top',
        offset: [0, -10],
        className: 'font-sans text-xs font-bold'
      }).openTooltip();
    }
    
  }, [map, currentYear]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pointer-events-none flex justify-between p-4 md:p-6">
        <div className="pointer-events-auto bg-white/90 backdrop-blur shadow-lg rounded-xl p-4 border border-gray-100">
          <h2 className="text-2xl font-bold mb-1 text-gray-900">足迹漫游</h2>
          <p className="text-xs text-gray-500">拖动下方滑块查看李白一生的行旅</p>
        </div>

        <button 
          onClick={onBack}
          className="pointer-events-auto h-10 px-4 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-2 transition-transform hover:scale-105"
        >
          <span>✕</span> 退出
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <ChinaMapBase onMapLoad={setMap} className="bg-blue-50/30" />
      </div>

      {/* Timeline Control */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur border-t border-gray-200 p-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-4xl font-bold text-blue-600 font-mono">{currentYear}</span>
              <span className="text-sm text-gray-500 ml-2">年 ({(currentYear - 701)}岁)</span>
            </div>
            <div className="text-sm text-gray-500">
              {journey.filter(j => j.year <= currentYear).slice(-1)[0]?.name}
            </div>
          </div>
          
          <input 
            type="range" 
            min="701" 
            max="762" 
            value={currentYear} 
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
            <span>701 (出生)</span>
            <span>724 (出蜀)</span>
            <span>742 (入京)</span>
            <span>755 (战乱)</span>
            <span>762 (去世)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootprintMapPage;