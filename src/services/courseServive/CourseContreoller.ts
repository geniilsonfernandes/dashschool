import {
  ICreateCoursePayload,
  ICreateCourseResponse,
  IListCoursesPayload
} from "./types";
import prisma from "../prisma";

export class CourseContreoller {
  public static async createCourse({
    name,
    description,
    duration,
    students,
    user_id
  }: ICreateCoursePayload): Promise<ICreateCourseResponse> {
    const createConect = (studentsList: string[]) =>
      studentsList.map((id) => ({
        Students: {
          connect: { id }
        }
      }));

    try {
      const course = await prisma.courses.create({
        data: {
          name: name,
          description: description,
          duration: duration,

          Courses_Students: {
            create: createConect(students)
          },
          user_id: user_id
        }
      });

      return course;
    } catch (error) {
      throw new Error("Não foi possível criar o curso");
    }
  }

  public static async listCourses({ user_id }: IListCoursesPayload) {
    try {
      const courses = await prisma.courses.findMany({
        where: {
          user_id: user_id
        },
        include: {
          Courses_Students: {
            include: {
              Students: true
            }
          }
        }
      });

      return courses;
    } catch (error) {
      throw new Error("Não foi possível listar os cursos");
    }
  }

  public static async deleteCourse(id: string) {
    try {
      const course = await prisma.courses.delete({
        where: {
          id
        }
      });

      return course;
    } catch (error) {
      throw new Error("Não foi possível deletar o curso");
    }
  }

  public static async updateCourse(id: string, data: any) {
    try {
      const course = await prisma.courses.update({
        where: {
          id
        },
        data
      });

      return course;
    } catch (error) {
      throw new Error("Não foi possível atualizar o curso");
    }
  }

  public static async getCourse(id: string) {
    try {
      const course = await prisma.courses.findUnique({
        where: {
          id
        }
      });

      return course;
    } catch (error) {
      throw new Error("Não foi possível buscar o curso");
    }
  }

  public static async getCourseStudents(id: string) {
    try {
      const course = await prisma.courses.findUnique({
        where: {
          id
        },
        include: {
          Courses_Students: {
            include: {
              Students: true
            }
          }
        }
      });

      return course;
    } catch (error) {
      throw new Error("Não foi possível buscar o curso");
    }
  }
}