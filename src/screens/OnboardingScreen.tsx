import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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

export function OnboardingScreen() {
  const { completeOnboarding } = useProgress()
  const [step, setStep] = useState(0)
  const [level, setLevel] = useState<OnboardingLevel | null>(null)
  const [goal, setGoal] = useState<OnboardingGoal | null>(null)
  const [daily, setDaily] = useState<DailyGoal>(10)

  const finish = () => completeOnboarding(level ?? 'rien', goal ?? 'autre', daily)

  return (
    <SafeAreaView className="flex-1 bg-sand-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <Text className="text-center text-5xl mb-4">🇲🇦</Text>
        <Text className="text-center text-2xl font-bold mb-1">Apprends la Darija</Text>
        <Text className="text-center text-gray-500 mb-8">Gratuitement, à ton rythme, sans compte.</Text>

        {step === 0 && (
          <View>
            <Text className="font-semibold mb-4 text-center">Quel est ton niveau ?</Text>
            <View className="gap-2">
              {LEVELS.map((l) => (
                <Pressable
                  key={l.value}
                  onPress={() => setLevel(l.value)}
                  className={`px-4 py-3 rounded-xl border ${level === l.value ? 'border-brand-500 bg-brand-50' : 'border-sand-200 bg-white'}`}
                >
                  <Text className={`font-medium ${level === l.value ? 'text-brand-600' : 'text-gray-800'}`}>{l.label}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              disabled={!level}
              onPress={() => setStep(1)}
              className={`mt-6 py-3 rounded-xl bg-brand-500 items-center ${!level ? 'opacity-30' : ''}`}
            >
              <Text className="text-white font-semibold">Continuer</Text>
            </Pressable>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text className="font-semibold mb-4 text-center">Pourquoi apprends-tu la Darija ?</Text>
            <View className="flex-row flex-wrap gap-2 justify-between">
              {GOALS.map((g) => (
                <Pressable
                  key={g.value}
                  onPress={() => setGoal(g.value)}
                  className={`w-[48%] px-4 py-4 rounded-xl border items-center gap-1 ${goal === g.value ? 'border-brand-500 bg-brand-50' : 'border-sand-200 bg-white'}`}
                >
                  <Text className="text-2xl">{g.icon}</Text>
                  <Text className={`font-medium ${goal === g.value ? 'text-brand-600' : 'text-gray-800'}`}>{g.label}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              disabled={!goal}
              onPress={() => setStep(2)}
              className={`mt-6 py-3 rounded-xl bg-brand-500 items-center ${!goal ? 'opacity-30' : ''}`}
            >
              <Text className="text-white font-semibold">Continuer</Text>
            </Pressable>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text className="font-semibold mb-4 text-center">Ton objectif quotidien ?</Text>
            <View className="flex-row gap-2">
              {GOALS_TIME.map((g) => (
                <Pressable
                  key={g.value}
                  onPress={() => setDaily(g.value)}
                  className={`flex-1 py-4 rounded-xl border items-center ${daily === g.value ? 'border-brand-500 bg-brand-50' : 'border-sand-200 bg-white'}`}
                >
                  <Text className={`font-semibold ${daily === g.value ? 'text-brand-600' : 'text-gray-800'}`}>{g.label}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={finish} className="mt-6 py-3 rounded-xl bg-brand-500 items-center">
              <Text className="text-white font-semibold">Commencer 🚀</Text>
            </Pressable>
          </View>
        )}

        <View className="flex-row justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((i) => (
            <View key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-brand-500' : 'bg-sand-200'}`} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
