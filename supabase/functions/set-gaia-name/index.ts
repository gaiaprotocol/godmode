import { isGodModeEligible } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/refs/heads/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/api.ts";
import {
  safeFetchSingle,
  safeStore,
} from "https://raw.githubusercontent.com/yjgaia/supabase-module/refs/heads/main/deno/supabase.ts";
import { extractWalletFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/refs/heads/main/deno/auth.ts";

serve(async (req) => {
  const walletAddress = extractWalletFromRequest(req);

  const { name } = await req.json();
  if (!name) throw new Error("Name is required");

  const isEligible = await isGodModeEligible(walletAddress);
  if (!isEligible) throw new Error("Not eligible");

  const originalName = await safeFetchSingle(
    "gaia_names",
    (b) => b.select("name").eq("name", name),
  );

  if (originalName) throw new Error("Already registered");

  await safeStore(
    "gaia_names",
    (b) => b.insert({ wallet_address: walletAddress, name }),
  );

  return "OK";
});
