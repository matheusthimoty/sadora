import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sadora_theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('sadora_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-container">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Home />
      </main>
      <footer>
        <p>
          © {new Date().getFullYear()} Isadora Leocádio. Portfólio desenvolvido
          por <span>Matheus Moreira</span>.
        </p>
      </footer>
    </div>
  )
}

export default App
