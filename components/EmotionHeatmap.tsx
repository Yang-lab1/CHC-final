import React from 'react';

interface EmotionHeatmapProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmotionHeatmap: React.FC<EmotionHeatmapProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stages = ['青年期', '中年期', '老年期'];
  const emotions = [
    '豪放与激昂',
    '哀怨与悲伤',
    '喜悦与欢乐',
    '孤寂与落寞',
    '思乡与怀古',
    '友情与知己',
  ];

  // Data approximated from the PDF text context
  // 0 = low, 1 = medium, 2 = high, 3 = very high
  const data = {
    '豪放与激昂': [3, 3, 2], // Youth: High ambition, Old: Still bold but tempered
    '哀怨与悲伤': [0, 2, 3], // Youth: Low, Old: High (Exile, sickness)
    '喜悦与欢乐': [3, 1, 0], // Youth: Travel joy, Old: Rare
    '孤寂与落寞': [1, 2, 3], // Increases with age
    '思乡与怀古': [1, 2, 3], // Increases with distance and time
    '友情与知己': [2, 3, 2], // Consistently high, peak in middle age social life
  };

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-gray-50';
      case 1: return 'bg-red-100';
      case 2: return 'bg-red-300';
      case 3: return 'bg-red-500 text-white';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-3xl font-bold mb-2 text-gray-900">情感图谱</h2>
        <p className="text-gray-500 mb-6">基于诗歌创作时期分析的情感热力图</p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2"></th>
                {stages.map(stage => (
                  <th key={stage} className="p-2 text-sm font-semibold text-gray-600">{stage}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {emotions.map(emotion => (
                <tr key={emotion}>
                  <td className="p-2 text-sm font-medium text-gray-700 text-right pr-4 whitespace-nowrap">{emotion}</td>
                  {stages.map((_, index) => (
                    <td key={index} className="p-1">
                      <div className={`h-10 w-full rounded-md flex items-center justify-center transition-colors ${getColor(data[emotion as keyof typeof data][index])}`}>
                        {/* Optional: tooltips or values could go here */}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-end gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-50 rounded"></span> 低频</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 rounded"></span> 中低</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-300 rounded"></span> 中高</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span> 高频</div>
        </div>
      </div>
    </div>
  );
};

export default EmotionHeatmap;