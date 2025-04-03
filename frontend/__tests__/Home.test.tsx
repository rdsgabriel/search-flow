import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Component', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByText('SearchFlow', { selector: 'h1' })
    expect(heading).toBeInTheDocument()
  })

  it('shows search suggestions when typing', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText(/Digite para buscar/i)
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'fuzzy' } })
    })

    const suggestion = screen.getByText(/algoritmos de busca fuzzy/i)
    expect(suggestion).toBeInTheDocument()
  })

  it('clears suggestions when clicking outside', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText(/Digite para buscar/i)
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'fuzzy' } })
    })

    const suggestion = screen.getByText(/algoritmos de busca fuzzy/i)
    expect(suggestion).toBeInTheDocument()

    await act(async () => {
      fireEvent.mouseDown(document.body)
    })

    expect(suggestion).not.toBeInTheDocument()
  })

  it('shows no suggestions when search is empty', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText(/Digite para buscar/i)
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'fuzzy' } })
      fireEvent.change(searchInput, { target: { value: '' } })
    })

    const suggestion = screen.queryByText(/algoritmos de busca fuzzy/i)
    expect(suggestion).not.toBeInTheDocument()
  })

  it('updates search input when clicking a suggestion', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText(/Digite para buscar/i)
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'fuzzy' } })
    })

    const suggestion = screen.getByText(/algoritmos de busca fuzzy/i)
    fireEvent.click(suggestion)

    expect(searchInput).toHaveValue('algoritmos de busca fuzzy')
    expect(suggestion).not.toBeInTheDocument()
  })

  it('shows multiple suggestions for partial matches', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText(/Digite para buscar/i)
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'algoritmos' } })
    })

    const suggestions = screen.getAllByText(/algoritmos/i)
    expect(suggestions.length).toBeGreaterThan(1)
  })

  it('renders all technology cards', () => {
    render(<Home />)
    expect(screen.getByText('Trie')).toBeInTheDocument()
    expect(screen.getByText('Fuzzy Search')).toBeInTheDocument()
    expect(screen.getByText('TF-IDF')).toBeInTheDocument()
    expect(screen.getByText('PageRank')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Home />)
    expect(screen.getByText('Demo')).toBeInTheDocument()
    expect(screen.getByText('Tecnologias')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('renders footer with current year', () => {
    render(<Home />)
    const currentYear = new Date().getFullYear().toString()
    const footer = screen.getByText(new RegExp(currentYear))
    expect(footer).toBeInTheDocument()
  })

  it('performs case-insensitive search', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText(/Digite para buscar/i)
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'FUZZY' } })
    })

    const suggestion = screen.getByText(/algoritmos de busca fuzzy/i)
    expect(suggestion).toBeInTheDocument()
  })
}) 