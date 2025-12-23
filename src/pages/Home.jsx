import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Users, Brain, Play, Wallet, CheckCircle, 
  Star, ArrowRight, ChevronDown 
} from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-white">
      
      {/* --- 1. HERO SECTION --- */}
      <header className="relative pt-20 pb-20 lg:pt-32">
        {/* Abstract Background Blob */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 transform">
            <div className="h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New: Gemini 2.0 AI Model Integration
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Study smarter, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                not harder.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Stop wasting time making manual cards. Let our AI generate quizzes, flashcards, and lesson plans in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
              <Link to="/pricing" className="bg-indigo-600 text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight size={20} />
              </Link>
              <button className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 text-lg px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition">
                <Play className="w-5 h-5 fill-slate-700" /> Watch Demo
              </button>
            </div>

            {/* Crypto Notice Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500 bg-slate-50 w-fit px-4 py-2 rounded-lg border border-slate-200 mx-auto lg:mx-0">
              <Wallet size={16} className="text-indigo-500"/>
              <span>Now accepting <strong>Crypto Payments</strong> exclusively.</span>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl rotate-3 opacity-20 blur-xl group-hover:opacity-30 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Student Dashboard" 
              className="relative rounded-2xl shadow-2xl border border-slate-200 w-full object-cover h-[400px] lg:h-[500px] transform group-hover:-translate-y-1 transition duration-500"
            />
          </div>
        </div>
      </header>

      {/* --- 2. SOCIAL PROOF --- */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">Trusted by top achievers from</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black text-slate-800">HARVARD</span>
            <span className="text-2xl font-black text-slate-800">STANFORD</span>
            <span className="text-2xl font-black text-slate-800">MIT</span>
            <span className="text-2xl font-black text-slate-800">OXFORD</span>
            <span className="text-2xl font-black text-slate-800">CAMBRIDGE</span>
          </div>
        </div>
      </section>

      {/* --- 3. FEATURES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to ace the exam</h2>
          <p className="text-lg text-slate-600">We combine cognitive science with artificial intelligence to cut your study time in half.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
            <div className="bg-blue-100 p-4 w-14 h-14 flex items-center justify-center rounded-xl mb-6 text-blue-600">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Instant Generation</h3>
            <p className="text-slate-600 leading-relaxed">Paste your notes, or just type a topic. Our AI reads your material and creates the perfect study deck instantly.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300">
            <div className="bg-purple-100 p-4 w-14 h-14 flex items-center justify-center rounded-xl mb-6 text-purple-600">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Spaced Repetition</h3>
            <p className="text-slate-600 leading-relaxed">Our algorithm tracks what you forget and surfaces those cards right before you're about to lose the memory.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-green-100 transition-all duration-300">
            <div className="bg-green-100 p-4 w-14 h-14 flex items-center justify-center rounded-xl mb-6 text-green-600">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Gamified Learning</h3>
            <p className="text-slate-600 leading-relaxed">Turn studying into a game. Compete with friends, earn streaks, and master topics without the boredom.</p>
          </div>
        </div>
      </section>

      {/* --- 4. TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-slate-900 text-white px-6 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-600 blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Loved by 10,000+ Students</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Review 1 */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition duration-300">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-lg italic text-slate-300 mb-6 leading-relaxed">"I used to spend hours writing flashcards by hand. StudyMaster generates them in seconds from my lecture notes. It literally saved my Biology grade."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-lg">SJ</div>
                <div>
                  <div className="font-bold text-white">Sarah Jenkins</div>
                  <div className="text-indigo-300 text-sm">Pre-med Student @ NYU</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition duration-300">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-lg italic text-slate-300 mb-6 leading-relaxed">"Better than Quizlet. The interface is cleaner, no ads on the paid plan, and the AI actually understands complex engineering topics."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-lg">MT</div>
                <div>
                  <div className="font-bold text-white">Mike Thompson</div>
                  <div className="text-indigo-300 text-sm">Engineering @ UT Austin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. FAQ SECTION --- */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="group bg-white border border-slate-200 rounded-xl p-6 cursor-pointer open:ring-2 open:ring-indigo-100 open:border-indigo-200 transition">
            <summary className="font-bold text-lg text-slate-800 flex justify-between items-center list-none">
              Is there a free trial?
              <ChevronDown className="group-open:rotate-180 transition-transform text-slate-400"/>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">Yes! You can try the Pro features for 7 days completely free. No charges until the trial ends, and you can cancel anytime.</p>
          </details>

          <details className="group bg-white border border-slate-200 rounded-xl p-6 cursor-pointer open:ring-2 open:ring-indigo-100 open:border-indigo-200 transition">
            <summary className="font-bold text-lg text-slate-800 flex justify-between items-center list-none">
              Can I upload my own PDFs?
              <ChevronDown className="group-open:rotate-180 transition-transform text-slate-400"/>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">Absolutely. Pro users can paste text from PDFs, lecture notes, or essays, and our AI will extract the key concepts automatically.</p>
          </details>

          <details className="group bg-white border border-slate-200 rounded-xl p-6 cursor-pointer open:ring-2 open:ring-indigo-100 open:border-indigo-200 transition">
            <summary className="font-bold text-lg text-slate-800 flex justify-between items-center list-none">
              How do crypto payments work?
              <ChevronDown className="group-open:rotate-180 transition-transform text-slate-400"/>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">We accept Solana, Ethereum, and Bitcoin. Simply select your currency at checkout, scan the QR code with your wallet, and your account will be upgraded instantly upon confirmation.</p>
          </details>
        </div>
      </section>

      {/* --- 6. FINAL CTA --- */}
      <section className="py-20 bg-indigo-50 border-t border-indigo-100 text-center px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to improve your grades?</h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">Join thousands of students who are already learning faster with StudyMaster.</p>
        <Link to="/pricing" className="inline-flex items-center gap-2 bg-indigo-600 text-white text-lg px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-200">
          Get Started Now <ArrowRight size={20} />
        </Link>
        <p className="mt-4 text-sm text-slate-400">No credit card required for free tier.</p>
      </section>

    </div>
  );
};

export default Home;