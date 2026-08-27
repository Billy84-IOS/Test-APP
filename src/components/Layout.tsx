import { NavLink, Outlet } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'

const NAV_ITEMS = [
  { to: '/', label: 'Accueil', icon: '🏠', end: true },
  { to: '/apprendre', label: 'Apprendre', icon: '📚' },
  { to: '/vocabulaire', label: 'Vocabulaire', icon: '🗂️' },
  { to: '/conversations', label: 'Conversations', icon: '💬' },
  { to: '/ecouter', label: 'Écouter', icon: '👂' },
  { to: '/exercices', label: 'Exercices', icon: '✏️' },
  { to: '/revisions', label: 'Révisions', icon: '🔁' },
  { to: '/progres', label: 'Progrès', icon: '📈' },
]

const MOBILE_ITEMS = [NAV_ITEMS[0], NAV_ITEMS[1], NAV_ITEMS[5], NAV_ITEMS[6], NAV_ITEMS[7]]

export function Layout() {
  const { progress } = useProgress()

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-sand-50 text-gray-800">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:flex-col md:w-60 md:shrink-0 border-r border-sand-200 bg-white h-screen sticky top-0">
        <div className="p-5 flex items-center gap-2">
          <span className="text-2xl">🇲🇦</span>
          <span className="font-bold text-lg text-brand-600">Darija</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-sand-100'
                }`
              }
            >
              <span className="text-lg" aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/dictionnaire"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-sand-100'
              }`
            }
          >
            <span className="text-lg" aria-hidden>📕</span>
            Dictionnaire
          </NavLink>
          <NavLink
            to="/favoris"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-sand-100'
              }`
            }
          >
            <span className="text-lg" aria-hidden>⭐</span>
            Favoris
          </NavLink>
        </nav>
        <div className="p-4 text-xs text-gray-400">100% gratuit · sans compte</div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-sand-200 px-4 py-3 flex items-center justify-between md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-xl">🇲🇦</span>
            <span className="font-bold text-brand-600">Darija</span>
          </div>
          <NavLink to="/recherche" className="flex-1 max-w-sm mx-3 md:mx-0" aria-label="Recherche">
            <div className="flex items-center gap-2 bg-sand-100 rounded-full px-4 py-2 text-sm text-gray-400">
              🔍 <span className="hidden sm:inline">Rechercher un mot, une phrase...</span>
              <span className="sm:hidden">Rechercher...</span>
            </div>
          </NavLink>
          <div className="flex items-center gap-3 text-sm font-semibold shrink-0">
            <span className="flex items-center gap-1 text-gold-400" title="Points d'expérience">✨ {progress.xp}</span>
            <span className="flex items-center gap-1 text-brand-500" title="Série de jours">🔥 {progress.streakDays}</span>
          </div>
        </header>

        <main className="flex-1 app-scroll pb-20 md:pb-8">
          <Outlet />
        </main>

        {/* Bottom nav mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-sand-200 flex justify-around py-1.5 pb-[env(safe-area-inset-bottom)]">
          {MOBILE_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[11px] font-medium min-w-[56px] ${
                  isActive ? 'text-brand-600' : 'text-gray-400'
                }`
              }
            >
              <span className="text-xl" aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
