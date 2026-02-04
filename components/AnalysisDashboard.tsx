
import React from 'react';
import { ArchitectResponse } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface Props {
  data: ArchitectResponse;
}

const AnalysisDashboard: React.FC<Props> = ({ data }) => {
  const chartData = [
    { name: 'Strong', value: data.skillGapAnalysis.strong.length, color: '#10b981' },
    { name: 'Partial', value: data.skillGapAnalysis.partial.length, color: '#f59e0b' },
    { name: 'Missing', value: data.skillGapAnalysis.missing.length, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      {/* Overview Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">🔍</span>
            Skill Gap Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Strong Match</p>
              <ul className="space-y-1">
                {data.skillGapAnalysis.strong.map((s, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Partial Match</p>
              <ul className="space-y-1">
                {data.skillGapAnalysis.partial.map((s, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
              <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">Critical Gaps</p>
              <ul className="space-y-1">
                {data.skillGapAnalysis.missing.map((s, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">Career Readiness</h2>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * data.readinessScore) / 100} className="text-indigo-600 transition-all duration-1000" />
            </svg>
            <span className="absolute text-3xl font-black text-slate-800">{data.readinessScore}%</span>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center italic">"{data.reasoning}"</p>
        </div>
      </div>

      {/* Career Path Simulation */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="p-2 bg-purple-100 rounded-lg text-purple-600">🛣️</span>
          Recommended Career Paths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.paths.map((path, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-indigo-700">{path.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${path.confidenceScore > 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                  {path.confidenceScore}% Confidence
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-4">{path.description}</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>Readiness Level</span>
                    <span>{path.readinessLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${path.readinessLevel}%` }} />
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 italic border-l-4 border-indigo-400">
                  <strong>Trade-off:</strong> {path.tradeOffs}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Action Plan */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <span className="p-2 bg-emerald-100 rounded-lg text-emerald-600">🗓️</span>
          30-Day Action Plan
        </h2>
        <div className="space-y-12 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
          {data.actionPlan.map((week, i) => (
            <div key={i} className="relative pl-12 group">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-4 border-indigo-600 flex items-center justify-center font-black text-indigo-600 z-10 group-hover:scale-110 transition">
                {week.week}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{week.focus}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {week.tasks.map((task, tidx) => (
                    <div key={tidx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl text-sm text-slate-700">
                      <span className="mt-1 w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Suggestions */}
      <div className="bg-slate-900 p-8 rounded-3xl text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="p-2 bg-white/10 rounded-lg text-white">🧪</span>
          Resume-Worthy Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.projects.map((project, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition">
              <h3 className="text-lg font-bold mb-2 text-indigo-300">{project.name}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.relevance}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skillsGained.map((s, si) => (
                  <span key={si} className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                    {s}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Showcase Strategy</p>
                <p className="text-xs text-slate-300 italic">{project.githubStrategy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Engine */}
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
        <h2 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
          <span className="p-1 bg-amber-200 rounded text-amber-900">⚡</span>
          Architect's Optimization Advice
        </h2>
        <p className="text-amber-900/80 leading-relaxed text-sm">
          {data.optimizationAdvice}
        </p>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
