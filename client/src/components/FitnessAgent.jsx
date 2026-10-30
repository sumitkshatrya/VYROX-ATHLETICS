import React, { useState } from 'react';
import { Sparkles, Dumbbell, Flame, HeartPulse, Shield, Compass, ArrowRight, ArrowLeft, Loader2, AlertCircle, X } from 'lucide-react';
import { getFitnessPlan } from '../services/aiService';
import WorkoutPlan from './WorkoutPlan';

export default function FitnessAgent({ isOpen, onClose, initialGoal }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [error, setError] = useState(null);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const [preferences, setPreferences] = useState({
    goal: initialGoal || '',
    experience: 'Intermediate',
    daysPerWeek: 4,
    duration: '60',
    equipment: 'Full Commercial Gym',
    location: 'Gym',
    limitations: '',
  });

  const goals = [
    {
      id: 'Build muscle',
      title: 'Build Muscle & Hypertrophy',
      desc: 'Maximize lean tissue, optimize mechanical tension, and sculpt athletic proportions.',
      icon: Dumbbell,
    },
    {
      id: 'Lose body fat',
      title: 'Lose Body Fat & Shred',
      desc: 'High-density metabolic circuits, sprint intervals, and caloric expenditure.',
      icon: Flame,
    },
    {
      id: 'Improve strength',
      title: 'Maximize Pure Strength',
      desc: 'Heavy barbell compound lifts, neural recruitment, and power progression.',
      icon: Shield,
    },
    {
      id: 'Improve general fitness',
      title: 'General Athletic Fitness',
      desc: 'A complete balance of functional strength, mobility, stamina, and cardiovascular health.',
      icon: HeartPulse,
    },
    {
      id: 'Start exercising as a beginner',
      title: 'Beginner Lifting Fundamentals',
      desc: 'Learn proper form safely, build gym confidence, and establish consistent weekly habits.',
      icon: Compass,
    },
  ];

  const handleGoalSelect = (goalTitle) => {
    setPreferences((prev) => ({ ...prev, goal: goalTitle }));
    setStep(2);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setLoadingStage(0);

    // Simulate athletic step animations for polished UX
    const stageTimer1 = setTimeout(() => setLoadingStage(1), 1000);
    const stageTimer2 = setTimeout(() => setLoadingStage(2), 2200);

    try {
      const response = await getFitnessPlan(preferences);
      if (response && response.plan) {
        setGeneratedPlan(response.plan);
        setStep(4);
      } else {
        throw new Error('Invalid plan structure received.');
      }
    } catch (err) {
      console.error('Plan generation error:', err);
      setError(err.message || 'Unable to generate workout plan. Please try again.');
    } finally {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-vyrox-950 border-2 border-vyrox-red/70 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-vyrox-900 via-vyrox-850 to-vyrox-900 border-b border-vyrox-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vyrox-red/20 border border-vyrox-red/50 flex items-center justify-center text-vyrox-crimson shadow-crimson-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 id="agent-title" className="font-athletic text-2xl font-bold text-white tracking-wide uppercase">
                VYROX AI FITNESS AGENT
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                Goal-Oriented AI Workout Programming & Split Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-vyrox-850 hover:bg-vyrox-red text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-vyrox-red"
            aria-label="Close AI Fitness Agent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: Select Goal */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-vyrox-crimson bg-vyrox-900 px-3 py-1 rounded-full border border-vyrox-800">
                  Step 1 of 3: Primary Objective
                </span>
                <h3 className="font-athletic text-3xl sm:text-4xl font-bold text-white uppercase mt-3">
                  What is your primary fitness goal?
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Select your current focus so our AI can calibrate optimal training volume and intensity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = preferences.goal === goal.id;

                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalSelect(goal.id)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 group flex items-start gap-4 ${
                        isSelected
                          ? 'bg-vyrox-900 border-vyrox-red shadow-crimson-sm'
                          : 'bg-vyrox-900/60 hover:bg-vyrox-900 border-vyrox-800 hover:border-vyrox-red/50'
                      }`}
                    >
                      <div className="p-3 rounded-xl bg-vyrox-850 group-hover:bg-vyrox-red/20 text-vyrox-crimson shrink-0 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-athletic text-lg font-bold text-white uppercase group-hover:text-vyrox-crimson transition-colors">
                          {goal.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed mt-1">
                          {goal.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Optional Custom Preferences */}
          {step === 2 && !loading && (
            <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-vyrox-crimson bg-vyrox-900 px-3 py-1 rounded-full border border-vyrox-800">
                  Step 2 of 3: Training Parameters
                </span>
                <h3 className="font-athletic text-3xl sm:text-4xl font-bold text-white uppercase mt-3">
                  Fine-Tune Your Schedule
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Selected Goal: <span className="text-white font-bold">{preferences.goal}</span>
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-300 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-5 bg-vyrox-900/40 p-6 rounded-2xl border border-vyrox-800">
                {/* Experience Level */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, experience: lvl })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                          preferences.experience === lvl
                            ? 'bg-vyrox-red border-vyrox-red text-white shadow-crimson-sm'
                            : 'bg-vyrox-850 hover:bg-vyrox-800 border-vyrox-700 text-gray-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Workout Days Per Week */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Workout Days Per Week
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[2, 3, 4, 5, 6].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, daysPerWeek: days })}
                        className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                          preferences.daysPerWeek === days
                            ? 'bg-vyrox-red border-vyrox-red text-white shadow-crimson-sm'
                            : 'bg-vyrox-850 hover:bg-vyrox-800 border-vyrox-700 text-gray-300'
                        }`}
                      >
                        {days} Days
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session Duration & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Duration Per Session
                    </label>
                    <select
                      value={preferences.duration}
                      onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white text-xs focus:outline-none focus:border-vyrox-red"
                    >
                      <option value="30">30 Minutes (Express)</option>
                      <option value="45">45 Minutes</option>
                      <option value="60">60 Minutes (Standard)</option>
                      <option value="75">75 Minutes</option>
                      <option value="90">90 Minutes (Heavy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Equipment Access
                    </label>
                    <select
                      value={preferences.equipment}
                      onChange={(e) => setPreferences({ ...preferences, equipment: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white text-xs focus:outline-none focus:border-vyrox-red"
                    >
                      <option value="Full Commercial Gym">Full Commercial Gym (VYROX)</option>
                      <option value="Dumbbells & Bench">Dumbbells & Bench Only</option>
                      <option value="Bodyweight & Resistance Bands">Bodyweight & Bands (Home)</option>
                    </select>
                  </div>
                </div>

                {/* Limitations / Focus Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Physical Considerations or Focus Areas (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={preferences.limitations}
                    onChange={(e) => setPreferences({ ...preferences, limitations: e.target.value })}
                    placeholder="e.g. Minor lower back sensitivity, want to focus on chest and shoulders..."
                    className="w-full px-4 py-2.5 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-vyrox-red resize-none"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    * If you have medical conditions or severe pain, please consult a physician.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-vyrox-850 hover:bg-vyrox-800 text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-vyrox-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Change Goal</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerate}
                  className="px-8 py-3.5 rounded-xl bg-vyrox-red hover:bg-vyrox-darkred text-white text-xs font-bold uppercase tracking-widest shadow-crimson flex items-center gap-2"
                >
                  <span>Build My Weekly Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Loading AI Generation State */}
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-vyrox-800 border-t-vyrox-red animate-spin" />
                <Sparkles className="w-8 h-8 text-vyrox-crimson absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="font-athletic text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
                  {loadingStage === 0 && 'Analyzing Biomechanical Demands...'}
                  {loadingStage === 1 && 'Structuring Progressive Volume & Split...'}
                  {loadingStage === 2 && 'Calibrating Sets, Reps & Recovery Protocols...'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                  Engineering your custom {preferences.daysPerWeek}-day {preferences.goal} protocol using science-backed resistance parameters.
                </p>
              </div>

              <div className="w-48 h-2 rounded-full bg-vyrox-850 overflow-hidden border border-vyrox-800">
                <div
                  className="h-full bg-vyrox-red rounded-full transition-all duration-1000"
                  style={{ width: `${(loadingStage + 1) * 33}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Render Workout Plan */}
          {step === 4 && generatedPlan && (
            <WorkoutPlan
              plan={generatedPlan}
              onReset={() => setStep(1)}
              onRegenerate={handleGenerate}
              isRegenerating={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

