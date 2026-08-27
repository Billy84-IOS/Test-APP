import '../global.css'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ProgressProvider, useProgress } from '../src/context/ProgressContext'
import { OnboardingScreen } from '../src/screens/OnboardingScreen'

function RootNavigator() {
  const { progress } = useProgress()

  if (!progress.onboarded) {
    return <OnboardingScreen />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="vocabulaire" />
      <Stack.Screen name="conversations" />
      <Stack.Screen name="ecouter" options={{ headerShown: true, title: 'Mode écoute' }} />
      <Stack.Screen name="dictionnaire" options={{ headerShown: true, title: 'Dictionnaire' }} />
      <Stack.Screen name="favoris" options={{ headerShown: true, title: 'Mes favoris' }} />
      <Stack.Screen name="recherche" options={{ headerShown: true, title: 'Recherche' }} />
      <Stack.Screen name="au-maroc" options={{ headerShown: true, title: 'Je suis au Maroc' }} />
      <Stack.Screen name="parler" options={{ headerShown: true, title: 'Je veux parler' }} />
      <Stack.Screen name="comprendre" options={{ headerShown: true, title: 'Je veux comprendre' }} />
      <Stack.Screen name="traduire" options={{ headerShown: true, title: 'Traduction en direct' }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProgressProvider>
          <StatusBar style="dark" />
          <RootNavigator />
        </ProgressProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
