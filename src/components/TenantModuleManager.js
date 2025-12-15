import { html } from '../lib/html.js';
import { useState, useEffect } from '../lib/react.js';

export function TenantModuleManager({
  tenant,
  moduleCatalog = [],
  initialActive = [],
  initialPlanned = [],
  onClose,
  onSave,
  isSaving,
  error,
}) {
  const [activeIds, setActiveIds] = useState(new Set(initialActive));
  const [plannedIds, setPlannedIds] = useState(new Set(initialPlanned));

  useEffect(() => {
    setActiveIds(new Set(initialActive ?? []));
    setPlannedIds(new Set(initialPlanned ?? []));
  }, [initialActive, initialPlanned, tenant?.id]);

  function toggleStatus(moduleId, type) {
    setActiveIds((prev) => {
      const next = new Set(prev);
      if (type === 'active') {
        if (next.has(moduleId)) {
          next.delete(moduleId);
        } else {
          next.add(moduleId);
        }
      }
      return next;
    });
    setPlannedIds((prev) => {
      const next = new Set(prev);
      if (type === 'active' && next.has(moduleId)) {
        next.delete(moduleId);
      } else if (type === 'planned') {
        if (next.has(moduleId)) {
          next.delete(moduleId);
        } else {
          next.add(moduleId);
        }
      }
      return next;
    });
  }

  function handleSubmit(event) {
    event?.preventDefault?.();
    onSave?.({
      active: Array.from(activeIds),
      planned: Array.from(plannedIds).filter((id) => !activeIds.has(id)),
    });
  }

  return html`
    <div className="tenant-preview-overlay">
      <section className="tenant-module-manager card">
        <header className="tenant-module-manager__header">
          <div>
            <p className="panel-eyebrow">Liberação de módulos</p>
            <h2 className="panel-title">${tenant?.name ?? 'Tenant'}</h2>
            <p className="tenant-module-manager__stats">
              ${activeIds.size} ativos • ${plannedIds.size} planejados
            </p>
          </div>
          <button type="button" className="ghost-button" onClick=${onClose} disabled=${isSaving}>
            Fechar
          </button>
        </header>
        <p className="tenant-module-manager__hint">
          Selecione os módulos ativos e os planejados para ${tenant?.name ?? 'o tenant'}. Os módulos ativos
          ficam imediatamente disponíveis no console do tenant; os planejados aparecem como “em preparação”.
        </p>
        ${error && html`<p className="data-feedback data-feedback--error">${error}</p>`}
        <form className="tenant-module-manager__grid" onSubmit=${handleSubmit}>
          ${moduleCatalog.map((module) => {
            const isActive = activeIds.has(module.id);
            const isPlanned = plannedIds.has(module.id);
            return html`
              <article key=${module.id} className="tenant-module-manager__module">
                <header>
                  <div>
                    <p className="tenant-module-manager__eyebrow">${module.category}</p>
                    <h3>${module.name}</h3>
                  </div>
                  <div className="tenant-module-manager__toggles">
                    <label>
                      <input
                        type="checkbox"
                        checked=${isActive}
                        onChange=${() => toggleStatus(module.id, 'active')}
                      />
                      Ativo
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked=${isPlanned && !isActive}
                        onChange=${() => toggleStatus(module.id, 'planned')}
                        disabled=${isActive}
                      />
                      Planejado
                    </label>
                  </div>
                </header>
                <p>${module.description}</p>
                ${module.focus?.length
                  ? html`
                      <div className="tenant-module-manager__tags">
                        ${module.focus.map((tag) => html`<span>${tag}</span>`)}
                      </div>
                    `
                  : null}
              </article>
            `;
          })}
        </form>
        <div className="tenant-module-manager__actions">
          <button type="button" className="ghost-button" onClick=${onClose} disabled=${isSaving}>
            Cancelar
          </button>
          <button type="button" className="primary-button" onClick=${handleSubmit} disabled=${isSaving}>
            ${isSaving ? 'Salvando...' : 'Salvar módulos'}
          </button>
        </div>
      </section>
    </div>
  `;
}
