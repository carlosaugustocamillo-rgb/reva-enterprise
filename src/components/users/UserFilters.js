import { html } from '../../lib/html.js';

export function UserFilters({ query, statusFilter, onQueryChange, onStatusChange }) {
  return html`
    <div className="user-filters">
      <input
        className="user-filters__search"
        type="search"
        placeholder="Buscar por nome ou e-mail"
        value=${query}
        onInput=${(event) => onQueryChange?.(event.target.value)}
      />
      <select
        className="user-filters__status"
        value=${statusFilter}
        onChange=${(event) => onStatusChange?.(event.target.value)}
      >
        <option value="all">Todos os status</option>
        <option value="ativo">Ativos</option>
        <option value="implementacao">Em implementação</option>
        <option value="inativo">Inativos</option>
      </select>
    </div>
  `;
}
