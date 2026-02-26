import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

interface EmojiSquareProps {
  text: string
  tags: string[]
}

const EmojiSquare: React.FC<EmojiSquareProps> = ({ text, tags }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <div className="relative h-40 flex items-center justify-center cursor-pointer group-hover:bg-slate-50 transition-colors">
          <p className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-125">
            {text}
          </p>
          
          {copied && (
            <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/90 text-white font-bold animate-in fade-in zoom-in duration-200">
              COPIED!
            </div>
          )}
          
          {!copied && (
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-slate-400 font-medium">
              Click to copy
            </div>
          )}
        </div>
      </CopyToClipboard>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-500 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default EmojiSquare
