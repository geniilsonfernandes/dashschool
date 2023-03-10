import prisma from "../prisma";
import { IStudent } from "./types";

export class Student {
  public static async createStudent({ email, name, password }: IStudent) {
    try {
      const students = await prisma.students.create({
        data: {
          email,
          name,
          password
        }
      });
      return students;
    } catch (error) {
      throw new Error("Não foi possível criar o estudante");
    }
  }

  public static async listStudents() {
    try {
      const students = await prisma.students.findMany();
      return students;
    } catch (error) {
      throw new Error("Não foi possível listar os estudantes");
    }
  }

  public static async findStudentByEmail(email: string) {
    try {
      const student = await prisma.students.findFirst({
        where: {
          email
        }
      });
      return student;
    } catch (error) {
      throw new Error("Não foi possível encontrar o estudante");
    }
  }

  public static async findStudentById(id: string) {
    try {
      const student = await prisma.students.findFirst({
        where: {
          id
        }
      });
      return student;
    } catch (error) {
      throw new Error("Não foi possível encontrar o estudante");
    }
  }

  public static async updateStudentById(id: string, data: IStudent) {
    try {
      const student = await prisma.students.update({
        where: {
          id
        },
        data
      });
      return student;
    } catch (error) {
      throw new Error("Não foi possível atualizar o estudante");
    }
  }
}
