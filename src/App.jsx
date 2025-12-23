import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// ... Keep existing imports ...
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GameMode from './pages/GameMode';
import Analytics from './pages/Analytics';
import Pricing from './pages/Pricing';
import PaymentSim from './pages/PaymentSim';
import PracticeMode from './pages/PracticeMode';
import LearnMode from './pages/LearnMode';
import SupportChat from './components/SupportChat'; // <--- IMPORT THIS

const AnimatedApp = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white relative"> {/* Added relative */}
      
      <div key={location.pathname} className="animate-page flex-1">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/pricing" element={<><Navbar /><Pricing /><Footer /></>} />
          <Route path="/payment-sim" element={<PaymentSim />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/game" element={<GameMode />} />
          <Route path="/practice" element={<PracticeMode />} />
          <Route path="/learn" element={<LearnMode />} />
        </Routes>
      </div>

      {/* Add the Chat Widget Here so it floats above everything */}
      <SupportChat /> 
      
    </div>
  );
};

function App() {
  return (
    <Router>
      <AnimatedApp />
    </Router>
  );
}

export default App;