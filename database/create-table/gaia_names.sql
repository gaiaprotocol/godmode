CREATE TABLE IF NOT EXISTS "public"."gaia_names" (
  "wallet_address" "text" DEFAULT ("auth"."jwt"() ->> 'wallet_address'::"text") NOT NULL,
  "name" "text" NOT NULL UNIQUE,
  "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
  "updated_at" timestamp with time zone
);

ALTER TABLE "public"."gaia_names" OWNER TO "postgres";

ALTER TABLE ONLY "public"."gaia_names"
  ADD CONSTRAINT "gaia_names_pkey" PRIMARY KEY ("wallet_address");

ALTER TABLE "public"."gaia_names" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."gaia_names" TO "anon";
GRANT ALL ON TABLE "public"."gaia_names" TO "authenticated";
GRANT ALL ON TABLE "public"."gaia_names" TO "service_role";

CREATE POLICY "Allow read access for all users" ON "public"."gaia_names" FOR SELECT USING (true);

CREATE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."gaia_names" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();
