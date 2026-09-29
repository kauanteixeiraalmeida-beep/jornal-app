'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '@/components/Carousel';
import NewsGrid from '@/components/NewsGrid';
import './home.css';

type MediaType = 'imagem' | 'pdf' | 'vídeo';

interface User {
  id: string;
  name: string;
  email: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  src: string;
  date: string;
  featured?: boolean;
}

const FEATURED_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Abertura da Edição',
    description: 'Capa destacada com o tema principal do dia e análise das principais notícias.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1504711331083-9c895941bf81?auto=format&fit=crop&w=1200&q=80',
    date: '29 de Setembro, 2026',
    featured: true,
  },
  {
    id: '2',
    title: 'Especial em PDF',
    description: 'Documento oficial em PDF preservado sem edição para leitura direta no app.',
    type: 'pdf',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: '28 de Setembro, 2026',
    featured: true,
  },
  {
    id: '3',
    title: 'Reportagem em Vídeo',
    description: 'Vídeo com reprodução direta no próprio app, incluindo áudio e legenda.',
    type: 'vídeo',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    date: '27 de Setembro, 2026',
    featured: true,
  },
  {
    id: '4',
    title: 'Galeria de Fotos',
    description: 'Imagens do cenário do dia que ajudam a entender melhor a matéria.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80',
    date: '26 de Setembro, 2026',
    featured: true,
  },
  {
    id: '5',
    title: 'Matéria Especial',
    description: 'Dados e informações em PDF para leitura confortável em qualquer dispositivo.',
    type: 'pdf',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: '25 de Setembro, 2026',
    featured: true,
  },
];

const ALL_NEWS: NewsItem[] = [
  ...FEATURED_NEWS,
  {
    id: '6',
    title: 'Notícia Local 1',
    description: 'Uma matéria relevante para a comunidade local e o cenário do dia.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1590080876020-5df1f8e61b7f?auto=format&fit=crop&w=600&q=80',
    date: '24 de Setembro, 2026',
  },
  {
    id: '7',
    title: 'Notícia em Vídeo',
    description: 'Acompanhe a matéria em vídeo diretamente sem sair da plataforma.',
    type: 'vídeo',
    src: 'https://www.w3schools.com/html/movie.mp4',
    date: '23 de Setembro, 2026',
  },
  {
    id: '8',
    title: 'Relatório Completo',
    description: 'Leitura de arquivo PDF com informações detalhadas da redação.',
    type: 'pdf',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: '22 de Setembro, 2026',
  },
  {
    id: '9',
    title: 'Edição de Entrevista',
    description: 'Imagem e texto com destaque para entrevista do dia.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80',
    date: '21 de Setembro, 2026',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('journal-user');
    if (!savedUser) {
      router.replace('/login');
      return;
    }

    setUser(JSON.parse(savedUser));
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="header-content">
          <div>
            <p className="header-label">Jornal digital</p>
            <h1>Jornal App</h1>
          </div>

          <div className="header-actions">
            <span className="user-name">Olá, {user.name}</span>
            <button className="settings-btn" onClick={() => router.push('/settings')}>
              Personalizar
            </button>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem('journal-user');
                router.push('/login');
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <section className="carousel-section">
        <Carousel items={FEATURED_NEWS} />
      </section>

      <section className="news-section">
        <div className="section-title-row">
          <h2>Últimas notícias</h2>
          <span>{ALL_NEWS.length} itens</span>
        </div>
        <NewsGrid items={ALL_NEWS} />
      </section>
    </main>
  );
}
