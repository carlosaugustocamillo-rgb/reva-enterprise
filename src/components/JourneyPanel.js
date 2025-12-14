import { html } from '../lib/html.js';

const journeyBlueprint = [
  {
    id: 'activation',
    label: 'Ativar módulos críticos',
    dependsOn: ['payments', 'events'],
  },
  {
    id: 'experience',
    label: 'Escalar comunicação e atendimento',
    dependsOn: ['communications', 'support'],
  },
  {
    id: 'governance',
    label: 'Liberar governança avançada',
    dependsOn: ['legal', 'science'],
  },
];

export function JourneyPanel({ tenant }) {
  const activeModules = tenant?.activeModules ?? [];
  const comingSoon = tenant?.comingSoon ?? [];

  const items = journeyBlueprint.map((step) => {
    const hasAll = step.dependsOn.every((moduleId) => activeModules.includes(moduleId));
    const isPlanned = !hasAll && step.dependsOn.every((moduleId) => comingSoon.includes(moduleId));
    const tone = hasAll ? 'done' : isPlanned ? 'planned' : 'todo';
    const hint = hasAll
      ? 'Pronto para monitorar resultados'
      : isPlanned
      ? 'Planejamento em andamento'
      : 'Planeje a ativação dos módulos relacionados';

    const classes = ['journey-item', `journey-item--${tone}`].join(' ');

    return html`
      <li key=${step.id} className=${classes}>
        <span className="journey-item__status"></span>
        <div>
          <p className="journey-item__label">${step.label}</p>
          <span className="journey-item__hint">${hint}</span>
        </div>
      </li>
    `;
  });

  return html`
    <section className="journey-panel">
      <div className="journey-panel__header">
        <h3>Próximas etapas</h3>
        <span className="journey-panel__tenant">${tenant?.priority ?? 'Configure prioridades'}</span>
      </div>
      <ul className="journey-list">${items}</ul>
    </section>
  `;
}
