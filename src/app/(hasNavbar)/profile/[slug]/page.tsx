"use client";
import { SignOut } from "../../../api/auth/actions";
export default function Profile() {
  return (
    <>
      <button onClick={() => SignOut()}>Sign Out</button>
    </>
  );
}
