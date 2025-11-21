import React, { useState } from 'react';
import Typewriter from './components/Typewriter';
import Portrait from './components/Portrait';
import SearchSection from './components/SearchSection';
import LifePage from './components/LifePage';
import EmotionMapPage from './components/EmotionMapPage';
import FootprintMapPage from './components/FootprintMapPage';

type ViewState = 'home' | 'life' | 'emotion' | 'map';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Render Full Page Views
  if (currentView === 'life') {
    return <LifePage onBack={() => setCurrentView('home')} />;
  }
  if (currentView === 'emotion') {
    return <EmotionMapPage onBack={() => setCurrentView('home')} />;
  }
  if (currentView === 'map') {
    return <FootprintMapPage onBack={() => setCurrentView('home')} />;
  }

  // Render Home Page
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      {/* Header */}
      <header className="px-8 py-8 md:px-16 md:py-10 flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto z-20 relative">
        <div className="text-2xl font-bold tracking-widest uppercase font-sans text-gray-900 mb-4 md:mb-0 cursor-pointer" onClick={() => setCurrentView('home')}>
          LI BAI
        </div>
        <nav className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setCurrentView('life')}
            className="group px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">📜</span> 
            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">诗仙生平</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('emotion')}
            className="group px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-red-400 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">📊</span> 
            <span className="text-sm font-medium text-gray-600 group-hover:text-red-600">情感图谱</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('map')}
            className="group px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">🌏</span> 
            <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600">足迹漫游</span>
          </button>
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="px-8 md:px-16 pt-10 md:pt-20 max-w-7xl mx-auto pb-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Text & Typography */}
          <div className="w-full lg:w-3/5 z-10">
            <Typewriter />

            <div className="mt-8 max-w-lg">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-serif">
                我是李白，一位流浪于天地间的诗仙。
                <br/>
                帮助世人感受盛唐气象，
                <br/>
                用诗歌连接古今，以酒入道，探寻自由与浪漫的真谛。
              </p>
            </div>
          </div>

          {/* Right Side: Portrait */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
             <Portrait />
          </div>
        </div>

        {/* Bottom Center: Search */}
        <div className="mt-16 w-full flex flex-col items-center">
            <SearchSection />
        </div>
      </main>

      {/* Decorative Footer */}
      <footer className="absolute bottom-4 w-full text-center text-gray-400 text-xs font-serif">
        <p>&copy; 701-762 Tang Dynasty. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;