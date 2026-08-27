import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { AudioButton } from '../components/AudioButton'

const TABS = [
  { id: 'transports', label: 'Taxi', icon: '🚕' },
  { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'hotel', label: 'Hôtel', icon: '🏨' },
  { id: 'ville', label: 'Directions', icon: '🗺️' },
  { id: 'argent', label: 'Prix', icon: '💰' },
  { id: 'urgence', label: 'Urgence', icon: '🆘' },
]

const URGENCE_PHRASE_TEXTS = ["Aide-moi, s'il te plaît", 'Je suis perdu(e)', 'Excuse-moi', 'Je ne comprends pas', 'Répète']

export function SurvivalScreen() {
  const params = useLocalSearchParams<{ cat?: string }>()
  const [tab, setTab] = useState(params.cat ?? 'transports')

  const words = vocabulary.filter((v) => v.categoryId === tab)
  const tabPhrases = tab === 'urgence'
    ? phrases.filter((p) => URGENCE_PHRASE_TEXTS.includes(p.fr))
    : phrases.filter((p) => p.categoryId === tab)

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-gray-500 mb-4">Accès rapide aux phrases dont tu as besoin sur place.</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4" contentContainerStyle={{ gap: 8 }}>
        {TABS.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full border ${tab === t.id ? 'bg-brand-500 border-brand-500' : 'bg-white border-sand-200'}`}
          >
            <Text className={`text-sm font-medium ${tab === t.id ? 'text-white' : 'text-gray-800'}`}>{t.icon} {t.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {tabPhrases.length > 0 && (
        <View className="gap-2 mb-6">
          {tabPhrases.map((p) => (
            <View key={p.id} className="bg-white border border-sand-200 rounded-xl p-3 flex-row items-center justify-between">
              <View className="flex-1 pr-2">
                <Text className="text-lg">{p.darija}</Text>
                <Text className="text-xs text-gray-400">{p.translit}</Text>
                <Text className="font-medium text-sm text-brand-600">{p.fr}</Text>
              </View>
              <AudioButton text={p.darija} />
            </View>
          ))}
        </View>
      )}

      {words.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {words.map((w) => (
            <View key={w.id} className="w-[48%] bg-white border border-sand-200 rounded-xl p-3 flex-row items-center justify-between">
              <View className="flex-1 pr-1">
                <Text numberOfLines={1}>{w.darija}</Text>
                <Text className="text-xs text-gray-400" numberOfLines={1}>{w.translit} — {w.fr}</Text>
              </View>
              <AudioButton text={w.darija} size="sm" />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}
