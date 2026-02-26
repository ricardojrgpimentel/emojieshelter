import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const floatingEmojis = ['🏠', '✨', '💖', '🌈', '🎨', '🌟', '🦄', '🍀']

const Header: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <header className="relative bg-slate-950 text-white overflow-hidden py-32 md:py-48 lg:py-60">
      {/* Animated background - "Aurora" style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/20 to-slate-950 pointer-events-none" />
      </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs font-bold tracking-[0.3em] uppercase text-indigo-400"
        >
          Discover your inner expression
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 text-white drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            Emoji<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Shelter</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-slate-300 md:text-slate-400 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          A sanctuary for <span className="text-white font-medium">beautiful characters</span>. 
          Browse, save, and breathe life into your digital conversations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#gallery"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
          >
            Explore Gallery ✨
          </a>
          
          <div className="flex -space-x-3 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-sm shadow-xl"
                role="img"
                aria-label="creator avatar emoji"
              >
                {['🦄', '🌈', '🎨', '✨'][i-1]}
              </div>
            ))}
            <div className="pl-6 text-sm text-slate-400 font-medium whitespace-nowrap">
              Joined by 10k+ creators
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </header>
  )
}

export default Header
