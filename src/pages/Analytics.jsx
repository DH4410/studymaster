import React, { useState } from 'react';
import { BarChart2, TrendingUp, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  // Pull real data from local storage
  const decks = JSON.parse(localStorage.getItem('studyDecks') || "[]");
  
  // Calculate Stats
  const totalCards = decks.reduce((acc, curr) => acc + curr.count, 0);
  const totalDecks = decks.length;

  // FIX: Calculate the random number strictly once when the component loads
  // using useState(() => ...). This satisfies the linter.
  const [masteryScore] = useState(() => 
    totalDecks > 0 ? Math.floor(Math.random() * 30) + 60 : 0
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center gap-4">
        <Link to="/dashboard" className="p-2 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
            <ArrowLeft className="text-slate-600" />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Performance Analytics</h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><CheckCircle /></div>
                    <span className="text-slate-500 font-semibold">Total Cards</span>
                </div>
                <div className="text-4xl font-bold text-slate-800">{totalCards}</div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg"><TrendingUp /></div>
                    <span className="text-slate-500 font-semibold">Mastery Rate</span>
                </div>
                <div className="text-4xl font-bold text-slate-800">{masteryScore}%</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Clock /></div>
                    <span className="text-slate-500 font-semibold">Study Streak</span>
                </div>
                <div className="text-4xl font-bold text-slate-800">3 Days</div>
            </div>
        </div>

        {/* Activity Chart (CSS Bar Chart) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-6">Study Activity (Last 7 Days)</h3>
            <div className="flex items-end justify-between h-64 gap-2">
                {[40, 70, 30, 85, 50, 90, 60].map((h, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-2 group">
                        <div className="relative w-full bg-slate-100 rounded-t-xl overflow-hidden h-full">
                            <div 
                                style={{ height: `${h}%` }} 
                                className="absolute bottom-0 w-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-500 rounded-t-xl"
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Breakdown List */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-6">Deck Breakdown</h3>
            <div className="space-y-4">
                {decks.map((deck) => (
                    <div key={deck.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50">
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${deck.color?.split(' ')[0] || 'bg-gray-400'}`}></div>
                            <span className="font-bold text-slate-700">{deck.title}</span>
                        </div>
                        <div className="text-slate-500">{deck.count} cards</div>
                    </div>
                ))}
                {decks.length === 0 && <p className="text-slate-400 italic">No decks created yet.</p>}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;