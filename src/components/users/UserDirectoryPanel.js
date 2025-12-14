import { html } from '../../lib/html.js';
import { UserFilters } from './UserFilters.js';
import { UserTable } from './UserTable.js';

export function UserDirectoryPanel({
  profiles,
  query,
  statusFilter,
  onQueryChange,
  onStatusChange,
  isSyncing,
  errorMessage,
  onCreate,
  onEdit,
  canCreate = true,
  canEditProfile,
}) {
  return html`
    <section className="user-panel card">
      <div className="panel-header">
        <div>
          <p className="panel-eyebrow">Usuários e Perfis</p>
          <h2 className="panel-title">Base integrada de pessoas</h2>
        </div>
        <div className="user-panel__actions">
          <${UserFilters}
            query=${query}
            statusFilter=${statusFilter}
            onQueryChange=${onQueryChange}
            onStatusChange=${onStatusChange}
          />
          <button type="button" className="primary-button" onClick=${onCreate} disabled=${!canCreate}>
            Novo perfil
          </button>
        </div>
      </div>
      ${isSyncing && html`<p className="data-feedback">Sincronizando perfis...</p>`}
      ${errorMessage && html`<p className="data-feedback data-feedback--error">${errorMessage}</p>`}
      <${UserTable} profiles=${profiles} onEdit=${onEdit} canEditProfile=${canEditProfile} />
    </section>
  `;
}
