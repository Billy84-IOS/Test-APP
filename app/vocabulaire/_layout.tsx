import { Stack } from 'expo-router'

export default function VocabulaireLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Vocabulaire' }} />
      <Stack.Screen name="[categoryId]" options={{ title: 'Catégorie' }} />
    </Stack>
  )
}
