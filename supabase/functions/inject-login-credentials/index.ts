import { create } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { serve } from "https://raw.githubusercontent.com/commonmodule/deno-module/refs/heads/main/api.ts";

const GAIA_PROTOCOL_SUPABASE_URL = Deno.env.get("GAIA_PROTOCOL_SUPABASE_URL")!;
const GAIA_PROTOCOL_SUPABASE_KEY = Deno.env.get("GAIA_PROTOCOL_SUPABASE_KEY")!;
const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"],
);

serve(async (req) => {
  const { token } = await req.json();
  if (!token) throw new Error("Missing required parameters");

  const gaiaProtocolSupabase = createClient(
    GAIA_PROTOCOL_SUPABASE_URL,
    GAIA_PROTOCOL_SUPABASE_KEY,
  );

  const { data: walletAddress, error } = await gaiaProtocolSupabase.functions
    .invoke(
      "verify-wallet-login-token",
      { body: { token } },
    );
  if (error) throw error;

  return await create(
    { alg: "HS256", typ: "JWT" },
    { wallet_address: walletAddress },
    key,
  );
});
