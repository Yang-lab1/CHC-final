import React from 'react';

interface LifePageProps {
  onBack: () => void;
}

const LifePage: React.FC<LifePageProps> = ({ onBack }) => {
  const events = [
    { year: '701', title: '碎叶降生', desc: '李白出生于碎叶城（今吉尔吉斯斯坦托克马克），五岁时随父迁居蜀中。' },
    { year: '724', title: '仗剑去国', desc: '二十四岁，辞亲远游，出三峡，泛洞庭，东游吴越，开始了他“游历四方”的壮丽人生。' },
    { year: '742', title: '翰林供奉', desc: '受唐玄宗征召入京，供奉翰林。这一时期他才华横溢，“力士脱靴，贵妃研墨”，留下了《清平调》等名作。' },
    { year: '744', title: '赐金放还', desc: '因性格傲岸，得罪权贵，被“赐金放还”。随后在洛阳与杜甫相遇，成就了中国文学史上最伟大的友谊之一。' },
    { year: '755', title: '避乱江南', desc: '安史之乱爆发，李白避难江南，心中充满了对国家命运的担忧，“中原乱，簪缨散，几时收？”。' },
    { year: '757', title: '夜郎流放', desc: '因卷入永王李璘案，被流放夜郎（今贵州境内）。行至白帝城遇赦得还，写下千古绝唱《早发白帝城》。' },
    { year: '762', title: '揽月长眠', desc: '病逝于当涂，享年六十二岁。传说其醉后在江中捉月而死，极具浪漫主义色彩。' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-gray-800 font-serif animate-fade-in">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-stone-50/90 backdrop-blur-md border-b border-stone-200 z-20 px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-widest">诗仙生平</h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>✕</span> 返回主页
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-24 pb-20 px-6">
        <div className="relative border-l-2 border-stone-300 ml-6 md:ml-12 space-y-16">
          {events.map((event, index) => (
            <div key={index} className="relative pl-8 md:pl-16 group">
              {/* Dot */}
              <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-stone-100 border-4 border-gray-400 group-hover:border-blue-600 group-hover:scale-125 transition-all duration-300"></div>
              
              {/* Year */}
              <div className="absolute -left-16 md:-left-24 top-0 text-right w-12 md:w-20">
                <span className="text-lg md:text-xl font-bold text-gray-400 group-hover:text-blue-600 transition-colors font-sans">{event.year}</span>
              </div>

              {/* Content Card */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifePage;