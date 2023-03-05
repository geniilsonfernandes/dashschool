// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await prisma.courses.create({
      data: {
        name: "curso de maromba",
        description: "curso de node",
        duration: 200,
        teacher_id: "bcab4662-a9e4-47a6-91b6-15507d16bab1"
      }
    });

    res.status(200).json({ name: result.name, result });
  } catch (error) {
    res.status(400).json({ name: "nao criou", result: error });
  }
}
