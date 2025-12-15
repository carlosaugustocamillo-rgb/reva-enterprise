import { html } from '../../lib/html.js';
import { useState, useEffect, useRef } from '../../lib/react.js';
import { searchInstitutionsOffline } from '../../data/mecInstitutions.js';

const tabs = [
  { id: 'personal', label: 'Dados Pessoais' },
  { id: 'addresses', label: 'Endereços' },
  { id: 'contacts', label: 'Telefones' },
  { id: 'education', label: 'Escolaridade' },
  { id: 'practices', label: 'Atuação' },
  { id: 'specialties', label: 'Especialidade (de acordo com o COFFITO)' },
  { id: 'roles', label: 'Cargos' },
  { id: 'notes', label: 'Outros' },
];

const genderOptions = ['Feminino', 'Masculino', 'Outro'];
const contactTypeOptions = [
  { id: 'residencial', label: 'Residencial' },
  { id: 'celular', label: 'Celular' },
  { id: 'trabalho', label: 'Trabalho' },
];

const membershipOptions = [
  { id: 'professional', label: 'Profissional' },
  { id: 'student', label: 'Estudante' },
];

const categoryOptions = [
  { id: 'efetivo', label: 'Efetivo' },
  { id: 'especialista', label: 'Especialista' },
  { id: 'emerito', label: 'Emérito' },
];

const practiceOptions = [
  { id: 'icu_adult', label: 'Fisioterapia em Terapia Intensiva Adulto', value: 'Fisioterapia em Terapia Intensiva Adulto' },
  { id: 'respiratoria', label: 'Fisioterapia Respiratória', value: 'Fisioterapia Respiratória' },
  { id: 'cardiovascular', label: 'Fisioterapia Cardiovascular', value: 'Fisioterapia Cardiovascular' },
  { id: 'icu_pediatric', label: 'Fisioterapia em Terapia Intensiva Pediátrica', value: 'Fisioterapia em Terapia Intensiva Pediátrica' },
  { id: 'icu_neonatal', label: 'Fisioterapia em Terapia Intensiva Neonatal', value: 'Fisioterapia em Terapia Intensiva Neonatal' },
  { id: 'sleep', label: 'Fisioterapia nos Distúrbios Respiratórios do Sono', value: 'Fisioterapia nos Distúrbios respiratórios do Sono' },
  { id: 'pediatric_cardioresp', label: 'Fisioterapia Cardiorrespiratória Pediátrica', value: 'Fisioterapia Cradiorrespiratória Pediátrica' },
  { id: 'other', label: 'Outra (especificar)', value: 'other' },
];
const practiceValueSet = new Set(practiceOptions.map((option) => option.value));

const specialtyOptions = [
  { id: 'respiratoria', label: 'Fisioterapia Respiratória', value: 'Fisioterapia Respiratória' },
  { id: 'cardiovascular', label: 'Fisioterapia Cardiovascular', value: 'Fisioterapia Cardiovascular' },
  { id: 'uti', label: 'Fisioterapia em Terapia Intensiva', value: 'Fisioterapia em Terapia Intensiva' },
  { id: 'uti_ped', label: 'Fisioterapia em Terapia Intensiva Pediátrica', value: 'Fisioterapia em Terapia Intensiva Pediátrica' },
  { id: 'uti_neonatal', label: 'Fisioterapia em Terapia Intensiva Neonatal', value: 'Fisioterapia em Terapia Intensiva Neonatal' },
  { id: 'acupuntura', label: 'Fisioterapia em Acupuntura', value: 'Fisioterapia em Acupuntura' },
  { id: 'aquatica', label: 'Fisioterapia Aquática', value: 'Fisioterapia Aquática' },
  { id: 'dermatofuncional', label: 'Fisioterapia Dermatofuncional', value: 'Fisioterapia Dermatofuncional' },
  { id: 'esportiva', label: 'Fisioterapia Esportiva', value: 'Fisioterapia Esportiva' },
  { id: 'gerontologia', label: 'Fisioterapia em Gerontologia', value: 'Fisioterapia em Gerontologia' },
  { id: 'trabalho', label: 'Fisioterapia do Trabalho', value: 'Fisioterapia do Trabalho' },
  { id: 'neurofuncional', label: 'Fisioterapia Neurofuncional', value: 'Fisioterapia Neurofuncional' },
  { id: 'oncologia', label: 'Fisioterapia em Oncologia', value: 'Fisioterapia em Oncologia' },
  { id: 'reumatologia', label: 'Fisioterapia em Reumatologia', value: 'Fisioterapia em Reumatologia' },
  { id: 'traumato', label: 'Fisioterapia Traumato-Ortopédica', value: 'Fisioterapia Traumato-Ortopédica' },
  { id: 'saude_mulher', label: 'Fisioterapia em Saúde da Mulher', value: 'Fisioterapia em Saúde da Mulher' },
  { id: 'osteopatia', label: 'Fisioterapia em Osteopatia', value: 'Fisioterapia em Osteopatia' },
  { id: 'quiropraxia', label: 'Fisioterapia em Quiropraxia', value: 'Fisioterapia em Quiropraxia' },
];

