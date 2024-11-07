import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
interface User extends DefaultUser {
    major: String | null;
    pronouns: String | null;
    bio: String | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    major: String | null;
    pronouns: String | null;
    bio: String | null;
  }
}
