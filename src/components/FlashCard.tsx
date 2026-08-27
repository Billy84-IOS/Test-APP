import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { AudioButton } from './AudioButton'

interface FlashCardProps {
  front: string
  frontSub?: string
  back: string
  onKnow: () => void
  onDontKnow: () => void
}

export function FlashCard({ front, frontSub, back, onKnow, onDontKnow }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <View className="w-full max-w-md self-center">
      <Pressable
        onPress={() => setFlipped((f) => !f)}
        className="w-full min-h-[220px] bg-white border-2 border-sand-200 rounded-3xl items-center justify-center gap-3 p-6"
      >
        {!flipped ? (
          <>
            <Text className="text-3xl text-center">{front}</Text>
            {frontSub ? <Text className="text-gray-400 text-sm">{frontSub}</Text> : null}
            <Text className="text-xs text-gray-300 mt-2">Touche pour retourner</Text>
          </>
        ) : (
          <Text className="text-2xl font-semibold text-brand-600 text-center">{back}</Text>
        )}
      </Pressable>

      <View className="items-center mt-3">
        <AudioButton text={front} />
      </View>

      {flipped && (
        <View className="flex-row gap-3 mt-5">
          <Pressable
            onPress={onDontKnow}
            className="flex-1 py-3 rounded-2xl bg-white border border-sand-200 items-center active:opacity-70"
          >
            <Text className="text-gray-600 font-semibold">😕 Je ne connais pas</Text>
          </Pressable>
          <Pressable
            onPress={onKnow}
            className="flex-1 py-3 rounded-2xl bg-teal-500 items-center active:opacity-70"
          >
            <Text className="text-white font-semibold">✅ Je connais</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}
