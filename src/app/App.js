import { useMemo, useState, useCallback, useEffect } from '../lib/react.js';
import { html } from '../lib/html.js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';
import { tenants as seedTenants } from '../data/tenants.js';
import { moduleCatalog as seedModules } from '../data/modules.js';
import { seedProfiles } from '../data/profiles.js';
import { insightCards } from '../data/insights.js';
import { quickActions } from '../data/actions.js';
import { Header } from '../components/Header.js';
import { InsightPanel } from '../components/InsightPanel.js';
import { ModuleFilters } from '../components/ModuleFilters.js';
import { ModuleGrid } from '../components/ModuleGrid.js';
import { JourneyPanel } from '../components/JourneyPanel.js';
import { TenantSummary } from '../components/TenantSummary.js';
import { UserDirectoryPanel } from '../components/users/UserDirectoryPanel.js';
import { ModuleWorkspaceNav } from '../components/ModuleWorkspaceNav.js';
import { UserFormPanel } from '../components/users/UserFormPanel.js';
import { LoginPanel } from '../components/auth/LoginPanel.js';
import { getTenantModules, filterModules } from './moduleStatus.js';

const fallbackTenant = {
  id: 'placeholder',
  name: 'Tenant não configurado',
  plan: 'N/D',
  status: 'inativo',
  activeModules: [],
  comingSoon: [],
  priority: 'Adicione o primeiro tenant',
};

const initialTenantId = seedTenants[0]?.id ?? fallbackTenant.id;
const profileSelectFields = `
  id,
  tenant_id,
  user_id,
  full_name,
  preferred_name,
  email,
  document_id,
  council_number,
  council_state,
  nationality,
  gender,
  marital_status,
  birth_date,
  category,
  status,
  regional,
  membership_type,
  membership_started_at,
  membership_expires_at,
  association_status,
  avatar_url,
  notes,
  role,
  profile_addresses(*),
  profile_contacts(*),
  profile_education(*),
  profile_specialties(*),
  profile_roles(*),
  profile_titularities(*),
  profile_practices(*),
  profile_contributions(*),
  tenant:tenants(id, name, slug)
`;

