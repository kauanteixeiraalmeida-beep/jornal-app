'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './settings.css';

type FontSize = 'small' | 'medium' | 'large';

interface ThemeSettings {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

interface UserSettings {
  theme: ThemeSettings;
  fontSize: FontSize;
  itemsPerPage: number;
}

const defaultSettings: UserSettings = {
  theme: {
    primaryColor: '#3b82f6',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#fbbf24',
  },
  fontSize: 'medium',
  itemsPerPage: 9,
};

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('journal-user');
    if (!currentUser) {
      router.replace('/login');
      return;
    }

    const savedSettings = localStorage.getItem('journal-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    setLoading(false);
  }, [router]);

  const applyStyle = {
    ['--primary-color' as string]: settings.theme.primaryColor,
    ['--background-color' as string]: settings.theme.backgroundColor,
    ['--text-color' as string]: settings.theme.textColor,
    ['--accent-color' as string]: settings.theme.accentColor,
  };

  const handleSave = () => {
    localStorage.setItem('journal-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <main className="settings-page" style={applyStyle}>
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
            <div className="color-setting">
              <label htmlFor="primaryColor">Cor primária</label>
              <div className="color-row">
                <input
                  id="primaryColor"
                  type="color"
                  value={settings.theme.primaryColor}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value },
                    })
                  }
                />
                <span>{settings.theme.primaryColor}</span>
              </div>
            </div>

            <div className="color-setting">
              <label htmlFor="accentColor">Cor de destaque</label>
              <div className="color-row">
                <input
                  id="accentColor"
                  type="color"
                  value={settings.theme.accentColor}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, accentColor: e.target.value },
                    })
                  }
                />
                <span>{settings.theme.accentColor}</span>
              </div>
            </div>

            <div className="color-setting">
              <label htmlFor="textColor">Cor do texto</label>
              <div className="color-row">
                <input
                  id="textColor"
                  type="color"
                  value={settings.theme.textColor}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, textColor: e.target.value },
                    })
                  }
                />
                <span>{settings.theme.textColor}</span>
              </div>
            </div>

            <div className="color-setting">
              <label htmlFor="backgroundColor">Cor do fundo</label>
              <div className="color-row">
                <input
                  id="backgroundColor"
                  type="color"
                  value={settings.theme.backgroundColor}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      theme: { ...settings.theme, backgroundColor: e.target.value },
                    })
                  }
                />
                <span>{settings.theme.backgroundColor}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <h2>Tamanho da fonte</h2>
          <div className="radio-group">
            {(['small', 'medium', 'large'] as FontSize[]).map((size) => (
              <label key={size} className="radio-option">
                <input
                  type="radio"
                  name="fontSize"
                  checked={settings.fontSize === size}
                  onChange={() => setSettings({ ...settings, fontSize: size })}
                />
                <span>
                  {size === 'small' && 'Pequena'}
                  {size === 'medium' && 'Média'}
                  {size === 'large' && 'Grande'}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <h2>Layout</h2>
          <div className="input-row">
            <label htmlFor="itemsPerPage">Notícias por página</label>
            <input
              id="itemsPerPage"
              type="number"
              min={1}
              max={20}
              value={settings.itemsPerPage}
              onChange={(e) => setSettings({ ...settings, itemsPerPage: Number(e.target.value) })}
            />
          </div>
        </section>

        <section className="settings-card preview-card">
          <h2>Pré-visualização</h2>
          <div
            className="preview-box"
            style={{
              backgroundColor: settings.theme.backgroundColor,
              color: settings.theme.textColor,
            }}
          >
            <p
              style={{
                color: settings.theme.primaryColor,
                fontSize:
                  settings.fontSize === 'small'
                    ? '0.9rem'
                    : settings.fontSize === 'large'
                      ? '1.2rem'
                      : '1rem',
              }}
            >
              Título da notícia
            </p>
            <p
              style={{
                fontSize:
                  settings.fontSize === 'small'
                    ? '0.8rem'
                    : settings.fontSize === 'large'
                      ? '1rem'
                      : '0.9rem',
              }}
            >
              Este é um exemplo do visual do seu jornal pessoal, sem mexer no de outras pessoas.
            </p>
            <button type="button" style={{ backgroundColor: settings.theme.accentColor, color: settings.theme.backgroundColor }}>
              Ver mais
            </button>
          </div>
        </section>

        <div className="settings-actions">
          <button type="button" className="reset-btn" onClick={handleReset}>
            Restaurar
          </button>
          <button type="button" className="save-btn" onClick={handleSave}>
            Salvar
          </button>
        </div>

        {saved && <div className="success-box">Personalização salva com sucesso.</div>}
      </div>
    </main>
  );
}
