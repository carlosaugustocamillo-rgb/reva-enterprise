import { html } from '../lib/html.js';

export function TenantConsoleView({
  tenant,
  modules = [],
  selectedModuleId,
  onOpenModule,
  moduleContent = null,
  onLogout,
}) {
  const activeModules = modules.filter((module) => module.status === 'active');
  const plannedModules = modules.filter((module) => module.status === 'planned');
  const visibleModules = [...activeModules, ...plannedModules];
  const selectedModule =
    visibleModules.find((module) => module.id === selectedModuleId) ?? visibleModules[0] ?? null;

  return html`
    <div className="tenant-console">
      <header className="tenant-console__hero">
        <div>
          <p className="tenant-console__eyebrow">Área do tenant</p>
          <h1>${tenant?.name ?? 'Tenant'}</h1>
          <p className="tenant-console__subtitle">
            Plano ${tenant?.plan ?? 'N/D'} • ${tenant?.segment ?? 'Segmento não informado'}
          </p>
        </div>
        <div className="tenant-console__actions">
          <div className="tenant-console__meta">
            <div>
              <p>Módulos ativos</p>
              <strong>${activeModules.length}</strong>
            </div>
            <div>
              <p>Em planejamento</p>
              <strong>${plannedModules.length}</strong>
            </div>
          </div>
          ${onLogout
            ? html`
                <button type="button" className="tenant-console__logout" onClick=${onLogout}>
                  Sair
                </button>
              `
            : null}
        </div>
      </header>
      ${visibleModules.length
        ? html`
            <div className="tenant-console__tabs">
              ${visibleModules.map((module, index) => {
                const isSelected = selectedModule?.id === module.id;
                const tabKey = module.id ?? module.slug ?? `${module.name}-${index}`;
                return html`
                  <button
                    key=${tabKey}
                    type="button"
                    className=${[
                      'tenant-console__tab',
                      `tenant-console__tab--status-${module.status ?? 'default'}`,
                      isSelected ? 'tenant-console__tab--selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick=${() => onOpenModule?.(module.id)}
                  >
                    <span className="tenant-console__tab-label">${module.name}</span>
                    <small>${module.category}</small>
                  </button>
                `;
              })}
            </div>
            ${selectedModule
              ? html`
                  <section className="tenant-console__section tenant-console__section--detail">
                    <div className="tenant-console__section-header">
                      <div>
                        <p className="panel-eyebrow">${selectedModule.category}</p>
                        <h2>${selectedModule.name}</h2>
                      </div>
                      <span
                        className=${['status-pill', `status-pill--${selectedModule.status}`].join(' ')}
                      >
                        ${selectedModule.statusLabel}
                      </span>
                    </div>
                    <p>${selectedModule.description}</p>
                    ${selectedModule.focus?.length
                      ? html`
                          <div className="tenant-console__tags">
                            ${selectedModule.focus.map((tag, index) =>
                              html`<span
                                key=${`${selectedModule.id}-${tag}-${index}`}
                              >
                                ${tag}
                              </span>`
                            )}
                          </div>
                        `
                      : null}
                    ${selectedModule.status === 'active' && moduleContent
                      ? html`<div className="tenant-console__module-content">
                          ${moduleContent}
                        </div>`
                      : html`<div className="tenant-console__detail-footnote">
                          ${selectedModule.status === 'active'
                            ? html`Este painel está em modo demonstrativo. Em produção, ele carregará a aplicação
                                dedicada do módulo <strong>${selectedModule.name}</strong>.`
                            : html`Este módulo está em construção pelo time da REVA. Você será notificado assim
                                que estiver disponível.`}
                        </div>`}
                  </section>
                `
              : html`<section className="tenant-console__section">
                  <p className="tenant-console__empty">
                    Selecione um módulo acima para visualizar o painel correspondente.
                  </p>
                </section>`}
          `
        : html`<section className="tenant-console__section">
            <p className="tenant-console__empty">
              Nenhum módulo ativo ou planejado para ${tenant?.name ?? 'este tenant'}.
            </p>
          </section>`}
    </div>
  `;
}
