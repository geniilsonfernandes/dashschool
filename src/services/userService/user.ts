import prisma from "../prisma";
import bcrypt from "bcrypt";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class User {
  public static async create({ email, name, password }: ICreateUser) {
    try {
      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        throw new Error("Já existe um usuário com esse e-mail");
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await prisma.users.create({
        data: {
          email,
          name,
          password: hashedPassword
        }
      });

      return user;
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  }

  public static async findByEmail(email: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email
        }
      });
      return user;
    } catch (error) {
      throw new Error("Não foi possível encontrar o usuário");
    }
  }
}
