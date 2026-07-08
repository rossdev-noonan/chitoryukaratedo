-- Table-level grants for the Supabase API roles.
-- RLS policies (from 0001) control which ROWS each role can see/write;
-- these grants control whether the role can touch the TABLE at all.
-- Without this, every request fails with "permission denied for table X"
-- regardless of how permissive the RLS policies are.

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;

-- Apply the same grants automatically to any table created later.
alter default privileges in schema public
  grant select, insert, update, delete on tables to anon, authenticated;
