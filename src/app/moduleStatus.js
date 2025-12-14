const statusMap = {
  active: { label: 'Ativo', tone: 'positive' },
  planned: { label: 'Planejado', tone: 'info' },
  locked: { label: 'Não contratado', tone: 'muted' },
};

export function getTenantModules(tenant, catalog = []) {
  if (!tenant || !catalog.length) return [];

  const activeModules = tenant.activeModules ?? [];
  const comingSoon = tenant.comingSoon ?? [];

  return catalog.map((module) => {
    const isActive = activeModules.includes(module.id);
    const isComing = comingSoon.includes(module.id);

    let status = 'locked';
    if (isActive) status = 'active';
    else if (isComing) status = 'planned';

    const meta = statusMap[status] ?? statusMap.locked;

    return {
      ...module,
      status,
      statusLabel: meta.label,
      tone: meta.tone,
    };
  });
}

export function filterModules(modules = [], filter) {
  if (filter === 'all') return modules;
  return modules.filter((module) => module.status === filter);
}
