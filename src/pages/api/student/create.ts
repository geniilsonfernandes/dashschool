import { Student, IStudent } from "@/services";
import userTokenDecode from "@/utils/userTokenDecode";
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

interface CustomRequest extends NextApiRequest {
  password: string;
  name: string;
  email: string;
}

export default async function handler(
  req: CustomRequest,
  res: NextApiResponse<ISuccessResponse | IErrorResponse>
) {
  if (req.method !== allowedMethods) {
    return res
      .status(405)
      .json({ error: 405, errorMessage: "Method not allowed" });
  }

  const user_id = await userTokenDecode(req);

  if (user_id === "")
    return res.status(401).json({ error: 401, errorMessage: "Unauthorized" });

  try {
    const body = req.body;

    const studentAlreadyExists = await Student.findStudentByEmail(body.email);
    if (studentAlreadyExists)
      throw new Error("Já existe um estudante com esse email");

    const students = await Student.createStudent({
      email: body.email,
      name: body.name,
      password: body.password,
      user_id
    });

    res.status(201).json({ error: 201, students });
  } catch (error: any) {
    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
