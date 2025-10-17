/*
  Warnings:

  - You are about to drop the column `tenantId` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable (criar primeiro para poder migrar os dados)
CREATE TABLE `user_tenant` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tenantId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_tenant_userId_tenantId_key`(`userId`, `tenantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Migrar dados existentes de user.tenantId para user_tenant
INSERT INTO `user_tenant` (`id`, `userId`, `tenantId`, `createdAt`)
SELECT UUID(), `id`, `tenantId`, NOW()
FROM `user`
WHERE `tenantId` IS NOT NULL;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_tenantId_fkey`;

-- DropIndex
DROP INDEX `user_tenantId_fkey` ON `user`;

-- AlterTable (adicionar com valor padrão, depois remover o padrão)
ALTER TABLE `Tenant` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
ALTER TABLE `Tenant` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `tenantId`;

-- AddForeignKey
ALTER TABLE `user_tenant` ADD CONSTRAINT `user_tenant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_tenant` ADD CONSTRAINT `user_tenant_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
