/*
  Warnings:

  - You are about to drop the column `teacher_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_teacher_id_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `student_user_id_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `teacher_id`;

-- DropTable
DROP TABLE `teacher`;

-- CreateTable
CREATE TABLE `courses_students` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `student_id` VARCHAR(191) NOT NULL,
    `courses_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `courses_students_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `courses_id_key` ON `courses`(`id`);
