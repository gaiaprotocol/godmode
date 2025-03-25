import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/api.ts";
import {
  safeStore,
} from "https://raw.githubusercontent.com/yjgaia/supabase-module/refs/heads/main/deno/supabase.ts";

const OPENSEA_API_KEY = Deno.env.get("OPENSEA_API_KEY")!;

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

serve(async () => {
  const response = await fetch(
    "https://api.opensea.io/api/v2/collections/gaia-protocol-gods/stats",
    { headers: { "X-API-KEY": OPENSEA_API_KEY } },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(
      response.status,
      `OpenSea API error: ${errorText}`,
    );
  }

  const data = await response.json();

  const time = new Date();
  time.setMinutes(0, 0, 0);

  await safeStore(
    "gods_stats",
    (b) =>
      b.insert({
        time,
        floor_price: data.total.floor_price,
        num_owners: data.total.num_owners,
      }),
  );

  return "OK";
});
