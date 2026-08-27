import { Stack } from 'expo-router'

export default function ConversationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Conversations' }} />
      <Stack.Screen name="[conversationId]" options={{ title: 'Conversation' }} />
    </Stack>
  )
}
