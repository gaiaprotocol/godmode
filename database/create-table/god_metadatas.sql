CREATE TABLE IF NOT EXISTS "public"."god_metadatas" (
  "token_id" smallint NOT NULL,
  "type" "text" NOT NULL,
  "gender" "text" NOT NULL,
  "parts" "jsonb" NOT NULL,
  "image" "text" NOT NULL,
  "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
  "updated_at" timestamp with time zone
);

ALTER TABLE "public"."god_metadatas" OWNER TO "postgres";

ALTER TABLE ONLY "public"."god_metadatas"
  ADD CONSTRAINT "god_metadatas_pkey" PRIMARY KEY ("token_id");

CREATE UNIQUE INDEX unique_god_metadata ON god_metadatas (type, gender, parts);

ALTER TABLE "public"."god_metadatas" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."god_metadatas" TO "anon";
GRANT ALL ON TABLE "public"."god_metadatas" TO "authenticated";
GRANT ALL ON TABLE "public"."god_metadatas" TO "service_role";

CREATE POLICY "Allow read access for all users" ON "public"."god_metadatas" FOR SELECT USING (true);

CREATE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."god_metadatas" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();
