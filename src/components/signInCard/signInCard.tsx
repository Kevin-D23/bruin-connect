"use client";
import styles from "./signInCard.module.scss";
import Image from "next/image";
import signInImage from "../../assets/images/signInImage.png";
import Logo from "@/components/logo/logo";
import { SignIn } from "@/app/api/auth/actions";
import google from "../../assets/icons/google.png";

type PageProps = {
  pageName: String;
};

export default function SignInCard({ pageName }: PageProps) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={signInImage}
        width={0}
        height={0}
        alt="bruin flags"
      />
      <div className={styles.formContainer}>
        <Logo className={styles.logo} />

        {pageName == "signIn" && (
          <div className={styles.btnContainer}>
            <button className={styles.googleBtn} onClick={() => SignIn()}>
              <Image src={google} width={30} height={30} alt="google" />
              Sign in with Google
            </button>
          </div>
        )}
        {pageName == "register" && <div></div>}
      </div>
    </div>
  );
}
