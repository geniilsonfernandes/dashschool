import { Student, IStudent } from "@/services";
import { CourseContreoller } from "@/services/courseServive";
import type { NextApiRequest, NextApiResponse } from "next";

interface ISuccessResponse {
  error: number;
  course: any;
}

interface IErrorResponse {
  error: number;
  errorMessage: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISuccessResponse | IErrorResponse>
) {
  if (req.method !== "GET" && req.method !== "PUT") {
    return res
      .status(405)
      .json({ error: 405, errorMessage: "Method not allowed" });
  }

  const { id } = req.query as any;

  if (req.method === "GET") {
    try {
      const course = await CourseContreoller.getCourse(id);

      if (!course) throw new Error("Curso não existe");

      res.status(200).json({ error: 200, course });
    } catch (error: any) {
      res.status(400).json({ error: 400, errorMessage: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const course = await CourseContreoller.updateCourse({
        id,
        data: req.body
      });

      res.status(200).json({ error: 200, course: course });
    } catch (error: any) {
      res.status(400).json({ error: 400, errorMessage: error.message });
    }
  }
}
