import { html } from '../lib/html.js';

export function TenantSummary({ tenant, modules = [] }) {
  const activeCount = modules.filter((module) => module.status === 'active').length;
  const plannedCount = modules.filter((module) => module.status === 'planned').length;

  return html`
    <section className="tenant-summary">
      <div>
        <p className="tenant-summary__label">Plano</p>
        <strong className="tenant-summary__value">${tenant?.plan ?? 'N/D'}</strong>
      </div>
      <div>
        <p className="tenant-summary__label">Módulos ativos</p>
        <strong className="tenant-summary__value">${activeCount}</strong>
      </div>
      <div>
        <p className="tenant-summary__label">Módulos planejados</p>
        <strong className="tenant-summary__value">${plannedCount}</strong>
      </div>
    </section>
  `;
}
