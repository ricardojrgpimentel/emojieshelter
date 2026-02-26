import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { motion, AnimatePresence } from 'framer-motion'

interface EmojiSquareProps {
  text: string
  tags: string[]
  isSheltered?: boolean
  onToggleShelter?: () => void
}

const EmojiSquare: React.FC<EmojiSquareProps> = ({ 
  text, 
  tags, 
  isSheltered = false, 
  onToggleShelter 
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 relative flex flex-col h-full"
    >
      <button 
        onClick={(e) => {
          e.stopPropagation()
          onToggleShelter?.()
        }}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-2xl transition-all duration-200 ${
          isSheltered 
            ? 'bg-rose-900/30 text-rose-400 shadow-sm' 
            : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100'
        } hover:scale-110 active:scale-90`}
      >
        {isSheltered ? '💖' : '🤍'}
      </button>

      <CopyToClipboard text={text} onCopy={handleCopy}>
        <div className="relative h-56 flex items-center justify-center cursor-pointer group-hover:bg-slate-800/30 transition-colors px-10 overflow-hidden">
          <p className="text-4xl md:text-5xl transition-transform duration-500 group-hover:scale-110 select-all whitespace-pre-wrap text-center font-mono leading-tight break-all text-white drop-shadow-sm group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            {text}
          </p>
          
          <AnimatePresence>
            {copied && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 flex items-center justify-center bg-indigo-600/90 text-white font-bold z-20"
              >
                COPIED!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Click to copy
          </div>
        </div>
      </CopyToClipboard>

      <div className="p-5 border-t border-slate-800 bg-slate-900/30 flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-400 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default EmojiSquare
