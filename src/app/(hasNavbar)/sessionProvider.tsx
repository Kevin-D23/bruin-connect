// app/context/UserContext.tsx
"use client";
import { createContext, useContext, } from "react";
import { ReactNode } from "react";

export interface UserProp {
  user_id: String;
  first_name: String;
  last_name: String;
  profile_picture: String;
  bio: String;
  major: String;
  pronouns: String;
}

const SessionContext = createContext<UserProp | null>(null);

export function SessionProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserProp;
}) {
  return (
    <SessionContext.Provider value={user ? user : null}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
