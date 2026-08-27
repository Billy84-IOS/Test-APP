import { View } from 'react-native'

export function ProgressBar({ value, max, color = 'bg-teal-500' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <View
      className="w-full h-2.5 bg-sand-200 rounded-full overflow-hidden"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: pct }}
    >
      <View className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
    </View>
  )
}
