import { CourseController } from "@/services/courseServive";
import { createErrorMessage } from "@/utils/createErrorMessage";
import userTokenDecode from "@/utils/userTokenDecode";
import type { NextApiRequest, NextApiResponse } from "next";

const allowedMethods = "POST";

interface CustomRequest extends NextApiRequest {
  name: string;
  description: string;
  duration: number;
  students: string[];
}

export default async function handler(
  req: CustomRequest,
  res: NextApiResponse
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

    const course = await CourseController.createCourse({
      name: body.name,
      description: body.description,
      duration: body.duration,
      students: body.students,
      user_id: user_id
    });

    res.status(201).json({ course });
  } catch (error: any) {
    res.status(400).json(createErrorMessage(400, error.message));
  }
}
