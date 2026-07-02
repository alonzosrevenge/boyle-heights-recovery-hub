create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  icon text not null check (icon in ('purifier', 'exam', 'housing', 'alert', 'info')),
  title_en text not null,
  title_es text not null,
  body_en text not null,
  body_es text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table resources enable row level security;

create policy "Public can read active resources"
  on resources for select
  using (is_active = true);

insert into resources (icon, title_en, title_es, body_en, body_es, sort_order) values
('purifier', 'Free air purifiers and masks', 'Purificadores de aire y mascarillas gratis',
 'Distributed by community partners while supplies last.',
 'Distribuidos por organizaciones comunitarias mientras dure el suministro.', 1),
('exam', 'Free lung exams', 'Examenes pulmonares gratis',
 'St. John''s Community Health, with InnerCity Struggle. Walk-ins welcome.',
 'St. John''s Community Health, junto con InnerCity Struggle. Se aceptan pacientes sin cita.', 2),
('housing', 'Temporary housing for respiratory cases', 'Vivienda temporal para casos respiratorios',
 'Relocation support for households with breathing conditions.',
 'Apoyo de reubicacion para hogares con afecciones respiratorias.', 3),
('alert', 'Shelter-in-place status', 'Estado de refugio en el lugar',
 'Check current advisory status before making plans to go outside.',
 'Consulte el estado actual del aviso antes de hacer planes para salir.', 4);