export function App() {
  const [tenantCollection, setTenantCollection] = useState(seedTenants);
  const [moduleCatalog, setModuleCatalog] = useState(seedModules);
  const [profiles, setProfiles] = useState(() =>
    seedProfiles.map((profile) =>
      normalizeProfileRecord(
        {
          id: profile.id,
          tenant_id: profile.tenantId,
          full_name: profile.fullName,
          preferred_name: profile.preferredName,
          email: profile.email,
          document_id: profile.documentId,
          council_number: profile.councilNumber,
          council_state: profile.councilState,
          nationality: profile.nationality,
          gender: profile.gender,
          marital_status: profile.maritalStatus,
          birth_date: profile.birthDate,
          category: profile.category,
          status: profile.status,
          membership_type: profile.membershipType,
          profile_addresses: profile.addresses,
          profile_contacts: profile.contacts,
          profile_education: profile.education,
          profile_specialties: profile.specialties,
          profile_titularities: profile.titularities,
          profile_roles: profile.roles,
          profile_practices: profile.practices,
          profile_contributions: profile.contributions,
        },
        seedTenants
      )
    )
  );
  const [selectedTenantId, setSelectedTenantId] = useState(initialTenantId);
  const [moduleFilter, setModuleFilter] = useState('all');
  const [profileQuery, setProfileQuery] = useState('');
  const [profileStatusFilter, setProfileStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [workspaceView, setWorkspaceView] = useState('overview');
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileFormError, setProfileFormError] = useState(null);
  const [session, setSession] = useState(null);
  const [roleAssignments, setRoleAssignments] = useState([]);
  const [authError, setAuthError] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(isSupabaseConfigured);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsAuthLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data?.session ?? null);
      setIsAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthError(null);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    if (!session?.user) {
      setRoleAssignments([]);
      return;
    }

    let active = true;
    async function loadRoles() {
      const { data, error } = await supabase
        .from('user_roles')
        .select('id, role, tenant_id, tenants:tenants(id, name, slug)')
        .eq('user_id', session.user.id);
      if (!active) return;
      if (error) {
        console.error('Falha ao buscar roles', error);
        setAuthError('Não foi possível carregar permissões.');
        setRoleAssignments([]);
      } else {
        setRoleAssignments(data ?? []);
      }
    }
    loadRoles();

    return () => {
      active = false;
    };
  }, [session]);

  const accessibleTenantIds = useMemo(() => {
    if (!isSupabaseConfigured) {
      return tenantCollection.map((tenant) => tenant.id);
    }
    if (!session?.user) {
      return [];
    }
    const isSuperAdmin = roleAssignments.some((assignment) => assignment.role === 'super_admin');
    if (isSuperAdmin) {
      return tenantCollection.map((tenant) => tenant.id);
    }
    return roleAssignments.map((assignment) => assignment.tenant_id).filter(Boolean);
  }, [isSupabaseConfigured, session, roleAssignments, tenantCollection]);

  const isSuperAdmin = useMemo(
    () => roleAssignments.some((assignment) => assignment.role === 'super_admin'),
    [roleAssignments]
  );

  useEffect(() => {
    if (!isSupabaseConfigured || !accessibleTenantIds.length) return;
    if (!accessibleTenantIds.includes(selectedTenantId)) {
      setSelectedTenantId(accessibleTenantIds[0]);
    }
  }, [isSupabaseConfigured, accessibleTenantIds, selectedTenantId]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !session?.user) return;

    let isMounted = true;

    async function loadRemoteData() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const [tenantResponse, moduleResponse, profileResponse] = await Promise.all([
          supabase.from('tenants').select('*').order('name'),
          supabase.from('module_catalog').select('*').order('category'),
          supabase.from('profiles').select(profileSelectFields).order('full_name'),
        ]);

        if (tenantResponse.error) {
          throw tenantResponse.error;
        }
        if (moduleResponse.error) {
          throw moduleResponse.error;
        }

        if (profileResponse.error) {
          throw profileResponse.error;
        }

        if (!isMounted) return;

        setTenantCollection(tenantResponse.data ?? []);
        setModuleCatalog(moduleResponse.data ?? []);
        const normalizedProfiles = (profileResponse.data ?? []).map((profile) =>
          normalizeProfileRecord(profile, tenantResponse.data ?? tenantCollection)
        );
        setProfiles(normalizedProfiles);
      } catch (error) {
        console.error('Falha ao carregar dados Supabase', error);
        if (isMounted) {
          setLoadError('Não foi possível carregar dados em tempo real (usando mocks locais).');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadRemoteData();

    return () => {
      isMounted = false;
    };
  }, [session]);

  useEffect(() => {
    if (!tenantCollection.length) return;
    const exists = tenantCollection.some((tenant) => tenant.id === selectedTenantId);
    if (!exists) {
      setSelectedTenantId(tenantCollection[0]?.id ?? fallbackTenant.id);
    }
  }, [tenantCollection, selectedTenantId]);

  const tenantCollectionForUI = useMemo(() => {
    if (!isSupabaseConfigured) {
      return tenantCollection;
    }
    if (!accessibleTenantIds.length) {
      return tenantCollection;
    }
    const allowed = new Set(accessibleTenantIds);
    return tenantCollection.filter((tenant) => allowed.has(tenant.id));
  }, [tenantCollection, accessibleTenantIds, isSupabaseConfigured]);

  const tenant = useMemo(() => {
    const source = tenantCollectionForUI.length ? tenantCollectionForUI : tenantCollection;
    return source.find((item) => item.id === selectedTenantId) ?? source[0] ?? fallbackTenant;
  }, [tenantCollectionForUI, tenantCollection, selectedTenantId]);

  const tenantAdminTenantIds = useMemo(
    () =>
      roleAssignments
        .filter((assignment) => assignment.role === 'tenant_admin')
        .map((assignment) => assignment.tenant_id),
    [roleAssignments]
  );

  const currentUserId = session?.user?.id ?? null;
  const canManageSelectedTenant =
    !isSupabaseConfigured ||
    isSuperAdmin ||
    tenantAdminTenantIds.includes(tenant?.id);
  const canCreateProfile = canManageSelectedTenant;

  const canEditProfile = useCallback(
    (profile) => {
      if (!profile) return false;
      if (!isSupabaseConfigured) return true;
      if (isSuperAdmin) return true;
      if (tenantAdminTenantIds.includes(profile.tenantId)) return true;
      if (profile.userId && profile.userId === currentUserId) return true;
      return false;
    },
    [isSupabaseConfigured, isSuperAdmin, tenantAdminTenantIds, currentUserId]
  );

  const tenantIdsForForm = useMemo(() => {
    if (!isSupabaseConfigured) {
      return tenantCollectionForUI.map((item) => item.id);
    }
    if (isSuperAdmin) {
      return tenantCollectionForUI.map((item) => item.id);
    }
    return tenantAdminTenantIds;
  }, [isSupabaseConfigured, tenantCollectionForUI, isSuperAdmin, tenantAdminTenantIds]);

  const canEditTenantField =
    !isSupabaseConfigured || isSuperAdmin || tenantIdsForForm.length > 1;

  const tenantOptionsForForm = useMemo(() => {
    if (!tenantCollectionForUI.length) return [];
    if (!isSupabaseConfigured || isSuperAdmin) return tenantCollectionForUI;
    const allowed = new Set(tenantIdsForForm);
    return tenantCollectionForUI.filter((item) => allowed.has(item.id));
  }, [tenantCollectionForUI, tenantIdsForForm, isSupabaseConfigured, isSuperAdmin]);

  const lockedTenantId = canEditTenantField ? null : tenantOptionsForForm[0]?.id ?? tenant?.id;

  const tenantModules = useMemo(
    () => getTenantModules(tenant, moduleCatalog),
    [tenant, moduleCatalog]
  );

  const visibleModules = useMemo(
    () => filterModules(tenantModules, moduleFilter),
    [tenantModules, moduleFilter]
  );

  const activeTenantSlug = tenant?.slug ?? tenant?.id;

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = profileQuery.trim().toLowerCase();
    return profiles.filter((profile) => {
      const matchesTenant =
        tenant == null ||
        profile.tenantId === tenant.id ||
        (activeTenantSlug && profile.tenantSlug === activeTenantSlug);
      const matchesStatus = profileStatusFilter === 'all' || profile.status === profileStatusFilter;
      const matchesQuery =
        !normalizedQuery ||
        profile.fullName?.toLowerCase().includes(normalizedQuery) ||
        profile.email?.toLowerCase().includes(normalizedQuery);
      return matchesTenant && matchesStatus && matchesQuery;
    });
  }, [profiles, tenant, profileQuery, profileStatusFilter, activeTenantSlug]);

  const handleTenantChange = useCallback(
    (nextId) => {
      if (isSupabaseConfigured && accessibleTenantIds.length && !accessibleTenantIds.includes(nextId)) {
        return;
      }
      setSelectedTenantId(nextId);
    },
    [accessibleTenantIds, isSupabaseConfigured]
  );

  const handleFilterChange = useCallback((filter) => {
    setModuleFilter(filter);
  }, []);

  const handleProfileQueryChange = useCallback((value) => {
    setProfileQuery(value);
  }, []);

  const handleProfileStatusChange = useCallback((value) => {
    setProfileStatusFilter(value);
  }, []);

  const workspaceItems = [
    { id: 'overview', label: 'Visão geral', description: 'KPIs e módulos contratados' },
    { id: 'users', label: 'Usuários e Perfis', description: 'Base de pessoas por tenant' },
  ];

  const handleLogin = useCallback(
    async ({ email, password }) => {
      if (!supabase) return;
      setAuthError(null);
      setIsSigningIn(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Falha no login', error);
        setAuthError('Credenciais inválidas ou sem permissão.');
      }
      setIsSigningIn(false);
    },
    []
  );

  const handleLogout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setRoleAssignments([]);
  }, []);

  const handleOpenCreateProfile = useCallback(() => {
    if (!canCreateProfile) {
      setProfileFormError('Você não tem permissão para criar perfis neste tenant.');
      return;
    }
    setEditingProfile(null);
    setIsUserFormOpen(true);
    setProfileFormError(null);
  }, [canCreateProfile]);

  const handleOpenEditProfile = useCallback(
    (profileId) => {
      const target = profiles.find((profile) => profile.id === profileId);
      if (!target) return;
       if (!canEditProfile(target)) {
        setProfileFormError('Você não tem permissão para editar este perfil.');
        return;
      }
      setEditingProfile(target);
      setIsUserFormOpen(true);
      setProfileFormError(null);
    },
    [profiles, canEditProfile]
  );

  const handleCloseProfileForm = useCallback(() => {
    setEditingProfile(null);
    setIsUserFormOpen(false);
    setProfileFormError(null);
  }, []);

  const handleProfileSubmit = useCallback(
    async (formData) => {
      const {
        tenantOptions: _tenantOptions,
        avatarPreview: previewData,
        addresses = [],
        contacts = [],
        education = [],
        specialties = [],
        roles = [],
        titularities = [],
        practices = [],
        contributions = [],
        avatarFile = null,
        ...profileForm
      } = formData;

      const supabaseEnabled = isSupabaseConfigured && supabase;
      const enforcedTenantId = canEditTenantField
        ? profileForm.tenantId || tenant?.id || lockedTenantId
        : lockedTenantId ?? tenant?.id ?? profileForm.tenantId;

      if (!enforcedTenantId) {
        setProfileFormError('Selecione um tenant válido.');
        return;
      }

      if (editingProfile) {
        if (!canEditProfile(editingProfile)) {
          setProfileFormError('Você não tem permissão para editar este perfil.');
          return;
        }
      } else if (!canCreateProfile) {
        setProfileFormError('Você não tem permissão para criar perfis.');
        return;
      }

      profileForm.tenantId = enforcedTenantId;

      if (!supabaseEnabled && !profileForm.avatarUrl && previewData) {
        profileForm.avatarUrl = previewData;
      }

      setIsSavingProfile(true);
      setProfileFormError(null);

      try {
        let profileRecord;
        const payload = buildProfilePayload(profileForm);

        if (editingProfile) {
          if (supabaseEnabled) {
            const { error } = await supabase.from('profiles').update(payload).eq('id', editingProfile.id);
            if (error) throw error;
            await saveProfileRelations(editingProfile.id, {
              addresses,
              contacts,
              education,
              specialties,
              roles,
              titularities,
              practices,
              contributions,
            });
            profileRecord = await refetchProfile(editingProfile.id);
          } else {
            profileRecord = buildLocalProfileRecord(editingProfile.id, profileForm, {
              addresses,
              contacts,
              education,
              specialties,
              roles,
              titularities,
              practices,
              contributions,
            });
          }
        } else {
          if (supabaseEnabled) {
            const { data, error } = await supabase.from('profiles').insert(payload).select('id').single();
            if (error) throw error;
            await saveProfileRelations(data.id, {
              addresses,
              contacts,
              education,
              specialties,
              roles,
              titularities,
              practices,
              contributions,
            });
            profileRecord = await refetchProfile(data.id);
          } else {
            const localId = generateLocalId();
            profileRecord = buildLocalProfileRecord(localId, profileForm, {
              addresses,
              contacts,
              education,
              specialties,
              roles,
              titularities,
              practices,
              contributions,
            });
          }
        }

        if (supabaseEnabled && avatarFile) {
          const avatarUrl = await uploadAvatarToStorage(
            avatarFile,
            profileForm.tenantId,
            profileRecord.id,
            session?.user
          );
          const { error: avatarError } = await supabase
            .from('profiles')
            .update({ avatar_url: avatarUrl })
            .eq('id', profileRecord.id);
          if (avatarError) throw avatarError;
          profileRecord = await refetchProfile(profileRecord.id);
        }

        const normalized = normalizeProfileRecord(profileRecord, tenantCollection);
        setProfiles((prev) => {
          const exists = prev.some((profile) => profile.id === normalized.id);
          if (exists) {
            return prev.map((profile) => (profile.id === normalized.id ? normalized : profile));
          }
          return [...prev, normalized];
        });

        setIsUserFormOpen(false);
        setEditingProfile(null);
      } catch (error) {
        console.error('Falha ao salvar perfil', error);
        setProfileFormError('Não foi possível salvar o perfil. Tente novamente.');
      } finally {
        setIsSavingProfile(false);
      }
    },
    [
      canCreateProfile,
      canEditProfile,
      canEditTenantField,
      editingProfile,
      isSupabaseConfigured,
      lockedTenantId,
      session,
      tenant,
      tenantCollection,
    ]
  );

  async function refetchProfile(profileId) {
    const { data, error } = await supabase
      .from('profiles')
      .select(profileSelectFields)
      .eq('id', profileId)
      .single();
    if (error) throw error;
    return data;
  }

  if (isSupabaseConfigured) {
    if (isAuthLoading) {
      return html`<div className="app-shell"><p>Conferindo sessão...</p></div>`;
    }
    if (!session) {
      return html`
        <div className="app-shell app-shell--auth">
          <${LoginPanel} onSubmit=${handleLogin} isLoading=${isSigningIn} error=${authError} />
        </div>
      `;
    }
  }

  return html`
    <div className="app-shell">
      ${isSupabaseConfigured &&
      session &&
      html`
        <div className="auth-banner">
          <span>${session.user.email}</span>
          <button type="button" className="ghost-button" onClick=${handleLogout}>Sair</button>
        </div>
      `}
      <${Header}
        title="REVA Enterprise"
        subtitle="Controle unificado dos tenants, planos e módulos licenciáveis."
        tenants=${tenantCollectionForUI.length ? tenantCollectionForUI : tenantCollection}
        selectedTenantId=${tenant?.id}
        onTenantChange=${handleTenantChange}
        actions=${quickActions}
      />
      <${ModuleWorkspaceNav}
        items=${workspaceItems}
        activeId=${workspaceView}
        onChange=${(nextId) => setWorkspaceView(nextId)}
      />
      ${workspaceView === 'overview' &&
    html`
        <${InsightPanel} cards=${insightCards} />
        <div className="content-grid">
          <section className="module-panel card">
            <div className="panel-header">
              <div>
                <p className="panel-eyebrow">Mapeamento</p>
                <h2 className="panel-title">Módulos por tenant</h2>
              </div>
              <${ModuleFilters} activeFilter=${moduleFilter} onChange=${handleFilterChange} />
            </div>
            ${isLoading &&
      html`<p className="data-feedback">Sincronizando com Supabase...</p>`}
            ${loadError &&
      html`<p className="data-feedback data-feedback--error">${loadError}</p>`}
            <${ModuleGrid} modules=${visibleModules} />
          </section>
          <div className="side-column">
            <${TenantSummary} tenant=${tenant} modules=${tenantModules} />
            <${JourneyPanel} tenant=${tenant} />
          </div>
        </div>
      `}
      ${workspaceView === 'users' &&
    html`
        <${UserDirectoryPanel}
          profiles=${filteredProfiles}
          query=${profileQuery}
          statusFilter=${profileStatusFilter}
          onQueryChange=${handleProfileQueryChange}
          onStatusChange=${handleProfileStatusChange}
          isSyncing=${isLoading}
          errorMessage=${loadError}
          onCreate=${handleOpenCreateProfile}
          onEdit=${handleOpenEditProfile}
          canCreate=${canCreateProfile}
          canEditProfile=${canEditProfile}
        />
        ${isUserFormOpen &&
      html`<${UserFormPanel}
          tenants=${tenantOptionsForForm}
          initialData=${editingProfile ?? { tenantId: lockedTenantId ?? tenant?.id }}
          onSubmit=${handleProfileSubmit}
          onCancel=${handleCloseProfileForm}
          isSaving=${isSavingProfile}
          error=${profileFormError}
          lockedTenantId=${lockedTenantId}
          canEditTenant=${canEditTenantField}
          canEditRole=${isSuperAdmin}
        />`}
      `}
    </div>
  `;
}

