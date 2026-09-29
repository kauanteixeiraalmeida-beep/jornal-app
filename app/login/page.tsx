'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Informe seu e-mail para continuar.');
      return;
    }

    if (isRegister && !name.trim()) {
      setError('Informe seu nome para criar a conta.');
      return;
    }

    setLoading(true);

    try {
      const user = {
        id: crypto.randomUUID(),
        name: isRegister ? name.trim() : email.split('@')[0],
        email: email.trim(),
      };

      localStorage.setItem('journal-user', JSON.stringify(user));
      router.push('/');
    } catch {
      setError('Não foi possível entrar agora. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <p className="login-eyebrow">Jornal digital</p>
        <h1>{isRegister ? 'Crie sua conta' : 'Entrar no app'}</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Carregando...' : isRegister ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        <div className="toggle-box">
          <span>{isRegister ? 'Já tem conta?' : 'Ainda não tem conta?'}</span>
          <button type="button" onClick={() => setIsRegister((prev) => !prev)}>
            {isRegister ? 'Entrar' : 'Registrar'}
          </button>
        </div>

        <div className="demo-note">
          Use qualquer e-mail para testar. <br />
          A autenticação é local e personalizada por usuário.
        </div>
      </div>
    </main>
  );
}
