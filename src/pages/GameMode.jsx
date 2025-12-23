import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, CheckCircle, Trophy, LogOut } from 'lucide-react';
import { addStudyTime, addMasteredCard } from '../lib/stats'; // Import


const GameMode = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cards = state?.cards || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState('playing'); 
  const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
    const timer = setInterval(() => {
      addStudyTime(10);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { handleAnswer(null); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const isCorrect = option === cards[currentIndex].answer;
    if (isCorrect) {
       addMasteredCard();
    }
    if (isCorrect) setScore(prev => prev + (timeLeft * 10) + 100);
    setGameState('feedback');
    setTimeout(() => {
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex(prev => prev + 1); setTimeLeft(15); setGameState('playing'); setSelectedOption(null);
      } else { setGameState('finished'); }
    }, 2000);
  };

  if (!cards.length) return <div>No cards loaded</div>;

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-indigo-900 flex items-center justify-center text-white p-4">
        <div className="bg-indigo-800 p-10 rounded-3xl text-center max-w-lg w-full shadow-2xl border border-indigo-700">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <div className="bg-indigo-900/50 p-6 rounded-xl mb-8 mt-6">
            <div className="text-sm uppercase tracking-widest text-indigo-300">Final Score</div>
            <div className="text-6xl font-black text-white">{score}</div>
          </div>
          <button onClick={() => navigate('/dashboard')} className="w-full bg-white text-indigo-900 py-4 rounded-xl font-bold hover:bg-indigo-50 transition">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      
      {/* HEADER WITH EXIT BUTTON */}
      <div className="bg-slate-800 p-4 flex justify-between items-center text-white px-8 border-b border-slate-700">
        <div className="flex items-center gap-4">
             {/* EXIT BUTTON */}
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-700 px-3 py-1.5 rounded-lg transition">
                <LogOut size={16} /> Exit
            </button>
            <span className="bg-slate-700 px-3 py-1 rounded-lg text-sm font-mono">Q: {currentIndex + 1}/{cards.length}</span>
        </div>
        <div className="text-2xl font-black text-indigo-400">{score}</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-4xl bg-slate-700 h-3 rounded-full mb-8 overflow-hidden border border-slate-600">
            <div className="bg-purple-500 h-full transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl w-full mb-10 min-h-[200px] flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight">{currentCard.question}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            {currentCard.options.map((opt, idx) => {
                const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentCard.answer;
                let styleClass = `${colors[idx]} hover:brightness-110`;
                
                if (gameState === 'feedback') {
                    if (isCorrect) styleClass = "bg-green-600 ring-4 ring-green-300 opacity-100 scale-105";
                    else if (isSelected && !isCorrect) styleClass = "bg-red-600 opacity-50";
                    else styleClass = "bg-slate-600 opacity-20";
                }

                return (
                    <button key={idx} disabled={gameState !== 'playing'} onClick={() => handleAnswer(opt)} className={`${styleClass} h-24 rounded-xl text-white text-xl font-bold shadow-lg transition-all transform active:scale-95 flex items-center justify-center p-4 border-b-4 border-black/20`}>
                        {opt}
                    </button>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default GameMode;