import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/api.ts";

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

  return await response.json();
});
