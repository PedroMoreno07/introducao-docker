/*
  Warnings:

  - Changed the type of `gender` on the `Filmes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."filmesGender" AS ENUM ('ACAO', 'AVENTURA', 'COMEDIA', 'DRAMA', 'FICCAO', 'TERROR', 'ROMANCE', 'FANTASIA', 'MUSICAL', 'DOCUMENTARIO');

-- AlterTable
ALTER TABLE "public"."Filmes" DROP COLUMN "gender",
ADD COLUMN     "gender" "public"."filmesGender" NOT NULL;
