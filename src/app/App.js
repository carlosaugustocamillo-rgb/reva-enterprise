import { html } from '../lib/html.js';
import { useState, useEffect } from '../lib/react.js';
import { isSupabaseConfigured } from '../lib/supabaseClient.js';

// Páginas
import { LandingPage } from '../pages/LandingPage.js';
import { LoginPanel } from '../components/auth/LoginPanel.js';
import { NotFoundPage } from '../pages/NotFoundPage.js';
import { UnauthorizedPage } from '../pages/UnauthorizedPage.js';

// Hooks
import { useAuth } from '../hooks/useAuth.js';

// Utilitários
import {
  getCurrentPath,
  checkRoutePermission,
  getRedirectPathAfterLogin,
  navigateTo,
} from '../utils/routing.js';

// Componentes do dashboard (importar conforme necessário)
// import { SuperAdminDashboard } from '../pages/dashboards/SuperAdminDashboard.js';
// import { TenantAdminDashboard } from '../pages/dashboards/TenantAdminDashboard.js';
// import { AssociadoDashboard } from '../pages/dashboards/AssociadoDashboard.js';

// Componentes existentes
import { Header } from '../components/Header.js';
import { InsightPanel } from '../components/InsightPanel.js';
import { ModuleFilters } from '../components/ModuleFilters.js';
import { ModuleGrid } from '../components/ModuleGrid.js';
import { JourneyPanel } from '../components/JourneyPanel.js';
import { TenantSummary } from '../components/TenantSummary.js';
import { UserDirectoryPanel } from '../components/users/UserDirectoryPanel.js';
import { ModuleWorkspaceNav } from '../components/ModuleWorkspaceNav.js';
import { UserFormPanel } from '../components/users/UserFormPanel.js';
import { TenantModuleManager } from '../components/TenantModuleManager.js';
import { TenantConsoleView } from '../components/TenantConsoleView.js';

// Data
import { tenants as seedTenants } from '../data/tenants.js';
import { moduleCatalog as seedModules } from '../data/modules.js';
import { seedProfiles } from '../data/profiles.js';
import { insightCards } from '../data/insights.js';
import { quickActions } from '../data/actions.js';
import { getTenantModules, filterModules } from './moduleStatus.js';

// Constantes
const fallbackTenant = {
  id: 'placeholder',
  name: 'Tenant não configurado',
  plan: 'N/D',
  status: 'inativo',
  activeModules: [],
  comingSoon: [],
  priority: 'Adicione o primeiro tenant',
};

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

/**
 * Componente principal da aplicação
 * Gerencia roteamento e renderização condicional baseada em autenticação
 */
