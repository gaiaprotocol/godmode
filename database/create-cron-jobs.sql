
select cron.schedule(
  'cleanup-non-god-mode-names',
  '*/10 * * * *',
  $$
  select net.http_post(
      'https://dhzxulywizygtdficytt.supabase.co/functions/v1/cleanup-non-god-mode-names',
      headers := '{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoenh1bHl3aXp5Z3RkZmljeXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMTIxNDUsImV4cCI6MjA0NTY4ODE0NX0.xUd8nqcT2aVn1j4x8c-pRbDcFSaIGtkn7SAcmKleBms"}'::JSONB
  ) AS request_id;
  $$
);
