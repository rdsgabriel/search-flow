"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Search, Code, Database, Zap, Github, ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Dados estáticos que não mudam
const ALL_TERMS = [
  "algoritmos de busca fuzzy",
  "algoritmos de busca trie",
  "algoritmos de busca tf-idf",
  "algoritmos de busca pagerank",
  "algoritmos de autocomplete",
  "algoritmos de indexação",
  "algoritmos de cache",
  "algoritmos de websocket",
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Memoize as sugestões filtradas
  const filteredSuggestions = useMemo(() => {
    if (search.trim() === "") return []
    return ALL_TERMS.filter((term) => 
      term.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  // Atualizar sugestões apenas quando filteredSuggestions mudar
  useEffect(() => {
    setShowSuggestions(true)
  }, [filteredSuggestions])

  // Memoize o handler de clique fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-2 items-center text-xl font-bold">
            <Search className="h-5 w-5" />
            <span>SearchFlow</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="#demo"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block"
            >
              Demo
            </Link>
            <Link
              href="#tech"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block"
            >
              Algoritmos
            </Link>
            <Link
              href="https://github.com/rdsgabriel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">SearchFlow</h1>
                  <p className="text-xl text-muted-foreground">Motor de busca inteligente com autocomplete</p>
                  <p className="max-w-[600px] text-muted-foreground">
                    Projetado para fornecer sugestões rápidas e precisas, utilizando tecnologias como Trie, Fuzzy
                    Search, TF-IDF e PageRank. Um projeto experimental para estudo e demonstração.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="group" asChild>
                    <Link href="#demo">
                      Ver demonstração
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline">Documentação</Button>
                </div>
              </div>
              <div className="relative w-full h-[300px] rounded-lg bg-gradient-to-br from-muted/50 to-muted p-6 flex items-center justify-center overflow-hidden mx-auto max-w-[400px]">
                {/* Grid de fundo */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0.5">
                  {Array(64)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="bg-foreground/5 rounded-sm"></div>
                    ))}
                </div>

                {/* Círculos concêntricos com animação de onda - com fade-in */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Círculos de onda com animação - começam transparentes */}
                  <div className="absolute w-[120px] h-[120px] rounded-full border border-primary/20 animate-ripple-fade"></div>
                  <div
                    className="absolute w-[120px] h-[120px] rounded-full border border-primary/20 animate-ripple-fade"
                    style={{ animationDelay: "0.8s" }}
                  ></div>
                  <div
                    className="absolute w-[120px] h-[120px] rounded-full border border-primary/20 animate-ripple-fade"
                    style={{ animationDelay: "1.6s" }}
                  ></div>
                  <div
                    className="absolute w-[120px] h-[120px] rounded-full border border-primary/20 animate-ripple-fade"
                    style={{ animationDelay: "2.4s" }}
                  ></div>

                  {/* Círculos estáticos */}
                  <div className="w-40 h-40 rounded-full border border-primary/10 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-primary/15 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center">
                        <Search className="h-12 w-12 text-primary/50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pontos espalhados com efeito de piscar */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array(12)
                    .fill(0)
                    .map((_, i) => {
                      // Gerar posições mais aleatórias mas consistentes
                      const angle = (i * 30 + (i * 17)) % 360; // Ângulo base + offset para variar
                      const radius = 30 + (i * 13) % 40; // Raio base + offset para variar
                      const top = 50 + radius * Math.sin(angle * Math.PI / 180);
                      const left = 50 + radius * Math.cos(angle * Math.PI / 180);
                      const delay = (i * 0.3) % 3;
                      
                      return (
                        <div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 animate-radar-blink"
                          style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            animationDelay: `${delay}s`,
                          }}
                        ></div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Experimente o SearchFlow</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Digite no campo abaixo para ver o autocomplete em ação, com sugestões baseadas nos algoritmos
                implementados.
              </p>
            </div>

            <div className="mx-auto max-w-2xl border rounded-lg shadow-lg p-4 sm:p-6 bg-background">
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-2 border rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Digite para buscar (ex: algoritmos de...)"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  {/* Dropdown de sugestões que cobre o conteúdo abaixo */}
                  {showSuggestions && (
                    <div
                      ref={searchRef}
                      className="absolute z-10 left-0 right-0 mt-1 border rounded-md overflow-hidden shadow-md bg-background"
                    >
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSearch(suggestion)
                            setShowSuggestions(false)
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-muted/30 rounded-md p-4">
                  <h3 className="font-medium mb-2">Como funciona:</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    O SearchFlow utiliza algoritmos avançados para prever e sugerir termos de busca enquanto você
                    digita, melhorando a experiência e a precisão dos resultados.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A base de dados atual é usada somente para demonstração. o Projeto pode ser utilizado em contextos totalmente diferentes.  
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">Algoritmos Implementados</h2>
              <p className="max-w-[700px] text-muted-foreground">
                O SearchFlow combina algoritmos sofisticados para oferecer uma experiência de busca superior.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              <div className="bg-background rounded-lg border p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">Trie</h3>
                  <p className="text-sm text-muted-foreground">Árvore de Prefixo para sugestões rápidas e eficientes</p>
                </div>
              </div>

              <div className="bg-background rounded-lg border p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">Fuzzy Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Algoritmos tolerantes a erros de digitação e variações
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-lg border p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">TF-IDF</h3>
                  <p className="text-sm text-muted-foreground">
                    Relevância baseada na frequência e importância dos termos
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-lg border p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">PageRank</h3>
                  <p className="text-sm text-muted-foreground">
                    Classificação inteligente baseada em relevância contextual
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex gap-2 items-center">
            <Search className="h-5 w-5" />
            <span className="font-semibold">SearchFlow</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SearchFlow - Projeto experimental para estudo e demonstração
          </p>
        </div>
      </footer>
    </div>
  )
}

