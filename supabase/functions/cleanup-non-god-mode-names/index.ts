import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/api.ts";
import { safeFetch } from "https://raw.githubusercontent.com/yjgaia/supabase-module/refs/heads/main/deno/supabase.ts";
import { getGodBalanceList } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/refs/heads/main/deno/godmode.ts";

serve(async (req) => {
  console.log("req", req);

  const names = await safeFetch<{ wallet_address: string; name: string }[]>(
    "gaia_names",
    (b) => b.select("*"),
  );

  const walletAddresses = names.map((n) => n.wallet_address);

  const balances = await getGodBalanceList(walletAddresses);

  return "OK";
});
