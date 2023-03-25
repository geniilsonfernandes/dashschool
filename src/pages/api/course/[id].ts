import { CourseController } from "@/services/courseServive";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "PUT") {
    return res
      .status(405)
      .json({ error: 405, errorMessage: "Method not allowed" });
  }

  const { id } = req.query as any;

  if (req.method === "GET") {
    try {
      const course = await CourseController.getCourse(id);

      if (!course) throw new Error("Curso não existe");

      res.status(200).json({ course });
    } catch (error: any) {
      res.status(400).json({ error: 400, errorMessage: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const course = await CourseController.updateCourse({
        id,
        data: req.body
      });

      res.status(200).json({ course: course });
    } catch (error: any) {
      res.status(400).json({ error: 400, errorMessage: error.message });
    }
  }
}
