import { isGodModeEligible } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/refs/heads/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/api.ts";
import {
  safeFetchSingle,
  safeStore,
} from "https://raw.githubusercontent.com/yjgaia/supabase-module/refs/heads/main/deno/supabase.ts";
import { extractWalletAddressFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/refs/heads/main/deno/auth.ts";

const blacklist = [
  "gaia",
  "gaiaprotocol",
  "gaia_protocol",
];

function isValidName(name: string): boolean {
  if (!name) return false;
  if (!/^[a-z0-9-]+$/.test(name)) return false;
  if (name.startsWith("-") || name.endsWith("-")) return false;
  if (name.includes("--")) return false;
  if (name !== name.normalize("NFC")) return false;
  return true;
}

serve(async (req) => {
  const walletAddress = await extractWalletAddressFromRequest(req);

  let { name } = await req.json();
  if (!name) throw new Error("Name is required");

  name = name.toLowerCase().trim();
  if (name.length > 100) throw new Error("Name is too long");
  if (!isValidName(name)) throw new Error("Invalid name");
  if (blacklist.includes(name)) {
    throw new Error(`Name "${name}" is not allowed`);
  }

  const isEligible = await isGodModeEligible(walletAddress);
  if (!isEligible) throw new Error("Not eligible");

  const originalName = await safeFetchSingle(
    "gaia_names",
    (b) => b.select("name").eq("name", name),
  );

  if (originalName) throw new Error("Already registered");

  await safeStore(
    "gaia_names",
    (b) => b.upsert({ wallet_address: walletAddress, name }),
  );

  return "OK";
});
