import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import "dotenv/config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.REACT_APP_GOOGLE_ID as string,
      clientSecret: process.env.REACT_APP_GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
