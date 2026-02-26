import React, { useState, useMemo } from 'react'
import EmojiSquare from './emojiSquare'
import { emojis as ALL_EMOJIS } from './emojis.json'

interface EmojiData {
  text: string
  tags: string[]
}

const categories = ['happy', 'pun', 'sad', 'confuse', 'angry', 'animal', 'love', 'expressive', 'textart'] as const

function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const SiteBody: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sheltered, setSheltered] = useState<string[]>(() => {
    const saved = localStorage.getItem('sheltered_emojis')
    return saved ? JSON.parse(saved) : []
  })

  const allEmojis: EmojiData[] = ALL_EMOJIS as EmojiData[]

  const filtered = useMemo(() => {
    let result = allEmojis

    if (selected === 'shelter') {
      result = result.filter(e => sheltered.includes(e.text))
    } else if (selected) {
      result = result.filter(e => e.tags.includes(selected))
    }

    if (search) {
      const lowSearch = search.toLowerCase()
      result = result.filter(
        e =>
          e.text.toLowerCase().includes(lowSearch) ||
          e.tags.some(t => t.toLowerCase().includes(lowSearch))
      )
    }

    return shuffleArray(result)
  }, [selected, search, sheltered, allEmojis])

  const toggleShelter = (text: string) => {
    setSheltered(prev => {
      const next = prev.includes(text)
        ? prev.filter(t => t !== text)
        : [...prev, text]
      localStorage.setItem('sheltered_emojis', JSON.stringify(next))
      return next
    })
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-12 space-y-8">
        {/* Search Bar */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Search emojis by tag or face..."
            className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-200 shadow-sm text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            {search ? (
              <button onClick={() => setSearch('')} className="hover:text-indigo-600">✕</button>
            ) : (
              <span>🔍</span>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 border ${
              !selected
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
            onClick={() => setSelected(null)}
          >
            All
          </button>
          
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 border ${
              selected === 'shelter'
                ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                : 'bg-white text-rose-600 border-slate-200 hover:border-rose-400 hover:bg-rose-50'
            }`}
            onClick={() => setSelected('shelter')}
          >
            🏠 Shelter ({sheltered.length})
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 border ${
                selected === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
              onClick={() => setSelected(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
          
          <button
            className="px-6 py-2 rounded-full font-medium transition-all duration-200 border bg-slate-800 text-white border-slate-800 hover:bg-slate-700 shadow-md"
            onClick={() => {
              const random = allEmojis[Math.floor(Math.random() * allEmojis.length)]
              setSearch(random.text)
              setSelected(null)
            }}
          >
            🎲 Random Pick
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((emoji, idx) => (
          <EmojiSquare 
            key={`${emoji.text}-${idx}`} 
            text={emoji.text} 
            tags={emoji.tags} 
            isSheltered={sheltered.includes(emoji.text)}
            onToggleShelter={() => toggleShelter(emoji.text)}
          />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">😿</p>
          <h3 className="text-2xl font-bold text-slate-800">No emojis found</h3>
          <p className="text-slate-500">Try a different search or category!</p>
        </div>
      )}
    </main>
  )
}

export default SiteBody
