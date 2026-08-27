import { Tabs } from 'expo-router'
import { Text } from 'react-native'
import { useProgress } from '../../src/context/ProgressContext'

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
}

export default function TabsLayout() {
  const { progress } = useProgress()

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: 'Darija',
        headerRight: () => (
          <Text style={{ marginRight: 16, fontWeight: '600' }}>
            ✨ {progress.xp}  🔥 {progress.streakDays}
          </Text>
        ),
        tabBarActiveTintColor: '#c1272d',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil', tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} /> }} />
      <Tabs.Screen name="apprendre" options={{ title: 'Apprendre', tabBarIcon: ({ focused }) => <TabIcon icon="📚" focused={focused} /> }} />
      <Tabs.Screen name="exercices" options={{ title: 'Exercices', tabBarIcon: ({ focused }) => <TabIcon icon="✏️" focused={focused} /> }} />
      <Tabs.Screen name="revisions" options={{ title: 'Révisions', tabBarIcon: ({ focused }) => <TabIcon icon="🔁" focused={focused} /> }} />
      <Tabs.Screen name="progres" options={{ title: 'Progrès', tabBarIcon: ({ focused }) => <TabIcon icon="📈" focused={focused} /> }} />
    </Tabs>
  )
}
