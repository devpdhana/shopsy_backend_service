-- CreateTable
CREATE TABLE "Store" (
    "store_id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_description" TEXT NOT NULL,
    "store_theme_color" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "modified_by" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
