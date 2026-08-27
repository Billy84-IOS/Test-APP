import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { speak } from '../lib/tts'

export function AudioButton({ text, size = 'md' }: { text: string; size?: 'sm' | 'md' | 'lg' }) {
  const [playing, setPlaying] = useState(false)
  const dims = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'
  const emojiSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-base'

  const handlePress = (rate: 'normal' | 'lent') => {
    setPlaying(true)
    speak(text, rate)
    setTimeout(() => setPlaying(false), 1200)
  }

  return (
    <View className="flex-row items-center gap-1">
      <Pressable
        onPress={() => handlePress('normal')}
        accessibilityLabel={`Écouter ${text}`}
        className={`${dims} rounded-full bg-teal-500 items-center justify-center active:opacity-70 ${playing ? 'opacity-70' : ''}`}
      >
        <Text className={emojiSize}>🔊</Text>
      </Pressable>
      <Pressable
        onPress={() => handlePress('lent')}
        accessibilityLabel={`Écouter ${text} lentement`}
        className="w-7 h-7 rounded-full bg-sand-200 items-center justify-center active:opacity-70"
      >
        <Text className="text-xs">🐢</Text>
      </Pressable>
    </View>
  )
}
