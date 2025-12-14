import { html } from '../lib/html.js';
import { TenantSwitcher } from './TenantSwitcher.js';
import { QuickActions } from './QuickActions.js';

export function Header({ title, subtitle, tenants, selectedTenantId, onTenantChange, actions }) {
  return html`
    <header className="app-header">
      <div className="app-header__copy">
        <p className="app-header__eyebrow">Console global</p>
        <h1 className="app-header__title">${title}</h1>
        <p className="app-header__subtitle">${subtitle}</p>
      </div>
      <div className="app-header__toolbar">
        <${TenantSwitcher}
          tenants=${tenants}
          selectedId=${selectedTenantId}
          onChange=${onTenantChange}
        />
        <${QuickActions} actions=${actions} />
      </div>
    </header>
  `;
}
