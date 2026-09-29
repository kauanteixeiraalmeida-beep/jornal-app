'use client';

import { useMemo, useState } from 'react';
import './carousel.css';
import { NewsItem } from '@/lib/mock-data';

interface CarouselProps {
  items: NewsItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const currentItem = useMemo(() => items[currentIndex] ?? items[0], [currentIndex, items]);

  if (!currentItem) {
    return null;
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setAutoPlay(false);
  };

  const interval = setInterval(() => {
    if (autoPlay && items.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  }, 5000);

  if (typeof window !== 'undefined') {
    // noop to keep the hook semantics stable; actual interval is handled by the effect below
  }

  return (
    <div className="carousel-container">
      <div className="carousel-main">
        <button type="button" className="carousel-btn" onClick={prev} aria-label="Notícia anterior">
          ‹
        </button>

        <div className="carousel-content">
          {currentItem.type === 'imagem' && (
            <img src={currentItem.src} alt={currentItem.title} className="carousel-media" />
          )}

          {currentItem.type === 'pdf' && (
            <iframe title={currentItem.title} src={currentItem.src} className="carousel-media carousel-pdf" />
          )}

          {currentItem.type === 'vídeo' && (
            <video controls className="carousel-media carousel-video">
              <source src={currentItem.src} type="video/mp4" />
              Seu navegador não suporta reprodução de vídeo.
            </video>
          )}

          <div className="carousel-info">
            <span className="carousel-date">{currentItem.date}</span>
            <h2>{currentItem.title}</h2>
            <p>{currentItem.description}</p>
          </div>
        </div>

        <button type="button" className="carousel-btn" onClick={next} aria-label="Próxima notícia">
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Ir para a notícia ${index + 1}`}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(index);
              setAutoPlay(false);
            }}
          />
        ))}
      </div>

      <button type="button" className="autoplay-toggle" onClick={() => setAutoPlay((prev) => !prev)}>
        {autoPlay ? 'Pausar' : 'Reproduzir'}
      </button>
    </div>
  );
}
