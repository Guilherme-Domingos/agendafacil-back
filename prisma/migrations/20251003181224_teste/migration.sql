-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_tenantId_fkey`;

-- DropIndex
DROP INDEX `user_tenantId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `tenantId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
