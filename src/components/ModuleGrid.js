import { html } from '../lib/html.js';
import { ModuleCard } from './ModuleCard.js';

export function ModuleGrid({ modules = [] }) {
  if (!modules.length) {
    return html`
      <div className="module-grid__empty">
        Nenhum módulo encontrado para o filtro selecionado.
      </div>
    `;
  }

  return html`
    <div className="module-grid">
      ${modules.map((module) => html`<${ModuleCard} key=${module.id} module=${module} />`)}
    </div>
  `;
}
