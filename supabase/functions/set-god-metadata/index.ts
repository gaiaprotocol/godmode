import { checkHolder } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import {
  safeFetchSingle,
  safeStore,
} from "https://raw.githubusercontent.com/yjgaia/supabase-module/main/deno/supabase.ts";
import ObjectUtils from "https://raw.githubusercontent.com/yjgaia/ts-module/main/src/utils/ObjectUtils.ts";
import { extractWalletFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/main/deno/auth.ts";
import { Storage } from "npm:@google-cloud/storage";
import fireManParts from "./parts-jsons/fire-man-parts.json" with {
  type: "json",
};
import fireWomanParts from "./parts-jsons/fire-woman-parts.json" with {
  type: "json",
};
import stoneManParts from "./parts-jsons/stone-man-parts.json" with {
  type: "json",
};
import stoneWomanParts from "./parts-jsons/stone-woman-parts.json" with {
  type: "json",
};
import waterManParts from "./parts-jsons/water-man-parts.json" with {
  type: "json",
};
import waterWomanParts from "./parts-jsons/water-woman-parts.json" with {
  type: "json",
};

import {
  CompositeOperator,
  ImageMagick,
  initializeImageMagick,
  MagickImage,
} from "npm:@imagemagick/magick-wasm@0.0.31";

const wasmUrl = new URL(
  "magick.wasm",
  import.meta.resolve("npm:@imagemagick/magick-wasm@0.0.31"),
);
const wasmBytes = await Deno.readFile(wasmUrl);
await initializeImageMagick(wasmBytes);

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

const TYPES = ["Stone", "Fire", "Water"];
const GENDERS = ["Man", "Woman"];

enum GodGender {
  MAN = "Man",
  WOMAN = "Woman",
}

enum GodType {
  STONE = "Stone",
  FIRE = "Fire",
  WATER = "Water",
}

serve(async (req) => {
  const walletAddress = extractWalletFromRequest(req);

  const { tokenId, metadata } = await req.json();
  if (tokenId === undefined || metadata === undefined) {
    throw new Error("Invalid request");
  }

  const isHolder = await checkHolder(tokenId, walletAddress);
  if (!isHolder) throw new Error("Not the holder");

  if (!metadata.type || !TYPES.includes(metadata.type)) {
    throw new Error("Invalid type");
  }

  if (!metadata.gender || !GENDERS.includes(metadata.gender)) {
    throw new Error("Invalid gender");
  }

  const originalMetadata = await safeFetchSingle<GodMetadata>(
    "god_metadatas",
    (b) => b.select("*").eq("token_id", tokenId),
  );

  if (ObjectUtils.isEqual(originalMetadata, metadata)) {
    throw new Error("No change");
  }

  let parts: any;
  if (metadata.type === GodType.STONE && metadata.gender === GodGender.MAN) {
    parts = stoneManParts;
  } else if (
    metadata.type === GodType.STONE && metadata.gender === GodGender.WOMAN
  ) {
    parts = stoneWomanParts;
  } else if (
    metadata.type === GodType.FIRE && metadata.gender === GodGender.MAN
  ) {
    parts = fireManParts;
  } else if (
    metadata.type === GodType.FIRE && metadata.gender === GodGender.WOMAN
  ) {
    parts = fireWomanParts;
  } else if (
    metadata.type === GodType.WATER && metadata.gender === GodGender.MAN
  ) {
    parts = waterManParts;
  } else if (
    metadata.type === GodType.WATER && metadata.gender === GodGender.WOMAN
  ) {
    parts = waterWomanParts;
  }

  const imageParts: any[] = [];

  for (const [traitId, trait] of parts.entries()) {
    if (
      trait.condition === undefined ||
      trait.condition.values.includes(
        (metadata.parts as any)[trait.condition.trait],
      )
    ) {
      for (const [partId, part] of trait.parts.entries()) {
        if (
          (part as any).condition === undefined ||
          part.condition.values.includes(
            (metadata.parts as any)[part.condition.trait],
          )
        ) {
          if ((metadata.parts as any)[trait.name] === part.name) {
            imageParts.push({ traitId, partId });
            break;
          }
        }
      }
    }
  }

  let images: any[] = [];
  for (const imagePart of imageParts) {
    images = images.concat(
      parts[imagePart.traitId].parts[imagePart.partId].images,
    );
  }
  images.sort((a, b) => a.order - b.order);

  const imageBuffers: Uint8Array[] = [];

  const BASE_URL = "https://storage.googleapis.com/gaiaprotocol/god_parts";

  for (const image of images) {
    if (image !== undefined) {
      const imageUrl =
        `${BASE_URL}/${metadata.type.toLowerCase()}/${image.path}`;
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to load image from ${imageUrl}`);
      }
      const imageBuffer = new Uint8Array(await response.arrayBuffer());
      imageBuffers.push(imageBuffer);
    }
  }

  if (imageBuffers.length === 0) {
    throw new Error("No images to compose");
  }

  let buffer: Uint8Array | null = null;

  ImageMagick.read(imageBuffers[0], (baseImage) => {
    for (let i = 1; i < imageBuffers.length; i++) {
      ImageMagick.read(imageBuffers[i], (overlay) => {
        baseImage.composite(overlay, 0, 0, CompositeOperator.Over);
        overlay.dispose();
      });
    }

    baseImage.write((data) => {
      buffer = data;
    }, "png");

    baseImage.dispose();
  });

  if (buffer == null) {
    throw new Error("Failed to generate image buffer");
  }

  const fileName = `${crypto.randomUUID()}.png`;
  const filePath = `${metadata._id}/${fileName}`;

  const blob = bucket.file("god_images/" + filePath);
  await blob.save(buffer, {
    contentType: "image/png",
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });

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

  const _try = async () => {
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
      await _try();
      break;
    } catch (error) {
      console.error(error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return "OK";
});
