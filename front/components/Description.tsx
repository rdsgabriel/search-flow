'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

const Description = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-violet-100 p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-2 px-8 flex items-center justify-between bg-violet-100 hover:bg-violet-200 transition-colors duration-200 border rounded-md"
      >
        <span className="font-medium text-violet-600">Sobre o <strong>SearchFlow</strong></span>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-violet-500" />
        ) : (
          <ChevronUp className="w-5 h-5 text-violet-500" />
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-8 text-sm md:text-base text-gray-700 leading-relaxed">
              <p>
                O <strong>SearchFlow</strong> nasceu com fins de estudo e experimentação. A proposta é desenvolver um motor de busca inteligente com autocomplete, projetado para fornecer sugestões rápidas e precisas, utilizando tecnologias como <strong>Trie</strong> (Árvore de prefixo), <strong>Algoritmos de Fuzzy Search</strong>, <strong>TF-IDF</strong> e <strong>PageRank</strong>. Além disso, o projeto integra conceitos modernos de cache, comunicação em tempo real com WebSocket e um design funcional e intuitivo. Trata-se de um motor de busca inteligente, especializado para contextos específicos.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Description

