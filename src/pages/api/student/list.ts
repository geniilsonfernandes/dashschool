import { Student } from "@/services";
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

  const { page, take, filter } = req.query as {
    page: string;
    take: string;
    filter?: string;
  };

  try {
    const students = await Student.listStudents({
      mode: "pages",
      page: Number(page) || 1,
      take: Number(take) || 8,
      filter: filter,
      user_id
    });

    res.status(200).json(students);
  } catch (error: any) {
    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
