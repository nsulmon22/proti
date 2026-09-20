-- ============================================================
-- Proti — accounts & personalization (favorites + tried status)
-- Replaces the unused `favorites` table with a single combined table.
-- ============================================================

drop table if exists favorites;

create table if not exists user_recipes (
    user_id      uuid not null references auth.users(id) on delete cascade,
    recipe_id    uuid not null references recipes(id) on delete cascade,
    favorited_at timestamptz,   -- null = not favorited
    tried_at     timestamptz,   -- null = not yet tried
    primary key (user_id, recipe_id)
);

create index if not exists idx_user_recipes_user on user_recipes(user_id);

alter table user_recipes enable row level security;

create policy "Users manage their own recipe status"
    on user_recipes for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
