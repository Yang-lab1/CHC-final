import React from 'react';

interface LifeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LifeModal: React.FC<LifeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const events = [
    { year: '701', title: '出生', desc: '李白出生于碎叶城（今吉尔吉斯斯坦托克马克），一说出生于蜀中。' },
    { year: '724', title: '辞亲远游', desc: '二十四岁，离开故乡，踏上漫游四方的征途，“仗剑去国，辞亲远游”。' },
    { year: '742', title: '奉诏入京', desc: '受唐玄宗征召入京，供奉翰林。力士脱靴，贵妃研墨，风光无限。' },
    { year: '744', title: '赐金放还', desc: '因得罪权贵，被“赐金放还”。随后与杜甫在洛阳相遇，结下深厚友谊。' },
    { year: '755', title: '安史之乱', desc: '安史之乱爆发，李白避难江南。' },
    { year: '757', title: '流放夜郎', desc: '因卷入永王李璘案，被流放夜郎（今贵州境内）。途中遇赦得还。' },
    { year: '762', title: '捉月飞仙', desc: '病逝于当涂，享年六十二岁。传说其醉后水中捉月而死，充满浪漫色彩。' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">诗仙生平</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-300 group-hover:bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <span className="text-xs font-bold">{event.year}</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-gray-900">{event.title}</div>
                </div>
                <div className="text-gray-600 text-sm">{event.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifeModal;