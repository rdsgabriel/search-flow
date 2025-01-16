const mockData = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
  'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince',
  'Raspberry', 'Strawberry', 'Tangerine', 'Ugli Fruit', 'Watermelon'
]

export const searchApi = async (query: string): Promise<string[]> => {
  // Simula uma chamada de API com um atraso aleatório
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000))

  // Simula um erro aleatório (10% de chance)
  if (Math.random() < 0.1) {
    throw new Error('API Error')
  }

  return mockData.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  )
}