function normalizeProfileRecord(record, tenants = []) {
  if (!record) return null;
  const tenantMeta =
    record.tenant ??
    tenants.find((tenant) => tenant.id === record.tenant_id || tenant.slug === record.tenant_id);

  const addressesSource = record.profile_addresses ?? record.addresses ?? [];
  const contactsSource = record.profile_contacts ?? record.contacts ?? [];
  const educationSource = record.profile_education ?? record.education ?? [];
  const specialtiesSource = record.profile_specialties ?? record.specialties ?? [];
  const rolesSource = record.profile_roles ?? record.roles ?? [];
  const titularitiesSource = record.profile_titularities ?? record.titularities ?? [];
  const practicesSource = record.profile_practices ?? record.practices ?? [];
  const contributionsSource = record.profile_contributions ?? record.contributions ?? [];

  return {
    id: record.id,
    tenantId: record.tenant_id ?? record.tenantId,
    tenantSlug: tenantMeta?.slug ?? record.tenantSlug ?? null,
    tenantName: tenantMeta?.name ?? record.tenantName ?? '',
    fullName: record.full_name ?? record.fullName ?? '',
    preferredName: record.preferred_name ?? record.preferredName ?? '',
    email: record.email,
    documentId: record.document_id ?? record.documentId ?? '',
    status: record.status ?? 'ativo',
    category: record.category ?? '',
    membershipType: record.membership_type ?? record.membershipType ?? 'professional',
    councilNumber: record.council_number ?? record.councilNumber ?? '',
    councilState: record.council_state ?? record.councilState ?? '',
    nationality: record.nationality ?? '',
    gender: record.gender ?? '',
    maritalStatus: record.marital_status ?? '',
    birthDate: (record.birth_date ?? record.birthDate)?.slice?.(0, 10) ?? '',
    membershipStartedAt: (record.membership_started_at ?? record.membershipStartedAt)?.slice?.(0, 10) ?? '',
    membershipExpiresAt: (record.membership_expires_at ?? record.membershipExpiresAt)?.slice?.(0, 10) ?? '',
    associationStatus: record.association_status ?? record.associationStatus ?? 'pending',
    avatarUrl: record.avatar_url ?? record.avatarUrl ?? '',
    notes: record.notes ?? '',
    userId: record.user_id ?? record.userId ?? null,
    role: record.role ?? record.profileRole ?? 'associado',
    addresses: addressesSource.map((address) => ({
      id: address.id ?? generateLocalId(),
      type: address.type ?? '',
      streetType: address.street_type ?? address.streetType ?? '',
      street: address.street ?? '',
      number: address.number ?? '',
      complement: address.complement ?? '',
      district: address.district ?? '',
      city: address.city ?? '',
      state: address.state ?? '',
      country: address.country ?? 'Brasil',
      postalCode: address.postal_code ?? '',
      isPrimary: Boolean(address.is_primary ?? address.isPrimary),
      isCorrespondence: Boolean(address.is_correspondence ?? address.isCorrespondence),
    })),
    contacts: contactsSource.map((contact) => ({
      id: contact.id ?? generateLocalId(),
      type: contact.type ?? 'celular',
      countryCode: contact.country_code ?? contact.countryCode ?? '+55',
      areaCode: contact.area_code ?? contact.areaCode ?? '',
      number: contact.number ?? '',
      label: contact.label ?? '',
      isPrimary: Boolean(contact.is_primary ?? contact.isPrimary),
    })),
    education: educationSource.map((item) => ({
      id: item.id ?? generateLocalId(),
      level: item.level ?? '',
      institution: item.institution ?? '',
      course: item.course ?? '',
      startedAt: (item.started_at ?? item.startedAt)?.slice?.(0, 10) ?? '',
      finishedAt: (item.finished_at ?? item.finishedAt)?.slice?.(0, 10) ?? '',
      hours: item.hours ?? '',
      notes: item.notes ?? '',
    })),
    specialties: specialtiesSource.map((item) => ({
      id: item.id ?? generateLocalId(),
      area: item.area ?? '',
      specialty: item.specialty ?? '',
      subSpecialty: item.sub_specialty ?? item.subSpecialty ?? '',
      notes: item.notes ?? '',
    })),
    roles: rolesSource.map((role) => ({
      id: role.id ?? generateLocalId(),
      roleName: role.role_name ?? role.roleName ?? '',
      startedAt: (role.started_at ?? role.startedAt)?.slice?.(0, 10) ?? '',
      finishedAt: (role.finished_at ?? role.finishedAt)?.slice?.(0, 10) ?? '',
    })),
    titularities: titularitiesSource.map((item) => ({
      id: item.id ?? generateLocalId(),
      titleName: item.title_name ?? item.titleName ?? '',
    })),
    practices: practicesSource.map((item) => ({
      id: item.id ?? generateLocalId(),
      practice: item.practice ?? '',
    })),
    contributions: contributionsSource.map((item) => ({
      id: item.id ?? generateLocalId(),
      referencePeriod: item.reference_period ?? item.referencePeriod ?? '',
      dueDate: (item.due_date ?? item.dueDate)?.slice?.(0, 10) ?? '',
      amountDue: item.amount_due ?? item.amountDue ?? '',
      amountPaid: item.amount_paid ?? item.amountPaid ?? '',
      status: item.status ?? 'pending',
    })),
  };
}

