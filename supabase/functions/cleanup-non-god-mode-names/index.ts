import { getGodBalances } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/refs/heads/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/api.ts";
import {
  safeFetch,
  safeStore,
} from "https://raw.githubusercontent.com/yjgaia/supabase-module/refs/heads/main/deno/supabase.ts";

serve(async () => {
  const dataSet = await safeFetch<{ wallet_address: string }[]>(
    "gaia_names",
    (b) => b.select("wallet_address"),
  );

  const walletAddresses = dataSet.map((n) => n.wallet_address);
  const balances = await getGodBalances(walletAddresses);
  const nonGodModeWalletAddresses = walletAddresses.filter(
    (wa) => balances[wa] === 0n,
  );

  console.log(balances, nonGodModeWalletAddresses);

  await safeStore(
    "gaia_names",
    (b) => b.delete().in("wallet_address", nonGodModeWalletAddresses),
  );

  return "OK";
});
