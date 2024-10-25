"use client";
import { SignOut } from "../../api/auth/actions";
export default function Home() {
  return (
    <>
      <button onClick={() => SignOut()}>Sign Out</button>
    </>
  );
}
