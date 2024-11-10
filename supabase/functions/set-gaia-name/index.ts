import { isGodModeEligible } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import {
  safeFetchSingle,
  safeStore,
} from "https://raw.githubusercontent.com/yjgaia/supabase-module/main/deno/supabase.ts";
import { extractWalletFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/main/deno/auth.ts";

serve(async (req) => {
  const walletAddress = extractWalletFromRequest(req);

  const { name } = await req.json();
  if (!name) throw new Error("Name is required");

  const isEligible = await isGodModeEligible(walletAddress);
  if (!isEligible) throw new Error("Not eligible");

  const originalName = await safeFetchSingle<
    { wallet_address: string; name: string }
  >(
    "gaia_names",
    (b) => b.select("*").eq("wallet_address", walletAddress),
  );

  if (originalName) throw new Error("Already registered");

  await safeStore(
    "gaia_names",
    (b) => b.insert({ wallet_address: walletAddress, name }),
  );

  return "OK";
});
