-- Extensões básicas
create extension if not exists "pgcrypto";

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  segment text,
  plan text not null,
  status text not null default 'ativo',
  active_modules text[] default '{}',
  coming_soon text[] default '{}',
  priority text,
  created_at timestamptz default now()
);

create table if not exists public.module_catalog (
  id text primary key,
  name text not null,
  description text not null,
  category text not null,
  availability text default 'always',
  focus text[] default '{}'
);

insert into public.module_catalog (id, name, description, category, availability, focus)
values
  ('users', 'Usuários e Perfis', 'Base única de cadastros, perfis e trilhas de permissão.', 'Fundacional', 'always', '{"Registro completo","Controle de acesso"}'),
  ('payments', 'Pagamentos e Financeiro', 'Cobranças, conciliações, inadimplência e relatórios.', 'Financeiro', 'plan_based', '{"Anuidades","Eventos","Recorrência"}'),
  ('events', 'Eventos e Programação', 'Gestão fim a fim de eventos científicos e institucionais.', 'Programação', 'plan_based', '{"Submissões","Grade científica"}'),
  ('communications', 'Comunicação e Marketing', 'Conteúdos multicanal, campanhas e monitoramento de KPIs.', 'Relacionamento', 'plan_based', '{"Newsroom","Automação"}'),
  ('legal', 'Jurídico e Institucional', 'Protocolos, pareceres e workflows sigilosos.', 'Governança', 'advanced', '{"Pareceres","Documentos oficiais"}'),
  ('governance', 'Administrativo e Governança', 'Mandatos, atas, deliberações e continuidade institucional.', 'Governança', 'always', '{"Atas digitais","Comissões"}'),
  ('science', 'Produção Científica', 'Diretrizes, consensos e notas técnicas centralizadas.', 'Institucional', 'advanced', '{"Versionamento","Integrações"}'),
  ('support', 'Atendimento e Suporte', 'Canais de chamados, SLA e integrações com módulos.', 'Operacional', 'plan_based', '{"Filas","Automação"}'),
  ('analytics', 'Relatórios, BI e Auditoria', 'Dashboards consolidados, logs e rastreabilidade.', 'Insights', 'always', '{"Dashboards","Auditoria"}')
on conflict (id) do nothing;

insert into public.tenants (slug, name, segment, plan, status, active_modules, coming_soon, priority)
values
  ('assobrafir', 'ASSOBRAFIR', 'Fisioterapia', 'Enterprise', 'ativo', '{users,payments,events,communications,analytics}', '{legal,science}', 'Alta adoção de eventos híbridos'),
  ('confisio', 'Confisio Brasil', 'Conselho Profissional', 'Professional', 'implementacao', '{users,governance,support}', '{payments,analytics}', 'Migrar jurídico e comunicação'),
  ('rede-cientifica', 'Rede Científica Integrada', 'Frente acadêmica', 'Prime', 'piloto', '{users,science}', '{events,communications,analytics}', 'Consolidar produções científicas')
on conflict (slug) do nothing;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  external_reference text,
  full_name text not null,
  preferred_name text,
  email text not null,
  document_id text,
  council_number text,
  council_state text,
  nationality text,
  gender text,
  marital_status text,
  birth_date date,
  category text,
  status text default 'ativo',
  regional text,
  membership_type text,
  membership_started_at date,
  membership_expires_at date,
  association_status text default 'pending',
  avatar_url text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles
  add column if not exists nationality text;
alter table public.profiles
  add column if not exists gender text;
alter table public.profiles
  add column if not exists marital_status text;
alter table public.profiles
  add column if not exists birth_date date;
alter table public.profiles
  add column if not exists association_status text default 'pending';
alter table public.profiles
  add column if not exists avatar_url text;
alter table public.profiles
  add column if not exists notes text;
alter table public.profiles
  add column if not exists council_state text;
alter table public.profiles
  add column if not exists document_id text;

create unique index if not exists idx_profiles_external_reference
  on public.profiles(external_reference);

