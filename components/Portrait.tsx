
import React, { useEffect, useState } from 'react';
import { generateLiBaiPortrait } from '../services/geminiService';

const Portrait: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      // 1. Try to get from cache
      const cached = localStorage.getItem('li_bai_portrait_v2');
      if (cached) {
        setImageUrl(cached);
        setLoading(false);
        return;
      }

      // 2. Generate if not cached
      setLoading(true);
      const generatedUrl = await generateLiBaiPortrait();
      
      if (generatedUrl) {
        setImageUrl(generatedUrl);
        localStorage.setItem('li_bai_portrait_v2', generatedUrl);
      }
      setLoading(false);
    };

    fetchImage();
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto">
       {/* Background Circle Decoration */}
      <div className="absolute inset-0 bg-gray-100 rounded-full transform translate-x-4 translate-y-4 -z-10"></div>
      
      <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white relative bg-gray-200 flex items-center justify-center group">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-gray-400 animate-pulse">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="text-sm font-serif">绘像中...</span>
          </div>
        ) : (
          <img 
            src={imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Li_Bai_%28Tang_Dynasty%29.jpg/800px-Li_Bai_%28Tang_Dynasty%29.jpg"} 
            alt="Li Bai AI Portrait" 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-in-out"
          />
        )}
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>
    </div>
  );
};

export default Portrait;
