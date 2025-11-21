
import React, { useState, useEffect, useRef } from 'react';
import ChinaMapBase from './ChinaMapBase';

interface EmotionMapPageProps {
  onBack: () => void;
}

type Period = 'youth' | 'middle' | 'old';

interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number;
  period: Period;
}

interface EmotionCategory {
  label: string;
  color: string;
  points: HeatPoint[];
}

// Data enriched with Period information based on Li Bai's timeline
const emotionData: Record<string, EmotionCategory> = {
  joy: {
    label: '喜悦与欢乐',
    color: 'orange',
    points: [
      { lat: 31.78, lng: 104.73, intensity: 2.0, period: 'youth' }, // Jiangyou
      { lat: 29.56, lng: 103.48, intensity: 1.5, period: 'youth' }, // Emei
      { lat: 32.39, lng: 119.42, intensity: 1.5, period: 'middle' }, // Yangzhou
      { lat: 31.04, lng: 109.58, intensity: 3.0, period: 'old' },    // Baidicheng (Pardon)
      { lat: 30.95, lng: 118.75, intensity: 1.0, period: 'middle' }, // Xuancheng
    ]
  },
  sadness: {
    label: '哀怨与悲伤',
    color: 'blue',
    points: [
      { lat: 31.55, lng: 118.48, intensity: 3.0, period: 'old' },    // Dangtu (Death)
      { lat: 28.15, lng: 107.05, intensity: 2.5, period: 'old' },    // Yelang (Exile)
      { lat: 34.25, lng: 108.98, intensity: 1.5, period: 'middle' }, // Chang'an (Frustration)
      { lat: 30.38, lng: 114.32, intensity: 2.0, period: 'old' },    // Jiangxia (Prison)
    ]
  },
  ambition: {
    label: '豪放与激昂',
    color: 'red',
    points: [
      { lat: 34.22, lng: 108.96, intensity: 3.0, period: 'middle' }, // Chang'an (Peak Career)
      { lat: 30.67, lng: 104.07, intensity: 2.0, period: 'youth' },  // Chengdu
      { lat: 35.41, lng: 116.59, intensity: 1.8, period: 'middle' }, // Shandong
      { lat: 34.62, lng: 112.45, intensity: 1.5, period: 'middle' }, // Luoyang
    ]
  },
  loneliness: {
    label: '孤寂与落寞',
    color: 'grey',
    points: [
      { lat: 30.95, lng: 118.75, intensity: 3.0, period: 'middle' }, // Jingting Mountain (Late Middle)
      { lat: 31.43, lng: 113.75, intensity: 1.5, period: 'middle' }, // Anlu
      { lat: 32.04, lng: 118.78, intensity: 1.2, period: 'old' },    // Nanjing (Late years)
    ]
  },
  nostalgia: {
    label: '思乡与怀古',
    color: 'purple',
    points: [
      { lat: 32.04, lng: 118.78, intensity: 2.5, period: 'middle' }, // Nanjing
      { lat: 32.39, lng: 119.42, intensity: 1.8, period: 'middle' }, // Yangzhou
      { lat: 30.33, lng: 112.20, intensity: 1.5, period: 'youth' },  // Yichang (Leaving home)
    ]
  },
  friendship: {
    label: '友情与知己',
    color: 'green',
    points: [
      { lat: 34.62, lng: 112.45, intensity: 2.5, period: 'middle' }, // Luoyang (Du Fu)
      { lat: 32.39, lng: 119.42, intensity: 2.0, period: 'middle' }, // Yangzhou (Meng Haoran)
      { lat: 31.55, lng: 118.48, intensity: 1.5, period: 'old' },    // Dangtu (Li Yangbing)
      { lat: 30.95, lng: 118.75, intensity: 2.0, period: 'middle' }, // Xuancheng (Wang Lun)
    ]
  },
};