export function App() {
  // Estado de autenticação
  const authState = useAuth();
  const { session, roleAssignments, isAuthLoading, isSuperAdmin, isTenantAdmin, isAssociado } =
    authState;

  // Estado de autenticação (login)
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Estado de dados
  const [tenantCollection, setTenantCollection] = useState(seedTenants);
  const [moduleCatalog, setModuleCatalog] = useState(seedModules);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Estado de UI
  const [workspaceView, setWorkspaceView] = useState('overview');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [profileQuery, setProfileQuery] = useState('');
  const [profileStatusFilter, setProfileStatusFilter] = useState('all');
  const [selectedTenantId, setSelectedTenantId] = useState(seedTenants[0]?.id ?? fallbackTenant.id);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [profileFormError, setProfileFormError] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Obter caminho atual
  const currentPath = getCurrentPath();

  // Verificar permissão de rota
  const routePermission = checkRoutePermission(currentPath, authState);

  // Se não tem permissão, redirecionar
  useEffect(() => {
    if (!routePermission.allowed && routePermission.redirectTo) {
      navigateTo(routePermission.redirectTo);
    }
  }, [routePermission.allowed, routePermission.redirectTo]);

  // Handlers de autenticação
  async function handleLogin(email, password) {
    setIsSigningIn(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      // Redirecionar após login bem-sucedido
      setTimeout(() => {
        const redirectPath = getRedirectPathAfterLogin(roleAssignments);
        navigateTo(redirectPath);
      }, 500);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigateTo('/');
  }

  // ============================================================================
  // RENDERIZAÇÃO CONDICIONAL POR ROTA
  // ============================================================================

  // Carregando autenticação
  if (isAuthLoading) {
    return html`
      <div className="app-shell app-shell--loading">
        <p>Carregando...</p>
      </div>
    `;
  }

  // Página inicial (pública)
  if (currentPath === '/') {
    if (session) {
      // Se já está autenticado, redirecionar para dashboard
      const redirectPath = getRedirectPathAfterLogin(roleAssignments);
      navigateTo(redirectPath);
      return null;
    }
    return html`<${LandingPage} />`;
  }

  // Página de login (pública)
  if (currentPath === '/login') {
    if (session) {
      // Se já está autenticado, redirecionar para dashboard
      const redirectPath = getRedirectPathAfterLogin(roleAssignments);
      navigateTo(redirectPath);
      return null;
    }
    return html`
      <div className="app-shell app-shell--auth">
        <${LoginPanel}
          onSubmit=${handleLogin}
          isLoading=${isSigningIn}
          error=${authError}
        />
      </div>
    `;
  }

  // Página 404
  if (currentPath === '/404') {
    return html`<${NotFoundPage} />`;
  }

  // Página de acesso negado
  if (currentPath === '/unauthorized') {
    return html`<${UnauthorizedPage} />`;
  }

  // Dashboard Super Admin
  if (currentPath === '/dashboard/super-admin' && isSuperAdmin) {
    return html`
      <div className="app-shell">
        <div className="auth-banner">
          <span>${session.user.email}</span>
          <button type="button" className="ghost-button" onClick=${handleLogout}>Sair</button>
        </div>
        <${Header}
          title="REVA Enterprise - Super Admin"
          subtitle="Controle unificado dos tenants, planos e módulos licenciáveis."
          tenants=${tenantCollection}
          selectedTenantId=${selectedTenantId}
          onTenantChange=${setSelectedTenantId}
          actions=${quickActions}
        />
        <${ModuleWorkspaceNav}
          items=${[
            { id: 'overview', label: 'Visão geral', description: 'KPIs e módulos contratados' },
            { id: 'users', label: 'Usuários e Perfis', description: 'Base de pessoas por tenant' },
          ]}
          activeId=${workspaceView}
          onChange=${(nextId) => setWorkspaceView(nextId)}
        />
        ${workspaceView === 'overview'
          ? html`
              <${InsightPanel} cards=${insightCards} />
              <div className="content-grid">
                <section className="module-panel card">
                  <div className="panel-header">
                    <div>
                      <p className="panel-eyebrow">Mapeamento</p>
                      <h2 className="panel-title">Módulos por tenant</h2>
                    </div>
                    <${ModuleFilters} activeFilter=${moduleFilter} onChange=${(f) => setModuleFilter(f)} />
                  </div>
                  ${isLoading ? html`<p className="data-feedback">Sincronizando...</p>` : ''}
                  ${loadError ? html`<p className="data-feedback data-feedback--error">${loadError}</p>` : ''}
                  <${ModuleGrid} modules=${moduleCatalog} />
                </section>
                <div className="side-column">
                  <${TenantSummary} tenant=${tenantCollection.find((t) => t.id === selectedTenantId)} modules=${getTenantModules(selectedTenantId, moduleCatalog)} />
                  <${JourneyPanel} tenant=${tenantCollection.find((t) => t.id === selectedTenantId)} />
                </div>
              </div>
            `
          : html`
              <${UserDirectoryPanel}
                profiles=${profiles}
                query=${profileQuery}
                statusFilter=${profileStatusFilter}
                onQueryChange=${(q) => setProfileQuery(q)}
                onStatusChange=${(s) => setProfileStatusFilter(s)}
                isSyncing=${isLoading}
                errorMessage=${loadError}
                onCreate=${() => setIsUserFormOpen(true)}
                onEdit=${(profile) => {
                  setEditingProfile(profile);
                  setIsUserFormOpen(true);
                }}
                canCreate=${true}
                canEditProfile=${() => true}
              />
              ${isUserFormOpen
                ? html`<${UserFormPanel}
                    tenants=${tenantCollection}
                    initialData=${editingProfile ?? { tenantId: selectedTenantId }}
                    onSubmit=${() => {
                      setIsUserFormOpen(false);
                      setEditingProfile(null);
                    }}
                    onCancel=${() => {
                      setIsUserFormOpen(false);
                      setEditingProfile(null);
                    }}
                    isSaving=${isSavingProfile}
                    error=${profileFormError}
                    canEditTenant=${true}
                    canEditRole=${true}
                  />`
                : ''}
            `}
      </div>
    `;
  }

  // Dashboard Tenant Admin
  if (currentPath.startsWith('/dashboard/tenant/') && isTenantAdmin) {
    const tenantId = currentPath.split('/')[3];
    const tenant = tenantCollection.find((t) => t.id === tenantId);

    if (!tenant) {
      return html`<${NotFoundPage} />`;
    }

    return html`
      <div className="app-shell">
        <div className="auth-banner">
          <span>${session.user.email}</span>
          <button type="button" className="ghost-button" onClick=${handleLogout}>Sair</button>
        </div>
        <${Header}
          title="REVA Enterprise - Tenant Admin"
          subtitle="${tenant.name}"
          tenants=${[tenant]}
          selectedTenantId=${tenant.id}
          onTenantChange=${() => {}}
          actions=${quickActions}
        />
        <${ModuleWorkspaceNav}
          items=${[
            { id: 'overview', label: 'Visão geral', description: 'KPIs e módulos' },
            { id: 'users', label: 'Usuários', description: 'Gerenciar usuários' },
          ]}
          activeId=${workspaceView}
          onChange=${(nextId) => setWorkspaceView(nextId)}
        />
        ${workspaceView === 'overview'
          ? html`
              <${InsightPanel} cards=${insightCards} />
              <div className="content-grid">
                <section className="module-panel card">
                  <div className="panel-header">
                    <div>
                      <p className="panel-eyebrow">Módulos</p>
                      <h2 className="panel-title">Módulos contratados</h2>
                    </div>
                  </div>
                  <${ModuleGrid} modules=${getTenantModules(tenantId, moduleCatalog)} />
                </section>
                <div className="side-column">
                  <${TenantSummary} tenant=${tenant} modules=${getTenantModules(tenantId, moduleCatalog)} />
                </div>
              </div>
            `
          : html`
              <${UserDirectoryPanel}
                profiles=${profiles.filter((p) => p.tenant_id === tenantId)}
                query=${profileQuery}
                statusFilter=${profileStatusFilter}
                onQueryChange=${(q) => setProfileQuery(q)}
                onStatusChange=${(s) => setProfileStatusFilter(s)}
                isSyncing=${isLoading}
                errorMessage=${loadError}
                onCreate=${() => setIsUserFormOpen(true)}
                onEdit=${(profile) => {
                  setEditingProfile(profile);
                  setIsUserFormOpen(true);
                }}
                canCreate=${true}
                canEditProfile=${() => true}
              />
              ${isUserFormOpen
                ? html`<${UserFormPanel}
                    tenants=${[tenant]}
                    initialData=${editingProfile ?? { tenantId: tenant.id }}
                    onSubmit=${() => {
                      setIsUserFormOpen(false);
                      setEditingProfile(null);
                    }}
                    onCancel=${() => {
                      setIsUserFormOpen(false);
                      setEditingProfile(null);
                    }}
                    isSaving=${isSavingProfile}
                    error=${profileFormError}
                    canEditTenant=${false}
                    canEditRole=${false}
                  />`
                : ''}
            `}
      </div>
    `;
  }

  // Dashboard Associado (placeholder - será implementado na Fase 2)
  if (currentPath.startsWith('/dashboard/associado/') && isAssociado) {
    return html`
      <div className="app-shell">
        <div className="auth-banner">
          <span>${session.user.email}</span>
          <button type="button" className="ghost-button" onClick=${handleLogout}>Sair</button>
        </div>
        <div className="content-placeholder">
          <h1>Dashboard do Associado</h1>
          <p>Este dashboard será implementado na Fase 2.</p>
          <button type="button" className="ghost-button" onClick=${handleLogout}>Sair</button>
        </div>
      </div>
    `;
  }

  // Rota não encontrada
  return html`<${NotFoundPage} />`;
}
