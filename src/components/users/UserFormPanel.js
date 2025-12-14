import { html } from '../../lib/html.js';
import { useState, useEffect } from '../../lib/react.js';

const tabs = [
  { id: 'personal', label: 'Dados Pessoais' },
  { id: 'addresses', label: 'Endereços' },
  { id: 'contacts', label: 'Telefones' },
  { id: 'contributions', label: 'Contribuições' },
  { id: 'education', label: 'Escolaridade' },
  { id: 'practices', label: 'Atuação' },
  { id: 'specialties', label: 'Especialidades' },
  { id: 'titles', label: 'Titularidades' },
  { id: 'roles', label: 'Cargos' },
  { id: 'notes', label: 'Outros' },
];

const statusOptions = [
  { id: 'ativo', label: 'Ativo' },
  { id: 'implementacao', label: 'Em implementação' },
  { id: 'inativo', label: 'Inativo' },
];

const associationStatusOptions = [
  { id: 'ativa', label: 'Ativa' },
  { id: 'pendente', label: 'Pendente' },
  { id: 'suspensa', label: 'Suspensa' },
];

const genderOptions = ['Feminino', 'Masculino', 'Outro'];

const membershipOptions = [
  { id: 'professional_annual', label: 'Profissional anual' },
  { id: 'professional_monthly', label: 'Profissional mensal' },
  { id: 'student', label: 'Estudante' },
];

export function UserFormPanel({ tenants, initialData, onSubmit, onCancel, isSaving, error }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formState, setFormState] = useState(() => createDefaultState(initialData, tenants));

  useEffect(() => {
    setFormState(createDefaultState(initialData, tenants));
  }, [initialData, tenants]);

  function handleFieldChange(field, value) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  function handleArrayChange(listKey, index, field, value) {
    setFormState((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    }));
  }

  function handleAddItem(listKey, template) {
    setFormState((prev) => ({ ...prev, [listKey]: [...prev[listKey], template] }));
  }

  function handleRemoveItem(listKey, index) {
    setFormState((prev) => ({ ...prev, [listKey]: prev[listKey].filter((_, idx) => idx !== index) }));
  }

  function handleSubmit(event) {
    event?.preventDefault?.();
    onSubmit?.(formState);
  }

  return html`
    <section className="user-form card">
      <div className="user-form__header">
        <div>
          <p className="panel-eyebrow">${initialData ? 'Editar perfil' : 'Novo perfil'}</p>
          <h2 className="panel-title">${initialData ? initialData.fullName : 'Cadastro de associado'}</h2>
        </div>
        <button type="button" className="ghost-button" onClick=${onCancel}>Fechar</button>
      </div>
      <div className="user-form__tabs">
        ${tabs.map((tab) => {
          const classes = ['user-form__tab', activeTab === tab.id ? 'is-active' : ''].filter(Boolean).join(' ');
          return html`
            <button key=${tab.id} type="button" className=${classes} onClick=${() => setActiveTab(tab.id)}>
              ${tab.label}
            </button>
          `;
        })}
      </div>
      ${renderTabContent({ formState, handleFieldChange, handleArrayChange, handleAddItem, handleRemoveItem, activeTab })}
      ${error && html`<p className="data-feedback data-feedback--error">${error}</p>`}
      <div className="user-form__actions">
        <button type="button" className="ghost-button" onClick=${onCancel} disabled=${isSaving}>Cancelar</button>
        <button type="button" className="primary-button" onClick=${handleSubmit} disabled=${isSaving}>
          ${isSaving ? 'Salvando...' : 'Salvar informações'}
        </button>
      </div>
    </section>
  `;
}

