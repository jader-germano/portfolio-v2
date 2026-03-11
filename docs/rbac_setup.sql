-- 🛡️ JPGLabs RBAC Schema

-- 1. Create a secure enum for roles
create type public.app_role as enum ('master_admin', 'admin', 'user');

-- 2. Create the Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role public.app_role not null default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS
alter table public.profiles enable row level security;

-- 4. Policies
-- Users can read their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role in ('admin', 'master_admin')
    )
  );

-- Only Master Admin can update roles
create policy "Master Admin can update roles" on public.profiles
  for update using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'master_admin'
    )
  );

-- 5. Function to handle new user signup (Trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Seed Jader as Master Admin (Run manually after signup)
-- update public.profiles set role = 'master_admin' where email = 'jader@jpglabs.com.br';
