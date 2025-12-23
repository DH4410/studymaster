import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, Copy, ArrowLeft, ShieldCheck, 
  Wallet, Zap, Lock, ChevronRight, Clock, CreditCard, Star
} from 'lucide-react';

const PaymentSim = () => {
  const navigate = useNavigate();
  const [selectedChain, setSelectedChain] = useState(null);
  const [status, setStatus] = useState('idle'); 
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const WALLETS = {
    SOL: { id: 'SOL', name: 'Solana', symbol: 'SOL', network: 'Solana', address: 'EtJbaD4BBioZ3UJGScn2yKH9kBGBnRFHmsSDHX5jdJG8', amount: 0.06, color: 'bg-purple-600', icon: 'S' },
    ETH: { id: 'ETH', name: 'Ethereum', symbol: 'ETH', network: 'ERC-20', address: '0xCd7847960Af8029DEB5BC48bFd98e3c8121E62Ff', amount: 0.0035, color: 'bg-blue-600', icon: 'Ξ' },
    BTC: { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin', address: 'bc1px4tp75524vcwwpqra7y4tmca5atxmjqw73vkuveucktu9agzyrlsjy6dzh', amount: 0.00015, color: 'bg-orange-500', icon: '₿' }
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    setStatus('verifying');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => navigate('/dashboard'), 3000);
    }, 4000);
  };

  // --- RIGHT PANEL (INFO & TRUST) ---
  const renderInfoPanel = () => (
    <div className="hidden lg:flex flex-col justify-between w-[45%] bg-slate-900 text-white p-12 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="font-bold text-2xl tracking-tight">StudyMaster Pro</span>
        </div>

        <div className="space-y-8">
          <div>
            <span className="text-slate-400 text-lg">Total due today</span>
            <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold tracking-tight">$9.00</span>
                <span className="text-slate-400">/ lifetime</span>
            </div>
          </div>
          
          <div className="space-y-5 pt-8 border-t border-slate-700/50">
            {[
                "Unlimited AI Flashcards & Quizzes",
                "Upload PDFs & Study Guides",
                "Advanced Progress Analytics",
                "Priority Support",
                "Ad-Free Experience"
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0"><Check size={14}/></div>
                    {item}
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Block to Fill Space */}
      <div className="relative z-10 mt-12 bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
        <div className="flex gap-1 text-yellow-400 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
        </div>
        <p className="text-slate-300 italic text-sm mb-4">"StudyMaster helped me pass my medical boards. The AI generation is insanely accurate."</p>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs">SJ</div>
            <div>
                <div className="text-xs font-bold text-white">Sarah Jenkins</div>
                <div className="text-[10px] text-slate-400">Stanford University</div>
            </div>
        </div>
      </div>

      <div className="relative z-10 text-xs text-slate-500 flex items-center gap-2 mt-8">
        <ShieldCheck size={14} /> Encrypted. Anonymous. Secure.
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="text-indigo-600" size={24} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifying Transaction</h2>
      <p className="text-slate-500 max-w-sm">Scanning blockchain network for confirmation...</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-300">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Access Granted</h2>
      <p className="text-slate-500 mb-8 max-w-sm">Welcome to Pro. Redirecting you to your dashboard...</p>
      <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 animate-[progress_3s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* 1. LEFT PANEL (PAYMENT) */}
      {status === 'success' ? renderSuccess() : status === 'verifying' ? renderProcessing() : (
        <div className="flex-1 overflow-y-auto border-r border-slate-100">
          <div className="max-w-xl mx-auto p-8 lg:p-12 xl:p-16">
            
            <button onClick={() => navigate('/pricing')} className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" /> Back
            </button>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">Select Payment Method</h1>
            <p className="text-slate-500 mb-8">Secure and anonymous checkout.</p>

            {/* STRIPE (DISABLED) */}
            <div className="mb-6 opacity-60 relative group cursor-not-allowed">
                <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg z-10 border-l border-b border-slate-200">
                    COMING SOON
                </div>
                <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400">
                            <CreditCard size={18} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-500">Credit Card</div>
                            <div className="text-xs text-slate-400">Powered by Stripe</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] bg-slate-200 flex-1"></div>
                <span className="text-xs text-slate-400 font-bold uppercase">Or pay with Crypto</span>
                <div className="h-[1px] bg-slate-200 flex-1"></div>
            </div>

            {/* CRYPTO SELECTOR */}
            <div className="space-y-4 mb-8">
              {Object.values(WALLETS).map((wallet) => {
                const isSelected = selectedChain === wallet.id;
                return (
                  <div 
                    key={wallet.id}
                    onClick={() => setSelectedChain(wallet.id)}
                    className={`rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/10 shadow-md ring-1 ring-indigo-600' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${wallet.color} flex items-center justify-center text-white font-bold`}>
                          {wallet.icon}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{wallet.name}</div>
                          <div className="text-xs text-slate-500">{wallet.network}</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="p-6 pt-0 border-t border-slate-200/50 mt-2 animate-in slide-in-from-top-2">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 mt-4 flex flex-col items-center text-center">
                          <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm mb-4">
                             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${wallet.address}`} alt="QR" className="w-32 h-32"/>
                          </div>
                          
                          <p className="text-sm text-slate-500 mb-2">Send exactly:</p>
                          <div className="text-xl font-mono font-bold text-slate-900 mb-6 tracking-tight">
                            {wallet.amount} {wallet.symbol}
                          </div>

                          <div className="w-full relative group">
                            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-xs font-mono text-slate-600 break-all text-left">
                              {wallet.address}
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleCopy(wallet.address); }}
                              className="absolute top-1 right-1 bottom-1 bg-white border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 px-3 rounded-md flex items-center gap-2 text-xs font-bold text-slate-500 transition shadow-sm"
                            >
                              {copied ? (<><Check size={14} className="text-green-600"/> Copied</>) : (<><Copy size={14}/> Copy</>)}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 text-xs text-slate-400 px-1">
                           <div className="flex items-center gap-1"><Clock size={12}/> Rate expires: {formatTime(timeLeft)}</div>
                           <div>Network Fee ~ $0.45</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button 
              onClick={handlePayment}
              disabled={!selectedChain}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                selectedChain 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {selectedChain ? `I have sent ${WALLETS[selectedChain].amount} ${WALLETS[selectedChain].symbol}` : 'Select a currency'}
              {selectedChain && <ChevronRight size={20} />}
            </button>

          </div>
        </div>
      )}

      {/* 2. RIGHT PANEL (INFO/TOTAL) */}
      {renderInfoPanel()}

    </div>
  );
};

export default PaymentSim;