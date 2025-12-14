import { html } from '../lib/html.js';

const actionLabel = {
  active: 'Abrir painel',
  planned: 'Planejar ativação',
  locked: 'Ver planos',
};

export function ModuleCard({ module }) {
  const focusItems = module.focus ?? [];
  const statusClasses = ['status-badge', module.tone ? `status-badge--${module.tone}` : '']
    .filter(Boolean)
    .join(' ');
  const actionClasses = [
    'module-card__action',
    module.status === 'active' ? 'primary' : 'ghost',
  ]
    .filter(Boolean)
    .join(' ');
  const cardClasses = ['module-card', module.status === 'locked' ? 'module-card--muted' : '']
    .filter(Boolean)
    .join(' ');
  const statusLabel = module.statusLabel ?? 'Status indefinido';

  return html`
    <article className=${cardClasses}>
      <div className="module-card__header">
        <div>
          <p className="module-card__category">${module.category}</p>
          <h3 className="module-card__title">${module.name}</h3>
        </div>
        <span className=${statusClasses}>${statusLabel}</span>
      </div>
      <p className="module-card__description">${module.description}</p>
      <ul className="module-card__focus">
        ${focusItems.map((item) => html`<li key=${item}>${item}</li>`)}
      </ul>
      <button type="button" className=${actionClasses}>${actionLabel[module.status] ?? 'Ver detalhes'}</button>
    </article>
  `;
}
