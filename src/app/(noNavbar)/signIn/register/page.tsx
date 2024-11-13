"use client";
import styles from "./register.module.scss";
import SignInCard from "@/components/signInCard/signInCard";
import RegisterContent from "./registerContent";
import { createContext, useState } from "react";
import { SessionProvider } from "next-auth/react";

interface FormDataType {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  major: string;
  pronouns: string;
  profile_picture: string;
  bio: string;
}

export interface RegisterContextType {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export const RegisterContext = createContext<RegisterContextType | null>(null);

export default function Regsiter() {
  const [formData, setFormData] = useState<FormDataType>({
    user_id: "",
    email: "",
    first_name: "",
    last_name: "",
    major: "",
    pronouns: "",
    profile_picture: "",
    bio: "",
  });

  return (
    <SessionProvider>
      <RegisterContext.Provider value={{ formData, setFormData }}>
        <main className={styles.main}>
          <SignInCard  children={<RegisterContent />} />
        </main>
      </RegisterContext.Provider>
    </SessionProvider>
  );
}
