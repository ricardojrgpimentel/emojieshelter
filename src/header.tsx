import React from 'react'

const Header: React.FC = () => (
  <header className="relative bg-slate-900 text-white overflow-hidden">
    {/* Decorative background pattern */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500 rounded-full blur-[100px]" />
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500 rounded-full blur-[100px]" />
    </div>

    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          Emoji<span className="text-indigo-400">Shelter</span>
          <span className="text-amber-400 inline-block ml-2 animate-pulse">.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          A cozy place for your favorite unicode emojis. Browse, copy, and share them anywhere.
        </p>
      </div>
    </div>
  </header>
)

export default Header
