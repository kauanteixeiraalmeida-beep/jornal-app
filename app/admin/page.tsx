'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { defaultNews, NewsItem } from '@/lib/mock-data';
import './admin.css';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role?: string } | null>(null);
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'imagem' | 'pdf' | 'vídeo'>('imagem');
  const [src, setSrc] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('journal-user');
    if (!storedUser) {
      router.replace('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email !== 'admin@jornal.com' && parsedUser.role !== 'admin') {
      router.replace('/');
      return;
    }

    setUser(parsedUser);

    const storedNews = localStorage.getItem('journal-news');
    if (storedNews) {
      setNews(JSON.parse(storedNews) as NewsItem[]);
    }
  }, [router]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSrc(url);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage('Preencha título e descrição.');
      return;
    }

    const newItem: NewsItem = {
      id: String(Date.now()),
      title: title.trim(),
      description: description.trim(),
      type,
      src: src || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      featured: true,
    };

    const updated = [newItem, ...news].slice(0, 20);
    setNews(updated);
    localStorage.setItem('journal-news', JSON.stringify(updated));
    setTitle('');
    setDescription('');
    setType('imagem');
    setSrc('');
    setMessage('Notícia publicada com sucesso.');
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <button type="button" className="back-btn" onClick={() => router.push('/')}>
          ← Voltar
        </button>
        <h1>Painel administrativo</h1>
      </header>

      <div className="admin-layout">
        <section className="admin-card">
          <h2>Nova publicação</h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título da matéria" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Escreva a descrição da matéria" rows={5} />
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo de conteúdo</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value as 'imagem' | 'pdf' | 'vídeo')}>
                <option value="imagem">Imagem</option>
                <option value="pdf">PDF</option>
                <option value="vídeo">Vídeo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="file">Upload de arquivo</label>
              <input id="file" type="file" accept="image/*,.pdf,video/*" onChange={handleFileUpload} />
            </div>

            {src && (
              <div className="preview-upload">
                {type === 'imagem' && <img src={src} alt="Preview da imagem" />}
                {type === 'pdf' && <iframe title="Preview PDF" src={src} />}
                {type === 'vídeo' && <video controls src={src} />}
              </div>
            )}

            {message && <div className="status-box">{message}</div>}

            <button type="submit" className="publish-btn">Publicar</button>
          </form>
        </section>

        <section className="admin-card">
          <h2>Últimas publicações</h2>
          <div className="admin-list">
            {news.slice(0, 5).map((item) => (
              <div key={item.id} className="admin-item">
                <div className="admin-item-meta">
                  <span className="tag">{item.type}</span>
                  <strong>{item.title}</strong>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
