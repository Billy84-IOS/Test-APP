import { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { translate } from '../lib/translate'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'
import type { Phrase, VocabWord } from '../types'

function isPhrase(item: Phrase | VocabWord): item is Phrase {
  return 'explanation' in item || 'register' in item
}

export function TranslateScreen() {
  const [query, setQuery] = useState('')
  const result = useMemo(() => translate(query), [query])
  const hasExact = result.exactPhrase || result.exactWord
  const exact = result.exactPhrase ?? result.exactWord

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <Text className="text-2xl font-bold mb-1">⚡ Traduction en direct</Text>
      <Text className="text-gray-500 mb-4">
        Écris une phrase ou un mot en français : la traduction en Darija s'affiche au fur et à mesure.
      </Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Ex : merci beaucoup, où est la gare, je veux manger..."
        multiline
        autoFocus
        className="w-full min-h-[70px] px-4 py-3 rounded-xl border-2 border-brand-400 mb-5 bg-white text-base"
      />

      {query.trim().length === 0 && (
        <Text className="text-gray-400 text-sm">Commence à écrire pour voir la traduction.</Text>
      )}

      {hasExact && exact && (
        <View className="bg-white border-2 border-teal-400 rounded-2xl p-5 mb-4">
          <Text className="text-xs uppercase tracking-wide text-teal-600 font-semibold mb-2">✅ Traduction trouvée</Text>
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-2">
              <Text className="text-2xl mb-1">{exact.darija}</Text>
              <Text className="text-gray-500">{exact.translit}</Text>
              {isPhrase(exact) && exact.explanation && (
                <Text className="text-xs text-gray-400 mt-2">{exact.explanation}</Text>
              )}
            </View>
            <View className="flex-row items-center gap-1">
              <AudioButton text={exact.darija} />
              <FavoriteButton kind={isPhrase(exact) ? 'phrases' : 'vocab'} itemId={exact.id} />
            </View>
          </View>
        </View>
      )}

      {!hasExact && result.wordByWord.length > 0 && (
        <View className="mb-4">
          <View className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
            <Text className="text-xs text-amber-700">
              ⚠️ Cette phrase exacte n'est pas encore dans la base. Voici une traduction mot à mot approximative —
              l'ordre des mots en Darija peut être différent du français.
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {result.wordByWord.map((w, i) => (
              <View key={i} className={`px-3 py-2 rounded-xl border ${w.match ? 'bg-white border-sand-200' : 'bg-sand-100 border-sand-200'}`}>
                <Text className="text-xs text-gray-400">{w.token}</Text>
                {w.match ? (
                  <Text className="font-medium">{w.match.darija} <Text className="text-gray-400 text-xs">({w.match.translit})</Text></Text>
                ) : (
                  <Text className="text-gray-300 text-sm">?</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {!hasExact && result.suggestions.length > 0 && (
        <View>
          <Text className="font-semibold mb-2 text-sm text-gray-500">Phrases et mots proches dans la base :</Text>
          <View className="gap-2">
            {result.suggestions.map((s) => (
              <View key={s.id} className="bg-white border border-sand-200 rounded-xl p-3 flex-row items-center justify-between">
                <View className="flex-1 pr-2">
                  <Text>{s.darija}</Text>
                  <Text className="text-xs text-gray-400">{s.translit}</Text>
                  <Text className="text-sm font-medium text-brand-600">{s.fr}</Text>
                </View>
                <AudioButton text={s.darija} size="sm" />
              </View>
            ))}
          </View>
        </View>
      )}

      {!hasExact && query.trim().length > 0 && result.suggestions.length === 0 && result.wordByWord.every((w) => !w.match) && (
        <Text className="text-gray-400 text-sm mt-2">
          Aucun mot reconnu. Essaie une formulation plus simple, ou consulte le dictionnaire complet.
        </Text>
      )}

      <View className="bg-sand-100 rounded-xl p-3 mt-6">
        <Text className="text-xs text-gray-400">
          Ce traducteur s'appuie uniquement sur le vocabulaire et les phrases déjà vérifiés dans l'app (gratuit, 100%
          hors-ligne, aucune API payante) — il ne devine jamais une traduction qu'il ne connaît pas vraiment.
        </Text>
      </View>
    </ScrollView>
  )
}
