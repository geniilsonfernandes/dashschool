import { User } from "@/services/userService/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  // Configure um ou mais provedores de autenticação aqui
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await User.checkPassword(email, password);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      const user = await User.findByEmail(session.user.email);

      return {
        ...session,
        user: {
          ...session.user,
          id: user ? user.id : null
        }
      };
    }
  }
};

export default NextAuth(authOptions);
