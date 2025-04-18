import { checkGodHolder } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/refs/heads/main/deno/godmode.ts";
import { PartSelector } from "https://raw.githubusercontent.com/gaiaprotocol/thegods-module/refs/heads/main/deno/mod.ts";
import { serve } from "https://raw.githubusercontent.com/commonmodule/deno-module/refs/heads/main/api.ts";
import {
  safeFetchSingle,
  safeStore,
} from "https://raw.githubusercontent.com/commonmodule/supabase-module/refs/heads/main/deno/supabase.ts";
import ObjectUtils from "https://raw.githubusercontent.com/commonmodule/ts-module/refs/heads/main/src/utils/ObjectUtils.ts";
import { extractWalletAddressFromRequest } from "https://raw.githubusercontent.com/commonmodule/wallet-login-module/refs/heads/main/deno/auth.ts";
import { Storage } from "npm:@google-cloud/storage";

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
  parts: Record<string, string>;
  image: string;
}

const storage = new Storage({
  projectId: Deno.env.get("GOOGLE_PROJECT_ID"),
  credentials: {
    client_email: Deno.env.get("GOOGLE_CLIENT_EMAIL"),
    private_key: Deno.env.get("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket("gaiaprotocol");

const TYPES = ["Stone", "Fire", "Water"];
const GENDERS = ["Man", "Woman"];

serve(async (req) => {
  const walletAddress = await extractWalletAddressFromRequest(req);
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("Invalid file format");
  }

  const tokenId = parseInt(formData.get("tokenId") as string);
  const metadata = JSON.parse(
    formData.get("metadata") as string,
  ) as GodMetadata;

  if (!file || isNaN(tokenId) || !metadata) {
    throw new Error("Invalid request");
  }

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

  const isHolder = await checkGodHolder(tokenId, walletAddress);
  if (!isHolder) throw new Error("Not the holder");

  const originalMetadata = await safeFetchSingle<GodMetadata>(
    "god_metadatas",
    (b) => b.select("*").eq("token_id", tokenId),
  );

  if (ObjectUtils.isEqual(originalMetadata, metadata)) {
    throw new Error("No change");
  }

  const fileName = `${crypto.randomUUID()}.png`;
  const filePath = `${tokenId}/${fileName}`;

  const blob = bucket.file("god_images/" + filePath);
  await blob.save(file.stream() as any, {
    contentType: "image/png",
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });

  try {
    await safeStore(
      "god_metadatas",
      (b) =>
        b.update({
          type: metadata.type,
          gender: metadata.gender,
          parts: metadata.parts,
          image: filePath,
        }).eq("token_id", tokenId),
    );
  } catch (error) {
    await blob.delete();
    throw error;
  }

  const refreshOpenSea = async () => {
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/contract/0x134590acb661da2b318bcde6b39ef5cf8208e372/nfts/${tokenId}/refresh`,
      { method: "POST", headers: { "X-API-KEY": OPENSEA_API_KEY } },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new APIError(response.status, `OpenSea API error: ${errorText}`);
    }
  };

  while (true) {
    try {
      await refreshOpenSea();
      break;
    } catch (error) {
      console.error(error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return "OK";
});
