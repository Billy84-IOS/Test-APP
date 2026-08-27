import { useState } from 'react'
import { useProgress } from '../context/ProgressContext'
import type { DailyGoal, OnboardingGoal, OnboardingLevel } from '../lib/types'

const LEVELS: { value: OnboardingLevel; label: string }[] = [
  { value: 'rien', label: 'Je ne connais rien' },
  { value: 'quelques-mots', label: 'Je connais quelques mots' },
  { value: 'comprend-un-peu', label: 'Je comprends un peu' },
  { value: 'parle-un-peu', label: 'Je parle déjà un peu' },
]

const GOALS: { value: OnboardingGoal; label: string; icon: string }[] = [
  { value: 'voyage', label: 'Voyage', icon: '✈️' },
  { value: 'famille', label: 'Famille', icon: '👨‍👩‍👧' },
  { value: 'amis', label: 'Amis', icon: '🤝' },
  { value: 'travail', label: 'Travail', icon: '💼' },
  { value: 'culture', label: 'Culture', icon: '🎭' },
  { value: 'autre', label: 'Autre', icon: '✨' },
]

const GOALS_TIME: { value: DailyGoal; label: string }[] = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 20, label: '20 min' },
  { value: 30, label: '30 min' },
]

export function Onboarding() {
  const { completeOnboarding } = useProgress()
  const [step, setStep] = useState(0)
  const [level, setLevel] = useState<OnboardingLevel | null>(null)
  const [goal, setGoal] = useState<OnboardingGoal | null>(null)
  const [daily, setDaily] = useState<DailyGoal>(10)

  const finish = () => {
    completeOnboarding(level ?? 'rien', goal ?? 'autre', daily)
  }

  return (
    <div className="fixed inset-0 z-50 bg-sand-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <p className="text-center text-5xl mb-4">🇲🇦</p>
        <h1 className="text-center text-2xl font-bold mb-1">Apprends la Darija</h1>
        <p className="text-center text-gray-500 mb-8">Gratuitement, à ton rythme, sans compte.</p>

        {step === 0 && (
          <div>
            <h2 className="font-semibold mb-4 text-center">Quel est ton niveau ?</h2>
            <div className="space-y-2">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLevel(l.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border font-medium transition ${level === l.value ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-sand-200 bg-white'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              disabled={!level}
              onClick={() => setStep(1)}
              className="w-full mt-6 py-3 rounded-xl bg-brand-500 text-white font-semibold disabled:opacity-30"
            >
              Continuer
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-semibold mb-4 text-center">Pourquoi apprends-tu la Darija ?</h2>
            <div className="grid grid-cols-2 gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className={`px-4 py-4 rounded-xl border font-medium transition flex flex-col items-center gap-1 ${goal === g.value ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-sand-200 bg-white'}`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  {g.label}
                </button>
              ))}
            </div>
            <button
              disabled={!goal}
              onClick={() => setStep(2)}
              className="w-full mt-6 py-3 rounded-xl bg-brand-500 text-white font-semibold disabled:opacity-30"
            >
              Continuer
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-semibold mb-4 text-center">Ton objectif quotidien ?</h2>
            <div className="grid grid-cols-4 gap-2">
              {GOALS_TIME.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setDaily(g.value)}
                  className={`py-4 rounded-xl border font-semibold transition ${daily === g.value ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-sand-200 bg-white'}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <button onClick={finish} className="w-full mt-6 py-3 rounded-xl bg-brand-500 text-white font-semibold">
              Commencer 🚀
            </button>
          </div>
        )}

        <div className="flex justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-brand-500' : 'bg-sand-200'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