const EmotionMapPage: React.FC<EmotionMapPageProps> = ({ onBack }) => {
  const [activeEmotion, setActiveEmotion] = useState<string>('joy');
  const [activePeriod, setActivePeriod] = useState<Period | 'all'>('all');
  const [map, setMap] = useState<any>(null);
  const heatLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!map || !(window as any).L) return;
    const L = (window as any).L;

    try {
      // Remove existing layer
      if (heatLayerRef.current) {
        heatLayerRef.current.remove();
      }

      const category = emotionData[activeEmotion];
      
      // Filter points based on activePeriod
      const filteredPoints = category.points
        .filter(p => activePeriod === 'all' || p.period === activePeriod)
        .map(p => [p.lat, p.lng, p.intensity]);

      // Define Vivid Gradients for sharp contrast
      let gradient: Record<number, string> = { 0.2: '#2563eb', 0.6: '#1d4ed8', 1.0: '#1e3a8a' }; // default blue
      
      if (category.color === 'orange') gradient = { 0.2: '#fbbf24', 0.6: '#f59e0b', 1.0: '#b45309' };
      if (category.color === 'blue') gradient = { 0.2: '#60a5fa', 0.6: '#2563eb', 1.0: '#1e3a8a' };
      if (category.color === 'red') gradient = { 0.2: '#f87171', 0.6: '#dc2626', 1.0: '#991b1b' };
      if (category.color === 'grey') gradient = { 0.2: '#9ca3af', 0.6: '#4b5563', 1.0: '#111827' };
      if (category.color === 'purple') gradient = { 0.2: '#a78bfa', 0.6: '#7c3aed', 1.0: '#4c1d95' };
      if (category.color === 'green') gradient = { 0.2: '#34d399', 0.6: '#059669', 1.0: '#064e3b' };

      // Add heat layer if plugin exists and we have points
      if (L.heatLayer && filteredPoints.length > 0) {
        const size = map.getSize();
        if (size.x > 0 && size.y > 0) {
           heatLayerRef.current = L.heatLayer(filteredPoints, {
            radius: 50, 
            blur: 30,   
            maxZoom: 8,
            max: 2.0,   
            minOpacity: 0.65, 
            gradient: gradient
          }).addTo(map);
        }
      }
    } catch (e) {
      console.error("Heatmap error:", e);
    }

    return () => {
      if (heatLayerRef.current) {
        heatLayerRef.current.remove();
      }
    }

  }, [map, activeEmotion, activePeriod]);

  const periods = [
    { id: 'all', label: '全部' },
    { id: 'youth', label: '青年期' },
    { id: 'middle', label: '中年期' },
    { id: 'old', label: '老年期' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Controls */}
      <div className="absolute top-0 left-0 right-0 z-[1000] pointer-events-none flex flex-col md:flex-row justify-between p-4 md:p-6 gap-4">
        
        <div className="pointer-events-auto bg-white/95 backdrop-blur shadow-xl rounded-2xl p-5 border border-gray-200 max-w-md w-full flex flex-col gap-5">
          
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">情感图谱</h2>
            <p className="text-xs text-gray-500 mt-1">探索不同时期与地点的诗歌情感浓度</p>
          </div>

          {/* Period Filter */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">人生阶段</label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {periods.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePeriod(p.id as any)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activePeriod === p.id
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Emotion Filter */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">核心情感</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(emotionData).map(([key, { label, color }]) => (
                <button
                  key={key}
                  onClick={() => setActiveEmotion(key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    activeEmotion === key 
                      ? 'bg-gray-800 text-white border-gray-800 shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full shadow-sm border border-white/20`} style={{ backgroundColor: color === 'grey' ? '#374151' : color }}></span>
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>

        <button 
          onClick={onBack}
          className="pointer-events-auto h-10 px-4 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-2 transition-transform hover:scale-105 self-start md:self-auto"
        >
          <span>✕</span> 退出
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <ChinaMapBase onMapLoad={setMap} className="bg-stone-50" />
      </div>
    </div>
  );
};

export default EmotionMapPage;
    