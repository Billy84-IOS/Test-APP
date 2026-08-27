import { Link, useParams } from 'react-router-dom'
import { categories } from '../data/categories'
import { vocabulary } from '../data/vocabulary'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'

export function VocabularyCategory() {
  const { categoryId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const words = vocabulary.filter((v) => v.categoryId === categoryId)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link to="/vocabulaire" className="text-sm text-gray-400 mb-2 inline-block">← Toutes les catégories</Link>
      <h1 className="text-2xl font-bold mb-6">{category?.icon} {category?.name}</h1>
      {words.length === 0 ? (
        <p className="text-gray-400">Aucun mot dans cette catégorie pour le moment.</p>
      ) : (
        <div className="space-y-2">
          {words.map((w) => (
            <div key={w.id} className="bg-white border border-sand-200 rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-arabic text-xl">{w.darija}</p>
                <p className="text-xs text-gray-400">{w.translit}</p>
                <p className="font-medium">{w.fr}</p>
                {w.example && (
                  <p className="text-xs text-gray-400 mt-1">{w.example.translit} — {w.example.fr}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <AudioButton text={w.darija} />
                <FavoriteButton kind="vocab" itemId={w.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
