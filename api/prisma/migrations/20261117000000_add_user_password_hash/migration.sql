-- Existing users cannot authenticate until they set a password. The temporary
-- empty value keeps existing rows migratable without creating a usable login.
ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT NOT NULL DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP DEFAULT;
