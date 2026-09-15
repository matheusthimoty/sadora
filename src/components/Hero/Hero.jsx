export default function Hero() {
  const photoPath = `${import.meta.env.BASE_URL}isadora.jpg`
  const cvPath = `${import.meta.env.BASE_URL}cv-isadora-leocardio.pdf`

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-grid">
        <div className="hero-text">
          <span className="badge-pill">Jornalista & Comunicadora</span>
          <h1 className="hero-title">Conheça meus projetos</h1>
          <p className="hero-desc">
            Sou estudante de Jornalismo e repórter e redatora, com experiência
            em cobertura de futebol feminino, produção de conteúdo digital e
            SEO. Gosto de estar onde a notícia acontece: na arquibancada, na
            zona mista, na sala de imprensa ou diante de uma pauta que ainda
            precisa ser explorada.
          </p>
          <div className="hero-cta-group">
            <a href="#portfolio" className="btn-primary">
              Ver Trabalhos
            </a>
            <a
              href={cvPath}
              download="Curriculo_Isadora_Leocardio.pdf"
              className="btn-secondary"
            >
              Baixar CV ↓
            </a>

            {/* ÍCONES REDES SOCIAIS HERO */}
            <div className="hero-social-links">
              <a
                href="https://instagram.com/entrevisadora"
                target="_blank"
                rel="noreferrer"
                className="hero-social-btn"
                title="Instagram @entrevisadora"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                  ></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/isadoraleocardio/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-btn"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-photo-container">
          <div className="photo-card glass">
            <img
              src={photoPath}
              alt="Isadora Leocardio - Jornalista Esportiva"
              className="hero-profile-img"
              loading="eager"
              width="579"
              height="602"
            />
          </div>
        </div>
      </div>
    </section>
  )
}