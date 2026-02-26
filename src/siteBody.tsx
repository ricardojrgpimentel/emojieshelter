import React, { useState } from 'react'
import EmojiSquare from './emojiSquare'
import { emojis as ALL_EMOJIS } from './emojis.json'

interface EmojiData {
  text: string
  tags: string[]
}

const categories = ['happy', 'pun', 'sad', 'confuse', 'angry'] as const

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

  const allEmojis: EmojiData[] = ALL_EMOJIS as EmojiData[]

  const filtered = selected
    ? allEmojis.filter(e => e.tags.includes(selected))
    : allEmojis

  const emojis = shuffleArray(filtered)

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap justify-center gap-3 mb-12">
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {emojis.map((emoji, idx) => (
          <EmojiSquare key={idx} text={emoji.text} tags={emoji.tags} />
        ))}
      </div>
    </main>
  )
}

export default SiteBody
