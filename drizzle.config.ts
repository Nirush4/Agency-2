import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log(process.env.DB_TEST_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/databaseSchema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_TEST_URL!,
  },
  schemaFilter: ["public"],
});
