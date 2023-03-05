import { ICreateUser, User } from "@/services/userService";
import type { NextApiRequest, NextApiResponse } from "next";

interface ISuccessResponse {
  error: number;
  user: any;
}

interface IErrorResponse {
  error: number;
  errorMessage: string;
}

const allowedMethods = "POST";

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
    const body = req.body as ICreateUser;

    const user = await User.create({
      email: body.email,
      name: body.name,
      password: body.password
    });

    res.status(201).json({ error: 201, user });
  } catch (error: any) {
    res.status(400).json({ error: 400, errorMessage: error.message });
  }
}
