// app/context/UserContext.tsx
"use client";
import { createContext, useContext, useState } from "react";
import { Session } from "next-auth";
import { ReactNode } from "react";

export interface SessionProp {
  children: ReactNode;
  session: Session;
}

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children, session }: SessionProp) {
  return (
    <SessionContext.Provider value={session ? session : null}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
