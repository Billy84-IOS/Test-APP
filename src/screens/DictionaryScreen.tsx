import { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'

type Direction = 'fr-darija' | 'darija-fr'

export function DictionaryScreen() {
  const [query, setQuery] = useState('')
  const [direction, setDirection] = useState<Direction>('fr-darija')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length === 0) return []
    const vocabResults = vocabulary.filter((v) =>
      direction === 'fr-darija' ? v.fr.toLowerCase().includes(q) : v.translit.toLowerCase().includes(q) || v.darija.includes(q),
    )
    const phraseResults = phrases.filter((p) =>
      direction === 'fr-darija' ? p.fr.toLowerCase().includes(q) : p.translit.toLowerCase().includes(q) || p.darija.includes(q),
    )
    return [...vocabResults.map((v) => ({ ...v, kind: 'vocab' as const })), ...phraseResults.map((p) => ({ ...p, kind: 'phrase' as const }))]
  }, [query, direction])

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-gray-500 mb-4">Recherche Darija ↔ Français.</Text>

      <View className="flex-row gap-2 mb-4">
        <Pressable onPress={() => setDirection('fr-darija')} className={`flex-1 py-2 rounded-xl border items-center ${direction === 'fr-darija' ? 'bg-brand-500 border-brand-500' : 'bg-white border-sand-200'}`}>
          <Text className={`text-sm font-medium ${direction === 'fr-darija' ? 'text-white' : 'text-gray-800'}`}>Français → Darija</Text>
        </Pressable>
        <Pressable onPress={() => setDirection('darija-fr')} className={`flex-1 py-2 rounded-xl border items-center ${direction === 'darija-fr' ? 'bg-brand-500 border-brand-500' : 'bg-white border-sand-200'}`}>
          <Text className={`text-sm font-medium ${direction === 'darija-fr' ? 'text-white' : 'text-gray-800'}`}>Darija → Français</Text>
        </Pressable>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={direction === 'fr-darija' ? 'Ex : bonjour, merci, taxi...' : 'Ex : salam, bghit, choukran...'}
        className="w-full px-4 py-3 rounded-xl border border-sand-200 mb-4 bg-white"
      />

      {query.trim().length === 0 ? (
        <Text className="text-gray-400 text-sm">Commence à taper pour chercher.</Text>
      ) : results.length === 0 ? (
        <Text className="text-gray-400 text-sm">Aucun résultat pour « {query} ».</Text>
      ) : (
        <View className="gap-2">
          {results.map((r) => (
            <View key={r.id} className="bg-white border border-sand-200 rounded-xl p-3 flex-row items-center justify-between">
              <View className="flex-1 pr-2">
                <Text className="text-lg">{r.darija}</Text>
                <Text className="text-xs text-gray-400">{r.translit}</Text>
                <Text className="font-medium text-sm">{r.fr}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <AudioButton text={r.darija} size="sm" />
                <FavoriteButton kind={r.kind === 'vocab' ? 'vocab' : 'phrases'} itemId={r.id} />
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}
