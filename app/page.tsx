'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { defaultNews, NewsItem } from '@/lib/mock-data';
import './home.css';

interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('journal-user');
    if (!storedUser) {
      router.replace('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser) as User;
    setUser(parsedUser);

    const storedNews = localStorage.getItem('journal-news');
    if (storedNews) {
      setNews(JSON.parse(storedNews) as NewsItem[]);
    } else {
      localStorage.setItem('journal-news', JSON.stringify(defaultNews));
    }

    setLoading(false);
  }, [router]);

  const featuredNews = useMemo(
    () => news.filter((item) => item.featured).slice(0, 5),
    [news]
  );

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'admin' || user.email === 'admin@jornal.com';

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
            {isAdmin && (
              <button className="admin-btn" onClick={() => router.push('/admin')}>
                Administração
              </button>
            )}
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
        <div className="section-header">
          <h2>Destaques</h2>
        </div>
        <Carousel items={featuredNews} />
      </section>

      <section className="news-section">
        <div className="section-header">
          <h2>Últimas notícias</h2>
          <span>{news.length} itens</span>
        </div>
        <NewsGrid items={news} />
      </section>
    </main>
  );
}