create table if not exists public.profile_addresses (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  street_type text,
  street text,
  number text,
  complement text,
  district text,
  city text,
  state text,
  country text default 'Brasil',
  postal_code text,
  is_primary boolean default false,
  is_correspondence boolean default false,
  created_at timestamptz default now()
);

alter table public.profile_addresses
  add column if not exists street_type text;
alter table public.profile_addresses
  add column if not exists is_correspondence boolean default false;

create table if not exists public.profile_contacts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  country_code text default '+55',
  area_code text,
  number text not null,
  label text,
  is_primary boolean default false,
  created_at timestamptz default now()
);

alter table public.profile_contacts
  add column if not exists country_code text default '+55';
alter table public.profile_contacts
  add column if not exists area_code text;

create table if not exists public.profile_education (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  level text,
  institution text,
  course text,
  started_at date,
  finished_at date,
  hours integer,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.profile_specialties (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  area text,
  specialty text,
  sub_specialty text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.profile_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role_name text not null,
  started_at date,
  finished_at date,
  created_at timestamptz default now()
);

create table if not exists public.profile_titularities (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title_name text not null,
  created_at timestamptz default now()
);

create table if not exists public.profile_practices (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  practice text not null,
  created_at timestamptz default now()
);

create table if not exists public.profile_contributions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  reference_period text,
  due_date date,
  amount_due numeric(10,2),
  amount_paid numeric(10,2),
  status text default 'pending',
  created_at timestamptz default now()
);

-- Ligações de usuários autenticados com tenants e perfis
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  role text not null check (role in ('super_admin', 'tenant_admin', 'associado')),
  created_at timestamptz default now(),
  unique (user_id, tenant_id)
);

alter table public.profiles
  add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.profiles
  add column if not exists role text check (role in ('super_admin', 'tenant_admin', 'associado'));

alter table public.tenants
  add column if not exists created_by uuid references auth.users(id);

-- Helpers de RLS
create or replace function public.is_super_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = 'super_admin'
  );
$$;

create or replace function public.is_tenant_admin(target_tenant uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role in ('super_admin','tenant_admin')
      and ur.tenant_id = target_tenant
  );
$$;

create or replace function public.is_profile_owner(target_profile uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = target_profile
      and p.user_id = auth.uid()
    );
$$;

create or replace function public.storage_path_segments(object_name text)
returns text[]
language sql
immutable
as $$
  select string_to_array(coalesce(object_name, ''), '/');
$$;

create or replace function public.safe_uuid(value text)
returns uuid
language plpgsql
immutable
as $$
declare
  result uuid;
begin
  begin
    result := value::uuid;
  exception when others then
    result := null;
  end;
  return result;
end;
$$;

-- Políticas RLS para user_roles (somente service_role e super admins)
alter table public.user_roles enable row level security;
drop policy if exists "Service role manages user_roles" on public.user_roles;
create policy "Service role manages user_roles"
  on public.user_roles
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "Super admin manages user_roles" on public.user_roles;
create policy "Super admin manages user_roles"
  on public.user_roles
  for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- Políticas RLS para perfis e entidades relacionadas
alter table public.profiles enable row level security;
drop policy if exists "Super admin access profiles" on public.profiles;
create policy "Super admin access profiles"
  on public.profiles
  for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "Tenant admin access profiles" on public.profiles;
create policy "Tenant admin access profiles"
  on public.profiles
  for all
  using (public.is_tenant_admin(tenant_id))
  with check (public.is_tenant_admin(tenant_id));

drop policy if exists "Associado manages own profile" on public.profiles;
create policy "Associado manages own profile"
  on public.profiles
  for all
  using (public.is_profile_owner(id))
  with check (public.is_profile_owner(id));

-- privilegio de service_role para integrações
drop policy if exists "Service role access profiles" on public.profiles;
create policy "Service role access profiles"
  on public.profiles
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Políticas comuns para tabelas derivadas de profiles
create or replace function public.can_manage_profile_child(child_profile_id uuid)
returns boolean
language sql
stable
as $$
  select
    public.is_super_admin()
    or exists (
      select 1
      from public.profiles p
      where p.id = child_profile_id
        and (
          public.is_tenant_admin(p.tenant_id)
          or public.is_profile_owner(p.id)
        )
    );
