import { serve } from "https://raw.githubusercontent.com/commonmodule/deno-module/refs/heads/main/api.ts";
import {
  safeStore,
} from "https://raw.githubusercontent.com/commonmodule/supabase-module/refs/heads/main/deno/supabase.ts";
import { extractWalletAddressFromRequest } from "https://raw.githubusercontent.com/commonmodule/wallet-login-module/refs/heads/main/deno/auth.ts";

serve(async (req) => {
  const walletAddress = await extractWalletAddressFromRequest(req);

  await safeStore(
    "gaia_names",
    (b) => b.delete().eq("wallet_address", walletAddress),
  );

  return "OK";
});
