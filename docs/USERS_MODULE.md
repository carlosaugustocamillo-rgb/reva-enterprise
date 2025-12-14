# Módulo de Usuários e Perfis

## Objetivo
Centralizar o cadastro de pessoas vinculadas a cada tenant, servindo como fonte única para todos os módulos (financeiro, eventos, comunicação etc.). Cada perfil possui um identificador global (`profile_id`) usado em toda a plataforma.

## Requisitos de dados
- **Identidade principal:** nome completo, nome preferido, e-mail institucional, documento (CPF/passaporte), status associativo, categoria e regional.
- **Governança multi-tenant:** todo perfil pertence a um tenant (`tenant_id`), permitindo segmentar dados e aplicar RLS.
- **Dados profissionais:** número/UF do conselho (CREFITO), tipo de vínculo profissional e datas de vigência.
- **Endereços múltiplos:** armazenados em tabela própria com indicação de tipo (residencial, comercial, correspondência).
- **Contatos múltiplos:** telefones ou WhatsApp com tipo e país.
- **Formação acadêmica e áreas de atuação:** estrutura flexível para histórico de cursos, especialidades e cargos.
- **Integrações futuras:** IDs de perfis serão usados por pagamentos, propostas de eventos e comunicação, então mantemos campos `external_reference` para sync com sistemas herdados.

## Modelagem Supabase
```sql
profiles (
  id uuid pk,
  tenant_id uuid fk -> tenants,
  full_name text,
  preferred_name text,
  email text,
  document_id text,
  council_number text,
  council_state text,
  category text,
  status text,
  regional text,
  membership_type text,
  membership_started_at date,
  membership_expires_at date,
  external_reference text,
  created_at timestamptz,
  updated_at timestamptz
)

profile_addresses (
  id uuid pk,
  profile_id uuid fk -> profiles,
  type text,
  street text,
  number text,
  complement text,
  district text,
  city text,
  state text,
  country text,
  postal_code text,
  is_primary boolean,
  created_at timestamptz
)

profile_contacts (
  id uuid pk,
  profile_id uuid fk -> profiles,
  type text,
  country_code text,
  number text,
  label text,
  is_primary boolean,
  created_at timestamptz
)

profile_education (
  id uuid pk,
  profile_id uuid fk -> profiles,
  level text,
  institution text,
  course text,
  started_at date,
  finished_at date,
  hours integer,
  notes text
)

profile_specialties (
  id uuid pk,
  profile_id uuid fk -> profiles,
  area text,
  specialty text,
  sub_specialty text,
  notes text
)
```

## Identificadores para integração
- `profiles.id`: usado por módulos Financeiro, Eventos (palestrantes), Atendimento e Comunicação.
- `profiles.external_reference`: permite mapear registros vindos do sistema legado.
- `profile_contacts` e `profile_addresses` usam `uuid` independentes para facilitar sincronização e histórico.

## Proximos passos
1. Criar as tabelas no Supabase (SQL atualizado em `supabase/schema.sql`).
2. Popular registros de exemplo por tenant.
3. Consumir os dados no front-end e construir a primeira listagem/grade de perfis com filtros básicos.
