import prisma from "@/services/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure um ou mais provedores de autenticação aqui
  session: {
    strategy: "jwt"
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.users.findUnique({
          where: {
            email: email
          }
        });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            myCustomProperty: "lxiro"
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token, user }) {
      console.log({ session, token, user });
      const id = token.sub;
      session.user.id = id;
      return session;
    },
    async signIn({ user }) {
      console.log("🕶️ user sign", user);
      return true;
    }
  }

  // Configure outros recursos do NextAuth aqui
});

export function HarperDBAdapter() {
  return {
    async createUser(user: any) {
      const userc = {
        id: "1",
        email: " ada",
        perms: "member"
      };
      return {
        ...userc
      };
    }
  };
}
