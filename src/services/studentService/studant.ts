import bcrypt from "bcrypt";
import prisma from "../prisma";
import { ICreateStudentPayload, IStudent } from "./types";

export class Student {
  public static async createStudent({
    email,
    name,
    password,
    user_id
  }: ICreateStudentPayload) {
    try {
      const students = await prisma.students.create({
        data: {
          email,
          name,
          password,
          user_id
        }
      });
      return students;
    } catch (error) {
      console.log(error);

      throw new Error("Não foi possível criar o estudante");
    }
  }

  public static async listStudents(user_id: string) {
    try {
      const students = await prisma.students.findMany({
        where: {
          user_id
        }
      });
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
      const hashedPassword = bcrypt.hashSync(data.password, 10);

      const student = await prisma.students.update({
        where: {
          id
        },
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword
        }
      });
      return student;
    } catch (error) {
      throw new Error("Não foi possível atualizar o estudante");
    }
  }
}