const ufOptions = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
];

const nationalityTypes = [
  { id: 'br', label: 'Brasileiro' },
  { id: 'foreign', label: 'Estrangeiro' },
];

export function UserFormPanel({
  tenants,
  initialData,
  onSubmit,
  onCancel,
  isSaving,
  error,
  lockedTenantId,
  canEditTenant = true,
  canEditRole = false,
}) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formState, setFormState] = useState(() => createDefaultState(initialData, tenants, lockedTenantId));
  const [avatarError, setAvatarError] = useState(null);
  const [institutionSuggestions, setInstitutionSuggestions] = useState({});
  const [institutionSearchState, setInstitutionSearchState] = useState({
    loadingIndex: null,
    error: null,
    errorIndex: null,
  });
  const institutionSearchTimeout = useRef(null);

  useEffect(() => {
    setFormState(createDefaultState(initialData, tenants, lockedTenantId));
  }, [initialData, tenants, lockedTenantId]);
  useEffect(() => {
    return () => {
      if (institutionSearchTimeout.current) {
        clearTimeout(institutionSearchTimeout.current);
      }
    };
  }, []);

  function handleFieldChange(field, value) {
    if (field === 'tenantId' && !canEditTenant) {
      return;
    }
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  function handleArrayChange(listKey, index, field, value) {
    setFormState((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    }));
  }

  function handleBulkAddressUpdate(index, updates) {
    setFormState((prev) => ({
      ...prev,
      addresses: prev.addresses.map((item, idx) => (idx === index ? { ...item, ...updates } : item)),
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

  function handleCPFInput(event) {
    const masked = formatCPF(event.target.value);
    event.target.value = masked;
    handleFieldChange('documentId', masked);
  }

  function handleCouncilInput(event) {
    const masked = formatCouncil(event.target.value);
    event.target.value = masked;
    handleFieldChange('councilNumber', masked);
  }

  function handleInstitutionInput(index, rawValue) {
    handleArrayChange('education', index, 'institution', rawValue);
    if (institutionSearchTimeout.current) {
      clearTimeout(institutionSearchTimeout.current);
    }
    const term = rawValue.trim();
    if (!term || term.length < 3) {
      setInstitutionSuggestions((prev) => ({ ...prev, [index]: [] }));
      setInstitutionSearchState((prev) => ({ ...prev, error: null, errorIndex: null }));
      return;
    }
    institutionSearchTimeout.current = setTimeout(() => {
      fetchInstitutionsFromMEC(index, term);
    }, 400);
  }

  async function fetchInstitutionsFromMEC(index, term) {
    try {
      setInstitutionSearchState({ loadingIndex: index, error: null, errorIndex: null });
      const response = await fetch(
        `https://emec.mec.gov.br/api/v1/ies?limit=10&termo=${encodeURIComponent(term)}`
      );
      if (!response.ok) {
        throw new Error('Falha ao consultar MEC');
      }
      const payload = await response.json();
      const items = Array.isArray(payload)
        ? payload
        : payload?.items ?? payload?.content ?? payload?.dados ?? [];
      const suggestions = items
        .map((item) => ({
          id: item?.id ?? item?.codigo ?? item?.cod_ies ?? item?.ies_id ?? `${item?.nome ?? item}`,
          name: item?.nome ?? item?.nome_completo ?? item?.nome_ies ?? item?.instituicao ?? item?.sigla ?? '',
          uf: item?.uf ?? item?.sigla_uf ?? item?.estado ?? '',
        }))
        .filter((option) => option.name);
      setInstitutionSuggestions((prev) => ({ ...prev, [index]: suggestions }));
      setInstitutionSearchState({ loadingIndex: null, error: null, errorIndex: null });
    } catch (error) {
      console.error('Erro ao buscar instituições MEC', error);
      const fallback = searchInstitutionsOffline(term);
      if (fallback.length) {
        setInstitutionSuggestions((prev) => ({ ...prev, [index]: fallback }));
        setInstitutionSearchState({
          loadingIndex: null,
          error: 'Usando lista MEC offline (amostra).',
          errorIndex: null,
        });
      } else {
        setInstitutionSuggestions((prev) => ({ ...prev, [index]: [] }));
        setInstitutionSearchState({
          loadingIndex: null,
          error: 'Não foi possível buscar instituições agora.',
          errorIndex: index,
        });
      }
    }
  }

  function handleInstitutionSelect(index, option) {
    handleArrayChange('education', index, 'institution', option?.name ?? '');
    if (option?.uf) {
      handleArrayChange('education', index, 'state', option.uf);
    }
    setInstitutionSuggestions((prev) => ({ ...prev, [index]: [] }));
    setInstitutionSearchState((prev) => ({ ...prev, error: null, errorIndex: null }));
  }

  function handleContactNumberInput(index, rawValue) {
    const type = formState.contacts[index]?.type ?? 'celular';
    const masked = formatPhoneNumber(rawValue, type);
    handleArrayChange('contacts', index, 'number', masked);
  }

  function handlePostalCodeInput(index, rawValue) {
    const masked = formatCEP(rawValue);
    handleArrayChange('addresses', index, 'postalCode', masked);
    const digits = masked.replace(/\D/g, '');
    if (digits.length === 8) {
      lookupAddressByCEP(index, digits);
    }
  }

  async function lookupAddressByCEP(index, cepDigits) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      if (!response.ok) return;
      const data = await response.json();
      if (data?.erro) return;
      const logradouro = data.logradouro ?? '';
      let streetType = '';
      let street = logradouro;
      if (logradouro.includes(' ')) {
        const parts = logradouro.split(' ');
        streetType = parts.shift();
        street = parts.join(' ');
      }
      handleBulkAddressUpdate(index, {
        streetType,
        street,
        district: data.bairro ?? '',
        city: data.localidade ?? '',
        state: data.uf ?? '',
      });
    } catch (error) {
      console.error('Falha ao buscar CEP', error);
    }
  }

  function handleNationalityTypeChange(event) {
    const value = event.target.value;
    if (value === 'br') {
      handleFieldChange('nationalityType', value);
      handleFieldChange('nationality', 'Brasileiro');
      handleFieldChange('foreignCountry', '');
    } else {
      handleFieldChange('nationalityType', value);
      handleFieldChange('nationality', formState.foreignCountry || '');
    }
  }

  function handleForeignCountryChange(event) {
    const value = event.target.value;
    handleFieldChange('foreignCountry', value);
    handleFieldChange('nationality', value);
  }

  function handleAvatarUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('A foto deve ter no máximo 5 MB.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarError(null);
      handleFieldChange('avatarFile', file);
      handleFieldChange('avatarPreview', reader.result);
    };
    reader.readAsDataURL(file);
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
      ${renderTabContent({
        formState,
        handleFieldChange,
        handleArrayChange,
        handleAddItem,
        handleRemoveItem,
        activeTab,
        handleCPFInput,
        handleCouncilInput,
        handleContactNumberInput,
        handlePostalCodeInput,
        handleInstitutionInput,
        handleInstitutionSelect,
        institutionSuggestions,
        institutionSearchState,
        handleNationalityTypeChange,
        handleForeignCountryChange,
        handleAvatarUpload,
        avatarError,
        canEditTenant,
        canEditRole,
      })}
      ${(error || avatarError) &&
      html`<p className="data-feedback data-feedback--error">${error ?? avatarError}</p>`}
      <div className="user-form__actions">
        <button type="button" className="ghost-button" onClick=${onCancel} disabled=${isSaving}>Cancelar</button>
        <button type="button" className="primary-button" onClick=${handleSubmit} disabled=${isSaving}>
          ${isSaving ? 'Salvando...' : 'Salvar informações'}
        </button>
      </div>
    </section>
  `;
}

function renderTabContent({
  formState,
  handleFieldChange,
  handleArrayChange,
  handleAddItem,
  handleRemoveItem,
  activeTab,
  handleCPFInput,
  handleCouncilInput,
  handleContactNumberInput,
  handlePostalCodeInput,
  handleInstitutionInput,
  handleInstitutionSelect,
  institutionSuggestions,
  institutionSearchState,
  handleNationalityTypeChange,
  handleForeignCountryChange,
  handleAvatarUpload,
  canEditTenant,
  canEditRole,
}) {
  const tenantOptions = formState.tenantOptions ?? [];
  switch (activeTab) {
    case 'personal':
      return html`
        <form className="user-form__grid" onSubmit=${(e) => e.preventDefault()}>
          <label>
            <span>Tenant</span>
            <select
              value=${formState.tenantId}
              onChange=${(event) => handleFieldChange('tenantId', event.target.value)}
              disabled=${!canEditTenant}
            >
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
            <input
              type="text"
              inputMode="numeric"
              value=${formState.documentId}
              onInput=${handleCPFInput}
              placeholder="000.000.000-00"
            />
          </label>
          <label>
            <span>Conselho (número)</span>
            <input
              type="text"
              value=${formState.councilNumber}
              onInput=${handleCouncilInput}
              placeholder="000.000-F"
            />
          </label>
          <label>
            <span>UF do Conselho</span>
            <select value=${formState.councilState} onChange=${(event) => handleFieldChange('councilState', event.target.value)}>
              <option value="">Selecione</option>
              ${ufOptions.map((uf) => html`<option key=${uf} value=${uf}>${uf}</option>`)}
            </select>
          </label>
          <label>
            <span>Nacionalidade</span>
            <select value=${formState.nationalityType} onChange=${handleNationalityTypeChange}>
              ${nationalityTypes.map((option) => html`<option key=${option.id} value=${option.id}>${option.label}</option>`)}
            </select>
          </label>
          ${formState.nationalityType === 'foreign' &&
          html`
            <label>
              <span>País de origem</span>
              <input type="text" value=${formState.foreignCountry} onInput=${handleForeignCountryChange} />
            </label>
          `}
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
            <select value=${formState.category} onChange=${(event) => handleFieldChange('category', event.target.value)}>
              <option value="">Selecione</option>
              ${categoryOptions.map((option) => html`<option key=${option.id} value=${option.id}>${option.label}</option>`)}
            </select>
          </label>
          <label>
            <span>Tipo de associação</span>
            <select value=${formState.membershipType} onChange=${(event) => handleFieldChange('membershipType', event.target.value)}>
              ${membershipOptions.map((option) => html`<option key=${option.id} value=${option.id}>${option.label}</option>`)}
            </select>
          </label>
          ${canEditRole &&
          html`
            <label>
              <span>Nível de acesso</span>
              <select value=${formState.role} onChange=${(event) => handleFieldChange('role', event.target.value)}>
                <option value="associado">Associado</option>
                <option value="tenant_admin">Tenant admin</option>
                <option value="super_admin">Super admin</option>
              </select>
            </label>
          `}
          <label>
            <span>Vigência inicial</span>
            <input
              type="date"
              value=${formState.membershipStartedAt}
              disabled=${true}
            />
          </label>
          <label>
            <span>Foto (quadrada)</span>
            <input type="file" accept="image/*" onChange=${handleAvatarUpload} />
            <small>Até 5 MB</small>
            ${(formState.avatarPreview || formState.avatarUrl) &&
            html`
              <div className="user-form__avatar-preview">
                <img src=${formState.avatarPreview || formState.avatarUrl} alt="Prévia do avatar" />
              </div>
            `}
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
                  <span>CEP</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="00000-000"
                    value=${address.postalCode}
                    onInput=${(event) => handlePostalCodeInput(index, event.target.value)}
                  />
                </label>
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
                  <select value=${contact.type} onChange=${(event) => handleArrayChange('contacts', index, 'type', event.target.value)}>
                    ${contactTypeOptions.map(
                      (option) => html`<option key=${option.id} value=${option.id}>${option.label}</option>`
                    )}
                  </select>
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
                  <input
                    type="text"
                    inputMode="numeric"
                    value=${contact.number}
                    onInput=${(event) => handleContactNumberInput(index, event.target.value)}
                    placeholder=${contact.type === 'celular' ? '00000-0000' : '0000-0000'}
                  />
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
                <label className="user-form__field-with-suggestions">
                  <span>Instituição</span>
                  <input
                    type="text"
                    value=${item.institution}
                    onInput=${(event) => handleInstitutionInput(index, event.target.value)}
                    placeholder="Buscar no MEC"
                  />
                  ${renderInstitutionSuggestions(
                    index,
                    institutionSuggestions,
                    institutionSearchState,
                    handleInstitutionSelect
                  )}
                </label>
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
                <select value=${item.practice} onChange=${(event) => handleArrayChange('practices', index, 'practice', event.target.value)}>
                  <option value="">Selecione</option>
                  ${practiceOptions.map(
                    (option) => html`<option key=${option.id} value=${option.value}>${option.label}</option>`
                  )}
                </select>
              </label>
              ${item.practice === 'other'
                ? html`
                    <label>
                      <span>Descreva a atuação</span>
                      <input
                        type="text"
                        value=${item.customPractice}
                        onInput=${(event) => handleArrayChange('practices', index, 'customPractice', event.target.value)}
                      />
                    </label>
                  `
                : null}
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
                <label>
                  <span>Especialidade (COFFITO)</span>
                  <select value=${item.specialty} onChange=${(event) => handleArrayChange('specialties', index, 'specialty', event.target.value)}>
                    <option value="">Selecione</option>
                    ${specialtyOptions.map(
                      (option) => html`<option key=${option.id} value=${option.value}>${option.label}</option>`
                    )}
                  </select>
                </label>
                <label>
                  <span>RQE</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value=${item.rqeNumber}
                    onInput=${(event) => handleArrayChange('specialties', index, 'rqeNumber', event.target.value.replace(/\D+/g, ''))}
                  />
                </label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${() => handleAddItem('specialties', createSpecialtyTemplate())}>
            + Adicionar especialidade
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

function createDefaultState(initialData, tenants, lockedTenantId) {
  const tenantId = lockedTenantId ?? initialData?.tenantId ?? tenants[0]?.id ?? '';
  const initialNationality = initialData?.nationality ?? 'Brasileiro';
  const isBrazilian = !initialNationality || initialNationality.toLowerCase() === 'brasileiro';
  const normalizedMembership = initialData?.membershipType === 'student' ? 'student' : 'professional';
  return {
    tenantOptions: tenants,
    tenantId,
    fullName: initialData?.fullName ?? '',
    preferredName: initialData?.preferredName ?? '',
    email: initialData?.email ?? '',
    documentId: initialData?.documentId ?? '',
    councilNumber: initialData?.councilNumber ?? '',
    councilState: initialData?.councilState ?? '',
    nationality: initialNationality,
    nationalityType: isBrazilian ? 'br' : 'foreign',
    foreignCountry: isBrazilian ? '' : initialNationality,
    gender: initialData?.gender ?? '',
    maritalStatus: initialData?.maritalStatus ?? '',
    birthDate: initialData?.birthDate ?? '',
    category: initialData?.category ?? '',
    status: initialData?.status ?? 'ativo',
    associationStatus: initialData?.associationStatus ?? 'pendente',
    membershipType: normalizedMembership,
    membershipStartedAt: initialData?.membershipStartedAt ?? getSaoPauloTodayISO(),
    membershipExpiresAt: initialData?.membershipExpiresAt ?? '',
    avatarUrl: initialData?.avatarUrl ?? '',
    avatarPreview: '',
    avatarFile: null,
    notes: initialData?.notes ?? '',
    role: initialData?.role ?? 'associado',
    userId: initialData?.userId ?? null,
    addresses: (initialData?.addresses ?? []).map((item) => ({ ...createAddressTemplate(), ...item })),
    contacts: (initialData?.contacts ?? []).map((item) => ({ ...createContactTemplate(), ...item })),
    education: (initialData?.education ?? []).map((item) => ({ ...createEducationTemplate(), ...item })),
    practices: (initialData?.practices ?? []).map((item) => {
      const base = createPracticeTemplate();
      const storedValue = item?.practice ?? '';
      if (storedValue && !practiceValueSet.has(storedValue)) {
        return { ...base, practice: 'other', customPractice: storedValue };
      }
      return { ...base, ...item };
    }),
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
    customPractice: '',
  };
}

function createSpecialtyTemplate() {
  return {
    id: createId(),
    area: '',
    specialty: '',
    rqeNumber: '',
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

function formatCPF(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatCouncil(value) {
  const digits = value.replace(/\D/g, '').slice(0, 6);
  if (!digits) return '';
  const first = digits.slice(0, 3);
  const second = digits.slice(3);
  if (digits.length <= 3) {
    return first;
  }
  if (digits.length < 6) {
    return `${first}.${second}`;
  }
  return `${first}.${second}-F`;
}

function formatCEP(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatPhoneNumber(value, type) {
  const isMobile = type === 'celular';
  const limit = isMobile ? 9 : 8;
  const digits = value.replace(/\D/g, '').slice(0, limit);
  const splitIndex = isMobile ? 5 : 4;
  if (digits.length <= splitIndex) return digits;
  return `${digits.slice(0, splitIndex)}-${digits.slice(splitIndex)}`;
}

function getSaoPauloTodayISO() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const saoPaulo = new Date(utc + -3 * 60 * 60 * 1000);
  return saoPaulo.toISOString().slice(0, 10);
}

function renderInstitutionSuggestions(
  index,
  institutionSuggestions,
  institutionSearchState,
  handleInstitutionSelect
) {
  const suggestions = institutionSuggestions[index] ?? [];
  if (institutionSearchState.loadingIndex === index) {
    return html`<div className="user-form__suggestions">Buscando no MEC...</div>`;
  }
  if (!suggestions.length) {
    if (institutionSearchState.error && institutionSearchState.errorIndex === index) {
      return html`<div className="user-form__suggestions user-form__suggestions--error">
        ${institutionSearchState.error}
      </div>`;
    }
    return null;
  }
  return html`
    <div className="user-form__suggestions">
      ${institutionSearchState.error && !institutionSearchState.errorIndex
        ? html`<div className="user-form__suggestions__notice">${institutionSearchState.error}</div>`
        : null}
      ${suggestions.map(
        (option) => html`
          <button type="button" key=${option.id} onClick=${() => handleInstitutionSelect(index, option)}>
            <span>${option.name}</span>
            ${option.uf ? html`<small>${option.uf}</small>` : null}
          </button>
        `
      )}
    </div>
  `;
}
