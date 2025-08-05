-- CreateTable
CREATE TABLE "public"."Filmes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "releaser" INTEGER NOT NULL,

    CONSTRAINT "Filmes_pkey" PRIMARY KEY ("id")
);