function resolveTenantMeta(tenants, identifier) {
  if (!identifier) return null;
  return tenants.find((tenant) => tenant.id === identifier || tenant.slug === identifier) ?? null;
}

function generateLocalId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `local-${Date.now()}`;
}

function buildProfilePayload(profileForm) {
  return {
    tenant_id: profileForm.tenantId,
    full_name: profileForm.fullName,
    preferred_name: profileForm.preferredName,
    email: profileForm.email,
    document_id: profileForm.documentId,
    council_number: profileForm.councilNumber,
    council_state: profileForm.councilState,
    nationality: profileForm.nationality,
    gender: profileForm.gender,
    marital_status: profileForm.maritalStatus,
    birth_date: profileForm.birthDate || null,
    category: profileForm.category,
    status: profileForm.status,
    membership_type: profileForm.membershipType,
    membership_started_at: profileForm.membershipStartedAt || null,
    membership_expires_at: profileForm.membershipExpiresAt || null,
    association_status: profileForm.associationStatus,
    avatar_url: profileForm.avatarUrl,
    notes: profileForm.notes,
    role: profileForm.role ?? 'associado',
  };
}

function buildLocalProfileRecord(id, profileForm, relatedLists) {
  return {
    id,
    ...buildProfilePayload(profileForm),
    profile_addresses: (relatedLists.addresses ?? []).map((item) => mapAddressPayload(item, id)),
    profile_contacts: (relatedLists.contacts ?? []).map((item) => mapContactPayload(item, id)),
    profile_education: (relatedLists.education ?? []).map((item) => mapEducationPayload(item, id)),
    profile_specialties: (relatedLists.specialties ?? []).map((item) => mapSpecialtyPayload(item, id)),
    profile_roles: (relatedLists.roles ?? []).map((item) => mapRolePayload(item, id)),
    profile_titularities: (relatedLists.titularities ?? []).map((item) => mapTitlePayload(item, id)),
    profile_practices: (relatedLists.practices ?? []).map((item) => mapPracticePayload(item, id)),
    profile_contributions: (relatedLists.contributions ?? []).map((item) => mapContributionPayload(item, id)),
  };
}

