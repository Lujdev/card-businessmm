import { db } from "@/lib/db";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
      strategy: "jwt"
    },
    pages: {
      signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {  },
                password: {  }
              },
              async authorize(credentials) {

                if(!credentials?.email || !credentials?.password){
                  return null;
                }

                const existEmail = await db.user.findUnique({
                  where: { email: credentials?.email}
                });
                if(!existEmail){
                  return null;
                }

                const passwordMatch = await compare(credentials.password, existEmail.password);

                if(!passwordMatch){
                  return null;
                }

                return {
                  id: `${existEmail}`,
                  email: existEmail.email
                }
              },
        }),
    ],
})

export { handler as GET, handler as POST };
