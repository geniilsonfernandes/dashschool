import { Student, IStudent } from "@/services";
import userTokenDecode from "@/utils/userTokenDecode";

import type { NextApiRequest, NextApiResponse } from "next";

interface ISuccessResponse {
  error: number;
  students: IStudent[];
  total: number;
  totalPages: number;
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

  const user_id = await userTokenDecode(req);

  if (user_id === "")
    return res.status(401).json({ error: 401, errorMessage: "Unauthorized" });

  const { page, take } = req.query as {
    page: string;
    take: string;
  };

  try {
    const students = await Student.listStudents(
      user_id,
      Number(page),
      Number(take)
    );

    res.status(200).json({
      error: 200,
      students: students.students,
      total: students.total,
      totalPages: students.totalPages
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
