/*
  Warnings:

  - You are about to drop the column `schema` on the `Tenant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Tenant_schema_key` ON `Tenant`;

-- AlterTable
ALTER TABLE `Tenant` DROP COLUMN `schema`;
