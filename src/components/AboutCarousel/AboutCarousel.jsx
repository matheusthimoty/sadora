import { useState, useEffect } from 'react'
import { aboutCards } from '../../data/portfolio'
import './AboutCarousel.css'

export default function AboutCarousel() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  // Passar automaticamente a cada 10 segundos quando não pausado
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % aboutCards.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [isPaused])

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % aboutCards.length)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + aboutCards.length) % aboutCards.length)
  }

  // Navegação por setas do teclado
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextCard()
    if (e.key === 'ArrowLeft') prevCard()
  }

  // Suporte a swipe no celular
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const distance = touchStart - touchEnd

    if (distance > 50) nextCard()
    if (distance < -50) prevCard()

    setTouchStart(null)
    setIsPaused(false)
  }

  const card = aboutCards[currentCard]

  return (
    <section id="sobre" className="content-section">
      <div className="section-header">
        <span className="section-sub">Perfil</span>
        <h2>Sobre mim</h2>
      </div>

      <div className="carousel-container">
        <div
          className="carousel-card glass"
          tabIndex={0}
          role="region"
          aria-label="Carrossel sobre Isadora Leocardio"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-header">
            <span className="carousel-badge">{card.badge}</span>
          </div>

          <h3 className="carousel-card-title">{card.title}</h3>

          {card.highlight && (
            <span className="carousel-highlight-tag">{card.highlight}</span>
          )}

          <p className="carousel-card-text">{card.content}</p>

          <div className="carousel-footer">
            <div className="carousel-dots">
              {aboutCards.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentCard(idx)}
                  className={`carousel-dot ${idx === currentCard ? 'active' : ''}`}
                  aria-label={`Ir para o card ${idx + 1}`}
                />
              ))}
            </div>

            <div className="carousel-nav-btns">
              <button
                type="button"
                onClick={prevCard}
                className="carousel-btn"
                aria-label="Card anterior"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextCard}
                className="carousel-btn"
                aria-label="Próximo card"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}