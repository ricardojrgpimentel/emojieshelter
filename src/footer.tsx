import React from 'react'
import { motion } from 'framer-motion'

const Footer: React.FC = () => (
  <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-2xl font-black text-white mb-2">
            Emoji<span className="text-indigo-400">Shelter</span>
          </div>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Your cozy corner for the best unicode emojis on the web.
          </p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-6 text-slate-300"
        >
          Crafted with 
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-rose-500"
          >
            ♥
          </motion.span> 
          by 
          <a 
            href="https://github.com/ricardojrgpimentel" 
            rel="noopener noreferrer" 
            target="_blank"
            className="text-white hover:text-indigo-400 transition-colors font-bold underline decoration-indigo-500/30 underline-offset-4"
          >
            Ricardo Pimentel
          </a>
        </motion.p>

        <div className="flex gap-6 mb-10">
          {['Twitter', 'GitHub', 'LinkedIn'].map((link) => (
            <a 
              key={link}
              href="#" 
              className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.2em]"
        >
          &copy; {new Date().getFullYear()} EmojiShelter. Design & Experience.
        </motion.div>
      </div>
    </div>
  </footer>
)

export default Footer
