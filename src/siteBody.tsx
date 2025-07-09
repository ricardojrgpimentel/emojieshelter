import React, { useState } from 'react'
import EmojiSquare from './emojiSquare'
import DATA from './emojis.json'

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

  const allEmojis: EmojiData[] = (DATA as any).emojis

  const filtered = selected
    ? allEmojis.filter(e => e.tags.includes(selected))
    : allEmojis

  const emojis = shuffleArray(filtered)

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <ul className='list-menu'>
            <li className={!selected ? 'active' : ''} onClick={() => setSelected(null)}>All</li>
            {categories.map(cat => (
              <li
                key={cat}
                className={selected === cat ? 'active' : ''}
                onClick={() => setSelected(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        {emojis.map((emoji, idx) => (
          <EmojiSquare key={idx} text={emoji.text} tags={emoji.tags} />
        ))}
      </div>
    </div>
  )
}

export default SiteBody
