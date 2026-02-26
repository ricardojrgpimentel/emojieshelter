import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [selected, setSelected] = useState<typeof categories[number] | 'shelter' | null>(null)
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
    <main className="container mx-auto px-4 py-12 relative">
      {/* Search and Categories Container */}
      <div className="max-w-4xl mx-auto mb-16 space-y-12">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <input
              type="text"
              placeholder="Search for an emoji..."
              className="w-full px-8 py-5 bg-white/80 backdrop-blur-sm border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-xl text-xl font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-4">
              <AnimatePresence>
                {search && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => setSearch('')} 
                    className="hover:text-indigo-600 transition-colors bg-slate-100 p-1.5 rounded-full"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </motion.button>
                )}
              </AnimatePresence>
              <span className="text-2xl group-focus-within:animate-bounce">🔍</span>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <CategoryButton
            active={!selected}
            onClick={() => setSelected(null)}
            label="All"
            color="indigo"
          />

          {categories.map((cat, idx) => (
            <CategoryButton
              key={cat}
              active={selected === cat}
              onClick={() => setSelected(cat)}
              label={cat.charAt(0).toUpperCase() + cat.slice(1)}
              color="indigo"
              delay={idx * 0.05}
            />
          ))}

          <CategoryButton
            active={selected === 'shelter'}
            onClick={() => setSelected('shelter')}
            label={`🏠 Shelter (${sheltered.length})`}
            color="rose"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full font-bold transition-all duration-300 bg-slate-900 text-white shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2"
            onClick={() => {
              const random = allEmojis[Math.floor(Math.random() * allEmojis.length)]
              setSearch(random.text)
              setSelected(null)
            }}
          >
            🎲 Random
          </motion.button>
        </motion.div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((emoji, idx) => (
            <motion.div
              key={`${emoji.text}-${idx}`}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ 
                duration: 0.3,
                layout: { type: "spring", stiffness: 300, damping: 30 }
              }}
            >
              <EmojiSquare 
                text={emoji.text} 
                tags={emoji.tags} 
                isSheltered={sheltered.includes(emoji.text)}
                onToggleShelter={() => toggleShelter(emoji.text)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-32"
          >
            <div className="text-6xl mb-6">🤷‍♂️</div>
            <h3 className="text-3xl font-black text-slate-800 mb-2">No emojis found</h3>
            <p className="text-slate-500 text-lg">Try a different search or category!</p>
            <button 
              onClick={() => { setSearch(''); setSelected(null); }}
              className="mt-8 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

interface CategoryButtonProps {
  active: boolean
  onClick: () => void
  label: string
  color: 'indigo' | 'rose'
  delay?: number
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ active, onClick, label, color, delay = 0 }) => {
  const activeClasses = color === 'indigo' 
    ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/40 ring-4 ring-indigo-500/10'
    : 'bg-rose-600 text-white border-rose-600 shadow-rose-500/40 ring-4 ring-rose-500/10'
  
  const inactiveClasses = color === 'indigo'
    ? 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50'
    : 'bg-white text-rose-600 border-slate-200 hover:border-rose-400 hover:bg-rose-50'

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 border shadow-sm ${
        active ? activeClasses : inactiveClasses
      }`}
    >
      {label}
    </motion.button>
  )
}

export default SiteBody
