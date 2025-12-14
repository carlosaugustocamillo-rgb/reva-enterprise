import { html } from '../lib/html.js';

export function ModuleWorkspaceNav({ items, activeId, onChange }) {
  return html`
    <nav className="module-workspace-nav">
      ${items.map((item) => {
        const isActive = item.id === activeId;
        const classes = ['module-workspace-nav__item', isActive ? 'is-active' : '']
          .filter(Boolean)
          .join(' ');
        return html`
          <button
            key=${item.id}
            type="button"
            className=${classes}
            onClick=${() => onChange(item.id)}
          >
            <span>${item.label}</span>
            ${item.description && html`<small>${item.description}</small>`}
          </button>`;
      })}
    </nav>
  `;
}
