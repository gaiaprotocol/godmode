import { checkHolder } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import { extractWalletFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/main/deno/auth.ts";

serve(async (req) => {
  const walletAddress = extractWalletFromRequest(req);

  const { tokenId } = await req.json();
  if (tokenId === undefined) throw new Error("Token ID is required");

  const isHolder = await checkHolder(tokenId, walletAddress);
  if (!isHolder) throw new Error("Not the holder");

  return "OK";
});
