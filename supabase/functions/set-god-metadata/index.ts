import { checkHolder } from "https://raw.githubusercontent.com/gaiaprotocol/godmode/main/deno/godmode.ts";
import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import {
  safeFetchSingle,
  safeStore,
} from "https://raw.githubusercontent.com/yjgaia/supabase-module/main/deno/supabase.ts";
import { ObjectUtils } from "https://raw.githubusercontent.com/yjgaia/ts-module/main/src/mod.ts";
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

  let baseImage: MagickImage | null = null;

  const BASE_URL = "https://storage.googleapis.com/gaiaprotocol/god_parts";

  for (const image of images) {
    const imageUrl = `${BASE_URL}/${metadata.type.toLowerCase()}/${image.path}`;
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to load image from ${imageUrl}`);
    }
    const imageBuffer = new Uint8Array(await response.arrayBuffer());

    await ImageMagick.read(imageBuffer, async (img) => {
      if (baseImage == null) {
        baseImage = img.clone();
      } else {
        await baseImage!.composite(img, 0, 0, CompositeOperator.Over);
      }
    });
  }

  if (baseImage == null) {
    throw new Error("No images to compose");
  }

  let buffer: Uint8Array | null = null;
  baseImage.write((data) => {
    buffer = data;
  }, "png");

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

  return "OK";
});
