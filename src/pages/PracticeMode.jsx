import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCw, ArrowLeft, ArrowRight, X, HelpCircle, Brain } from 'lucide-react';
import { addStudyTime, addMasteredCard } from '../lib/stats'; // Import


const PracticeMode = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const allDecks = JSON.parse(localStorage.getItem('studyDecks') || "[]");
  const deck = allDecks.find(d => d.id === state?.deckId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      addStudyTime(10);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  if (!deck) return <div className="p-10">Deck not found.</div>;
  const card = deck.cards[currentIndex];
  const handleNext = () => { addMasteredCard(); setIsFlipped(false); setTimeout(() => currentIndex < deck.cards.length - 1 && setCurrentIndex(p => p + 1), 150); };
  const handlePrev = () => { setIsFlipped(false); setTimeout(() => currentIndex > 0 && setCurrentIndex(p => p - 1), 150); };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-200 rounded-full"><X className="text-slate-500" /></button>
        <div className="font-bold text-slate-700 bg-white px-4 py-1 rounded-full shadow-sm">{currentIndex + 1} / {deck.cards.length}</div>
        <button onClick={() => setIsFlipped(!isFlipped)} className="text-indigo-600 font-bold flex items-center gap-2 hover:bg-indigo-50 px-3 py-1 rounded-lg transition"><RotateCw size={16} /> Flip</button>
      </div>

      {/* CARD CONTAINER */}
      <div 
        className="relative w-full max-w-2xl aspect-[3/2] cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
          
          {/* FRONT: QUESTION (White) */}
          <div 
            className="absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center border-b-4 border-slate-200 backface-hidden"
            style={{ backfaceVisibility: 'hidden', zIndex: 2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{card.question}</h2>
            <div className="absolute bottom-6 text-slate-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
               <HelpCircle size={14}/> Question
            </div>
          </div>

          {/* BACK: ANSWER (Blue) */}
          <div 
            className="absolute inset-0 bg-indigo-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white border-b-4 border-indigo-800 backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', zIndex: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">{card.answer}</h2>
            {card.explanation && (
                <div className="bg-indigo-800/50 p-4 rounded-xl text-indigo-100 text-sm leading-relaxed max-w-md">
                  <div className="flex items-center justify-center gap-2 font-bold uppercase text-[10px] opacity-70 mb-1"><Brain size={12}/> Explanation</div>
                  {card.explanation}
                </div>
            )}
            <div className="absolute bottom-6 text-indigo-300 text-xs uppercase tracking-widest font-bold">Answer</div>
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-6 mt-10">
        <button onClick={(e)=>{e.stopPropagation(); handlePrev()}} disabled={currentIndex===0} className="p-4 bg-white rounded-full shadow-md disabled:opacity-50 hover:scale-105 transition"><ArrowLeft /></button>
        <button onClick={(e)=>{e.stopPropagation(); handleNext()}} disabled={currentIndex===deck.cards.length-1} className="p-4 bg-indigo-600 text-white rounded-full shadow-md disabled:opacity-50 hover:scale-105 transition"><ArrowRight /></button>
      </div>
    </div>
  );
};

export default PracticeMode;