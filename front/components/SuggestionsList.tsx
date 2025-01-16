'use client'

import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SuggestionsListProps {
  suggestions: string[]
  query: string
}

const SuggestionsList: FC<SuggestionsListProps> = ({ suggestions, query }) => {
  if (suggestions.length === 0) return null

  const highlightMatch = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-violet-100 text-violet-900 font-medium">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    )
  }

  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-violet-100 overflow-hidden"
      >
        {suggestions.map((suggestion, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-violet-50 last:border-none"
          >
            <button
              className="w-full px-4 py-3 text-left hover:bg-violet-50 transition-colors duration-200"
              onClick={() => console.log('Selected:', suggestion)}
            >
              {highlightMatch(suggestion, query)}
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )
}

export default SuggestionsList

