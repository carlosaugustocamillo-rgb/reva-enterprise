import { html } from '../../lib/html.js';

const statusLabel = {
  ativo: 'Ativo',
  implementacao: 'Em implementação',
  inativo: 'Inativo',
};

export function UserTable({ profiles = [], onEdit }) {
  if (!profiles.length) {
    return html`<p className="user-panel__empty">Nenhum perfil encontrado.</p>`;
  }

  return html`
    <div className="user-table__scroll">
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tenant</th>
            <th>Categoria</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${profiles.map(
            (profile) => html`
              <tr key=${profile.id}>
                <td>
                  <div className="user-table__name">
                    <strong>${profile.fullName}</strong>
                    ${profile.preferredName &&
                    html`<span>${profile.preferredName}</span>`}
                  </div>
                </td>
                <td>${profile.email}</td>
                <td>${profile.tenantName ?? '—'}</td>
                <td>${profile.category ?? '—'}</td>
                <td>
                  <span className=${['status-pill', `status-pill--${profile.status}`].join(' ')}>
                    ${statusLabel[profile.status] ?? profile.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="ghost-button" onClick=${() => onEdit?.(profile.id)}>
                    Editar
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    </div>
  `;
}
