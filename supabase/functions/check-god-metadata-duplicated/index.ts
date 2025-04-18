import { PartSelector } from "https://raw.githubusercontent.com/gaiaprotocol/thegods-module/refs/heads/main/deno/mod.ts";
import { serve } from "https://raw.githubusercontent.com/commonmodule/deno-module/refs/heads/main/api.ts";
import {
  safeFetchSingle,
} from "https://raw.githubusercontent.com/commonmodule/supabase-module/refs/heads/main/deno/supabase.ts";

interface GodMetadata {
  token_id: number;
  type: string;
  gender: string;
  parts: Record<string, string>;
  image: string;
}

const TYPES = ["Stone", "Fire", "Water"];
const GENDERS = ["Man", "Woman"];

serve(async (req) => {
  const { metadata } = await req.json();
  if (!metadata) throw new Error("Invalid request");

  if (!metadata.type || !TYPES.includes(metadata.type)) {
    throw new Error("Invalid type");
  }

  if (!metadata.gender || !GENDERS.includes(metadata.gender)) {
    throw new Error("Invalid gender");
  }

  const errors = PartSelector.validateMetadata(metadata);
  if (errors.length > 0) {
    throw new Error("Invalid parts: " + errors.join(", "));
  }

  // check duplicate
  const duplicate = await safeFetchSingle<GodMetadata>(
    "god_metadatas",
    (b) =>
      b.select("token_id").eq("type", metadata.type).eq(
        "gender",
        metadata.gender,
      ).eq(
        "parts",
        JSON.stringify(metadata.parts),
      ),
  );

  return { duplicatedTokenId: duplicate?.token_id };
});
