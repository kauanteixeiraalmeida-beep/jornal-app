'use client';

import './news-grid.css';
import { NewsItem } from '@/lib/mock-data';

interface NewsGridProps {
  items: NewsItem[];
}

export default function NewsGrid({ items }: NewsGridProps) {
  return (
    <div className="news-grid">
      {items.map((item) => (
        <article key={item.id} className="news-card">
          <div className="news-media">
            {item.type === 'imagem' && <img src={item.src} alt={item.title} />}

            {item.type === 'pdf' && (
              <div className="media-placeholder pdf-placeholder">
                <span>📄</span>
                <p>Arquivo PDF</p>
              </div>
            )}

            {item.type === 'vídeo' && (
              <div className="media-placeholder video-placeholder">
                <span>▶</span>
                <p>Vídeo</p>
              </div>
            )}

            <span className="type-badge">{item.type}</span>
          </div>

          <div className="news-content">
            <span className="news-date">{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button type="button" className="read-more">Ler mais →</button>
          </div>
        </article>
      ))}
    </div>
  );
}
