import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { vocabulary } from '../data/vocabulary'

export function Vocabulary() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">🗂️ Vocabulaire</h1>
      <p className="text-gray-500 mb-6">{vocabulary.length} mots organisés par catégorie.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const count = vocabulary.filter((v) => v.categoryId === cat.id).length
          if (count === 0) return null
          return (
            <Link key={cat.id} to={`/vocabulaire/${cat.id}`} className="bg-white border border-sand-200 rounded-xl p-4 active:scale-95 transition">
              <p className="text-2xl mb-1">{cat.icon}</p>
              <p className="font-medium text-sm">{cat.name}</p>
              <p className="text-xs text-gray-400">{count} mots</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
