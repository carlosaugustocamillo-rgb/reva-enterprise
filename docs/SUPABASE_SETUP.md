# Supabase Setup

1. **Crie o projeto** no painel Supabase e escolha a região mais próxima (ex.: `us-east`). Nas opções de segurança, mantenha `Data API + Connection String` e use o schema `public`.
2. **Copie as chaves** em *Settings → API*: `Project URL`, `anon public` e `service_role`. Regere-as se tiver compartilhado antes. Nunca exponha a `service_role` no front-end.
3. **Provisionar tabelas**:
   - Abra *SQL Editor* e cole o conteúdo de [`supabase/schema.sql`](../supabase/schema.sql).
   - Execute para criar `module_catalog` e `tenants` com dados iniciais. Repita sempre que precisar sem duplicar (`on conflict do nothing`).
4. **Preencher chaves no front-end**:
   - Edite `index.html` e substitua a configuração:
     ```html
     <script>
       window.__SUPABASE_URL__ = 'https://SEU-PROJETO.supabase.co';
       window.__SUPABASE_ANON_KEY__ = 'SUA-ANON-KEY';
     </script>
     ```
   - Nunca coloque `service_role` nesse arquivo.
5. **Executar localmente**: `cd /Users/.../Multi-tentant ASSOBRAFIR && python3 -m http.server 4173` e abra `http://localhost:4173`.
6. **Próximos passos sugeridos**:
   - Criar tabelas para pagamentos, eventos etc. seguindo o mesmo padrão.
   - Ativar Row Level Security (`alter table tenants enable row level security;`) antes de expor autenticação real.
   - Substituir dados mock de insights/ações por tabelas Supabase quando necessário.
