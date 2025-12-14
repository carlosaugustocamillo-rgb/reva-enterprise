# REVA Enterprise

Plataforma multi-tenant para associações científicas com módulos licenciáveis (usuários, financeiro, eventos, comunicação etc.). O objetivo do repositório é permitir que novos tenants sejam provisionados rapidamente com Supabase como backend e uma interface React modular.

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+
- Projeto Supabase configurado (seguir `docs/SUPABASE_SETUP.md`)
- Chaves Publishable/Secret (nova geração do Supabase)

## Instalação

```bash
git clone https://github.com/carlosaugustocamillo-rgb/reva-enterprise.git
cd reva-enterprise
npm install
```

## Configuração de ambiente

1. Crie o arquivo `.env` na raiz:

   ```env
   VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
   VITE_SUPABASE_ANON_KEY=sb-publishable-...
   ```

   > Use apenas a publishable key no frontend. A secret key deve ser usada apenas em ambientes de backend (Edge Functions, automações etc.).

2. Rode o script SQL em `supabase/schema.sql` no editor SQL do Supabase para criar as tabelas e dados de exemplo.

   - O arquivo é idempotente (`CREATE TABLE IF NOT EXISTS` + `ALTER ... ADD COLUMN IF NOT EXISTS`), então pode ser executado sempre que precisar atualizar a estrutura.

## Execução local

```bash
npm run dev
# o projeto está disponível em http://localhost:4173
```

Se preferir usar um servidor estático simples (sem Vite), há o fallback:

```bash
python3 -m http.server 4173
```

> O comando acima serve apenas para ambientes de preview; o fluxo padrão utiliza `npm run dev` para habilitar HMR e melhores mensagens de erro.

## Estrutura relevante

```
src/
  app/              # estado global e filtros por módulo
  components/       # componentes funcionais (layout + módulo de usuários)
  data/             # seeds locais para fallback offline
  lib/              # wrappers de React/HTM e Supabase
styles/             # tokens + layout
supabase/schema.sql # migração inicial e seed
docs/               # guias detalhados (setup Supabase, módulo de usuários)
```

## Gestão de roadmap

1. **Issues granulares**  
   - Crie uma issue por módulo ou subfeature (ex.: `feat: módulo financeiro – dashboards`, `feat: eventos fase 1 – submissão`).  
   - Use labels `feat`, `bug`, `chore`, `design`, `docs` para facilitar os filtros.
   - No corpo da issue descreva contexto, checklist e critérios de aceite. Anexe prints ou links de referência.

2. **Project Kanban**  
   - No GitHub, abra um Project (Beta) no modo Board e crie as colunas `Backlog`, `Em andamento`, `Revisão`, `Concluído`.  
   - Adicione os cards vinculando as issues e mova-os ao longo do fluxo.  
   - Configure *workflows automáticos* do Project para mover cards quando a issue mudar de status (por exemplo, fechar issue move para `Concluído`).

3. **Templates**  
   - Considere criar templates (`.github/ISSUE_TEMPLATE/feature.md`) para padronizar descrições e campos obrigatórios.

## CI/CD

Automatizar o build aumenta a confiança em merges:

1. **Workflow GitHub Actions**  
   - Crie `.github/workflows/ci.yml` contendo:

     ```yaml
     name: CI
     on:
       push:
         branches: [main]
       pull_request:
         branches: [main]
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v4
           - uses: actions/setup-node@v4
             with:
               node-version: 20
               cache: npm
           - run: npm install
           - run: npm run build
     ```

   - O job roda em pushes e PRs contra `main`, garantindo que o bundle gera antes de mergear.

2. **Deploy estático (Vercel/Netlify)**  
   - Configure o projeto apontando para `npm run build` e `npm run dev`/`npm run preview` conforme o provedor exigir.  
   - Defina as variáveis de ambiente no painel do provedor:  
     - `VITE_SUPABASE_URL`  
     - `VITE_SUPABASE_ANON_KEY`  
   - Opcional: use previews por pull request para validar features antes do merge.

## Deploy guiado

### Vercel
1. Clique em **New Project** → selecione o repositório `reva-enterprise`.
2. No passo “Configure Project”, informe:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Em **Environment Variables** cadastre `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. Deploy. Cada pull request receberá automaticamente uma URL de preview.

### Netlify
1. `Add new site → Import an existing project`.
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Adicione as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em *Site settings → Build & deploy → Environment*.
4. Salve e dispare o primeiro deploy (`Trigger deploy → Deploy site`).

3. **Documentação adicional**  
   - Detalhar o módulo financeiro, eventos e fluxos de aprovação em `docs/`.  
   - Adicionar assets (prints) e roteiros de testes.

## Contribuição

1. Crie uma branch descritiva (`feat/usuarios-edit`, `chore/ci`).
2. Abra um PR e vincule a issue correspondente.
3. Execute `npm run build` antes de enviar para garantir que o bundle gera sem erros.

---

Para dúvidas adicionais consulte `docs/SUPABASE_SETUP.md` e `docs/USERS_MODULE.md` ou abra uma issue. Bons commits! 🚀
