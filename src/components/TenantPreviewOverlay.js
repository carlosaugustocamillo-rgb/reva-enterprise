import { html } from '../lib/html.js';

export function TenantPreviewOverlay({ tenant, modules = [], onClose }) {
  const visibleModules = modules.filter((module) => module.status !== 'locked');

  return html`
    <div className="tenant-preview-overlay">
      <section className="tenant-preview card">
        <div className="tenant-preview__header">
          <div>
            <p className="panel-eyebrow">Visão do tenant</p>
            <h2 className="panel-title">${tenant?.name ?? 'Tenant'}</h2>
            <p className="tenant-preview__plan">${tenant?.plan ?? 'Plano não definido'}</p>
          </div>
          <button type="button" className="ghost-button" onClick=${onClose}>Fechar</button>
        </div>
        <p className="tenant-preview__hint">
          Você está visualizando os módulos disponíveis para este tenant. Apenas os módulos ativos ou planejados ficam visíveis para o time do tenant.
        </p>
        <div className="tenant-preview__modules">
          ${visibleModules.length
            ? visibleModules.map(
                (module) => html`
                  <article className=${['tenant-preview__module', `tenant-preview__module--${module.status}`].join(' ')}>
                    <header className="tenant-preview__module-header">
                      <p className="tenant-preview__module-eyebrow">${module.category}</p>
                      <span className=${['status-pill', `status-pill--${module.status}`].join(' ')}>
                        ${module.statusLabel}
                      </span>
                    </header>
                    <h3>${module.name}</h3>
                    <p>${module.description}</p>
                    ${module.focus?.length
                      ? html`
                          <div className="tenant-preview__tags">
                            ${module.focus.map((tag) => html`<span>${tag}</span>`)}
                          </div>
                        `
                      : null}
                  </article>
                `
              )
            : html`<p className="tenant-preview__empty">Nenhum módulo contratado para este tenant.</p>`}
        </div>
      </section>
    </div>
  `;
}
