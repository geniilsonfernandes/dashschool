import {
  ICreateCoursePayload,
  ICreateCourseResponse,
  IListCoursesPayload,
  IUpdateCoursePayload
} from "./types";
import prisma from "../prisma";

export class CourseController {
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

  public static async listCourses({
    user_id,
    page = 1,
    take = 8,
    filter
  }: IListCoursesPayload) {
    try {
      const skip = (page - 1) * take;
      console.log(filter);

      const where = () => ({
        where: {
          user_id: user_id,
          ...(filter && {
            OR: [
              {
                name: {
                  contains: filter
                }
              }
            ]
          })
        }
      });

      const courses = await prisma.courses.findMany({
        ...where(),
        include: {
          Courses_Students: {
            include: {
              Students: true
            }
          }
        },
        skip: skip,
        take: take
      });

      const totalItemsCount = await prisma.courses.count({
        ...where()
      });

      const totalPages = Math.ceil(totalItemsCount / take);

      return {
        items: courses,
        meta: {
          totalItems: totalItemsCount,
          totalPages: totalPages,
          currentPage: page,
          itemsPerPage: take
        }
      };
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

  public static async updateCourse({ id, data }: IUpdateCoursePayload) {
    try {
      const getConections = await prisma.courses_Students.findMany({
        where: {
          courses_id: id
        }
      });

      const listToAdd = data.students.create.filter(
        (id) => !getConections.find((conection) => conection.student_id === id)
      );

      const listToDelete = data.students.delete.filter((id) =>
        getConections.find((conection) => conection.student_id === id)
      );

      const course = await prisma.courses.update({
        where: {
          id
        },
        data: {
          name: data.name,
          description: data.description,
          duration: data.duration,
          Courses_Students: {
            create: listToAdd.map((id) => ({
              Students: {
                connect: { id }
              }
            })),
            deleteMany: listToDelete.map((id) => ({
              student_id: id
            }))
          }
        }
      });

      return course;
    } catch (error) {
      console.log(error);

      throw new Error("Não foi possível atualizar o curso");
    }
  }

  public static async getCourse(id: string) {
    try {
      const course = await prisma.courses.findUnique({
        where: {
          id
        },
        include: {
          Courses_Students: {
            include: {
              Students: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
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
