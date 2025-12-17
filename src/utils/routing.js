/**
 * Utilitários de roteamento
 * Funções para determinar redirecionamentos e verificar permissões
 */

/**
 * Determina o caminho de redirecionamento após login
 * baseado nos roles do usuário
 *
 * @param {Array} roleAssignments - Array de roles do usuário
 * @returns {string} Caminho para redirecionar
 */
export function getRedirectPathAfterLogin(roleAssignments) {
  if (!roleAssignments || !roleAssignments.length) {
    return '/login';
  }

  const isSuperAdmin = roleAssignments.some((r) => r.role === 'super_admin');
  const isTenantAdmin = roleAssignments.some((r) => r.role === 'tenant_admin');
  const isAssociado = roleAssignments.some((r) => r.role === 'associado');

  if (isSuperAdmin) {
    return '/dashboard/super-admin';
  }

  if (isTenantAdmin) {
    const tenantId = roleAssignments.find((r) => r.role === 'tenant_admin')?.tenant_id;
    if (tenantId) {
      return `/dashboard/tenant/${tenantId}`;
    }
  }

  if (isAssociado) {
    const tenantId = roleAssignments.find((r) => r.role === 'associado')?.tenant_id;
    if (tenantId) {
      return `/dashboard/associado/${tenantId}`;
    }
  }

  return '/login';
}

/**
 * Verifica se o usuário tem permissão para acessar uma rota
 *
 * @param {string} path - Caminho da rota
 * @param {Object} authState - Estado de autenticação (session, roleAssignments, etc)
 * @returns {Object} { allowed: boolean, redirectTo: string|null }
 */
export function checkRoutePermission(path, authState) {
  const { session, isSuperAdmin, isTenantAdmin, isAssociado, primaryTenantId } = authState;

  // Rotas públicas
  if (path === '/' || path === '/login') {
    return { allowed: true, redirectTo: null };
  }

  // Requer autenticação
  if (!session) {
    return { allowed: false, redirectTo: '/login' };
  }

  // Dashboard Super Admin
  if (path === '/dashboard/super-admin') {
    if (!isSuperAdmin) {
      return { allowed: false, redirectTo: '/unauthorized' };
    }
    return { allowed: true, redirectTo: null };
  }

  // Dashboard Tenant Admin
  if (path.startsWith('/dashboard/tenant/')) {
    if (!isTenantAdmin) {
      return { allowed: false, redirectTo: '/unauthorized' };
    }
    const tenantId = path.split('/')[3];
    const hasAccessToTenant = authState.roleAssignments.some(
      (r) => r.role === 'tenant_admin' && r.tenant_id === tenantId
    );
    if (!hasAccessToTenant) {
      return { allowed: false, redirectTo: '/unauthorized' };
    }
    return { allowed: true, redirectTo: null };
  }

  // Dashboard Associado
  if (path.startsWith('/dashboard/associado/')) {
    if (!isAssociado) {
      return { allowed: false, redirectTo: '/unauthorized' };
    }
    const tenantId = path.split('/')[3];
    const hasAccessToTenant = authState.roleAssignments.some(
      (r) => r.role === 'associado' && r.tenant_id === tenantId
    );
    if (!hasAccessToTenant) {
      return { allowed: false, redirectTo: '/unauthorized' };
    }
    return { allowed: true, redirectTo: null };
  }

  // Rota não encontrada
  return { allowed: false, redirectTo: '/404' };
}

/**
 * Obtém o caminho atual da URL
 *
 * @returns {string} Caminho atual
 */
export function getCurrentPath() {
  if (typeof window === 'undefined') {
    return '/';
  }
  return window.location.pathname || '/';
}

/**
 * Navega para um caminho
 *
 * @param {string} path - Caminho para navegar
 */
export function navigateTo(path) {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
}

/**
 * Verifica se um caminho é uma rota pública
 *
 * @param {string} path - Caminho a verificar
 * @returns {boolean}
 */
export function isPublicRoute(path) {
  const publicRoutes = ['/', '/login', '/404', '/unauthorized'];
  return publicRoutes.includes(path);
}

/**
 * Verifica se um caminho é uma rota protegida
 *
 * @param {string} path - Caminho a verificar
 * @returns {boolean}
 */
export function isProtectedRoute(path) {
  return path.startsWith('/dashboard/');
}
