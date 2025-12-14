import { html } from '../../lib/html.js';
import { useState } from '../../lib/react.js';

export function LoginPanel({ onSubmit, isLoading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  function handleSubmit(event) {
    event?.preventDefault?.();
    if (!email || !password) {
      setLocalError('Informe e-mail e senha.');
      return;
    }
    setLocalError(null);
    onSubmit?.({ email, password });
  }

  return html`
    <section className="auth-panel card">
      <header className="auth-panel__header">
        <p className="panel-eyebrow">Acesso seguro</p>
        <h1 className="panel-title">Entrar no REVA Enterprise</h1>
      </header>
      <form className="auth-panel__form" onSubmit=${handleSubmit}>
        <label>
          <span>E-mail corporativo</span>
          <input
            type="email"
            value=${email}
            onInput=${(event) => setEmail(event.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            value=${password}
            onInput=${(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        ${(error || localError) &&
        html`<p className="data-feedback data-feedback--error">${error ?? localError}</p>`}
        <button type="submit" className="primary-button" disabled=${isLoading}>
          ${isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </section>
  `;
}
