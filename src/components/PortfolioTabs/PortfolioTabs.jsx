import { useState, useEffect, useMemo } from 'react'

const SHEETDB_URL = 'https://sheetdb.io/api/v1/il20rx0zh3p3x'
const CACHE_KEY = 'portfolio_articles_cache'
const CACHE_TIME_KEY = 'portfolio_articles_time'
const CACHE_DURATION_MS = 10 * 60 * 1000 // 10 minutos

export default function PortfolioTabs() {
  const [activeCategory, setActiveCategory] = useState('faculdade')
  const [articles, setArticles] = useState({ faculdade: [], donas: [] })
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('recent') // 'recent' ou 'oldest'

  const processAndSetArticles = (data) => {
    if (!Array.isArray(data)) return

    const grouped = { faculdade: [], donas: [] }

    data.forEach((item) => {
      const rawCategory = (item.category || '').toLowerCase().trim()

      if (
        rawCategory === 'faculdade' ||
        rawCategory.includes('facul') ||
        rawCategory.includes('fapcom')
      ) {
        grouped.faculdade.push(item)
      } else if (
        rawCategory === 'donas' ||
        rawCategory.includes('dona')
      ) {
        grouped.donas.push(item)
      }
    })

    setArticles(grouped)
  }

  useEffect(() => {
    const cachedData = sessionStorage.getItem(CACHE_KEY)
    const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY)
    const now = Date.now()

    if (cachedData && cachedTime && now - Number(cachedTime) < CACHE_DURATION_MS) {
      try {
        processAndSetArticles(JSON.parse(cachedData))
        setLoading(false)
        return
      } catch (err) {
        console.error('Erro ao ler dados do cache:', err)
      }
    }

    fetch(SHEETDB_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar matérias')
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
          sessionStorage.setItem(CACHE_TIME_KEY, String(now))
          processAndSetArticles(data)
          setIsError(false)
        } else {
          setIsError(true)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erro ao conectar ao SheetDB:', err)
        if (cachedData) {
          processAndSetArticles(JSON.parse(cachedData))
        } else {
          setIsError(true)
        }
        setLoading(false)
      })
  }, [])

  const currentTabTotal = (articles[activeCategory] || []).length

  // Filtragem e ordenação dinâmica
  const currentArticles = useMemo(() => {
    const list = articles[activeCategory] || []
    
    // 1. Filtrar pelo termo buscado
    const filtered = list.filter((item) => {
      if (!searchTerm.trim()) return true
      const term = searchTerm.toLowerCase().trim()
      const title = (item.title || '').toLowerCase()
      const tag = (item.tag || '').toLowerCase()
      const desc = (item.description || '').toLowerCase()
      return title.includes(term) || tag.includes(term) || desc.includes(term)
    })

    // 2. Ordenar por ordem cronológica
    const sorted = [...filtered]
    if (sortOrder === 'recent') {
      return sorted.reverse()
    }
    return sorted
  }, [articles, activeCategory, searchTerm, sortOrder])

  return (
    <section id="portfolio" className="content-section">
      <div className="section-header">
        <span className="section-sub">Destaques</span>
        <h2>Trabalhos Recentes</h2>
      </div>

      {/* CONTROLES: BUSCA + ORDENAÇÃO */}
      <div className="portfolio-controls-bar">
        <div className="portfolio-search-container">
          <span className="portfolio-search-icon">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            className="portfolio-search-input"
            placeholder="Pesquisar matéria, clube ou pauta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="portfolio-search-clear"
              onClick={() => setSearchTerm('')}
              aria-label="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        <select
          className="portfolio-sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Ordenar artigos"
        >
          <option value="recent">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
        </select>
      </div>

      {/* CONTADOR DINÂMICO DE RESULTADOS */}
      {!loading && !isError && activeCategory !== 'temfutebol' && currentTabTotal > 0 && (
        <div className="portfolio-results-count">
          {searchTerm.trim() ? (
            <span>
              Exibindo <strong>{currentArticles.length}</strong> de <strong>{currentTabTotal}</strong> matérias
            </span>
          ) : (
            <span>
              <strong>{currentTabTotal}</strong> matérias disponíveis
            </span>
          )}
        </div>
      )}

      {/* ABAS */}
      <div className="portfolio-tabs">
        <button
          type="button"
          className={`tab-btn ${activeCategory === 'faculdade' ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory('faculdade')
            setSearchTerm('')
          }}
        >
          Projetos da Faculdade
        </button>
        <button
          type="button"
          className={`tab-btn ${activeCategory === 'donas' ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory('donas')
            setSearchTerm('')
          }}
        >
          Donas FC
        </button>
        <button
          type="button"
          className={`tab-btn ${activeCategory === 'temfutebol' ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory('temfutebol')
            setSearchTerm('')
          }}
        >
          Tem Futebol Nisso
        </button>
      </div>

      {activeCategory === 'temfutebol' ? (
        <div className="tem-futebol-showcase glass">
          <div className="tem-futebol-content">
            <span className="article-tag">Newsletter & Projeto Autoral</span>
            <h3 className="tem-futebol-title">Tem Futebol Nisso</h3>

            <p className="tem-futebol-desc">
              O Tem Futebol Nisso surgiu da ideia de olhar para o futebol para
              além do que acontece dentro de campo. O projeto explora as
              relações do esporte com temas como música, moda, publicidade,
              cinema, política, comportamento e internet, buscando entender
              como o futebol também funciona como linguagem, identidade e
              parte da cultura.
            </p>

            <p className="tem-futebol-desc">
              Desenvolvo os textos em formato de ensaios publicados no
              Substack, além de vídeos para o Instagram, com uma abordagem
              mais autoral e reflexiva.
            </p>

            <div className="tem-futebol-actions">
              <a
                href="https://substack.com/@temfutebolnisso"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Ler Ensaios no Substack ↗
              </a>
              <a
                href="https://instagram.com/entrevisadora"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Ver no Instagram (@entrevisadora) ↗
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="articles-grid">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="article-card glass skeleton-card">
                  <div className="skeleton-line skeleton-tag"></div>
                  <div className="skeleton-line skeleton-title"></div>
                  <div className="skeleton-line skeleton-desc"></div>
                  <div className="skeleton-line skeleton-desc-short"></div>
                  <div className="skeleton-line skeleton-footer"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="api-error-card glass">
              <h3>Não foi possível sincronizar os artigos no momento</h3>
              <p>
                Você pode acompanhar todas as publicações diretamente nos canais oficiais:
              </p>
              <div className="api-error-actions">
                <a
                  href="https://donasfc.com.br/author/isadora-leocardio/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Acessar Donas FC ↗
                </a>
                <a
                  href="https://entrefocos.com.br/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  Acessar EntreFocos ↗
                </a>
              </div>
            </div>
          ) : currentArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.7 }}>
              {searchTerm
                ? `Nenhuma matéria encontrada para "${searchTerm}".`
                : 'Nenhuma matéria encontrada nesta categoria.'}
            </div>
          ) : (
            <div className="articles-grid">
              {currentArticles.map((item) => (
                <article key={item.id} className="article-card glass">
                  <span className="article-tag">{item.tag}</span>
                  <h3 className="article-title">{item.title}</h3>
                  <p className="article-desc">{item.description}</p>
                  <div className="article-footer">
                    <span>{item.date}</span>
                    <div className="article-links-group">
                      {item.videoLink && (
                        <a
                          href={item.videoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="article-video-badge"
                          title="Ver vídeo da cobertura no Instagram"
                        >
                          ▶ Vídeo no Insta
                        </a>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="article-read-more"
                      >
                        Ler matéria →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isError && activeCategory === 'donas' && (
            <div className="more-articles-container">
              <a
                href="https://donasfc.com.br/author/isadora-leocardio/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Ver todas as matérias no Donas FC ↗
              </a>
            </div>
          )}

          {!isError && activeCategory === 'faculdade' && (
            <div className="more-articles-container">
              <a
                href="https://entrefocos.com.br/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Ver publicações no EntreFocos (FAPCOM) ↗
              </a>
            </div>
          )}
        </>
      )}
    </section>
  )
}