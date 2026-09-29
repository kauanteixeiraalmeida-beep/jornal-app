'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './settings.css';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [theme, setTheme] = useState({
    primaryColor: '#3b82f6',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#fbbf24',
  });
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('journal-user');
    if (!storedUser) {
      router.replace('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const storedTheme = localStorage.getItem(`journal-theme-${parsedUser.email}`);
    if (storedTheme) {
      const parsed = JSON.parse(storedTheme);
      setTheme(parsed.theme || theme);
      setFontSize(parsed.fontSize || 'medium');
    }

    setLoading(false);
  }, [router]);

  const handleSave = () => {
    if (!user) return;

    const payload = {
      theme,
      fontSize,
    };

    localStorage.setItem(`journal-theme-${user.email}`, JSON.stringify(payload));
    setSaved(true);
    setTimeout(() => setSaved(false), 2600);
  };

  const handleReset = () => {
    const defaults = {
      primaryColor: '#3b82f6',
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      accentColor: '#fbbf24',
    };

    setTheme(defaults);
    setFontSize('medium');
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <main className="settings-page" style={{
      ['--primary-color' as string]: theme.primaryColor,
      ['--bg-color' as string]: theme.backgroundColor,
      ['--text-color' as string]: theme.textColor,
      ['--accent-color' as string]: theme.accentColor,
      ['--font-size' as string]: fontSize === 'small' ? '0.9rem' : fontSize === 'large' ? '1.1rem' : '1rem',
    }}>
      <header className="settings-header">
        <button type="button" className="back-btn" onClick={() => router.push('/')}>
          ← Voltar
        </button>
        <h1>Personalizar app</h1>
      </header>

      <div className="settings-container">
        <section className="settings-card">
          <h2>Temas</h2>
          <div className="color-grid">
            <div className="color-item">
              <label htmlFor="primaryColor">Cor principal</label>
              <div className="color-row">
                <input id="primaryColor" type="color" value={theme.primaryColor} onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })} />
                <span>{theme.primaryColor}</span>
              </div>
            </div>

            <div className="color-item">
              <label htmlFor="accentColor">Cor de destaque</label>
              <div className="color-row">
                <input id="accentColor" type="color" value={theme.accentColor} onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })} />
                <span>{theme.accentColor}</span>
              </div>
            </div>

            <div className="color-item">
              <label htmlFor="textColor">Texto</label>
              <div className="color-row">
                <input id="textColor" type="color" value={theme.textColor} onChange={(e) => setTheme({ ...theme, textColor: e.target.value })} />
                <span>{theme.textColor}</span>
              </div>
            </div>

            <div className="color-item">
              <label htmlFor="backgroundColor">Fundo</label>
              <div className="color-row">
                <input id="backgroundColor" type="color" value={theme.backgroundColor} onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })} />
                <span>{theme.backgroundColor}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <h2>Tamanho da fonte</h2>
          <div className="radio-group">
            {(['small', 'medium', 'large'] as const).map((option) => (
              <label key={option} className="radio-option">
                <input type="radio" name="fontSize" checked={fontSize === option} onChange={() => setFontSize(option)} />
                <span>
                  {option === 'small' && 'Pequena'}
                  {option === 'medium' && 'Média'}
                  {option === 'large' && 'Grande'}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="settings-card preview-card">
          <h2>Pré-visualização</h2>
          <div className="preview-box" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
            <p style={{ color: theme.primaryColor, fontSize: fontSize === 'small' ? '0.9rem' : fontSize === 'large' ? '1.2rem' : '1rem' }}>Título da notícia</p>
            <p style={{ fontSize: fontSize === 'small' ? '0.8rem' : fontSize === 'large' ? '1rem' : '0.9rem' }}>
              Este é um exemplo do visual do seu jornal pessoal. Sua personalização não afeta os outros usuários.
            </p>
            <button type="button" style={{ backgroundColor: theme.accentColor, color: theme.backgroundColor }}>
              Ver mais
            </button>
          </div>
        </section>

        <div className="settings-actions">
          <button type="button" className="reset-btn" onClick={handleReset}>Restaurar</button>
          <button type="button" className="save-btn" onClick={handleSave}>Salvar</button>
        </div>

        {saved && <div className="success-box">Personalização salva com sucesso.</div>}
      </div>
    </main>
  );
}
