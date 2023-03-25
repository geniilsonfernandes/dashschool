import { CourseContreoller } from "@/services/courseServive";
import userTokenDecode from "@/utils/userTokenDecode";

import type { NextApiRequest, NextApiResponse } from "next";

const allowedMethods = "GET";

export default async function handler(
  req: NextApiRequest,
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

  const { page, take } = req.query as {
    page: string;
    take: string;
    filter?: string;
  };

  try {
    const courses = await CourseContreoller.listCourses({
      user_id: user_id,
      page: Number(page) || 1,
      take: Number(take) || 8
    });

    res.status(200).json(courses);
  } catch (error: any) {
    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
