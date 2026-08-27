import { useMemo, useState, type ReactNode } from 'react'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { conversations } from '../data/conversations'
import { grammarPoints } from '../data/grammar'
import { verbs } from '../data/verbs'

export function SearchScreen() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (q.length < 2) return null
    return {
      vocab: vocabulary.filter((v) => v.fr.toLowerCase().includes(q) || v.translit.toLowerCase().includes(q)).slice(0, 8),
      phrases: phrases.filter((p) => p.fr.toLowerCase().includes(q) || p.translit.toLowerCase().includes(q)).slice(0, 8),
      conversations: conversations.filter((c) => c.title.toLowerCase().includes(q) || c.situation.toLowerCase().includes(q)),
      grammar: grammarPoints.filter((g) => g.title.toLowerCase().includes(q)),
      verbs: verbs.filter((v) => v.fr.toLowerCase().includes(q) || v.translit.toLowerCase().includes(q)),
    }
  }, [q])

  const total = results ? results.vocab.length + results.phrases.length + results.conversations.length + results.grammar.length + results.verbs.length : 0

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <TextInput
        autoFocus
        value={query}
        onChangeText={setQuery}
        placeholder="Ex : taxi, merci, famille..."
        className="w-full px-4 py-3 rounded-xl border border-sand-200 mb-6 bg-white"
      />

      {!results && <Text className="text-gray-400 text-sm">Tape au moins 2 lettres pour chercher dans tout le contenu.</Text>}
      {results && total === 0 && <Text className="text-gray-400 text-sm">Aucun résultat pour « {query} ».</Text>}

      {results && results.vocab.length > 0 && (
        <Section title="Vocabulaire">
          {results.vocab.map((v) => (
            <Pressable key={v.id} onPress={() => router.push(`/vocabulaire/${v.categoryId}`)} className="py-2 border-b border-sand-100">
              <Text>{v.darija} <Text className="text-gray-400 text-sm">({v.translit})</Text> — {v.fr}</Text>
            </Pressable>
          ))}
        </Section>
      )}
      {results && results.phrases.length > 0 && (
        <Section title="Phrases">
          {results.phrases.map((p) => (
            <View key={p.id} className="py-2 border-b border-sand-100">
              <Text>{p.darija} <Text className="text-gray-400 text-sm">({p.translit})</Text> — {p.fr}</Text>
            </View>
          ))}
        </Section>
      )}
      {results && results.conversations.length > 0 && (
        <Section title="Conversations">
          {results.conversations.map((c) => (
            <Pressable key={c.id} onPress={() => router.push(`/conversations/${c.id}`)} className="py-2 border-b border-sand-100">
              <Text>{c.icon} {c.title}</Text>
            </Pressable>
          ))}
        </Section>
      )}
      {results && results.grammar.length > 0 && (
        <Section title="Grammaire">
          {results.grammar.map((g) => (
            <View key={g.id} className="py-2 border-b border-sand-100"><Text>{g.title}</Text></View>
          ))}
        </Section>
      )}
      {results && results.verbs.length > 0 && (
        <Section title="Verbes">
          {results.verbs.map((v) => (
            <View key={v.id} className="py-2 border-b border-sand-100"><Text>{v.translit} — {v.fr}</Text></View>
          ))}
        </Section>
      )}
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="mb-6">
      <Text className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">{title}</Text>
      <View className="bg-white border border-sand-200 rounded-xl px-3">{children}</View>
    </View>
  )
}
