
import React, { useState } from 'react';
import { UserProfile, ArchitectResponse } from './types';
import { analyzeCareer } from './services/geminiService';
import StepForm from './components/StepForm';
import AnalysisDashboard from './components/AnalysisDashboard';

const InnovativeLogo = () => (
  <div className="flex items-center justify-center">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-600">
      {/* Abstract Compass/Arrow Head */}
      <path 
        d="M12 3L17 15L12 13L7 15L12 3Z" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinejoin="round" 
      />
      
      {/* Roadmap Path Lines */}
      <path 
        d="M5 20L8 17M16 17L19 20" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-60"
      />
      
      {/* Connecting Nodes */}
      <circle cx="5" cy="20" r="1.5" fill="currentColor" />
      <circle cx="19" cy="20" r="1.5" fill="currentColor" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      
      {/* Central Connector */}
      <circle cx="12" cy="13" r="1.5" fill="white" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArchitectResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeCareer(profile);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Failed to generate career analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <InnovativeLogo />
            <h1 className="font-bold text-slate-800 text-xl tracking-tight hidden md:block">Career Architect</h1>
          </div>
          {result && (
            <button 
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              Start New Analysis
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {!result && !loading && (
        <div className="max-w-4xl mx-auto pt-16 pb-8 text-center px-4 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Design Your <span className="text-indigo-600">Future-Ready</span> Career
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Personalized AI-driven skill gap analysis, roadmaps, and project guides 
            crafted to bridge the gap between where you are and where you want to be.
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-pulse">
            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Architecting Your Path...</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Comparing your skills against 50,000+ industry data points to identify critical gaps and optimal projects.
              </p>
            </div>
            <div className="flex gap-2 text-indigo-500 font-mono text-sm">
              <span className="animate-bounce delay-100 italic">Analyzing Skills...</span>
              <span className="animate-bounce delay-200 italic">Simulating Career Paths...</span>
              <span className="animate-bounce delay-300 italic">Building Roadmap...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-center mb-8">
            <p className="font-medium">{error}</p>
            <button onClick={handleReset} className="mt-2 text-sm underline hover:text-rose-900">Try Again</button>
          </div>
        )}

        {!loading && !result && <StepForm onSubmit={handleSubmit} />}
        
        {!loading && result && <AnalysisDashboard data={result} />}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 Suhana S • Built with Gemini 3 for Enterprise-Grade Guidance
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
