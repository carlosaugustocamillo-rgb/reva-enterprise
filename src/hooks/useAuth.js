import { useState, useEffect } from '../lib/react.js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

/**
 * Hook de autenticação
 * Gerencia sessão do usuário e carregamento de roles
 *
 * @returns {Object} Objeto com session, roleAssignments, isLoading e funções auxiliares
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [roleAssignments, setRoleAssignments] = useState([]);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Carregar sessão inicial
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsAuthLoading(false);
      return;
    }

    // Obter sessão atual
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setIsAuthLoading(false);
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        setRoleAssignments([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carregar roles quando sessão mudar
  useEffect(() => {
    if (!isSupabaseConfigured || !session?.user) {
      setRoleAssignments([]);
      return;
    }

    loadRoles();
  }, [session?.user?.id]);

  async function loadRoles() {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('id, role, tenant_id, tenants:tenants(id, name, slug)')
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Erro ao carregar roles:', error);
        setRoleAssignments([]);
        return;
      }

      setRoleAssignments(data ?? []);
    } catch (error) {
      console.error('Erro ao carregar roles:', error);
      setRoleAssignments([]);
    }
  }

  // Funções auxiliares
  const isSuperAdmin = roleAssignments.some((r) => r.role === 'super_admin');
  const isTenantAdmin = roleAssignments.some((r) => r.role === 'tenant_admin');
  const isAssociado = roleAssignments.some((r) => r.role === 'associado');

  const primaryTenantId = roleAssignments[0]?.tenant_id ?? null;

  return {
    session,
    roleAssignments,
    isAuthLoading,
    isSuperAdmin,
    isTenantAdmin,
    isAssociado,
    primaryTenantId,
    isAuthenticated: !!session,
  };
}
