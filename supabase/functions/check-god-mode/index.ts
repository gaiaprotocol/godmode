import { isGodModeEligible } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/refs/heads/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/commonmodule/deno-module/refs/heads/main/api.ts";
import { extractWalletAddressFromRequest } from "https://raw.githubusercontent.com/commonmodule/wallet-login-module/refs/heads/main/deno/auth.ts";

serve(async (req) => {
  const walletAddress = await extractWalletAddressFromRequest(req);
  const isEligible = await isGodModeEligible(walletAddress);
  return `${isEligible}`;
});
