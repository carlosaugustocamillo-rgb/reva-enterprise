import { html } from '../lib/html.js';

export function TenantSwitcher({ tenants = [], selectedId, onChange }) {
  if (!tenants.length) {
    return html`<div className="tenant-switcher">Cadastre um tenant para começar</div>`;
  }

  const current = tenants.find((tenant) => tenant.id === selectedId);

  return html`
    <div className="tenant-switcher">
      <div className="tenant-switcher__label">Tenant em foco</div>
      <select
        className="tenant-switcher__select"
        aria-label="Selecionar tenant"
        value=${selectedId ?? ''}
        onChange=${(event) => onChange?.(event.target.value)}
      >
        ${tenants.map(
          (tenant) => html`<option key=${tenant.id} value=${tenant.id}>${tenant.name}</option>`
        )}
      </select>
      <span className="tenant-switcher__meta">${current?.plan ?? ''}</span>
    </div>
  `;
}
