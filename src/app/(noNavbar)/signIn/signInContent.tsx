"use client"
import styles from "./signIn.module.scss"
import google from "../../../assets/icons/google.png";
import Image from "next/image";
import { SignIn } from "@/app/api/auth/actions";


export default function SignInContent() {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.googleBtn} onClick={() => SignIn()}>
        <Image src={google} width={30} height={30} alt="google" />
        Sign in with Google
      </button>
    </div>
  );
}
