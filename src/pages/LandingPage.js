import { html } from '../lib/html.js';

export function LandingPage() {
  return html`
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-header__content">
          <h1 className="landing-title">REVA Enterprise</h1>
          <p className="landing-subtitle">Plataforma de Gestão Multi-Tenant</p>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero__content">
            <h2>Bem-vindo ao REVA Enterprise</h2>
            <p>
              A solução completa para gerenciar múltiplos tenants, módulos e usuários em uma
              única plataforma integrada.
            </p>
            <a href="/login" className="landing-cta">
              Entrar no Sistema
            </a>
          </div>
        </section>

        <section className="landing-features">
          <h2 className="landing-section-title">Recursos Principais</h2>
          <div className="landing-features__grid">
            <div className="landing-feature-card">
              <h3>Gerenciamento de Tenants</h3>
              <p>Crie e gerencie múltiplos tenants com configurações independentes.</p>
            </div>
            <div className="landing-feature-card">
              <h3>Controle de Módulos</h3>
              <p>Atribua módulos específicos a cada tenant conforme necessário.</p>
            </div>
            <div className="landing-feature-card">
              <h3>Gestão de Usuários</h3>
              <p>Crie e gerencie usuários com diferentes níveis de acesso.</p>
            </div>
            <div className="landing-feature-card">
              <h3>Segurança em Camadas</h3>
              <p>Proteção de dados com autenticação e autorização robustas.</p>
            </div>
            <div className="landing-feature-card">
              <h3>Relatórios e Análises</h3>
              <p>Acompanhe o uso e desempenho em tempo real.</p>
            </div>
            <div className="landing-feature-card">
              <h3>Suporte Multi-Tenant</h3>
              <p>Arquitetura escalável para crescer com seu negócio.</p>
            </div>
          </div>
        </section>

        <section className="landing-roles">
          <h2 className="landing-section-title">Perfis de Acesso</h2>
          <div className="landing-roles__grid">
            <div className="landing-role-card">
              <h3>Super Admin</h3>
              <p>Acesso total ao sistema. Gerencia tenants, módulos e todas as configurações.</p>
            </div>
            <div className="landing-role-card">
              <h3>Tenant Admin</h3>
              <p>Gerencia usuários e módulos do seu tenant. Acesso completo aos dados.</p>
            </div>
            <div className="landing-role-card">
              <h3>Associado</h3>
              <p>Acesso limitado à sua área privativa. Pode gerenciar seu perfil e dados.</p>
            </div>
          </div>
        </section>

        <section className="landing-cta-section">
          <h2>Pronto para começar?</h2>
          <p>Faça login para acessar o sistema.</p>
          <a href="/login" className="landing-cta landing-cta--large">
            Entrar Agora
          </a>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 REVA Enterprise. Todos os direitos reservados.</p>
      </footer>
    </div>
  `;
}
