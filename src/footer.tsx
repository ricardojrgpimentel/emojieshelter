import React from 'react'

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12">
    <div className="container mx-auto px-4 text-center">
      <p className="flex items-center justify-center gap-2 mb-4">
        Made with 
        <span className="text-rose-500 animate-pulse">♥</span> 
        by 
        <a 
          href="https://github.com/ricardojrgpimentel" 
          rel="noopener noreferrer" 
          target="_blank"
          className="text-white hover:text-indigo-400 transition-colors font-medium"
        >
          Ricardo Pimentel
        </a>
      </p>
      <div className="text-xs text-slate-600">
        &copy; {new Date().getFullYear()} EmojiShelter. All rights reserved.
      </div>
    </div>
  </footer>
)

export default Footer
