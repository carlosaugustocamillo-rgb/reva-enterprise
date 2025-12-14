import { html } from '../lib/html.js';

const toneClass = {
  positive: 'insight-card--positive',
  info: 'insight-card--info',
};

export function InsightPanel({ cards = [] }) {
  if (!cards.length) return null;

  return html`
    <section className="insight-panel">
      ${cards.map((card, index) => {
        const classes = ['insight-card', toneClass[card.tone] ?? ''].filter(Boolean).join(' ');
        return html`
          <article key=${card.id ?? `insight-${index}`} className=${classes}>
            <p className="insight-card__label">${card.label}</p>
            <strong className="insight-card__value">${card.value}</strong>
            <span className="insight-card__variation">${card.variation}</span>
          </article>
        `;
      })}
    </section>
  `;
}
