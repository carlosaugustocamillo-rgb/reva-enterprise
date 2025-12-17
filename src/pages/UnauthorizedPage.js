import { html } from '../lib/html.js';

export function UnauthorizedPage() {
  return html`
    <div className="error-page">
      <div className="error-page__content">
        <div className="error-page__icon">🔒</div>
        <h1 className="error-page__title">Acesso Negado</h1>
        <p className="error-page__description">
          Você não tem permissão para acessar esta página. Entre em contato com o administrador
          se acredita que isso é um erro.
        </p>
        <div className="error-page__actions">
          <a href="/" className="error-page__link">
            Voltar para a Página Inicial
          </a>
          <button
            type="button"
            className="error-page__link error-page__link--secondary"
            onClick=${() => window.history.back()}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  `;
}