async function saveProfileRelations(profileId, lists) {
  if (!supabase) return;
  await syncChildTable('profile_addresses', profileId, lists.addresses ?? [], mapAddressPayload);
  await syncChildTable('profile_contacts', profileId, lists.contacts ?? [], mapContactPayload);
  await syncChildTable('profile_education', profileId, lists.education ?? [], mapEducationPayload);
  await syncChildTable('profile_specialties', profileId, lists.specialties ?? [], mapSpecialtyPayload);
  await syncChildTable('profile_roles', profileId, lists.roles ?? [], mapRolePayload);
  await syncChildTable('profile_titularities', profileId, lists.titularities ?? [], mapTitlePayload);
  await syncChildTable('profile_practices', profileId, lists.practices ?? [], mapPracticePayload);
  await syncChildTable('profile_contributions', profileId, lists.contributions ?? [], mapContributionPayload);
}

async function syncChildTable(table, profileId, items, mapper) {
  const { error: deleteError } = await supabase.from(table).delete().eq('profile_id', profileId);
  if (deleteError) throw deleteError;
  if (!items.length) return;
  const payload = items.map((item) => mapper(item, profileId));
  const { error: insertError } = await supabase.from(table).insert(payload);
  if (insertError) throw insertError;
}

const AVATAR_BUCKET = 'profile-photos';

