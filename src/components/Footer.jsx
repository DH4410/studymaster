import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">StudyMaster</h3>
          <p className="text-slate-400">Making learning addictive and effective for everyone.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Product</h4>
          <ul className="space-y-2 text-slate-400">
            <li>Flashcards</li>
            <li>Quizzes</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-slate-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 text-slate-500">
        © 2024 StudyMaster Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;