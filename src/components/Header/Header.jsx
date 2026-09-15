import './Header.css'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="navbar-container glass">
      <div className="navbar-content">
        {/* LADO ESQUERDO: NOME + REDES */}
        <div className="navbar-left">
          <a href="#inicio" className="brand-logo">
            <span className="brand-gradient">Isadora</span> Leocardio
          </a>

          <div className="nav-social-icons">
            <a
              href="https://instagram.com/entrevisadora"
              target="_blank"
              rel="noreferrer"
              className="social-nav-link"
              title="Instagram @entrevisadora"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/isadoraleocardio/"
              target="_blank"
              rel="noreferrer"
              className="social-nav-link"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
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

        {/* LADO DIREITO: LINKS E TEMA */}
        <div className="navbar-right">
          <nav className="nav-links">
            <a href="#sobre">Sobre</a>
            <a href="#portfolio">Trabalhos</a>
            <a href="#contato" className="nav-highlight">
              Contato
            </a>
          </nav>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={
              theme === 'dark'
                ? 'Mudar para tema Claro'
                : 'Mudar para tema Escuro'
            }
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
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
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
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
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}