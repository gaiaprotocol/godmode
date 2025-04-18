import { getGodBalance } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/refs/heads/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/commonmodule/deno-module/refs/heads/main/api.ts";
import { safeFetch } from "https://raw.githubusercontent.com/commonmodule/supabase-module/refs/heads/main/deno/supabase.ts";
import { extractWalletAddressFromRequest } from "https://raw.githubusercontent.com/commonmodule/wallet-login-module/refs/heads/main/deno/auth.ts";

const OPENSEA_API_KEY = Deno.env.get("OPENSEA_API_KEY")!;

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

interface GodMetadata {
  token_id: number;
  type: string;
  gender: string;
  image: string;
  parts: Record<string, string>;
}

interface Attribute {
  trait_type: string;
  value: string;
}

interface OpenSeaMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  animation_url?: string;
  attributes: Attribute[];
}

serve(async (req) => {
  const walletAddress = await extractWalletAddressFromRequest(req);
  const { next } = await req.json();

  const [response, balance] = await Promise.all([
    fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/account/${walletAddress}/nfts?collection=gaia-protocol-gods&limit=200${
        next ? `&next=${next}` : ""
      }`,
      { headers: { "X-API-KEY": OPENSEA_API_KEY } },
    ),
    getGodBalance(walletAddress),
  ]);

  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(
      response.status,
      `OpenSea API error: ${errorText}`,
    );
  }

  const data = await response.json();
  const tokenIds = data.nfts.map((nft: any) => parseInt(nft.identifier));

  const metadataSet = await safeFetch<GodMetadata[]>(
    "god_metadatas",
    (b) => b.select("*").in("token_id", tokenIds),
  );

  for (const nft of data.nfts) {
    const metadata = metadataSet.find((m) =>
      m.token_id === parseInt(nft.identifier)
    );

    if (metadata) {
      const attributes: Attribute[] = [{
        trait_type: "Type",
        value: metadata.type,
      }, {
        trait_type: "Gender",
        value: metadata.gender,
      }];

      for (const [partName, value] of Object.entries(metadata.parts)) {
        attributes.push({
          trait_type: partName,
          value,
        });
      }

      nft.attributes = attributes;
    }
  }

  data.balance = Number(balance);
  return data;
});
