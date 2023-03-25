import { StudentController } from "@/services";
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
      const students = await StudentController.findStudentById(id);

      if (!students) throw new Error("Estudante não existe");

      res.status(200).json({ error: 200, students });
    } catch (error: any) {
      res.status(400).json({ error: 400, errorMessage: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const students = await StudentController.updateStudentById(id, req.body);

      if (!students) throw new Error("Estudante não existe");

      res.status(200).json({ students });
    } catch (error: any) {
      res.status(400).json({ error: 400, errorMessage: error.message });
    }
  }
}
