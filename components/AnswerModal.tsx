
import React from 'react';

interface AnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answer: string | null;
  loading: boolean;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ isOpen, onClose, question, answer, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 relative animate-fade-in flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Header / Question */}
        <div className="mb-8 border-b border-gray-100 pb-6 pr-8">
          <div className="text-sm text-blue-600 font-bold tracking-wider uppercase mb-2">Quest</div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-snug">
            {question}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="space-y-6 animate-pulse py-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>
                <div className="space-y-3 w-full pt-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
              <div className="h-32 bg-gray-100 rounded-xl w-full mx-auto"></div>
            </div>
          ) : (
            <div className="flex gap-6">
               {/* Li Bai Icon */}
               <div className="shrink-0 hidden md:block">
                 <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
                   🍶
                 </div>
               </div>
               
               {/* Answer Text */}
               <div className="prose prose-lg prose-blue max-w-none text-gray-700 font-serif leading-loose">
                 <p className="whitespace-pre-wrap">{answer}</p>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
             <span className="text-xs text-gray-400 italic">Answer based on historical records & poems</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerModal;
