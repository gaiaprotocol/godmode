## Deploy Edge Function

```
supabase secrets set --env-file ./supabase/.env

supabase functions deploy check-jwt-token
supabase functions deploy inject-login-credentials
supabase functions deploy set-gaia-name
supabase functions deploy remove-gaia-name
supabase functions deploy set-god-metadata
supabase functions deploy check-god-metadata-duplicated
supabase functions deploy god-metadata --no-verify-jwt
supabase functions deploy get-user-gods
supabase functions deploy check-god-mode
supabase functions deploy cleanup-non-god-mode-names
supabase functions deploy record-gods-stats
supabase functions deploy get-gods-stats
```
