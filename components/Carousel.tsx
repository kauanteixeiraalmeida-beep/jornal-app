'use client';

import { useState, useEffect } from 'react';
import './carousel.css';

type MediaType = 'imagem' | 'pdf' | 'vídeo';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  src: string;
  date: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!items.length || !autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  const currentItem = items[currentIndex] ?? items[0];

  if (!currentItem) {
    return null;
  }

  const goPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setAutoPlay(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setAutoPlay(false);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-main">
        <button type="button" className="carousel-btn" onClick={goPrevious} aria-label="Notícia anterior">
          ‹
        </button>

        <div className="carousel-content">
          {currentItem.type === 'imagem' && (
            <img src={currentItem.src} alt={currentItem.title} className="carousel-media" />
          )}

          {currentItem.type === 'pdf' && (
            <iframe
              title={currentItem.title}
              src={currentItem.src}
              className="carousel-media carousel-pdf"
            />
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

        <button type="button" className="carousel-btn" onClick={goNext} aria-label="Próxima notícia">
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
