import { isGodModeEligible } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import { extractWalletFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/main/deno/auth.ts";

serve(async (req) => {
  const walletAddress = extractWalletFromRequest(req);

  const { name } = await req.json();
  if (!name) throw new Error("Name is required");

  const isEligible = await isGodModeEligible(walletAddress);
  if (!isEligible) throw new Error("Not eligible");

  return "OK";
});
