import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmojiSquare from './emojiSquare'
import { emojis as ALL_EMOJIS } from './emojis.json'

interface EmojiData {
  text: string
  tags: string[]
}

interface SiteBodyProps {
  zenMode?: boolean
  onToggleZen?: () => void
}

const categories = ['happy', 'pun', 'sad', 'confuse', 'angry', 'animal', 'love', 'expressive', 'textart', 'music', 'food', 'nature'] as const

function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const SiteBody: React.FC<SiteBodyProps> = ({ zenMode = false, onToggleZen }) => {
  const [selected, setSelected] = useState<typeof categories[number] | 'shelter' | 'recent' | null>(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category') as any
    if (cat === 'shelter' || cat === 'recent' || categories.includes(cat)) return cat
    return null
  })
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('search') || ''
  })

  // Update URL when search or selected changes
  useEffect(() => {
    const url = new URL(window.location.href)
    if (search) {
      url.searchParams.set('search', search)
    } else {
      url.searchParams.delete('search')
    }

    if (selected) {
      url.searchParams.set('category', selected)
    } else {
      url.searchParams.delete('category')
    }

    window.history.replaceState({}, '', url.toString())
  }, [search, selected])

  const [sheltered, setSheltered] = useState<string[]>(() => {
    const saved = localStorage.getItem('sheltered_emojis')
    return saved ? JSON.parse(saved) : []
  })
  const [recents, setRecents] = useState<string[]>(() => {
    const saved = localStorage.getItem('recent_emojis')
    return saved ? JSON.parse(saved) : []
  })
  const [customEmojis, setCustomEmojis] = useState<EmojiData[]>(() => {
    const saved = localStorage.getItem('custom_emojis')
    return saved ? JSON.parse(saved) : []
  })

  const [showAddModal, setShowAddModal] = useState(false)
  const [newEmojiText, setNewEmojiText] = useState('')
  const [newEmojiTags, setNewEmojiTags] = useState('')
  const [lastCopied, setLastCopied] = useState<string | null>(null)

  const allEmojis: EmojiData[] = useMemo(() => [...(ALL_EMOJIS as EmojiData[]), ...customEmojis], [customEmojis])

  const filtered = useMemo(() => {
    let result = allEmojis

    if (selected === 'shelter') {
      result = result.filter(e => sheltered.includes(e.text))
    } else if (selected === 'recent') {
      result = recents.map(text => allEmojis.find(e => e.text === text)).filter(Boolean) as EmojiData[]
      return result // Don't shuffle recents
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
  }, [selected, search, sheltered, recents, allEmojis])

  const toggleShelter = (text: string) => {
    setSheltered(prev => {
      const next = prev.includes(text)
        ? prev.filter(t => t !== text)
        : [...prev, text]
      localStorage.setItem('sheltered_emojis', JSON.stringify(next))
      return next
    })
  }

  const handleEmojiCopy = (text: string) => {
    setLastCopied(text)
    setRecents(prev => {
      const next = [text, ...prev.filter(t => t !== text)].slice(0, 12)
      localStorage.setItem('recent_emojis', JSON.stringify(next))
      return next
    })
  }

  const handleAddEmoji = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmojiText) return
    const tags = newEmojiTags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    const newEmoji: EmojiData = { text: newEmojiText, tags }
    const updated = [...customEmojis, newEmoji]
    setCustomEmojis(updated)
    localStorage.setItem('custom_emojis', JSON.stringify(updated))
    setNewEmojiText('')
    setNewEmojiTags('')
    setShowAddModal(false)
  }

  const exportShelter = () => {
    const data = {
      sheltered: sheltered,
      custom: customEmojis
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `emojie-shelter-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importShelter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (data.sheltered) {
          setSheltered(data.sheltered)
          localStorage.setItem('sheltered_emojis', JSON.stringify(data.sheltered))
        }
        if (data.custom) {
          setCustomEmojis(data.custom)
          localStorage.setItem('custom_emojis', JSON.stringify(data.custom))
        }
        alert('Shelter imported successfully!')
      } catch (err) {
        alert('Failed to import: Invalid file format.')
      }
    }
    reader.readAsText(file)
  }

  const handleTagClick = (tag: string) => {
    const category = categories.find(c => c === tag)
    if (category) {
      setSelected(category)
      setSearch('')
    } else {
      setSelected(null)
      setSearch(tag)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main id="gallery" className="container mx-auto px-4 py-24 relative transition-colors duration-500 scroll-mt-20">
      {/* Search and Categories Container */}
      <div className="max-w-4xl mx-auto mb-16 space-y-12">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <input
              type="text"
              placeholder="Search for an emoji..."
              aria-label="Search emojis"
              className="w-full px-8 py-5 bg-slate-900/80 backdrop-blur-sm border-2 border-slate-800 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-xl text-xl font-medium text-slate-100 placeholder:text-slate-600"
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
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
            label="All Emojis"
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
            label={`💖 My Shelter (${sheltered.length})`}
            color="rose"
          />

          {recents.length > 0 && (
            <CategoryButton
              active={selected === 'recent'}
              onClick={() => setSelected('recent')}
              label={`🕒 Recent (${recents.length})`}
              color="indigo"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full font-bold transition-all duration-300 bg-slate-800 text-white shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2"
            onClick={() => {
              const random = allEmojis[Math.floor(Math.random() * allEmojis.length)]
              setSearch(random.text)
              setSelected(null)
            }}
          >
            🎲 Random
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full font-bold transition-all duration-300 bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/40 flex items-center gap-2"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add Custom
          </motion.button>

          <div className="flex gap-2">
            <button
              onClick={onToggleZen}
              className={`p-3 rounded-full transition-colors ${zenMode ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              title={zenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
            >
              👁️
            </button>
            <button
              onClick={exportShelter}
              className="p-3 bg-slate-800 text-slate-300 rounded-full hover:bg-slate-700 transition-colors"
              title="Export Shelter"
            >
              📤
            </button>
            <label className="p-3 bg-slate-800 text-slate-300 rounded-full hover:bg-slate-700 transition-colors cursor-pointer" title="Import Shelter">
              📥
              <input type="file" accept=".json" onChange={importShelter} className="hidden" />
            </label>
          </div>
        </motion.div>
      </div>

      {/* Add Emoji Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-white mb-6">Create Custom Emoji</h3>
              <form onSubmit={handleAddEmoji} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Emoji Text</label>
                  <input
                    autoFocus
                    type="text"
                    required
                    placeholder="( ͡° ͜ʖ ͡°)"
                    className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:border-indigo-500 focus:outline-none text-white text-xl font-mono"
                    value={newEmojiText}
                    onChange={(e) => setNewEmojiText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="happy, pun, funny"
                    className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:border-indigo-500 focus:outline-none text-white"
                    value={newEmojiTags}
                    onChange={(e) => setNewEmojiTags(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    Create Emoji
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                onTagClick={handleTagClick}
                onCopy={handleEmojiCopy}
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
            <h3 className="text-3xl font-black text-slate-100 mb-2">No emojis found</h3>
            <p className="text-slate-400 text-lg">Try a different search or category!</p>
            <button 
              onClick={() => { setSearch(''); setSelected(null); }}
              className="mt-8 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* About Section */}
      {!zenMode && (
        <motion.section 
          id="about" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto py-32 border-t border-slate-900 mt-24"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-6 tracking-tight">
                A Sanctuary for <span className="text-indigo-400">Characters</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Emoji Shelter was born from a simple idea: that digital expressions deserve a place to shine. We curate the most beautiful, expressive, and unique unicode characters so you can find exactly what you need to breathe life into your conversations.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 uppercase tracking-widest">
                  100% Unicode
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 uppercase tracking-widest">
                  Privacy First
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 border border-slate-800 backdrop-blur-sm">
              <div className="text-6xl mb-4 group-hover:animate-bounce transition-all">🏠</div>
              <h3 className="text-xl font-bold text-white mb-2">Build Your Shelter</h3>
              <p className="text-slate-500">
                Save your favorite emojis to your personal local shelter. No accounts, no tracking—just your favorite expressions, right where you need them.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Live Preview Sticky Bar */}
      <AnimatePresence>
        {lastCopied && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-2xl"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl shadow-indigo-500/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Live Context Preview</span>
                <button onClick={() => setLastCopied(null)} className="text-slate-500 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 italic text-lg text-slate-300">
                "Hello! This is how your emoji <span className="text-white font-mono not-italic bg-indigo-500/20 px-2 py-1 rounded mx-1">{lastCopied}</span> looks in a sentence."
              </div>
              <p className="mt-4 text-[10px] text-slate-500 text-center font-medium">The preview shows your last copied emoji</p>
            </div>
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
    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:border-indigo-400 hover:bg-indigo-900/20'
    : 'bg-slate-900 text-rose-400 border-slate-800 hover:border-rose-400 hover:bg-rose-900/20'

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