$$;

\echo 'Configuring RLS for profile child tables...'

alter table public.profile_addresses enable row level security;
drop policy if exists "Manage profile_addresses" on public.profile_addresses;
create policy "Manage profile_addresses"
  on public.profile_addresses
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

alter table public.profile_contacts enable row level security;
drop policy if exists "Manage profile_contacts" on public.profile_contacts;
create policy "Manage profile_contacts"
  on public.profile_contacts
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

alter table public.profile_education enable row level security;
drop policy if exists "Manage profile_education" on public.profile_education;
create policy "Manage profile_education"
  on public.profile_education
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

alter table public.profile_specialties enable row level security;
drop policy if exists "Manage profile_specialties" on public.profile_specialties;
create policy "Manage profile_specialties"
  on public.profile_specialties
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

alter table public.profile_roles enable row level security;
drop policy if exists "Manage profile_roles" on public.profile_roles;
create policy "Manage profile_roles"
  on public.profile_roles
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

alter table public.profile_titularities enable row level security;
drop policy if exists "Manage profile_titularities" on public.profile_titularities;
create policy "Manage profile_titularities"
  on public.profile_titularities
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

alter table public.profile_practices enable row level security;
drop policy if exists "Manage profile_practices" on public.profile_practices;
create policy "Manage profile_practices"
  on public.profile_practices
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

alter table public.profile_contributions enable row level security;
drop policy if exists "Manage profile_contributions" on public.profile_contributions;
create policy "Manage profile_contributions"
  on public.profile_contributions
  for all
  using (public.can_manage_profile_child(profile_id))
  with check (public.can_manage_profile_child(profile_id));

-- Garantir bucket de avatares e policies baseadas em roles
insert into storage.buckets (id, name, public)
select 'profile-photos', 'profile-photos', true
where not exists (select 1 from storage.buckets where id = 'profile-photos');

drop policy if exists "Allow authenticated upload avatars" on storage.objects;
drop policy if exists "Allow authenticated update avatars" on storage.objects;
drop policy if exists "Allow authenticated delete avatars" on storage.objects;

create policy "Public can read avatars"
  on storage.objects
  for select
  using (bucket_id = 'profile-photos');

create policy "Upload avatars with role"
  on storage.objects
  for insert
  with check (
    bucket_id = 'profile-photos'
    and (
      auth.role() = 'service_role'
      or public.is_super_admin()
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.safe_uuid(public.storage_path_segments(name)[1]) in (
          select tenant_id from public.user_roles
          where user_id = auth.uid() and role = 'tenant_admin'
        )
      )
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.is_profile_owner(public.safe_uuid(public.storage_path_segments(name)[2]))
      )
    )
  );

create policy "Update avatars with role"
  on storage.objects
  for update
  using (
    bucket_id = 'profile-photos'
    and (
      auth.role() = 'service_role'
      or public.is_super_admin()
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.safe_uuid(public.storage_path_segments(name)[1]) in (
          select tenant_id from public.user_roles
          where user_id = auth.uid() and role = 'tenant_admin'
        )
      )
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.is_profile_owner(public.safe_uuid(public.storage_path_segments(name)[2]))
      )
    )
  )
  with check (
    bucket_id = 'profile-photos'
    and (
      auth.role() = 'service_role'
      or public.is_super_admin()
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.safe_uuid(public.storage_path_segments(name)[1]) in (
          select tenant_id from public.user_roles
          where user_id = auth.uid() and role = 'tenant_admin'
        )
      )
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.is_profile_owner(public.safe_uuid(public.storage_path_segments(name)[2]))
      )
    )
  );

create policy "Delete avatars with role"
  on storage.objects
  for delete
  using (
    bucket_id = 'profile-photos'
    and (
      auth.role() = 'service_role'
      or public.is_super_admin()
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.safe_uuid(public.storage_path_segments(name)[1]) in (
          select tenant_id from public.user_roles
          where user_id = auth.uid() and role = 'tenant_admin'
        )
      )
      or (
        array_length(public.storage_path_segments(name), 1) >= 2
        and public.is_profile_owner(public.safe_uuid(public.storage_path_segments(name)[2]))
      )
    )
  );

