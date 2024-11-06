import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import data from "./data.json" with { type: "json" };
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
import { Storage } from "@google-cloud/storage";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket("gaiaprotocol");

enum GodGender {
  MAN = "Man",
  WOMAN = "Woman",
}

enum GodType {
  STONE = "Stone",
  FIRE = "Fire",
  WATER = "Water",
}

async function main() {
  const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  for (const metadata of data) {
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

    const parameters: any[] = [];
    for (const image of images) {
      if (image !== undefined) {
        parameters.push({
          input: `parts-images/${metadata.type.toLowerCase()}/${image.path}`,
        });
      }
    }

    const buffer = await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 4,
        background: { r: 255, g: 167, b: 173, alpha: 0 },
      },
    })
      .composite(parameters)
      .png()
      .toBuffer();

    const fileName = `${uuidv4()}.png`;
    const filePath = `${metadata._id}/${fileName}`;

    const blob = bucket.file("god_images/" + filePath);
    await blob.save(buffer, {
      contentType: "image/png",
      metadata: { cacheControl: "public, max-age=31536000, immutable" },
    });

    await client.from("god_metadatas").update({
      image: filePath,
    }).eq("token_id", metadata._id);

    console.log(`Generated image for ${metadata._id}`);
  }

  console.log("Images generated");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
