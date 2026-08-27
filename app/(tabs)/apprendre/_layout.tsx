import { Stack } from 'expo-router'

export default function ApprendreLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Apprendre' }} />
      <Stack.Screen name="[lessonId]" options={{ title: 'Leçon' }} />
    </Stack>
  )
}
