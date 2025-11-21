import React, { useState, useEffect } from 'react';

const phrases = [
  "游历四方",
  "诗集创作",
  "情感表达"
];

const Typewriter: React.FC = () => {
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      // Speed adjustments
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        // Finished typing, pause before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before starting new word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-gray-900 mb-2">
        李白辉煌的一生
      </h1>
      <div className="text-5xl md:text-7xl font-bold tracking-tight leading-tight min-h-[1.2em]">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text animate-gradient-x">
          {text}
        </span>
        <span className="ml-1 inline-block w-1 h-12 md:h-16 bg-gray-800 animate-blink align-middle mb-2"></span>
      </div>
    </div>
  );
};

export default Typewriter;