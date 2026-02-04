
import React, { useState } from 'react';
import { UserProfile, Proficiency, LearningStyle, Timeline } from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

const StepForm: React.FC<Props> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    education: { degree: '', branch: '', year: '' },
    skills: [],
    proficiency: Proficiency.BEGINNER,
    targetRoles: [],
    availability: '',
    timeline: Timeline.SIX_MONTHS,
    learningStyle: LearningStyle.MIXED,
  });

  const [skillInput, setSkillInput] = useState('');
  const [roleInput, setRoleInput] = useState('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const addSkill = () => {
    if (skillInput.trim()) {
      setProfile(p => ({ ...p, skills: [...p.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const addRole = () => {
    if (roleInput.trim()) {
      setProfile(p => ({ ...p, targetRoles: [...p.targetRoles, roleInput.trim()] }));
      setRoleInput('');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800">Educational Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Degree (e.g. B.Tech)"
                value={profile.education.degree}
                onChange={e => setProfile({ ...profile, education: { ...profile.education, degree: e.target.value } })}
              />
              <input
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Branch (e.g. CS)"
                value={profile.education.branch}
                onChange={e => setProfile({ ...profile, education: { ...profile.education, branch: e.target.value } })}
              />
              <input
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none col-span-full"
                placeholder="Graduation Year"
                value={profile.education.year}
                onChange={e => setProfile({ ...profile, education: { ...profile.education, year: e.target.value } })}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Skills & Proficiency</h2>
            <div className="flex gap-2">
              <input
                className="flex-1 p-3 border rounded-lg"
                placeholder="Add a skill (e.g. React, Python, UI Design)"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
              />
              <button onClick={addSkill} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {s}
                  <button onClick={() => setProfile(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }))}>&times;</button>
                </span>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-600 mb-2">Overall Proficiency Level</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={profile.proficiency}
                onChange={e => setProfile({ ...profile, proficiency: e.target.value as Proficiency })}
              >
                {Object.values(Proficiency).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Career Goals</h2>
            <div className="flex gap-2">
              <input
                className="flex-1 p-3 border rounded-lg"
                placeholder="Target Job Role (e.g. Frontend Engineer)"
                value={roleInput}
                onChange={e => setRoleInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addRole()}
              />
              <button onClick={addRole} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.targetRoles.map((r, i) => (
                <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {r}
                  <button onClick={() => setProfile(p => ({ ...p, targetRoles: p.targetRoles.filter((_, idx) => idx !== i) }))}>&times;</button>
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Timeline</label>
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={profile.timeline}
                  onChange={e => setProfile({ ...profile, timeline: e.target.value as Timeline })}
                >
                  {Object.values(Timeline).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Learning Style</label>
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={profile.learningStyle}
                  onChange={e => setProfile({ ...profile, learningStyle: e.target.value as LearningStyle })}
                >
                  {Object.values(LearningStyle).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Time Availability (e.g. 10 hours/week)</label>
              <input
                className="w-full p-3 border rounded-lg"
                placeholder="Weekly hours"
                value={profile.availability}
                onChange={e => setProfile({ ...profile, availability: e.target.value })}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="mb-8 flex justify-between items-center">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              {i}
            </div>
            {i < 3 && <div className={`h-1 w-12 md:w-24 mx-2 ${step > i ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>
      
      {renderStep()}

      <div className="mt-10 flex justify-between">
        {step > 1 && (
          <button onClick={prevStep} className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">Back</button>
        )}
        <div className="flex-1" />
        {step < 3 ? (
          <button onClick={nextStep} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md">Continue</button>
        ) : (
          <button onClick={() => onSubmit(profile)} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md">Generate Roadmap</button>
        )}
      </div>
    </div>
  );
};

export default StepForm;
