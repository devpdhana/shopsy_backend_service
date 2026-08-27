-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "social_links" TEXT[],
ADD COLUMN     "sub_domain" TEXT;
