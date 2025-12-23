import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Zap, BookOpen, Play, Flame, Trash2, 
  FileText, Folder, Lock, Clock, Target, MoreVertical
} from 'lucide-react';
import { generateFlashcards } from '../lib/gemini';
import { getStats, formatTime } from '../lib/stats'; // <--- IMPORT THIS

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isPro, setIsPro] = useState(false); 
  const [createMode, setCreateMode] = useState('topic');
  const [inputVal, setInputVal] = useState("");
  const [activeFolder, setActiveFolder] = useState('All'); 
  const [openMenuId, setOpenMenuId] = useState(null);

  // --- REAL STATS STATE ---
  const [stats, setStats] = useState(getStats());

  // --- DATA LOADING ---
  const [decks, setDecks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studyDecks') || "[]"); } 
    catch { return []; }
  });

  const [folders, setFolders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studyFolders') || '["Biology", "History", "Coding"]'); } 
    catch { return ["Biology", "History"]; }
  });

  // Watch for stats updates (from other tabs or components)
  useEffect(() => {
    const handleStorageChange = () => setStats(getStats());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('studyDecks', JSON.stringify(decks));
    localStorage.setItem('studyFolders', JSON.stringify(folders));
  }, [decks, folders]);

  // --- ACTIONS ---
  const handleCreate = async () => {
    if (!inputVal) return;
    if (!isPro && createMode === 'notes') {
        alert("Uploading Notes is a PRO feature. Toggle Pro Mode in the sidebar.");
        return;
    }
    setIsLoading(true);
    const cards = await generateFlashcards(inputVal, createMode);
    
    if (cards && cards.length > 0) {
        const newDeck = {
            id: Date.now(),
            title: createMode === 'notes' ? "Study Guide Notes" : inputVal,
            folder: activeFolder === 'All' ? 'Uncategorized' : activeFolder,
            cards: cards,
            lessonPlan: null,
            count: cards.length,
            color: 'bg-indigo-100 text-indigo-700'
        };
        setDecks([newDeck, ...decks]);
        setShowCreate(false);
        setInputVal("");
    } else {
        alert("⚠️ AI Generation Failed. Please use the Support Chat.");
    }
    setIsLoading(false);
  };

  const createFolder = () => {
    const name = prompt("Folder Name:");
    if (name && !folders.includes(name)) setFolders([...folders, name]);
  };

  const deleteDeck = (id) => {
    setDecks(decks.filter(d => d.id !== id));
    setOpenMenuId(null);
  };

  const moveDeck = (deckId, newFolder) => {
    const updated = decks.map(d => d.id === deckId ? { ...d, folder: newFolder } : d);
    setDecks(updated);
    setOpenMenuId(null);
  };

  const filteredDecks = activeFolder === 'All' ? decks : decks.filter(d => (d.folder || 'Uncategorized') === activeFolder);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900" onClick={() => setOpenMenuId(null)}>
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full hidden md:flex flex-col z-20">
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-indigo-600 flex items-center gap-2 tracking-tight">
            <Zap className="fill-indigo-600" /> StudyMaster
          </h2>
        </div>
        <nav className="px-4 space-y-1 flex-1 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase mb-2 px-2 mt-4 tracking-wider">My Workspace</div>
            <button onClick={() => setActiveFolder('All')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeFolder === 'All' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <BookOpen size={18}/> All Decks
            </button>
            {folders.map(folder => (
              <button key={folder} onClick={() => setActiveFolder(folder)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeFolder === folder ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Folder size={18}/> {folder}
              </button>
            ))}
            <button onClick={createFolder} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-indigo-600 text-sm mt-2 transition"><Plus size={16}/> New Folder</button>
        </nav>
        <div className="p-4 border-t border-slate-100">
           <button onClick={() => setIsPro(!isPro)} className={`w-full py-2.5 rounded-lg text-xs font-bold transition shadow-sm ${isPro ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
             {isPro ? "✨ PRO ACTIVE" : "UPGRADE TO PRO"}
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
             <h1 className="text-3xl font-bold text-slate-900">Good Afternoon, Student</h1>
             <p className="text-slate-500 mt-1">Ready to crush your goals today?</p>
          </div>
          <div className="flex gap-6 items-center">
             <div className="flex items-center gap-2 text-orange-500 font-bold bg-orange-50 px-4 py-2 rounded-full text-sm border border-orange-100">
                <Flame className="w-4 h-4 fill-orange-500" /> {stats.streak} Day Streak
             </div>
          </div>
        </header>

        {/* REAL STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                <div className="flex items-center gap-2 opacity-80 mb-2 text-sm font-medium"><Clock size={16}/> Study Time</div>
                <div className="text-3xl font-bold">{formatTime(stats.totalSeconds)}</div>
                <div className="text-xs mt-2 bg-indigo-400/30 w-fit px-2 py-1 rounded">Keep going!</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm font-medium"><Target size={16}/> Cards Mastered</div>
                <div className="text-3xl font-bold text-slate-800">{stats.cardsMastered}</div>
                <div className="text-xs mt-2 text-green-500 font-bold">Total cards learned</div>
            </div>
             <div onClick={(e) => { e.stopPropagation(); setShowCreate(true); }} className="bg-white border border-dashed border-indigo-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition group">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition"><Plus className="text-indigo-600" size={24} /></div>
                <div className="font-bold text-indigo-900">Create New Deck</div>
                <div className="text-xs text-indigo-400">AI Generated</div>
            </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                {activeFolder === 'All' ? <BookOpen size={20} className="text-indigo-600"/> : <Folder size={20} className="text-indigo-600"/>}
                {activeFolder} Library
            </h2>
            <p className="text-sm text-slate-400">{filteredDecks.length} Decks</p>
        </div>

        {/* CREATE MODAL */}
        {showCreate && (
             <div className="mb-10 bg-white p-8 rounded-2xl shadow-xl border border-indigo-100 animate-in fade-in zoom-in duration-300 relative z-30" onClick={(e) => e.stopPropagation()}>
                <button onClick={()=>setShowCreate(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><Plus className="rotate-45"/></button>
                <h3 className="text-xl font-bold mb-6">What do you want to study?</h3>
                <div className="flex gap-4 mb-6">
                    <button onClick={() => setCreateMode('topic')} className={`flex-1 py-3 rounded-xl border-2 font-bold transition flex items-center justify-center gap-2 ${createMode === 'topic' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-500'}`}><Zap size={16} /> Topic</button>
                    <button onClick={() => setCreateMode('notes')} className={`flex-1 py-3 rounded-xl border-2 font-bold transition flex items-center justify-center gap-2 ${createMode === 'notes' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-500'}`}><FileText size={16} /> Upload Notes {(!isPro) && <Lock size={14}/>}</button>
                </div>
                <div className="flex gap-4 items-start">
                   <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder={createMode === 'topic' ? "e.g. Physics" : "Paste notes..."} className="flex-1 bg-slate-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-lg" />
                   <button onClick={handleCreate} disabled={isLoading} className="metallic-btn text-white px-8 py-3 font-bold disabled:opacity-50 h-auto flex items-center gap-2 self-stretch justify-center">{isLoading ? "..." : "Generate"}</button>
                </div>
             </div>
        )}

        {/* DECKS GRID */}
        {filteredDecks.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No decks found in {activeFolder}. Create one above!</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {filteredDecks.map((deck) => (
                <div key={deck.id} className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                    <div className="flex justify-between items-start mb-4 relative">
                        <div className={`w-12 h-12 rounded-xl ${deck.color} flex items-center justify-center shadow-inner`}><BookOpen size={20} /></div>
                        <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === deck.id ? null : deck.id); }} className="text-slate-300 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition"><MoreVertical size={20} /></button>
                        {openMenuId === deck.id && (
                            <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-10 w-48 bg-white border border-slate-200 shadow-xl rounded-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-2 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Move to Folder</div>
                                {folders.map(folder => (
                                    <button key={folder} onClick={() => moveDeck(deck.id, folder)} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2"><Folder size={14} /> {folder}</button>
                                ))}
                                <div className="border-t border-slate-100 my-1"></div>
                                <button onClick={() => deleteDeck(deck.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14} /> Delete</button>
                            </div>
                        )}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">{deck.title}</h3>
                    <div className="flex items-center gap-2 mb-6"><span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wider">{deck.folder || 'Uncategorized'}</span><span className="text-xs text-slate-400">{deck.count} cards</span></div>
                    <div className="space-y-2">
                        <button onClick={() => navigate('/learn', { state: { deckId: deck.id } })} className="w-full bg-indigo-50 text-indigo-700 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-100 transition flex items-center justify-center gap-2"><Play size={14} className="fill-indigo-700" /> Start Module</button>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => navigate('/practice', { state: { deckId: deck.id } })} className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-50 transition">Practice</button>
                            <button onClick={() => navigate('/game', { state: { cards: deck.cards } })} className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-50 transition">Quiz</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;