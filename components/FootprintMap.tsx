import React, { useEffect, useRef, useState } from 'react';

interface FootprintMapProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simplified coordinates mapping roughly to the data provided
// We normalize these to a 0-1000 scale for SVG drawing
// Original Bounds approx: Long 103-121 (Diff 18), Lat 27-40 (Diff 13)
const locations = [
  { name: '江油', x: 104.73, y: 31.78 },
  { name: '成都', x: 104.07, y: 30.67 },
  { name: '峨眉', x: 103.48, y: 29.56 },
  { name: '重庆', x: 106.55, y: 29.55 },
  { name: '宜昌', x: 112.20, y: 30.33 },
  { name: '庐山', x: 115.98, y: 29.71 },
  { name: '南京', x: 118.78, y: 32.04 },
  { name: '扬州', x: 119.42, y: 32.39 },
  { name: '安陆', x: 113.75, y: 31.43 },
  { name: '长安', x: 108.96, y: 34.22 },
  { name: '洛阳', x: 112.45, y: 34.62 },
  { name: '太原', x: 113.46, y: 39.75 }, // Note: fixed visual outlier for demo
  { name: '济宁', x: 116.59, y: 35.41 },
  { name: '宣城', x: 118.75, y: 30.95 },
  { name: '当涂', x: 118.48, y: 31.55 },
];

const normalize = (val: number, min: number, max: number, scale: number) => {
  return ((val - min) / (max - min)) * scale;
};

const FootprintMap: React.FC<FootprintMapProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  // Calculate bounds
  const minX = Math.min(...locations.map(l => l.x)) - 1;
  const maxX = Math.max(...locations.map(l => l.x)) + 1;
  const minY = Math.min(...locations.map(l => l.y)) - 1;
  const maxY = Math.max(...locations.map(l => l.y)) + 1;

  if (!isOpen) return null;

  // SVG ViewBox calculations
  const width = 800;
  const height = 500;
  
  const points = locations.map(loc => ({
    ...loc,
    svgX: normalize(loc.x, minX, maxX, width),
    // Flip Y because SVG coordinates start from top-left, latitude starts from bottom
    svgY: height - normalize(loc.y, minY, maxY, height), 
  }));

  // Generate path string
  const pathD = points.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.svgX} ${point.svgY}` : `${acc} L ${point.svgX} ${point.svgY}`;
  }, "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] p-8 relative flex flex-col" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-3xl font-bold mb-2 text-gray-900">足迹漫游</h2>
        <p className="text-gray-500 mb-4">李白一生的主要游历路线示意图</p>

        <div className="flex-1 bg-blue-50 rounded-xl relative overflow-hidden border border-blue-100">
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 pointer-events-auto">
            {/* Background Grid/River Effect (Abstract) */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e7ff" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Connection Path */}
            <path 
              d={pathD} 
              fill="none" 
              stroke="#93c5fd" 
              strokeWidth="2" 
              strokeDasharray="5,5"
              className="animate-[dash_20s_linear_infinite]"
            />
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -1000;
                }
              }
            `}</style>

            {/* Cities */}
            {points.map((point, i) => (
              <g key={i} 
                 onMouseEnter={() => setActiveCity(point.name)}
                 onMouseLeave={() => setActiveCity(null)}
                 className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                <circle 
                  cx={point.svgX} 
                  cy={point.svgY} 
                  r={activeCity === point.name ? 8 : 4} 
                  fill={activeCity === point.name ? "#2563eb" : "#60a5fa"}
                  className="transition-all duration-300"
                />
                <text 
                  x={point.svgX} 
                  y={point.svgY - 10} 
                  textAnchor="middle" 
                  className={`text-xs fill-gray-700 font-sans pointer-events-none transition-all duration-300 ${activeCity === point.name ? 'font-bold text-lg fill-blue-900' : 'text-xs'}`}
                  style={{ fontSize: activeCity === point.name ? '16px' : '12px' }}
                >
                  {point.name}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Abstract overlay instructions */}
          <div className="absolute bottom-4 left-4 text-xs text-blue-400">
            * 地图为示意图，基于历史坐标近似绘制
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootprintMap;