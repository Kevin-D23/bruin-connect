import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import "dotenv/config";
import { GoogleProfile } from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

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
    async signIn({ user }) {
      let result;
      try {
        const response = await fetch(`http://localhost:8000/api/user/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        if (!response.ok) {
          console.error("Network response was not ok");
        }
        result = await response.json();
      } catch (error) {
        console.error("SignIn: User does not exist");
      }
      console.log('test')
      if (result.user_id) {
        user.id = result.user_id;
        user.name = result.first_name + " " + result.last_name;
        user.pronouns = result.pronouns;
        user.major = result.major;
        user.bio = result.bio;
        user.image = result.profile_picture;
      } else {
        user.id = uuidv4();
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;
        token.name = user.name;
        token.pronouns = user.pronouns;
        token.major = user.major;
        token.bio = user.bio;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.image = token.picture;
      session.user.name = token.name;
      session.user.bio = token.bio;
      session.user.pronouns = token.pronouns;
      session.user.major = token.major;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
