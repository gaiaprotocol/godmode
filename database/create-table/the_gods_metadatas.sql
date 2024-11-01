CREATE TABLE IF NOT EXISTS "public"."the_gods_metadatas" (
  "id" bigint NOT NULL,
  "type" "text" NOT NULL,
  "gender" "text" NOT NULL,
  "parts" "jsonb" NOT NULL,
  "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
  "updated_at" timestamp with time zone
);

ALTER TABLE "public"."the_gods_metadatas" OWNER TO "postgres";

ALTER TABLE ONLY "public"."the_gods_metadatas"
  ADD CONSTRAINT "the_gods_metadatas_pkey" PRIMARY KEY ("id");

ALTER TABLE "public"."the_gods_metadatas" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."the_gods_metadatas" TO "anon";
GRANT ALL ON TABLE "public"."the_gods_metadatas" TO "authenticated";
GRANT ALL ON TABLE "public"."the_gods_metadatas" TO "service_role";

CREATE POLICY "Allow read access for all users" ON "public"."the_gods_metadatas" FOR SELECT USING (true);
