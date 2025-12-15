import { html } from '../lib/html.js';

const variantClass = {
  primary: 'quick-action--primary',
  ghost: 'quick-action--ghost',
};

export function QuickActions({ actions = [], onAction }) {
  if (!actions.length) return null;

  return html`
    <div className="quick-actions">
      ${actions.map((action) => {
        const classes = ['quick-action', variantClass[action.variant] ?? '']
          .filter(Boolean)
          .join(' ');
        return html`
          <button
            key=${action.id}
            type="button"
            className=${classes}
            data-action=${action.id}
            disabled=${action.disabled}
            onClick=${() => onAction?.(action.id)}
          >
            ${action.label}
          </button>
        `;
      })}
    </div>
  `;
}