async function uploadAvatarToStorage(file, tenantId, profileId, currentUser) {
  if (!supabase) throw new Error('Supabase não configurado para upload de fotos.');
  if (!currentUser?.id) throw new Error('Faça login para enviar imagens.');

  const extension = extractFileExtension(file.name) || 'jpg';
  const tenantFolder = tenantId ?? 'global';
  const fileName = `${tenantFolder}/${profileId}/${generateFileName()}.${extension}`;

  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(fileName, file, {
      upsert: true,
      cacheControl: '3600',
    });

  if (error) {
    console.error('Erro ao fazer upload:', error);
    throw error;
  }

  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
function extractFileExtension(name = '') {
  const parts = name.split('.');
  if (parts.length <= 1) return '';
  return parts.pop().toLowerCase();
}

function generateFileName() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `file-${Date.now()}`;
}

function mapAddressPayload(address, profileId) {
  return {
    profile_id: profileId,
    type: address.type,
    street_type: address.streetType,
    street: address.street,
    number: address.number,
    complement: address.complement,
    district: address.district,
    city: address.city,
    state: address.state,
    country: address.country,
    postal_code: address.postalCode,
    is_primary: address.isPrimary ?? false,
    is_correspondence: address.isCorrespondence ?? false,
  };
}

function mapContactPayload(contact, profileId) {
  return {
    profile_id: profileId,
    type: contact.type,
    country_code: contact.countryCode,
    area_code: contact.areaCode,
    number: contact.number,
    label: contact.label,
    is_primary: contact.isPrimary ?? false,
  };
}

