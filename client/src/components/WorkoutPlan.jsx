import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Flame, Dumbbell, ShieldAlert, RotateCcw, Share2, MessageSquare, Sparkles, HeartPulse, Apple, Target } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function WorkoutPlan({ plan, onReset, onRegenerate, isRegenerating }) {
  // Track completed exercise IDs in device localStorage
  const storageKey = `vyrox_completed_exercises_${plan.planName.replace(/\s+/g, '_')}`;
  
  const [completedExercises, setCompletedExercises] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [activeDayIndex, setActiveDayIndex] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedExercises));
    } catch (e) {
      // Ignore quota errors
    }
  }, [completedExercises, storageKey]);

  // Compute total exercises and completed count
  const allExercises = plan.schedule.flatMap((day) => day.exercises || []);
  const totalExercisesCount = allExercises.length;
  const completedCount = allExercises.filter((ex) => completedExercises[ex.id]).length;
  const progressPercent = totalExercisesCount > 0 ? Math.round((completedCount / totalExercisesCount) * 100) : 0;

  const toggleExercise = (exerciseId) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all completed checkboxes for this plan on this device?')) {
      setCompletedExercises({});
      localStorage.removeItem(storageKey);
    }
  };

  const activeDay = plan.schedule[activeDayIndex] || plan.schedule[0];

  const trainerWhatsappMessage = `Hello VYROX Athletics, I generated a ${plan.goal} AI workout plan ("${plan.planName}") and would like to discuss working with a trainer to coach me through these lifts.`;
  const whatsappUrl = `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${encodeURIComponent(trainerWhatsappMessage)}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Plan Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-vyrox-900 via-vyrox-850 to-vyrox-900 border-2 border-vyrox-red/60 shadow-crimson relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-vyrox-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-vyrox-red text-white text-xs font-bold uppercase tracking-wider">
              {plan.goal}
            </span>
            <span className="px-3 py-1 rounded-full bg-vyrox-800 text-gray-200 border border-vyrox-700 text-xs font-bold uppercase tracking-wider">
              {plan.splitType}
            </span>
            <span className="px-3 py-1 rounded-full bg-vyrox-800 text-gray-200 border border-vyrox-700 text-xs font-bold uppercase tracking-wider">
              {plan.daysPerWeek} Days / Week
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="px-4 py-2 rounded-xl bg-vyrox-800 hover:bg-vyrox-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-vyrox-700 disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-xl bg-vyrox-850 hover:bg-vyrox-800 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors border border-vyrox-700"
            >
              Adjust Goals
            </button>
          </div>
        </div>

        <h2 className="font-athletic text-3xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-3">
          {plan.planName}
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed mb-6">
          {plan.weeklyOverview}
        </p>

        {/* Interactive Weekly Progress Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-vyrox-950/80 border border-vyrox-800 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-vyrox-crimson" />
              <span>Weekly Training Completion</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-vyrox-crimson font-athletic text-lg sm:text-xl">
                {completedCount} / {totalExercisesCount} Completed ({progressPercent}%)
              </span>
              {completedCount > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="text-[10px] uppercase text-gray-400 hover:text-white underline"
                  title="Clear device progress"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-vyrox-850 overflow-hidden p-0.5 border border-vyrox-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-vyrox-darkred via-vyrox-red to-vyrox-crimson transition-all duration-500 shadow-crimson-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            &bull; Check off exercises as you finish your workout. Progress is saved locally to your device.
          </p>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {plan.schedule.map((day, idx) => {
          const dayExercises = day.exercises || [];
          const dayCompleted = dayExercises.filter((ex) => completedExercises[ex.id]).length;
          const isDone = dayExercises.length > 0 && dayCompleted === dayExercises.length;
          const isActive = idx === activeDayIndex;

          return (
            <button
              key={idx}
              onClick={() => setActiveDayIndex(idx)}
              className={`px-5 py-3 rounded-2xl font-athletic uppercase text-sm sm:text-base tracking-wider transition-all duration-200 shrink-0 flex items-center gap-2.5 border ${
                isActive
                  ? 'bg-vyrox-red text-white border-vyrox-red shadow-crimson-sm'
                  : 'bg-vyrox-900 hover:bg-vyrox-850 text-gray-300 border-vyrox-800 hover:border-vyrox-700'
              }`}
            >
              <span>{day.day}</span>
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="text-[11px] opacity-80 font-sans font-semibold">
                  ({dayCompleted}/{dayExercises.length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-vyrox-900/80 border border-vyrox-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-vyrox-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-vyrox-crimson">
              {activeDay.day} Protocol
            </span>
            <h3 className="font-athletic text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              {activeDay.title}
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Target Focus: <span className="text-gray-200 font-semibold">{activeDay.focus}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-vyrox-850 border border-vyrox-700 text-xs text-gray-300">
            <Clock className="w-4 h-4 text-vyrox-crimson" />
            <span>Est. Duration: {activeDay.estimatedDuration || '60 mins'}</span>
          </div>
        </div>

        {/* Warmup Drills */}
        {activeDay.warmup && activeDay.warmup.length > 0 && (
          <div className="p-4 rounded-2xl bg-vyrox-950/60 border border-vyrox-850">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-vyrox-silver mb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Phase 1: Dynamic Preparation & Warmup</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeDay.warmup.map((drill, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{drill}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exercise Table / Checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-white flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-vyrox-crimson" />
              <span>Phase 2: Working Compound & Hypertrophy Sets</span>
            </span>
            <span className="text-xs text-gray-400">Click circle to check off</span>
          </div>

          <div className="space-y-3">
            {activeDay.exercises.map((exercise) => {
              const isChecked = Boolean(completedExercises[exercise.id]);

              return (
                <div
                  key={exercise.id}
                  onClick={() => toggleExercise(exercise.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-emerald-950/30 border-emerald-500/40 opacity-75'
                      : 'bg-vyrox-850/80 hover:bg-vyrox-850 border-vyrox-750 hover:border-vyrox-red/50 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExercise(exercise.id);
                    }}
                    className="mt-1 focus:outline-none"
                    aria-label={isChecked ? `Mark ${exercise.name} incomplete` : `Mark ${exercise.name} complete`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-500 hover:text-vyrox-crimson" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className={`text-base font-bold ${isChecked ? 'line-through text-gray-400' : 'text-white'}`}>
                        {exercise.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs font-mono font-bold text-vyrox-crimson">
                        <span className="px-2 py-0.5 rounded bg-vyrox-900 border border-vyrox-800">
                          {exercise.sets} Sets
                        </span>
                        <span className="px-2 py-0.5 rounded bg-vyrox-900 border border-vyrox-800">
                          {exercise.reps} Reps
                        </span>
                        {exercise.rest && (
                          <span className="px-2 py-0.5 rounded bg-vyrox-900 border border-vyrox-800 text-gray-300 font-sans">
                            Rest: {exercise.rest}
                          </span>
                        )}
                      </div>
                    </div>

                    {exercise.notes && (
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                        <span className="font-semibold text-gray-300">Cue / Focus:</span> {exercise.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cooldown Drills */}
        {activeDay.cooldown && activeDay.cooldown.length > 0 && (
          <div className="p-4 rounded-2xl bg-vyrox-950/60 border border-vyrox-850">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-vyrox-silver mb-2">
              <HeartPulse className="w-4 h-4 text-emerald-500" />
              <span>Phase 3: Cooldown & Mobility Restoration</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeDay.cooldown.map((drill, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{drill}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Nutrition & Recovery Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nutrition Guidelines */}
        <div className="p-6 rounded-2xl bg-vyrox-900/70 border border-vyrox-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Apple className="w-5 h-5 text-emerald-400" />
              <h4 className="font-athletic text-xl font-bold text-white uppercase">Nutrition Directives</h4>
            </div>
            <ul className="space-y-2.5">
              {plan.nutritionGuidelines?.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recovery Protocols */}
        <div className="p-6 rounded-2xl bg-vyrox-900/70 border border-vyrox-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="w-5 h-5 text-vyrox-crimson" />
              <h4 className="font-athletic text-xl font-bold text-white uppercase">Recovery & Contrast</h4>
            </div>
            <ul className="space-y-2.5">
              {plan.recoveryProtocols?.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="text-vyrox-crimson font-bold">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tracking & Next Steps */}
        <div className="p-6 rounded-2xl bg-vyrox-900/70 border border-vyrox-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-amber-400" />
              <h4 className="font-athletic text-xl font-bold text-white uppercase">Progress Tracking</h4>
            </div>
            <ul className="space-y-2.5">
              {plan.trackingTips?.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Prominent Medical and Safety Disclaimer */}
      <div className="p-5 rounded-2xl bg-vyrox-950 border border-vyrox-800/80 flex items-start gap-3 text-xs text-gray-400">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <p>
          <strong className="text-gray-200">Safety & Medical Disclaimer:</strong> {plan.disclaimer || 'This fitness plan is generated for educational and training guidance only. It does not replace a medical consultation or individualized 1-on-1 coaching. Stop immediately if you experience sharp pain or dizziness and consult a licensed physician.'}
        </p>
      </div>

      {/* Bottom CTA: Discuss with VYROX Coach */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-vyrox-950 via-vyrox-900 to-vyrox-950 border-2 border-vyrox-red shadow-crimson flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-athletic text-2xl sm:text-3xl font-bold text-white uppercase">
            Want an Elite Coach to Guide This Plan?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
            Take this routine to the next level with hands-on form correction, biometric InBody scans, and 1-on-1 coaching at VYROX Athletics.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 rounded-xl bg-vyrox-red hover:bg-vyrox-darkred text-white text-xs font-bold uppercase tracking-widest shadow-crimson hover:shadow-crimson-lg transition-all duration-300 shrink-0 flex items-center gap-2"
        >
          <span>Discuss with a Coach</span>
          &rarr;
        </a>
      </div>
    </div>
  );
}

