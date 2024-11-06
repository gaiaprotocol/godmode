import { createClient } from "@supabase/supabase-js";
import data from "./data.json" with { type: "json" };
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

async function main() {
  const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  for (const god of data) {
    await client.from("god_metadatas").upsert({
      id: god._id,
      type: god.type,
      gender: god.gender,
      parts: god.parts,
    });

    console.log(`Inserted ${god._id}`);
  }

  console.log("Data inserted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
