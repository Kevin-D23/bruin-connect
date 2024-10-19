"use server";

import { signIn, signOut } from "@/auth";

export async function SignIn() {
  await signIn("google", { redirectTo: "/signIn" });
}

export async function SignOut() {
  await signOut({ redirectTo: "/" });
}
