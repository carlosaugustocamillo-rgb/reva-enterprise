import { html } from '../lib/html.js';

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'active', label: 'Ativos' },
  { id: 'planned', label: 'Planejados' },
  { id: 'locked', label: 'Não contratados' },
];

export function ModuleFilters({ activeFilter, onChange }) {
  return html`
    <div className="module-filters">
      ${filters.map((filter) => {
        const isActive = filter.id === activeFilter;
        const classes = ['module-filter', isActive ? 'module-filter--active' : '']
          .filter(Boolean)
          .join(' ');
        return html`
          <button
            key=${filter.id}
            type="button"
            data-filter=${filter.id}
            className=${classes}
            onClick=${() => onChange?.(filter.id)}
          >
            ${filter.label}
          </button>
        `;
      })}
    </div>
  `;
}
