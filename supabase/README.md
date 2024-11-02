## Deploy Edge Function

```
supabase secrets set --env-file ./supabase/.env

supabase functions deploy set-gaia-name
supabase functions deploy the-god-metadata --no-verify-jwt
```
