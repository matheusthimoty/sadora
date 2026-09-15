export default function ContactBanner() {
  const cvPath = `${import.meta.env.BASE_URL}cv-isadora-leocardio.pdf`

  return (
    <section id="contato" className="content-section">
      <div className="contact-banner glass">
        <h2>Vamos construir uma pauta juntos?</h2>
        <p>
          Disponível para reportagens, produções editoriais e transmissões ao
          vivo.
        </p>
        <div className="contact-buttons">
          <a href="mailto:leocardioisadora@gmail.com" className="btn-primary">
            Enviar E-mail
          </a>
          <a
            href="https://www.linkedin.com/in/isadoraleocardio/"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            LinkedIn
          </a>
          <a
            href={cvPath}
            download="Curriculo_Isadora_Leocardio.pdf"
            className="btn-secondary"
          >
            Baixar Currículo ↓
          </a>
        </div>
      </div>
    </section>
  )
}