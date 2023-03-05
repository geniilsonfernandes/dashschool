-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_teacher_id_fkey`;

-- AlterTable
ALTER TABLE `courses` MODIFY `teacher_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
