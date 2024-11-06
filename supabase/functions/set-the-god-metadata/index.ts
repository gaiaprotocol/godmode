import { checkHolder } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import { extractWalletFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/main/deno/auth.ts";
import { Storage } from "https://cdn.skypack.dev/@google-cloud/storage?dts";

const credentials = {
  client_email: Deno.env.get("GOOGLE_CLIENT_EMAIL"),
  private_key: Deno.env.get("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n"),
  project_id: Deno.env.get("GOOGLE_PROJECT_ID"),
};

const storage = new Storage({
  credentials,
  projectId: credentials.project_id,
});

const bucket = storage.bucket("gaiaprotocol");

serve(async (req) => {
  const walletAddress = extractWalletFromRequest(req);

  const { tokenId } = await req.json();
  if (tokenId === undefined) throw new Error("Token ID is required");

  const isHolder = await checkHolder(tokenId, walletAddress);
  if (!isHolder) throw new Error("Not the holder");

  return "OK";
});
