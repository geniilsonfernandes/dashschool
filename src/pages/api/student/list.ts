import { Student, IStudent } from "@/services";
import type { NextApiRequest, NextApiResponse } from "next";

interface ISuccessResponse {
  error: number;
  students: IStudent[];
}

interface IErrorResponse {
  error: number;
  errorMessage: string;
}

const allowedMethods = "GET";

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
    const students = await Student.listStudents();

    res.status(200).json({ error: 200, students });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
