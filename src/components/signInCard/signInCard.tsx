"use client";
import styles from "./signInCard.module.scss";
import Image from "next/image";
import signInImage from "../../assets/images/signInImage.png";
import Logo from "@/components/logo/logo";
import { useState } from "react";
import "react-image-crop/src/ReactCrop.scss";


type PageProps = {
  children?: JSX.Element;
};

export default function SignInCard({ children }: PageProps) {
  const [isLoading, setIsLoading] = useState(true);

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
        {children}
      </div>
    </div>
  );
}