function renderTabContent({ formState, handleFieldChange, handleArrayChange, handleAddItem, handleRemoveItem, activeTab }) {
  const tenantOptions = formState.tenantOptions ?? [];
  switch (activeTab) {
    case 'personal':
      return html`
        <form className="user-form__grid" onSubmit=${(e) => e.preventDefault()}>
          <label>
            <span>Tenant</span>
            <select value=${formState.tenantId} onChange=${(event) => handleFieldChange('tenantId', event.target.value)}>
              ${tenantOptions.map((tenant) =>
                html`<option key=${tenant.id} value=${tenant.id}>${tenant.name}</option>`
              )}
            </select>
          </label>
          <label>
            <span>Nome completo</span>
            <input type="text" value=${formState.fullName} onInput=${(event) => handleFieldChange('fullName', event.target.value)} />
          </label>
          <label>
            <span>Como deseja ser chamado</span>
            <input type="text" value=${formState.preferredName} onInput=${(event) => handleFieldChange('preferredName', event.target.value)} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value=${formState.email} onInput=${(event) => handleFieldChange('email', event.target.value)} />
          </label>
          <label>
            <span>CPF</span>
            <input type="text" value=${formState.documentId} onInput=${(event) => handleFieldChange('documentId', event.target.value)} />
          </label>
          <label>
            <span>Conselho (número)</span>
            <input type="text" value=${formState.councilNumber} onInput=${(event) => handleFieldChange('councilNumber', event.target.value)} />
          </label>
          <label>
            <span>UF do Conselho</span>
            <input type="text" value=${formState.councilState} onInput=${(event) => handleFieldChange('councilState', event.target.value)} />
          </label>
          <label>
            <span>Nacionalidade</span>
            <input type="text" value=${formState.nationality} onInput=${(event) => handleFieldChange('nationality', event.target.value)} />
          </label>
          <label>
            <span>Sexo</span>
            <select value=${formState.gender} onChange=${(event) => handleFieldChange('gender', event.target.value)}>
              <option value="">Selecione</option>
              ${genderOptions.map((option) => html`<option key=${option} value=${option}>${option}</option>`)}
            </select>
          </label>
          <label>
            <span>Estado civil</span>
            <input type="text" value=${formState.maritalStatus} onInput=${(event) => handleFieldChange('maritalStatus', event.target.value)} />
          </label>
          <label>
            <span>Nascimento</span>
            <input type="date" value=${formState.birthDate} onInput=${(event) => handleFieldChange('birthDate', event.target.value)} />
          </label>
          <label>
            <span>Categoria</span>
            <input type="text" value=${formState.category} onInput=${(event) => handleFieldChange('category', event.target.value)} />
          </label>
          <label>
            <span>Status</span>
            <select value=${formState.status} onChange=${(event) => handleFieldChange('status', event.target.value)}>
              ${statusOptions.map((option) => html`<option key=${option.id} value=${option.id}>${option.label}</option>`)}
            </select>
          </label>
          <label>
            <span>Status da associação</span>
            <select
              value=${formState.associationStatus}
              onChange=${(event) => handleFieldChange('associationStatus', event.target.value)}
            >
              ${associationStatusOptions.map((option) => html`<option key=${option.id} value=${option.id}>${option.label}</option>`)}
            </select>
          </label>
          <label>
            <span>Tipo de associação</span>
            <select value=${formState.membershipType} onChange=${(event) => handleFieldChange('membershipType', event.target.value)}>
              ${membershipOptions.map((option) => html`<option key=${option.id} value=${option.id}>${option.label}</option>`)}
            </select>
          </label>
          <label>
            <span>Vigência inicial</span>
            <input
              type="date"
              value=${formState.membershipStartedAt}
              onInput=${(event) => handleFieldChange('membershipStartedAt', event.target.value)}
            />
          </label>
          <label>
            <span>Vigência final</span>
            <input
              type="date"
              value=${formState.membershipExpiresAt}
              onInput=${(event) => handleFieldChange('membershipExpiresAt', event.target.value)}
            />
          </label>
          <label>
            <span>URL da foto (quadrada)</span>
            <input type="url" value=${formState.avatarUrl} onInput=${(event) => handleFieldChange('avatarUrl', event.target.value)} />
          </label>
        </form>
      `;
    case 'addresses':
      return html`
        <div className="user-form__list">
          ${formState.addresses.map((address, index) => html`
            <div key=${address.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Endereço ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('addresses', index)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${(event) => event.preventDefault()}>
                <label>
                  <span>Tipo</span>
                  <input type="text" value=${address.type} onInput=${(event) => handleArrayChange('addresses', index, 'type', event.target.value)} />
                </label>
                <label>
                  <span>Tipo de logradouro</span>
                  <input type="text" value=${address.streetType} onInput=${(event) => handleArrayChange('addresses', index, 'streetType', event.target.value)} />
                </label>
                <label>
                  <span>Logradouro</span>
                  <input type="text" value=${address.street} onInput=${(event) => handleArrayChange('addresses', index, 'street', event.target.value)} />
                </label>
                <label>
                  <span>Número</span>
                  <input type="text" value=${address.number} onInput=${(event) => handleArrayChange('addresses', index, 'number', event.target.value)} />
                </label>
                <label>
                  <span>Complemento</span>
                  <input type="text" value=${address.complement} onInput=${(event) => handleArrayChange('addresses', index, 'complement', event.target.value)} />
                </label>
                <label>
                  <span>Bairro</span>
                  <input type="text" value=${address.district} onInput=${(event) => handleArrayChange('addresses', index, 'district', event.target.value)} />
                </label>
                <label>
                  <span>Município</span>
                  <input type="text" value=${address.city} onInput=${(event) => handleArrayChange('addresses', index, 'city', event.target.value)} />
                </label>
                <label>
                  <span>Estado</span>
                  <input type="text" value=${address.state} onInput=${(event) => handleArrayChange('addresses', index, 'state', event.target.value)} />
                </label>
                <label>
                  <span>CEP</span>
                  <input type="text" value=${address.postalCode} onInput=${(event) => handleArrayChange('addresses', index, 'postalCode', event.target.value)} />
                </label>
                <label>
                  <span>País</span>
                  <input type="text" value=${address.country} onInput=${(event) => handleArrayChange('addresses', index, 'country', event.target.value)} />
                </label>
                <label>
                  <span>
                    <input
                      type="checkbox"
                      checked=${address.isPrimary}
                      onChange=${(event) => handleArrayChange('addresses', index, 'isPrimary', event.target.checked)}
                    />
                    Endereço principal
                  </span>
                </label>
                <label>
                  <span>
                    <input
                      type="checkbox"
                      checked=${address.isCorrespondence}
                      onChange=${(event) => handleArrayChange('addresses', index, 'isCorrespondence', event.target.checked)}
                    />
                    Correspondência
                  </span>
                </label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('addresses', createAddressTemplate())}>
            + Adicionar endereço
          </button>
        </div>
      `;
    case 'contacts':
      return html`
        <div className="user-form__list">
          ${formState.contacts.map((contact, index) => html`
            <div key=${contact.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Telefone ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('contacts', index)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${(event) => event.preventDefault()}>
                <label>
                  <span>Tipo</span>
                  <input type="text" value=${contact.type} onInput=${(event) => handleArrayChange('contacts', index, 'type', event.target.value)} />
                </label>
                <label>
                  <span>Código do país</span>
                  <input type="text" value=${contact.countryCode} onInput=${(event) => handleArrayChange('contacts', index, 'countryCode', event.target.value)} />
                </label>
                <label>
                  <span>DDD</span>
                  <input type="text" value=${contact.areaCode} onInput=${(event) => handleArrayChange('contacts', index, 'areaCode', event.target.value)} />
                </label>
                <label>
                  <span>Número</span>
                  <input type="text" value=${contact.number} onInput=${(event) => handleArrayChange('contacts', index, 'number', event.target.value)} />
                </label>
                <label>
                  <span>Rótulo</span>
                  <input type="text" value=${contact.label} onInput=${(event) => handleArrayChange('contacts', index, 'label', event.target.value)} />
                </label>
                <label>
                  <span>
                    <input
                      type="checkbox"
                      checked=${contact.isPrimary}
                      onChange=${(event) => handleArrayChange('contacts', index, 'isPrimary', event.target.checked)}
                    />
                    Principal
                  </span>
                </label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('contacts', createContactTemplate())}>
            + Adicionar telefone
          </button>
        </div>
      `;
    case 'contributions':
      return html`
        <div className="user-form__list">
          ${formState.contributions.map((item, index) => html`
            <div key=${item.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Contribuição ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('contributions', index)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${(event) => event.preventDefault()}>
                <label><span>Competência</span><input type="text" value=${item.referencePeriod} onInput=${(event) => handleArrayChange('contributions', index, 'referencePeriod', event.target.value)} /></label>
                <label><span>Vencimento</span><input type="date" value=${item.dueDate} onInput=${(event) => handleArrayChange('contributions', index, 'dueDate', event.target.value)} /></label>
                <label><span>Valor devido</span><input type="number" step="0.01" value=${item.amountDue} onInput=${(event) => handleArrayChange('contributions', index, 'amountDue', event.target.value)} /></label>
                <label><span>Valor pago</span><input type="number" step="0.01" value=${item.amountPaid} onInput=${(event) => handleArrayChange('contributions', index, 'amountPaid', event.target.value)} /></label>
                <label><span>Status</span><input type="text" value=${item.status} onInput=${(event) => handleArrayChange('contributions', index, 'status', event.target.value)} /></label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('contributions', createContributionTemplate())}>
            + Adicionar contribuição
          </button>
        </div>
      `;
    case 'education':
      return html`
        <div className="user-form__list">
          ${formState.education.map((item, index) => html`
            <div key=${item.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Formação ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('education', index)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${(event) => event.preventDefault()}>
                <label><span>Nível</span><input type="text" value=${item.level} onInput=${(event) => handleArrayChange('education', index, 'level', event.target.value)} /></label>
                <label><span>Instituição</span><input type="text" value=${item.institution} onInput=${(event) => handleArrayChange('education', index, 'institution', event.target.value)} /></label>
                <label><span>Curso</span><input type="text" value=${item.course} onInput=${(event) => handleArrayChange('education', index, 'course', event.target.value)} /></label>
                <label><span>Início</span><input type="date" value=${item.startedAt} onInput=${(event) => handleArrayChange('education', index, 'startedAt', event.target.value)} /></label>
                <label><span>Conclusão</span><input type="date" value=${item.finishedAt} onInput=${(event) => handleArrayChange('education', index, 'finishedAt', event.target.value)} /></label>
                <label><span>Carga horária</span><input type="number" value=${item.hours} onInput=${(event) => handleArrayChange('education', index, 'hours', event.target.value)} /></label>
                <label><span>Observações</span><input type="text" value=${item.notes} onInput=${(event) => handleArrayChange('education', index, 'notes', event.target.value)} /></label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('education', createEducationTemplate())}>
            + Adicionar formação
          </button>
        </div>
      `;
    case 'practices':
      return html`
        <div className="user-form__list">
          ${formState.practices.map((item, index) => html`
            <div key=${item.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Atuação ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('practices', index)}>
                  Remover
                </button>
              </div>
              <label>
                <span>Área</span>
                <input type="text" value=${item.practice} onInput=${(event) => handleArrayChange('practices', index, 'practice', event.target.value)} />
              </label>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('practices', createPracticeTemplate())}>
            + Adicionar atuação
          </button>
        </div>
      `;
    case 'specialties':
      return html`
        <div className="user-form__list">
          ${formState.specialties.map((item, index) => html`
            <div key=${item.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Especialidade ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('specialties', index)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${(event) => event.preventDefault()}>
                <label><span>Área</span><input type="text" value=${item.area} onInput=${(event) => handleArrayChange('specialties', index, 'area', event.target.value)} /></label>
                <label><span>Especialidade</span><input type="text" value=${item.specialty} onInput=${(event) => handleArrayChange('specialties', index, 'specialty', event.target.value)} /></label>
                <label><span>Subespecialidade</span><input type="text" value=${item.subSpecialty} onInput=${(event) => handleArrayChange('specialties', index, 'subSpecialty', event.target.value)} /></label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('specialties', createSpecialtyTemplate())}>
            + Adicionar especialidade
          </button>
        </div>
      `;
    case 'titles':
      return html`
        <div className="user-form__list">
          ${formState.titularities.map((item, index) => html`
            <div key=${item.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Titularidade ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('titularities', index)}>
                  Remover
                </button>
              </div>
              <label>
                <span>Descrição</span>
                <input type="text" value=${item.titleName} onInput=${(event) => handleArrayChange('titularities', index, 'titleName', event.target.value)} />
              </label>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('titularities', createTitleTemplate())}>
            + Adicionar titularidade
          </button>
        </div>
      `;
    case 'roles':
      return html`
        <div className="user-form__list">
          ${formState.roles.map((item, index) => html`
            <div key=${item.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Cargo ${index + 1}</strong>
                <button type="button" className="ghost-button" onClick=${() => handleRemoveItem('roles', index)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${(event) => event.preventDefault()}>
                <label><span>Nome</span><input type="text" value=${item.roleName} onInput=${(event) => handleArrayChange('roles', index, 'roleName', event.target.value)} /></label>
                <label><span>Início</span><input type="date" value=${item.startedAt} onInput=${(event) => handleArrayChange('roles', index, 'startedAt', event.target.value)} /></label>
                <label><span>Fim</span><input type="date" value=${item.finishedAt} onInput=${(event) => handleArrayChange('roles', index, 'finishedAt', event.target.value)} /></label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('roles', createRoleTemplate())}>
            + Adicionar cargo
          </button>
        </div>
      `;
    case 'notes':
      return html`
        <label className="user-form__notes">
          <span>Observações</span>
          <textarea value=${formState.notes} onInput=${(event) => handleFieldChange('notes', event.target.value)}></textarea>
        </label>
      `;
    default:
      return null;
  }
}

function createDefaultState(initialData, tenants) {
  const tenantId = initialData?.tenantId ?? tenants[0]?.id ?? '';
  return {
    tenantOptions: tenants,
    tenantId,
    fullName: initialData?.fullName ?? '',
    preferredName: initialData?.preferredName ?? '',
    email: initialData?.email ?? '',
    documentId: initialData?.documentId ?? '',
    councilNumber: initialData?.councilNumber ?? '',
    councilState: initialData?.councilState ?? '',
    nationality: initialData?.nationality ?? '',
    gender: initialData?.gender ?? '',
    maritalStatus: initialData?.maritalStatus ?? '',
    birthDate: initialData?.birthDate ?? '',
    category: initialData?.category ?? '',
    status: initialData?.status ?? 'ativo',
    associationStatus: initialData?.associationStatus ?? 'pendente',
    membershipType: initialData?.membershipType ?? 'professional_annual',
    membershipStartedAt: initialData?.membershipStartedAt ?? '',
    membershipExpiresAt: initialData?.membershipExpiresAt ?? '',
    avatarUrl: initialData?.avatarUrl ?? '',
    notes: initialData?.notes ?? '',
    addresses: (initialData?.addresses ?? []).map((item) => ({ ...createAddressTemplate(), ...item })),
    contacts: (initialData?.contacts ?? []).map((item) => ({ ...createContactTemplate(), ...item })),
    education: (initialData?.education ?? []).map((item) => ({ ...createEducationTemplate(), ...item })),
    practices: (initialData?.practices ?? []).map((item) => ({ ...createPracticeTemplate(), ...item })),
    specialties: (initialData?.specialties ?? []).map((item) => ({ ...createSpecialtyTemplate(), ...item })),
    titularities: (initialData?.titularities ?? []).map((item) => ({ ...createTitleTemplate(), ...item })),
    roles: (initialData?.roles ?? []).map((item) => ({ ...createRoleTemplate(), ...item })),
    contributions: (initialData?.contributions ?? []).map((item) => ({ ...createContributionTemplate(), ...item })),
  };
}

function createAddressTemplate() {
  return {
    id: createId(),
    type: 'Residencial',
    streetType: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    country: 'Brasil',
    postalCode: '',
    isPrimary: false,
    isCorrespondence: false,
  };
}

function createContactTemplate() {
  return {
    id: createId(),
    type: 'celular',
    countryCode: '+55',
    areaCode: '',
    number: '',
    label: '',
    isPrimary: false,
  };
}

function createEducationTemplate() {
  return {
    id: createId(),
    level: '',
    institution: '',
    course: '',
    startedAt: '',
    finishedAt: '',
    hours: '',
    notes: '',
  };
}

function createPracticeTemplate() {
  return {
    id: createId(),
    practice: '',
  };
}

function createSpecialtyTemplate() {
  return {
    id: createId(),
    area: '',
    specialty: '',
    subSpecialty: '',
  };
}

function createTitleTemplate() {
  return {
    id: createId(),
    titleName: '',
  };
}

function createRoleTemplate() {
  return {
    id: createId(),
    roleName: '',
    startedAt: '',
    finishedAt: '',
  };
}

function createContributionTemplate() {
  return {
    id: createId(),
    referencePeriod: '',
    dueDate: '',
    amountDue: '',
    amountPaid: '',
    status: 'pending',
  };
}

function createId() {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
