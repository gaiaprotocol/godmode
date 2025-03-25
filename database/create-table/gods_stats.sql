CREATE TABLE IF NOT EXISTS "public"."gods_stats" (
  "time" timestamp NOT NULL,
  "floor_price" numeric NOT NULL,
  "num_owners" integer NOT NULL
);

ALTER TABLE "public"."gods_stats" OWNER TO "postgres";

ALTER TABLE ONLY "public"."gods_stats"
  ADD CONSTRAINT "gods_stats_pkey" PRIMARY KEY ("time");

ALTER TABLE "public"."gods_stats" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."gods_stats" TO "anon";
GRANT ALL ON TABLE "public"."gods_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."gods_stats" TO "service_role";

CREATE POLICY "Allow read access for all users" ON "public"."gods_stats" FOR SELECT USING (true);