function mapEducationPayload(item, profileId) {
  return {
    profile_id: profileId,
    level: item.level,
    institution: item.institution,
    course: item.course,
    started_at: item.startedAt || null,
    finished_at: item.finishedAt || null,
    hours: item.hours ? Number(item.hours) : null,
    notes: item.notes,
  };
}

function mapSpecialtyPayload(item, profileId) {
  return {
    profile_id: profileId,
    area: item.area,
    specialty: item.specialty,
    sub_specialty: item.subSpecialty,
    notes: item.notes,
  };
}

function mapRolePayload(item, profileId) {
  return {
    profile_id: profileId,
    role_name: item.roleName,
    started_at: item.startedAt || null,
    finished_at: item.finishedAt || null,
  };
}

function mapTitlePayload(item, profileId) {
  return {
    profile_id: profileId,
    title_name: item.titleName,
  };
}

function mapPracticePayload(item, profileId) {
  return {
    profile_id: profileId,
    practice: item.practice,
  };
}

function mapContributionPayload(item, profileId) {
  return {
    profile_id: profileId,
    reference_period: item.referencePeriod,
    due_date: item.dueDate || null,
    amount_due: item.amountDue ? Number(item.amountDue) : null,
    amount_paid: item.amountPaid ? Number(item.amountPaid) : null,
    status: item.status,
  };
}
