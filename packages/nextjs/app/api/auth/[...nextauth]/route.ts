import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import User from "~~/models/User";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req: { headers: req.headers } }),
            // nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            const checkIfUserExists = await User.findById(result?.data?.address);

            if (checkIfUserExists == null) {
              const newUser = await User.create({
                _id: result?.data?.address,
                name: "anon-" + Date.now(),
              });

              return {
                id: siwe.address,
                name: newUser.name,
                credentials: credentials,
              };
            } else {
              return {
                id: siwe.address,
                name: checkIfUserExists?.name || "toto",
                credentials: credentials,
              };
            }
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub;
      session.user.name = token.sub;
      session.user.credentials = token.user.credentials;
      return session;
    },
    async jwt({ user, token }) {
      if (user) token.user = user;
      return token;
    },
  },
};

// @ts-ignore
const handler = NextAuth(authOptions);
// @ts-ignore
export { handler as GET, handler as POST };