insert into public.profiles
  (tenant_id, external_reference, full_name, preferred_name, email, document_id, council_number, council_state, nationality, gender, marital_status, birth_date, category, status, regional, membership_type, membership_started_at, membership_expires_at, association_status, avatar_url, notes)
values
  ((select id from public.tenants where slug = 'assobrafir'), 'LEG-001', 'Fernanda Tavares', 'Fer Tavares', 'fernanda.tavares@assobrafir.org', '123.456.789-00', 'CREFITO 3/123456-F', 'SP', 'Brasileira', 'Feminino', 'Solteira', '1989-04-02', 'especialista', 'ativo', 'Sudeste', 'professional', '2022-03-01', '2025-03-01', 'ativa', null, 'Especialista em ventilação mecânica'),
  ((select id from public.tenants where slug = 'assobrafir'), 'LEG-002', 'Ricardo Moreno', 'Ricardo', 'ricardo.moreno@assobrafir.org', '987.654.321-00', 'CREFITO 4/654321-F', 'MG', 'Brasileiro', 'Masculino', 'Casado', '1984-11-15', 'efetivo', 'ativo', 'Sudeste', 'professional', '2023-01-10', '2024-12-31', 'ativa', null, null),
  ((select id from public.tenants where slug = 'confisio'), 'LEG-003', 'Helena Prado', 'Helena', 'helena.prado@confisio.org', '102.938.475-11', 'CREFITO 2/789123-F', 'RJ', 'Brasileira', 'Feminino', 'Solteira', '1991-08-25', 'especialista', 'implementacao', 'Sudeste', 'professional', '2024-02-15', '2025-02-15', 'pendente', null, 'Responsável pela região Sudeste')
on conflict (external_reference) do nothing;

insert into public.profile_addresses (profile_id, type, street, number, city, state, postal_code, is_primary)
select id, 'residencial', 'Av. Paulista', '1000', 'São Paulo', 'SP', '01310-100', true from public.profiles where external_reference = 'LEG-001'
union all
select id, 'comercial', 'Rua dos Andradas', '280', 'Belo Horizonte', 'MG', '30120-010', true from public.profiles where external_reference = 'LEG-002'
union all
select id, 'residencial', 'Rua das Laranjeiras', '55', 'Rio de Janeiro', 'RJ', '22240-003', true from public.profiles where external_reference = 'LEG-003';

insert into public.profile_contacts (profile_id, type, number, label, is_primary)
select id, 'celular', '11988887777', 'WhatsApp', true from public.profiles where external_reference = 'LEG-001'
union all
select id, 'celular', '31999998888', 'WhatsApp', true from public.profiles where external_reference = 'LEG-002'
union all
select id, 'celular', '21977776666', 'WhatsApp', true from public.profiles where external_reference = 'LEG-003';

insert into public.profile_roles (profile_id, role_name, started_at)
select id, 'Diretora Científica', date '2023-01-01' from public.profiles where external_reference = 'LEG-001'
union all
select id, 'Coordenador Regional', date '2022-05-01' from public.profiles where external_reference = 'LEG-002';

insert into public.profile_titularities (profile_id, title_name)
select id, 'Especialista em Fisioterapia Respiratória' from public.profiles where external_reference = 'LEG-001';

insert into public.profile_practices (profile_id, practice)
select id, 'UTI Adulto' from public.profiles where external_reference = 'LEG-001'
union all
select id, 'Reabilitação Cardiorrespiratória' from public.profiles where external_reference = 'LEG-002';

insert into public.profile_contributions (profile_id, reference_period, due_date, amount_due, amount_paid, status)
select id, '2024-01', date '2024-01-10', 150.00, 150.00, 'paid' from public.profiles where external_reference = 'LEG-001'
union all
select id, '2024-01', date '2024-01-10', 120.00, 0, 'pending' from public.profiles where external_reference = 'LEG-002';
