import { ICreateUser, UserController } from "@/services/userService";
import type { NextApiRequest, NextApiResponse } from "next";

const allowedMethods = "POST";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== allowedMethods) {
    return res
      .status(405)
      .json({ error: 405, errorMessage: "Method not allowed" });
  }

  try {
    const body = req.body as ICreateUser;

    const user = await UserController.create({
      email: body.email,
      name: body.name,
      password: body.password
    });

    res.status(201).json({ user });
  } catch (error: any) {
    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
