import './globals.css';

const posts = [
  {
    title: 'Capa do Jornal',
    type: 'imagem',
    description: 'Capa de edição com visualização estática e responsiva.',
    src: 'https://images.unsplash.com/photo-1504711331083-9c895941bf81?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Edição PDF',
    type: 'pdf',
    description: 'Documento em PDF preservado sem edição.',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    title: 'Vídeo da matéria',
    type: 'vídeo',
    description: 'Vídeo com reprodução direta no app.',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Jornal digital</p>
          <h1>Jornal App</h1>
        </div>
        <button className="primary-button">Nova publicação</button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="badge">Multiplataforma</span>
          <h2>Publicações em qualquer dispositivo, sem alterar o conteúdo original.</h2>
          <p>
            O app foi pensado para funcionar em desktop, tablet, celular e navegadores
            modernos, com upload e visualização de PDF, documentos, imagens e vídeos.
          </p>
          <div className="stats">
            <div>
              <strong>100%</strong>
              <span>Responsivo</span>
            </div>
            <div>
              <strong>Read-only</strong>
              <span>Sem edição</span>
            </div>
            <div>
              <strong>3 formatos</strong>
              <span>PDF, imagem e vídeo</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="device device-desktop">
            <div className="screen">
              <div className="window-header" />
              <div className="headline" />
              <div className="article-grid">
                <div className="box tall" />
                <div className="box" />
                <div className="box" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        {posts.map((post) => (
          <article key={post.title} className="card">
            <div className="card-header">
              <span className="type-pill">{post.type}</span>
              <h3>{post.title}</h3>
            </div>

            {post.type === 'imagem' && (
              <img src={post.src} alt={post.title} className="media media-image" />
            )}

            {post.type === 'pdf' && (
              <iframe
                title={post.title}
                src={post.src}
                className="media media-pdf"
                loading="lazy"
              />
            )}

            {post.type === 'vídeo' && (
              <video controls className="media media-video">
                <source src={post.src} type="video/mp4" />
                Seu navegador não suporta reprodução de vídeo.
              </video>
            )}

            <p>{post.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
