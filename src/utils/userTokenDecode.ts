import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

async function userTokenDecode(req: NextApiRequest) {
  const access_token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET
  });

  const user_id: string = access_token ? (access_token.sub as string) : "";

  return user_id;
}

export default userTokenDecode;
