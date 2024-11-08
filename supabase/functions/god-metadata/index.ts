import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import { safeFetchSingle } from "https://raw.githubusercontent.com/yjgaia/supabase-module/main/deno/supabase.ts";

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
  const url = new URL(req.url);
  const tokenId = url.pathname.replace("/god-metadata/", "");

  const metadata = await safeFetchSingle<GodMetadata>(
    "god_metadatas",
    (b) => b.select("*").eq("token_id", tokenId),
  );

  if (!metadata) throw new Error("Not found");

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

  const openSeaMetadata: OpenSeaMetadata = {
    name: `God #${metadata.token_id}`,
    description:
      "A membership NFT collection of Gaia Protocol consisting of 3,333 NFTs",
    image:
      `https://storage.googleapis.com/gaiaprotocol/god_images/${metadata.image}`,
    external_url: "https://thegods.gaia.cc",
    attributes,
    animation_url: `https://thegods.gaia.cc/nft-viewer/${metadata.token_id}`,
  };

  return openSeaMetadata;
});
