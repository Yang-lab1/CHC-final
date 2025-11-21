
import React, { useState } from 'react';
import { askLiBai } from '../services/geminiService';
import AnswerModal from './AnswerModal';

const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLastQuery(query);
    setIsModalOpen(true); // Open modal immediately
    setLoading(true);
    setResponse(null);
    
    // Fetch answer
    const answer = await askLiBai(query);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto mt-16 mb-20 px-4">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-white rounded-3xl leading-none divide-x divide-gray-200 shadow-sm">
            <span className="pl-6 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="问问李白关于他的诗歌或生活..." 
              className="w-full p-5 text-gray-900 placeholder-gray-400 bg-transparent border-0 ring-0 outline-none focus:ring-0 text-lg font-serif"
            />
            <button 
              type="submit"
              disabled={loading}
              className="px-6 py-4 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 rounded-r-3xl flex items-center justify-center"
              title="Send"
            >
              <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <AnswerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        question={lastQuery}
        answer={response}
        loading={loading}
      />
    </>
  );
};

export default SearchSection;
