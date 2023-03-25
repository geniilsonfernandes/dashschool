import prisma from "../prisma";
import bcrypt from "bcrypt";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class UserController {
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

  public static async findById(id: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          id
        }
      });
      return user;
    } catch (error) {
      throw new Error("Não foi possível encontrar o usuário");
    }
  }

  public static async checkPassword(email: string, password: string) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("Senha inválida");
      }

      return user;
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  }
}
