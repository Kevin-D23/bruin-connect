"use client";
import { SignOut } from "@/app/api/auth/actions";
export default function Profile() {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          SignOut("/signIn");
        }}
      >
        Sign Out
      </button>
    </>
  );
}
