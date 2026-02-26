import React from 'react'
import { motion } from 'framer-motion'

const floatingEmojis = ['🏠', '✨', '💖', '🌈', '🎨', '🌟', '🦄', '🍀']

const Header: React.FC = () => (
  <header className="relative bg-slate-950 text-white overflow-hidden py-28 md:py-40">
    {/* Animated background - "Aurora" style */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Mesh Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
          x: [-100, 100, -100],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -left-1/4 -top-1/4 w-[80rem] h-[80rem] bg-indigo-600/10 rounded-full blur-[150px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [45, 0, 45],
          x: [100, -100, 100],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -right-1/4 -bottom-1/4 w-[70rem] h-[70rem] bg-purple-600/10 rounded-full blur-[150px]" 
      />
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 top-1/4 w-[50rem] h-[50rem] bg-rose-500/10 rounded-full blur-[120px]" 
      />

      {/* Floating Emoji Particles */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            opacity: 0,
            scale: 0.5 + Math.random()
          }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 0.3, 0],
            rotate: 360
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "linear" 
          }}
          className="absolute text-2xl filter blur-[1px]"
        >
          {emoji}
        </motion.div>
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
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
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white ml-2 inline-block"
            >
              .
            </motion.span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-slate-400 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          A sanctuary for <span className="text-white font-medium">beautiful characters</span>. 
          Browse, save, and breathe life into your digital conversations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-sm shadow-xl">
                {['🦄', '🌈', '🎨', '✨'][i-1]}
              </div>
            ))}
            <div className="pl-6 text-sm text-slate-500 font-medium flex items-center">
              Joined by 10k+ creators
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </header>
)

export default Header
