## Deploy Edge Function

```
supabase secrets set --env-file ./supabase/.env

supabase functions deploy inject-login-credentials
supabase functions deploy set-gaia-name
supabase functions deploy set-the-god-metadata
supabase functions deploy the-god-metadata --no-verify-jwt
```
