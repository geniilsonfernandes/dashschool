import prisma from "../prisma";
import {
  ICreateStudentPayload,
  IListStudentsPayload,
  IStudent,
  IStudentResponse
} from "./types";

export class StudentController {
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
      throw new Error("Não foi possível criar o estudante");
    }
  }

  public static async listStudents({
    page,
    take,
    user_id,
    filter
  }: IListStudentsPayload): Promise<IStudentResponse | IStudent[]> {
    const skip = (page - 1) * take;

    const where = () => ({
      where: {
        user_id: user_id,
        ...(filter && {
          OR: [
            {
              name: {
                contains: filter
              }
            },
            {
              email: {
                contains: filter
              }
            }
          ]
        })
      }
    });

    try {
      const students = await prisma.students.findMany({
        skip: skip,
        take: take,
        ...where(),
        select: {
          id: true,
          name: true,
          email: true,
          user_id: true,
          created_at: true
        }
      });
      const totalItemsCount = await prisma.students.count({
        ...where()
      }); // total de registros na tabela

      const totalPages = Math.ceil(totalItemsCount / take); // total de páginas

      // const users: any = [];

      // for (let i = 1; i <= 100; i++) {
      //   const name = faker.name.fullName();
      //   const email = `${name
      //     .split(" ")
      //     .join(".")
      //     .toLowerCase()}@dashschool.com.br`;
      //   const password = faker.internet.password();

      //   users.push({ email, name, password, user_id });
      // }

      // await prisma.students.createMany({
      //   data: users
      // });

      return {
        items: students,
        meta: {
          totalItems: totalItemsCount,
          totalPages: totalPages,
          currentPage: page,
          itemsPerPage: take
        }
      };
    } catch (error) {
      console.log(error);

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
        },
        select: {
          id: true,
          name: true,
          email: true,
          user_id: true,
          created_at: true,
          Courses_Students: {
            select: {
              Courses: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  duration: true,
                  created_at: true
                }
              }
            }
          }
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
        data: {
          email: data.email,
          name: data.name
        }
      });
      return student;
    } catch (error) {
      throw new Error("Não foi possível atualizar o estudante");
    }
  }
}
