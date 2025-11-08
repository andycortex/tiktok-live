import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // WARNING: This is a temporary workaround.
    // The database URL has been hardcoded because the .env file was not being loaded correctly.
    // For security, this should be reverted to `url: env("DATABASE_URL")` and the .env issue resolved.
    // DO NOT COMMIT THIS FILE WITH A HARDCODED DATABASE URL.
    url: "mysql://root:master@localhost:3307/scraper-tiktok-comments-com",
  },
});
