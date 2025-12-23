import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ExternalLink, Youtube } from 'lucide-react';
import { generateLessonPlan } from '../lib/gemini';
import { addStudyTime } from '../lib/stats'; // Import


const LearnMode = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
    useEffect(() => {
    const timer = setInterval(() => {
      addStudyTime(10);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // 1. Load Data Synchronously (Fixes the "setState in Effect" warning)
  const [allDecks, setAllDecks] = useState(() => JSON.parse(localStorage.getItem('studyDecks') || "[]"));
  const deckIndex = allDecks.findIndex(d => d.id === state?.deckId);
  const currentDeck = allDecks[deckIndex];

  // 2. Initialize Lesson from Cache immediately if it exists
  const [lesson, setLesson] = useState(() => {
    return currentDeck?.lessonPlan || null;
  });

  // 3. Fetch ONLY if lesson is missing
  useEffect(() => {
    // Safety check: redirect if deck doesn't exist
    if (!currentDeck) { 
      navigate('/dashboard'); 
      return; 
    }

    // If we already have the lesson (from step 2), stop here.
    if (lesson) return;

    // Otherwise, generate it
    let isMounted = true;
    generateLessonPlan(currentDeck.title).then(data => {
      if (!isMounted || !data) return;

      setLesson(data);
      
      // Update Cache
      setAllDecks(prevDecks => {
        const newDecks = [...prevDecks];
        if (newDecks[deckIndex]) {
          newDecks[deckIndex].lessonPlan = data;
          localStorage.setItem('studyDecks', JSON.stringify(newDecks));
        }
        return newDecks;
      });
    });

    return () => { isMounted = false; };
  }, [currentDeck, deckIndex, lesson, navigate]); // Dependencies now correct

// ... inside LearnMode.jsx ...

  // ERROR STATE: If lesson failed to load after logic ran
  if (!lesson && !currentDeck) return <div>Redirecting...</div>;

  if (!lesson) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white gap-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="text-slate-500 font-bold animate-pulse">Designing your lesson plan...</p>
      
      {/* Add a manual Retry Button in case it gets stuck */}
      <button 
        onClick={() => window.location.reload()} 
        className="text-indigo-600 text-sm hover:underline mt-4"
      >
        Taking too long? Click to Retry.
      </button>
    </div>
  );

  return ( 
    // ... existing return code ...
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <div className="bg-slate-900 text-white pt-8 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest mb-4 border border-indigo-500/30">
            STUDY GUIDE
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{lesson.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-12 pb-24 space-y-8">
        
        {/* VIDEO CARD */}
        {lesson.youtubeQuery && (
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
               <Youtube className="absolute -right-10 -bottom-10 text-red-800 opacity-50" size={200} />
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Youtube className="text-white" /> 
                    <span className="font-bold tracking-wider text-sm">VIDEO RESOURCE</span>
                  </div>
                  <h3 className="text-xl font-bold opacity-90">Watch a quick tutorial</h3>
               </div>
               <a 
                 href={`https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeQuery)}`} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="relative z-10 bg-white text-red-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-red-50 transition shadow-lg whitespace-nowrap"
               >
                 Find Video <ExternalLink size={16} />
               </a>
          </div>
        )}

        {/* CONTENT MODULES */}
        <div className="space-y-6">
            {lesson.modules?.map((mod, i) => (
                <section key={i} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                        <span className="bg-indigo-50 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">{i+1}</span>
                        {mod.heading}
                    </h2>
                    {/* Render HTML content safely */}
                    <div 
                        className="prose prose-slate max-w-none prose-li:marker:text-indigo-500 prose-ul:space-y-1"
                        dangerouslySetInnerHTML={{ __html: mod.content }} 
                    />
                </section>
            ))}
        </div>

        <div className="flex justify-center pt-8">
            <button 
              onClick={() => navigate('/practice', { state: { deckId: currentDeck.id } })} 
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-xl shadow-indigo-200"
            >
                Start Flashcards <ArrowRight />
            </button>
        </div>
      </div>
    </div>
  );
};

export default LearnMode;