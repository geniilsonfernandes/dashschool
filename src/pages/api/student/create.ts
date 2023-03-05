import { createStudent, findStudentByEmail, IStudent } from "@/services";
import type { NextApiRequest, NextApiResponse } from "next";

interface ISuccessResponse {
  error: number;
  students: IStudent;
}

interface IErrorResponse {
  error: number;
  errorMessage: string;
}

const allowedMethods = "POST";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISuccessResponse | IErrorResponse>
) {
  if (req.method !== allowedMethods) {
    return res
      .status(405)
      .json({ error: 405, errorMessage: "Method not allowed" });
  }

  try {
    const body = req.body as IStudent;

    ///  fazer tratamento de daodos aqui antes de enviar para o service
    /// encriptar senha
    /// validar dados

    const studentAlreadyExists = await findStudentByEmail(body.email);
    if (studentAlreadyExists) throw new Error("Estudante já existe");

    const students = await createStudent(body);

    res.status(201).json({ error: 201, students });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
