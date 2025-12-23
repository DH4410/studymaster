import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="py-20 px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-gray-600">Choose the plan that fits your study needs.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="border border-gray-200 rounded-2xl p-8 bg-white">
          <h3 className="text-xl font-bold">Basic</h3>
          <div className="text-4xl font-bold my-4">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <p className="text-gray-500 mb-6">For casual learners.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> 50 Flashcards</li>
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> Basic Quizzes</li>
          </ul>
          <Link to="/dashboard" className="block w-full text-center py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50">
            Get Started Free
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="border-2 border-indigo-600 rounded-2xl p-8 bg-white relative shadow-xl transform scale-105">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
          <h3 className="text-xl font-bold">Pro Student</h3>
          <div className="text-4xl font-bold my-4">$9<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <p className="text-gray-500 mb-6">For serious exam prep.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> Unlimited Flashcards</li>
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> Kahoot-style Games</li>
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> AI Generation</li>
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> Remove Ads</li>
          </ul>
          <Link to="/payment-sim" className="block w-full text-center py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
            Subscribe Now
          </Link>
        </div>

        {/* Team Plan */}
        <div className="border border-gray-200 rounded-2xl p-8 bg-white">
          <h3 className="text-xl font-bold">Classroom</h3>
          <div className="text-4xl font-bold my-4">$29<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <p className="text-gray-500 mb-6">For teachers & tutors.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> Everything in Pro</li>
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> Student Management</li>
            <li className="flex gap-2"><Check className="w-5 text-green-500"/> Analytics Dashboard</li>
          </ul>
          <Link to="/payment-sim" className="block w-full text-center py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;