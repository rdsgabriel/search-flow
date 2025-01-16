import SearchComponent from '@/components/SearchComponent'
import Description from '@/components/Description'

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative flex flex-col items-center justify-center p-8 pb-16">

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
          SearchFlow
        </h1>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Experimente nossa busca inteligente.
        </p>
        <SearchComponent />
      </div>

      <Description />
    </main>
  )
}

