import { html } from '../lib/html.js';

export function NotFoundPage() {
  return html`
    <div className="error-page">
      <div className="error-page__content">
        <div className="error-page__icon">404</div>
        <h1 className="error-page__title">Página Não Encontrada</h1>
        <p className="error-page__description">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <a href="/" className="error-page__link">
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  `;
}
