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
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-xl relative flex flex-col h-full"
    >
      <button 
        onClick={(e) => {
          e.stopPropagation()
          onToggleShelter?.()
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
          isSheltered 
            ? 'bg-rose-100 text-rose-600 shadow-sm' 
            : 'bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100'
        } hover:scale-110 active:scale-90`}
      >
        {isSheltered ? '🏠' : '🏚️'}
      </button>

      <CopyToClipboard text={text} onCopy={handleCopy}>
        <div className="relative h-48 flex items-center justify-center cursor-pointer group-hover:bg-slate-50/50 transition-colors px-6 overflow-hidden">
          <p className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110 select-all whitespace-pre-wrap text-center font-mono leading-tight break-all">
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

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Click to copy
          </div>
        </div>
      </CopyToClipboard>

      <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-500 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default EmojiSquare
