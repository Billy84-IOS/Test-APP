import { useMemo, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import type { QuizQuestion } from '../types'
import { speak } from '../lib/tts'
import { useProgress } from '../context/ProgressContext'

const CHOICE_TYPES: QuizQuestion['type'][] = ['qcm', 'choose-translation', 'listen-word', 'listen-sentence', 'listen-then-answer']
const TYPE_TYPES: QuizQuestion['type'][] = ['darija-to-fr', 'fr-to-darija', 'fill-blank']

function normalize(s: string) {
  return s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function QuizRunner({ questions, onFinish }: { questions: QuizQuestion[]; onFinish?: (score: number, total: number) => void }) {
  const { recordQuizAnswer } = useProgress()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [reorderPicked, setReorderPicked] = useState<string[]>([])

  const question = questions[index]
  const shuffledWords = useMemo(
    () => (question?.words ? [...question.words].sort(() => (question.words!.indexOf(question.words![0]) % 2 ? 1 : -1)) : []),
    [question],
  )

  if (questions.length === 0) {
    return <Text className="text-gray-400 text-sm py-6">Aucun exercice disponible pour cette section pour le moment.</Text>
  }

  if (index >= questions.length) {
    return (
      <View className="items-center py-10">
        <Text className="text-5xl mb-3">🎉</Text>
        <Text className="text-xl font-bold mb-1">Terminé !</Text>
        <Text className="text-gray-500">Score : {score} / {questions.length}</Text>
      </View>
    )
  }

  const advance = (correct: boolean) => {
    recordQuizAnswer(correct)
    const nextScore = score + (correct ? 1 : 0)
    setScore(nextScore)
    setTimeout(() => {
      setSelected(null)
      setTyped('')
      setRevealed(false)
      setReorderPicked([])
      const nextIndex = index + 1
      setIndex(nextIndex)
      if (nextIndex >= questions.length) onFinish?.(nextScore, questions.length)
    }, 700)
  }

  const handleChoice = (choice: string) => {
    if (selected) return
    setSelected(choice)
    advance(choice === question.correctAnswer)
  }

  const handleReorderWord = (word: string) => {
    if (revealed) return
    const next = [...reorderPicked, word]
    setReorderPicked(next)
    if (question.words && next.length === question.words.length) {
      const correct = next.join(' ') === question.correctAnswer
      setRevealed(true)
      advance(correct)
    }
  }

  return (
    <View className="w-full max-w-lg self-center px-4 py-6">
      <View className="flex-row justify-between mb-4">
        <Text className="text-xs text-gray-400">Question {index + 1} / {questions.length}</Text>
        <Text className="text-xs text-gray-400">Score : {score}</Text>
      </View>

      <View className="bg-white rounded-2xl border border-sand-200 p-5 mb-4">
        <Text className="font-semibold text-lg mb-1">{question.prompt}</Text>
        {question.promptAudio && (
          <Pressable onPress={() => speak(question.promptAudio!.tts)} className="mt-2 flex-row items-center gap-1">
            <Text className="text-sm text-teal-600">🔊 Écouter</Text>
          </Pressable>
        )}
      </View>

      {CHOICE_TYPES.includes(question.type) && question.choices && (
        <View className="gap-2">
          {question.choices.map((choice) => {
            const isSelected = selected === choice
            const isCorrect = choice === question.correctAnswer
            const showState = selected !== null
            const bg = showState && isCorrect ? 'bg-green-50 border-green-400' : showState && isSelected ? 'bg-red-50 border-red-400' : 'bg-white border-sand-200'
            const textColor = showState && isCorrect ? 'text-green-700' : showState && isSelected ? 'text-red-700' : 'text-gray-800'
            return (
              <Pressable
                key={choice}
                disabled={selected !== null}
                onPress={() => handleChoice(choice)}
                className={`px-4 py-3 rounded-xl border ${bg}`}
              >
                <Text className={`font-medium ${textColor}`}>{choice}</Text>
              </Pressable>
            )
          })}
        </View>
      )}

      {question.type === 'reorder' && question.words && (
        <View>
          <View className="min-h-[48px] flex-row flex-wrap gap-2 mb-4 p-3 bg-white rounded-xl border border-sand-200">
            {reorderPicked.map((w, i) => (
              <View key={i} className="px-3 py-1.5 bg-brand-50 rounded-lg">
                <Text className="text-brand-600 text-sm font-medium">{w}</Text>
              </View>
            ))}
          </View>
          <View className="flex-row flex-wrap gap-2">
            {shuffledWords.map((w, i) => {
              const used = reorderPicked.includes(w) || revealed
              return (
                <Pressable key={i} disabled={used} onPress={() => handleReorderWord(w)} className={`px-3 py-1.5 bg-sand-100 rounded-lg ${used ? 'opacity-30' : ''}`}>
                  <Text className="text-sm font-medium">{w}</Text>
                </Pressable>
              )
            })}
          </View>
          {revealed && <Text className="mt-3 text-sm text-gray-500">Réponse : {question.correctAnswer}</Text>}
        </View>
      )}

      {TYPE_TYPES.includes(question.type) && (
        <View>
          <TextInput
            value={typed}
            onChangeText={setTyped}
            editable={!revealed}
            placeholder="Écris ta réponse..."
            className="w-full px-4 py-3 rounded-xl border border-sand-200 mb-3 bg-white"
          />
          {!revealed ? (
            <Pressable
              onPress={() => setRevealed(true)}
              disabled={typed.trim().length === 0}
              className={`px-4 py-2.5 rounded-xl self-start ${typed.trim().length === 0 ? 'bg-brand-500 opacity-40' : 'bg-brand-500'}`}
            >
              <Text className="text-white font-medium">Vérifier</Text>
            </Pressable>
          ) : (
            <View>
              <Text className={`text-sm font-medium mb-2 ${normalize(typed) === normalize(question.correctAnswer) ? 'text-green-600' : 'text-amber-600'}`}>
                Réponse attendue : {question.correctAnswer}
              </Text>
              <View className="flex-row gap-2">
                <Pressable onPress={() => advance(true)} className="px-4 py-2 bg-green-500 rounded-xl">
                  <Text className="text-white text-sm font-medium">J'avais juste</Text>
                </Pressable>
                <Pressable onPress={() => advance(false)} className="px-4 py-2 bg-sand-200 rounded-xl">
                  <Text className="text-gray-600 text-sm font-medium">Je me suis trompé</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}

      {question.explanation && selected && (
        <Text className="mt-3 text-sm text-gray-500 bg-sand-100 rounded-xl p-3">{question.explanation}</Text>
      )}
    </View>
  )
}
