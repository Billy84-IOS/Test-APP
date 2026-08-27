import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider, useProgress } from './context/ProgressContext'
import { Layout } from './components/Layout'
import { Onboarding } from './pages/Onboarding'
import { Home } from './pages/Home'
import { Learn } from './pages/Learn'
import { LessonDetail } from './pages/LessonDetail'
import { Vocabulary } from './pages/Vocabulary'
import { VocabularyCategory } from './pages/VocabularyCategory'
import { Conversations } from './pages/Conversations'
import { ConversationDetail } from './pages/ConversationDetail'
import { Listen } from './pages/Listen'
import { Exercises } from './pages/Exercises'
import { Review } from './pages/Review'
import { ProgressPage } from './pages/Progress'
import { Dictionary } from './pages/Dictionary'
import { Favorites } from './pages/Favorites'
import { Search } from './pages/Search'
import { Survival } from './pages/Survival'
import { Parler } from './pages/Parler'
import { Comprendre } from './pages/Comprendre'

function AppShell() {
  const { progress } = useProgress()

  if (!progress.onboarded) {
    return <Onboarding />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apprendre" element={<Learn />} />
          <Route path="apprendre/:lessonId" element={<LessonDetail />} />
          <Route path="vocabulaire" element={<Vocabulary />} />
          <Route path="vocabulaire/:categoryId" element={<VocabularyCategory />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="conversations/:conversationId" element={<ConversationDetail />} />
          <Route path="ecouter" element={<Listen />} />
          <Route path="exercices" element={<Exercises />} />
          <Route path="revisions" element={<Review />} />
          <Route path="progres" element={<ProgressPage />} />
          <Route path="dictionnaire" element={<Dictionary />} />
          <Route path="favoris" element={<Favorites />} />
          <Route path="recherche" element={<Search />} />
          <Route path="au-maroc" element={<Survival />} />
          <Route path="parler" element={<Parler />} />
          <Route path="comprendre" element={<Comprendre />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <ProgressProvider>
      <AppShell />
    </ProgressProvider>
  )
}

export default App
