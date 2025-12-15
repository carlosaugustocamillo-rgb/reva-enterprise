export const mecInstitutions = [
  { id: 'UEL', name: 'Universidade Estadual de Londrina', uf: 'PR' },
  { id: 'USP', name: 'Universidade de São Paulo', uf: 'SP' },
  { id: 'UNICAMP', name: 'Universidade Estadual de Campinas', uf: 'SP' },
  { id: 'UNESP', name: 'Universidade Estadual Paulista Júlio de Mesquita Filho', uf: 'SP' },
  { id: 'UFRJ', name: 'Universidade Federal do Rio de Janeiro', uf: 'RJ' },
  { id: 'UFMG', name: 'Universidade Federal de Minas Gerais', uf: 'MG' },
  { id: 'UFPR', name: 'Universidade Federal do Paraná', uf: 'PR' },
  { id: 'UFSC', name: 'Universidade Federal de Santa Catarina', uf: 'SC' },
  { id: 'UFBA', name: 'Universidade Federal da Bahia', uf: 'BA' },
  { id: 'UFPE', name: 'Universidade Federal de Pernambuco', uf: 'PE' },
  { id: 'UFRGS', name: 'Universidade Federal do Rio Grande do Sul', uf: 'RS' },
  { id: 'UFPA', name: 'Universidade Federal do Pará', uf: 'PA' },
  { id: 'UFC', name: 'Universidade Federal do Ceará', uf: 'CE' },
  { id: 'UFMA', name: 'Universidade Federal do Maranhão', uf: 'MA' },
  { id: 'UFPI', name: 'Universidade Federal do Piauí', uf: 'PI' },
  { id: 'UFES', name: 'Universidade Federal do Espírito Santo', uf: 'ES' },
  { id: 'UFRN', name: 'Universidade Federal do Rio Grande do Norte', uf: 'RN' },
  { id: 'UFMS', name: 'Universidade Federal de Mato Grosso do Sul', uf: 'MS' },
  { id: 'UFMT', name: 'Universidade Federal de Mato Grosso', uf: 'MT' },
  { id: 'UNB', name: 'Universidade de Brasília', uf: 'DF' },
  { id: 'UFAC', name: 'Universidade Federal do Acre', uf: 'AC' },
  { id: 'UFAM', name: 'Universidade Federal do Amazonas', uf: 'AM' },
  { id: 'UFAL', name: 'Universidade Federal de Alagoas', uf: 'AL' },
  { id: 'UFPB', name: 'Universidade Federal da Paraíba', uf: 'PB' },
  { id: 'UFSE', name: 'Universidade Federal de Sergipe', uf: 'SE' },
  { id: 'UNOESTE', name: 'Universidade do Oeste Paulista', uf: 'SP' },
  { id: 'PUCSP', name: 'Pontifícia Universidade Católica de São Paulo', uf: 'SP' },
  { id: 'PUCRS', name: 'Pontifícia Universidade Católica do Rio Grande do Sul', uf: 'RS' },
  { id: 'PUC/RIO', name: 'Pontifícia Universidade Católica do Rio de Janeiro', uf: 'RJ' },
  { id: 'PUCPR', name: 'Pontifícia Universidade Católica do Paraná', uf: 'PR' },
  { id: 'UNISA', name: 'Universidade Santo Amaro', uf: 'SP' },
  { id: 'UNIP', name: 'Universidade Paulista', uf: 'SP' },
  { id: 'UNIFESP', name: 'Universidade Federal de São Paulo', uf: 'SP' },
  { id: 'UNIFEI', name: 'Universidade Federal de Itajubá', uf: 'MG' },
  { id: 'UFOP', name: 'Universidade Federal de Ouro Preto', uf: 'MG' },
  { id: 'UNIRIO', name: 'Universidade Federal do Estado do Rio de Janeiro', uf: 'RJ' },
  { id: 'UFJF', name: 'Universidade Federal de Juiz de Fora', uf: 'MG' },
  { id: 'UFPEL', name: 'Universidade Federal de Pelotas', uf: 'RS' },
  { id: 'UFU', name: 'Universidade Federal de Uberlândia', uf: 'MG' },
  { id: 'UFTM', name: 'Universidade Federal do Triângulo Mineiro', uf: 'MG' },
];

export function searchInstitutionsOffline(term, limit = 10) {
  const normalized = term?.trim().toLowerCase();
  if (!normalized) return [];
  return mecInstitutions
    .filter((item) => item.name.toLowerCase().includes(normalized) || item.id.toLowerCase().includes(normalized))
    .slice(0, limit);
}
